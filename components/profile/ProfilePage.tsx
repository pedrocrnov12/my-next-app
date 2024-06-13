import React, { useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import CreatePost from '../createPost/createpost';
const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleShowCreatePost = () => {
    setShowCreatePost(true);
  };

  return (
    <div className="container mx-auto my-8 p-4 border rounded">
      <h2 className="text-2xl mb-4">Profile</h2>
      <button
        onClick={handleShowCreatePost}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Add Post
      </button>
      {showCreatePost && <CreatePost />}
    </div>
  );
};

export default ProfilePage;
