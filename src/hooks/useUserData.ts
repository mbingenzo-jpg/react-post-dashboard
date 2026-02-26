import { useState, useEffect } from 'react';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';
import { userService } from '../services/user.service';
import { postService } from '../services/post.service';

export const useUserData = (userId: string | undefined) => {
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!userId) return;
      
      setIsLoading(true); 
      try {
        const [userData, postsData] = await Promise.all([
          userService.getUser(Number(userId)),
          postService.getPostsByUser(Number(userId))
        ]);
        setUser(userData);
        setUserPosts(postsData);
      } catch (error) {
        console.error("Errore durante il recupero dei dati utente:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  return {
    user,
    userPosts,
    isLoading
  };
};