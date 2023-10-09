import { Avatar, Grid } from '@material-ui/core'
import {
  PersonalVideoOutlined,
  AccessTimeOutlined,
  SmartphoneOutlined,
  AllInclusiveOutlined,
} from '@material-ui/icons'
import CircleSharpIcon from '@mui/icons-material/CircleSharp'
import EventIcon from '@mui/icons-material/Event'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import GrainIcon from '@mui/icons-material/Grain'
import HomeIcon from '@mui/icons-material/Home'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import StarIcon from '@mui/icons-material/Star'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import {
  Box,
  Button,
  Container,
  Typography,
  Rating,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  // CardActions,
} from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

import ReadMoreText from 'libs/ui/components/ReadMoreText'

interface CouresDetailGuestContainerProps {
  id: string
}

export const CouresDetailGuestContainer = ({ id }: CouresDetailGuestContainerProps) => {
  console.log('[CourseDetailGuestPage id]', id)
  const currentCourse = {
    id,
    title: 'Linux for Network Engineers: Practical Linux with GNS3',
    rating: 4.6,
    numsOfEnroll: 189535,
    author: 'David Bombal',
    updatedAt: '1/2023',
    target: '',
    description: `It is important for you as a network engineer to learn Linux!\n
Why? There are many reasons including:\n
1) A lot of network operating systems are based on Linux, or have a Linux shell you can access, or use Linux type commands. I'll show you an example using Cisco, Arista and Cumulus Linux.\n
2) Network Automation tools such as Ansible don't run the command node on Windows. You are probably going to use Linux with tools such as Ansible, Netmkio, NAPALM and other network automation tools.
\n
3) SDN controllers such as OpenDaylight, ONOS, RYU and APIC-EM run on Linux.You will find that many SDN tools require Linux.
\n
4) DevOps tools such as git work best with Linux.
\n
5) IoT devices typically run Linux
\n
6) A new breed of network devices from companies like Facebook, Microsoft and Cumulus Linux use Linux.
\n
There are even more reasons, but make sure you don't get left behind! You as a network engineer start learning Linux.

This course teaches foundational Linux knowledge without assuming that you have any Linux experience. Learn practically with GNS3!

Learn how to configure Linux networking, how to create users and assign permissions, how to install and run Linux services such as DNS and DHCP.

The course uses various GNS3 topologies with devices such as:

1) Linux Docker containers
\n
2) Linux GNS3 QEMU virtual machines
\n
3) Traditional Linux virtual mahcines
\n
4) Network devices - you could use Cisco, Arista, Cumulus Linux or others
\n
Do you want to see something else added to the course? Just let me know. I like to get your feedback on ways I can improve the course and add more content that you think is relevant.
\n
Networking is changing. Make sure you keep up to date!
\n
All the very best!
\n
David`,
    requirement: 'CCNA or basic networking knowledge',
    comments: [
      {
        id: 1,
        user: { username: 'Nguyen Hoang Anh' },
        ratedStar: 4,
        updatedDate: '4 months ago',
        description: `This course has a very vast knowledge of the backend stuff. However, it was a little difficult to understand the voice in English I'm not sure why maybe because I'm from India.`,
      },
      {
        id: 2,
        user: { username: 'Nguyen Hoang Loc' },
        ratedStar: 4,
        updatedDate: '1 months ago',
        description: `Accent is a bit rough and the volume can be a bit low, but the guy explains some complicated stuff very well. I appreciate this course. It gets a lot better once you get into the AWS stuffs.`,
      },
      {
        id: 3,
        user: { username: 'Nguyen Phuoc Tho' },
        ratedStar: 4,
        updatedDate: '2 months ago',
        description: `Top shelf course - this course has amazing value. It covers some very advance topics with databases and gRPC. Recommend for anyone who is looking to do a monster project that incorporates a ton of technology.`,
      },
      {
        id: 4,
        user: { username: 'Lam Hung Nguyen' },
        ratedStar: 4,
        updatedDate: '3 months ago',
        description: `Nice, great and too much useful guidelines, deeply knowledge in the course, many thanks the author @phamlequang, hope you can bring more interesting topics like GraphQL, API proxy, WebHook/WebSocket or even a MongoDB implementation in your future courses!`,
      },
    ],
  }
  return (
    <>
      <Container
        maxWidth={false}
        sx={{ backgroundColor: '#2D2F31', paddingTop: '30px', paddingBottom: '22px' }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex' }}>
          <Box sx={{ width: '70%' }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white', marginBottom: '10px' }}>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center', color: '#19A7CE' }}
                color="inherit"
                href="/"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Trang chủ
              </Link>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center', color: '#19A7CE' }}
                color="inherit"
                href="/material-ui/getting-started/installation/"
              >
                <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Năng khiếu
              </Link>
              <Typography
                sx={{ display: 'flex', alignItems: 'center', color: '#146C94' }}
                color="text.primary"
              >
                <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                {currentCourse.title}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              {currentCourse.title}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ fontWeight: 'bold', marginRight: 1, color: '#FAAF00', fontSize: '16px' }}
              >
                {currentCourse.rating}
              </Typography>
              <Rating
                name="read-only"
                value={currentCourse.rating}
                readOnly
                sx={{ fontSize: '16px', marginRight: '10px' }}
              />
              <Typography component="span" sx={{ color: 'white', fontSize: '16px' }}>
                {currentCourse.numsOfEnroll} students
              </Typography>
            </Box>
            <Typography sx={{ color: 'white', fontWeight: 'bold', marginBottom: '10px' }}>
              Được tạo bởi
              <Link
                component="button"
                sx={{ fontSize: '16px', marginLeft: '10px' }}
                onClick={() => {
                  console.info("I'm a button.")
                }}
              >
                {currentCourse.author}
              </Link>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EventIcon sx={{ color: 'white', marginRight: '10px' }} />
              <Typography sx={{ color: 'white' }}>
                Last updated {currentCourse.updatedAt}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '30%', position: 'relative' }}>
            <Card sx={{ width: '100%', position: 'absolute', top: 0, right: 0 }}>
              <CardMedia
                sx={{ height: 200 }}
                image="https://img-c.udemycdn.com/course/240x135/3959106_03de_6.jpg"
                title="green iguana"
              />
              <CardContent sx={{ padding: '20px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    // component={'span'}
                    sx={{ color: 'black', fontWeight: 'bold', fontSize: 32, marginRight: 2 }}
                  >
                    ₫299,000
                  </Typography>
                  <Typography
                    sx={{ color: 'gray', fontSize: 14, textDecorationLine: 'line-through' }}
                  >
                    ₫1,699,000
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  disableElevation
                  sx={{
                    backgroundColor: '#19A7CE',
                    fontWeight: '500',
                    width: '100%',
                    '&:hover': {
                      backgroundColor: '#146C94',
                    },
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="outlined"
                  disableElevation
                  sx={{
                    borderColor: 'black',
                    color: 'black',
                    width: '100%',
                    fontWeight: '600',
                    '&:hover': {
                      borderColor: 'black',
                    },
                    marginTop: '10px',
                  }}
                >
                  Mua ngay
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textAlign: 'center', marginTop: '10px', fontSize: '12px' }}
                >
                  Đảm bảo hoàn tiền trong 30 ngày
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginTop: '12px',
                    marginBottom: '8px',
                  }}
                >
                  Khóa học này bao gồm
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <AccessTimeOutlined fontSize="small" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', marginLeft: '18px' }}
                  >
                    40.5 giờ video theo yêu cầu
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <PersonalVideoOutlined fontSize="small" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', marginLeft: '18px' }}
                  >
                    10 video bài giảng
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <SmartphoneOutlined fontSize="small" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', marginLeft: '18px' }}
                  >
                    Truy cập trên thiết bị di động và máy tính
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                  <AllInclusiveOutlined fontSize="small" />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', marginLeft: '18px' }}
                  >
                    Quyền truy cập suốt đời
                  </Typography>
                </Box>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          </Box>
        </Container>
      </Container>
      <Container maxWidth={false}>
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
          <Box sx={{ width: '67%' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Nội dung khóa học
            </Typography>
            <Accordion disableGutters={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Danh sách bài giảng
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                  {[
                    {
                      id: 1,
                      title: 'DB transaction lock & How to handle deadlock in Golang',
                      isPreview: true,
                      totalContentLength: '30:29',
                    },
                    {
                      id: 2,
                      title: 'How to avoid deadlock in DB transaction? Queries order matters!',
                      isPreview: true,
                      totalContentLength: '03:00',
                    },
                    {
                      id: 3,
                      title: 'Deeply understand transaction isolation levels & read phenomena',
                      isPreview: true,
                      totalContentLength: '01:29',
                    },
                    {
                      id: 4,
                      title: 'Setup Github Actions for Golang + Postgres to run automated tests',
                      isPreview: false,
                      totalContentLength: '04:12',
                    },
                  ].map(chapterLecture => (
                    <ListItem
                      key={chapterLecture.id}
                      disablePadding
                      secondaryAction={
                        <ListItemText>
                          {chapterLecture.isPreview && (
                            <Typography
                              component={'span'}
                              sx={{ textDecorationLine: 'underline', color: '#146C94' }}
                            >
                              Xem trước
                            </Typography>
                          )}
                          {` ${chapterLecture.totalContentLength}`}
                        </ListItemText>
                      }
                    >
                      {chapterLecture.isPreview ? (
                        <ListItemButton role={undefined} dense onClick={() => console.log(123)}>
                          <ListItemIcon>
                            <OndemandVideoIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={chapterLecture.title}
                            sx={{ textDecorationLine: 'underline', color: '#146C94' }}
                          />
                        </ListItemButton>
                      ) : (
                        <ListItemButton role={undefined} dense>
                          <ListItemIcon>
                            <OndemandVideoIcon />
                          </ListItemIcon>
                          <ListItemText primary={chapterLecture.title} />
                        </ListItemButton>
                      )}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Container>
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
          <Box sx={{ width: '67%' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Yêu cầu
            </Typography>
            <List
              sx={{
                listStyleType: 'disc',
                pl: 2,
              }}
            >
              <ListItem
                sx={{
                  display: 'list-item',
                }}
              >
                <Typography variant="body2">{currentCourse.requirement}</Typography>
              </ListItem>
            </List>
          </Box>
        </Container>
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
          <Box sx={{ width: '67%' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Miêu tả
            </Typography>
            <ReadMoreText maxCharacterCount={400} text={currentCourse.description} />
          </Box>
        </Container>
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
          <Box sx={{ width: '%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon sx={{ color: '#FAAF00', marginRight: '10px' }} />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {currentCourse.rating} đánh giá khóa học
              </Typography>
              <CircleSharpIcon
                sx={{
                  fontSize: '10px !important',
                  margin: '0 10px',
                  color: 'gray',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {`1k`} lượt đánh giá
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {currentCourse.comments.map(comment => (
                <Grid key={comment.id} item sm={12} md={6}>
                  <Card sx={{ width: '100%' }}>
                    <CardHeader
                      avatar={<Avatar>A</Avatar>}
                      title={comment.user.username}
                      subheader={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating
                            name="read-only"
                            value={comment.ratedStar}
                            readOnly
                            sx={{ fontSize: '16px', marginRight: '10px' }}
                          />
                          {comment.updatedDate}
                        </Box>
                      }
                    />
                    <CardContent>
                      <ReadMoreText text={comment.description} maxCharacterCount={50} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Container>
    </>
  )
}
