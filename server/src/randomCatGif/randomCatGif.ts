import axios from 'axios';

export async function fetchRandomCatGif(): Promise<string | null> {
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/random', {
      params: {
        api_key: 'dc6zaTOxFJmzC',
        tag: 'cat',
        rating: 'g'
      }
    });

    if (response.data && response.data.data && response.data.data.images) {
      return response.data.data.images.original.url;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching cat gif:', error);
    return null;
  }
}
