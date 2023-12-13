import { ListItem } from '@mui/material'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { ChapterLecture } from 'features/chapter-lecture/types'
import { CourseStatus } from 'features/courses/types'

import InstructorEditChapterLecture from './InstructorEditChapterLecture'

interface Props {
  chapterLecture: ChapterLecture
  index: number
  handleGetChapterLecturesByCourseId: () => Promise<void>
  isEditable: boolean
  courseStatus: CourseStatus
}

const DraggableListItem = ({
  chapterLecture,
  index,
  handleGetChapterLecturesByCourseId,
  isEditable,
  courseStatus,
}: Props) => (
  <Draggable
    key={chapterLecture.id}
    draggableId={chapterLecture.id}
    index={index}
    shouldRespectForcePress
  >
    {provided => (
      <ListItem
        disableGutters
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <InstructorEditChapterLecture
          chapterLecture={chapterLecture}
          handleGetChapterLecturesByCourseId={handleGetChapterLecturesByCourseId}
          isEditable={isEditable}
          courseStatus={courseStatus}
        />
      </ListItem>
    )}
  </Draggable>
)

export default DraggableListItem
