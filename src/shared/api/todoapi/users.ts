import { AUTH_URL } from './config';

export const authenticate = (login: string, password: string) =>
	fetch(AUTH_URL, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			login,
			password,
		}),
	});