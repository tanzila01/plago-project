
import axios from 'axios';


export const signup = userData => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    return axios.post('/api/auth/signup', userData, config);
}



export const signin = userData => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }

    return axios.post('/api/auth/signin', userData, config);
}
