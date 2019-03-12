import axios from 'axios';
import {routingStore as router} from '../../index'; 

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 404) {
        router.push('/404');
    }
    if (error.response.status === 500) {
        router.push('/serverError');
        return;
    }

    console.log('interceptor - not a 404 or 500')
    console.log(error.response);
    throw error.response;
})

const responseBody = res => Promise.resolve(res.data);

const sleep = (x) => new Promise(resolve => setTimeout(() => resolve(x), 1000));

const requests = {
    get: url => axios.get(url).then(sleep).then(responseBody),
    post: (url, body) => axios.post(url, body).then(sleep).then(responseBody),
    put: (url, body) => axios.put(url, body).then(sleep).then(responseBody),
    del: url => axios.delete(url).then(sleep).then(responseBody)
}

const Activities = {
    all: () => requests.get(`/activities`),
    get: id => requests.get(`/activities/${id}`),
    create: activity => requests.post(`/activities`, activity),
    update: activity => requests.put(`/activities/${activity.id}`, activity),
    delete: id => requests.del(`/activities/${id}`)
}

export default {
    Activities
}