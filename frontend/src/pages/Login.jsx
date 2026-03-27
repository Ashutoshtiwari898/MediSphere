import React, { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up')
  const { setToken, backendUrl } = useContext(AppContext)

  const [data, setData] = useState({
    email: "",
    password: "",
    name: ""
  })

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (state === "Sign Up") {

        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          data
        );

        if (response.data.success) {
          toast.success("Registered successfully")
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          navigate("/")
        } else {
          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(
          `${backendUrl}/api/user/login`,
          data
        );

        if (response.data.success) {
          toast.success("Logged in successfully")
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          navigate("/")
        } else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <section className='relative min-h-[78vh] py-8 sm:py-12'>
      <div className='pointer-events-none absolute left-6 top-8 h-32 w-32 rounded-full bg-orange-200/50 blur-3xl' />
      <div className='pointer-events-none absolute right-8 top-1/4 h-40 w-40 rounded-full bg-rose-200/45 blur-3xl' />

      <div className='relative mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_18px_45px_rgba(87,42,30,0.12)] backdrop-blur md:grid-cols-2'>
        <div className='hidden bg-gradient-to-br from-[#ff9b7a] to-[#ff5a3d] p-8 text-white md:block'>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-white/80'>
            MediSphere Access
          </p>
          <h2 className='display-font mt-4 text-4xl font-extrabold leading-tight'>
            Welcome Back
          </h2>
          <p className='mt-4 text-sm leading-6 text-white/90'>
            Sign in to manage appointments, consult specialists, and access your health services from one dashboard.
          </p>
        </div>

        <form className='flex flex-col gap-4 p-6 text-zinc-700 sm:p-8' onSubmit={handleSubmit}>
          <p className='display-font text-3xl font-bold'>
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>

          <p className='text-sm text-gray-600'>
            Please {state === "Sign Up" ? "sign up" : "login"} to book an appointment.
          </p>

          {state === "Sign Up" && (
            <div className='w-full'>
              <p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-700'>Full Name</p>
              <input
                className='w-full rounded-xl border border-zinc-300 bg-white/90 px-3 py-2.5 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20'
                type="text"
                value={data.name}
                onChange={handleInput}
                name='name'
                required
              />
            </div>
          )}

          <div className='w-full'>
            <p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-700'>Email</p>
            <input
              className='w-full rounded-xl border border-zinc-300 bg-white/90 px-3 py-2.5 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20'
              type="email"
              value={data.email}
              onChange={handleInput}
              name='email'
              required
            />
          </div>

          <div className='w-full'>
            <p className='mb-1 text-sm font-semibold uppercase tracking-wide text-gray-700'>Password</p>
            <input
              className='w-full rounded-xl border border-zinc-300 bg-white/90 px-3 py-2.5 outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20'
              type="password"
              value={data.password}
              onChange={handleInput}
              name='password'
              required
            />
          </div>

          <button
            type='submit'
            className='theme-btn mt-1 w-full py-3 text-base font-semibold uppercase tracking-wide'
          >
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>

          {
            state === "Sign Up"
              ? (
                <p className='text-sm text-gray-600'>
                  Already have an account?
                  <span
                    onClick={() => setState("Login")}
                    className='ml-1 cursor-pointer font-semibold text-primary underline'
                  >
                    Login here
                  </span>
                </p>
              )
              : (
                <p className='text-sm text-gray-600'>
                  Create a new account?
                  <span
                    onClick={() => setState("Sign Up")}
                    className='ml-1 cursor-pointer font-semibold text-primary underline'
                  >
                    Click here
                  </span>
                </p>
              )
          }
        </form>
      </div>
    </section>
  )
}

export default Login