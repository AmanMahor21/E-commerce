import React from 'react';

const CategoryLoader = () => {
  return (
    <div className="flex gap-4 w-full justify-center flex-wrap">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`w-40 h-10 bg-slate-300 rounded shadow-md animate-pulse ${i > 3 ? 'hidden md:block' : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default CategoryLoader;
