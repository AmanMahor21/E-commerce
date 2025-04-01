import React from 'react'
import OrderSummary from './OrderSummary'
import PaymentCard from './PaymentCard'

const Checkout = () => {
  return (
    <div className='flex p-28 dark:bg-white text-black'>
    <PaymentCard/>
    <OrderSummary/>
    
    </div>
  )
}

export default Checkout