import React from 'react';

const CategoryLoader = () => {
  return (
    <div className="flex gap-4 w-full justify-center flex-wrap">
      {[...Array(6)].map((_, i) => (
        <div key={i} className={`flex gap-2 justify-center ${i > 3 ? 'hidden md:block' : ''}`}>
          <div
            className={`w-40 h-10 bg-gray-200/50 rounded-lg shadow-sm flex justify-end pr-4 animate-pulse`}
          >
            <div className="w-2 h-10 flex items-center justify-center animate-pulse text-gray-200 rotate-180">
              ^
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryLoader;
