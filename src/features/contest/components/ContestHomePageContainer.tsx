/* eslint-disable */
import { Typography } from '@material-ui/core'
import { Box, Container, Grid, Button } from '@mui/material'
import Divider from '@mui/material/Divider';
import React from 'react'
import LearnerDrawingCardView from './LearnerDrawingCardView';
import Carousel from 'react-material-ui-carousel';
import { sliderContestData } from 'features/courses/data/sliderContestData';
import Image from 'material-ui-image'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';
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
        <List sx={{ backgroundColor: '#ff8c94', color: "#fff", borderRadius: '10px', padding: '16px', marginBottom: 3, marginTop: 2 }}>
            <ListItem disablePadding>
                <ListItemIcon>
                    <StarIcon style={{ color: "#FFf" }} />
                </ListItemIcon>
                <ListItemText primary="Chào mừng các bạn đến với cuộc thi vẽ dành cho trẻ em trên trang web của chúng tôi! Đây là một cơ hội tuyệt vời để các bạn thể hiện tài năng sáng tạo của mình và tạo ra những tác phẩm nghệ thuật đẹp mắt. Bạn có biết rằng vẽ có thể giúp bạn phát triển trí não, tăng khả năng tưởng tượng và cải thiện kỹ năng giao tiếp không? Hãy cùng chúng tôi khám phá thế giới màu sắc và hình ảnh qua cuộc thi vẽ này nhé!" />
            </ListItem>
            <ListItem disablePadding>
                <ListItemIcon>
                    <StarIcon style={{ color: "#FFf" }} />
                </ListItemIcon>
                <ListItemText primary="Các phụ huynh cũng có thể đăng ký khi có một cuộc thi mới và tham gia cùng con em mình. Các bạn sẽ có cơ hội giành được những phần thưởng hấp dẫn như các mã giảm giá để trải nghiệm thêm nhiều sản phẩm thú vị trên trang web của chúng tôi. Ngoài ra, các tác phẩm xuất sắc còn có cơ hội được đăng tải nổi bật trên trang web của chúng tôi và được nhiều người biết đến." />
            </ListItem>
            <ListItem disablePadding>
                <ListItemIcon>
                    <StarIcon style={{ color: "#FFf" }} />
                </ListItemIcon>
                <ListItemText primary="Chúng tôi khuyến khích các em tham gia để phát huy kỹ năng nghệ thuật của mình, tạo ra những tác phẩm độc đáo và thể hiện sự sáng tạo của mình trong một môi trường thú vị và truyền cảm hứng. Đừng ngần ngại, hãy đăng ký và tham gia cùng chúng tôi và để tài năng của bạn tỏa sáng!" />
            </ListItem>
        </List>
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
