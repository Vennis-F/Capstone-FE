import StarIcon from '@mui/icons-material/Star'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
  Grid,
  Button,
  Typography,
} from '@mui/material'
import Image from 'material-ui-image'
import { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom'

import { getCustomerDrawingsHomePage } from 'features/customer-drawing/api'
import { CustomerDrawing, CustomerDrawingSortField } from 'features/customer-drawing/types'
import { getImage } from 'features/image/components/apis'
import { OrderType } from 'types'

import { findContestsFilter, getContestStatusActive } from '../api'
import { Contest, mapStatusToVietnamese } from '../types'

import ContestCardView from './ContestCardView'
import LearnerDrawingCardView from './LearnerDrawingCardView'

const ContestHomePageContainer = () => {
  const [contests, setContests] = useState<Contest[]>([])
  const [contestActives, setContestActives] = useState<Contest[]>([])
  const [drawingBestVotes, setDrawingBestVotes] = useState<CustomerDrawing[]>([])
  const [drawingBestUpdateds, setDrawingBestUpdateds] = useState<CustomerDrawing[]>([])
  const navigate = useNavigate()

  const handleGetContests = async () => {
    const res = await findContestsFilter({
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 1000,
      },
    })
    setContests(res.data)

    setContestActives(await getContestStatusActive())

    const drawingBestVoteRes = await getCustomerDrawingsHomePage({
      customerDrawingSortField: CustomerDrawingSortField.VOTE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 3,
      },
    })
    setDrawingBestVotes(drawingBestVoteRes.data)

    const drawingBestUpdatedDateRes = await getCustomerDrawingsHomePage({
      customerDrawingSortField: CustomerDrawingSortField.UPDATED_DATE,
      pageOptions: {
        order: OrderType.DESC,
        page: 1,
        take: 3,
      },
    })

    setDrawingBestUpdateds(drawingBestUpdatedDateRes.data)
  }

  useEffect(() => {
    handleGetContests()
  }, [])
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundImage: `url("https://png.pngtree.com/background/20210711/original/pngtree-art-training-class-education-and-training-background-template-picture-image_1120018.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '160vh',
        margin: '-50px 0',
        paddingTop: '50px',
      }}
    >
      <Container maxWidth="lg">
        <Carousel>
          {contests.map(contest => (
            <Grid
              key={contest.id}
              container
              spacing={0}
              alignContent="center"
              sx={{
                backgroundImage: `url("https://tecwoodoutdoorfloor.com/upload/images/Blog/background-san-go4.jpg")`,

                backgroundSize: 'cover',
                height: 400,
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    color: '#fff',
                  }}
                >
                  <Typography style={{ fontSize: 35 }}>{contest.title}</Typography>
                  <Typography style={{ fontSize: 20 }}>
                    {`Cuộc thi ${mapStatusToVietnamese(contest.status)}`}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/contest/detail/${contest.id}`)}
                    sx={{
                      marginTop: 2,
                      marginBottom: 2,
                      color: '#fff',
                      fontSize: 30,
                      borderColor: '#fff',
                      borderRadius: 0,
                    }}
                  >
                    xem cuộc thi
                  </Button>
                  <Typography>{contest.totalCustomerDrawing} người tham gia</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Image
                    src={getImage(contest.thumbnailUrl)}
                    style={{ height: '250px', width: '250px', padding: 0 }}
                    imageStyle={{
                      height: '250px',
                      width: '250px',
                      elevation: 5,
                      borderRadius: 3,
                      border: '8px solid black',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          ))}
        </Carousel>

        <List
          sx={{
            backgroundColor: '#ff8c94',
            color: '#fff',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: 3,
            marginTop: 2,
          }}
        >
          <ListItem disablePadding>
            <ListItemIcon>
              <StarIcon style={{ color: '#FFf' }} />
            </ListItemIcon>
            <ListItemText primary="Chào mừng các bạn đến với cuộc thi vẽ dành cho trẻ em trên trang web của chúng tôi! Đây là một cơ hội tuyệt vời để các bạn thể hiện tài năng sáng tạo của mình và tạo ra những tác phẩm nghệ thuật đẹp mắt. Bạn có biết rằng vẽ có thể giúp bạn phát triển trí não, tăng khả năng tưởng tượng và cải thiện kỹ năng giao tiếp không? Hãy cùng chúng tôi khám phá thế giới màu sắc và hình ảnh qua cuộc thi vẽ này nhé!" />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <StarIcon style={{ color: '#FFf' }} />
            </ListItemIcon>
            <ListItemText primary="Các phụ huynh cũng có thể đăng ký khi có một cuộc thi mới và tham gia cùng con em mình. Các bạn sẽ có cơ hội giành được những phần thưởng hấp dẫn như các mã giảm giá để trải nghiệm thêm nhiều sản phẩm thú vị trên trang web của chúng tôi. Ngoài ra, các tác phẩm xuất sắc còn có cơ hội được đăng tải nổi bật trên trang web của chúng tôi và được nhiều người biết đến." />
          </ListItem>
          <ListItem disablePadding>
            <ListItemIcon>
              <StarIcon style={{ color: '#FFf' }} />
            </ListItemIcon>
            <ListItemText primary="Chúng tôi khuyến khích các em tham gia để phát huy kỹ năng nghệ thuật của mình, tạo ra những tác phẩm độc đáo và thể hiện sự sáng tạo của mình trong một môi trường thú vị và truyền cảm hứng. Đừng ngần ngại, hãy đăng ký và tham gia cùng chúng tôi và để tài năng của bạn tỏa sáng!" />
          </ListItem>
        </List>

        <Grid container spacing={10}>
          <Grid item xs={4}>
            CUỘC THI ĐANG DIỄN RA
            <Divider style={{ marginTop: 15, marginBottom: 30 }} />
            {contestActives.map(contest => (
              <ContestCardView key={contest.id} contest={contest} />
            ))}
          </Grid>
          <Grid item xs={4}>
            BÀI THI SỐ LƯỢNG BÌNH CHỌN CAO NHẤT
            <Divider style={{ marginTop: 15, marginBottom: 30 }} />
            {drawingBestVotes.map(drawing => (
              <LearnerDrawingCardView key={drawing.id} customerDrawing={drawing} />
            ))}
          </Grid>
          <Grid item xs={4}>
            HOÀN THÀNH GẦN ĐÂY
            <Divider style={{ marginTop: 15, marginBottom: 30 }} />
            {drawingBestUpdateds.map(drawing => (
              <LearnerDrawingCardView key={drawing.id} customerDrawing={drawing} />
            ))}
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}
export default ContestHomePageContainer
