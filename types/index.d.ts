/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string }
  searchParams?: Record<string, string | string[] | undefined>
  // searchParams: { [key: string]: string | string[] | undefined }
}

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
  userId: string
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

export interface DistrictTypes {
  id: string
  name?: string | null
  communityId: string
  community: {
    name: string
    zones: {
      reduce(
        arg0: (total: any, zone: any) => any,
        arg1: number
      ): import('react').ReactNode
    }
    pastorId?: string | null
    pastor?: {
      id: string
      name: string
      phone: string
      image: string
      gender: string
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
  pastor?: {
    id: string
    name: string
    phone: string
    image: string
    gender: string
  }
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

export interface columns {
  header: string
  accessor: string
  className?: string
}
