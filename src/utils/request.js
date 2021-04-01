import axios from 'axios';
import { requestDomain } from './domain';
export const request = axios.create({ baseURL: requestDomain });

// 'https://shipcheck-server-vrxqx.run.goorm.io/'
// 127.0.0.1:8000