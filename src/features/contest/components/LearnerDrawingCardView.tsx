/* eslint-disable */
import { Grid, Typography } from '@material-ui/core'
import { Container, Paper } from '@mui/material'
import Divider from '@mui/material/Divider';
import React from 'react'
import Image from 'material-ui-image'

interface Props {

}

const LearnerDrawingCardView = (props: Props) => {
    return (
        <Grid container spacing={0} style={{ marginBottom: 70 }}>
            <Grid item xs={6}>
                <Image
                    src={"https://fineartamerica.com/images/contestlogos/logo1-your-personal-masterpiece-digital-art-or-photography.jpg"}
                    style={{ height: '125px', width: '120px', padding: 0 }}
                    imageStyle={{ height: '125px', width: '120px', elevation: 5, borderRadius: 3 }}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography style={{ fontSize: 15, fontWeight: '500' }}>VẼ NHÂN VẬT PHÙ THỦY TRONG TRUYỆN TRANH</Typography>
                <Divider style={{ marginTop: 8, marginBottom: 8 }} />
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10, color: "#666666" }}>Thời hạn:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10 }}>11 Giờ</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10, color: "#666666" }}>Bỏ phiếu:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10 }}>Chỉ những người tham gia</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10, color: "#666666" }}>Thành viên:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10 }}>171</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10, color: "#666666" }}>Hình ảnh:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 10 }}>172</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LearnerDrawingCardView
