import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from './model';
import { User } from './user';

export type Task = {
	id: number;
	title: string;
	description?: string;

	deadlineTimestamp: number;
	creationTimestamp: number;
	updateTimestamp: number;

	priority: string;
	status: string;

	responsibleUser: User;
};

export class TaskStore {
	rootStore: RootStore;
	isLoading: boolean = false;
	tasks: Task[] = [];
	error: string = '';

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		makeAutoObservable(this, {
			rootStore: false,
		});
	}

	loadTasks() {
		this.rootStore.transportLayer
			.fetchTasks()
			.then((tasks) => {
				runInAction(() => {
					this.tasks = tasks;
					this.isLoading = false;
				});
			})
			.catch((error: Error) => {
				runInAction(() => {
					this.tasks = [];
					this.error = error.message || 'Неизвестная ошибка';
					this.isLoading = false;
				});
			});
	}
}
