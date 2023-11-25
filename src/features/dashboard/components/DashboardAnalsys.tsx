import { Box, Container,} from '@mui/material';
import React from "react";

// interface DashboardProps {
//   userId: string;
// }

const DashboardAnalsys = () => (
  <Box>
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h2 className="title">Admin Dashboard</h2>
      </Box>
      <Box sx={{ width: 1200, height: 1000}}>
        <iframe 
          width="100%" 
          height="1000" 
          src="https://lookerstudio.google.com/embed/reporting/c1cab843-3e27-4ffa-83a8-355dd08503e3/page/p_zh15e9hnbd" 
          title="Admin Dashboard"
        ></iframe>
      </Box>
    </Container>
  </Box>
);

export default DashboardAnalsys;
