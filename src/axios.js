import axios from "axios";

const instance = axios.create({
    baseURL: 'https://kurs-react-dragan-default-rtdb.firebaseio.com'
});

export default instance
