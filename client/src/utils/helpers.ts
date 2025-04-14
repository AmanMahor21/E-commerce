export const extractCategory = (keyword: string) => {
  const getCategory = keyword.split(',').pop();
  const getproductName = keyword.split(',')[1].slice(1, -1);
  return { getCategory, getproductName };
};

export const SortBy = [
  { popularity: 'popularity' },
  { lowToHigh: 'Price--Low to High' },
  { highToLow: 'Price--High to Low' },
];

export const getReadableNameFromPath = (pathname: string) => {
  const parts = pathname.split('/');
  const last = parts[parts.length - 1];
  return last
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const decodeDescription = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  const decoded = textarea.value;
  const featureList = decoded
    .replace(/&amp\s*sbquo/g, ',')
    .replace(/<\/?p>/g, '')
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return featureList;
};
