import api from '../config/api';

export const getStats = (country = 'AR') => api.get('', { countryTimeline: country });

export const getTotalStats = (country = 'AR') => api.get('', { countryTotal: country });

