'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MemberFormValidation } from '@/lib/validation'
import CustomFormField from '../CustomFormField'
import { FormFieldType } from './LoginInForm'
import { FormControl } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { GenderOptions, MaritalStatus, NewConvert } from '@/constants'
import { Label } from '../ui/label'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormProvider } from 'react-hook-form'
import { createUser, updateUser } from '@/lib/actions/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

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
  const router = useRouter()
  const isUpdate = type === 'update'

  const [img, setImg] = useState<any>()

  const form = useForm<Inputs>({
    resolver: zodResolver(MemberFormValidation) as any,
    defaultValues: {
      id: isUpdate ? data.id ?? '' : '',
      name: isUpdate ? data?.name ?? '' : '',
      firstName: isUpdate ? data?.firstName ?? '' : '',
      lastName: isUpdate ? data?.lastName ?? '' : '',
      email: isUpdate ? data?.email ?? '' : '',
      // password: isUpdate ? 'Update Password' : '',
      phone: isUpdate ? data?.phone ?? '' : '',
      image: isUpdate ? data?.image ?? '' : '',
      maritalStatus: isUpdate ? data?.status ?? 'single' : 'single',
      birthDate: isUpdate ? data?.birthdate ?? new Date() : new Date(),
      gender: isUpdate ? data?.gender ?? 'male' : 'male',
      address: isUpdate ? data?.address ?? '' : '',
      occupation: isUpdate ? data?.occupation ?? '' : '',
      newConvert: isUpdate ? data?.newConvert ?? 'yes' : 'yes',
      formerReligion: isUpdate ? data?.formerReligion ?? '' : '',
      notes: isUpdate ? data?.notes ?? '' : '',
      contactConsent: isUpdate ? true : false,
      disclosureConsent: isUpdate ? true : false,
      privacyConsent: isUpdate ? true : false,
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const image = img?.secure_url
    console.log(data, image)

    const result =
      type === 'create'
        ? await createUser(data as any)
        : await updateUser(data as any, image)

    if (!result.success) {
      if (result.error === 'Email already exists') {
        toast('This email is already registered.')
      } else if (result.error === 'Phone number already exists') {
        toast('This phone number is already registered.')
      } else {
        toast('Something went wrong. Please try again.')
      }
    } else {
      toast(`${type === 'create' ? 'Created' : 'Updated'} User!`)
      setOpen(false)
      router.refresh()
    }
  })

  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col gap-4 remove-scrollbar max-h-screen min-h-screen overflow-y-scroll py-8'
        onSubmit={onSubmit}
      >
        {type === 'create' ? (
          <h1 className='text-xl font-bold'>Create a new Member</h1>
        ) : (
          <h1 className='text-xl font-bold'>Update Member's Data</h1>
        )}

        <span className='text-md text-gray-600 font-semibold'>
          Contact Information
        </span>

        <div className='flex justify-between flex-col flex-wrap gap-4'>
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
              name='firstName'
              label='First Name'
              placeholder='First Name'
              iconSrc='/icons/user.svg'
              iconAlt='user'
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='lastName'
              label='Last Name'
              placeholder='Last Name'
              iconSrc='/icons/user.svg'
              iconAlt='user'
            />
          </div>
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

          <CldUploadWidget
            uploadPreset='growthTracker'
            onSuccess={(result, { widget }) => {
              setImg(result.info)
              widget.close()
            }}
          >
            {({ open }) => {
              return (
                <label
                  className='text-xs text-slate-500 flex flex-col items-center gap-2 cursor-pointer justify-center'
                  onClick={() => open()}
                >
                  {!img ? (
                    <Image
                      src='/icons/upload.svg'
                      alt='icon'
                      width={28}
                      height={28}
                    />
                  ) : (
                    <Image
                      src={img?.secure_url}
                      alt='Uploaded Image'
                      width={150}
                      height={250}
                    />
                  )}
                  <span className=''>Upload a photo</span>
                </label>
              )
            }}
          </CldUploadWidget>

          {/* <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name='password'
            label='Password'
            placeholder='Password'
            iconSrc='/icons/user.svg'
            iconAlt='user'
          /> */}
        </div>

        <div className='flex flex-col gap-4 xl:flex-row'>
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
                      className='flex h-11 sm:h-full flex-1 items-center gap-2 rounded-md border border-dashed border-black bg-black p-3 '
                      key={option}
                    >
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className='bg-white cursor-pointer'
                      />
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
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className='cursor-pointer bg-white'
                      />
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

        <div className='flex flex-col gap-4 xl:flex-row'>
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

        <span className='text-md text-gray-600 font-semibold'>
          Religion Information
        </span>
        <div className='flex flex-col gap-4 xl:flex-row'>
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name='newConvert'
            label='New Convert'
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className='flex h-11 gap-6 xl:justify-between text-white capitalize'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {NewConvert.map((option) => (
                    <div
                      className='flex h-full flex-1 items-center gap-2 rounded-md border border-dashed border-black bg-black p-3'
                      key={option}
                    >
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className='cursor-pointer bg-white'
                      />
                      <Label htmlFor={option} className='cursor-pointer'>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name='formerReligion'
            label='Former Religion'
            placeholder='Christian'
          />
        </div>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name='notes'
          label='Notes'
          placeholder='Notes'
          // iconSrc='/icons/user.svg'
          // iconAlt='user'
        />

        {type === 'create' && (
          <>
            <span className='text-md text-gray-600 font-semibold'>
              Authentication Information
            </span>
            <div className='flex flex-col gap-4'>
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='contactConsent'
                label='Contact Consent'
                placeholder='Allow us contact you'
                options={[
                  { value: true, label: 'Yes' },
                  { value: false, label: 'No' },
                ]}
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='disclosureConsent'
                label='Disclosure Consent'
                placeholder='Allow us contact you'
                options={[
                  { value: true, label: 'Yes' },
                  { value: false, label: 'No' },
                ]}
              />
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name='privacyConsent'
                label='Privacy Consent'
                placeholder='Allow us contact you'
                options={[
                  { value: true, label: 'Yes' },
                  { value: false, label: 'No' },
                ]}
              />
            </div>
          </>
        )}
        <button
          type='submit'
          className='bg-blue-400 text-white rounded-md p-2 cursor-pointer'
        >
          {type === 'create' ? 'Create' : 'Update'}
        </button>
      </form>
    </FormProvider>
  )
}

export default UsersForm
