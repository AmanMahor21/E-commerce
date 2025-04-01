'use client';

import Card from '../Card/page';
import React, { useState } from 'react';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';

interface ChangeLocationData {
  address?: string;
  radioBtnActiv?: boolean | undefined;
}

function ChangeLocation({ address, radioBtnActiv }: ChangeLocationData) {
  const [isActiv, setIsActiv] = React.useState<boolean>(false);

  function onClickChangeLocation() {
    if (radioBtnActiv) setIsActiv(true);
    else setIsActiv((prevState) => !prevState);
  }
  return (
    <Card>
      <div onClick={onClickChangeLocation} className="my-4 flex px-4 justify-between">
        <div className="flex space-x-10 cursor-pointer py-4">
          <div>
            {isActiv ? (
              <IoMdRadioButtonOn className="text-2xl" />
            ) : (
              <IoMdRadioButtonOff className="text-2xl" />
            )}
          </div>
          {address ? <div>{address}</div> : <div>Sample text - Change Location</div>}
        </div>
        {isActiv && (
          <div className="flex mt-2 space-x-4 md:space-x-40">
            <div>
              <button className="flex space-x-1">
                <div>
                  <p className="text-lg">edit</p>
                </div>
                <div>
                  <FaRegEdit className="mt-1 text-xl" />
                </div>
              </button>
            </div>
            <div>
              <button className="bg-green-700 text-white px-4 font-bold py-2 rounded-md">
                Delivery Here
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default ChangeLocation;
