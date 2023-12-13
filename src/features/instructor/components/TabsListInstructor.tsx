import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'

import CustomTabPanel from 'libs/ui/custom-components/CustomTabPanel'

import ManageApprovedInstructor from './ManageApprovedInstructor'
import ManagePendingInstructor from './ManagePendingInstructor'
import ManageRejectedInstructor from './ManageRejectedInstructor'

const TabsListInstructor = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Đã duyệt" id="pending" />
          <Tab label="Chờ xét duyệt" id="approved" />
          <Tab label="Bị từ chối" id="rejected" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ManageApprovedInstructor />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ManagePendingInstructor />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ManageRejectedInstructor />
      </CustomTabPanel>
    </Box>
  )
}

export default TabsListInstructor
