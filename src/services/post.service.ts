import { Post } from '../interfaces/post.interface';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const postService = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${BASE_URL}/posts`);
    if (!response.ok) throw new Error('Errore durante il recupero dei post');
    return response.json();
  },

  getPostsByUser: async (userId: number): Promise<Post[]> => {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    if (!response.ok) throw new Error('Errore recupero post utente');
    return response.json();
  }
};