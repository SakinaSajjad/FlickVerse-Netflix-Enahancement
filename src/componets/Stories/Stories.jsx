// import React, { useState } from 'react';

// const Stories = () => {
//   const [media, setMedia] = useState('https://picsum.photos/200/300'); // Default image

//   const handleMediaChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type;

//       if (fileType.startsWith('image/') || fileType === 'video/mp4') {
//         const mediaURL = URL.createObjectURL(file);
//         setMedia({ url: mediaURL, type: fileType }); // Update media with type and URL
//       } else {
//         alert('Please select an image or MP4 video.');
//       }
//     }
//   };

//   return (
//     <div className="relative bg-white h-28 w-28 rounded-full mt-4 md:ml-5">
//       {/* Image or Video */}
//       {media.type === 'video/mp4' ? (
//         <video
//           src={media.url}
//           className="rounded-full h-28 w-28"
//           autoPlay
//           loop
//           muted
//         ></video>
//       ) : (
//         <img
//           src={media.url || media} // Handle default image
//           alt="Story"
//           className="rounded-full h-28 w-28 cursor-pointer"
//           onClick={() => document.getElementById('mediaInput').click()}
//         />
//       )}

//       {/* File Input */}
//       <input
//         id="mediaInput"
//         type="file"
//         accept="image/*,video/mp4"
//         className="hidden"
//         onChange={handleMediaChange}
//       />

//       {/* + Button */}
//       <button
//         className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md"
//         onClick={() => document.getElementById('mediaInput').click()}
//       >
//         +
//       </button>
//     </div>
//   );
// };

// export default Stories;


// import React, { useState, useEffect } from 'react';
// import { saveStory, getUserStories, clearExpiredStories } from '../DbHelper/storiesDB';
// import { getAuth } from "firebase/auth";

// const Stories = ({  }) => {
//   const [media, setMedia] = useState('https://picsum.photos/200/300'); // Default image
//   const [userStories, setUserStories] = useState([]); // To display user stories

//     const auth = getAuth();
  
//   // Get the currently signed-in user
//   const userFirabase = auth.currentUser;


//  const  userId =  userFirabase.uid

//   useEffect(() => {
//     console.log("asdsaasdas")
//     // Fetch stories for the current user on mount
//     const fetchStories = async () => {
//       const stories = await getUserStories(userFirabase.uid);
//       console.log("Stories",stories);
      
//       setUserStories(stories);
//     };

//     fetchStories();

//     // Periodically clear expired stories
//     const intervalId = setInterval(async () => {
//       await clearExpiredStories();
//       fetchStories(); // Update the displayed stories
//     }, 60000); // Run every minute

//     return () => clearInterval(intervalId); // Cleanup
//   }, [userFirabase.uid]);

//   const handleMediaChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type;

//       if (fileType.startsWith('image/') || fileType === 'video/mp4') {
//         const mediaURL = URL.createObjectURL(file);
//         const story = {
//           url: mediaURL,
//           type: fileType,
//           userId, // Associate story with the current user
//         };

//         setMedia(story); // Update the preview
//         await saveStory(story); // Save story in the database

//         const updatedStories = await getUserStories(userFirabase.uid);
//         setUserStories(updatedStories); // Refresh stories
//       } else {
//         alert('Please select an image or MP4 video.');
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Display existing stories */}
//       <div className="flex space-x-4">
//         {userStories.map((story) => (
//           <div key={story.id} className="relative bg-white h-28 w-28 rounded-full mt-4">
//             {story.type === 'video/mp4' ? (
//               <video
//                 src={story.url}
//                 className="rounded-full h-28 w-28"
//                 autoPlay
//                 loop
//                 muted
//               ></video>
//             ) : (
//               <img
//                 src={story.url}
//                 alt="Story"
//                 className="rounded-full h-28 w-28"
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Upload new story */}
//       <div className="relative bg-white h-28 w-28 rounded-full mt-4 md:ml-5">
//         {media.type === 'video/mp4' ? (
//           <video
//             src={media.url}
//             className="rounded-full h-28 w-28"
//             autoPlay
//             loop
//             muted
//           ></video>
//         ) : (
//           <img
//             src={media.url || media}
//             alt="Story"
//             className="rounded-full h-28 w-28 cursor-pointer"
//             onClick={() => document.getElementById('mediaInput').click()}
//           />
//         )}

//         <input
//           id="mediaInput"
//           type="file"
//           accept="image/*,video/mp4"
//           className="hidden"
//           onChange={handleMediaChange}
//         />

//         <button
//           className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md"
//           onClick={() => document.getElementById('mediaInput').click()}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Stories;


// import React, { useState, useEffect } from 'react';
// import { saveStory, getUserStories, clearExpiredStories } from '../DbHelper/storiesDB';

