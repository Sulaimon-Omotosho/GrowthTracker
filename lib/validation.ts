import { z } from 'zod'

export const UserFormValidation = z.object({
  password: z
    .string()
    .min(2, 'Password must be at least 8 characters')
    .max(20, 'Password must be at most 20 characters'),
  email: z.string().email('Invalid email address'),
  // phone: z
  //   .string()
  //   .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
})

export const LoginFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
})

export const MemberFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  formerReligion: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
  birthDate: z.coerce.date(),
  gender: z.enum(['male', 'female']),
  newConvert: z.enum(['yes', 'no', 'reborn']),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  notes: z.string().optional(),
  contactConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to contact in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
})

export const CreateAnnouncementSchema = z.object({
  title: z.string().min(4, { message: 'Title must be at least 4 characters!' }),
  from: z.string().min(5, { message: 'From is required!' }),
  desc: z.string().min(20, { message: 'Description is required!' }),
  // date: z.date({ message: 'Date is required!' }),
  img: z.any().optional(),
  // scope: z.enum(['GENERAL', 'DISTRICT', 'COMMUNITY']),
  districtId: z.string().optional(),
  // communityId: z.string().optional(),
})

export const CreateEventSchema = z
  .object({
    title: z
      .string()
      .min(4, { message: 'Title must be at least 4 characters!' }),
    from: z.string().min(5, { message: 'From is required!' }),
    description: z.string().min(20, { message: 'Description is required!' }),
    date: z.date({ message: 'Date is required!' }),
    startTime: z
      .union([z.string(), z.date()])
      .transform((val) => new Date(val)),
    endTime: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
    img: z.any().optional(),
    scope: z.enum(['GENERAL', 'DISTRICT', 'COMMUNITY']),
    districtId: z.string().optional(),
    communityId: z.string().optional(),
  })
  .refine(
    (data) =>
      (data.scope === 'DISTRICT' && data.districtId) ||
      (data.scope === 'COMMUNITY' && data.communityId) ||
      data.scope === 'GENERAL',
    {
      message: 'Missing region information based on scope',
      path: ['scope'],
    }
  )
