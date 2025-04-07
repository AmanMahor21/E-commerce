import { FaRupeeSign } from 'react-icons/fa';

export default function Bill_Invoice({ cartItem }: { cartItem: any }) {
  const total = cartItem?.data?.reduce(
    (acc: number, ele: any) => acc + (parseFloat(ele.productPrice) || 0) * (ele.quantity || 1),
    0,
  );

  const discount = cartItem?.data?.reduce(
    (acc: number, ele: any) => acc + 75 * (ele.quantity || 1),
    0,
  );

  const deliveryFee = 40;
  const handlingFee = 9;
  const coupon = 25;

  const grandTotal = total - discount + deliveryFee + handlingFee - coupon;

  return (
    <div className="space-y-5">
      {/* Invoice Section */}
      <div className="p-5 border rounded-xl shadow-md bg-white">
        <div className="invoice_container">
          <div className="header border-b-2">
            <p className="text-center font-bold text-2xl py-3">Bill Invoice</p>
          </div>
          <div className="body space-y-5 my-4">
            {/* MRP Total */}
            <div className="billSubcontainer flex justify-between mx-5">
              <p>MRP Total</p>
              <div className="flex">
                <FaRupeeSign className="mt-1" />
                <p className="font-bold">{!isNaN(total) ? total.toFixed(2) : '0.00'}</p>
              </div>
            </div>

            {/* Discount */}
            <div className="billSubcontainer flex justify-between mx-5">
              <p>Discount</p>
              <div className="text-blue-500 flex">
                <div className="font-bold">-</div>
                <FaRupeeSign className="mt-1" />
                <p className="font-bold">{!isNaN(discount) ? discount : 0}</p>
              </div>
            </div>

            {/* Delivery Fee */}
            <div className="billSubcontainer flex justify-between mx-5">
              <p>Delivery Fee</p>
              <div className="flex">
                <FaRupeeSign className="mt-1" />
                <p className="font-bold">40</p>
              </div>
            </div>

            {/* Handling Fee */}
            <div className="billSubcontainer flex justify-between mx-5">
              <p>Handling Fee</p>
              <div className="flex space-x-1">
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <p className="line-through font-bold">9</p>
                </div>
                <div className="text-blue-500 font-bold">Free</div>
              </div>
            </div>

            {/* Coupon Discount */}
            <div className="billSubcontainer flex justify-between mx-5">
              <p>Coupon Discount</p>
              <div className="flex text-blue-500">
                <p className="font-bold">-</p>
                <FaRupeeSign className="mt-1" />
                <p className="font-bold">25</p>
              </div>
            </div>

            {/* Grand Total */}
            <div className="billSubcontainer bg-blue-200 flex justify-between px-5 py-3">
              <p className="font-bold">Grand Total</p>
              <div className="flex">
                <FaRupeeSign className="mt-1 text-orange-500" />
                <p className="font-bold text-orange-500">
                  {!isNaN(grandTotal) ? grandTotal.toFixed(2) : '0.00'}
                </p>
              </div>
            </div>

            {/* Savings */}
            <div className="text-blue-500">
              <p className="flex font-bold py-2 text-xl justify-center">
                You have saved <FaRupeeSign className="mt-1" />
                {discount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Voucher Input */}
      <div className="p-4 border rounded-xl shadow-md bg-white">
        <input
          className="removeOnFocus w-full px-2 py-3"
          type="text"
          placeholder="Enter Voucher Code"
        />
      </div>

      {/* Place Order Button */}
      <div className="p-4 border rounded-xl shadow-md bg-white">
        <button className="bg-black text-white w-full text-xl py-4 font-bold">Place Order</button>
      </div>
    </div>
  );
}
