'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'regenerator-runtime/runtime';
import HomePage from './HomePage/page';
import Navbar from './Navbar/page';
// import useAuth from '@/utils/useAuth';
import { useLazyRefreshTokenQuery } from '@/services/authApi';

import { usePathname } from 'next/navigation';
// import { useRefreshTokenQuery } from '@/services/authApi';
export default function Home() {
  // const { data } = useRefreshTokenQuery();
  const [refreshToken] = useLazyRefreshTokenQuery();
  const pathname = usePathname();
  console.log(pathname, 'nameeeeeeasd');
  return (
    <>
      {/* {pathname !== '/login' && <Navbar />} */}
      <HomePage />
    </>
  );
}

// 'use client';
// import 'regenerator-runtime/runtime';
// import Link from 'next/link';
// import { useEffect } from 'react';
// import HomePage from './HomePage/page';
// import Navbar from './Navbar/page';
// // import useAuth from '@/utils/useAuth';
// import { useLazyRefreshTokenQuery } from '@/services/authApi';
// // import { useRefreshTokenQuery } from '@/services/authApi';

// export default function Home() {
//   // const { data } = useRefreshTokenQuery();
//   const [refreshToken] = useLazyRefreshTokenQuery();

//   return (
//     <>
//       <Navbar />
//       <HomePage />
//       {/* <div>
//         {' '}
//         Login :{' '}
//         <Link className="underline text-blue-600" href="/Login">
//           Login
//         </Link>
//       </div>
//       <div>
//         {' '}
//         Otp :{' '}
//         <Link className="underline text-blue-600" href="/Otp">
//           Otp
//         </Link>
//       </div> */}
//       {/* <div>
//         HomePage :
//         <Link className="underline text-blue-600" href="/HomePage">
//           HomePage
//         </Link>
//       </div> */}
//       {/* <div>
//         StorePage :
//         <Link className="underline text-blue-600" href="/StorePage">
//           StorePage
//         </Link>
//       </div>
//       <div>
//         ProfilePAge :
//         <Link className="underline text-blue-600" href="/Profile">
//           ProfilePage
//         </Link>
//       </div>
//       <div>

//         Product :
//         <Link className="underline text-blue-600" href="/Product">
//           Product
//         </Link>
//       </div>
//       <div>
//         Categories :
//         <Link className="underline text-blue-600" href="/categories">
//           Categories
//         </Link>
//       </div>
//       <div>
//         Cart :
//         <Link className="underline text-blue-600" href="/cart">
//           Cart
//         </Link>
//       </div>
//       <div>
//         Checkout :
//         <Link className="underline text-blue-600" href="/Checkout">
//           Checkout
//         </Link>
//       </div> */}
//     </>
//   );
// }
