import { GithubRepository, GithubUser } from '../types/github.types';

export const fetchUserRepositories = async (username: string): Promise<GithubRepository[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

export const fetchUserProfile = async (username: string): Promise<GithubUser | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
