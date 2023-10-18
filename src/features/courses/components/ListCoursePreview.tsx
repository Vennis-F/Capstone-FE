import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo'
import {
  Typography,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
/* eslint-disable */
type Props = {
  onClickPreview: () => void
}

const ListCoursePreview = ({ onClickPreview }: Props) => {
  const listCourseData = [
    {
      id: 1,
      title: 'DB transaction lock & How to handle deadlock in Golang',
      isPreview: true,
      totalContentLength: '30:29',
    },
    {
      id: 2,
      title: 'How to avoid deadlock in DB transaction? Queries order matters!',
      isPreview: true,
      totalContentLength: '03:00',
    },
    {
      id: 3,
      title: 'Deeply understand transaction isolation levels & read phenomena',
      isPreview: true,
      totalContentLength: '01:29',
    },
    {
      id: 4,
      title: 'Setup Github Actions for Golang + Postgres to run automated tests',
      isPreview: false,
      totalContentLength: '04:12',
    },
  ]

  return (
    <Accordion disableGutters={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          Danh sách bài giảng
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {listCourseData.map(chapterLecture => (
            <ListItem
              key={chapterLecture.id}
              disablePadding
              secondaryAction={
                <ListItemText>
                  {chapterLecture.isPreview && (
                    <Typography
                      component={'span'}
                      sx={{ textDecorationLine: 'underline', color: '#146C94' }}
                    >
                      Xem trước
                    </Typography>
                  )}
                  {` ${chapterLecture.totalContentLength}`}
                </ListItemText>
              }
            >
              {chapterLecture.isPreview ? (
                <ListItemButton role={undefined} dense onClick={onClickPreview}>
                  <ListItemIcon>
                    <OndemandVideoIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={chapterLecture.title}
                    sx={{ textDecorationLine: 'underline', color: '#146C94' }}
                  />
                </ListItemButton>
              ) : (
                <ListItemButton role={undefined} dense>
                  <ListItemIcon>
                    <OndemandVideoIcon />
                  </ListItemIcon>
                  <ListItemText primary={chapterLecture.title} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}

export default ListCoursePreview
