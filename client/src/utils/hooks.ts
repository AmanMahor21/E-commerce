export const fetchImages = async (query: string) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
  );
  const data = await response.json();
  if (data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return data.results[randomIndex]?.urls?.regular || '/product-fallback.png';
  }

  return null;
};
