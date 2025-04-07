'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../navbar/page';

export default function ClientNavbarWrapper() {
  const pathname = usePathname();
  const shouldShowNavbar = !['/login', '/otp', '/navbar', '/profile'].includes(pathname);

  return shouldShowNavbar ? <Navbar /> : null;
}
