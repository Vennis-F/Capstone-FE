/* eslint-disable @typescript-eslint/indent */
import { AddOutlined } from '@material-ui/icons'
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

interface Props {
  course: CourseFullInfor
  isEditable: boolean
}

const InstructorCurriculumEdit = ({ course, isEditable }: Props) => {
  const [chapterLectures, setChapterLectures] = useState<ChapterLecture[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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

  // console.log()

  return (
    <LayoutBodyContainer
      title="Chương trình giảng dậy"
      introduction="Chương trình giảng dạy đóng vai trò quan trọng trong việc thu hút học viên và xây dựng uy tín cho bạn trên nền tảng này. Chúng tôi khuyến khích bạn xây dựng một chương trình với ít nhất 6 bài giảng. Trong khoảng từ 6 đến 10 bài, học viên được xem trước 1 bài giảng để có cái nhìn sơ bộ về nội dung. Nếu chương trình có hơn 10 bài giảng, chỉ tối đa 2 bài được xem trước. Mỗi bài giảng cần phải có video định dạng MP4 để nội dung trở nên sinh động hơn. Video sẽ giúp học viên tiếp cận thông tin một cách sinh động và dễ hiểu, tăng cường trải nghiệm học tập và giữ chân họ trong quá trình học"
    >
      <Box padding="30px">
        {isEditable ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <DroppableList chapterLectures={chapterLectures} />
          </DragDropContext>
        ) : (
          <DragDropContext onDragEnd={() => {}}>
            <DroppableList chapterLectures={chapterLectures} />
          </DragDropContext>
        )}

        {isEditable && (
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
              courseId: course.id,
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
    </LayoutBodyContainer>
  )
}

export default InstructorCurriculumEdit
