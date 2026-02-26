import { User } from '../interfaces/user.interface';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Errore durante il recupero degli utenti');
    return response.json();
  },
  
  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Errore recupero utente');
    return response.json();
  }
};