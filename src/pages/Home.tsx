import React, { useState } from 'react';
import { Header, SearchBar, PostItem, PostDetailCard } from '../components';
import { usePostsData } from '../hooks/usePostsData';
import { LayoutGrid, List } from 'lucide-react';
import { Post } from '../interfaces/post.interface';


const HomePage: React.FC = () => {
  const { users, filteredPosts, isLoading, searchTerm, setSearchTerm, deletePost } = usePostsData();
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (isLoading) return <div className="p-20 text-center font-bold text-red-600">Caricamento Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="sticky-nav-header">
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Header />
          <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 w-full"><SearchBar value={searchTerm} onChange={setSearchTerm} /></div>
            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-500'}`}><List className="w-5 h-5" /></button>
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-500'}`}><LayoutGrid className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-6xl py-10">
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-4"}>
          {filteredPosts.map(post => (
            <PostItem key={post.id} post={post} user={users.find(u => u.id === post.userId)} viewMode={viewMode} onOpen={() => setSelectedPost(post)} />
          ))}
        </div>
        {selectedPost && (
          <PostDetailCard 
            post={selectedPost} 
            user={users.find(u => u.id === selectedPost.userId)!}
            onClose={() => setSelectedPost(null)}
            onDelete={(id) => { deletePost(id); setSelectedPost(null); }}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;