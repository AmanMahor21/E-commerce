'use client';
import { useState } from 'react';
// import Sidebar from '../Profile/Sidebar/page';
import { useCompleteProfileMutation, useLogoutMutation } from '@/services/authApi';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import internal from 'stream';

export default function ProfilePage() {
  const [setProfile] = useCompleteProfileMutation();
  const router = useRouter();
  const customer = useSelector((state: any) => state.internal.customerInfo);
  const [logoutRes] = useLogoutMutation();

  const [userInfo, setUserInfo] = useState({
    fName: customer?.firstName || '',
    lName: customer?.lastName || '',
    mobile: customer?.mobileNumber || '',
    gender: customer?.gender || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  console.log(customer, 'nnnn');
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const savedUser = await setProfile({ ...userInfo });
    if (savedUser?.data?.data) {
      setUserInfo({
        fName: '',
        lName: '',
        mobile: '',
        gender: '',
      });
    }
    // Add API call to save the profile data
  };
  const handleLogout = () => {
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

  //   return (
  //     <div className="flex h-screen items-center justify-center bg-white">
  //       <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-200 focus-within:shadow-[0_0_12px_2px] focus-within:shadow-orange-500/30">
  //         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
  //           Complete Your Profile
  //         </h2>

  //         <form onSubmit={handleSubmit} className="space-y-6">
  //           {/* First Name Input */}
  //           <div className="space-y-2">
  //             <label className="text-gray-700 block text-sm font-medium">
  //               First Name <span className="text-red-500">*</span>
  //             </label>
  //             <input
  //               type="text"
  //               name="fName"
  //               placeholder="Enter your first name"
  //               value={userInfo.fName}
  //               onChange={handleChange}
  //               required
  //               className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
  //             />
  //           </div>

  //           {/* Last Name Input */}
  //           <div className="space-y-2">
  //             <label className="text-gray-700 block text-sm font-medium">
  //               Last Name <span className="text-red-500">*</span>
  //             </label>
  //             <input
  //               type="text"
  //               name="lName"
  //               placeholder="Enter your last name"
  //               value={userInfo.lName}
  //               onChange={handleChange}
  //               required
  //               className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
  //             />
  //           </div>

  //           {/* Mobile Number (Optional) */}
  //           <div className="space-y-2">
  //             <label className="text-gray-700 block text-sm font-medium">
  //               Mobile Number (Optional)
  //             </label>
  //             <input
  //               type="tel"
  //               name="mobile"
  //               placeholder="Enter mobile number"
  //               value={userInfo.mobile}
  //               onChange={handleChange}
  //               className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
  //             />
  //           </div>

  //           {/* Gender Selection */}
  //           <div className="space-y-2">
  //             <label className="text-gray-700 block text-sm font-medium">
  //               Select Gender <span className="text-red-500">*</span>
  //             </label>
  //             <div className="flex items-center space-x-6">
  //               <label className="flex items-center space-x-2 cursor-pointer">
  //                 <input
  //                   type="radio"
  //                   name="gender"
  //                   value="Male"
  //                   checked={userInfo.gender === 'Male'}
  //                   onChange={handleChange}
  //                   className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300"
  //                   required
  //                 />
  //                 <span className="text-gray-700">Male</span>
  //               </label>
  //               <label className="flex items-center space-x-2 cursor-pointer">
  //                 <input
  //                   type="radio"
  //                   name="gender"
  //                   value="Female"
  //                   checked={userInfo.gender === 'Female'}
  //                   onChange={handleChange}
  //                   className="w-4 h-4 text-orange-500 focus:ring-orange-500 border-gray-300"
  //                   required
  //                 />
  //                 <span className="text-gray-700">Female</span>
  //               </label>
  //             </div>
  //           </div>

  //           {/* Submit Button */}
  //           <div className="space-y-3">
  //             <div className="flex justify-center">
  //               <button
  //                 type="submit"
  //                 className="w-full py-3 bg-orange-500 text-white rounded-lg text-lg font-medium hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
  //               >
  //                 Complete Profile
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );

  // return (
  //   <div className="flex h-screen mt-[96px]">
  //     <Sidebar/>

  //     <main className="flex-1 p-6 bg-gray-50 ">
  //       <div className="space-y-4">
  //         {/* Enter Name */}
  //         <div className="flex items-center space-x-4">
  //           <input
  //             type="text"
  //             placeholder="Enter your Name"
  //             className="flex p-2 border border-gray-300 rounded"
  //           />
  //           <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
  //             Save
  //           </button>
  //         </div>

  //         {/* Email and OTP */}
  //         <div className="flex items-center space-x-4">
  //           <input
  //             type="email"
  //             placeholder="Mail Id"
  //             className="flex p-2 border border-gray-300 rounded"
  //           />
  //           <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
  //             Send OTP
  //           </button>
  //           <div className="px-11" />
  //           <input
  //             type="text"
  //             placeholder="Enter OTP"
  //             className="flex p-2 border border-gray-300 rounded"
  //           />
  //           <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
  //             Verify
  //           </button>
  //         </div>

  //         {/* Mobile Number */}
  //         <div className="flex items-center space-x-4">
  //           <input
  //             type="text"
  //             placeholder="Mobile Number"
  //             className="flex p-2 border border-gray-300 rounded"
  //           />
  //           <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
  //             Save
  //           </button>
  //         </div>

  //         {/* Gender Selection */}
  //         <div>
  //           <h3 className="font-medium mb-2">Select Gender</h3>
  //           <div className="flex items-center space-x-4">
  //             <label className="flex items-center space-x-2">
  //               <input type="radio" name="gender" className="text-orange-500" />
  //               <span>Male</span>
  //             </label>
  //             <label className="flex items-center space-x-2">
  //               <input type="radio" name="gender" className="text-orange-500" />
  //               <span>Female</span>
  //             </label>
  //           </div>
  //         </div>
  //       </div>
  //     </main>
  //   </div>
  // )
}
