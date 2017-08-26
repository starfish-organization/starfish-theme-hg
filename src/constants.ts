import { environment } from './environments/environment';

export const API_ENDPOINT = environment.production ? '' : 'http://localhost:8022';
