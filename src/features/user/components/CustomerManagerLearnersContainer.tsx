import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Paper,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { createLearner, getLearnersByUser } from 'features/learner/api'
import { LearnerFilterResponse } from 'features/learner/types'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { StyleSxProps } from 'types'

import { CustomerAddLearnerDialogForm } from './CustomerAddLearnerDialogForm'

const style: StyleSxProps = {
  container: {
    bgcolor: '#FFFFFF',
    padding: '20px',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: 'GrayText',
  },
  iconAdd: {
    fontSize: '40px',
    color: 'red',
  },
} as const

const CustomerManagerLearnersContainer = () => {
  const [learners, setLearners] = useState<LearnerFilterResponse[]>([])
  const [openAddLearnerDialog, setOpenAddLearnerDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClickOpen = () => {
    setOpenAddLearnerDialog(true)
  }

  const handleClose = () => {
    setOpenAddLearnerDialog(false)
  }

  const handleGetLearners = async () => {
    const learnersFilterResponse = await getLearnersByUser()
    setLearners(learnersFilterResponse)
  }

  useEffect(() => {
    handleGetLearners()
  }, [])

  return (
    <Paper sx={style.container}>
      <Typography sx={style.title}>Con của tôi</Typography>
      <List>
        {learners.map(learner => (
          <>
            <ListItem
              secondaryAction={
                <IconButton edge="end">
                  <ChevronRightIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src="https://images.unsplash.com/photo-1505628346881-b72b27e84530?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </ListItemAvatar>
              <ListItemText
                primary={`${learner.lastName} ${learner.middleName} ${learner.firstName}`}
              />
            </ListItem>
            <Divider />
          </>
        ))}
        {learners.length < 3 && (
          <ListItem
            secondaryAction={
              <IconButton edge="end">
                <ChevronRightIcon />
              </IconButton>
            }
          >
            <ListItemAvatar onClick={handleClickOpen}>
              <AddCircleRoundedIcon sx={style.iconAdd} />
            </ListItemAvatar>
            <ListItemText primary="Thêm hồ sơ khác" />
          </ListItem>
        )}
      </List>
      <CustomerAddLearnerDialogForm
        openDialog={openAddLearnerDialog}
        handleOpenDialog={handleClickOpen}
        handleCloseDialog={handleClose}
        onSubmitClick={async data => {
          try {
            setIsLoading(true)
            await createLearner(data)
            setIsLoading(false)
            toastSuccess({ message: 'Tạo tài khoản cho bé thành công' })
            handleClose()
            handleGetLearners()
          } catch (error) {
            showErrorResponseSaga({ error, defaultMessage: 'Tạo tài khoản không thành công' })
            setIsLoading(false)
            console.log(error)
          }
        }}
        isLoading={isLoading}
      />
    </Paper>
  )
}

export default CustomerManagerLearnersContainer
