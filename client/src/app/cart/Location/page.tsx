'use client';

import Image from 'next/image';
import Card from '../Card/page';
import LocationLogo from '../../../../public/Location.svg';
import styles from './location.module.css';

// interface LocationData {
//   pincode?: string;
//   address?: string;
//   onChangeLocation: () => void
// }

export default function Location({
  onChangeLocation,
  primaryAddress,
}: {
  onChangeLocation: () => void;
  primaryAddress: any;
}) {
  function changelocation() {
    onChangeLocation();
  }

  return (
    <Card>
      <div className={`flex justify-between p-4 my-4 ${styles.container}`}>
        <div className="left flex space-x-10">
          <div>
            <Image alt="Location" width={24} src={LocationLogo} />
          </div>
          <div>
            <div>
              <p>
                Delivering to - <span className="text-green-700">{primaryAddress?.pincode}</span>
              </p>
            </div>
            <div>
              <p className="text-sm">{primaryAddress?.villageArea}</p>
            </div>
          </div>
        </div>
        <div className="right px-2 w-20 h-9 text-center font-bold rounded-md py-1 bg-green-700 hover:bg-green-600 text-white">
          <button onClick={changelocation}>Change</button>
        </div>
      </div>
    </Card>
  );
}
