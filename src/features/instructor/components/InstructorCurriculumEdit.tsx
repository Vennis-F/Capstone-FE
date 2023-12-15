/* eslint-disable @typescript-eslint/indent */
import { AddOutlined } from '@material-ui/icons'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Box, Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import { CreateChapterLectureDialogForm } from 'features/chapter-lecture/components/CreateChapterLectureDialogForm'
import { ChapterLecture } from 'features/chapter-lecture/types'
import { CourseFullInfor } from 'features/courses/types'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import {
  changeIndexChapterLecture,
  createChapterLecture,
  getChapterLecturesByCourseId,
} from '../../chapter-lecture/api/index'

import DroppableList from './DroppableList'
import RequirementCurriculumnDialog from './RequirementCurriculumnDialog'

interface Props {
  course: CourseFullInfor
  isEditable: boolean
}

const InstructorCurriculumEdit = ({ course, isEditable }: Props) => {
  const [chapterLectures, setChapterLectures] = useState<ChapterLecture[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openRequirement, setOpenRequirement] = useState(false)

  const handleGetChapterLecturesByCourseId = useCallback(async () => {
    const chapterLecturesRes = await getChapterLecturesByCourseId(course.id, true)
    const sortedArray = chapterLecturesRes.sort((a, b) => a.index - b.index)
    setChapterLectures(sortedArray)
  }, [])

  const handleDragEnd = async (result: DropResult) => {
    if (result.source.index === result.destination?.index) return

    const { index } = result.source
    const newArr = chapterLectures.filter(
      chapterLecture => chapterLecture.id !== result.draggableId,
    )
    const isGreater = index > (result.destination as DraggableLocation).index
    const desChapterLecture = chapterLectures[(result.destination as DraggableLocation).index]
    const desIndex = newArr.findIndex(chapterLecture => desChapterLecture.id === chapterLecture.id)
    const firstHalf = newArr.slice(0, isGreater ? desIndex : desIndex + 1)
    const leftHalf = newArr.slice(isGreater ? desIndex : desIndex + 1)

    await changeIndexChapterLecture({
      chapterLectureIds: [...firstHalf, chapterLectures[index], ...leftHalf].map(
        chapterLecture => chapterLecture.id,
      ),
    })
    handleGetChapterLecturesByCourseId()
  }

  useEffect(() => {
    handleGetChapterLecturesByCourseId()
  }, [handleGetChapterLecturesByCourseId])

  return (
    <LayoutBodyContainer title="Chương trình giảng dạy" isPadding={true}>
      <Button
        variant="text"
        onClick={() => setOpenRequirement(true)}
        sx={{ textTransform: 'capitalize', color: '#ef4444' }}
      >
        <RocketLaunchIcon sx={{ marginRight: '5px' }} /> Lưu ý quan trọng khi tạo các bài giảng
      </Button>

      {isEditable && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            sx={{
              color: 'black',
              border: '2px solid black',
              borderRadius: 0,
              ':hover': { border: '2px solid black' },
              marginTop: '30px',
            }}
            onClick={() => setOpenDialog(true)}
          >
            <AddOutlined /> Bài giảng
          </Button>
        </Box>
      )}

      <Box padding="30px">
        {isEditable ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <DroppableList
              chapterLectures={chapterLectures}
              handleGetChapterLecturesByCourseId={handleGetChapterLecturesByCourseId}
              isEditable={isEditable}
              courseStatus={course.status}
            />
          </DragDropContext>
        ) : (
          <DragDropContext onDragEnd={() => {}}>
            <DroppableList
              chapterLectures={chapterLectures}
              handleGetChapterLecturesByCourseId={handleGetChapterLecturesByCourseId}
              isEditable={isEditable}
              courseStatus={course.status}
            />
          </DragDropContext>
        )}
      </Box>

      <CreateChapterLectureDialogForm
        type="create"
        onSubmitClick={async (data, reset) => {
          try {
            setIsLoading(true)
            await createChapterLecture({
              title: data.title,
              description: data.description,
              courseId: course.id,
              index: chapterLectures.length + 1,
            })
            reset()
            toastSuccess({ message: 'Tạo bài giảng mới thành công' })
            handleGetChapterLecturesByCourseId()
            setOpenDialog(false)
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không tạo bài giảng mới được', error })
          }
          setIsLoading(false)
        }}
        openDialog={openDialog}
        handleOpenDialog={() => setOpenDialog(true)}
        handleCloseDialog={() => setOpenDialog(false)}
        isLoading={isLoading}
      />

      <RequirementCurriculumnDialog
        openDialog={openRequirement}
        handleCloseDialog={() => setOpenRequirement(false)}
      />
    </LayoutBodyContainer>
  )
}

export default InstructorCurriculumEdit
