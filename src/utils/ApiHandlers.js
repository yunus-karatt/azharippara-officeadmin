import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log({ BASE_URL });
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log({token})
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();

      // Redirect to login page
      console.log(window.location)
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config
//         if (error?.response?.status == 401 && !originalRequest._retry) {
//             originalRequest._retry = true
//             try {
//                 const refreshToken = localStorage.getItem("refreshToken")
//                 if (refreshToken) {

//                     const response = await axios.post(`${BACKEND_BASE_URL}/refresh/`, { refresh: refreshToken })
//                     const newAccessToken = response.data.access
//                     localStorage.setItem("accessToken", newAccessToken)

//                     api.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     return api(originalRequest);
//                 } else {

//                     return Promise.reject(error);
//                 }
//             } catch (error) {
//                 return Promise.reject(error)
//             }
//         } else {
//             return Promise.reject(error);
//         }
//     }
// )

// GET request handler
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

// POST request handler
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// PUT request handler
export const putData = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const patchData = async (endpoint, data) => {
  try {
    const response = await api.patch(endpoint, data);
    return response;
  } catch (error) {
    throw error;
  }
};

// DELETE request handler
export const deleteData = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

// File upoad
export const uploadFile = async (endpoint, file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
