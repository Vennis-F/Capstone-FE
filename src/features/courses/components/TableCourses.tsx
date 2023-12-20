/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  GridValueGetterParams,
} from '@mui/x-data-grid'
import RenderImage from 'material-ui-image'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getImage } from 'features/image/components/apis'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { updateCourseStatus } from '../api'
import { CourseFullInfor, CourseStatus, CourseStatusInfo, courseStatusInfors } from '../types'

interface Props {
  courses: CourseFullInfor[]
  onEditRow: (id: string) => void
  value: number
  fetchCourses: (value: number) => Promise<void>
}

const TableCourses = ({ courses, onEditRow, value, fetchCourses }: Props) => {
  const navigate = useNavigate()
  const [openBan, setOpenBan] = useState(false)
  const [reasonBan, setReasonBan] = useState('')
  const [courseBan, setCourseBan] = useState<CourseFullInfor | null>(null)
  const [loading, setLoading] = useState(false)

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Tiêu đề', width: 130 },
    // { field: 'price', headerName: 'Giá tiền', type: 'number', width: 130 },
    { field: 'totalChapter', headerName: 'Số lượng bài giảng', width: 130 },
    { field: 'totalBought', headerName: 'Số lượng mua', width: 130 },
    {
      field: 'user',
      headerName: 'Tác giả',
      description: 'Tên giáo viên',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => `${params.row.user.firstName}`,
    },
    {
      field: 'category',
      headerName: 'Thể loại',
      description: 'Tên thể loại',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => `${params.row.category.name}`,
    },
    {
      field: 'level',
      headerName: 'Cấp độ',
      description: 'Tên cấp độ',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => `${params.row.level.name}`,
    },
    {
      field: 'publishedDate',
      headerName: 'Ngày cập nhật',
      type: 'date',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.publishedDate),
    },
    { field: 'active', headerName: 'Kích hoạt', type: 'boolean', width: 130 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 170,
      renderCell: (params: GridRenderCellParams) => {
        const infor = courseStatusInfors.find(
          courseInfo => courseInfo.status === params.row.status,
        ) as CourseStatusInfo
        return (
          <Typography color={infor.color} fontWeight="bold">
            {infor.vietnamese}
          </Typography>
        )
      },
    },
    {
      field: '',
      headerName: 'Hành động',
      description: 'Hành động',
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          {params.row.status === CourseStatus.PENDING ? (
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => navigate(`/course/edit/${params.row.id}/manage/curriculumn`)} // Thay handleEdit bằng hàm xử lý sự kiện edit
              sx={{
                marginRight: '10px',
                backgroundColor: '#19a1d6',
                fontWeight: 'bold',
                textTransform: 'capitalize',
                ':hover': { backgroundColor: '#3b97bb' },
              }}
            >
              Phê duyệt
            </Button>
          ) : (
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={() => navigate(`/course/edit/${params.row.id}/manage/curriculumn`)} // Thay handleEdit bằng hàm xử lý sự kiện edit
              sx={{ marginRight: '10px' }}
            >
              Chi tiết
            </Button>
          )}
          {(params.row.status === CourseStatus.PENDING ||
            params.row.status === CourseStatus.APPROVED) && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => {
                setCourseBan(params.row)
                setOpenBan(true)
                setReasonBan('')
              }}
            >
              Cấm
            </Button>
          )}
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  const handleBan = async () => {
    if (reasonBan.trim() === '') return toastError({ message: 'Không được để trống lý do' })

    setLoading(true)
    await updateCourseStatus({
      courseId: courseBan?.id as string,
      status: CourseStatus.BANNED,
      reason: reasonBan,
    })

    toastSuccess({
      message: 'Đã cập nhật trạng thái thành công',
    })
    setLoading(false)
    setReasonBan('')
    setOpenBan(false)
    setCourseBan(null)
    fetchCourses(value)

    return null
  }

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={courses}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [
              {
                field: 'publishedDate',
                sort: 'desc',
              },
            ],
          },
        }}
        pageSizeOptions={[10, 15]}
        density="comfortable"
      />

      <Dialog
        open={openBan}
        onClose={() => {
          setOpenBan(false)
          setReasonBan('')
          setCourseBan(null)
        }}
      >
        <DialogTitle>Bạn có chắc cấm khóa học này không?</DialogTitle>
        <DialogContent>
          <DialogContentText>Ghi rõ lý do</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            multiline
            value={reasonBan}
            onChange={e => setReasonBan(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenBan(false)
              setReasonBan('')
              setCourseBan(null)
            }}
            disabled={loading}
          >
            Không
          </Button>
          <Button onClick={handleBan} disabled={loading}>
            {!loading ? 'Chấp nhận' : <CircularProgress size="26px" />}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TableCourses
