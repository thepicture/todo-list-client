import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

import { RootStore } from './model';

export class UiStore {
	rootStore: RootStore;

	notificationMessage: string = '';
	isNotificationOpen: boolean = false;

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
}
