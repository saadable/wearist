import axios from "axios";
import { refreshAccessToken } from './auth'

const getBaseUrl = () => {
    // prefer exposed NEXT_PUBLIC_BASE_URL for client-side, fall back to BASE_URL or window origin
    const envUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
    if (envUrl) return envUrl.replace(/\/$/, '')
    if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin.replace(/\/$/, '')
    return 'http://localhost:4000'
};

export const axiosClient = axios.create(
    {
        baseURL: getBaseUrl(),
        withCredentials: true
    }
)

// Response interceptor: try to refresh access token on 401 and retry once
// let isRefreshing = false
// let failedQueue = []

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) prom.reject(error)
//     else prom.resolve(token)
//   })
//   failedQueue = []
// }

// axiosClient.interceptors.response.use(
//   res => res,
//   async err => {
//     const originalRequest = err.config
//     if (err.response && err.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // queue the request
//         return new Promise(function (resolve, reject) {
//           failedQueue.push({ resolve, reject })
//         }).then(token => {
//           originalRequest.headers['Authorization'] = `Bearer ${token}`
//           return axiosClient(originalRequest)
//         }).catch(err => Promise.reject(err))
//       }

//       originalRequest._retry = true
//       isRefreshing = true
//       try {
//         const res = await refreshAccessToken()
//         isRefreshing = false
//         if (res && res.accessToken) {
//           processQueue(null, res.accessToken)
//           originalRequest.headers['Authorization'] = `Bearer ${res.accessToken}`
//           return axiosClient(originalRequest)
//         }
//       } catch (refreshErr) {
//         processQueue(refreshErr, null)
//         // redirect to login
//         if (typeof window !== 'undefined') window.location.href = '/login'
//         return Promise.reject(refreshErr)
//       }
//     }
//     return Promise.reject(err)
//   }
// )

// helper to update base URL at runtime (useful for tests)
export const setAxiosBaseUrl = (url) => {
    axiosClient.defaults.baseURL = String(url || '').replace(/\/$/, '')
};
