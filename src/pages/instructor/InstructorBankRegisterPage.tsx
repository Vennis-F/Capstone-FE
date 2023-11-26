import { useSearchParams } from 'react-router-dom'

import { NotFound } from 'components/Common'
import InstructorUploadBankContainer from 'features/auth/components/InstructorUploadBankContainer'

const InstructorBankRegisterPage = () => {
  const [searchParams] = useSearchParams()
  const currentEmail = searchParams.get('email')

  return currentEmail ? <InstructorUploadBankContainer email={currentEmail} /> : <NotFound />
}

export default InstructorBankRegisterPage
