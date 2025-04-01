'use client';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { MapPin } from 'lucide-react';
import { MdGpsFixed } from 'react-icons/md';
import { useCreateAddressMutation } from '@/services/api';
import Card from '@/app/cart/Card/page';
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
    <Card>
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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Card>
    // <div className="bg-white rounded-lg p-6 space-y-6">
    //   <Button
    //     variant="default"
    //     className="w-[200] bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
    //   >
    //     <MapPin className="w-4 h-4" />
    //     Use my current address
    //   </Button>

    //   <form onSubmit={onSubmit} className="space-y-4">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //       <Input
    //         placeholder="Enter Name"
    //         name="name"
    //         required
    //       />
    //       <Input
    //         placeholder="House no / flat"
    //         name="houseNumber"
    //         required
    //       />
    //       <Input
    //         placeholder="Enter Landmark"
    //         name="landmark"
    //         required
    //       />
    //       <Input
    //         placeholder="Mobile Number"
    //         name="mobile"
    //         type="tel"
    //         required
    //       />
    //       <Input
    //         placeholder="Village / area"
    //         name="village"
    //         required
    //       />
    //       <Input
    //         placeholder="City"
    //         name="city"
    //         required
    //       />
    //       <Input
    //         placeholder="Pincode"
    //         name="pincode"
    //         required
    //       />
    //       <Input
    //         placeholder="State"
    //         name="state"
    //         required
    //       />
    //       <Input
    //         placeholder="alternative mobile number"
    //         name="alternativeMobile"
    //         type="tel"
    //       />
    //       <Input
    //         placeholder="Label  Example: home, office..."
    //         name="label"
    //       />
    //     </div>

    //     <Button
    //       type="submit"
    //       className="w-[100] bg-green-600 hover:bg-green-700 text-white "
    //     >
    //       Save
    //     </Button>
    //   </form>
    // </div>
  );
}
