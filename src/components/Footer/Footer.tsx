import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PaletteIcon from '@mui/icons-material/Palette'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, Container, Typography, Link, Divider } from '@mui/material'
import React from 'react'

const Copyright = () => (
  <Typography variant="body2" color="text.secondary">
    {'Copyright © '}
    <Link color="inherit" href="https://capstone-40kqzzr0x-vennis-f.vercel.app/">
      Drawing platform
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
)

const Footer = () => {
  console.log(134)
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        // mt: 'auto',
        marginTop: 'auto',
        backgroundColor: '#19A7CE',
        width: '100%',
        // position: 'fixed',
        // bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#B0DAFF',
          }}
        >
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center' }}>
            <PaletteIcon sx={{ marginRight: '2px' }} /> Drawing Platform
          </Typography>
        </Box>
        <Divider sx={{ color: 'gray', my: '8px' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Copyright />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#B0DAFF',
              width: '150px',
            }}
          >
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <LinkedInIcon />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
export default Footer
