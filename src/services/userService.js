const API_URL =
  'https://nodeapi-1-jguo.onrender.com';

export const getUsersApi = async () => {
  try {
    const response = await fetch(
      `${API_URL}/getdata`,
    );

    console.log('STATUS:', response.status);

    const data = await response.json();

    console.log('API DATA:', data);

    return data;
  } catch (error) {
    console.log(
      'FETCH ERROR:',
      error.message,
    );

    throw error;
  }
};