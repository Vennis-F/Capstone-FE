import { Box, Container,Paper} from '@mui/material';
import React from "react";

import TitleTypography from 'libs/ui/components/TitleTypography'
import { decodeToken, getAccessToken } from 'libs/utils/handle-token';

// interface DashboardProps {
//   userId: string;
// }

const InstructorDashboardContainer = () => {
  const token = getAccessToken
  if (!token) return null
  const instructor = decodeToken(getAccessToken() as string)
  const instructorId = instructor.id;
  return (
    <Box>
      <Container maxWidth="xl">
        <TitleTypography title="Bảng thống kê" />
        <Paper elevation={10} sx={{ height: '155vh', marginBottom: '40px', borderRadius: '10px' }}>
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://lookerstudio.google.com/embed/reporting/e3de8617-db03-45e8-a67c-b39094bb3049/page/4VDGB?params=%7B"ds27.instructor_id":"${instructorId}"%7D`}
            title="Instructor Dashboard"
          ></iframe>
        </Paper>
      </Container>
    </Box>
  )

}

export default InstructorDashboardContainer;



// const navigate = useNavigate()
// const [search, setSearch] = useState<string>('')
// const [searchTerm, setSearchTerm] = useState<string>('')
// const [courseStatus, setCourseStatus] = useState<CourseStatus | undefined>(undefined)
// const [orderType, setOrderType] = useState<OrderType>(OrderType.DESC)
// const [page, setPage] = useState(1)
// const [pageCount, setPageCount] = useState(0)
// const [courses, setCourses] = useState<CourseFilterByInstructorResponse[]>([])

// const handleGetCourseByInstructor = async () => {
//   const bodyRequest: GetCoursesByInstructorBodyRequest = {
//     search: searchTerm,
//     pageOptions: {
//       order: orderType,
//       page,
//       take: 5,
//     },
//     courseStatus,
//     sortField: SortFieldCourse.PUBLISHED_DATE,
//   }

//   const responses = await getCoursesByInstructorId(bodyRequest)
//   setCourses(responses.data)
//   setPageCount(responses.meta.pageCount)
// }

// const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
//   setPage(value)
// }

// const handleChangeStatus = (event: SelectChangeEvent) => {
//   setCourseStatus(event.target.value as CourseStatus)
//   setPage(1)
// }

// const handleChangeOrderType = (event: SelectChangeEvent) => {
//   setOrderType(event.target.value as OrderType)
// }

// const handleSearch = () => {
//   setSearchTerm(search)
//   setPage(1)
// }

// const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//   setSearch(event.target.value)
// }

// console.log(page, searchTerm)

// useEffect(() => {
//   handleGetCourseByInstructor()
// }, [page, courseStatus, orderType, searchTerm])

// return (
//   <Box sx={{ display: 'flex' }}>
//     <Container>
//       <TitleTypography title="Khóa học" />
//       <Grid container marginBottom="20px">
//         <Grid item xs={3}>
//           <TextField
//             label="Tìm kiếm khóa học của bạn"
//             variant="outlined"
//             value={search}
//             onChange={handleInputChange}
//             sx={{ backgroundColor: 'white' }}
//             InputProps={{
//               endAdornment: (
//                 <IconButton onClick={handleSearch} size="large">
//                   <SearchIcon />
//                 </IconButton>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={2}>
//           <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
//             <InputLabel id="label-course-status">Trạng thái khóa học</InputLabel>
//             <Select
//               labelId="label-course-status"
//               id="select-course-status"
//               onChange={handleChangeStatus}
//               label="course-status"
//               value={courseStatus}
//             >
//               <MenuItem value={undefined}>{'None'}</MenuItem>
//               <MenuItem value={CourseStatus.CREATED}>{CourseStatus.CREATED}</MenuItem>
//               <MenuItem value={CourseStatus.PENDING}>{CourseStatus.PENDING}</MenuItem>
//               <MenuItem value={CourseStatus.APPROVED}>{CourseStatus.APPROVED}</MenuItem>
//               <MenuItem value={CourseStatus.REJECTED}>{CourseStatus.REJECTED}</MenuItem>
//               <MenuItem value={CourseStatus.BANNED}>{CourseStatus.BANNED}</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={2} marginLeft="14px">
//           <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
//             <InputLabel id="label-order">Sắp xếp</InputLabel>
//             <Select
//               labelId="label-order"
//               id="select-order"
//               onChange={handleChangeOrderType}
//               label="order"
//               value={orderType}
//             >
//               <MenuItem value={OrderType.DESC}>{'Mới nhất'}</MenuItem>
//               <MenuItem value={OrderType.ASC}>{'Cũ nhất'}</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//       {courses.map(course => (
//         <InstructorCourseCardView key={course.id} course={course} />
//       ))}
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
//         <Stack spacing={2}>
//           <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
//         </Stack>
//       </Box>
//     </Container>
//     <Fab
//       aria-label="add"
//       onClick={() => navigate('/instructor/course/create')}
//       sx={{
//         position: 'fixed',
//         bottom: '80px',
//         right: '80px',
//         color: 'white',
//         backgroundColor: '#d946ef',
//         ':hover': {
//           color: 'white',
//           backgroundColor: '#bd38d1',
//         },
//       }}
//     >
//       <AddIcon />
//     </Fab>
//   </Box>
// )
