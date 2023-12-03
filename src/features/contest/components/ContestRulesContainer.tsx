/* eslint-disable */
import { Grid, Typography } from '@material-ui/core'
import { Box, Container, Paper } from '@mui/material'
import Image from 'material-ui-image'
import Stack from '@mui/material/Stack';
import React from 'react'
import ContestPaint from './ContestPaint';
const ContestRulesContainer = () => {
    console.log(123)
    return <Container maxWidth="lg" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
        <Typography style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: 30 }}>
            THỂ LỆ CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#e56b87' }}>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <Image
                        src={
                            'https://fineartamerica.com/images/contestlogos/logo1-your-personal-masterpiece-digital-art-or-photography.jpg'
                        }
                        style={{ height: '200px', width: '270px', padding: 0, marginLeft: 30 }}
                        imageStyle={{ height: '200px', width: '270px', borderRadius: 3 }}
                    />
                </Grid>
                <Grid item xs={6} style={{ marginLeft: '-20px', color: "#fff" }}>
                    <Typography  >
                        1. Bạn chỉ cần có tài khoản và đăng nhập vào trang web vecungtreem.online là có thể tham gia cuộc thi.
                    </Typography>
                    <Typography  >
                        2. Vẽ đúng đề tài mà cuộc thi đã cho.
                    </Typography>
                    <Typography  >
                        3. Không sử dụng tác phẩm của người khác để tham gia cuộc thi.
                    </Typography>
                    <Typography  >4. Mỗi người tham gia cuộc thi chỉ có thế nộp 1 tác phẩm dự thi.</Typography>
                </Grid>
            </Grid>
        </Paper>
        <Typography style={{ fontWeight: "bold", marginBottom: 20, marginTop: 40, fontSize: 30 }}>
            THỂ LỆ NỘP BÀI
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: '#ff8c94', color: "#fff" }}>
            <Typography>
                Mỗi người tham gia có thể gửi 1 bài dự thi, và sẽ đợi hội đồng xét duyệt bài thi đó.
            </Typography>
        </Paper>
        <Typography style={{ fontWeight: "bold", marginBottom: 20, marginTop: 40, fontSize: 30 }}>
            THỂ LỆ BÌNH CHỌN
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: "#f08080", color: "#fff" }}>
            <Typography>
                1.Bạn phải tham gia cuộc thi thì mới được bình chọn bài mình thích.
            </Typography>
            <Typography>
                2.Mỗi người chỉ có một lượt bình chọn và không được bình chọn cho chính bài thi của mình.
            </Typography>
        </Paper>
        <Typography style={{ fontWeight: "bold", marginBottom: 20, marginTop: 40, fontSize: 30 }}>
            THỜI GIAN CUỘC THI
        </Typography>
        <Paper elevation={3} style={{ padding: 20, backgroundColor: "#9370db", color: "#fff" }}>
            <Grid container spacing={0} style={{ marginBottom: 10 }}>
                <Grid item xs={3}>
                    <Typography >
                        Bắt đầu đăng ký :
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ marginLeft: -50 }}>
                        11 giờ sáng Thứ bảy, ngày 02 tháng 12 năm 2023
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={0} style={{ marginBottom: 10 }}>
                <Grid item xs={3}>
                    <Typography >
                        Kết thúc đăng ký :
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ marginLeft: -50 }}>
                        11 giờ sáng Thứ năm, ngày 07 tháng 12 năm 2023
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={0} style={{ marginBottom: 10 }}>
                <Grid item xs={3}>
                    <Typography >
                        Bắt đầu bình chọn :
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ marginLeft: -50 }}>
                        11 giờ sáng Thứ sáu, ngày 08 tháng 12 năm 2023
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={0} style={{ marginBottom: 10 }}>
                <Grid item xs={3}>
                    <Typography >
                        Kết thúc bình chọn :
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ marginLeft: -50 }}>
                        11 giờ sáng Thứ tư, ngày 13 tháng 12 năm 2023
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={0} style={{ marginBottom: 10 }}>
                <Grid item xs={3}>
                    <Typography >
                        Trao giải thưởng :
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography style={{ marginLeft: -50 }}>
                        11 giờ sáng Thứ tư, ngày 13 tháng 12 năm 2023
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    </Container >
    // return <Container maxWidth="md" >
    //     <Paper elevation={3} sx={{ paddingTop: 2, paddingBottom: 2 }} >
    //         <Typography style={{ fontWeight: "bold", fontSize: 25, justifyContent: "center", display: "flex" }}>LeaderBoard</Typography>
    //         <Stack spacing={2} sx={{ marginTop: 3 }}>
    //             <Grid container spacing={0}>
    //                 <Grid item xs={4} >
    //                     <Box sx={{ width: "40%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: "100px", border: "2px solid #ccc", marginLeft: 10, paddingBottom: 1, paddingTop: 1 }}>
    //                         <Typography style={{ fontWeight: "bold", fontSize: 30, }}>1</Typography>
    //                         <Image
    //                             src={"https://fineartamerica.com/images/contestlogos/logo1-beautiful-paris-city-of-lights-at-sunset-or-night.jpg"}
    //                             style={{ height: '50px', width: '50px', padding: 0 }}
    //                             imageStyle={{ height: '50px', width: '50px', borderRadius: 40, marginLeft: 15 }}
    //                         />
    //                     </Box>
    //                 </Grid>
    //                 <Grid item xs={4} >
    //                     <Box sx={{ color: "#333" }}>
    //                         <Typography style={{ fontWeight: "bold", fontSize: 15 }}>Nguyễn Hoàng Lộc</Typography>
    //                         <Typography style={{ fontSize: 15 }}>600 lượt thích</Typography>
    //                     </Box>
    //                 </Grid>
    //                 <Grid item xs={4}>
    //                     <Image
    //                         src={"https://fineartamerica.com/images/contestlogos/logo1-your-personal-masterpiece-digital-art-or-photography.jpg"}
    //                         style={{ height: '70px', width: '120px', padding: 0 }}
    //                         imageStyle={{ height: '70px', width: '120px', borderRadius: 10 }}
    //                     />
    //                 </Grid>
    //             </Grid>
    //             <Grid container spacing={0}>
    //                 <Grid item xs={4} >
    //                     <Box sx={{ width: "40%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: "100px", border: "2px solid #ccc", marginLeft: 10, paddingBottom: 1, paddingTop: 1 }}>
    //                         <Typography style={{ fontWeight: "bold", fontSize: 30, }}>2</Typography>
    //                         <Image
    //                             src={"https://fineartamerica.com/images/contestlogos/logo1-beautiful-paris-city-of-lights-at-sunset-or-night.jpg"}
    //                             style={{ height: '50px', width: '50px', padding: 0 }}
    //                             imageStyle={{ height: '50px', width: '50px', borderRadius: 40, marginLeft: 15 }}
    //                         />
    //                     </Box>
    //                 </Grid>
    //                 <Grid item xs={4} >
    //                     <Box sx={{ color: "#333" }}>
    //                         <Typography style={{ fontWeight: "bold", fontSize: 15 }}>Nguyễn Hoàng Lộc</Typography>
    //                         <Typography style={{ fontSize: 15 }}>600 lượt thích</Typography>
    //                     </Box>
    //                 </Grid>
    //                 <Grid item xs={4}>
    //                     <Image
    //                         src={"https://fineartamerica.com/images/contestlogos/logo1-your-personal-masterpiece-digital-art-or-photography.jpg"}
    //                         style={{ height: '70px', width: '120px', padding: 0 }}
    //                         imageStyle={{ height: '70px', width: '120px', borderRadius: 10 }}
    //                     />
    //                 </Grid>
    //             </Grid>
    //         </Stack>
    //     </Paper>
    // </Container >

    // return <Container maxWidth="lg" style={{ backgroundColor: "#fff", paddingTop: 10 }}>
    //     <Grid container spacing={5}>
    //         <Grid item xs={3}>
    //             <Image
    //                 src={
    //                     'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/reindeer-calf-merry-christmas-riley-bradford.jpg'
    //                 }
    //                 style={{ height: '220px', width: '250px', padding: 0 }}
    //                 imageStyle={{ height: '220px', width: '250px' }}
    //             />
    //             <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
    //                 <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>Reindeer Calf Merry Christmas</Typography>
    //                 <Typography style={{ color: "#666666", fontSize: 12 }}>Riley Bradford</Typography>
    //             </Box>
    //         </Grid>
    //         <Grid item xs={3}>
    //             <Image
    //                 src={
    //                     'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/a-cow-christmas-riley-bradford.jpg'
    //                 }
    //                 style={{ height: '220px', width: '250px', padding: 0 }}
    //                 imageStyle={{ height: '220px', width: '250px' }}
    //             />
    //             <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
    //                 <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>A Cow Christmas</Typography>
    //                 <Typography style={{ color: "#666666", fontSize: 12 }}>Riley Bradford</Typography>
    //             </Box>
    //         </Grid>
    //         <Grid item xs={3}>
    //             <Image
    //                 src={
    //                     'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/blue-eyed-pup-madalina-jantea.jpg'
    //                 }
    //                 style={{ height: '220px', width: '250px', padding: 0 }}
    //                 imageStyle={{ height: '220px', width: '250px' }}
    //             />
    //             <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
    //                 <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>Pomsky Pup</Typography>
    //                 <Typography style={{ color: "#666666", fontSize: 12 }}>Madlina Jantea</Typography>
    //             </Box>
    //         </Grid>
    //         <Grid item xs={3}>
    //             <Image
    //                 src={
    //                     'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/winter-postcard-madalina-jantea.jpg'
    //                 }
    //                 style={{ height: '220px', width: '250px', padding: 0 }}
    //                 imageStyle={{ height: '220px', width: '250px' }}
    //             />
    //             <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
    //                 <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>Winter Pup</Typography>
    //                 <Typography style={{ color: "#666666", fontSize: 12 }}>Madlina Jantea</Typography>
    //             </Box>
    //         </Grid>
    //     </Grid>
    // </Container>
}
export default ContestRulesContainer