import BottomBar from '@/components/BottomBar'
import LoginForm from '@/components/LoginForm'
import LoginGoogle from '@/components/LoginGoogle'
import LogoutButton from '@/components/LogoutButton'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

const Home = async () => {
  const session = await getServerSession()

  return (
    <div className='p-4 h-[calc(100vh-64px)]  md:h-[calc(100vh-9rem)] flex flex-col items-center justify-center gap-8'>
      <section className=' shadow-2xl dark:shadow-slate-900 rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] xl:w-1/2 gap-8 '>
        {/* Image Container */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image
            src='/images/Growthtrack-img1.jpg'
            alt=''
            fill
            className='object-cover'
          />
        </div>

        {/* Form Container */}
        <div className=' flex flex-col gap-4 md:w-1/2 p-2'>
          <LoginForm />
          <div className=''>
            <p className='text-center pb-3'>Or</p>
            {session?.user ? <LogoutButton /> : <LoginGoogle />}
          </div>
        </div>
      </section>
      {/* <div className='w-[100%] rounded-lg'>
        <BottomBar />
      </div> */}
    </div>
  )
}

export default Home
