import DownloadIcon from '@mui/icons-material/Download'
import LaptopIcon from '@mui/icons-material/Laptop'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Button, Grid, ListItemText } from '@mui/material'
import React from 'react'

import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { toastError } from 'libs/utils/handle-toast'

import { downloadCertifcate, getCertificate } from '../api'
import { ViewAchievementReponse } from '../types'

type Props = {
  achivement: ViewAchievementReponse
}

const AchivementCardView = ({ achivement }: Props) => (
  <Grid container alignItems="center" spacing={3}>
    <Grid item xs={6} display="flex" alignItems="center">
      <WorkspacePremiumIcon sx={{ fontSize: '70px', marginRight: '20px' }} />
      <ListItemText
        primary={achivement.courseName}
        secondary={getStringDayMonthYear(achivement.insertedDate)}
        primaryTypographyProps={{
          style: { fontSize: '20px', fontFamily: 'sans-serif', fontWeight: 'bold' },
        }}
        secondaryTypographyProps={{ style: { fontSize: '16px' } }}
      />
    </Grid>
    <Grid item xs={3}>
      <ListItemText
        primary={achivement.learnerName || achivement.customerName}
        primaryTypographyProps={{
          style: {
            fontSize: '20px',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }}
      />
    </Grid>
    <Grid item xs={3}>
      <Button
        sx={{
          fontSize: '12px',
          color: 'rgb(0, 167, 111)',
          borderColor: 'rgb(0, 167, 111)',
          ':hover': { borderColor: 'rgb(0, 167, 111)' },
        }}
        variant="outlined"
        startIcon={<LaptopIcon />}
        onClick={async () => {
          try {
            const response = await getCertificate(achivement.path)

            const blob = new Blob([response], { type: 'application/pdf' })

            const url = URL.createObjectURL(blob)

            window.open(url, '_blank')
          } catch (error) {
            toastError({
              message: 'Không tìm thấy chứng chỉ! Hãy liên hệ admin để xử lý',
            })
          }
        }}
      >
        Xem trước
      </Button>
      &nbsp;
      <Button
        sx={{
          fontSize: '12px',
          backgroundColor: 'rgb(0, 167, 111)',
          ':hover': {
            backgroundColor: 'rgb(7, 119, 82)',
          },
        }}
        variant="contained"
        endIcon={<DownloadIcon />}
        onClick={async () => {
          try {
            const response = await downloadCertifcate(achivement.path)

            const blob = new Blob([response], { type: 'application/pdf' })

            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${achivement.courseName}-certificate.pdf`)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          } catch (error) {
            toastError({
              message: 'Không tìm thấy chứng chỉ! Hãy liên hệ quản trị viên để xử lý',
            })
            console.error('Error downloading file:', error)
          }
        }}
      >
        Tải xuống
      </Button>
    </Grid>
  </Grid>
)

export default AchivementCardView
