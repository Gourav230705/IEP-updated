import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addCategoryAPI } from '../services/category/categoryServices';
import { useMutation } from '@tanstack/react-query';
import AlertMessage from './AlertMessage';


export default function AddCategory() {
  const navigate = useNavigate()

  //Mutation
  const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ['login']
  })

  const validationSchema = Yup.object({
    type: Yup.string().required('Please select a category type'),
    name: Yup.string()
      .required('Please enter a category name')
      .min(3, 'Type must be at least 3 characters'),
  });

  const formik = useFormik({
    initialValues: {
      type: '',
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Add API call or dispatch action here
      mutateAsync(values)
        .then((data) => {
          //dispatch
          
        })
        .catch((e) => console.log(e));
    },
  });

  console.log({isError, error, isSuccess});

  return (
    <div>
      <form className="m-3" onSubmit={formik.handleSubmit}>
        <fieldset>
          <legend>Add Category</legend>

          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Category: Expense or Income
            </label>
            {/* error messages */}
        {isPending && <AlertMessage type= 'loading' message='wait....'/>}
        {isError && <AlertMessage type= 'error' message={error.response.data.message}/>}
        {isSuccess && <AlertMessage type= 'success' message='Category added'/>}
            <select
              id="type"
              name="type"
              className={`form-select ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.type}
            >
              <option value="">Select</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <div className="invalid-feedback">{formik.errors.type}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Type
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
              placeholder="Type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
