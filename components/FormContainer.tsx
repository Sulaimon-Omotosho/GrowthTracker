import db from '@/prisma/db'
import { FormModalProps } from '@/types'
import React from 'react'
import FormModal from './FormModal'

const FormContainer = async ({ table, type, data, id }: FormModalProps) => {
  let relatedData = {}

  if (type !== 'delete') {
    switch (table) {
      case 'cell':
        const cell = await db.cell.findMany({
          select: { id: true, name: true },
        })
        relatedData = { cell: cell }
        break
    }
  }

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
        districts={{
          name: '',
          id: '',
        }}
      />
    </div>
  )
}

export default FormContainer
