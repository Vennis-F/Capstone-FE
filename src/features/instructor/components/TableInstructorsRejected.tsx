/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import RenderImage from 'material-ui-image'

import { getImage } from 'features/image/components/apis'
import { formatFullName } from 'libs/utils/handle-name'

import { InstructorFilterResponse, InstructorStatus } from '../types'

interface Props {
  instructors: InstructorFilterResponse[]
  onEditRow: (id: string) => void
}

const TableInstructorsRejected = ({ instructors, onEditRow }: Props) => {
  const columns: GridColDef[] = [
    {
      field: 'fullName',
      headerName: 'Họ và tên',
      width: 180,
      valueGetter: (params: GridValueGetterParams) => formatFullName(params.row),
    },
    { field: 'email', headerName: 'Email', width: 250 },
    // {
    //   field: 'avatar',
    //   headerName: 'Ảnh đại diện',
    //   width: 130,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <RenderImage
    //       src={getImage(params.row.avatar)}
    //       alt="Preview"
    //       style={{ height: '48px', width: '144px', padding: 0 }}
    //       imageStyle={{ height: '48px', width: '144px' }}
    //     />
    //   ),
    //   sortable: false,
    //   filterable: false,
    // },
    // {
    //   field: 'phoneNumber',
    //   headerName: 'Số điện thoại',
    //   width: 130,
    // },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 130,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
    },
    {
      field: 'action1',
      headerName: 'Hành động',
      description: 'Xem thông tin',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        const InstructorId = params.row.id
        return (
          <div>
            <Button
              variant="contained"
              color="info"
              size="small"
              onClick={() => onEditRow(params.row.id)}
              sx={{ marginRight: '10px' }}
            >
              Chi tiết
            </Button>
          </div>
        )
      },
      sortable: false,
      filterable: false,
    },
  ]

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={instructors}
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

export default TableInstructorsRejected
