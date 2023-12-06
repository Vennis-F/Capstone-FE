import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
  Box,
  TextField,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { getCategories } from 'features/category/api'
import { Category } from 'features/category/types'
import CreateCourseDialogForm from 'features/courses/components/CreateCourseDialogForm'
import { CourseStatus, SortFieldCourse, courseStatusInfors } from 'features/courses/types'
import { getLevels } from 'features/level/api'
import { Level } from 'features/level/types'
import CustomButton from 'libs/ui/components/CustomButton'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType } from 'types'

import { createCourseByInstructor, getCoursesByInstructorId } from '../api/index'
import { CourseFilterByInstructorResponse, GetCoursesByInstructorBodyRequest } from '../types'

import InstructorCourseCardView from './InstructorCourseCardView'

const InstructorHomepageContainer = () => {
  const [search, setSearch] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [courseStatus, setCourseStatus] = useState<CourseStatus | undefined>(undefined)
  const [orderType, setOrderType] = useState<OrderType>(OrderType.DESC)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [courses, setCourses] = useState<CourseFilterByInstructorResponse[]>([])
  const [levels, setLevels] = useState<Level[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [openCreateForm, setOpenCreateForm] = useState(false)
  const [loadingCreate, setLoadingCreate] = useState(false)

  const handleGetCourseByInstructor = async () => {
    const bodyRequest: GetCoursesByInstructorBodyRequest = {
      search: searchTerm,
      pageOptions: {
        order: orderType,
        page,
        take: 5,
      },
      courseStatus,
      sortField: SortFieldCourse.PUBLISHED_DATE,
    }

    const responses = await getCoursesByInstructorId(bodyRequest)
    setCourses(responses.data)
    setPageCount(responses.meta.pageCount)
  }

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setCourseStatus(event.target.value as CourseStatus)
    setPage(1)
  }

  const handleChangeOrderType = (event: SelectChangeEvent) => {
    setOrderType(event.target.value as OrderType)
    setPage(1)
  }

  const handleSearch = () => {
    setSearchTerm(search)
    setPage(1)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const handlePrepare = useCallback(async () => {
    const levelsRes = await getLevels('true')
    const categoriesRes = await getCategories('true')
    setCategories(categoriesRes)
    setLevels(levelsRes)
    // if (levelsRes.length > 0) setLevelId(levelsRes[0].id)
    // if (categoriesRes.length > 0) setCategoryId(categoriesRes[0].id)
  }, [])

  console.log(page, searchTerm)

  useEffect(() => {
    handleGetCourseByInstructor()
  }, [page, courseStatus, orderType, searchTerm])

  useEffect(() => {
    handlePrepare()
  }, [])

  // console.log(Object.keys(CourseStatus))

  return (
    <Box sx={{ display: 'flex' }}>
      <Container>
        <TitleTypography title="Khóa học" />
        <Grid container marginBottom="20px">
          <Grid item xs={3}>
            <TextField
              label="Tìm kiếm khóa học của bạn"
              variant="outlined"
              value={search}
              onChange={handleInputChange}
              sx={{ backgroundColor: 'white' }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch} size="large">
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
              <InputLabel id="label-course-status">Trạng thái khóa học</InputLabel>
              <Select
                labelId="label-course-status"
                id="select-course-status"
                onChange={handleChangeStatus}
                label="course-status"
                value={courseStatus}
              >
                <MenuItem value={undefined}>{'None'}</MenuItem>
                {Object.values(CourseStatus).map(currCourseStatus => {
                  const statusInfor = courseStatusInfors.find(
                    ({ status }) => status === currCourseStatus,
                  )
                  return (
                    <MenuItem key={currCourseStatus} value={currCourseStatus}>
                      {statusInfor?.vietnamese}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} marginLeft="14px">
            <FormControl fullWidth sx={{ backgroundColor: 'white' }}>
              <InputLabel id="label-order">Sắp xếp</InputLabel>
              <Select
                labelId="label-order"
                id="select-order"
                onChange={handleChangeOrderType}
                label="order"
                value={orderType}
              >
                <MenuItem value={OrderType.DESC}>{'Mới nhất'}</MenuItem>
                <MenuItem value={OrderType.ASC}>{'Cũ nhất'}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2} marginLeft="auto">
            <CustomButton size="large" onClick={() => setOpenCreateForm(true)}>
              <AddIcon /> Khóa học mới
            </CustomButton>
          </Grid>
        </Grid>
        {courses.map(course => (
          <InstructorCourseCardView key={course.id} course={course} />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '40px' }}>
          <Stack spacing={2}>
            <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
          </Stack>
        </Box>
      </Container>

      <CreateCourseDialogForm
        categories={categories}
        levels={levels}
        handleCloseDialog={() => {
          setOpenCreateForm(false)
        }}
        handleOpenDialog={() => {
          setOpenCreateForm(true)
        }}
        isLoading={loadingCreate}
        openDialog={openCreateForm}
        onSubmitClick={async (data, reset) => {
          console.log(data)
          try {
            setLoadingCreate(true)
            await createCourseByInstructor({
              title: data.title,
              categoryId: data.categoryId,
              levelId: data.levelId,
            })
            toastSuccess({ message: 'Tạo khóa học thành công' })
            reset()
            setOpenCreateForm(false)
          } catch (error) {
            console.log(error)
            showErrorResponseSaga({ defaultMessage: 'Tạo khóa học không thành công', error })
          }
          setLoadingCreate(false)
        }}
        defaultValues={{
          title: '',
          categoryId: '',
          levelId: '',
        }}
      />

      {/* <Fab
        aria-label="add"
        onClick={() => navigate('/instructor/course/create')}
        sx={{
          position: 'fixed',
          bottom: '80px',
          right: '80px',
          color: 'white',
          backgroundColor: '#d946ef',
          ':hover': {
            color: 'white',
            backgroundColor: '#bd38d1',
          },
        }}
      >
        <AddIcon />
      </Fab> */}
    </Box>
  )
}

export default InstructorHomepageContainer
