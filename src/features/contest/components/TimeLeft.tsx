import React, { useEffect, useState } from 'react'

import { Contest, ContestStatus } from '../types'

type Props = {
  contest: Contest
}

const TimeLeft = ({ contest }: Props) => {
  const [timeLeft, setTimeLeft] = useState<string>(`0`)

  useEffect(() => {
    let timer: NodeJS.Timer

    if (contest.status === ContestStatus.ACTIVE) {
      const endDate = new Date(contest.expiredDate).getTime()

      timer = setInterval(() => {
        const now = new Date().getTime()
        const distance = endDate - now

        if (distance <= 0) {
          clearInterval(timer)
          setTimeLeft(`0`)
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)

          // Hiển thị thời gian còn lại dưới dạng chuỗi
          setTimeLeft(`${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`)
        }
      }, 1000)
    }

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div>
      <h2>Thời gian còn lại cho cuộc thi:</h2>
      <p>{timeLeft}</p>
    </div>
  )
}

export default TimeLeft
