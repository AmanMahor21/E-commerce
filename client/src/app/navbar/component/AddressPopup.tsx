import { setExpectedAddress } from '@/reduxStore/internalSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const AddressPopup = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();
  const addressFound = useSelector((state: any) => state.internal.expectedAddress);
  const [addressData, setAddressData] = useState();

  const handleSaveButton = () => {
    dispatch(setExpectedAddress(addressData));
    onClose();
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[999]">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 h-auto min-h-[200px] flex flex-col justify-between relative mt-5 ">
          <div className="w-full flex justify-end">
            <img
              src="/cancel.png"
              className="w-5 h-5 hover:bg-slate-500 rounded-3xl cursor-pointer"
              alt="cancel"
              onClick={onClose}
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            use pincode to check delivery info
          </h4>
          <input
            type="text"
            // className="w-full h-8 border-2 p-4 border-slate-500 rounded-lg mb-4 focus:outline-none"
            className="w-full h-8 border-b-2 p-4 ps-0 border-slate-500 rounded-none mb-4 focus:outline-none"
            placeholder="Enter Pincode"
            onChange={(e: any) => setAddressData(e.target.value)}
            onKeyDown={(e: any) => (e.key === 'Enter' ? handleSaveButton() : '')}
          />

          <div className="flex justify-end mt-4">
            <button className="mr-2 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded"
              onClick={handleSaveButton}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
