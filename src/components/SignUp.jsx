import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerAPI } from '../services/users/userServices'
import AlertMessage from './AlertMessage'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { loginAction } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";



// Validation Schema
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(5, 'Password must be at least 5 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
})

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
    mutationFn: registerAPI,
    mutationKey: ['register']
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema,
    onSubmit: (values) => {
      
      // http
      mutateAsync(values)
        .then((data) => {
          
          //dispatch
          dispatch(loginAction(data));
          //Save the user into localStorage
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    }
  })

  //redirect
    useEffect(()=>{
      setTimeout(()=>{
        if(isSuccess){
          navigate('/dashboard')
        }
      },1000)
    }, [isPending, isError, error, isSuccess])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{
      background: "linear-gradient(to right, #f5f7fa, #c3cfe2)"
    }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}>
        <h2 className="text-center mb-4" style={{ color: "#333" }}>Sign Up</h2>

        {/* error messages */}
        {isPending && <AlertMessage type= 'loading' message='Login you in....'/>}
        {isError && <AlertMessage type= 'error' message={error.response.data.message}/>}
        {isSuccess && <AlertMessage type= 'success' message='Register successfully'/>}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
              id="username"
              name="username"
              {...formik.getFieldProps('username')}
              placeholder="Choose a username"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="invalid-feedback">{formik.errors.username}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              {...formik.getFieldProps('email')}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
              id="password"
              name="password"
              {...formik.getFieldProps('password')}
              placeholder="Create a password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              {...formik.getFieldProps('confirmPassword')}
              placeholder="Confirm your password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="btn w-100 mt-2" style={{
            background: "linear-gradient(to right, #56ab2f, #a8e063)",
            border: "none",
            color: "white"
          }}>
            Sign Up
          </button>
        </form>


      </div>
    </div>
  )
}
