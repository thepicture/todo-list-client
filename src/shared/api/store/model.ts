import { createContext, useContext } from 'react';

import { makePersistable } from 'mobx-persist-store';

import { TaskStore } from './task';
import { UserStore } from './user';

import * as todoApi from 'shared/api/todoapi';
import { computed, makeObservable, observable, runInAction } from 'mobx';

import { UiStore } from './ui';

export type ISessionUser = {
	id: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	login: string;
	expiresAtTimestamp: number;
	director?: ISessionUser;
	directorId?: number;
};

export class RootStore {
	userStore: UserStore;
	taskStore: TaskStore;
	uiStore: UiStore;

	transportLayer: typeof todoApi;

	currentUser: ISessionUser = null;

	constructor() {
		this.userStore = new UserStore(this);
		this.taskStore = new TaskStore(this);
		this.uiStore = new UiStore(this);
		this.transportLayer = todoApi;

		makeObservable(this, {
			currentUser: observable,
			isCurrentUserDirector: computed,
		});

		makePersistable(this, {
			name: 'RootStore',
			properties: ['currentUser'],
			storage: localStorage,
		});
	}

	get isCurrentUserDirector() {
		return this.currentUser.directorId === null;
	}

	signout() {
		runInAction(() => {
			this.currentUser = null;
		});
	}
}

export const rootStoreInstance = new RootStore();

export const Context = createContext<RootStore>(rootStoreInstance);

export const useStoreContext = () => useContext<RootStore>(Context);
