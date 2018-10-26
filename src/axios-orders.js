import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-builder-app.firebaseio.com/',
});

export default instance;