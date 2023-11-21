import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import { Avatar, Container, Grid, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'

import CustomTabPanel from 'libs/ui/custom-components/CustomTabPanel'

// function a11yProps(index: number) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   }
// }

const TabsChapterLectureLearn = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Tổng quan" id="overview" />
          <Tab label="Câu hỏi" id="comment" />
          <Tab label="Đánh giá" id="review" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Container maxWidth="md">
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
                faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut
                est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean luctus ut est sed faucibus.
              </Typography>
              <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
            </Grid>
            <Grid item>
              <Box>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  1 <QuestionAnswerIcon />
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
                faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut
                est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean luctus ut est sed faucibus.
              </Typography>
              <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
            </Grid>
            <Grid item>
              <Box>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  1 <QuestionAnswerIcon />
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
                faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut
                est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean luctus ut est sed faucibus.
              </Typography>
              <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
            </Grid>
            <Grid item>
              <Box>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  1 <QuestionAnswerIcon />
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
                faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut
                est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean luctus ut est sed faucibus.
              </Typography>
              <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
            </Grid>
            <Grid item>
              <Box>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  1 <QuestionAnswerIcon />
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: 'left' }}>Michel Michel</h4>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut est sed
                faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus ut
                est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                luctus ut est sed faucibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean luctus ut est sed faucibus.
              </Typography>
              <p style={{ textAlign: 'left', color: 'gray' }}>posted 1 minute ago</p>
            </Grid>
            <Grid item>
              <Box>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  1 <QuestionAnswerIcon />
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  )
}

export default TabsChapterLectureLearn
