import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

import { getInstructorsByAdmin } from '../api'
import { InstructorFilterResponse, InstructorStatus } from '../types'

import EditInstructorDialogForm from './EditInstructorDialogForm'
import TableInstructorsRejected from './TableInstructorsRejected'

const ManageRejectedInstructor = () => {
  const [instructors, setInstructors] = useState<InstructorFilterResponse[]>([])
  const [currentInstructor, setCurrentInstructor] = useState<InstructorFilterResponse | null>(null)
  const [isOpenForm, setIsOpenForm] = useState(false)

  const fetchInstructors = async () => {
    try {
      const fetchedInstructors = await getInstructorsByAdmin(InstructorStatus.Reject)
      setInstructors(fetchedInstructors)
    } catch (error) {
      console.error('Error fetching Instructors:', error)
    }
  }

  useEffect(() => {
    fetchInstructors()
  }, [])

  return (
    <Box>
      <TableInstructorsRejected
        instructors={instructors}
        onEditRow={instructorId => {
          const instructor = instructors.find(
            currInstructor => currInstructor.id === instructorId,
          ) as InstructorFilterResponse
          setCurrentInstructor(instructor)
          setIsOpenForm(true)
        }}
      />

      {currentInstructor && (
        <EditInstructorDialogForm
          defaultValues={currentInstructor}
          openDialog={isOpenForm}
          // isLoading={isLoading}
          handleOpenDialog={() => setIsOpenForm(true)}
          handleCloseDialog={() => setIsOpenForm(false)}
        />
      )}
    </Box>
  )
}

export default ManageRejectedInstructor
