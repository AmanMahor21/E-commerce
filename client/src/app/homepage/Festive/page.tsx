import React from 'react';
import Image from 'next/image';

export default function page() {
  return (
    <div>
      <div className="flex ">
        <div className="">
          <Image
            src="/Festive.svg"
            alt="MakerSakrat Image"
            width={350}
            height={350}
          />
        </div>
        <div className="">
          <Image
            src="/FastivePongal.svg"
            alt="Pongal Image"
            width={650}
            height={650}
          />
        </div>
      </div>
    </div>
  );
}
