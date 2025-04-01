import { GetAddress } from '@/services/types';
import React, { useState } from 'react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: GetAddress;
  onSave: (updatedAddress: GetAddress) => void;
}

export const AddressModal: React.FC<AddressModalProps> = ({ isOpen, onClose, address, onSave }) => {
  if (!isOpen) return null;

  const [editedAddress, setEditedAddress] = useState({ ...address });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAddress({ ...editedAddress, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(editedAddress);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 mt-16 pt-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/5 relative mt-5">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 pr-3 text-2xl">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Address</h2>

        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedAddress.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="houseNumber" className="font-semibold">
              House Number
            </label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              value={editedAddress.houseNumber}
              onChange={handleChange}
              placeholder="House Number"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <div className="w-1/2">
            <label htmlFor="landmark" className="font-semibold">
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={editedAddress.landmark}
              onChange={handleChange}
              placeholder="Landmark"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="mobileNumber" className="font-semibold">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={editedAddress.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <div className="w-1/2">
            <label htmlFor="villageArea" className="font-semibold">
              Village/Area
            </label>
            <input
              type="text"
              id="villageArea"
              name="villageArea"
              value={editedAddress.villageArea}
              onChange={handleChange}
              placeholder="Village/Area"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="city" className="font-semibold">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={editedAddress.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <div className="w-1/2">
            <label htmlFor="pincode" className="font-semibold">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={editedAddress.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="state" className="font-semibold">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={editedAddress.state}
              onChange={handleChange}
              placeholder="State"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-between gap-4 mt-4">
          <div className="w-1/2">
            <label htmlFor="alternateNumber" className="font-semibold">
              Alternate Number
            </label>
            <input
              type="text"
              id="alternateNumber"
              name="alternateNumber"
              value={editedAddress.alternateNumber}
              onChange={handleChange}
              placeholder="Alternate Number"
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="label" className="font-semibold">
              Label
            </label>
            <input
              type="text"
              id="label"
              name="label"
              value={editedAddress.label}
              onChange={handleChange}
              placeholder="Label"
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="mr-2 bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-violet-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
