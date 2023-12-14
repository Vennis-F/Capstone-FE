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

import { PostFilterResponse } from '../types'

import EditPostForm from './EditPostDialogForm'

interface Props {
  posts: PostFilterResponse[]
  onEditRow: (id: string) => void
  onDeleteRow: (id: string) => void
}

const TablePosts = ({ posts, onEditRow, onDeleteRow }: Props) => {
  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Tiêu đề', width: 130 },
    { field: 'description', headerName: 'Miêu tả', width: 130 },
    {
      field: 'insertedDate',
      headerName: 'Ngày tạo',
      type: 'date',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.insertedDate),
    },
    {
      field: 'updatedDate',
      headerName: 'Ngày cập nhật',
      type: 'date',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => new Date(params.row.updatedDate),
    },
    {
      field: 'thumbnail',
      headerName: 'Hình ảnh',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <RenderImage
          src={
            getImage(params.row.thumbnail) ||
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
    {
      field: 'user',
      headerName: 'Tác giả',
      description: 'Tên người tạo ra',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => `${params.row.user.firstName}`,
    },
    {
      field: 'active',
      headerName: 'Hoạt động',
      type: 'boolean',
      width: 110,
      sortable: false,
    },
    {
      field: '',
      headerName: 'Hành động',
      description: 'Cập nhật hoặc ẩn post',
      width: 180,
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <Button
            variant="contained"
            color="info"
            size="small"
            onClick={() => onEditRow(params.row.id)} // Thay handleEdit bằng hàm xử lý sự kiện edit
            sx={{ marginRight: '10px' }}
          >
            Thay đổi
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDeleteRow(params.row.id)} // Thay handleDelete bằng hàm xử lý sự kiện delete
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
        rows={posts}
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

export default TablePosts
