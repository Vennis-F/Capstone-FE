import { useSearchParams } from 'react-router-dom'

import { NotFound } from 'components/Common'

import InstrurctorUploadCertificateContainer from '../../features/auth/components/InstrurctorUploadCertificateContainer'

const InstructorCertificateRegisterPage = () => {
  const [searchParams] = useSearchParams()
  const currentEmail = searchParams.get('email')

  return currentEmail ? (
    <InstrurctorUploadCertificateContainer email={currentEmail} />
  ) : (
    <NotFound />
  )
}
export default InstructorCertificateRegisterPage
