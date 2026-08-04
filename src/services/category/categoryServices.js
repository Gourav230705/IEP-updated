import axios from "axios";
import { BASE_URL } from "../../utils/url";
import getUserFromStorage from "../../utils/getUserFromStorage";


export const addCategoryAPI = async ({ name, type }) => {
  const token = getUserFromStorage(); //  Read fresh token at call time
  const response = await axios.post(`${BASE_URL}/categories/create`, {
    name,
    type,
  },{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export const deleteCategoryAPI = async (id) => {
  const token = getUserFromStorage(); //  Read fresh token at call time
  const response = await axios.delete(`${BASE_URL}/categories/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

export const listCategoriesAPI = async () => {
  const token = getUserFromStorage(); //  Read fresh token at call time
  const response = await axios.get(`${BASE_URL}/categories/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};