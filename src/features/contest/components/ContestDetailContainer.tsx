import GrainIcon from '@mui/icons-material/Grain'
import HomeIcon from '@mui/icons-material/Home'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Breadcrumbs, Container, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { NotFound } from 'components/Common'
import { MainColor } from 'libs/const/color'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { getContestById } from '../api'
import { Contest, ContestStatus } from '../types'

import TabsContestDetail from './TabsContestDetail'

type Props = {
  contestId: string
}

const ContestDetailContainer = ({ contestId }: Props) => {
  const [contest, setContest] = useState<Contest | null>(null)
  const navigate = useNavigate()

  const handleGetContestDetail = async () => {
    try {
      setContest(await getContestById(contestId))
    } catch (error) {
      showErrorResponseSaga({ defaultMessage: 'Không tìm thấy cuộc thi', error })
    }
  }

  useEffect(() => {
    handleGetContestDetail()
  }, [contestId])

  useEffect(() => {
    const checkExpiredDate = () => {
      if (contest && contest.status === ContestStatus.ACTIVE) {
        const now = new Date().getTime()
        const expiredDate = new Date(contest.expiredDate).getTime()
        console.log(contest.status)

        if (now >= expiredDate && contest.status === ContestStatus.ACTIVE) {
          toastSuccess({ message: 'Cuộc thi đã kết thúc' })
          handleGetContestDetail()
        }
      }
    }

    let interval: NodeJS.Timer
    if (contest && contest.status === ContestStatus.ACTIVE) {
      interval = setInterval(checkExpiredDate, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [contest?.expiredDate, contest?.status])

  console.log('current status:', contest?.status)

  return contest ? (
    <Container maxWidth="lg" style={{ padding: '20px', borderRadius: '10px' }}>
      <Breadcrumbs sx={{ color: MainColor.YELLOW_500, marginBottom: '10px' }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', color: MainColor.YELLOW_500 }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Trang chủ
        </Link>
        <Link
          underline="hover"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: MainColor.YELLOW_500,
            cursor: 'pointer',
          }}
          color="inherit"
          onClick={() => navigate('/contest')}
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Cuộc thi
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center', color: '#9c7d21' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {contest.title}
        </Typography>
      </Breadcrumbs>
      <Typography style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: 30 }}>
        {contest.title}
      </Typography>
      <TabsContestDetail contest={contest} />
    </Container>
  ) : (
    <NotFound />
  )
}

export default ContestDetailContainer
