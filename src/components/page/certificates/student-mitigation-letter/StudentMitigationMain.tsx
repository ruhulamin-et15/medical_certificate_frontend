import React from 'react'
import StudentMitigation from './StudentMitigation'
import { MitigationLetter } from '@/lib/interface/request.interface'

const StudentMitigationMain = ({data, isAdmin} : {data? : MitigationLetter, isAdmin? : boolean}) => {
  return (
    <div>
      <StudentMitigation data={data} isAdmin={isAdmin}
      ></StudentMitigation>
    </div>
  )
}

export default StudentMitigationMain