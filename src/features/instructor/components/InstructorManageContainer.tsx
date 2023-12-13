import { Container } from '@mui/material'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'

import TabsListInstructor from './TabsListInstructor'

const InstructorManageContainer = () => (
  <Container maxWidth="lg">
    <LayoutBodyContainer title="Danh sách giảng viên" introduction="">
      <TabsListInstructor />
    </LayoutBodyContainer>
  </Container>
)

export default InstructorManageContainer
