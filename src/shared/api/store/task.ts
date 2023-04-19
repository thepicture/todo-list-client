import { makeAutoObservable, runInAction } from 'mobx';

import {
	DEFAULT_FILTER,
	FilterEntry,
	getFilterById,
} from 'features/task-filters';
import { RootStore } from './model';
import { User } from './user';
import { makePersistable } from 'mobx-persist-store';
import { storeApi } from '..';
import { DEFAULT_EDITING_TASK } from './config';

export type Task = {
	id: number;
	title: string;
	description?: string;

	deadlineTimestamp: number;
	creationTimestamp: number;
	updateTimestamp: number;

	priority: string;
	status: string;

	creatorId: number;
	responsibleUserId: number;
	responsibleUser: User;
};

export class TaskStore {
	rootStore: RootStore;
	isLoading: boolean = false;
	tasks: Task[] = [];
	filter: FilterEntry = getFilterById(DEFAULT_FILTER);
	error: string = '';

	editingTask?: storeApi.Task = DEFAULT_EDITING_TASK();

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		makeAutoObservable(this, {
			rootStore: false,
		});

		makePersistable(this, {
			name: 'TaskStore',
			properties: ['tasks', 'editingTask'],
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

	get canTaskSave() {
		return (
			Boolean(this.editingTask) &&
			this.editingTask.title &&
			this.editingTask.priority &&
			this.editingTask.status &&
			this.editingTask.responsibleUserId
		);
	}

	get isNewTask() {
		return this.editingTask.id === 0;
	}

	get canUserChangeTask() {
		if (!this.rootStore.isCurrentUserDirector && !this.isNewTask) {
			return false;
		}

		return true;
	}

	applyFilter(filter: FilterEntry) {
		this.filter = filter;
	}

	saveTask() {
		this.rootStore.transportLayer
			.saveTask(this.editingTask)
			.then(async (response) => {
				if (response.ok) {
					runInAction(() => {
						this.rootStore.uiStore.isTaskFormOpen = false;
						this.editingTask = null;
						this.loadTasks();
						this.rootStore.uiStore.notify('Задача сохранена');
					});
				} else {
					this.rootStore.uiStore.notify(await response.text());
				}
			})
			.catch((error: Error) => {
				this.rootStore.uiStore.notify(
					`Не удалось сохранить задачу. ${
						error.message || 'Неизвестная ошибка'
					}`
				);
			});
	}
}
