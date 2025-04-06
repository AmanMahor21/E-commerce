'use client';

import { cn } from '../lib/utils';
import {
  CreditCard,
  HeadphonesIcon,
  Heart,
  MapPin,
  Package,
  Receipt,
  RefreshCcw,
  User2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CustomProfileIcon from './CustomProfileIcon';
import CustomDocumentIcon from './CustomDocumentIcon';
import CustomBellIcon from './CustomBellIcon';
import CustomMailIcon from './CustomMailIcon';

const routes = [
  // {
  //   label: 'Profile',
  //   icon: CustomProfileIcon,
  //   href: '/Profile',
  // },
  {
    label: 'Orders',
    icon: CustomDocumentIcon,
    href: '/profile/orders',
  },
  {
    label: 'Address',
    icon: MapPin,
    href: '/profile/adress',
  },
  {
    label: 'Favorites',
    icon: Heart,
    href: '/profile/fav',
  },
  {
    label: 'Saved Payments',
    icon: CreditCard,
    href: '/profile/payments',
  },
  {
    label: 'Customer Care',
    icon: CustomBellIcon,
    href: '/profile/customercare',
  },
  {
    label: 'General Terms',
    icon: CustomMailIcon,
    href: '/profile/terms',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-w-[280px] mt-24 hidden lg:block fixed top-0 left-0 h-screen overflow-y-auto bg-slate-900 border-r shadow-md pt-6">
      {/* // <div className="pr-[18px] pl-12 hidden lg:block fixed top-0 left-0 h-screen overflow-y-auto"> */}

      {/* <aside className="min-w-[280px] hidden lg:block h-screen bg-slate-900 border-r shadow-md pt-6"> */}
      <nav className="flex flex-col space-y-2 px-4">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-[#FF7F32]/20 text-[#FF7F32] font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-[#FF7F32] hover:bg-[#FF7F32]/10',
              )}
            >
              <route.icon className="h-6 w-6 flex-shrink-0" />
              <span className="text-sm">{route.label}</span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-5 bg-[#FF7F32] rounded-r-md" />
              )}
            </Link>
          );
        })}
      </nav>
    </aside>

    // <aside className="min-w-[304px]  hidden lg:block h-screen bg-white border-r  pt-[25px] ">
    //   <nav className="flex flex-col py-1 pl-[18px]">
    //     {routes.map((route) => (
    //       <Link
    //         key={route.href}
    //         href={route.href}
    //         className={cn(
    //           'relative flex items-center gap-[6px] px-4 py-[14.5px] text-sm font-medium transition-colors border-[1px] border-[#00000099]',
    //           pathname === route.href
    //             ? 'bg-[#FF7F324D]' // Active background
    //             : 'text-gray-700 hover:bg-[#FF7F324D]',
    //         )}
    //       >
    //         <route.icon className="h-[36px] w-[36px]" />
    //         <span>{route.label}</span>
    //         {pathname === route.href && (
    //           <div className="absolute left-0 top-0 bg-[#FF7F32] w-[13px] h-[64px]" />
    //         )}
    //       </Link>
    //     ))}
    //   </nav>
    // </aside>
  );
}
