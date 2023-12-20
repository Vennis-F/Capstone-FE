/* eslint-disable @typescript-eslint/no-unused-vars */
import AddIcon from '@mui/icons-material/Add'
import { Box, Container, Dialog, DialogContent, DialogTitle, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'

import LayoutBodyContainer from 'components/Layout/LayoutBodyContainer'
import TableCustomerDrawings from 'features/customer-drawing/components/TableCustomerDrawings'
import CustomButton from 'libs/ui/components/CustomButton'
import DialogBinaryQuestion from 'libs/ui/components/DialogBinaryQuestion'
import { getDateWithPlus1Year } from 'libs/utils/handle-date'
import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import {
  createContestByStaff,
  definePromotionForWinner,
  deleteContestByStaff,
  getContestsByStaff,
  updateContestByStaff,
  updateContestThumbnailByStaff,
} from '../api'
import { Contest, ContestStatus } from '../types'

import ContestWinnerTableDialog from './ContestWinnerTableDialog'
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
  const [currentContestDelete, setCurrentContestDelete] = useState<string | null>(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [currentContestWinner, setCurrentContestWinner] = useState<Contest | null>(null)

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
          onDeleteRow={contestId => {
            setCurrentContestDelete(contestId)
          }}
          onWinnerContest={contest => {
            setCurrentContestWinner(contest)
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
            discountPercentFirst:
              currentContest.winners.find(winner => winner.position === 1)?.promotion
                .discountPercent || 50,
            discountPercentSecond:
              currentContest.winners.find(winner => winner.position === 2)?.promotion
                .discountPercent || 40,
            discountPercentThird:
              currentContest.winners.find(winner => winner.position === 3)?.promotion
                .discountPercent || 30,
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
                discountPercentFirst: data.discountPercentFirst,
                discountPercentSecond: data.discountPercentSecond,
                discountPercentThird: data.discountPercentThird,
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
          discountPercentSecond: 40,
          discountPercentThird: 30,
          isVisible: true,
        }}
        onSubmitClick={async (data, file, reset) => {
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
                effectiveDateFirst: data.expiredDate,
                effectiveDateSecond: data.expiredDate,
                effectiveDateThird: data.expiredDate,
                expiredDateFirst: getDateWithPlus1Year(data.expiredDate),
                expiredDateSecond: getDateWithPlus1Year(data.expiredDate),
                expiredDateThird: getDateWithPlus1Year(data.expiredDate),
              },
              contest.id,
            )

            const formData = new FormData()
            formData.append('file', file)
            await updateContestThumbnailByStaff(contest.id, formData)

            reset()
            fetchContests(2)
            setValue(2)
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
          maxWidth="xl"
        >
          <DialogTitle>Danh sách chi tiết các bài vẽ</DialogTitle>
          <DialogContent sx={{ height: 800 }}>
            <TableCustomerDrawings
              contestId={currentContestNeedApprove}
              contest={
                contests.find(
                  currContest => currContest.id === currentContestNeedApprove,
                ) as Contest
              }
            />
          </DialogContent>
        </Dialog>
      )}

      {currentContestDelete && (
        <DialogBinaryQuestion
          open={Boolean(currentContestDelete)}
          isLoading={loadingDelete}
          titleText="Xóa cuộc thi"
          contentText="Bạn có chắc muốn xóa cuộc thi này?"
          clickAcceptAction={async () => {
            setLoadingDelete(true)
            try {
              await deleteContestByStaff(currentContestDelete)
            } catch (error) {
              showErrorResponseSaga({ error, defaultMessage: 'Xóa cuộc thi không thành công' })
            }

            fetchContests(value)
            setValue(value)
            setLoadingDelete(false)
            setCurrentContestDelete(null)
          }}
          clickCloseModal={() => setCurrentContestDelete(null)}
        />
      )}

      {currentContestWinner && (
        <ContestWinnerTableDialog
          contest={currentContestWinner}
          openDialog={Boolean(currentContestWinner)}
          handleCloseDialog={() => setCurrentContestWinner(null)}
        />
      )}
    </Container>
  )
}

export default ContestManageContainer
