import React from 'react'

const PaymentSuccess = () => {
  return (
    <div className="text-center w-full h-screen bg-[#F3F3F3] pt-32 dark: text-black">
    {/* Success Page */}
    <div className="text-sm font-normal mb-64">
      Thank You For Your Purchase!
    </div>
    <div className="text-3xl text-[#0A0D13] mb-6 font-medium">
      Order #123RGR231567Y Confirmed
    </div>
    <button
      className="bg-green-500 text-white font-semibold px-12 py-3 rounded-md w-[520px]"
    >
      Track Order
    </button>
  </div>
  )
}

export default PaymentSuccess