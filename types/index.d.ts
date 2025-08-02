/* eslint-disable no-unused-vars */

// declare type SearchParamProps = {
//   params: { [key: string]: string }
//   searchParams?: Record<string, string | string[] | undefined>
//   // searchParams: { [key: string]: string | string[] | undefined }
// }

export type SearchParamProps = {
  searchParams: URLSearchParams
  params: { [key: string]: string }
}

// export type SearchParamProps = {
//   searchParams?: Record<string, string | string[] | undefined>
//   params: Record<string, string>
// }

declare type Gender = 'male' | 'female' | 'other'
declare type Status = 'pending' | 'scheduled' | 'cancelled'

declare interface CreateUserParams {
  name: string
  email: string
  phone: string
}
declare interface User extends CreateUserParams {
  $id: string
}

declare interface RegisterUserParams extends CreateUserParams {
  id: string
  birthDate: Date
  gender: Gender
  address: string
  occupation: string
  emergencyContactName: string
  emergencyContactNumber: string
  primaryPhysician: string
  insuranceProvider: string
  insurancePolicyNumber: string
  allergies: string | undefined
  currentMedication: string | undefined
  familyMedicalHistory: string | undefined
  pastMedicalHistory: string | undefined
  identificationType: string | undefined
  identificationNumber: string | undefined
  identificationDocument: FormData | undefined
  privacyConsent: boolean
}

declare type CreateAppointmentParams = {
  userId: string
  patient: string
  primaryPhysician: string
  reason: string
  schedule: Date
  status: Status
  note: string | undefined
}

declare type UpdateAppointmentParams = {
  appointmentId: string
  userId: string
  appointment: Appointment
  type: string
}

export interface UserTypes {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone: string
  hashedPassword: string
  // emailVerified DateTime?
  birthDate: Date
  image: string
  gender: String
  address: String
  // addressType         Address?
  occupation: string
  maritalStatus: string
  newConvert: string
  formerReligion: string
  notes: string
  privacyConsent: boolean
  contactConsent: boolean
  disclosureConsent: boolean

  departmentId?: string
  department?: DepartmentTypes | null
  cellId?: string
  cell?: CellTypes | null

  role: UserRole

  districtPastor?: DistrictTypes | null
  communityPastor?: CommunityTypes | null
  zonalLeader?: ZoneTypes | null
  cellLeader?: CellTypes | null
  TeamPastor?: TeamTypes | null
  hod?: DepartmentTypes | null

  createdAt: Date
  updatedAt: Date

  Posts?: Post[]
}

export interface FormModalProps {
  table:
    | 'user'
    | 'cell'
    | 'zone'
    | 'community'
    | 'districts'
    | 'team'
    | 'department'
    | 'assignment'
    | 'result'
    | 'attendance'
    | 'event'
    | 'announcement'
  type: 'create' | 'update' | 'delete'
  data?: any
  id?: number | string
  relatedData?: any
}

export interface PastorTypes {
  id: string
  name: string
  phone: string
  image: string
  gender: string
}

export interface DistrictTypes {
  pastorId?: string | null
  pastor?: any
  id: string
  name?: string | null
  communityId: string
  communities: {
    length: ReactNode
    reduce(
      arg0: (total: any, c: { zones: any[] }) => any,
      arg1: number
    ): import('react').ReactNode
    name: string
    zones: {
      reduce(
        arg0: (total: any, zone: any) => any,
        arg1: number
      ): import('react').ReactNode
    }
    cell: []
    createdAt: Date
    updatedAt: Date
  }
}

export interface CommunityTypes {
  id: string
  name?: string | null
  districtId: string
  district: {
    name: string
  }
  pastorId?: string | null
  pastor?: any
  zones: {
    reduce(
      arg0: (total: any, zone: any) => any,
      arg1: number
    ): import('react').ReactNode
    cell: []
    createdAt: Date
    updatedAt: Date
  }
}

export interface ZoneTypes {
  id: string
  name?: string | null
  communityId: string
  community: {
    district: {
      name: string
    }
  }
  leaderId?: string | null
  leader?: {
    id: string
    name: string
    phone: string
    image: string
    gender: string
  }
  cell: Array[]
  createdAt: Date
  updatedAt: Date
}

export interface CellTypes {
  id: string
  address: string
  name?: string | null
  zoneId: string
  zone: {
    community: {
      name: string
      district: {
        name: string
      }
    }
  }
  leaderId?: string | null
  leader?: {
    id: string
    name: string
    phone: string
    image: string
    gender: string
  }
  createdAt: Date
  updatedAt: Date
}

export interface DepartmentTypes {
  id: string
  name: string
  desc: string

  members: UserTypes | null
  hodId: string
  hod: UserTypes | null
  teamId: string
  team: TeamTypes | null

  posts: TargetUnit[]

  createdAt: DateTime
  updatedAt: DateTime
}

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  TIME_PICKER = 'timePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'input',
}

export type CurrentState = { success: boolean; error: boolean }

export interface Columns {
  header: string
  accessor: string
  className?: string
}

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    department: {
      select: {
        name: true
      }
    }
    cell: {
      include: {
        zone: {
          include: {
            community: {
              select: {
                name: true
              }
            }
          }
        }
      }
    }
  }
}>

export type Event = {
  id: number
  title: string
  class: string
  date: string
  startTime: string
  endTime: string
}
