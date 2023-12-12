import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'

import { showErrorResponseSaga } from 'libs/utils/handle-saga-error'
import { toastError, toastSuccess } from 'libs/utils/handle-toast'

import { updateLevelByAdmin } from '../api'
import { Level } from '../types'

interface Props {
  levels: Level[]
  onDeleteLevel: (id: string) => void
}

const TableLevels = ({ levels, onDeleteLevel }: Props) => {
  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 130, sortable: false, filterable: false },
    { field: 'name', headerName: 'Tên cấp độ', width: 250, editable: true },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 250,
    },
    {
      field: 'insertedDate',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.insertedDate),
    },
    {
      field: 'updatedDate',
      headerName: 'Ngày cập nhật',
      type: 'date',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.updatedDate),
    },
    {
      field: '',
      headerName: 'Hành động',
      description: 'Xóa cấp độ',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDeleteLevel(params.row.id)} // Thay handleDelete bằng hàm xử lý sự kiện delete
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
        rows={levels}
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
        processRowUpdate={async (newDataRow, oldDataRow) => {
          const newName = newDataRow.name
          if (newName === oldDataRow.name) return newDataRow

          if (newName.trim().length === 0) {
            toastError({ message: 'Tiêu đề không được để trống' })
            return oldDataRow
          }

          try {
            await updateLevelByAdmin(newDataRow.id, {
              name: newName,
            })
            toastSuccess({ message: 'Cập nhật tiêu đề thành công' })
            return newDataRow
          } catch (error) {
            showErrorResponseSaga({ error, defaultMessage: 'Cập nhật tiêu đề không thành công' })
            return oldDataRow
          }
        }}
        onProcessRowUpdateError={error => console.log(error)}
        density="comfortable"
      />
    </div>
  )
}

export default TableLevels
