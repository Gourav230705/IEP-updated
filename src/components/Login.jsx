import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import * as Yup from "yup"
import { loginAPI } from '../services/users/userServices'
import AlertMessage from './AlertMessage'
import { loginAction } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'



const validationSchema = Yup.object({
  email: Yup.string().email("Invalid").required("Email is required"),
  password: Yup.string().min(5, "Password must be at least 8 characters long").required("Password is required"),
})

const Login = () => {
  //navigate
  const navigate = useNavigate()


  const dispatch = useDispatch()
  //Mutation
  const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
    mutationFn: loginAPI,
    mutationKey: ['login']
  })

 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      
      //http request
      mutateAsync(values)
        .then((data) => {
          //dispatch
          dispatch(loginAction(data));
          //Save the user into localStorage
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    }
    
  });
  //redirect
  useEffect(()=>{
    setTimeout(()=>{
      if(isSuccess){
        navigate('/dashboard')
      }
    },3000)
  }, [isPending, isError, error, isSuccess])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{
      background: "linear-gradient(to right, #f5f7fa, #c3cfe2)"
    }}>
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}>
        <h2 className="text-center mb-4" style={{ color: "#333" }}>Login</h2>
        {/* alerts */}
        {isPending && <AlertMessage type= 'loading' message='Login you in....'/>}
        {isError && <AlertMessage type= 'error' message={error.response.data.message}/>}
        {isSuccess && <AlertMessage type= 'success' message='Login successfully'/>}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
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
              {...formik.getFieldProps("password")}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn w-100 mt-2" style={{
            background: "linear-gradient(to right, #56ab2f, #a8e063)",
            border: "none",
            color: "white"
          }}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
