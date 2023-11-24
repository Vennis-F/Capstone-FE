import React from 'react'
import { useParams } from 'react-router-dom'

import CustomerOrderDetailContainer from 'features/orders/components/CustomerOrderDetailContainer'

const CustomerOrderDetailPage = () => {
  const { id } = useParams()

  return <CustomerOrderDetailContainer orderId={id as string} />
}

export default CustomerOrderDetailPage
