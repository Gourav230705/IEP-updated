import axios from "axios";
import { BASE_URL } from "../../utils/url";
import getUserFromStorage from "../../utils/getUserFromStorage";

// add
export const addTransactionAPI = async ({
    type,
    category,
    date,
    description,
    amount,
}) => {
  const token = getUserFromStorage(); //  Read fresh token at call time
  const response = await axios.post(`${BASE_URL}/transaction/create`, {
    type,
    category,
    date,
    description,
    amount,
  },{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};


// lists
export const listTransactionsAPI = async ({category, endDate, startDate, type}) => {
  const token = getUserFromStorage(); //  Read fresh token at call time
  const response = await axios.get(`${BASE_URL}/transaction/lists`, {
    params:{category, endDate, startDate, type},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};

// analytics
export const getAnalyticsAPI = async () => {
  const token = getUserFromStorage();
  const response = await axios.get(`${BASE_URL}/transaction/analytics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};






export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${BASE_URL}/categories/update/${id}`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  //Return a promise
  return response.data;
};
//! delete
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  //Return a promise
  return response.data;
};