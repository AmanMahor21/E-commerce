import Image from 'next/image';
import React, { useState, useEffect } from 'react';

function NetBanking() {
  const [isOpen, setIsOpen] = useState(false); // State to toggle dropdown visibility
  const [banks, setBanks] = useState<string[]>([]);; // State to store bank list data

  // Mock API call using useEffect
  useEffect(() => {
    // Simulating an API call with setTimeout to mimic delay
    const fetchBanks = () => {
      setTimeout(() => {
        const mockBanks = [
          "Access Bank",
          "United Bank for Africa (UBA)",
          "Keystone Bank",
          "Sterling Bank",
          "Zenith Bank",
          "Union Bank",
          "Kuda Microfinance Bank",
          "First Bank",
          // Add more mock data as needed
        ];
        setBanks(mockBanks);
      }, 1000); // Simulate 1 second API call delay
    };

    fetchBanks();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full mb-6">
      {/* Choose a Bank Card */}
      <div className='w-full py-3 px-4 border-[2px] border-gray-300 rounded-lg mb-3' onClick={toggleDropdown}>
        <div className="flex justify-between items-center cursor-pointer text-[18px]">
          <span>Choose a bank</span>
          {isOpen ? (
            <Image
              src="/chevron-down.svg"
              alt="Chevron Down"
              width={24}
              height={24}
            />
          ) : (
            <Image
              src="/chevron-up.svg"
              alt="Chevron Up"
              width={24}
              height={24}
            />
          )}
        </div>
      </div>

      {/* Banks List Card */}
      {isOpen && (
        <div className="p-4 border-gray-300 rounded-lg bg-[#F9FAFA] max-h-60 overflow-y-auto">
          <ul className="space-y-2">
            {banks.length === 0 ? (
              <li className="py-2 px-3 text-[18px] text-gray-500">Loading...</li>
            ) : (
              banks.map((bank, index) => (
                <li key={index} className="py-2 px-3 text-[18px] hover:bg-gray-100 rounded">
                  {bank}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NetBanking;
