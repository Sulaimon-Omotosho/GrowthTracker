'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MemberFormValidation } from '@/lib/validation'
import CustomFormField from '../CustomFormField'
import { FormFieldType } from './LoginInForm'
import { FormControl } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { GenderOptions, MaritalStatus } from '@/constants'
import { Label } from '../ui/label'
import { zodResolver } from '@hookform/resolvers/zod'

type Inputs = z.infer<typeof MemberFormValidation>

const UsersForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: 'create' | 'update'
  setOpen: Dispatch<SetStateAction<boolean>>
  relatedData?: any
  data?: any
}) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(MemberFormValidation) as any,
    defaultValues: {
      name: data?.name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      maritalStatus: data?.status || 'single',
      birthDate: data?.birthdate || new Date(),
      gender: data.gender || 'male',
      address: data?.address || '',
      occupation: data?.occupation || '',
      newConvert: data?.newConvert || 'yes',
      formerReligion: data?.formerReligion || '',
      notes: data?.notes || '',
      contactConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
      <h1 className='text-xl font-semibold'>Create a new Member</h1>
      <span className='text-xs text-gray-400 font-medium'>
        Authentication Information
      </span>

      <div className='flex justify-between flex-wrap gap-4'>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='name'
          label='Full Name'
          placeholder='John Doe'
          iconSrc='/icons/user.svg'
          iconAlt='user'
        />

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='email'
            label='Email'
            placeholder='Email'
            iconSrc='/icons/email.svg'
            iconAlt='email'
          />

          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name='phone'
            label='Phone Number'
            placeholder='+234 801 234 5678'
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.PASSWORD}
          control={form.control}
          name='password'
          label='Password'
          placeholder='Password'
          iconSrc='/icons/user.svg'
          iconAlt='user'
        />
      </div>

      <div className='flex flex-col gap-6 xl:flex-row'>
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name='maritalStatus'
          label='Marital Status'
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup
                className='flex flex-wrap gap-6 xl:justify-between text-white capitalize'
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {MaritalStatus.map((option) => (
                  <div
                    className='flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-black bg-black p-3'
                    key={option}
                  >
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className='cursor-pointer'>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />
      </div>

      <div className='flex flex-col gap-6 xl:flex-row'>
        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name='birthDate'
          label='D.O.B'
        />

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name='gender'
          label='Gender'
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup
                className='flex h-11 gap-6 xl:justify-between text-white capitalize'
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {GenderOptions.map((option) => (
                  <div
                    className='flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-black bg-black p-3'
                    key={option}
                  >
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className='cursor-pointer'>
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />
      </div>

      <div className='flex flex-col gap-6 xl:flex-row'>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='address'
          label='Address'
          placeholder='10, Your Street, Lagos'
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='occupation'
          label='Occupation'
          placeholder='Your Job'
        />
      </div>
      <button className='bg-blue-400 text-white rounded-md p-2'>
        {type === 'create' ? 'Create' : 'Update'}
      </button>
    </form>
  )
}

export default UsersForm
