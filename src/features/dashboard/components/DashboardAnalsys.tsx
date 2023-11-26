import { Box, Container, Paper } from '@mui/material'
import React from 'react'

import TitleTypography from 'libs/ui/components/TitleTypography'

// interface DashboardProps {
//   userId: string;
// }

const DashboardAnalsys = () => (
  <Box>
    <Container maxWidth="lg">
      <TitleTypography title="Bảng điều khiển Admin" />
      <Paper elevation={10} sx={{ height: '155vh', marginBottom: '40px', borderRadius: '10px' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://lookerstudio.google.com/embed/reporting/c1cab843-3e27-4ffa-83a8-355dd08503e3/page/p_zh15e9hnbd"
          title="Admin Bảng điều khiển"
          style={{ border: 'none' }}
        ></iframe>
      </Paper>
    </Container>
  </Box>
)

export default DashboardAnalsys
