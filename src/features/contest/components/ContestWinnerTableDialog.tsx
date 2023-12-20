import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'
import RenderImage from 'material-ui-image'
import React, { useEffect, useState } from 'react'

import { getImage } from 'features/image/components/apis'

import { getWinners } from '../api'
import { Contest, ViewWinner } from '../types'

type Props = {
  contest: Contest
  openDialog: boolean
  handleCloseDialog: () => void
}

const ContestWinnerTableDialog = ({ contest, openDialog, handleCloseDialog }: Props) => {
  const [winners, setWinners] = useState<ViewWinner[]>([])

  const handleGetWinners = async () => {
    const winnersRes = await getWinners(contest.id)
    setWinners(winnersRes)
  }
  const columns: GridColDef[] = [
    {
      field: 'winnerName',
      headerName: 'Tên',
      width: 250,
      valueGetter: (params: GridValueGetterParams) => params.row.winnerName,
    },
    { field: 'position', headerName: 'Vị trí', width: 200 },
    {
      field: 'title',
      headerName: 'Tiêu đề',
      width: 250,
      valueGetter: (params: GridValueGetterParams) => params.row.title,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      width: 250,
      valueGetter: (params: GridValueGetterParams) => params.row.description,
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
      field: 'totalVotes',
      headerName: 'Số lượng vote',
      width: 150,
      valueGetter: (params: GridValueGetterParams) => params.row.totalVotes,
    },
  ]

  useEffect(() => {
    handleGetWinners()
  }, [contest.id])

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xl" fullWidth={true}>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: '600', fontSize: '30px' }}>
        Danh sách người chiến thắng
      </DialogTitle>
      <DialogContent>
        <DataGrid
          rows={winners}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 15]}
          density="comfortable"
        />
      </DialogContent>
    </Dialog>
  )
}

export default ContestWinnerTableDialog
