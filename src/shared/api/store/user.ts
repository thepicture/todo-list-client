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

					alert('Вход выполнен');
					return;
				}

				alert(await response.text());
			})
			.catch((error) => {
				alert(error.message);
			});
	}
}