// const Stories = ({userId }) => {
//   const [media, setMedia] = useState(null); // For preview of new media
//   const [userStories, setUserStories] = useState([]); // To display user stories
// console.log(userId);


//   useEffect(() => {
//     // Fetch stories for the current user on mount
//     const fetchStories = async () => {
//       const stories = await getUserStories(userId);
//       setUserStories(stories);
//     };

//     fetchStories();

//     // Periodically clear expired stories
//     const intervalId = setInterval(async () => {
//       await clearExpiredStories();
//       fetchStories(); // Update the displayed stories
//     }, 60000); // Run every minute

//     return () => clearInterval(intervalId); // Cleanup
//   }, [userId]);

//   const handleMediaChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type;

//       if (fileType.startsWith('image/') || fileType === 'video/mp4') {
//         const mediaURL = URL.createObjectURL(file);
//         const story = {
//           url: mediaURL,
//           type: fileType,
//           userId, // Associate story with the current user
//         };

//         setMedia(story); // Update the preview
//         await saveStory(story); // Save story in the database

//         const updatedStories = await getUserStories(userId);
//         setUserStories(updatedStories); // Refresh stories
//       } else {
//         alert('Please select an image or MP4 video.');
//       }
//     }
//   };

//   console.log(userStories);
  
//   return (
//     <div>
//       {/* Display existing stories */}
//       <div className="flex space-x-4">
//         {userStories.map((story) => (
//           <div key={story.id} className="relative bg-white h-28 w-28 rounded-full mt-4">
//             {story.type === 'video/mp4' ? (
//               <video
//                 src={story.url}
//                 className="rounded-full h-28 w-28"
//                 autoPlay
//                 loop
//                 muted
//               ></video>
//             ) : (
//               <img
//                 src={story.url}
//                 alt="Story"
//                 className="rounded-full h-28 w-28 object-cover"
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Upload new story */}
//       <div className="relative bg-white h-28 w-28 rounded-full mt-4 md:ml-5">
//         {media?.type === 'video/mp4' ? (
//           <video
//             src={media.url}
//             className="rounded-full h-28 w-28"
//             autoPlay
//             loop
//             muted
//           ></video>
//         ) : (
//           <img
//             src={media?.url || 'https://via.placeholder.com/150'}
//             alt="Story"
//             className="rounded-full h-28 w-28 cursor-pointer"
//             onClick={() => document.getElementById('mediaInput').click()}
//           />
//         )}

//         <input
//           id="mediaInput"
//           type="file"
//           accept="image/*,video/mp4"
//           className="hidden"
//           onChange={handleMediaChange}
//         />

//         <button
//           className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md"
//           onClick={() => document.getElementById('mediaInput').click()}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Stories;



// import React, { useState, useEffect } from 'react';
// import { saveStory, getUserStories, clearExpiredStories } from '../DbHelper/storiesDB';

// const Stories = ({ userId }) => {
//   const [media, setMedia] = useState(null); // For preview of new media
//   const [userStories, setUserStories] = useState([]); // To display user stories

//   console.log('User ID:', userId); // Check the userId value

//   useEffect(() => {
//     // Fetch stories for the current user on mount
//     const fetchStories = async () => {
//       console.log('Fetching stories for userId:', userId); // Log the fetch attempt
//       const stories = await getUserStories(userId);
//       console.log('Fetched stories:', stories); // Log the fetched stories
//       setUserStories(stories);
//     };

//     fetchStories();

//     // Periodically clear expired stories
//     const intervalId = setInterval(async () => {
//       console.log('Clearing expired stories...');
//       await clearExpiredStories();
//       fetchStories(); // Update the displayed stories
//     }, 60000); // Run every minute

//     return () => clearInterval(intervalId); // Cleanup
//   }, [userId]);

//   const handleMediaChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type;

//       if (fileType.startsWith('image/') || fileType === 'video/mp4') {
//         const mediaURL = URL.createObjectURL(file);
//         const story = {
//           url: mediaURL,
//           type: fileType,
//           userId, // Associate story with the current user
//         };

//         setMedia(story); // Update the preview
//         await saveStory(story); // Save story in the database

//         const updatedStories = await getUserStories(userId);
//         console.log('Updated stories after save:', updatedStories); // Log the updated stories
//         setUserStories(updatedStories); // Refresh stories
//       } else {
//         alert('Please select an image or MP4 video.');
//       }
//     }
//   };

//   console.log('User Stories:', userStories); // Log the user stories to ensure they're properly set

//   return (
//     <div>
//       {/* Display existing stories */}
//       <div className="flex space-x-4">
//         {userStories.length > 0 ? (
//           userStories.map((story) => (
//             <div key={story.id} className="relative bg-white h-28 w-28 rounded-full mt-4">
//               {story.type === 'video/mp4' ? (
//                 <video
//                   src={story.url}
//                   className="rounded-full h-28 w-28"
//                   autoPlay
//                   loop
//                   muted
//                 ></video>
//               ) : (
//                 <img
//                   src={story.url}
//                   alt="Story"
//                   className="rounded-full h-28 w-28 object-cover"
//                 />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No stories available</p> // If no stories are found
//         )}
//       </div>

