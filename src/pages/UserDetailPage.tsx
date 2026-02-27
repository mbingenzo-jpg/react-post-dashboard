import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Globe, MapPin, Briefcase } from 'lucide-react';
import { useUserData } from '../hooks/useUserData';
import { PostItem, PostDetailCard } from '../components';
import { Post } from '../interfaces/post.interface';

const UserDetailPage: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, userPosts: posts, isLoading } = useUserData(userId);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (isLoading) return <div className="p-20 text-center text-red-700 font-bold">Caricamento profilo...</div>;
  if (!user) return <div className="p-20 text-center font-bold">Utente non trovato.</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="sticky-nav-header">
        <div className="container mx-auto px-4 max-w-6xl py-4">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-600 hover:text-red-600 font-bold transition-colors">
            <ArrowLeft className="w-5 h-5" /> Torna alla Dashboard
          </button>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-6xl mt-10">
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 mb-12 shadow-sm border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="w-32 h-32 rounded-2xl bg-red-600 flex items-center justify-center text-white text-5xl font-black shadow-xl shadow-red-500/20">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{user.name}</h1>
              <p className="text-red-600 font-bold text-xl mb-6">@{user.username}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-center md:justify-start gap-3"><Mail className="w-4 h-4 text-red-600" /> {user.email}</div>
                <div className="flex items-center justify-center md:justify-start gap-3"><Globe className="w-4 h-4 text-red-600" /> {user.website}</div>
                <div className="flex items-center justify-center md:justify-start gap-3"><MapPin className="w-4 h-4 text-red-600" /> {user.address.city}</div>
                <div className="flex items-center justify-center md:justify-start gap-3"><Briefcase className="w-4 h-4 text-red-600" /> {user.company.name}</div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-black text-red-800 dark:text-red-500 mb-8 pl-4 border-l-4 border-red-600">Post Pubblicati ({posts.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostItem key={post.id} post={post} user={user} viewMode="grid" onOpen={() => setSelectedPost(post)} />
          ))}
        </div>
      </main>

      {selectedPost && (
        <PostDetailCard 
          post={selectedPost} 
          user={user}
          onClose={() => setSelectedPost(null)}
          onDelete={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
};

export default UserDetailPage;