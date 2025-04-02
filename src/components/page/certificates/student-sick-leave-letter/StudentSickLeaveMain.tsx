import React from 'react'
import StudentSickLeave from './StudentSickLeave'
import { StudentSickLeaveRequest } from '@/lib/interface/request.interface'

const StudentSickLeaveMain = ({data , isAdmin} : {data ?: StudentSickLeaveRequest , isAdmin ?: boolean}) => {
  return (
    <div>
      <StudentSickLeave data={data} isAdmin={isAdmin}></StudentSickLeave>
    </div>
  )
}

export default StudentSickLeaveMain