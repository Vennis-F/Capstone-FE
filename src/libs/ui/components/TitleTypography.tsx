import Typography from '@mui/material/Typography'
import React from 'react'

type PageTypographyProps = {
  title: string
}

const TitleTypography = (props: PageTypographyProps) => (
  <>
    <Typography variant="h4" sx={{ marginBottom: '20px', fontWeight: '600' }}>
      {props.title}
    </Typography>
  </>
)

export default TitleTypography
