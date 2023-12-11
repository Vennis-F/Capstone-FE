/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import RenderImage from 'material-ui-image'
import { useEffect, useState } from 'react'

import { getImage } from 'features/image/components/apis'
import { OrderType } from 'types'

import {
  approveCustomerDrawingByStaff,
  getCustomerDrawingsByContest,
  getCustomerDrawingsByContestByStaff,
} from '../api'
import { CustomerDrawing, CustomerDrawingNotFilter, CustomerDrawingStatus } from '../types'

interface Props {
  contestId: string
}

const TableCustomerDrawings = ({ contestId }: Props) => {
  const [customerDrawings, setCustomerDrawings] = useState<CustomerDrawingNotFilter[]>([])

  const fetchCustomerDrawings = async () => {
    try {
      const res = await getCustomerDrawingsByContestByStaff(contestId)
      setCustomerDrawings(res)
    } catch (error) {
      console.error('Error fetching customer drawings:', error)
    }
  }

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Tiêu đề', width: 130 },
    { field: 'customerName', headerName: 'Tên người đăng', width: 130 },
    { field: 'description', headerName: 'Miêu tả', width: 130 },
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
    // {
    //   field: 'insertedDate',
    //   headerName: 'Ngày tạo',
    //   type: 'date',
    //   width: 130,
    //   valueGetter: (params: GridValueGetterParams) => new Date(params.row.insertedDate),
    // },

    {
      field: 'totalVotes',
      headerName: 'Số lượng vote',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.votes.length,
    },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 130,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      sortable: false,
    },
    {
      // field: 'u',
      field: '',
      headerName: 'Hành động',
      description: 'Cập nhật hoặc ẩn post',
      width: 250,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          {params.row.status === CustomerDrawingStatus.PENDING && (
            <>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={async () => {
                  await approveCustomerDrawingByStaff(params.row.id, CustomerDrawingStatus.APPROVED)
                  fetchCustomerDrawings()
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
                  await approveCustomerDrawingByStaff(params.row.id, CustomerDrawingStatus.REJECTED)
                  fetchCustomerDrawings()
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
                  fetchCustomerDrawings()
                }}
                sx={{ marginRight: '10px' }}
              >
                Ban
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
    fetchCustomerDrawings()
  }, [contestId])

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={customerDrawings}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        // checkboxSelection
        // sortModel={[
        //   {
        //     field: 'age',
        //     sort: 'asc', // Default sorting order for the 'age' column
        //   },
        // ]}
        // onSortModelChange={model => handleSortModelChange(model)}
        // onPaginationModelChange={model => handelPaginationModelChange(model)}
        // onFilterModelChange={model => console.log(model)}
        density="comfortable"
      />
    </div>
  )
}

export default TableCustomerDrawings
