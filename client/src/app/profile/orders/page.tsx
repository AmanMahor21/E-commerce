'use client';
import Image from 'next/image';
import { User, ShoppingBag, MapPin, Heart, CreditCard, Headphones, FileText } from 'lucide-react';
import Sidebar from '../Sidebar/page';
import { useRouter } from 'next/navigation';

type OrderItem = {
  name: string;
  image: string;
};

type Order = {
  id: number;
  delivery: string;
  items: OrderItem[];
};

const orders: Order[] = [
  {
    id: 1,
    delivery: 'delivery expected by 24 nov',
    items: [
      {
        name: 'Chicken Pickle (250 g)',
        image: '/Frame 1000006486.svg',
      },
    ],
  },
  {
    id: 2,
    delivery: 'Order Delivered on oct 11',
    items: [
      {
        name: 'Chicken Pickle (250 g)',
        image: '/Frame 1000006486.svg',
      },
      {
        name: 'Coffee Chicken Pickle (250 g)',
        image: '/Frame 1000006486.svg',
      },
    ],
  },
];

export default function OrdersPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row bg-gray-50 mt-24 min-h-screen">
      <Sidebar />

      <main className="lg:ml-72  h-screen w-full p-4">
        <div className="w-full space-y-6 px-4 md:px-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className={index !== 0 ? 'mt-6 pt-6 border-t border-gray-100' : ''}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-600 truncate">Andhra pickle Store</p>
                      <h3 className="font-medium truncate">{item.name}</h3>
                    </div>
                    {index === 0 && (
                      <div className="sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
                        <p
                          className={`font-medium ${
                            order.delivery.includes('expected')
                              ? 'text-yellow-600'
                              : 'text-green-600'
                          }`}
                        >
                          {order.delivery}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.delivery.includes('expected')
                            ? 'Item yet to deliver on the way'
                            : 'Item reached You'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end px-4 md:px-6 py-6 bg-gray-50 border-t border-gray-200">
          <button
            type="submit"
            onClick={() => router.push('/checkout')}
            className="w-full md:w-48 py-3 bg-orange-500 text-white rounded-lg text-base md:text-lg font-medium hover:bg-orange-600 transition-colors duration-300 shadow-md"
          >
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}
