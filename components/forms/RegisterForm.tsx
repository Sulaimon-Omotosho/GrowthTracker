'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormControl } from '@/components/ui/form'
import CustomFormField from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { useState } from 'react'
import { MemberFormValidation } from '@/lib/validation'
import { redirect, useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { GenderOptions, MaritalStatus, NewConvert } from '@/constants'
import { Label } from '../ui/label'
import { SelectItem } from '../ui/select'
import Image from 'next/image'
// import FileUploader from '../FileUploader'
import { FormFieldType } from './LoginInForm'
import { Session } from 'next-auth'
import { updateUser } from '@/lib/actions/actions'
import { toast } from 'react-toastify'

interface RegisterFormProps {
  userId: string
  session: Session | null
}

type Inputs = z.infer<typeof MemberFormValidation>

const RegisterForm = ({ session }: RegisterFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<Inputs>({
    resolver: zodResolver(MemberFormValidation) as any,
    defaultValues: {
      id: session?.user.id || '',
      name: '',
      firstName: '',
      lastName: '',
      email: session?.user?.email || '',
      phone: '',
      maritalStatus: 'single',
      birthDate: new Date(),
      gender: 'male',
      address: '',
      occupation: '',
      newConvert: 'yes',
      formerReligion: '',
      notes: '',
      contactConsent: false,
      disclosureConsent: false,
      privacyConsent: false,
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    // console.log('User Data:', data)
    const result = await updateUser(data as any)

    if (!result.success) {
      if (result.error === 'Email already exists') {
        toast('This email is already registered.')
      } else if (result.error === 'Phone number already exists') {
        toast('This phone number is already registered.')
      } else {
        toast('Something went wrong. Please try again.')
      }
    } else {
      toast('Profile Updated!')
      router.push('/')
    }
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='space-y-12 flex-1'>
        <section className='space-y-4'>
          <h1 className='text-3xl font-bold md:text-4xl'>Welcome 👋</h1>
          <p className='text-gray-500'>Let us know more about you.</p>
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='text-lg font-bold md:text-2xl'>
              Personal Information
            </h2>
          </div>

          {/* FORM  */}
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
              placeholder={session?.user?.email!}
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
        </section>
        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='text-lg font-bold md:text-2xl'>Other Information</h2>
          </div>

          <div className='flex flex-col gap-6 xl:flex-row'>
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
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='formerReligion'
              label='Former Religion'
              placeholder='Christian'
            />
          </div>

          <div className='flex flex-col gap-6 xl:flex-row '>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name='notes'
              label='Additional Notes (if any)'
              placeholder='Notes...'
            />
          </div>

          {/* <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name='identificationDocument'
          label='Copy Of Document'
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        /> */}
        </section>

        <section className='space-y-6'>
          <div className='mb-9 space-y-1'>
            <h2 className='text-lg font-bold md:text-2xl'>
              Consent and Privacy
            </h2>
          </div>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='contactConsent'
            label='I consent to being contacted by HICC'
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to full disclosure of this information'
          />
          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I consent to privacy policy'
          />
        </section>

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </FormProvider>
  )
}

export default RegisterForm
