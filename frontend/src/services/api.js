import axios from 'axios';

// Use empty string to route through Vite proxy in development
const BASE_URL = '';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor – attach JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('crm_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor – handle 401
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('crm_token');
            localStorage.removeItem('crm_user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

// ─── Auth ───────────────────────────────────────────────────────────────────
export const authService = {
    login: (data) => api.post('/api/auth/login', data),
    register: (data) => api.post('/api/auth/register', data),
};

// ─── Dashboard ──────────────────────────────────────────────────────────────
export const dashboardService = {
    get: () => api.get('/api/dashboard'),
};

// ─── Leads ──────────────────────────────────────────────────────────────────
export const leadsService = {
    getAll: () => api.get('/api/leads'),
    create: (data) => api.post('/api/leads', data),
    update: (id, data) => api.put(`/api/leads/${id}`, data),
    delete: (id) => api.delete(`/api/leads/${id}`),
    convert: (leadId) => api.post(`/api/leads/convert/${leadId}`),
};

// ─── Customers ──────────────────────────────────────────────────────────────
export const customersService = {
    getAll: () => api.get('/api/customers'),
    create: (data) => api.post('/api/customers', data),
    update: (id, data) => api.put(`/api/customers/${id}`, data),
    delete: (id) => api.delete(`/api/customers/${id}`),
};

// ─── Deals ──────────────────────────────────────────────────────────────────
export const dealsService = {
    getAll: () => api.get('/api/deals'),
    create: (customerId, userId, data) => api.post(`/api/deals/${customerId}/${userId}`, data),
    update: (id, data) => api.put(`/api/deals/${id}`, data),
};

// ─── Tasks ──────────────────────────────────────────────────────────────────
export const tasksService = {
    getAll: () => api.get('/api/tasks'),
    create: (userId, customerId, data) => api.post(`/api/tasks/${userId}/${customerId}`, data),
    update: (id, data) => api.put(`/api/tasks/${id}`, data),
    delete: (id) => api.delete(`/api/tasks/${id}`),
};

// ─── Interactions ────────────────────────────────────────────────────────────
export const interactionsService = {
    getAll: () => api.get('/api/interactions'),
    create: (data) => api.post('/api/interactions/send', data),
};

// ─── Tickets ────────────────────────────────────────────────────────────────
export const ticketsService = {
    getAll: () => api.get('/api/tickets'),
    create: (customerId, userId, data) => api.post(`/api/tickets/${customerId}/${userId}`, data),
    update: (id, data) => api.put(`/api/tickets/${id}`, data),
    delete: (id) => api.delete(`/api/tickets/${id}`),
    resolve: (ticketId) => api.put(`/api/tickets/resolve/${ticketId}`),
};

// ─── Campaigns ──────────────────────────────────────────────────────────────
export const campaignsService = {
    getAll: () => api.get('/api/campaigns'),
    create: (data) => api.post('/api/campaigns', data),
    update: (id, data) => api.put(`/api/campaigns/${id}`, data),
    delete: (id) => api.delete(`/api/campaigns/${id}`),
};

// ─── Ads ────────────────────────────────────────────────────────────────────
export const adsService = {
    getAll: () => api.get('/api/ads'),
    create: (campaignId, data) => api.post(`/api/ads/${campaignId}`, data),
    update: (id, data) => api.put(`/api/ads/${id}`, data),
    delete: (id) => api.delete(`/api/ads/${id}`),
};

// ─── Reports ────────────────────────────────────────────────────────────────
// No /api/reports endpoint exists — aggregate from real endpoints client-side
export const reportsService = {
    getAll: () =>
        Promise.allSettled([
            api.get('/api/leads'),
            api.get('/api/customers'),
            api.get('/api/deals'),
            api.get('/api/tickets'),
        ]).then(([leadsRes, customersRes, dealsRes, ticketsRes]) => ({
            data: {
                leads: leadsRes.status === 'fulfilled' ? leadsRes.value.data : null,
                customers: customersRes.status === 'fulfilled' ? customersRes.value.data : null,
                deals: dealsRes.status === 'fulfilled' ? dealsRes.value.data : null,
                tickets: ticketsRes.status === 'fulfilled' ? ticketsRes.value.data : null,
            }
        })),
};

