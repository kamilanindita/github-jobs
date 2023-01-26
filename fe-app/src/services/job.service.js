import axios from 'axios';
import authHeader from './auth-header';

// const API_URL = 'http://dev3.dansmultipro.co.id/api/recruitment/positions';
const API_URL = 'http://127.0.0.1:8080/jobs';

class JobService {
  getList(page) {
    return axios.get(`${API_URL}?page=${page}`, { headers: authHeader() });
  }

  getDetail(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  getFilter(query) {
    return axios.get(`${API_URL}/filter?${query}`, );
  }
}

export default new JobService();
