import { create } from 'axios';

import type { AxiosInstance } from 'axios';

export const api: AxiosInstance = create({
  baseURL: 'https://new-stellarburgers.education-services.ru/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
