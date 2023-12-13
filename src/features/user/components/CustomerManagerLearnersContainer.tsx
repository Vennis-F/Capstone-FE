import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import ArticleIcon from '@mui/icons-material/Article'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PasswordIcon from '@mui/icons-material/Password'
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

import { createLearner, getLearnersByUser, updateLearner } from 'features/learner/api'
import { LearnerFilterResponse } from 'features/learner/types'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { StyleSxProps } from 'types'

import { changePasswordLearner } from '../../learner/api/index'

import { CustomerAddLearnerDialogForm } from './CustomerAddLearnerDialogForm'
import CustomerChangeLearnerPasswordDialogForm from './CustomerChangeLearnerPasswordDialogForm'
import CustomerEditLearnerDialogForm from './CustomerEditLearnerDialogForm'
import { LearnerProgressDialog } from './LearnerProgressDialog'

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

  const [openEditLearnerDialog, setOpenEditLearnerDialog] = useState(false)
  const [currLearnerEdit, setCurrentLearnerEdit] = useState<LearnerFilterResponse | null>(null)
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)

  const [currLearnerEditPassword, setCurrentLearnerEditPassword] =
    useState<LearnerFilterResponse | null>(null)
  const [isLoadingEditPassword, setIsLoadingEditPassword] = useState(false)

  const [currProgressLearnerId, setCurrProgressLearner] = useState<string | null>()

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
    <Paper elevation={10} sx={{ padding: '40px', marginX: '50px' }}>
      <Typography variant="h5" fontWeight="bold" marginBottom="20px">
        Con của tôi
      </Typography>
      <List>
        {learners.map(learner => (
          <div key={learner.id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    edge="start"
                    onClick={() => {
                      setCurrProgressLearner(learner.id)
                    }}
                    sx={{ marginRight: '14px' }}
                  >
                    <ArticleIcon />
                  </IconButton>
                  <IconButton
                    edge="start"
                    onClick={() => {
                      setCurrentLearnerEditPassword(learner)
                    }}
                  >
                    <PasswordIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setCurrentLearnerEdit(learner)
                      setOpenEditLearnerDialog(true)
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </ListItemAvatar>
              <ListItemText
                primary={`${learner.lastName} ${learner.middleName} ${learner.firstName}`}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
        {learners.length < 3 && (
          <ListItem
            secondaryAction={
              <IconButton edge="end">
                <ChevronRightIcon />
              </IconButton>
            }
            sx={{ cursor: 'pointer' }}
            onClick={handleClickOpen}
          >
            <ListItemAvatar>
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
          setIsLoading(true)
          try {
            await createLearner(data)
            toastSuccess({ message: 'Tạo tài khoản cho bé thành công' })
            handleClose()
            handleGetLearners()
          } catch (error) {
            showErrorResponseSaga({ error, defaultMessage: 'Tạo tài khoản không thành công' })
            console.log(error)
          }
          setIsLoading(false)
        }}
        isLoading={isLoading}
      />

      {currProgressLearnerId && (
        <LearnerProgressDialog
          handleCloseDialog={() => {
            setCurrProgressLearner(null)
          }}
          learnerId={currProgressLearnerId}
          openDialog={Boolean(currProgressLearnerId)}
        />
      )}

      {currLearnerEdit && (
        <CustomerEditLearnerDialogForm
          openDialog={openEditLearnerDialog}
          // handleOpenDialog={handleClickOpen}
          handleCloseDialog={() => {
            setOpenEditLearnerDialog(false)
            setCurrentLearnerEdit(null)
          }}
          isLoading={isLoadingEdit}
          onSubmitClick={async data => {
            setIsLoadingEdit(true)
            try {
              await updateLearner({
                learnerId: currLearnerEdit.id,
                firstName: data.firstName,
                lastName: data.lastName,
                middleName: data.middleName,
                userName: data.userName,
              })
              toastSuccess({ message: 'Cập nhật tài khoản cho bé thành công' })
              setOpenEditLearnerDialog(false)
              setCurrentLearnerEdit(null)
              handleGetLearners()
            } catch (error) {
              showErrorResponseSaga({
                error,
                defaultMessage: 'Cập nhật tài khoản cho bé không thành công',
              })
              console.log(error)
            }
            setIsLoadingEdit(false)
          }}
          defaultValues={{
            firstName: currLearnerEdit.firstName,
            lastName: currLearnerEdit.lastName,
            middleName: currLearnerEdit.middleName,
            userName: currLearnerEdit.userName,
          }}
        />
      )}

      {currLearnerEditPassword && (
        <CustomerChangeLearnerPasswordDialogForm
          openDialog={Boolean(currLearnerEditPassword)}
          handleCloseDialog={() => {
            setCurrentLearnerEditPassword(null)
          }}
          isLoading={isLoadingEditPassword}
          onSubmitClick={async data => {
            setIsLoadingEditPassword(true)
            try {
              await changePasswordLearner({
                learnerId: currLearnerEditPassword.id,
                newPassword: data.newPassword,
                confirmNewPassword: data.confirmNewPassword,
              })
              toastSuccess({ message: 'Thay đổi mật khẩu tài khoản của bé thành công' })
              setCurrentLearnerEditPassword(null)
              handleGetLearners()
            } catch (error) {
              showErrorResponseSaga({
                error,
                defaultMessage: 'Cập nhật tài khoản cho bé không thành công',
              })
              console.log(error)
            }
            setIsLoadingEditPassword(false)
          }}
          defaultValues={{
            newPassword: '',
            confirmNewPassword: '',
          }}
        />
      )}
    </Paper>
  )
}

export default CustomerManagerLearnersContainer
