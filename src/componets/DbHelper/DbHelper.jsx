import { openDB } from 'idb';

const dbName = 'movieCommentsDB';
const storeName = 'comments';

export async function setupDB() {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
        store.createIndex('movieId', 'movieId'); // Create an index on movieId
      } else {
        // If the store already exists, check if the index exists. If not, upgrade.
        const store = db.transaction(storeName, 'readwrite').objectStore(storeName);
        if (!store.indexNames.contains('movieId')) {
          store.createIndex('movieId', 'movieId'); // Create the index if it doesn't exist
        }
      }
    },
  });
  return db;
}

// Fetch comments from the database for a given movieId
export async function getComments(movieId) {
    console.log("worke4d");
    
    const db = await setupDB();
    const store = db.transaction('comments', 'readonly').objectStore('comments');
    const index = store.index('movieId'); // Ensure the index exists
    const comments = await index.getAll(movieId);  // Fetch comments for the specific movieId
  console.log(comments,"YOu know itt");
  
    console.log('Fetched comments from DB for movieId:', movieId);
    console.log(comments); // Log fetched comments for debugging
    return comments;
  }

// Add a new comment to the database
export async function addComment(comment) {
  const db = await setupDB();
  await db.add(storeName, comment); // Save the comment
  console.log('Added comment to DB:', comment); // Log the comment that was added to the DB
}

export function clearDB() {
    const request = indexedDB.deleteDatabase(dbName); // Use the name of your database
  
    request.onsuccess = () => {
      console.log('Database deleted successfully');
    };
  
    request.onerror = (event) => {
      console.error('Error deleting database:', event);
    };
  
    request.onblocked = (event) => {
      console.warn('Database deletion blocked:', event);
    };
  }
