import DownloadIcon from '@mui/icons-material/Download'
import LaptopIcon from '@mui/icons-material/Laptop'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { downloadCertifcate, getCertificate, getListAchievements } from '../api'
import { ViewAchievementReponse } from '../types'

const AchivementListContainer = () => {
  const [achievements, setAchivements] = useState<ViewAchievementReponse[]>([])

  const handleGetAchivements = async () => {
    setAchivements(await getListAchievements())
  }

  useEffect(() => {
    handleGetAchivements()
  }, [])

  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#FFFFFF' }}>
      <Typography
        style={{
          fontSize: 35,
          fontWeight: 'bold',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '10px',
        }}
      >
        Chứng chỉ của bạn
      </Typography>
      <List>
        {achievements.map(achive => (
          <ListItem key={achive.id}>
            <WorkspacePremiumIcon sx={{ fontSize: '70px', marginRight: '20px' }} />
            <ListItemText
              primary={achive.courseName}
              secondary={achive.insertedDate}
              primaryTypographyProps={{
                style: { fontSize: '30px', fontFamily: 'sans-serif', fontWeight: 'bold' },
              }}
              secondaryTypographyProps={{ style: { fontSize: '20px' } }}
            />
            <ListItemText
              primary={achive.learnerName || achive.customerName}
              primaryTypographyProps={{
                style: { fontSize: '30px', fontFamily: 'sans-serif', fontWeight: 'bold' },
              }}
            />
            <Button
              sx={{ fontSize: '16px', color: 'rgb(0, 167, 111)', borderColor: 'rgb(0, 167, 111)' }}
              variant="outlined"
              startIcon={<LaptopIcon />}
              onClick={async () => {
                const response = await getCertificate(achive.path)

                const blob = new Blob([response], { type: 'application/pdf' })

                const url = URL.createObjectURL(blob)

                window.open(url, '_blank')
              }}
            >
              Xem trước
            </Button>
            &nbsp;
            <Button
              sx={{ fontSize: '16px', backgroundColor: 'rgb(0, 167, 111)' }}
              variant="contained"
              endIcon={<DownloadIcon />}
              onClick={async () => {
                try {
                  const response = await downloadCertifcate(achive.path)

                  const blob = new Blob([response], { type: 'application/pdf' })

                  const url = window.URL.createObjectURL(blob)
                  const link = document.createElement('a')
                  link.href = url
                  link.setAttribute('download', `${achive.courseName}-certificate.pdf`)
                  document.body.appendChild(link)
                  link.click()
                  document.body.removeChild(link)
                } catch (error) {
                  console.error('Error downloading file:', error)
                }
              }}
            >
              Tải xuống
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

export default AchivementListContainer
