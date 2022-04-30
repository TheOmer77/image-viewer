import axios from 'axios';

export const UNSPLASH_BASE_URL = 'https://api.unsplash.com/';
export const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default axios.create({
  baseURL: UNSPLASH_BASE_URL,
  headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
});
