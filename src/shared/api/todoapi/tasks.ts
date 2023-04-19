import { storeApi } from '..';
import { Task } from '../store/task';
import { TASKS_URL } from './config';

export const fetchTasks = (): Promise<Task[]> =>
	fetch(TASKS_URL, {
		credentials: 'include',
		headers: {
			'content-type': 'application/json',
		},
	}).then((response) => response.json());

export const saveTask = (task: storeApi.Task): Promise<Response> =>
	fetch(TASKS_URL, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(task),
	});
