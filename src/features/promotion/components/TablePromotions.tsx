import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'

import { Promotion } from '../types'

interface Props {
  promotions: Promotion[]
  onDeletePromotion: (promotion: Promotion) => void
  onUpdatePromotion: (promotion: Promotion) => void
  onWatchPromotionCourses: (id: string) => void
}

const TablePromotions = ({
  promotions,
  onDeletePromotion,
  onUpdatePromotion,
  onWatchPromotionCourses,
}: Props) => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 130, sortable: false, filterable: false },
    { field: 'title', headerName: 'Tiêu đề', width: 200 },
    { field: 'discountPercent', headerName: 'Phần trăm', width: 120 },
    // { field: 'note', headerName: 'Ghi chú', width: 250 },
    {
      field: 'effectiveDate',
      headerName: 'Ngày có hiệu lực',
      width: 200,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.effectiveDate),
    },
    {
      field: 'expiredDate',
      headerName: 'Ngày hết hiệu lực',
      width: 200,
      type: 'dateTime',
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.expiredDate),
    },
    { headerName: 'Mã', field: 'code', width: 120 },
    { headerName: 'Số lượng', field: 'amount', width: 120 },
    // {
    //   field: 'active',
    //   headerName: 'Hoạt động',
    //   type: 'boolean',
    //   width: 150,
    // },
    {
      field: '',
      headerName: 'Hành động',
      description: 'Xóa cấp độ',
      width: 340,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => onUpdatePromotion(params.row)} // Thay handleDelete bằng hàm xử lý sự kiện delete
            sx={{ marginRight: '10px' }}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => onWatchPromotionCourses(params.row.id)} // Thay handleDelete bằng hàm xử lý sự kiện delete
            sx={{ marginRight: '10px' }}
          >
            Khóa học giảm
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDeletePromotion(params.row)} // Thay handleDelete bằng hàm xử lý sự kiện delete
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
        rows={promotions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [
              {
                field: 'updatedDate',
                sort: 'desc',
              },
            ],
          },
        }}
        pageSizeOptions={[10, 15]}
        // onCellEditStop={data => console.log(data)}
        onProcessRowUpdateError={error => console.log(error)}
        density="comfortable"
      />
    </div>
  )
}

export default TablePromotions
