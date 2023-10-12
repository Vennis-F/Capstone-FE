import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionSummary,
  ListItem,
  ListItemButton,
  Typography,
  Checkbox,
  AccordionDetails,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

type Props = {
  title: string
  listData: {
    id: string
    name: string
    active: boolean
  }[]
  checkedList: string[]
  handleToggle: (id: string) => void
}

const CourseFilterAccordion = ({ title, listData, checkedList, handleToggle }: Props) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography variant="h5" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {listData.map(data => {
          const labelId = `checkbox-list-label-${data.id}`

          return (
            <ListItem key={data.id} disablePadding>
              <ListItemButton role={undefined} onClick={() => handleToggle(data.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checkedList.some(id => id === data.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={data.name} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </AccordionDetails>
  </Accordion>
)

export default CourseFilterAccordion
