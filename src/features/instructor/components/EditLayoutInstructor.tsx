import { Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react'

type Props = {
  title: string
  introduction: React.ReactNode
  children?: React.ReactNode
}

const EditLayoutInstructor = (props: Props) => (
  <>
    <Paper elevation={5}>
      <Box padding="30px">
        <Typography variant="h5" fontWeight="bold">
          {props.title}
        </Typography>
      </Box>
      <Divider />
      <Box padding="30px">
        <Typography paragraph color="#6b7280">
          {props.introduction}
        </Typography>
        {props.children}
      </Box>
    </Paper>
  </>
)

export default EditLayoutInstructor
