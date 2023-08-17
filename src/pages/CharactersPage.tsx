import { Container, Grid, Typography, CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import React from 'react'
import { useTranslation } from 'react-i18next'

// import { PostContainer } from 'features/posts'
import TitleTypography from 'libs/ui/components/TitleTypography'

const CharactersPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <TitleTypography title={t('home.title')} />
      {/* <PostContainer /> */}
      <Container maxWidth="xs">
        <Grid xs={12} item key={1}>
          <Card sx={{ maxWidth: 280 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="300"
                image="https://th.bing.com/th/id/R.8533c7052e85a0c38eb12be6e24b2bca?rik=9iChuHGT5c7bTA&pid=ImgRaw&r=0"
                alt="Pantheon image"
              />
              <CardContent style={{ backgroundColor: '#061C25' }}>
                <Typography variant="h5" component="div" color={'white'}>
                  {'Pantheon'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Container>
    </>
  )
}

export default CharactersPage
