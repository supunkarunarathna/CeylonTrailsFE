import client from './client';

export const authApi = {
  register: (data) => client.post('/auth/register', data).then((r) => r.data),
  login: (data) => client.post('/auth/login', data).then((r) => r.data),
  me: () => client.get('/auth/me').then((r) => r.data),
};

export const toursApi = {
  list: (params) => client.get('/tours', { params }).then((r) => r.data),
  getBySlug: (slug) => client.get(`/tours/${slug}`).then((r) => r.data),
};

export const hotelsApi = {
  list: (params) => client.get('/hotels', { params }).then((r) => r.data),
  getBySlug: (slug) => client.get(`/hotels/${slug}`).then((r) => r.data),
};

export const destinationsApi = {
  list: (params) => client.get('/destinations', { params }).then((r) => r.data),
  getBySlug: (slug) => client.get(`/destinations/${slug}`).then((r) => r.data),
};

export const testimonialsApi = {
  list: () => client.get('/testimonials').then((r) => r.data),
  create: (data) => client.post('/testimonials', data).then((r) => r.data),
};

export const blogApi = {
  list: () => client.get('/blog').then((r) => r.data),
  getBySlug: (slug) => client.get(`/blog/${slug}`).then((r) => r.data),
};

export const contactApi = {
  submit: (data) => client.post('/contact', data).then((r) => r.data),
  adminList: (params) => client.get('/contact', { params }).then((r) => r.data),
  updateStatus: (id, status) => client.put(`/contact/${id}/status`, { status }).then((r) => r.data),
};

export const itineraryApi = {
  build: (data) => client.post('/itineraries/build', data).then((r) => r.data),
  mine: () => client.get('/itineraries/mine').then((r) => r.data),
  adminList: (params) => client.get('/itineraries/admin', { params }).then((r) => r.data),
};
