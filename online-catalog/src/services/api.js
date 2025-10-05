import axios from 'axios';

const api = axios.create({
    baseURL: "https://dummyjson.com",
    timeout: 5000,
})

// Mask to handle errors globally

// api.interceptors.request.use(
//     config => {
//         console.log("Request: ", config.url);
//         return config;
//     },
//     error => Promise.reject(error)
// )
//
// api.interceptors.response.use(
//     response => {
//         console.log("Response: ", response);
//         return response;
//     },
//     error => {
//         console.log("Error: ", error);
//         return Promise.reject(error);
//     }
// )
// get all products
export const getProducts = async () => {
    const response = await api.get('/products')
    return response.data
}
//get one product by id
export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
}

export const searchProducts = async (query) => {
    const response = await api.get(`/products/search?q=${query}`)
    return response.data
}

export const getProductsByCategory = async (category) => {
    const response = await api.get(`/products/category/${category}`)
    return response.data
}

export const getCategories = async () => {
    const response = await api.get('/products/categories')
    return response.data
}
