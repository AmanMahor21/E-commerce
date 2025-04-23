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
    href: '/profile/whislist',
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
    <aside className="min-w-[280px] hidden left-0 lg:flex fixed top-6 h-screen bg-slate-900 border-r shadow-md flex-wrap">
      <nav className="flex flex-col space-y-2 ps-4 mt-4 fixed top-24 grow w-max">
        {routes.map((route) => {
          const isActive = pathname === route.href;
          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ',
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
  );
}
