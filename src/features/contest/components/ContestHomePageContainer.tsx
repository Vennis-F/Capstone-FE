/* eslint-disable */
import { Typography } from '@material-ui/core'
import { Box, Container, Paper, Grid, Button } from '@mui/material'
import Divider from '@mui/material/Divider';
import React from 'react'
import LearnerDrawingCardView from './LearnerDrawingCardView';
import Carousel from 'react-material-ui-carousel';
import { sliderContestData } from 'features/courses/data/sliderContestData';
import Image from 'material-ui-image'
import { MainColor } from 'libs/const/color';



const ContestHomePageContainer = () => {
    console.log(123)

    return <Container maxWidth="lg">
        <Carousel>
            {sliderContestData.map(slider => (
                <Grid container spacing={0} alignContent='center' sx={{
                    backgroundImage: `url("https://tecwoodoutdoorfloor.com/upload/images/Blog/background-san-go4.jpg")`,
                    backgroundSize: 'cover',
                    height: 400,
                    backgroundRepeat: 'no-repeat',
                }} >
                    <Grid item xs={6}>
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%", flexDirection: "column", color: "#fff" }}>
                            <Typography style={{ fontSize: 35 }}>
                                {slider.title}
                            </Typography>
                            <Typography style={{ fontSize: 20 }}>
                                {slider.text}
                            </Typography>
                            <Button variant="outlined" sx={{ marginTop: 2, marginBottom: 2, color: '#fff', fontSize: 30, borderColor: "#fff", borderRadius: 0 }} >{slider.contest}</Button>
                            <Typography>
                                {slider.member}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6} >
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                            <Image
                                src={slider.thumbnailUrl}
                                style={{ height: '250px', width: '250px', padding: 0 }}
                                imageStyle={{ height: '250px', width: '250px', elevation: 5, borderRadius: 3, border: "8px solid black" }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            ))}
        </Carousel>
        <Typography style={{ marginBottom: 35, marginTop: 10, fontSize: 16 }}>
            Join hundreds of thousands of artists, photographers, and graphic designers from all over the world who compete in our daily art competitions.   Win cash prizes, gift certificates, Fine Art America products, featured placement in our newsletters, featured placement throughout our website, and more!   Members can start a new competition at any time!
        </Typography>
        {/* <Paper elevation={10}> */}
        <Grid container spacing={10} >
            <Grid item xs={4} >
                ĐÃ CHẤP NHẬN ĐĂNG KÝ
                <Divider style={{ marginTop: 15, marginBottom: 30 }} />
                <LearnerDrawingCardView />
                <LearnerDrawingCardView />
            </Grid>
            <Grid item xs={4}>
                ĐANG BỎ PHIẾU
                <Divider style={{ marginTop: 15, marginBottom: 30 }} />
                <LearnerDrawingCardView />
                <LearnerDrawingCardView />
            </Grid>
            <Grid item xs={4}>
                HOÀN THÀNH GẦN ĐÂY
                <Divider style={{ marginTop: 15, marginBottom: 30 }} />
                <LearnerDrawingCardView />
                <LearnerDrawingCardView />
            </Grid>
        </Grid>
        {/* </Paper> */}

    </Container>
}

export default ContestHomePageContainer
