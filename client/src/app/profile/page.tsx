'use client';
import { useState } from 'react';
import Sidebar from './Sidebar/page';
import { useCompleteProfileMutation } from '@/services/authApi';
import { useRouter } from 'next/navigation';
import { setUser } from '@/reduxStore/internalSlice';
import { useDispatch } from 'react-redux';

export default function ProfilePage() {
  const [setProfile] = useCompleteProfileMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    fName: '',
    lName: '',
    mobile: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const savedUser = await setProfile({ ...userInfo });
    if (savedUser?.data?.data) {
      dispatch(setUser(userInfo));
      // dispatch(setUser({
      //   fName: userInfo.fName,
      //   lName: userInfo.lName,
      //   mobile: userInfo.mobile,
      //   gender: userInfo.gender
      // }));

      setUserInfo({
        fName: '',
        lName: '',
        mobile: '',
        gender: '',
      });
      router.push('/');
    }
    // Add API call to save the profile data
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-800">
      <div className="w-full max-w-lg bg-slate-700/50 p-8 rounded-lg shadow-lg focus-within:shadow-[0_0_12px_2px] focus-within:shadow-orange-500">
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Name Input */}
          <div className="space-y-2">
            <label className="text-gray-300 block text-sm font-medium">
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="fName"
              placeholder="Enter your first name"
              value={userInfo.fName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-600 bg-slate-700 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Last Name Input */}
          <div className="space-y-2">
            <label className="text-gray-300 block text-sm font-medium">
              Last Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="lName"
              placeholder="Enter your last name"
              value={userInfo.lName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-600 bg-slate-700 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Mobile Number (Optional) */}
          <div className="space-y-2">
            <label className="text-gray-300 block text-sm font-medium">
              Mobile Number (Optional)
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="Enter mobile number"
              value={userInfo.mobile}
              onChange={handleChange}
              className="w-full p-3 border border-gray-600 bg-slate-700 rounded-lg shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-2">
            <label className="text-gray-300 block text-sm font-medium">
              Select Gender <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userInfo.gender === 'Male'}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  required
                />
                <span className="text-gray-300">Male</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userInfo.gender === 'Female'}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  required
                />
                <span className="text-gray-300">Female</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="space-y-3">
            <p className="text-center text-gray-400 text-sm italic">
              "Almost there! We promise we won’t ask for your blood type. 😉"
            </p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 text-white rounded-lg text-lg font-medium hover:bg-orange-600 transition duration-300"
              >
                Complete Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
