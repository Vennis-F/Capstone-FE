import { Container, Typography, Box, Grid } from '@mui/material'

import { LearningCourseCardView } from './LearningCourseCardView'

export const MyLearningContainer = () => {
  const listcourses = [
    {
      id: '0',
      title: 'NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)',
      author: 'Maximilian Schwarzmüller',
      price: 100,
      rating: 1.2,
      img: 'https://img-b.udemycdn.com/course/240x135/1879018_95b6_3.jpg',
    },
    {
      id: '1',
      title: 'Microservices with Node JS and React',
      author: 'Stephen Gridle',
      price: 400,
      rating: 3,
      img: 'https://img-c.udemycdn.com/course/240x135/2887266_c696_5.jpg',
    },
    {
      id: '2',
      title: 'The Complete Node.js Developer Course (3rd Edition)',
      author: 'Nguyen Hoang Anh',
      price: 20,
      rating: 4.6,
      img: 'https://img-c.udemycdn.com/course/240x135/922484_52a1_8.jpg',
    },
    {
      id: '3',
      title: 'NodeJS Tutorial and Projects Course',
      author: 'Nguyen Hoang Loc',
      price: 15,
      rating: 0,
      img: 'https://img-b.udemycdn.com/course/240x135/3830262_2c3b_3.jpg',
    },
    {
      id: '4',
      title: 'NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)',
      author: 'Maximilian Schwarzmüller',
      price: 100,
      rating: 1.2,
      img: 'https://img-b.udemycdn.com/course/240x135/1879018_95b6_3.jpg',
    },
    {
      id: '5',
      title: 'Microservices with Node JS and React',
      author: 'Stephen Gridle',
      price: 400,
      rating: 3,
      img: 'https://img-c.udemycdn.com/course/240x135/2887266_c696_5.jpg',
    },
    {
      id: '6',
      title: 'The Complete Node.js Developer Course (3rd Edition)',
      author: 'Nguyen Hoang Anh',
      price: 20,
      rating: 4.6,
      img: 'https://img-c.udemycdn.com/course/240x135/922484_52a1_8.jpg',
    },
    {
      id: '7',
      title: 'NodeJS Tutorial and Projects Course',
      author: 'Nguyen Hoang Loc',
      price: 15,
      rating: 2,
      img: 'https://img-b.udemycdn.com/course/240x135/3830262_2c3b_3.jpg',
    },
    {
      id: '8',
      title: 'NodeJS - The Complete Guide (MVC, REST APIs, GraphQL, Deno)',
      author: 'Maximilian Schwarzmüller',
      price: 100,
      rating: 1.2,
      img: 'https://img-b.udemycdn.com/course/240x135/1879018_95b6_3.jpg',
    },
    {
      id: '9',
      title: 'Microservices with Node JS and React',
      author: 'Stephen Gridle',
      price: 400,
      rating: 3,
      img: 'https://img-c.udemycdn.com/course/240x135/2887266_c696_5.jpg',
    },
    {
      id: '10',
      title: 'The Complete Node.js Developer Course (3rd Edition)',
      author: 'Nguyen Hoang Anh',
      price: 20,
      rating: 4.6,
      img: 'https://img-c.udemycdn.com/course/240x135/922484_52a1_8.jpg',
    },
    {
      id: '11',
      title: 'NodeJS Tutorial',
      author: 'Nguyen Hoang Loc',
      price: 15,
      rating: 2,
      img: 'https://img-b.udemycdn.com/course/240x135/3830262_2c3b_3.jpg',
    },
  ]
  return (
    <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '600' }}>
        Khóa học của tôi
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
          {listcourses.map(learningCourse => (
            <Grid item xs={2} sm={3} md={3} key={learningCourse.id}>
              <LearningCourseCardView learningCourse={learningCourse} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
