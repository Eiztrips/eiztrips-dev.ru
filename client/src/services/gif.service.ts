export const fetchRandomCatGif = async (): Promise<string> => {
  try {
    // Using a relative URL that will automatically match the site's protocol
    const response = await fetch('/api/random-cat-gif');
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
