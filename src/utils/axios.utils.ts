import axios from 'axios';

/**
 * @description Cater cookies and authentication for first-time access within route loadData
 */
class AuthAxiosInstance {
  private axiosInstance;
  private static _instance: AuthAxiosInstance | null = null;

  constructor(token?: string) {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3001',
    });

    if (typeof window === 'undefined') {
      this.axiosInstance.defaults.headers['Cookie'] = `auth=${token}`;
    }
  }

  static getInstance(token?: string) {
    if (this._instance === null) {
      this._instance = new AuthAxiosInstance(token);
    }

    return this._instance;
  }

  getAuthAxiosInstance() {
    return this.axiosInstance;
  }
}

export default AuthAxiosInstance;
