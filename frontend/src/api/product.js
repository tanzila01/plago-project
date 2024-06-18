
import axios from 'axios'


export const createProduct = async (productData) => {

    const response = await axios.post('/api/product' , productData)

    return response
}

export const getProductCAt = async (catId) => {
    const response = await axios.get("/api/product/catproducts/:catid", catId)
    return response
}