//       {/* Upload new story */}
//       <div className="relative bg-white h-28 w-28 rounded-full mt-4 md:ml-5">
//         {media?.type === 'video/mp4' ? (
//           <video
//             src={media.url}
//             className="rounded-full h-28 w-28"
//             autoPlay
//             loop
//             muted
//           ></video>
//         ) : (
//           <img
//             src={media?.url || 'https://via.placeholder.com/150'}
//             alt="Story"
//             className="rounded-full h-28 w-28 cursor-pointer"
//             onClick={() => document.getElementById('mediaInput').click()}
//           />
//         )}

//         <input
//           id="mediaInput"
//           type="file"
//           accept="image/*,video/mp4"
//           className="hidden"
//           onChange={handleMediaChange}
//         />

//         <button
//           className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md"
//           onClick={() => document.getElementById('mediaInput').click()}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Stories;


// import React, { useState, useEffect } from 'react';
// import { saveStory, getUserStories, clearExpiredStories } from '../DbHelper/storiesDB';

// const Stories = () => {
//   const [media, setMedia] = useState(null); // For preview of new media
//   const [userStories, setUserStories] = useState([]); // To display all stories

//   // Fetch all stories on mount
//   useEffect(() => {
//     const fetchStories = async () => {
//       console.log('Fetching all stories...'); // Log the fetch attempt
//       const stories = await getUserStories(); // Assuming this function fetches all stories
//       console.log('Fetched stories:', stories); // Log the fetched stories
//       setUserStories(stories);
//     };

//     fetchStories();

//     // Periodically clear expired stories
//     const intervalId = setInterval(async () => {
//       console.log('Clearing expired stories...');
//       await clearExpiredStories();
//       fetchStories(); // Update the displayed stories
//     }, 60000); // Run every minute

//     return () => clearInterval(intervalId); // Cleanup
//   }, []);

//   // Handle media change (for adding new stories)
//   const handleMediaChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type;

//       if (fileType.startsWith('image/') || fileType === 'video/mp4') {
//         const mediaURL = URL.createObjectURL(file);
//         const story = {
//           url: mediaURL,
//           type: fileType,
//         };

//         setMedia(story); // Update the preview
//         await saveStory(story); // Save story in the database

//         const updatedStories = await getUserStories(); // Fetch updated stories
//         console.log('Updated stories after save:', updatedStories);
//         setUserStories(updatedStories); // Refresh stories
//       } else {
//         alert('Please select an image or MP4 video.');
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Display existing stories in a horizontal scroll view */}
//       <div className="flex space-x-4 overflow-x-auto p-4">
//         {userStories.length > 0 ? (
//           userStories.map((story) => (
//             <div key={story.id} className="relative bg-white h-28 w-28 rounded-full mt-4">
//               {story.type === 'video/mp4' ? (
//                 <video
//                   src={story.url}
//                   className="rounded-full h-28 w-28"
//                   autoPlay
//                   loop
//                   muted
//                 ></video>
//               ) : (
//                 <img
//                   src={story.url}
//                   alt="Story"
//                   className="rounded-full h-28 w-28 object-cover"
//                 />
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No stories available</p> // If no stories are found
//         )}
//       </div>

//       {/* Upload new story */}
//       <div className="relative bg-white h-28 w-28 rounded-full mt-4 md:ml-5">
//         {media?.type === 'video/mp4' ? (
//           <video
//             src={media.url}
//             className="rounded-full h-28 w-28"
//             autoPlay
//             loop
//             muted
//           ></video>
//         ) : (
//           <img
//             src={media?.url || 'https://via.placeholder.com/150'}
//             alt="Story"
//             className="rounded-full h-28 w-28 cursor-pointer"
//             onClick={() => document.getElementById('mediaInput').click()}
//           />
//         )}

//         <input
//           id="mediaInput"
//           type="file"
//           accept="image/*,video/mp4"
//           className="hidden"
//           onChange={handleMediaChange}
//         />

//         <button
//           className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md"
//           onClick={() => document.getElementById('mediaInput').click()}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Stories;


// import React, { useState, useEffect } from 'react';
// import { saveStory, getUserStories, clearExpiredStories } from '../DbHelper/storiesDB';

// const Stories = () => {
//   const [media, setMedia] = useState(null); // For preview of new media
//   const [userStories, setUserStories] = useState([]); // To display all stories

