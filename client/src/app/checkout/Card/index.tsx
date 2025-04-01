import React from 'react';

interface CardProps {
  cardInfo: { card_number: string; expiry_month: string; expiry_year: string; cvv: string };
  setCardInfo: React.Dispatch<
    React.SetStateAction<{
      card_number: string;
      expiry_month: string;
      expiry_year: string;
      cvv: string;
    }>
  >;
}

const Card: React.FC<CardProps> = ({ setCardInfo, cardInfo }) => {
  const handleExpiryDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) return;

    setCardInfo((prev) => ({
      ...prev,
      expiry_month: value.slice(0, 2),
      expiry_year: value.slice(2),
    }));
  };
  // const Card: React.FC<CardProps> = ({ setCardInfo, cardInfo }) => {
  return (
    <div className="w-full flex-col items-center">
      <div className="inline-flex items-center mb-3">
        <label className="ml-2 text-black cursor-pointer text-[18px] font-medium">
          Card Number
        </label>
      </div>

      <div className="w-full py-4 pl-2 border-[2px] border-gray-300 rounded-lg mb-6">
        <input
          type="text"
          placeholder="1234  5678  9101  1121"
          value={cardInfo?.card_number}
          className="w-full pl-4 text-black font-medium text-[18px] focus:outline-none placeholder-gray-500"
          onChange={(e) => setCardInfo((prev) => ({ ...prev, card_number: e.target.value }))}
        />
      </div>

      <div className="inline-flex items-center mb-3 w-full">
        <label className="w-1/2 ml-2 text-black cursor-pointer text-[18px] font-medium">
          Expiration Date
        </label>
        <label className="ml-2 text-black cursor-pointer text-[18px] font-medium">CVV</label>
      </div>

      <div className="flex w-full mb-6">
        <div className="w-1/2 pr-2">
          <div className="w-full py-4 pl-2 border-[2px] border-gray-300 rounded-lg">
            <input
              type="text"
              placeholder="MM/YY"
              value={`${cardInfo?.expiry_month || ''}${cardInfo?.expiry_year ? '/' + cardInfo?.expiry_year : ''}`}
              className="w-full pl-4 text-black font-medium text-[18px] focus:outline-none placeholder-gray-500"
              // onChange={(e) => setCardInfo((prev) => ({ ...prev, expiry_date: e.target.value }))}
              onChange={handleExpiryDate}
            />
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <div className="w-full py-4 pl-2 border-[2px] border-gray-300 rounded-lg">
            <input
              type="text"
              placeholder="CVV"
              value={cardInfo?.cvv}
              className="w-full pl-4 text-black font-medium text-[18px] focus:outline-none placeholder-gray-500"
              onChange={(e) => setCardInfo((prev) => ({ ...prev, cvv: e.target.value }))}
            />
          </div>
        </div>
      </div>
      <div className="inline-flex items-center mb-1">
        <label className="relative flex items-center cursor-pointer">
          <input
            name="framework"
            type="checkbox"
            className="peer rounded-md h-5 w-5 cursor-pointer appearance-none border-[2px] border-gray-400 checked:border-green-500 transition-all"
            id="saveDetails"
          />
          <span className="absolute bg-green-500 rounded-sm w-3 h-3 opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
        </label>
        <label className="ml-2 text-black cursor-pointer text-[18px]">Save Card details</label>
      </div>
    </div>
  );
};

export default Card;
