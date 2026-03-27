import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div className='space-y-8 pb-8'>
      <section className='theme-card p-5 sm:p-8'>
        <p className='mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80 sm:text-sm'>
          Healthcare Reimagined
        </p>
        <h1 className='display-font text-3xl font-extrabold leading-tight sm:text-5xl'>
          Find Care Faster, Smarter, and Closer to Home
        </h1>
        <p className='mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base'>
          Discover specialists, access AI support, and manage consultations from one unified platform built for modern patients.
        </p>
      </section>

      <section className='theme-card overflow-hidden p-1 sm:p-2'>
        <Header/>
      </section>

      <section className='theme-card p-3 sm:p-4'>
        <SpecialityMenu/>
      </section>

      <section className='theme-card p-3 sm:p-4'>
        <TopDoctors/>
      </section>

      <section className='theme-card p-3 sm:p-4'>
        <Banner/>
      </section>
    </div>
  )
}

export default Home
