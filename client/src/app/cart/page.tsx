'use client';

import Location from './Location/LocationPage';
import Address from './Address/addressInput';
import OrderSummary from './OrderSummary/page';
import BillInvoice from './Bill_Invoice/BillPage';
import AddressForm from './AddressForm/page';
import { useEffect, useState } from 'react';
import { useGetAddressListQuery, useGetCartProductsQuery } from '@/services/api';
import AddressListModal from './components/AddressListModal';

export default function Cart() {
  const [changeLocation, setChangeLocation] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [primaryAddress, setPrimaryAddress] = useState<any>(null);
  const { data } = useGetAddressListQuery();
  const { data: cartItem } = useGetCartProductsQuery();

  //Fetch addresses from DB to get the default one
  useEffect(() => {
    const fetchDefaultAdd = data?.data.find((ele) => ele.isDefault === 1);
    setPrimaryAddress(fetchDefaultAdd);
  }, [data]);

  async function ChangeLocationFunc(): Promise<void> {
    setChangeLocation((prevState) => !prevState);
  }
  return (
    <div className="md:space-x-20 p-20 mt-[50px] md:flex dark: bg-white text-black">
      <div className="subContainer w-full md:w-3/4">
        <div className="header">
          <p className="text-xl md:text-3xl font-bold">Shopping Cart</p>
        </div>
        <Location onChangeLocation={ChangeLocationFunc} primaryAddress={primaryAddress} />
        <AddressListModal isOpen={changeLocation} onClose={() => setChangeLocation(false)} />
        <Address setIsFormOpen={setIsFormOpen} />
        {isFormOpen && <AddressForm />}
        <OrderSummary />
      </div>
      <div className="subContainer w-full mt-20 md:w-1/3">
        <BillInvoice cartItem={cartItem} />
      </div>
    </div>
  );
}
