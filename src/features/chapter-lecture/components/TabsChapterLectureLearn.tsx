import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import DOMPurify from 'dompurify'
import Parser from 'html-react-parser'
import { useState } from 'react'

import CustomTabPanel from 'libs/ui/custom-components/CustomTabPanel'

import TabsListCommentContainer from './TabsListCommentContainer'

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   }
// }

const TabsChapterLectureLearn = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tổng quan" id="overview" />
          <Tab label="Câu hỏi" id="comment" />
          <Tab label="Đánh giá" id="review" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {Parser(DOMPurify.sanitize('23'))}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TabsListCommentContainer />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  )
}

export default TabsChapterLectureLearn
