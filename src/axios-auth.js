import axios from "axios";

const instance = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        'key': 'AIzaSyDER34xqMUtuQHjyY6QrGkbw4JqZ_WMiVI'
    }
});

export default instance
