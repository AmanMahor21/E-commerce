'use client';

import { useEffect, useState } from 'react';
import { HousePlus, MapPin, PenSquare } from 'lucide-react';
import Sidebar from '../Sidebar/page';
import { AddAddressForm } from './add-adress';
import { useGetAddressListQuery, useUpdateAddressMutation } from '@/services/api';
import { GetAddress } from '@/services/types';
import { AddressModal } from '../components/AddressModal';
import { useDispatch } from 'react-redux';
// import Auth from '@/app/auth/page';
// import auth from '@/utils/page';
type Address = {
  id: number;
  name: string;
  delivery: string;
  images: string[];
  pincode: string;
  phone: string;
  address: string;
  city?: string;
  postalCode?: string;
  isSelected?: boolean;
};

const addresses: Address[] = [
  {
    id: 1,
    name: 'Home',
    delivery: 'Delivering to',
    images: [],
    pincode: '507303',
    phone: '7780417876',
    address: 'mig - 85, Sathpally, khammam,',
    city: 'Hyderabad, telengana',
    postalCode: '500072',
    isSelected: true,
  },
  {
    id: 2,
    name: 'Work',
    delivery: 'Delivering to',
    images: [],
    pincode: '507303',
    phone: '7757473773',
    address: 'mig - 85, Sathpally, khamm...',
  },
];

// function AddressCard(address: GetAddress , setDefaultAddress:() => void) {
function AddressCard({
  address,
  setDefaultAddress,
}: {
  address: GetAddress;
  setDefaultAddress: (address: GetAddress) => void;
}) {
  // Auth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<GetAddress>();
  const [updateAddress, { data }] = useUpdateAddressMutation();

  // Selecting the address to edit
  const handleEdit = (updatedAddress: any) => {
    // console.log(updateAddress, 'qq');
    updateAddress(updatedAddress);
    setIsOpen(true);
    if (address) setSelectedAddress(address);
  };

  // Passing the selected address in a callback function to set it as the default address.
  const handleDefaultAddress = async () => {
    setDefaultAddress(address);
  };
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm ">
      <div className="flex items-start gap-3">
        <div
          onClick={handleDefaultAddress}
          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 ${Number(address.isDefault) === 1 ? 'bg-orange-500' : 'border-gray-300'}`}
        ></div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap text-gray-600 mb-1">
                <span>Delivering to -</span>
                <span className="font-medium">{address?.pincode}</span>
                <span className="text-gray-400">|</span>
                <span className="font-medium">{address.mobileNumber}</span>
              </div>
              {address.city && address.pincode && (
                <p className="text-gray-600">
                  {address.houseNumber}, {address.villageArea}, {address.landmark}, {address.city}
                </p>
              )}
            </div>
            <button
              className="flex items-center gap-2 font-bold text-gray-600 hover:text-orange-400"
              onClick={(e) => handleEdit}
            >
              <span>edit</span>
              <PenSquare className="w-5 h-5" />
            </button>
            <AddressModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              address={selectedAddress || ({} as GetAddress)}
              onSave={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  // const initialAddressState = {
  //   name: '',
  //   houseNumber: '',
  //   landmark: '',
  //   mobileNumber: '',
  //   villageArea: '',
  //   city: '',
  //   pincode: '',
  //   state: '',
  //   alternateNumber: '',
  //   label: '',
  // };
  const [showAddForm, setShowAddForm] = useState(false);
  const { data } = useGetAddressListQuery();
  const addressList: GetAddress[] = data?.data ?? [];
  const [updateAddress] = useUpdateAddressMutation();
  const dispatch = useDispatch();

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(false);
  };

  // Removing the previous default address and setting a new one as the default.
  const setDefaultAddress = async (address: GetAddress) => {
    const currentDefault = addressList.find((a) => Number(a.isDefault) === 1);
    if (!currentDefault) {
      await updateAddress({ ...address, isDefault: 1 });
      return;
    }
    if (currentDefault.addressId === address.addressId) {
      console.log('Address is already default');
      return;
    }
    try {
      await updateAddress({ ...currentDefault, isDefault: 0 });
      await updateAddress({ ...address, isDefault: 1 });
    } catch (err) {
      console.error('Failed to update default address', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-[96px]">
      <Sidebar />
      <main className=" p-6 w-full lg:w-2/3 mx-auto">
        <div className="bg-zinc-600 text-slate-100 p-4 rounded-lg mb-6 flex items-center gap-3">
          <HousePlus className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Saved addresses</h1>
        </div>

        <div className="space-y-4">
          {addressList.map((address) => (
            <AddressCard
              key={address.addressId}
              address={address}
              setDefaultAddress={setDefaultAddress}
            />
          ))}

          <button
            className={`w-full rounded-lg p-4 text-gray-800 flex items-center gap-3 transition-colors border ${showAddForm ? 'bg-zinc-600 text-white' : 'bg-white hover:bg-gray-50'}`}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <MapPin className="w-6 h-6" />
            Add new delivery Address
          </button>

          {showAddForm && <AddAddressForm onSubmit={handleAddAddress} />}
        </div>
      </main>
    </div>
  );
}
