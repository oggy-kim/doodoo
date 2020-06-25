import axios from 'axios';
import keys from '../dev';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    // https://unsplash.com/documentation#public-actions
    Authorization: keys.unsplash,
  },
});
