import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Container, Pagination, Rating, Stack } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Checkbox from '@mui/material/Checkbox'
import Fade from '@mui/material/Fade'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CourseListGuestContainer = () => {
  const navigate = useNavigate()
  const [checked, setChecked] = useState([0])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [page, setPage] = useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }
  const listcourses = [
    {
      id: '0',
      title: 'NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)',
      author: 'Maximilian Schwarzmüller',
      price: 100,
      vote: 1.2,
      img: 'https://img-b.udemycdn.com/course/240x135/1879018_95b6_3.jpg',
    },
    {
      id: '1',
      title: 'Microservices with Node JS and React',
      author: 'Stephen Gridle',
      price: 400,
      vote: 3,
      img: 'https://img-c.udemycdn.com/course/240x135/2887266_c696_5.jpg',
    },
    {
      id: '2',
      title: 'The Complete Node.js Developer Course (3rd Edition)',
      author: 'Nguyen Hoang Anh',
      price: 20,
      vote: 4.6,
      img: 'https://img-c.udemycdn.com/course/240x135/922484_52a1_8.jpg',
    },
    {
      id: '3',
      title: 'NodeJS Tutorial and Projects Course',
      author: 'Nguyen Hoang Loc',
      price: 15,
      vote: 2,
      img: 'https://img-b.udemycdn.com/course/240x135/3830262_2c3b_3.jpg',
    },
  ]

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        2,026 kết quả cho từ khóa &quot;NodeJS&ldquo;
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Button
          variant="outlined"
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ textAlign: 'left' }}
          endIcon={<ExpandMoreIcon />}
        >
          <Box>
            <Typography
              sx={{
                color: 'black',
                fontSize: '10px',
                fontWeight: 'bold',
                textTransform: 'lowercase',
              }}
            >
              Sắp xếp bởi
            </Typography>
            <Typography sx={{ fontSize: '16px', color: 'black' }}>Mới nhất</Typography>
          </Box>
        </Button>
        <Button sx={{ color: 'black', fontWeight: 'bold', textTransform: 'capitalize' }}>
          Xóa bộ lọc
        </Button>
      </Box>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Mới nhất</MenuItem>
        <MenuItem onClick={handleClose}>Đánh giá nhiều nhất</MenuItem>
        <MenuItem onClick={handleClose}>Đánh giá cao nhất</MenuItem>
      </Menu>
      <Box maxWidth="lg" sx={{ display: 'flex', padding: '0' }}>
        <Box sx={{ width: '30%', paddingRight: '20px' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                Level
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3].map(value => {
                  const labelId = `checkbox-list-label-${value}`

                  return (
                    <ListItem key={value} disablePadding>
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                      </ListItemButton>
                    </ListItem>
                  )
                })}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                Rating
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                ex, sit amet blandit leo lobortis eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box sx={{ width: '70%', display: 'block' }}>
          {listcourses.map(course => (
            <Card
              onClick={() => navigate('/detail-course', { state: { id: course.id } })}
              key={course.id}
              sx={{ display: 'flex', height: '150px', marginBottom: '20px' }}
            >
              <CardMedia
                component="img"
                sx={{ flex: 1 }}
                image={course.img}
                alt="Live from space album cover"
              />
              <Box sx={{ flex: 4, display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5" sx={{ fontSize: '18px' }}>
                    {course.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Acacdemic by {course.author}
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
                      sx={{ fontWeight: 'bold', marginRight: 1 }}
                    >
                      {course.vote}
                    </Typography>
                    <Rating name="read-only" value={course.vote} readOnly />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" component="span">
                      13.5 total hours - 85 lectures - All Levels
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <Box sx={{ flex: 1, padding: '16px', textAlign: 'right' }}>
                <Typography component="span" variant="h5" sx={{ fontWeight: 'bold' }}>
                  {course.price}$
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Stack spacing={2}>
          <Pagination count={10} page={page} onChange={handleChange} color="secondary" />
        </Stack>
      </Box>
    </Container>
  )
}
