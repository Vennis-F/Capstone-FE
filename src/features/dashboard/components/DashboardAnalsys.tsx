import { Box, Container,} from '@mui/material';
import React from "react";

// interface DashboardProps {
//   userId: string;
// }

const DashboardAnalsys = () => (
  <Box>
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h2 className="title">Admin Dashboard</h2>
      </Box>
      <Box sx={{ width: 1200, height: 1000}}>
        <iframe 
          width="100%" 
          height="1000" 
          src="https://lookerstudio.google.com/embed/reporting/c1cab843-3e27-4ffa-83a8-355dd08503e3/page/p_zh15e9hnbd" 
          title="Admin Dashboard"
        ></iframe>
      </Box>
    </Container>
  </Box>
);

export default DashboardAnalsys;
















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
