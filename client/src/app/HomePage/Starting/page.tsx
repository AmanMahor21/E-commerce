import { ProductCard } from './Product/ProductCard'; // Adjust the import path based on your file structure

export default function Page() {
  const products = [
    {
      price: 'From ₹299',
      name: 'Chicken Pickle',
      mainImage: '/ChickenPickle.svg',
      bannerImage: '/Banner.svg',
    },
    {
      price: 'From ₹399',
      name: 'Mutton Pickle',
      mainImage: '/ChickenPickle.svg',
      bannerImage: '/Banner.svg',
    },
    {
      price: 'From ₹199',
      name: 'Fish Pickle',
      mainImage: '/ChickenPickle.svg',
      bannerImage: '/Banner.svg',
    },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-around gap-4">
        {products.map((product, index) => (
          <div key={index} className="">
            <ProductCard
              price={product.price}
              name={product.name}
              mainImage={product.mainImage}
              bannerImage={product.bannerImage}
            />
          </div>
        ))}
      </div>
    </>
  );
  // return (
  //   <div className="flex items-center justify-around w-3/4">
  //     {products.map((product, index) => (
  //       <ProductCard
  //         key={index}
  //         price={product.price}
  //         name={product.name}
  //         mainImage={product.mainImage}
  //         bannerImage={product.bannerImage}
  //       />
  //     ))}
  //   </div>
  // );
}
