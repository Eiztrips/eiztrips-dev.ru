export const fetchRandomCatGif = async (): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5000/api/random-cat-gif');
    if (!response.ok) {
      throw new Error('Failed to fetch cat gif');
    }
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error fetching random cat gif:', error);
    return 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif';
  }
};
