import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'

import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastSuccess } from 'libs/utils/handle-toast'

import { deletePromotionCourse, updatePromotionCourseIsViewOfInstructor } from '../api'
import { PromotionCourse } from '../types'

interface Props {
  promotionCourses: PromotionCourse[]
  onPrepare: () => Promise<void>
}

const TablePromotionCourses = ({ promotionCourses, onPrepare }: Props) => {
  const handleDeletePromotionCourse = async (id: string) => {
    try {
      await deletePromotionCourse(id)
      onPrepare()
    } catch (error) {
      showErrorResponseSaga({ error, defaultMessage: 'Không thể xóa khóa được giảm giá' })
    }
  }

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 130, sortable: false, filterable: false },
    {
      field: 'course_title',
      headerName: 'Tên khóa học',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => params.row.course.title,
    },
    { field: 'used', headerName: 'Số lần sử dụng', width: 120 },
    // { field: 'note', headerName: 'Ghi chú', width: 250 },
    {
      field: 'isView',
      headerName: 'Có được xem trên giao diện trang chủ',
      type: 'boolean',
      width: 300,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 150,
    },
    {
      field: '',
      headerName: 'Hành động',
      description: 'Xóa cấp độ',
      width: 310,
      renderCell: (params: GridRenderCellParams) => (
        // renderCell: () => (
        <div>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeletePromotionCourse(params.row.id)} // Thay handleDelete bằng hàm xử lý sự kiện delete
          >
            Xóa
          </Button>
          {/* <Button
            variant="contained"
            color="info"
            size="small"
            sx={{ marginLeft: '20px' }}
            // onClick={() => onUpdatePromotion(params.row)} // Thay handleDelete bằng hàm xử lý sự kiện delete
          >
            Chỉnh sửa
          </Button> */}
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ]

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={promotionCourses}
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
        processRowUpdate={async (newDataRow, oldDataRow) => {
          const newIsView = newDataRow.isView
          if (newIsView === oldDataRow.isView) return newDataRow

          try {
            await updatePromotionCourseIsViewOfInstructor({
              promotionCourseId: newDataRow.id,
              isView: newIsView,
            })
            toastSuccess({ message: 'Cập nhật được xem trên trang chủ thành công' })
            return newDataRow
          } catch (error) {
            showErrorResponseSaga({
              error,
              defaultMessage: 'Cập nhật được xem trên trang chủ không thành công',
            })
            return oldDataRow
          }
        }}
        onProcessRowUpdateError={error => console.log(error)}
        density="comfortable"
      />
    </div>
  )
}

export default TablePromotionCourses
