import { AddOutlined } from '@material-ui/icons'
import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd'

import { CreateChapterLectureDialogForm } from 'features/chapter-lecture/components/CreateChapterLectureDialogForm'
import { ChapterLecture } from 'features/chapter-lecture/types'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getUserRole } from 'libs/utils/handle-token'
import { UserRole } from 'types'

import {
  changeIndexChapterLecture,
  createChapterLecture,
  getChapterLecturesByCourseId,
} from '../../chapter-lecture/api/index'

import DroppableList from './DroppableList'

interface Props {
  courseId: string
}

const InstructorCurriculumEdit = ({ courseId }: Props) => {
  const [chapterLectures, setChapterLectures] = useState<ChapterLecture[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetChapterLecturesByCourseId = useCallback(async () => {
    const chapterLecturesRes = await getChapterLecturesByCourseId(courseId, true)
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
    <Paper elevation={5}>
      <Box padding="30px">
        <Typography variant="h5" fontWeight="bold">
          Chương trình giảng dậy
        </Typography>
      </Box>
      <Divider />
      <Box padding="30px">
        {getUserRole() === UserRole.INSTRUCTOR ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <DroppableList chapterLectures={chapterLectures} />
          </DragDropContext>
        ) : (
          <DragDropContext onDragEnd={() => {}}>
            <DroppableList chapterLectures={chapterLectures} />
          </DragDropContext>
        )}

        {getUserRole() === UserRole.INSTRUCTOR && (
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
        )}
      </Box>
      <CreateChapterLectureDialogForm
        onSubmitClick={async data => {
          try {
            setIsLoading(true)
            await createChapterLecture({
              title: data.title,
              description: data.description,
              courseId,
              index: chapterLectures.length + 1,
            })
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
    </Paper>
  )
}

export default InstructorCurriculumEdit