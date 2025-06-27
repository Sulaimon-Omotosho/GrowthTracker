import React from 'react'

const edit = () => {
  const onSubmit = handleSubmit((data) => {
    const formatted = {
      ...data,
      startTime: data.startTime?.toISOString(), // or just .toLocaleTimeString() if only time
      endTime: data.endTime?.toISOString(),
    }
    console.log(formatted)
  })
  return <div>edit</div>
}

export default edit
