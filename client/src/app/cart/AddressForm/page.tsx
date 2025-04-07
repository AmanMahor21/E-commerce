'use client';

import { MdGpsFixed } from 'react-icons/md';
import {
  useCreateAddressMutation,
  useGetAddressListQuery,
  useUpdateAddressMutation,
} from '@/services/api';
import { useState } from 'react';
import { GetAddress } from '@/services/types';

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
export default function AddressForm() {
  const [addressForm, setAddressForm] = useState(initialAddressState);
  const [createAddress, { isLoading, isError }] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const { data } = useGetAddressListQuery();
  const addressList: GetAddress[] = data?.data ?? [];

  // Removing previous default address and setting new one as default
  const handleAddressSubmit = async (e: any) => {
    e.preventDefault();
    const isAlreadyDefault = addressList?.find((ele: any) => {
      return ele.isDefault === 1;
    });
    const response = await updateAddress({ ...isAlreadyDefault, isDefault: 0 });
    if (response?.data?.status === 1) {
      const response = await createAddress({ ...addressForm, isDefault: 1 });
      if (response?.data?.status === 1) setAddressForm(initialAddressState);
    }
  };
  // Inserting address input field value in state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm({
      ...addressForm,
      [name]: value,
    });
  };
  return (
    <div className="p-4">
      <div className="bg-blue-500 cursor-pointer flex space-x-4 text-white p-2 w-11/12 mx-auto md:mx-0 md:w-72">
        <div>
          <MdGpsFixed className="text-white text-2xl" />
        </div>
        <div>
          <p className="font-bold">use my current address</p>
        </div>
      </div>
      <div className="fieldContainer text-center my-8">
        <form onSubmit={handleAddressSubmit}>
          <div className="fieldsubcontainer space-y-4 md:space-y-0 my-6 md:flex md:space-x-24  ">
            <div>
              <input
                type="text"
                className="removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="name"
                placeholder="Enter Name"
                onChange={handleInputChange}
                value={addressForm?.name}
              />
            </div>
            <div>
              <input
                type="text"
                className="removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="houseNumber"
                placeholder="House no / flat"
                onChange={handleInputChange}
                value={addressForm.houseNumber}
              />
            </div>
          </div>
          <div className="fieldsubcontainer space-y-4 md:space-y-0 my-6 md:flex md:space-x-24  ">
            <div>
              <input
                type="text"
                className="removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="landmark"
                placeholder="Enter Landmark"
                onChange={handleInputChange}
                value={addressForm.landmark}
              />
            </div>
            <div>
              <input
                type="number"
                className="no-spinner removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="mobileNumber"
                maxLength={10}
                placeholder="Mobile Number"
                onChange={handleInputChange}
                value={addressForm.mobileNumber}
              />
            </div>
          </div>
          <div className="fieldsubcontainer space-y-4 md:space-y-0 my-6 md:flex md:space-x-24  ">
            <div>
              <input
                type="text"
                className="removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="villageArea"
                placeholder="Village / area"
                onChange={handleInputChange}
                value={addressForm.villageArea}
              />
            </div>
            <div>
              <input
                type="text"
                className="removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="city"
                placeholder="City"
                onChange={handleInputChange}
                value={addressForm.city}
              />
            </div>
          </div>
          <div className="fieldsubcontainer space-y-4 md:space-y-0 my-6 md:flex md:space-x-24  ">
            <div>
              <input
                type="number"
                className="no-spinner removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="pincode"
                maxLength={6}
                placeholder="Pincode"
                onChange={handleInputChange}
                value={addressForm.pincode}
              />
            </div>
            <div>
              <input
                type="text"
                className="removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="state"
                placeholder="State"
                onChange={handleInputChange}
                value={addressForm.state}
              />
            </div>
          </div>
          <div className="fieldsubcontainer space-y-4 md:space-y-0 my-6 md:flex md:space-x-24  ">
            <div>
              <input
                type="number"
                className="no-spinner removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                name="alternateNumber"
                maxLength={10}
                placeholder="Alternate mobile number"
                onChange={handleInputChange}
                value={addressForm.alternateNumber}
              />
            </div>
            <div>
              <input
                type="text"
                name="label"
                className="removeOnFocus border border-gray-400 p-2 w-11/12  md:w-80"
                placeholder="Label Example:home, office..."
                onChange={handleInputChange}
                value={addressForm.label}
              />
            </div>
          </div>
          <div className="btnContainer md:w-1/3 md:mx-52">
            <button className="px-4 py-2 bg-green-700 hover:bg-green-600 w-full font-bold text-white">
              Save and Deliver Here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
