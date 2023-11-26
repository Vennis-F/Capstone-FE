import { Container } from '@mui/material'
import RenderImage from 'material-ui-image'
import React from 'react'

export const NotFound = () => (
  <Container maxWidth="md" sx={{ height: '90vh' }}>
    <RenderImage
      src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Preview"
      style={{ width: '100%', height: '100%', padding: 0 }}
      imageStyle={{ width: '100%', height: '100%' }}
    />
  </Container>
)
