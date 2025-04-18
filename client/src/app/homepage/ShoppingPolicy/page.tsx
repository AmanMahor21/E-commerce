import { Truck, Headphones, RotateCcw, CreditCard, Coins } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-8 h-8 text-orange-500" />,
    title: 'FREE DELIVERY',
    subtitle: 'From $59.89',
  },
  {
    icon: <Headphones className="w-8 h-8 text-orange-500" />,
    title: 'SUPPORT 24/7',
    subtitle: 'Online 24 Hours',
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-orange-500" />,
    title: 'FREE RETURN',
    subtitle: '365 A Day',
  },
  {
    icon: <CreditCard className="w-8 h-8 text-orange-500" />,
    title: 'PAYMENT METHOD',
    subtitle: 'Secure Payment',
  },
  {
    icon: <Coins className="w-8 h-8 text-orange-500" />,
    title: 'BIG SAVING',
    subtitle: 'Weekend Sales',
  },
];

const Features = () => {
  return (
    <div className="bg-white shadow-sm  rounded-md  flex justify-center mx-7 lg:mt-3">
      {/* <div className="bg-white shadow-sm  rounded-md  flex justify-center mx-7 mt-8"> */}
      <div className="flex flex-wrap p-4  md:flex-nowrap border w-full lg:w-[90%] divide-y md:divide-y-0 md:divide-x">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex w-full justify-center md:w-3/5 items-center gap-3 px-4 py-3"
          >
            {feature.icon}
            <div className="cursor-pointer hover:text-orange-500">
              <div className="font-semibold text-sm">{feature.title}</div>
              <div className="text-gray-500 text-xs">{feature.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
// import { Carousel } from 'react-bootstrap';
// import { Truck, Headphones, RotateCcw, CreditCard, Coins } from 'lucide-react';

// const features = [
//   {
//     icon: <Truck className="w-8 h-8 text-orange-500" />,
//     title: 'FREE DELIVERY',
//     subtitle: 'From $59.89',
//   },
//   {
//     icon: <Headphones className="w-8 h-8 text-orange-500" />,
//     title: 'SUPPORT 24/7',
//     subtitle: 'Online 24 Hours',
//   },
//   {
//     icon: <RotateCcw className="w-8 h-8 text-orange-500" />,
//     title: 'FREE RETURN',
//     subtitle: '365 A Day',
//   },
//   {
//     icon: <CreditCard className="w-8 h-8 text-orange-500" />,
//     title: 'PAYMENT METHOD',
//     subtitle: 'Secure Payment',
//   },
//   {
//     icon: <Coins className="w-8 h-8 text-orange-500" />,
//     title: 'BIG SAVING',
//     subtitle: 'Weekend Sales',
//   },
// ];

// function FeatureCarouselBootstrap() {
//   return (
//     <Carousel interval={3000}>
//       {features.map((f, index) => (
//         <Carousel.Item key={index}>
//           <div className="flex justify-center items-center h-40">
//             {f.icon}
//             <div className="ml-4">
//               <h5 className="text-sm font-bold">{f.title}</h5>
//               <p className="text-xs text-gray-500">{f.subtitle}</p>
//             </div>
//           </div>
//         </Carousel.Item>
//       ))}
//     </Carousel>
//   );
// }

// export default FeatureCarouselBootstrap;
