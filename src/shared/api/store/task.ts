import { makeAutoObservable, observable, runInAction } from 'mobx';

import {
	DEFAULT_FILTER,
	FilterEntry,
	getFilterById,
} from 'features/task-filters';
import { RootStore } from './model';
import { User } from './user';
import { makePersistable } from 'mobx-persist-store';

export type Task = {
	id: number;
	title: string;
	description?: string;

	deadlineTimestamp: number;
	creationTimestamp: number;
	updateTimestamp: number;

	priority: string;
	status: string;

	responsibleUserId: number;
	responsibleUser: User;
};

export class TaskStore {
	rootStore: RootStore;
	isLoading: boolean = false;
	tasks: Task[] = [];
	filter: FilterEntry = getFilterById(DEFAULT_FILTER);
	error: string = '';

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		makeAutoObservable(this, {
			rootStore: false,
		});

		makePersistable(this, {
			name: 'TaskStore',
			properties: ['tasks'],
			storage: localStorage,
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

	get filteredTasks() {
		return getFilterById(this.filter.id).map(this.tasks);
	}

	applyFilter(filter: FilterEntry) {
		this.filter = filter;
	}
}
