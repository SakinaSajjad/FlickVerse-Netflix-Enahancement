import { openDB } from 'idb';

// Database and Store Names
const dbName = 'storiesDB';
const storeName = 'stories';

// Initialize the stories database
export async function setupStoriesDB() {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('userId', 'userId'); // Index to associate stories with users
      }
    },
  });
  return db;
}

// Add a new story to the database
export async function saveStory(story) {
  const db = await setupStoriesDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  const storyWithTimestamp = {
    ...story,
    timestamp: Date.now(), // Add a timestamp for expiration tracking
  };

  await store.add(storyWithTimestamp);
  console.log('Story saved:', storyWithTimestamp);
}

// Fetch stories for a specific user
// export async function getUserStories(userId) {
//   const db = await setupStoriesDB();
//   const transaction = db.transaction(storeName, 'readonly');
//   const store = transaction.objectStore(storeName);
//   const index = store.index('userId');

//   const userStories = await index.getAll(userId); // Get all stories for the given userId
//   console.log(`Fetched stories for userId ${userId}:`, userStories);
//   return userStories;
// }

export async function getUserStories() {
  const db = await setupStoriesDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);

  // Fetch all stories from the store without filtering by userId
  const allStories = await store.getAll(); 
  console.log('Fetched all stories:', allStories);
  return allStories;
}

// Clear expired stories from the database
export async function clearExpiredStories() {
  const db = await setupStoriesDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  const allStories = await store.getAll(); // Get all stories
  const now = Date.now();

  allStories.forEach((story) => {
    if (now - story.timestamp > 5 * 60 * 1000) { // Check if the story is older than 5 minutes
      store.delete(story.id);
      console.log('Deleted expired story:', story);
    }
  });

  await transaction.done;
}
