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
import CustomProfileIcon from '../Sidebar/CustomProfileIcon';
import CustomDocumentIcon from '../Sidebar/CustomDocumentIcon';
import CustomBellIcon from '../Sidebar/CustomBellIcon';
import CustomMailIcon from '../Sidebar/CustomMailIcon';

const routes = [
  // {
  //   label: 'Profile',
  //   icon: CustomProfileIcon,
  //   href: '/Profile',
  // },
  {
    label: 'Orders',
    icon: CustomDocumentIcon,
    href: '/Profile/orders',
  },
  {
    label: 'Address',
    icon: MapPin,
    href: '/Profile/adress',
  },
  {
    label: 'Favorites',
    icon: Heart,
    href: '/Profile/fav',
  },
  {
    label: 'Saved Payments',
    icon: CreditCard,
    href: '/Profile/payments',
  },
  {
    label: 'Customer Care',
    icon: CustomBellIcon,
    href: '/Profile/customercare',
  },
  {
    label: 'General Terms',
    icon: CustomMailIcon,
    href: '/Profile/terms',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-w-[304px]  hidden md:block h-screen bg-white border-r  pt-[25px] ">
      <nav className="flex flex-col py-1 pl-[18px]">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'relative flex items-center gap-[6px] px-4 py-[14.5px] text-sm font-medium transition-colors border-[1px] border-[#00000099]',
              pathname === route.href
                ? 'bg-[#FF7F324D]' // Active background
                : 'text-gray-700 hover:bg-[#FF7F324D]',
            )}
          >
            <route.icon className="h-[36px] w-[36px]" />
            <span>{route.label}</span>
            {pathname === route.href && (
              <div className="absolute left-0 top-0 bg-[#FF7F32] w-[13px] h-[64px]" />
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
