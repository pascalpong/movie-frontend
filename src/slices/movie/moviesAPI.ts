export const fetchMovies = async () => {
    const response = await fetch('http://127.0.0.1:8000/movies');
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return response.json();
};