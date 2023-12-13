import { Box, Divider, Paper, Typography } from '@mui/material'
import React from 'react'

type Props = {
  title: string
  introduction?: React.ReactNode
  children?: React.ReactNode
  isPadding?: boolean
}

const LayoutBodyContainer = (props: Props) => (
  <>
    <Paper elevation={5} sx={{ marginBottom: '40px' }}>
      <Box padding="30px">
        <Typography variant="h5" fontWeight="bold">
          {props.title}
        </Typography>
      </Box>
      <Divider />
      {props.isPadding !== undefined && props.isPadding ? (
        <Box padding="30px">
          {props.introduction && (
            <Typography paragraph color="#6b7280">
              {props.introduction}
            </Typography>
          )}
          {props.children}
        </Box>
      ) : (
        <Box>
          {props.introduction && (
            <Typography paragraph color="#6b7280">
              {props.introduction}
            </Typography>
          )}
          {props.children}
        </Box>
      )}
    </Paper>
  </>
)

export default LayoutBodyContainer
