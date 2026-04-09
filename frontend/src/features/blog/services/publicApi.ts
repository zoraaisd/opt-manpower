import axios from 'axios';
import { API_BASE_URL } from '../config';

export type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

export type ApiEnvelope<T> = {
  success?: boolean;
  message?: string;
  data: T;
  meta?: ApiMeta;
};

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const publicApi = client;
