import axios from 'axios';

const giphyApiKey = '';

export const fetchRandomCatGif = async (): Promise<string | null> => {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: giphyApiKey,
        tag: 'cat',
        rating: 'g',
      },
    });

    if (response.data && response.data.data && response.data.data.images) {
      return response.data.data.images.original.url;
    } else {
      console.log('No gif data found in the response.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching random cat gif:', error);
    return null;
  }
};
