'use client';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { MapPin } from 'lucide-react';
import { MdGpsFixed } from 'react-icons/md';
import { useCreateAddressMutation } from '@/services/api';
import { useState } from 'react';

interface AddAddressFormProps {
  onSubmit: (e: React.FormEvent) => void;
  // setAddressForm:() => void
}
const initialAddressState = {
  name: '',
  houseNumber: '',
  landmark: '',
  mobileNumber: '',
  villageArea: '',
  city: '',
  pincode: '',
  state: '',
  alternateNumber: '',
  label: '',
};

export function AddAddressForm({ onSubmit }: AddAddressFormProps) {
  const [addressForm, setAddressForm] = useState(initialAddressState);

  const [createAddress, { isLoading, isError }] = useCreateAddressMutation();

  const handleAddressSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(addressForm, 'addressForm');
    const response = await createAddress({ ...addressForm, isDefault: 0 });
    if (response?.data?.status === 1) setAddressForm(initialAddressState);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };
  return (
    <div className="p-4">
      {/* Use Current Address Button */}
      <div className="bg-blue-500 cursor-pointer flex items-center space-x-4 text-white p-3 w-full max-w-md mx-auto md:mx-0 md:w-72 rounded-md">
        <MdGpsFixed className="text-white text-2xl" />
        <p className="font-bold">Use my current address</p>
      </div>

      {/* Form */}
      <div className="text-center my-8">
        <form onSubmit={handleAddressSubmit} className="max-w-screen-md mx-auto space-y-6">
          {/* Name & House Number */}
          <div className="flex flex-col md:flex-row md:justify-between gap-y-4 md:gap-x-6">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              className="border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.name}
            />
            <input
              type="text"
              name="houseNumber"
              placeholder="House no / flat"
              className="border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.houseNumber}
            />
          </div>

          {/* Landmark & Mobile */}
          <div className="flex flex-col md:flex-row md:justify-between gap-y-4 md:gap-x-6">
            <input
              type="text"
              name="landmark"
              placeholder="Enter Landmark"
              className="border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.landmark}
            />
            <input
              type="number"
              name="mobileNumber"
              placeholder="Mobile Number"
              className="no-spinner border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.mobileNumber}
            />
          </div>

          {/* Village & City */}
          <div className="flex flex-col md:flex-row md:justify-between gap-y-4 md:gap-x-6">
            <input
              type="text"
              name="villageArea"
              placeholder="Village / area"
              className="border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.villageArea}
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.city}
            />
          </div>

          {/* Pincode & State */}
          <div className="flex flex-col md:flex-row md:justify-between gap-y-4 md:gap-x-6">
            <input
              type="number"
              name="pincode"
              placeholder="Pincode"
              className="no-spinner border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.pincode}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.state}
            />
          </div>

          {/* Alternate Number & Label */}
          <div className="flex flex-col md:flex-row md:justify-between gap-y-4 md:gap-x-6">
            <input
              type="number"
              name="alternateNumber"
              placeholder="Alternate mobile number"
              className="no-spinner border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.alternateNumber}
            />
            <input
              type="text"
              name="label"
              placeholder="Label (e.g. Home, Office)"
              className="border border-gray-400 p-2 w-full md:w-1/2"
              onChange={handleInputChange}
              value={addressForm.label}
            />
          </div>

          {/* Submit Button */}
          <div className="w-full md:w-1/3 mx-auto">
            <button className="w-full px-4 py-2 bg-green-700 hover:bg-green-600 font-bold text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
