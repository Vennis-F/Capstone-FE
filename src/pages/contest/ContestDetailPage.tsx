import { useParams } from 'react-router-dom'

import ContestDetailContainer from 'features/contest/components/ContestDetailContainer'

const ContestDetailPage = () => {
  const { id } = useParams()

  return <ContestDetailContainer contestId={id as string} />
}

export default ContestDetailPage
