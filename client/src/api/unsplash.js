import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    // https://unsplash.com/documentation#public-actions
    Authorization: process.env.REACT_APP_UNSPLASH,
  },
});
