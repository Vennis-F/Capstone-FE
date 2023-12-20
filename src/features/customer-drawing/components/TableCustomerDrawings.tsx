/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable  @typescript-eslint/indent */
import { Box, Button, Tab, Tabs, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import RenderImage from 'material-ui-image'
import { useEffect, useState } from 'react'

import { Contest, ContestStatus } from 'features/contest/types'
import { getImage } from 'features/image/components/apis'
import { OrderType } from 'types'

import {
  approveCustomerDrawingByStaff,
  getCustomerDrawingsByContest,
  getCustomerDrawingsByContestByStaff,
} from '../api'
import {
  CustomerDrawing,
  CustomerDrawingNotFilter,
  CustomerDrawingStatus,
  convertCustomerDrawingStatus,
} from '../types'

interface Props {
  contestId: string
  contest: Contest
}

const TableCustomerDrawings = ({ contestId, contest }: Props) => {
  const [customerDrawings, setCustomerDrawings] = useState<CustomerDrawingNotFilter[]>([])
  const [value, setValue] = useState(0)

  const fetchCustomerDrawings = async (newValue: number) => {
    let status

    switch (newValue) {
      case 0:
        status = undefined
        break
      case 1:
        status = CustomerDrawingStatus.PENDING
        break
      case 2:
        status = CustomerDrawingStatus.APPROVED
        break
      case 3:
        status = CustomerDrawingStatus.REJECTED
        break
      case 4:
        status = CustomerDrawingStatus.BANNED
        break
      default:
        status = undefined
        break
    }
    try {
      const res = await getCustomerDrawingsByContestByStaff(contestId, status)
      setCustomerDrawings(res)
    } catch (error) {
      console.error('Error fetching customer drawings:', error)
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    fetchCustomerDrawings(newValue)
  }

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Tiêu đề', width: 130 },
    {
      field: 'customerName',
      headerName: 'Tên người đăng',
      width: 250,
      valueGetter: (params: GridValueGetterParams) => {
        const { user } = params.row
        if (user) {
          return `${user.lastName} ${user.middleName} ${user.firstName}`
        }
        return ''
      },
    },
    { field: 'description', headerName: 'Miêu tả', width: 200 },
    {
      field: 'imageUrl',
      headerName: 'Hình ảnh',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <RenderImage
          src={
            getImage(params.row.imageUrl) || 'https://s.udemycdn.com/course/750x422/placeholder.jpg'
          }
          alt="Preview"
          style={{ height: '48px', width: '144px', padding: 0 }}
          imageStyle={{ height: '48px', width: '144px' }}
        />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'insertedDate',
      headerName: 'Thời gian tham gia',
      width: 180,
      renderCell: (params: GridRenderCellParams) => {
        const date = new Date(params.row.insertedDate)
        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
        return formattedDate
      },
    },

    {
      field: 'totalVotes',
      headerName: 'Số lượng vote',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.votes.length,
    },
    // {
    //   field: 'active',
    //   headerName: 'Hoạt động',
    //   type: 'boolean',
    //   width: 130,
    //   sortable: false,
    // },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const status = convertCustomerDrawingStatus(params.row.status)

        return (
          <Typography sx={{ color: status.color, fontWeight: 'bold' }}>
            {status.vietnamse}
          </Typography>
        )
      },
    },
    {
      field: '',
      headerName: 'Hành động',
      description: 'Cập nhật hoặc ẩn post',
      width: 310,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          {params.row.status === CustomerDrawingStatus.PENDING &&
            contest.status === ContestStatus.ACTIVE && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={async () => {
                    await approveCustomerDrawingByStaff(
                      params.row.id,
                      CustomerDrawingStatus.APPROVED,
                    )
                    fetchCustomerDrawings(0)
                  }}
                  sx={{ marginRight: '10px' }}
                >
                  Chấp nhận
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  onClick={async () => {
                    await approveCustomerDrawingByStaff(
                      params.row.id,
                      CustomerDrawingStatus.REJECTED,
                    )
                    fetchCustomerDrawings(0)
                  }}
                  sx={{ marginRight: '10px' }}
                >
                  Từ chối
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={async () => {
                    await approveCustomerDrawingByStaff(params.row.id, CustomerDrawingStatus.BANNED)
                    fetchCustomerDrawings(0)
                  }}
                  sx={{ marginRight: '10px' }}
                >
                  Cấm
                </Button>
              </>
            )}
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  useEffect(() => {
    fetchCustomerDrawings(0)
  }, [contestId])

  return (
    <div style={{ height: 700, width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Tất cả" id="all" />
            <Tab label="Đang chờ" id="pending" />
            <Tab label="Được phê duyệt" id="approved" />
            <Tab label="Từ chối" id="rejected" />
            <Tab label="Cấm" id="banned" />
          </Tabs>
        </Box>
      </Box>
      <DataGrid
        rows={customerDrawings}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        density="comfortable"
      />
    </div>
  )
}

export default TableCustomerDrawings
