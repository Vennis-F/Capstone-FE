import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Box, Container, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import CustomButton from 'libs/ui/components/CustomButton'

const InstrurctorSingupSuccessContainer = () => {
  const navigate = useNavigate()

  return (
    <Container
      sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}
    >
      <Grid container sx={{ width: '45%' }}>
        {/* Upper green box */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: '#8BC24A',
              height: '250px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional: add a shadow
              borderTopRightRadius: '10px',
              borderTopLeftRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ color: '#fff', marginTop: '40px', fontSize: '110px !important' }}
            />
            <Typography sx={{ fontSize: '24px', color: '#fff', marginTop: '10px' }}>
              ĐĂNG KÝ GIÁO VIÊN THÀNH CÔNG
            </Typography>
          </Box>
        </Grid>
        {/* Lower white box */}
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: 'white',
              padding: '30px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Optional: add a shadow
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography sx={{ color: '#7C7C7C', fontSize: '20px', textAlign: 'center' }}>
              Chúc mừng, bạn đã đăng ký thông tin thành công! Chúng tôi sẽ xét duyệt thông tin của
              bạn và thông báo qua email của bạn
            </Typography>
            <Box sx={{ width: '150px', marginTop: '20px' }}>
              <CustomButton
                onClick={() => navigate('/')}
                sxCustom={{
                  fontSize: '18px',
                  fontWeight: '400',
                  borderRadius: '40px',
                  backgroundColor: '#8BC24A',
                  ':hover': {
                    backgroundColor: '#6d9b39',
                  },
                }}
              >
                Trang chủ
              </CustomButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
export default InstrurctorSingupSuccessContainer
