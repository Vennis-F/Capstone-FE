import DownloadIcon from '@mui/icons-material/Download'
import LaptopIcon from '@mui/icons-material/Laptop'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Button, Container, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { downloadCertifcate, getListAchievements } from '../api'
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
                // await getList()
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
                console.log(achive.path)
                await downloadCertifcate(achive.path)
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
