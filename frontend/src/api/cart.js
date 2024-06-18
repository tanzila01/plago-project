import axios from 'axios'

export const addToCart = async(data) => {
    const config= {
        headers: {
            'Content-Type': "application/json"
        }
    }
    const response = await axios.post('/api/cart' , data , config)
    return response
}

export const getCart = async() => {
    const response = await axios.get('/api/cart')
    return response
}