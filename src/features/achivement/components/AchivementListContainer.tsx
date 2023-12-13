import DownloadIcon from '@mui/icons-material/Download'
import LaptopIcon from '@mui/icons-material/Laptop'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import Image from 'material-ui-image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CustomButton from 'libs/ui/components/CustomButton'
import { getStringDayMonthYear } from 'libs/utils/handle-date'
import { toastError } from 'libs/utils/handle-toast'

import { downloadCertifcate, getCertificate, getListAchievements } from '../api'
import { ViewAchievementReponse } from '../types'

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
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={6} display="flex" alignItems="center">
                  <WorkspacePremiumIcon sx={{ fontSize: '70px', marginRight: '20px' }} />
                  <ListItemText
                    primary={achive.courseName}
                    secondary={getStringDayMonthYear(achive.insertedDate)}
                    primaryTypographyProps={{
                      style: { fontSize: '20px', fontFamily: 'sans-serif', fontWeight: 'bold' },
                    }}
                    secondaryTypographyProps={{ style: { fontSize: '16px' } }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <ListItemText
                    primary={achive.learnerName || achive.customerName}
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
                        const response = await getCertificate(achive.path)

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
                        toastError({
                          message: 'Không tìm thấy chứng chỉ! Hãy liên hệ admin để xử lý',
                        })
                        console.error('Error downloading file:', error)
                      }
                    }}
                  >
                    Tải xuống
                  </Button>
                </Grid>
              </Grid>
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
