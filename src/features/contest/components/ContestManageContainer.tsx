/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Dialog, DialogContent, DialogTitle, Paper, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import TableCustomerDrawings from 'features/customer-drawing/components/TableCustomerDrawings'
import CustomButton from 'libs/ui/components/CustomButton'
import TitleTypography from 'libs/ui/components/TitleTypography'
import { getCurrentDateWithPlus1Year } from 'libs/utils/handle-date'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'
import { OrderType, PageOptions } from 'types'

import {
  createContestByStaff,
  definePromotionForWinner,
  getContestsByStaff,
  updateContestByStaff,
} from '../api'
import { Contest, ContestStatus } from '../types'

import CreateContestDialogForm from './CreateContestDialogForm'
import EditContestDialogForm from './EditContestDialogForm'
import TableContests from './TableContests'

const ContestManageContainer = () => {
  const [value, setValue] = useState(0)
  const [contests, setContests] = useState<Contest[]>([])
  const [currentContest, setCurrentContest] = useState<Contest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [isLoadingCreate, setIsLoadingCreate] = useState(false)
  const [isOpenFormCreate, setIsOpenFormCreate] = useState(false)
  const [currentContestNeedApprove, setCurrentContestNeedApprove] = useState<string | null>(null)

  const fetchContests = async (newValue: number) => {
    let status

    switch (newValue) {
      case 0:
        status = undefined
        break
      case 1:
        status = ContestStatus.ACTIVE
        break
      case 2:
        status = ContestStatus.PENDING
        break
      case 3:
        status = ContestStatus.EXPIRED
        break
      default:
        status = undefined
        break
    }

    try {
      const fetchedContests = await getContestsByStaff(status)
      setContests(fetchedContests)
    } catch (error) {
      console.error('Error fetching Contests:', error)
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    fetchContests(newValue)
  }

  useEffect(() => {
    fetchContests(0)
  }, [])

  return (
    <Container maxWidth="xl">
      <LayoutBodyContainer title="Cuộc thi" isPadding>
        <Box width="100%" textAlign="right" marginBottom="20px">
          <CustomButton
            onClick={() => {
              setIsOpenFormCreate(true)
            }}
            sxCustom={{
              width: '200px',
              textTransform: 'capitalize',
              padding: '10px 0px',
            }}
          >
            <AddIcon /> Tạo cuộc thi mới
          </CustomButton>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Tất cả" id="all" />
              <Tab label="Đang diễn ra" id="active" />
              <Tab label="Chưa diễn ra" id="pending" />
              <Tab label="Đã kết thúc" id="expired" />
            </Tabs>
          </Box>
        </Box>
        <TableContests
          contests={contests}
          onEditRow={contestId => {
            const currContest = contests.find(contest => contest.id === contestId) as Contest
            setCurrentContest(currContest)
            setIsOpenForm(true)
          }}
          onApproveContest={contestId => setCurrentContestNeedApprove(contestId)}
        />
      </LayoutBodyContainer>

      {currentContest && (
        <EditContestDialogForm
          defaultValues={{
            title: currentContest.title,
            prize: currentContest.prize,
            description: currentContest.description,
            startedDate: currentContest.startedDate,
            expiredDate: currentContest.expiredDate,
            isVisible: currentContest.isVisible,
          }}
          otherValues={{
            url: currentContest.thumbnailUrl,
            contestId: currentContest.id,
            contest: currentContest,
          }}
          onSubmitClick={async (data, reset) => {
            setIsLoadingCreate(true)
            try {
              await updateContestByStaff(currentContest.id, {
                title: data.title,
                description: data.description,
                prize: data.prize,
                startedDate: data.startedDate,
                expiredDate: data.expiredDate,
                isVisible: data.isVisible,
              })

              reset()
              fetchContests(value)
              setCurrentContest(null)
              toastSuccess({ message: 'Cập nhật cuộc thi thành công' })
            } catch (error) {
              showErrorResponseSaga({ defaultMessage: 'Cập nhật cuộc thi không thành công', error })
            }
            setIsLoadingCreate(false)
          }}
          openDialog={Boolean(currentContest)}
          isLoading={isLoadingCreate}
          handleCloseDialog={() => setCurrentContest(null)}
        />
      )}

      <CreateContestDialogForm
        defaultValues={{
          title: '',
          description: '',
          prize: '',
          startedDate: new Date().toUTCString(),
          expiredDate: new Date().toUTCString(),
          discountPercentFirst: 50,
          effectiveDateFirst: new Date().toUTCString(),
          expiredDateFirst: getCurrentDateWithPlus1Year(),
          discountPercentSecond: 40,
          effectiveDateSecond: new Date().toUTCString(),
          expiredDateSecond: getCurrentDateWithPlus1Year(),
          discountPercentThird: 30,
          effectiveDateThird: new Date().toUTCString(),
          expiredDateThird: getCurrentDateWithPlus1Year(),
          isVisible: true,
        }}
        onSubmitClick={async (data, reset) => {
          setIsLoadingCreate(true)
          try {
            const contest = await createContestByStaff({
              title: data.title,
              description: data.description,
              prize: data.prize,
              startedDate: data.startedDate,
              expiredDate: data.expiredDate,
              isVisible: data.isVisible,
            })

            await definePromotionForWinner(
              {
                discountPercentFirst: data.discountPercentFirst,
                discountPercentSecond: data.discountPercentSecond,
                discountPercentThird: data.discountPercentThird,
                effectiveDateFirst: data.effectiveDateFirst,
                effectiveDateSecond: data.effectiveDateSecond,
                effectiveDateThird: data.effectiveDateThird,
                expiredDateFirst: data.expiredDateFirst,
                expiredDateSecond: data.expiredDateSecond,
                expiredDateThird: data.expiredDateThird,
              },
              contest.id,
            )

            reset()
            fetchContests(0)
            setIsOpenFormCreate(false)
            toastSuccess({ message: 'Tạo cuộc thi mới thành công' })
          } catch (error) {
            showErrorResponseSaga({ defaultMessage: 'Không thể tạo cuộc thi mới', error })
          }
          setIsLoadingCreate(false)
        }}
        openDialog={isOpenFormCreate}
        isLoading={isLoadingCreate}
        handleOpenDialog={() => setIsOpenFormCreate(true)}
        handleCloseDialog={() => {
          setIsOpenFormCreate(false)
        }}
      />

      {currentContestNeedApprove && (
        <Dialog
          open={Boolean(currentContestNeedApprove)}
          onClose={() => {
            setCurrentContestNeedApprove(null)
          }}
          fullWidth={true}
          maxWidth="lg"
        >
          <DialogTitle>Danh sách chi tiết các bài vẽ</DialogTitle>
          <DialogContent>
            <TableCustomerDrawings contestId={currentContestNeedApprove} />
          </DialogContent>
        </Dialog>
      )}
    </Container>
  )
}

export default ContestManageContainer
