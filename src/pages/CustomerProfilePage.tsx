import React from 'react'
import { useParams } from 'react-router-dom'

import CustomerProfileContainer from 'features/user/components/CustomerProfileContainer'
import { TypeCustomerProfilePageParams } from 'types/params.enum'

const CustomerProfilePage = () => {
  const { type } = useParams()

  return <CustomerProfileContainer typePage={type as TypeCustomerProfilePageParams} />
}

export default CustomerProfilePage
