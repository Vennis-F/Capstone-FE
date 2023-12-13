import { List } from '@mui/material'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import { ChapterLecture } from 'features/chapter-lecture/types'
import { CourseStatus } from 'features/courses/types'

import DraggableListItem from './DraggableListItem'

interface Props {
  chapterLectures: ChapterLecture[]
  handleGetChapterLecturesByCourseId: () => Promise<void>
  isEditable: boolean
  courseStatus: CourseStatus
}

const DroppableList = ({
  chapterLectures,
  handleGetChapterLecturesByCourseId,
  isEditable,
  courseStatus,
}: Props) => (
  <Droppable droppableId="droppable" direction="vertical">
    {provided => (
      <List ref={provided.innerRef} {...provided.droppableProps}>
        {chapterLectures.map((chapterLecture, index) => (
          <DraggableListItem
            key={chapterLecture.id}
            chapterLecture={chapterLecture}
            index={index}
            handleGetChapterLecturesByCourseId={handleGetChapterLecturesByCourseId}
            isEditable={isEditable}
            courseStatus={courseStatus}
          />
        ))}
        {provided.placeholder}
      </List>
    )}
  </Droppable>
)

export default DroppableList
