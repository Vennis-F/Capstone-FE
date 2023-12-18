import { Box, Container, List, ListItem, Typography } from '@mui/material'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomButton from 'libs/ui/components/CustomButton'

import { getListAchievements } from '../api'
import { ViewAchievementReponse } from '../types'

import AchivementCardView from './AchivementCardView'

const AchivementListContainer = () => {
  const navigate = useNavigate()
  const [achievements, setAchivements] = useState<ViewAchievementReponse[]>([])

  const handleGetAchivements = async () => {
    setAchivements(await getListAchievements())
  }

  useEffect(() => {
    handleGetAchivements()
  }, [])

  return (
    <Container maxWidth="lg" style={{ backgroundColor: '#FFFFFF', padding: '40px 0' }}>
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
      {achievements.length > 0 ? (
        <List>
          {achievements.map(achive => (
            <ListItem key={achive.id}>
              <AchivementCardView achivement={achive} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            marginBottom: '20px',
          }}
        >
          <Image
            src={
              'https://freepngimg.com/thumb/certificate_template/162786-hat-diploma-download-free-image-thumb.png'
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
            Hiện tại bạn chưa có chứng chỉ nào!
          </Typography>
          <Box sx={{ width: '150px', marginTop: '20px' }}>
            <CustomButton
              onClick={() => navigate('/my-learning')}
              sxCustom={{ fontSize: '18px', fontWeight: '400' }}
            >
              Học ngay
            </CustomButton>
          </Box>
        </Container>
      )}
    </Container>
  )
}

export default AchivementListContainer
