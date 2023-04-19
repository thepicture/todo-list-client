import { makeAutoObservable, runInAction } from 'mobx';
import { storeApi } from '..';
import { DEFAULT_EDITING_TASK } from './config';

import { RootStore } from './model';

export class UiStore {
	rootStore: RootStore;

	notificationMessage: string = '';
	isNotificationOpen: boolean = false;
	isTaskFormOpen: boolean = false;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		makeAutoObservable(this, {
			rootStore: false,
		});
	}

	notify(message: string) {
		runInAction(() => {
			this.notificationMessage = message;
			this.isNotificationOpen = true;
		});
	}

	closeNotification() {
		this.isNotificationOpen = false;
	}

	openTaskForm(editingTask?: storeApi.Task) {
		runInAction(async () => {
			this.rootStore.userStore.loadResponsibleUsers();

			if (editingTask) {
				this.rootStore.taskStore.editingTask = editingTask;
			} else {
				this.rootStore.taskStore.editingTask = DEFAULT_EDITING_TASK();
				this.rootStore.taskStore.editingTask.responsibleUserId =
					this.rootStore.userStore.responsibleUsers[0]?.id || 0;
			}

			this.isTaskFormOpen = true;
		});
	}

	closeTaskForm() {
		this.isTaskFormOpen = false;
		this.rootStore.taskStore.editingTask = null;
	}
}
