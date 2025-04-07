'use client';

import { IoMdRadioButtonOn } from 'react-icons/io';
import { useState } from 'react';
import { GoPlus } from 'react-icons/go';

interface AddressProps {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Address({ setIsFormOpen }: AddressProps) {
  const [AddrForm, setAddrForm] = useState(false);

  function onAddressClick(): void {
    setAddrForm(true);
    setIsFormOpen((prev) => !prev);
  }

  return (
    // <Card>
    <div onClick={onAddressClick} className="cursor-pointer">
      {!AddrForm ? (
        <div className="flex p-4 my-4 space-x-10">
          <div>
            <GoPlus className="text-2xl text-green-700 font-bold" />
          </div>
          <div>
            <p className="text-green-700 text-md md:text-xl">Add new delivery Address</p>
          </div>
        </div>
      ) : (
        <div className="bg-green-700 text-white flex space-x-10 p-4 my-4">
          <div>
            <IoMdRadioButtonOn className="mt-1 text-3xl" />
          </div>
          <div>
            <p className="text-white text-md md:text-xl">Add new delivery Address</p>
          </div>
        </div>
      )}
    </div>
    // </Card>
  );
}
