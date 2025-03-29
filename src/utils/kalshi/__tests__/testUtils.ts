
import { AxiosResponse } from 'axios';

/**
 * Helper function to create a mock Axios response
 */
export function createMockResponse<T>(data: T, status = 200): Promise<AxiosResponse<T>> {
  const response: AxiosResponse<T> = {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: { headers: {} } as any
  };
  
  return Promise.resolve(response);
}

/**
 * Helper function to create a mock error response
 */
export function createMockErrorResponse(status = 500, message = 'Internal Server Error'): Promise<never> {
  const error: any = new Error(message);
  error.response = {
    status,
    statusText: message,
    data: { error: message }
  };
  
  return Promise.reject(error);
}
