import { makeAutoObservable } from 'mobx';
import { TOMORROW } from './config';
import { RootStore } from './model';

export class UserStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;

		makeAutoObservable(this, {
			rootStore: false,
		});
	}

	authenticate(login: string, password: string) {
		this.rootStore.transportLayer
			.authenticate(login, password)
			.then(async (response) => {
				if (response.ok) {
					const body = await response.json();
					this.rootStore.currentUser = {
						...body,
						expiresAtTimestamp: TOMORROW(),
					};

					this.rootStore.uiStore.notify('Вход выполнен');
					return;
				}

				this.rootStore.uiStore.notify(await response.text());
			})
			.catch((error) => {
				this.rootStore.uiStore.notify(error.message);
			});
	}
}
