import Card from '../Card/page';
import { FaRupeeSign } from 'react-icons/fa';

export default function Bill_Invoice(cartItem: any) {
  const total = cartItem?.cartItem?.data?.reduce(
    (acc: number, ele: any) => acc + (parseFloat(ele.productPrice) || 0) * (ele.quantity || 1),
    0,
  );
  const discount = cartItem?.cartItem?.data?.reduce(
    (acc: number, ele: any) => acc + 75 * (ele.quantity || 1),
    0,
  );
  const deliveryFee = 40;
  const handlingFee = 9;
  const coupon = 9;

  const grandTotal = total - discount + deliveryFee + handlingFee - coupon;

  return (
    <div className="space-y-5">
      <Card>
        <div className="invoice_container">
          <div className="header border-b-2">
            <p className="text-center font-bold text-2xl py-3">Bill Invoice</p>
          </div>
          <div className="body space-y-5 my-4">
            <div className="billSubcontainer flex justify-between mx-5">
              <div>
                <p>MRP Total</p>
              </div>
              <div className="flex">
                <FaRupeeSign className="mt-1" />
                {/* static; have to make dynamic from the api data*/}
                <div>
                  <p className="font-bold">{total}</p>
                </div>
              </div>
            </div>
            <div className="billSubcontainer flex justify-between mx-5">
              <div>
                <p>Discount</p>
              </div>
              <div className="text-blue-500 flex">
                <div className="font-bold">-</div>
                <FaRupeeSign className="mt-1" />
                <div>
                  <p className="font-bold">{discount}</p>
                </div>
              </div>
            </div>
            <div className="billSubcontainer flex justify-between mx-5">
              <div>
                <p>Delivery Fee</p>
              </div>
              <div className="flex">
                <FaRupeeSign className="mt-1" />
                <div>
                  <p className="font-bold">40</p>
                </div>
              </div>
            </div>
            <div className="billSubcontainer flex justify-between mx-5">
              <div>
                <p>Handling Fee</p>
              </div>
              <div className="flex space-x-1">
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <div>
                    <p className="line-through font-bold">9</p>
                  </div>
                </div>
                <div className="text-blue-500 font-bold">Free</div>
              </div>
            </div>
            <div className="billSubcontainer flex justify-between mx-5">
              <div>
                <p>Coupon Discount</p>
              </div>
              <div className="flex text-blue-500">
                <div className="flex">
                  <p className="font-bold">-</p>
                </div>
                <FaRupeeSign className="mt-1" />
                <div>
                  <p className="font-bold">25</p>
                </div>
              </div>
            </div>
            <div className="billSubcontainer bg-blue-200 flex justify-between px-5 py-3">
              <div>
                <p className="font-bold">Grand Total</p>
              </div>
              <div className="flex">
                <FaRupeeSign className="mt-1 text-orange-500" />
                <p className="font-bold text-orange-500">{grandTotal}</p>
              </div>
            </div>
            <div className="text-blue-500">
              <p className="flex font-bold py-2  text-xl justify-center">
                You have saved <FaRupeeSign className="mt-1" />
                {discount} on this order
              </p>
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div>
          {/* removeOnFocus removes outline on focus - global.css */}
          <input
            className="removeOnFocus w-full px-2 py-3"
            type="text"
            placeholder="Enter Voucher Code"
          />
        </div>
      </Card>
      <Card>
        <div>
          <button className="bg-black text-white w-full text-xl py-4 font-bold">Place Order</button>
        </div>
      </Card>
    </div>
  );
}
