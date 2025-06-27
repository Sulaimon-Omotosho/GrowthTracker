'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useEffect,
} from 'react'
import { z } from 'zod'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { CreateAnnouncementSchema } from '@/lib/validation'
import CustomFormField from '../CustomFormField'
import { FormFieldType } from './LoginInForm'
import { UploadCloud } from 'lucide-react'
import { District } from '@prisma/client'
import { createAnnouncement, updateAnnouncement } from '@/lib/actions/actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Inputs = z.infer<typeof CreateAnnouncementSchema>

const AnnouncementForm = ({
  type,
  data,
  setOpen,
  relatedData,
  districts,
}: {
  type: 'create' | 'update'
  setOpen: Dispatch<SetStateAction<boolean>>
  relatedData?: any
  data?: any
  districts?: any
}) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(CreateAnnouncementSchema),
    defaultValues: {
      title: data?.title || '',
      from: data?.from || '',
      desc: data?.desc || '',
      img: data?.img || '',
    },
  })

  const router = useRouter()

  const districtsOptions = [
    { value: 'campus', label: 'Campus' },
    ...(districts
      ? districts!.map((d: District) => ({
          value: d.id,
          label: d.name,
        }))
      : []),
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form

  const [state, formAction] = useActionState(
    type === 'create' ? createAnnouncement : updateAnnouncement,
    {
      success: false,
      error: false,
    }
  )
  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      formAction(data)
    })
  })

  useEffect(() => {
    if (state.success) {
      toast(
        `Announcement has been ${type === 'create' ? 'created' : 'updated'}!`
      )
      setOpen(false)
      router.refresh()
    }
  })

  return (
    <Form {...form}>
      <form className='flex flex-col gap-3' onSubmit={onSubmit}>
        <h1 className='text-xl font-semibold capitalize'>
          {type} Announcement
        </h1>
        <span className='text-xs text-gray-400 font-medium'>
          Announcement Information
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
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-6 xl:flex-row '>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='desc'
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
            name='districtId'
            label='District'
            options={districtsOptions}
          />
        </div>
        <button className='bg-blue-400 text-white rounded-md p-2'>
          {type === 'create' ? 'Create' : 'Update'}
        </button>
      </form>
    </Form>
  )
}

export default AnnouncementForm
