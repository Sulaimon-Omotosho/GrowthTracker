'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from '../ui/form'
import CustomFormField from '../CustomFormField'
import { FormFieldType } from './LoginInForm'
import { UploadCloud } from 'lucide-react'
import { CreateEventSchema } from '@/lib/validation'
import { communityOptions, districtOptions } from '@/constants'

type Inputs = z.infer<typeof CreateEventSchema>

const toDateFromTimeString = (timeStr: string) => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return date
}

const EventForm = ({
  type,
  data,
}: {
  type: 'create' | 'update'
  data?: any
}) => {
  const form = useForm<Inputs>({
    // resolver: zodResolver(CreateEventSchema),
    defaultValues: {
      title: data?.title || '',
      from: data?.from || '',
      date: data?.date ? new Date(data.date) : undefined,
      startTime: data?.startTime
        ? toDateFromTimeString(data.startTime)
        : (undefined as any),
      endTime: data?.startTime
        ? toDateFromTimeString(data.endTime)
        : (undefined as any),
      img: undefined,
      scope: 'GENERAL',
      districtId: undefined,
      communityId: undefined,
    },
  })

  const [scope, setScope] = useState<'GENERAL' | 'DISTRICT' | 'COMMUNITY'>(
    'GENERAL'
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form

  const handleScopeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setScope(event.target.value as 'GENERAL' | 'DISTRICT' | 'COMMUNITY')
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Form {...form}>
      <form className='flex flex-col gap-3' onSubmit={onSubmit}>
        <h1 className='text-xl font-semibold capitalize'>{type} Event</h1>
        <span className='text-xs text-gray-400 font-medium'>
          Event Information
        </span>

        <div className='w-full'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='title'
            label='Title'
            placeholder='Title'
            iconSrc='/icons/user.svg'
            iconAlt='user'
          />
        </div>
        <div className='flex justify-between flex-wrap gap-4'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='from'
            label='From'
            placeholder='John Doe'
            iconSrc='/icons/user.svg'
            iconAlt='user'
          />
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name='date'
            label='Date'
          />
        </div>
        <div className='flex justify-between flex-wrap gap-4'>
          <CustomFormField
            fieldType={FormFieldType.TIME_PICKER}
            control={form.control}
            name='startTime'
            label='Start Time'
          />
          <CustomFormField
            fieldType={FormFieldType.TIME_PICKER}
            control={form.control}
            name='endTime'
            label='End Time'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-6 xl:flex-row '>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='description'
              label='Description'
              placeholder='Description...'
            />
          </div>
          <div className='flex flex-col gap-2 w-full md:w-1/4 justify-center'>
            <label
              className='text-xs text-gray-500 flex items-center gap-2 cursor-pointer'
              htmlFor='img'
            >
              <UploadCloud className='w-6 h-6' />
              <span className=''>Upload a photo</span>
            </label>
            <input
              type='file'
              id='img'
              {...register('img')}
              className='hidden'
            />
            {errors.img?.message && (
              <p className='text-xs text-red-400'>
                {errors.img?.message.toString()}
              </p>
            )}
          </div>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name='scope'
            label='Scope'
            options={[
              { label: 'General', value: 'GENERAL' },
              { label: 'District', value: 'DISTRICT' },
              { label: 'Community', value: 'COMMUNITY' },
            ]}
            onChange={handleScopeChange}
          />
          {scope === 'DISTRICT' && (
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='districtId'
              label='District'
              options={districtOptions}
            />
          )}
          {scope === 'COMMUNITY' && (
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name='communityId'
              label='Community'
              options={communityOptions}
            />
          )}
        </div>
        <button className='bg-blue-400 text-white rounded-md p-2'>
          {type === 'create' ? 'Create' : 'Update'}
        </button>
      </form>
    </Form>
  )
}

export default EventForm
