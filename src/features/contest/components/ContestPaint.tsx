/* eslint-disable */
import { Grid, Typography } from '@material-ui/core'
import { Box, Container } from '@mui/material'
import Image from 'material-ui-image'
import React from 'react'
const ContestPaint = () => {
    console.log(123)
    return <Container maxWidth="lg" style={{ backgroundColor: "#fff", paddingTop: 10 }}>
        <Grid container spacing={5}>
            <Grid item xs={3}>
                <Image
                    src={
                        'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/reindeer-calf-merry-christmas-riley-bradford.jpg'
                    }
                    style={{ height: '220px', width: '250px', padding: 0 }}
                    imageStyle={{ height: '220px', width: '250px' }}
                />
                <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>Reindeer Calf Merry Christmas</Typography>
                    <Typography style={{ color: "#666666", fontSize: 12 }}>Riley Bradford</Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Image
                    src={
                        'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/a-cow-christmas-riley-bradford.jpg'
                    }
                    style={{ height: '220px', width: '250px', padding: 0 }}
                    imageStyle={{ height: '220px', width: '250px' }}
                />
                <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>A Cow Christmas</Typography>
                    <Typography style={{ color: "#666666", fontSize: 12 }}>Riley Bradford</Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Image
                    src={
                        'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/blue-eyed-pup-madalina-jantea.jpg'
                    }
                    style={{ height: '220px', width: '250px', padding: 0 }}
                    imageStyle={{ height: '220px', width: '250px' }}
                />
                <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>Pomsky Pup</Typography>
                    <Typography style={{ color: "#666666", fontSize: 12 }}>Madlina Jantea</Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Image
                    src={
                        'https://render.fineartamerica.com/images/images-new-artwork/images/artworkimages/medium/3/winter-postcard-madalina-jantea.jpg'
                    }
                    style={{ height: '220px', width: '250px', padding: 0 }}
                    imageStyle={{ height: '220px', width: '250px' }}
                />
                <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "inherit" }}>Winter Pup</Typography>
                    <Typography style={{ color: "#666666", fontSize: 12 }}>Madlina Jantea</Typography>
                </Box>
            </Grid>
        </Grid>
    </Container>
}
export default ContestPaint