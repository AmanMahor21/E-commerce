// import { useGetAddressListQuery } from '@/services/api';
// import React from 'react';

// const AddressListModal = () => {
//   const { data } = useGetAddressListQuery();
//   console.log(data, 'mnnvn');

//   return <div></div>;
// };

// export default AddressListModal;
import { useGetAddressListQuery } from '@/services/api';
import React, { useState } from 'react';

interface props {
  isOpen: boolean;
  onClose: () => void;
}
const AddressListModal: React.FC<props> = ({ isOpen, onClose }) => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const { data } = useGetAddressListQuery();

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Select Delivery Address</h2>

        {/* Address List */}
        <div className="space-y-3 mb-6">
          {data?.data.map((addr) => (
            <label key={addr.addressId} className="flex items-start space-x-3 cursor-pointer">
              <input
                type="radio"
                name="address"
                value={addr.addressId}
                checked={selectedAddress === addr.addressId}
                onChange={() => setSelectedAddress(addr.addressId)}
                className="mt-1"
              />
              <div>
                <div className="font-medium">
                  {addr.name}, {addr.pincode}
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">HOME</span>
                </div>
                <div className="text-sm text-gray-600">
                  {addr.houseNumber}, {addr.villageArea}, {addr.landmark}, {addr.city}
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Pincode Section */}
        <div className="mb-4">
          <p className="font-medium mb-2">Use pincode to check delivery info</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter pincode"
              className="border px-3 py-2 rounded w-full"
            />
            <button className="bg-gray-200 text-sm px-3 py-2 rounded">Submit</button>
          </div>
          <div className="mt-2 text-blue-600 cursor-pointer text-sm hover:underline">
            📍 Use my current location
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default AddressListModal;
