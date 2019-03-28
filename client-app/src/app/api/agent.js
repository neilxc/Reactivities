import axios from 'axios';
import { routingStore as router } from '../../index';
import commonStore from '../stores/commonStore';
import activityStore from '../stores/activityStore';

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.request.use(
  config => {
    if (commonStore.token)
      config.headers.Authorization = `Bearer ${commonStore.token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, error => {
  if (error.response.status === 404) {
    router.push('/404');
  }
  if (error.response.status === 500) {
    router.push('/serverError');
    return;
  }
  if (error.response.status === 400) {
    const err = error.response.data;
    let appErrors;
    if (err && typeof badRequest === 'object') {
      appErrors = Object.keys(err).reduce((r, k) => {
        return r.concat(err[k]);
      }, []);
    }
    throw appErrors;
  }

  console.log('interceptor - not a 404 or 500');
  console.log(error.response);
  throw error.response;
});

const responseBody = res => Promise.resolve(res.data);

const sleep = x => new Promise(resolve => setTimeout(() => resolve(x), 1000));

const requests = {
  get: url =>
    axios
      .get(url)
      .then(sleep)
      .then(responseBody),
  post: (url, body) =>
    axios
      .post(url, body)
      .then(sleep)
      .then(responseBody),
  put: (url, body) =>
    axios
      .put(url, body)
      .then(sleep)
      .then(responseBody),
  del: url =>
    axios
      .delete(url)
      .then(sleep)
      .then(responseBody),
  form: (url, file) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(responseBody);
  }
};

const Activities = {
  all: () =>
    axios
      .get(`/activities`, { params: activityStore.axiosParams })
      .then(sleep)
      .then(responseBody),
  get: id => requests.get(`/activities/${id}`),
  create: activity => requests.post(`/activities`, activity),
  update: activity => requests.put(`/activities/${activity.id}`, activity),
  delete: id => requests.del(`/activities/${id}`),
  attend: id => requests.post(`/activities/${id}/attend`),
  unattend: id => requests.del(`/activities/${id}/attend`)
};

const Users = {
  current: () => requests.get(`/user`),
  login: (email, password) =>
    requests.post('/users/login', { email, password }),
  register: values => requests.post('/users/register', values)
};

const Profiles = {
  get: username => requests.get(`/profiles/${username}`),
  setMainPhoto: id => requests.post(`/photos/${id}/setmain`),
  deletePhoto: id => requests.del(`/photos/${id}`),
  addPhoto: photo => requests.form(`/photos`, photo),
  update: profile => requests.put('/profiles', profile),
  follow: username => requests.post(`/profiles/${username}/follow`),
  unfollow: username => requests.del(`/profiles/${username}/follow`),
  listFollowings: (username, followers) =>
    requests.get(`/profiles/${username}/follow?followers=${followers}`)
};

const UserActivities = {
  past: (username) => requests.get(`/profiles/${username}/activities?past=true`),
  future: (username) => requests.get(`/profiles/${username}/activities?future=true`),
  hosting: (username) => requests.get(`/profiles/${username}/activities?hosting=true`)
}

export default {
  Activities,
  Users,
  Profiles,
  UserActivities
};
