import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Container,
  Pagination,
  Stack,
  Box,
  Button,
  Fade,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'

import { getCategories } from 'features/category/api'
import { Category } from 'features/category/types'
import { getLevels } from 'features/level/api'
import { Level } from 'features/level/types'

import { getCoursesBySearch } from '../api'
import { ISortCourseByData, SortCourseByData } from '../data/SortCourseByData'
import { Course, GetCoursesBySearchRequest } from '../types'

import CourseFilterAccordion from './CourseFilterAccordion'
import CousreBoughtCardView from './CousreBoughtCardView'

export const CourseListGuestContainer = () => {
  // const navigate = useNavigate()
  const [listCourses, setListCourses] = useState<Course[]>([])
  const [listLevels, setListLevels] = useState<Level[]>([])
  const [listCategories, setListCategories] = useState<Category[]>([])
  const [checkedLevelIds, setCheckedLevelIds] = useState<string[]>([])
  const [checkedCategoryIds, setCheckedCategoryIds] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<ISortCourseByData>(SortCourseByData[0])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(0)
  const [courseCounts, setCourseCounts] = useState(0)
  const open = Boolean(anchorEl)

  // Handle events
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, data: ISortCourseByData) => {
    setSortBy(data)
    setAnchorEl(null)
  }
  const handleToggleLevel = (value: string) => {
    const currentIndex = checkedLevelIds.findIndex(id => id === value)
    const newChecked = [...checkedLevelIds]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setCheckedLevelIds(newChecked)
  }
  const handleToggleCategory = (value: string) => {
    const currentIndex = checkedCategoryIds.findIndex(id => id === value)
    const newChecked = [...checkedCategoryIds]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setCheckedCategoryIds(newChecked)
  }
  const handleClearFilter = () => {
    setCheckedCategoryIds([])
    setCheckedLevelIds([])
    setSortBy(SortCourseByData[0])
  }

  const setUpPage = async () => {
    const levels = await getLevels()
    const categories = await getCategories()
    setListLevels([...levels])
    setListCategories([...categories])
  }
  const getCourse = async () => {
    const bodyRequest: GetCoursesBySearchRequest = {
      categories: checkedCategoryIds,
      levels: checkedLevelIds,
      search: 'Course',
      sortField: sortBy.value.sortField,
      pageOptions: {
        order: sortBy.value.order,
        page,
        take: 4,
      },
    }
    const dataResponse = await getCoursesBySearch(bodyRequest)
    setListCourses([...dataResponse.data])
    setPageCount(dataResponse.meta.pageCount)
    setCourseCounts(dataResponse.meta.itemCount)
  }

  useEffect(() => {
    setUpPage()
  }, [])

  useEffect(() => {
    getCourse()
  }, [checkedLevelIds, checkedCategoryIds, sortBy, page])

  console.log('[checked]', checkedLevelIds, checkedCategoryIds, sortBy, page)

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        {courseCounts} kết quả cho từ khóa &quot;{'Search'}&ldquo;
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
            <Typography sx={{ fontSize: '16px', color: 'black' }}>{sortBy.text}</Typography>
          </Box>
        </Button>
        <Button
          sx={{ color: 'black', fontWeight: 'bold', textTransform: 'capitalize' }}
          onClick={handleClearFilter}
        >
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
        {SortCourseByData.map(data => (
          <MenuItem
            key={data.key}
            selected={data.key === sortBy.key}
            onClick={event => handleMenuItemClick(event, data)}
          >
            {data.text}
          </MenuItem>
        ))}
      </Menu>
      <Box maxWidth="lg" sx={{ display: 'flex', padding: '0' }}>
        <Box sx={{ width: '30%', paddingRight: '20px' }}>
          <CourseFilterAccordion
            title="Cấp độ"
            checkedList={checkedLevelIds}
            listData={listLevels}
            handleToggle={handleToggleLevel}
          />
          <CourseFilterAccordion
            title="Thể loại"
            checkedList={checkedCategoryIds}
            listData={listCategories}
            handleToggle={handleToggleCategory}
          />
        </Box>
        <Box sx={{ width: '70%', display: 'block' }}>
          {listCourses.map(course => (
            <CousreBoughtCardView key={course.id} course={course} />
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Stack spacing={2}>
          <Pagination count={pageCount} page={page} onChange={handleChange} color="secondary" />
        </Stack>
      </Box>
    </Container>
  )
}
