import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fx-burger.firebaseio.com'
})

export default instance;