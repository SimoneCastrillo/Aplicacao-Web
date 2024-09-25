import axios from 'axios';

const api = (endpoint)=>{
    axios.create( 
        {
            baseURL: process.env.REACT_APP_API_URL+endpoint,
        }
    )
}

export default api;