import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const SPECIALITIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const normaliseSpeciality = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')

const Doctors = () => {

  const navigate = useNavigate()
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [bookingDoctor, setBookingDoctor] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')

  const requestedSpeciality = decodeURIComponent(speciality || '')
  const requestedKey = normaliseSpeciality(requestedSpeciality)

  const specialityAliases = {
    generalphysician: 'General physician',
    gynecologist: 'Gynecologist',
    dermatologist: 'Dermatologist',
    pediatricians: 'Pediatricians',
    neurologist: 'Neurologist',
    gastroenterologist: 'Gastroenterologist',
    gastoenterologist: 'Gastroenterologist',
  }

  const activeSpeciality = specialityAliases[requestedKey] || requestedSpeciality

  const applyFilter = () => {
    if (activeSpeciality) {
      const activeKey = normaliseSpeciality(activeSpeciality)
      setFilterDoc(doctors.filter(doc => normaliseSpeciality(doc.speciality) === activeKey))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, activeSpeciality])

  const handleSpecialityClick = (selectedSpeciality) => {
    if (activeSpeciality === selectedSpeciality) {
      navigate('/doctors')
      return
    }

    navigate(`/doctors/${selectedSpeciality}`)
  }

  const openBookingPopup = (doctor) => {
    setBookingDoctor(doctor)
    setBookingDate('')
    setBookingTime('')
  }

  const confirmBooking = () => {
    if (!bookingDoctor) {
      return
    }

    if (!bookingDate || !bookingTime) {
      toast.error('Please choose both date and time')
      return
    }

    toast.success(`Booked ${bookingDoctor.name} on ${bookingDate} at ${bookingTime}`)
    setBookingDoctor(null)
    navigate(`/appointment/${bookingDoctor._id}`)
    scrollTo(0, 0)
  }

  return (
    <div>
      <h1 className='display-font text-3xl font-bold text-slate-900'>Find by Speciality</h1>
      <p className='mt-2 max-w-3xl text-sm leading-6 text-slate-600'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment
        hassle-free.
      </p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ""}`} onClick={() => { setShowFilter(!showFilter) }}>Filter</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {SPECIALITIES.map((item) => (
            <p
              key={item}
              onClick={() => {
                handleSpecialityClick(item)
              }}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${activeSpeciality === item ? 'bg-indigo-100 text-black' : ''}`}
            >
              {item}
            </p>
          ))}
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => {
              return (
                <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                  <img className='bg-blue-50' src={item.image} alt="" />
                  <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? " text-green-500" : "text-gray-500"}`}>
                      <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p><p>{item.available ? "Available" : "Not Available"}</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                    <p className='mt-2 text-sm font-medium text-slate-700'>Case Fee: ${item.fees}</p>
                    <button
                      onClick={(event) => {
                        event.stopPropagation()
                        if (!item.available) {
                          toast.error('Doctor is currently not available')
                          return
                        }
                        openBookingPopup(item)
                      }}
                      className='theme-btn mt-3 w-full px-4 py-2 text-xs font-semibold uppercase tracking-wide'
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )
            })
          }
          {filterDoc.length === 0 && (
            <div className='theme-card col-span-full p-6 text-sm text-slate-600'>
              No doctors found in this speciality right now. Please choose another speciality.
            </div>
          )}
        </div>
      </div>

      {bookingDoctor && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-slate-900/45 px-4'>
          <div className='theme-card w-full max-w-md p-6'>
            <p className='display-font text-2xl font-bold text-slate-900'>Book Doctor</p>
            <p className='mt-1 text-sm text-slate-600'>Doctor: {bookingDoctor.name}</p>

            <div className='mt-4 space-y-3'>
              <div>
                <label className='mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600'>Date</label>
                <input
                  type='date'
                  value={bookingDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(event) => {
                    setBookingDate(event.target.value)
                  }}
                  className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary'
                />
              </div>

              <div>
                <label className='mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-600'>Time</label>
                <input
                  type='time'
                  value={bookingTime}
                  onChange={(event) => {
                    setBookingTime(event.target.value)
                  }}
                  className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-primary'
                />
              </div>
            </div>

            <div className='mt-5 flex items-center justify-end gap-2'>
              <button
                onClick={() => {
                  setBookingDoctor(null)
                }}
                className='rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700'
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className='theme-btn px-4 py-2 text-xs font-semibold uppercase tracking-wide'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Doctors
