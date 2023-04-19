import { User } from '../store/user';
import { AUTH_URL, RESPONSIBLE_USERS_URL } from './config';

export const authenticate = (login: string, password: string) =>
	fetch(AUTH_URL, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			login,
			password,
		}),
	});

export const getMyResponsibleUsers = () =>
	fetch(RESPONSIBLE_USERS_URL, {
		credentials: 'include',
		headers: {
			'content-type': 'application/json',
		},
	}).then((response) => response.json() as unknown as User[]);