//   // Fetch all stories on mount
//   useEffect(() => {
//     const fetchStories = async () => {
//       console.log('Fetching all stories...'); // Log the fetch attempt
//       const stories = await getUserStories(); // Assuming this function fetches all stories
//       console.log('Fetched stories:', stories); // Log the fetched stories
//       setUserStories(stories);
//     };

//     fetchStories();

//     // Periodically clear expired stories
//     const intervalId = setInterval(async () => {
//       console.log('Clearing expired stories...');
//       await clearExpiredStories();
//       fetchStories(); // Update the displayed stories
//     }, 60000); // Run every minute

//     return () => clearInterval(intervalId); // Cleanup
//   }, []);

//   // Handle media change (for adding new stories)
//   const handleMediaChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type;

//       if (fileType.startsWith('image/')) { // Only handle images now
//         const mediaURL = URL.createObjectURL(file);
//         const story = {
//           url: mediaURL,
//           type: fileType,
//         };

//         setMedia(story); // Update the preview
//         await saveStory(story); // Save story in the database

//         const updatedStories = await getUserStories(); // Fetch updated stories
//         console.log('Updated stories after save:', updatedStories);
//         setUserStories(updatedStories); // Refresh stories
//       } else {
//         alert('Please select an image.');
//       }
//     }
//   };

//   return (
//     <div>
//       {/* Display existing stories in a horizontal scroll view */}
//       <div className="flex space-x-4 overflow-x-auto p-4">
//         {userStories.length > 0 ? (
//           userStories.map((story) => (
//             <div key={story.id} className="relative bg-white h-28 w-28 rounded-full mt-4">
//               {/* Only display images now */}
//               <img
//                 src={story.url}
//                 alt="Story"
//                 className="rounded-full h-28 w-28 object-cover"
//               />
//             </div>
//           ))
//         ) : (
//           <p>No stories available</p> // If no stories are found
//         )}
//       </div>

//       {/* Upload new story */}
//       <div className="relative bg-white h-28 w-28 rounded-full mt-4 md:ml-5">
//         <img
//           src={media?.url || 'https://via.placeholder.com/150'}
//           alt="Story"
//           className="rounded-full h-28 w-28 cursor-pointer"
//           onClick={() => document.getElementById('mediaInput').click()}
//         />

//         <input
//           id="mediaInput"
//           type="file"
//           accept="image/*"
//           className="hidden"
//           onChange={handleMediaChange}
//         />

//         <button
//           className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md"
//           onClick={() => document.getElementById('mediaInput').click()}
//         >
//           +
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Stories;


import React, { useState, useEffect } from 'react';
import { saveStory, getUserStories, clearExpiredStories } from '../DbHelper/storiesDB';

const Stories = () => {
  const [media, setMedia] = useState(null); // For preview of new media
  const [userStories, setUserStories] = useState([]); // To display all stories

  // Fetch all stories on mount
  useEffect(() => {
    const fetchStories = async () => {
      console.log('Fetching all stories...');
      const stories = await getUserStories();
      console.log('Fetched stories:', stories);
      setUserStories(stories);
    };

    fetchStories();

    // Periodically clear expired stories
    const intervalId = setInterval(async () => {
      console.log('Clearing expired stories...');
      await clearExpiredStories();

      fetchStories();
    }, 10000); // Run every minute

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  // Handle media change (for adding new stories)
  const handleMediaChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type;

      if (fileType === 'video/mp4') {
        const mediaURL = URL.createObjectURL(file);
        const story = {
          url: mediaURL,
          type: fileType,
        };

        setMedia(story); // Update the preview
        await saveStory(story); // Save story in the database

        const updatedStories = await getUserStories(); // Fetch updated stories
        console.log('Updated stories after save:', updatedStories);
        setUserStories(updatedStories); // Refresh stories
      } else {
        alert('Please select an MP4 video.');
      }
    }
  };

  return (
    <div>
      {/* Display existing stories in a horizontal scroll view */}
      <div className="flex space-x-4 overflow-x-auto p-4">
        {userStories.length > 0 && (
          userStories.map((story) => (
            <div key={story.id} className="relative bg-white h-28 w-28 rounded-full mt-4 border-2 border-red-500 ">
              <video
                src={story.url}
                className="rounded-full h-[108px] w-28 object-fill"
                autoPlay
                loop
                muted
              ></video>
            </div>
          ))
        )}
      </div>

      {/* Upload new story */}
      <div className="relative border-2 border-red-500  h-28 w-28 rounded-full mt-4 md:ml-5 justify-center items-center ">
        <video
          src={media?.url || ''}
          className="rounded-full h-[105px] w-28 object-fill"
          autoPlay
          loop
          muted
        ></video>

        <input
          id="mediaInput"
          type="file"
          accept="video/mp4"
          className="hidden"
          onChange={handleMediaChange}
        />

        <button
          className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-md"
          onClick={() => document.getElementById('mediaInput').click()}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Stories;
