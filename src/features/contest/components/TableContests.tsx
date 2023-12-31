/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/indent */
import { Button, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import RenderImage from 'material-ui-image'
import { useState } from 'react'

import { getImage } from 'features/image/components/apis'

import { Contest, ContestStatus, mapStatusToVietnamese, mapStatusToVietnameseColor } from '../types'

interface Props {
  contests: Contest[]
  onEditRow: (id: string) => void
  onDeleteRow: (id: string) => void
  onApproveContest: (id: string) => void
  onWinnerContest: (contest: Contest) => void
}

const TableContests = ({
  contests,
  onEditRow,
  onApproveContest,
  onDeleteRow,
  onWinnerContest,
}: Props) => {
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Tiêu đề', width: 130 },
    {
      field: 'startedDate',
      headerName: 'Thời gian bắt đầu',
      type: 'date',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.startedDate),
    },
    {
      field: 'expiredDate',
      headerName: 'Thời gian kết thúc',
      type: 'date',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.expiredDate),
    },
    {
      field: 'thumbnailUrl',
      headerName: 'Hình ảnh',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <RenderImage
          src={
            getImage(params.row.thumbnailUrl) ||
            'https://s.udemycdn.com/course/750x422/placeholder.jpg'
          }
          alt="Preview"
          style={{ height: '48px', width: '144px', padding: 0 }}
          imageStyle={{ height: '48px', width: '144px' }}
        />
      ),
      sortable: false,
      filterable: false,
    },
    { field: 'staffName', headerName: 'Người tạo', width: 130 },
    { field: 'totalCustomerDrawing', headerName: 'Số lượng tham gia', width: 160 },
    {
      field: 'isVisible',
      headerName: 'Phát hành',
      type: 'boolean',
      width: 130,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const statusInfor = mapStatusToVietnameseColor(params.row.status as ContestStatus)

        return (
          <Typography
            sx={{
              marginRight: '10px',
              color: statusInfor.color,
              textTransform: 'capitalize',
              fontWeight: 'bold',
            }}
          >
            {statusInfor.vietnam}
          </Typography>
        )
      },
    },
    {
      field: '',
      headerName: 'Hành động',
      description: 'Hành động',
      width: 500,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => onEditRow(params.row.id)} // Thay handleEdit bằng hàm xử lý sự kiện edit
            sx={{ marginRight: '10px' }}
          >
            Chi tiết
          </Button>
          {(params.row.status === ContestStatus.ACTIVE ||
            params.row.status === ContestStatus.EXPIRED) && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => onApproveContest(params.row.id)}
              sx={{ marginRight: '10px' }}
            >
              {params.row.status === ContestStatus.ACTIVE ? 'Xét duyệt bài vẽ' : 'Chi tiết bài vẽ'}
            </Button>
          )}
          {params.row.status === ContestStatus.EXPIRED && (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => onWinnerContest(params.row)} // Thay handleEdit bằng hàm xử lý sự kiện edit
              sx={{ marginRight: '10px' }}
            >
              Người chiến thắng
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDeleteRow(params.row.id)}
          >
            Xóa
          </Button>
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={contests}
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

export default TableContests
