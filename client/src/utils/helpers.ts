export const extractCategory = (keyword: string) => {
  const getCategory = keyword.split(',').pop();
  //   const getCategory = keyword.split(',')[0].slice(1, -1);
  const getproductName = keyword.split(',')[1].slice(1, -1);
  console.log(getCategory, 'slogggggggggggg');
  console.log(getproductName, 'getproductName');
  return { getCategory, getproductName };
};

