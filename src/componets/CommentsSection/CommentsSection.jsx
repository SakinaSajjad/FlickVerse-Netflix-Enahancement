import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../DbHelper/DbHelper';
import { getAuth } from "firebase/auth";

function CommentsSection({ movieId }) {

  console.log(movieId, "movieIDD");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const auth = getAuth();

// Get the currently signed-in user
const userFirabase = auth.currentUser;

if (userFirabase) {
  // User is signed in
  console.log("User ID:", userFirabase.uid); // User ID
  console.log("Display Name:", userFirabase.displayName); // User's display name
  console.log("Email:", userFirabase.email); // User's email address
  console.log("Photo URL:", userFirabase.photoURL); // User's profile picture URL
  console.log("Email Verified:", userFirabase.emailVerified); // Whether the email is verified
} else{ // No user is signed in
console.log("No user is signed in.");
}

  // Fetch comments when the component mounts or movieId changes

  useEffect(() => {
    const fetchComments = async () => {
      console.log('Fetching comments for movieId:')
      console.log('Fetching comments for movieId:', movieId);  // Log movieId to confirm it's correct
      try {
        const movieComments = await getComments(movieId);
        console.log(movieComments, "movie Comments");  // Log fetched comments
        setComments(movieComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    if (movieId) {
      fetchComments();
    }
  }, [movieId]);

  const user = {
    id: Math.floor(Math.random() * 1000),  // Random user ID
    name: userFirabase.displayName ? userFirabase.displayName : `User${Math.floor(Math.random() * 100)}`,  // Random user name
    avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`, // Random user avatar
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return; // Don't add empty comments
    const commentData = {
      movieId,
      userId: user.id,
      username: user.name,
      userAvatar: user.avatar,
      commentText: newComment,
      timestamp: Date.now(),
    };
    await addComment(commentData); // This will save the comment with the movieId
    setComments((prev) => [...prev, commentData]); // Update local state
    setNewComment(''); // Clear input field
  };


  return (
    <section className="bg-[#1c1c1c] text-white p-5 sm:p-14 lg:p-20">
      <h2 className="text-2xl font-bold mb-5">Comments</h2>
      <div className="mb-5">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full p-3 rounded-md border border-gray-700 bg-[#2c2c2c] text-white focus:outline-none focus:border-red-700"
          rows={4}
        ></textarea>
        <button
          onClick={handleAddComment}
          className="mt-3 bg-red-700 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md transition"
        >
          Add Comment
        </button>
      </div>

      <div>
        {comments.length === 0 ? (
          <p className="text-gray-400">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id || comment.timestamp} // Use id or fallback to timestamp if id is missing
              className="flex items-start mb-5 border-b border-gray-700 pb-4"
            >
              <img
                src={comment.userAvatar}  // Using userAvatar here
                alt="User avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <h4 className="font-bold text-red-500">{comment.username}</h4>
                <p className="text-gray-300">{comment.commentText}</p> {/* Using commentText here */}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default CommentsSection;
