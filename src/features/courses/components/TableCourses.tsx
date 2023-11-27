/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Typography } from '@mui/material'
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

import { CourseFullInfor, CourseStatus, CourseStatusInfo, courseStatusInfors } from '../types'

interface Props {
  courses: CourseFullInfor[]
  onEditRow: (id: string) => void
}

const TableCourses = ({ courses, onEditRow }: Props) => {
  const navigate = useNavigate()

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70, sortable: false, filterable: false },
    { field: 'title', headerName: 'Tiêu đề', width: 130 },
    // { field: 'price', headerName: 'Giá tiền', type: 'number', width: 130 },
    { field: 'totalChapter', headerName: 'Số lượng bài giảng', width: 130 },
    // {
    //   field: 'publishedDate',
    //   headerName: 'Ngày cập nhật',
    //   type: 'date',
    //   width: 130,
    //   valueGetter: (params: GridValueGetterParams) => new Date(params.row.publishedDate),
    // },
    { field: 'totalBought', headerName: 'Số lượng mua', width: 130 },
    // {
    //   field: 'thumbnailUrL',
    //   headerName: 'Hình ảnh',
    //   width: 130,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <RenderImage
    //       src={
    //         getImage(params.row.thumbnailUrl) ||
    //         'https://s.udemycdn.com/course/750x422/placeholder.jpg'
    //       }
    //       alt="Preview"
    //       style={{ height: '48px', width: '144px', padding: 0 }}
    //       imageStyle={{ height: '48px', width: '144px' }}
    //     />
    //   ),
    //   sortable: false,
    //   filterable: false,
    // },
    { field: 'active', headerName: 'Kích hoạt', type: 'boolean', width: 130 },
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
      description: 'Cập nhật hoặc ẩn post',
      width: 250,
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
              color="primary"
              size="small"
              onClick={() => navigate(`/course/edit/${params.row.id}/manage/curriculumn`)} // Thay handleEdit bằng hàm xử lý sự kiện edit
              sx={{ marginRight: '10px' }}
            >
              Chi tiết
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => console.log(123)} // Thay handleDelete bằng hàm xử lý sự kiện delete
          >
            Loại bỏ
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

export default TableCourses
