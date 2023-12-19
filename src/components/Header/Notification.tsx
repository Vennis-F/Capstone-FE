/* eslint-disable @typescript-eslint/no-explicit-any */
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Badge, Grid, Menu, MenuItem, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getNotifications,
  onMessageListener,
  updateNotificationSeen,
} from 'features/notification/api'
import { NotificationResponse } from 'features/notification/types'
import { timeAgo } from 'libs/utils/handle-date'
import { toastSuccess } from 'libs/utils/handle-toast'
import { getUserInforOrNull, getUserRoleOrNull } from 'libs/utils/handle-token'
import { UserRole } from 'types'

// type Props = {}

const Notification = () => {
  const [notificationResponse, setNotificationResponse] = useState<NotificationResponse[]>([])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const handleSetNotifications = () => {
    getNotifications().then(payloadNotifications => {
      setNotificationResponse([...payloadNotifications])
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = async () => {
    const arrayPromises: Promise<any>[] = []
    notificationResponse.forEach(notification => {
      if (!notification.isSeen) {
        arrayPromises.push(updateNotificationSeen(notification.createdDate))
      }
    })

    await Promise.all(arrayPromises)
    handleSetNotifications()
    setAnchorEl(null)
  }

  const handleClickNotificationItem = (notificationRes: NotificationResponse) => {
    const { data } = notificationRes
    const currUserRole = getUserInforOrNull()
    if (currUserRole) {
      if (currUserRole.role === UserRole.CUSTOMER) {
        if (data.type === 'CUSTOMER-REFUND') {
          navigate('/user/refunds')
        }

        if (data.type === 'CUSTOMER-CUSTOMER_DRAWING') {
          navigate(`/contest/detail/${data.contestId}`)
        }

        if (data.type === 'WINNER-PRIZE') {
          navigate(`/contest/detail/${data.contestId}`)
        }
      }

      if (currUserRole.role === UserRole.STAFF) {
        if (data.type === 'STAFF-CUSTOMER_DRAWING') {
          navigate('/staff/manage/contest')
        }
      }

      if (currUserRole.role === UserRole.INSTRUCTOR) {
        if (data.type === 'INSTRUCTOR-PAYMENT') {
          navigate('/instructor/transaction')
        }
      }
      if (currUserRole.role === UserRole.ADMIN) {
        if (data.type === 'ADMIN-REFUND') {
          navigate('/admin/manage/refund-learner')
        }
        if (data.type === 'INSTRUCTOR-REGISTER') {
          navigate('/admin/manage/instructor')
        }
      }
    }

    handleClose()
  }

  onMessageListener()
    .then((payload: any) => {
      toastSuccess({ message: payload.notification.body })
      handleSetNotifications()
    })
    .catch(err => console.log('failed: ', err))

  useEffect(() => {
    if (getUserRoleOrNull()) {
      handleSetNotifications()
    }
  }, [])

  console.log(notificationResponse)

  return (
    <>
      <Badge
        badgeContent={notificationResponse.filter(noti => !noti.isSeen).length}
        color="primary"
        onClick={handleClick}
      >
        <NotificationsIcon
          sx={{
            color: getUserRoleOrNull() === UserRole.CUSTOMER ? 'white' : 'black',
            cursor: 'pointer',
          }}
        />
      </Badge>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '.MuiMenu-paper': {
            borderTop: '3px solid #047C8F',
            paddingX: 2,
          },
        }}
        anchorOrigin={{
          vertical: 45,
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {notificationResponse.length > 0 &&
          notificationResponse.map(currNotifcation => {
            console.log(123)

            return (
              <MenuItem
                sx={{
                  width: '530px',
                  whiteSpace: 'normal',
                  padding: '10px',
                  backgroundColor: !currNotifcation.isSeen ? '#D7E9FB' : undefined,
                  ':hover': { color: '#047C8F' },
                }}
                onClick={() => handleClickNotificationItem(currNotifcation)}
                key={currNotifcation.createdDate}
              >
                <Grid container width="100%">
                  <Grid item xs={10}>
                    <Typography fontWeight="bold" fontSize="14px">
                      {currNotifcation.title}
                    </Typography>
                    <Typography fontSize="14px">{currNotifcation.body}</Typography>
                  </Grid>
                  <Grid item xs={2} textAlign="right">
                    <Typography fontSize="14px">{timeAgo(currNotifcation.createdDate)}</Typography>
                  </Grid>
                </Grid>
              </MenuItem>
            )
          })}
        {notificationResponse.length <= 0 && (
          <MenuItem
            sx={{
              width: '200px',
              whiteSpace: 'normal',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Không có thông báo
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

export default Notification
