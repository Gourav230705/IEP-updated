import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { listCategoriesAPI } from '../services/category/categoryServices';
import { useMutation, useQuery } from "@tanstack/react-query";
import { addTransactionAPI } from '../services/transaction/transactionServices';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';
export default function TransactionForm() {
    const navigate = useNavigate()

  //Mutation
  const {mutateAsync, isPending, isSuccess, isError: isAddTranErr} = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ['add-transaction']
  })

  //fetching
  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });
  
  
  const formik = useFormik({
    initialValues: {
      type: '',
      amount: '',
      category: '',
      date: '',
      description: '',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('Transaction type is required'),
      amount: Yup.number().required('Amount is required'),
      category: Yup.string().required('Category is required'),
      date: Yup.string().required('Date is required'),
    }),
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          //dispatch
          
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h4 className="mb-1">Transaction Details</h4>
      <p className="text-muted">Fill in the details below.</p>

      <form onSubmit={formik.handleSubmit}>
        {/* Type */}
        <div className="mb-3">
            {/* error messages */}
        {isPending && <AlertMessage type= 'loading' message='wait....'/>}
        {isError && <AlertMessage type= 'error' message={error.response.data.message}/>}
        {isSuccess && <AlertMessage type= 'success' message='Transaction added successfully...'/>}
          <label htmlFor="type" className="form-label">Type</label>
          <select
            id="type"
            name="type"
            className={`form-select ${formik.touched.type && formik.errors.type ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          >
            <option value="">Select transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <div className="invalid-feedback">{formik.errors.type}</div>
          )}
        </div>

        {/* Amount */}
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''}`}
            placeholder="Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amount}
          />
          {formik.touched.amount && formik.errors.amount && (
            <div className="invalid-feedback">{formik.errors.amount}</div>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            className={`form-select ${formik.touched.category && formik.errors.category ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
          >
            <option value="">Select a category</option>
            {data?.map((category)=>{
                return(
                    <option key={category?._id} value={category?.name}>
                        {category?.name}
                    </option>
                )
            })}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="invalid-feedback">{formik.errors.category}</div>
          )}
        </div>

        {/* Date */}
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            className={`form-control ${formik.touched.date && formik.errors.date ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.date}
          />
          {formik.touched.date && formik.errors.date && (
            <div className="invalid-feedback">{formik.errors.date}</div>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description (Optional)</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="2"
            placeholder="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Transaction</button>
      </form>
    </div>
  );
}
