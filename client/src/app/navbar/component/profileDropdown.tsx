'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const Dropdown = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2"
        aria-expanded={isOpen}
        aria-label="Menu"
      >
        <img
          src={isOpen ? '/cancel.png' : '/hamburger.svg'}
          alt="Menu"
          className="w-6 h-6"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      </button>

      {isOpen && (
        <div className="fixed md:absolute -right-0 md:-left-28 top-[70px] md:top-9 w-[50%] md:w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 overflow-hidden">
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
