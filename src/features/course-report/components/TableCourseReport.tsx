/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
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

import { getImage } from 'features/image/components/apis'

import { CourseReportFilterResponse } from '../types'

interface Props {
  courseReports: CourseReportFilterResponse[]
}

const TableCourseReport = ({ courseReports }: Props) => {
  const columns: GridColDef[] = [
    {
      field: 'course',
      headerName: 'Khóa học',
      description: 'Khóa học bị báo cáo',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => `${params.row.course.title}`,
    },
    { field: 'description', headerName: 'Miêu tả', width: 350 },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 200,
      sortable: false,
    },
    {
      field: 'insertedDate',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 200,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.insertedDate),
    },
    {
      field: '',
      headerName: 'Người báo cáo',
      description: 'Tên người báo cáo',
      width: 200,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.lastName} ${params.row.middleName} ${params.row.firstName}`,
    },
    // {
    //   // field: 'u',
    //   field: '',
    //   headerName: 'Hành động',
    //   description: 'Cập nhật hoặc ẩn post',
    //   width: 160,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <div>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         onClick={() => onEditRow(params.row.id)} // Thay handleEdit bằng hàm xử lý sự kiện edit
    //       >
    //         Edit
    //       </Button>
    //       <Button
    //         variant="contained"
    //         color="error"
    //         size="small"
    //         onClick={() => console.log(123)} // Thay handleDelete bằng hàm xử lý sự kiện delete
    //       >
    //         Delete
    //       </Button>
    //     </div>
    //   ),
    //   sortable: false,
    //   filterable: false,
    // },
  ]

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={courseReports}
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

export default TableCourseReport
