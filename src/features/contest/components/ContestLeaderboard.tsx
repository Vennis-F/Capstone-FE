import { Box, Container, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'

import { getWinners } from '../api'
import { Contest, ContestStatus, ViewWinner } from '../types'

import WinnerCardView from './WinnerCardView'

type Props = {
  contest: Contest
}

const ContestLeaderboard = ({ contest }: Props) => {
  const [winners, setWinners] = useState<ViewWinner[]>([])

  const handleGetWinners = async () => {
    const winnersRes = await getWinners(contest.id)
    setWinners(winnersRes)
  }

  useEffect(() => {
    if (contest.status === ContestStatus.EXPIRED) handleGetWinners()
  }, [contest])

  return (
    <Container maxWidth="md" style={{ height: '100vh', marginTop: '20px' }}>
      <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Typography
          style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', display: 'flex' }}
        >
          Bảng xếp hạng người chiến thắng
        </Typography>
        {(contest.status === ContestStatus.PENDING || contest.status === ContestStatus.ACTIVE) && (
          <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Image
              src={
                'https://3.bp.blogspot.com/-iQbj739PtnM/WaOsHL57OWI/AAAAAAAAAEo/P1Tr5Km8FKA-znjaKXKj1KsP6w2yVedYQCLcBGAs/s1600/Painting%2BCanvas.jpg'
              }
              style={{
                height: '250px',
                width: '250px',
                padding: 0,
                backgroundColor: 'F0F2F5',
                marginBottom: '20px',
              }}
              imageStyle={{
                height: '250px',
                width: '250px',
                marginBottom: '20px',
                backgroundColor: 'F0F2F5',
              }}
            />
            <Typography variant="h6" style={{ fontWeight: 'bold', color: 'rgba(0,0,0,.4)' }}>
              {contest.status === ContestStatus.PENDING
                ? 'Cuộc thi chưa diễn ra'
                : 'Cuộc thi vẫn đang diễn ra'}
            </Typography>
          </Container>
        )}
        {contest.status === ContestStatus.EXPIRED && (
          <>
            {winners.length > 0 ? (
              <Stack spacing={2} sx={{ marginTop: 3 }}>
                {winners.map(winner => (
                  <WinnerCardView winner={winner} key={winner.id} />
                ))}
              </Stack>
            ) : (
              <Container sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Image
                  src={
                    'https://3.bp.blogspot.com/-iQbj739PtnM/WaOsHL57OWI/AAAAAAAAAEo/P1Tr5Km8FKA-znjaKXKj1KsP6w2yVedYQCLcBGAs/s1600/Painting%2BCanvas.jpg'
                  }
                  style={{
                    height: '250px',
                    width: '250px',
                    padding: 0,
                    backgroundColor: 'F0F2F5',
                    marginBottom: '20px',
                  }}
                  imageStyle={{
                    height: '250px',
                    width: '250px',
                    marginBottom: '20px',
                    backgroundColor: 'F0F2F5',
                  }}
                />
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'rgba(0,0,0,.4)' }}>
                  Rất tiếc, cuộc thi không có ai chiến thắng
                </Typography>
              </Container>
            )}
          </>
        )}
      </Box>
    </Container>
  )
}
export default ContestLeaderboard
