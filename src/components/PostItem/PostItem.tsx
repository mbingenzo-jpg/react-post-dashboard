import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../interfaces/post.interface';
import { User as UserType } from '../../interfaces/user.interface';

interface PostItemProps {
  post: Post;
  user?: UserType;
  viewMode: 'list' | 'grid';
  onOpen: () => void;
}

export const PostItem: React.FC<PostItemProps> = ({ post, user, viewMode, onOpen }) => {
  const navigate = useNavigate();

   const getInitials = (name?: string) => {
    if (!name) return '??';
    const parts = name.split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  };
  
  const handleUserClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/user/${post.userId}`);
  };

  return (
    <div 
      onClick={onOpen}
      className={`post-card-container ${viewMode === 'list' ? 'flex items-center gap-4 p-4' : 'flex flex-col p-6 h-full'}`}
    >
      <div className="avatar-red-square">
        {getInitials(user?.name)}
      </div>

      <div className="flex-1">
        <h3 className="post-title-link">
          {post.title}
        </h3>
        
        <p className="text-sm text-slate-500">
          pubblicato da: 
          <span 
            onClick={handleUserClick} 
            className="ml-1 font-semibold text-red-700 hover:underline cursor-pointer"
          >
            {user?.username}
          </span>
        </p>
      </div>
    </div>
  );
};