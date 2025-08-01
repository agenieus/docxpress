class ApiService {
  static baseUrl = 'https://your-api-domain.com/api';

  static async request(endpoint, method = 'GET', data = null, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SessionManager.getToken()}`
    };

    const config = {
      method,
      headers,
      ...options
    };

    if (data) {
      if (data instanceof FormData) {
        config.body = data;
        delete headers['Content-Type']; // Let browser set content-type for FormData
      } else {
        config.body = JSON.stringify(data);
      }
    }

    try {
      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Request failed');
      }

      return responseData;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  static get(endpoint) {
    return this.request(endpoint);
  }

  static post(endpoint, data) {
    return this.request(endpoint, 'POST', data);
  }

  static put(endpoint, data) {
    return this.request(endpoint, 'PUT', data);
  }

  static delete(endpoint) {
    return this.request(endpoint, 'DELETE');
  }
}