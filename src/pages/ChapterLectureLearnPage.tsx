import React from 'react'
import { useParams } from 'react-router-dom'

import ChapterLectureLearnContainer from 'features/chapter-lecture/components/ChapterLectureLearnContainer'

const ChapterLectureLearnPage = () => {
  const { courseId } = useParams()

  return <ChapterLectureLearnContainer courseId={courseId as string} />
}

export default ChapterLectureLearnPage
