'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiMenuFill } from 'react-icons/ri';
import { HiX } from 'react-icons/hi';

export const Dropdown = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Auto close when click outsie of dropdown
  useEffect(() => {
    const close = (e: any) => {
      if (!e.target.closest('.dropdown-wrapper')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
        aria-expanded={isOpen}
        aria-label="Menu"
      >
        {isOpen ? (
          <HiX className=" text-gray-200 w-8 h-8 hover:text-orange-500" />
        ) : (
          <RiMenuFill className=" text-gray-200 w-8 h-8 hover:text-orange-500" />
        )}
      </button>

      {isOpen && (
        <div className="fixed md:absolute right-2 lg:right-0 dropdown-wrapper top-[60px] w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
          <ul className="py-1">
            {[
              { name: 'About me', path: '/profile/user' },
              { name: 'Address', path: '/profile/adress' },
              { name: 'Wishlist', path: '/profile/whislist' },
              { name: 'Orders', path: '/profile/orders' },
              { name: 'Payment', path: '/profile/payments' },
              { name: 'Customer Care', path: '/profile/customercare' },
            ].map((item) => (
              <li key={item.name}>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-200"
                  onClick={() => {
                    router.push(item.path);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
