import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'

import CustomTabPanel from 'libs/ui/custom-components/CustomTabPanel'

import OverviewCourse from './OverviewCourse'
import TabsListCommentContainer from './TabsListCommentContainer'

type Props = {
  courseId: string
}

const TabsChapterLectureLearn = ({ courseId }: Props) => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tổng quan" id="overview" />
          <Tab label="Câu hỏi" id="comment" className="fifth-step" />
          {/* <Tab label="Đánh giá" id="review" /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <OverviewCourse courseId={courseId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabsListCommentContainer />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  )
}

export default TabsChapterLectureLearn
