import { ListItem } from '@material-ui/core'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { ChapterLecture } from 'features/chapter-lecture/types'

import InstructorEditChapterLecture from './InstructorEditChapterLecture'

interface Props {
  chapterLecture: ChapterLecture
  index: number
}

const DraggableListItem = ({ chapterLecture, index }: Props) => (
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
        <InstructorEditChapterLecture chapterLecture={chapterLecture} />
      </ListItem>
    )}
  </Draggable>
)

export default DraggableListItem
