'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/page';

export default function ClientNavbarWrapper() {
  const pathname = usePathname();
  const shouldShowNavbar = !['/login', '/otp', '/Navbar', '/profile'].includes(pathname);

  return shouldShowNavbar ? <Navbar /> : null;
}
