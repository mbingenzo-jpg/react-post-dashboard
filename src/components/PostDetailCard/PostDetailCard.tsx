import React from 'react';
import { Trash2 } from 'lucide-react';
import { Post } from '../../interfaces/post.interface';
import { User as UserType } from '../../interfaces/user.interface';
interface PostDetailCardProps {
  post: Post;
  user: UserType;
  onClose: () => void;
  onDelete: (id: number) => void;
}

export const PostDetailCard: React.FC<PostDetailCardProps> = ({ post, user, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-200 p-8 border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-tighter">
          post pubblicato da: <span className="font-bold text-red-800">{user.name} alias {user.username}</span>
        </p>

        <h2 className="text-3xl font-bold text-red-700 dark:text-red-500 mb-6 leading-tight">
          {post.title}
        </h2>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-10">
          {post.body}
        </p>

        <div className="flex flex-wrap gap-3">
          <button onClick={onClose} className="btn-red-filled">
            Chiudi
          </button>
          
          <button onClick={() => onDelete(post.id)} className="btn-red-outline">
            <Trash2 className="w-5 h-5" /> Elimina Post
          </button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};