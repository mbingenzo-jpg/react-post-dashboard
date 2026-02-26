import { useState, useEffect, useMemo } from 'react';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { postService } from '../services/post.service';
import { userService } from '../services/user.service';

export const usePostsData = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, usersData] = await Promise.all([
          postService.getPosts(), 
          userService.getUsers()
        ]);
        setPosts(postsData);
        setUsers(usersData);
        setIsLoading(false);
      } catch (error) { 
        console.error("Errore API:", error);
        setIsLoading(false); 
      }
    };
    loadData();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  const deletePost = (idToDelete: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== idToDelete));
  };

  return {
    posts,
    users,
    filteredPosts,
    isLoading,
    searchTerm,
    setSearchTerm,
    deletePost
  };
};