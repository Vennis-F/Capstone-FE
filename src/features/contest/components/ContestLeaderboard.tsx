import { Container, Paper, Typography } from '@mui/material'
import Stack from '@mui/material/Stack'
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
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ paddingTop: 2, paddingBottom: 2 }}>
        <Typography
          style={{ fontWeight: 'bold', fontSize: 25, justifyContent: 'center', display: 'flex' }}
        >
          Bảng xếp hạng người chiến thắng
        </Typography>
        {contest.status === ContestStatus.PENDING && <>Chưa công bố</>}
        {contest.status === ContestStatus.EXPIRED && (
          <>
            {winners.length > 0 ? (
              <Stack spacing={2} sx={{ marginTop: 3 }}>
                {winners.map(winner => (
                  <WinnerCardView winner={winner} key={winner.id} />
                ))}
              </Stack>
            ) : (
              'Không có ai chiến thắng'
            )}
          </>
        )}
        {contest.status === ContestStatus.ACTIVE && <>Chưa công bố</>}
      </Paper>
    </Container>
  )
}
export default ContestLeaderboard
