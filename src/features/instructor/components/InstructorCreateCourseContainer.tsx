import {
  Box,
  Stepper,
  Step,
  StepButton,
  Button,
  Paper,
  LinearProgress,
  Container,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getCategories } from 'features/category/api'
import { Category } from 'features/category/types'
import { getLevels } from 'features/level/api'
import { Level } from 'features/level/types'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { createCourseByInstructor } from '../api'

const steps = ['Tạo tiêu đề', 'Chọn thể loại', 'Chọn cấp độ']
const maxLength = 100

const InstructorCreateCourseContainer = () => {
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [levelId, setLevelId] = useState<string | null>(null)
  const [levels, setLevels] = useState<Level[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [btnLoading, setBtnLoading] = useState(false)

  const totalSteps = () => steps.length
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleChangeTitle = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const inputValue = event.target.value
    if (inputValue.length <= maxLength) {
      setTitle(inputValue)
    }
  }

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value as string)
  }

  const handleChangeLevel = (event: SelectChangeEvent) => {
    setLevelId(event.target.value as string)
  }

  const handleCreateCourse = async () => {
    try {
      setBtnLoading(true)
      if (!title || !categoryId || !levelId) {
        toastError({ message: 'Kiểm tra và hoàn thành đầy đủ thông tin' })
        setBtnLoading(false)
        return
      }
      await createCourseByInstructor({
        title,
        categoryId,
        levelId,
      })
      toastSuccess({ message: 'Tạo khóa học thành công' })
      setBtnLoading(false)
      navigate('/instructor/homepage')
    } catch (error) {
      console.log(error)
      showErrorResponseSaga({ defaultMessage: 'Tạo khóa học không thành công', error })
      setBtnLoading(false)
    }
  }

  const handlePrepare = useCallback(async () => {
    const levelsRes = await getLevels('true')
    const categoriesRes = await getCategories('true')
    setCategories(categoriesRes)
    setLevels(levelsRes)
    if (levelsRes.length > 0) setLevelId(levelsRes[0].id)
    if (categoriesRes.length > 0) setCategoryId(categoriesRes[0].id)
  }, [])

  const calcLinear = () => {
    if (activeStep === 0) return 33.33
    if (activeStep === 1) return 66.66
    return 100
  }

  useEffect(() => {
    handlePrepare()
  }, [handlePrepare])

  console.log(activeStep, levelId, levels, categoryId, title)

  return (
    <Box sx={{ width: '100%', marginTop: '-114px', backgroundColor: 'white', height: '94vh' }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}
        alternativeLabel
      >
        {steps.map(label => (
          <Step key={label}>
            <StepButton color="inherit" disabled>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <LinearProgress variant="determinate" value={calcLinear()} />
      <Container maxWidth="md">
        {activeStep === 0 && (
          <Box
            sx={{ padding: '50px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <TitleTypography title="Khóa học của bạn có tựa đề là gì?" />
            <TextField
              sx={{ marginTop: '50px' }}
              label="Tiêu đề"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleChangeTitle}
              inputProps={{
                maxLength,
              }}
              InputProps={{
                endAdornment: (
                  <p style={{ margin: '0', color: title.length > maxLength ? 'red' : 'inherit' }}>
                    {maxLength - title.length}
                  </p>
                ),
              }}
            />
          </Box>
        )}
        {activeStep === 1 && (
          <Box
            sx={{ padding: '50px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <TitleTypography title="Thể loại khóa học trẻ em của bạn là gì?" />
            {categoryId && (
              <Select
                value={categoryId}
                onChange={handleChangeCategory}
                fullWidth
                sx={{ marginTop: '50px' }}
              >
                {categories.map(category => (
                  <MenuItem value={category.id} key={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>
        )}
        {activeStep === 2 && (
          <Box
            sx={{ padding: '50px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
          >
            <TitleTypography title="Mức độ dành cho trẻ em là gì?" />
            {levelId && (
              <Select
                value={levelId}
                onChange={handleChangeLevel}
                fullWidth
                sx={{ marginTop: '50px' }}
              >
                {levels.map(level => (
                  <MenuItem value={level.id} key={level.id}>
                    {level.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>
        )}
      </Container>
      <div>
        <Paper
          sx={{ backgroundColor: 'white', position: 'absolute', width: '100%', bottom: 0 }}
          elevation={10}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Trước đó
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === totalSteps() - 1 && (
              <Button onClick={handleCreateCourse}>
                {!btnLoading ? 'Hoàn thành' : <CircularProgress size="26px" />}
              </Button>
            )}
            {activeStep !== totalSteps() - 1 && (
              <Button onClick={handleNext} disabled={activeStep === 0 && title.trim() === ''}>
                Tiếp theo
              </Button>
            )}
          </Box>
        </Paper>
      </div>
    </Box>
  )
}

export default InstructorCreateCourseContainer
