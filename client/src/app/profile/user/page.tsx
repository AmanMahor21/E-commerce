'use client';
import { useState } from 'react';
// import Sidebar from '../Profile/Sidebar/page';
import { useCompleteProfileMutation, useLogoutMutation } from '@/services/authApi';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import internal from 'stream';
import { setUser } from '@/reduxStore/internalSlice';
import { useDispatch } from 'react-redux';

export default function ProfilePage() {
  const [setProfile] = useCompleteProfileMutation();
  const router = useRouter();
  const customer = useSelector((state: any) => state.internal.customerInfo);
  const [logoutRes] = useLogoutMutation();
  const dispatch = useDispatch();

  console.log(customer, 'zzz');
  const [userInfo, setUserInfo] = useState({
    fName: customer?.fName || '',
    lName: customer?.lName || '',
    mobile: customer?.mobile || '',
    gender: customer?.gender || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const savedUser = await setProfile({ ...userInfo });
    // if (savedUser?.data?.data) {
    //   dispatch(setUser(userInfo));
    //   setUserInfo({
    //     fName: '',
    //     lName: '',
    //     mobile: '',
    //     gender: '',
    //   });
    // }
    // Add API call to save the profile data
  };
  const handleLogout = () => {
    dispatch(setUser(null));
    logoutRes();
  };

  return (
    <div className="h-screen flex mt-28 lg:justify-center justify-around bg-white p-6 w-full relative">
      <div className="max-w-2xl flex flex-col">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Update Your Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input
                type="text"
                name="fName"
                value={userInfo.fName}
                onChange={handleChange}
                required
                className="block w-full border-0 border-b-2 border-gray-200 py-2 focus:ring-0 focus:outline-none"
                placeholder="John"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input
                type="text"
                name="lName"
                value={userInfo.lName}
                onChange={handleChange}
                required
                className="block w-full border-0 border-b-2 border-gray-200 py-2 focus:ring-0 focus:outline-none"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Mobile Input */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Mobile (optional)</label>
            <input
              type="tel"
              name="mobile"
              value={userInfo.mobile}
              onChange={handleChange}
              className="block w-full border-0 border-b-2 border-gray-200 py-2 focus:ring-0 focus:outline-none"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userInfo.gender === 'Male'}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userInfo.gender === 'Female'}
                  onChange={handleChange}
                  className="h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
      <div className="">
        <button
          className=" p-2 h-fit bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
          onClick={handleLogout}
        >
          <img src="/logout.svg" alt="Logout" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
