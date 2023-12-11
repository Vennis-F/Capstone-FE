import { List } from '@mui/material'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import { ChapterLecture } from 'features/chapter-lecture/types'

import DraggableListItem from './DraggableListItem'

interface Props {
  chapterLectures: ChapterLecture[]
}

const DroppableList = ({ chapterLectures }: Props) => (
  <Droppable droppableId="droppable" direction="vertical">
    {provided => (
      <List ref={provided.innerRef} {...provided.droppableProps}>
        {chapterLectures.map((chapterLecture, index) => (
          <DraggableListItem
            key={chapterLecture.id}
            chapterLecture={chapterLecture}
            index={index}
          />
        ))}
        {provided.placeholder}
      </List>
    )}
  </Droppable>
)

export default DroppableList
