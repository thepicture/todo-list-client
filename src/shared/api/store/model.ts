import { createContext, useContext } from 'react';

import { makePersistable } from 'mobx-persist-store';

import { TodoStore } from './todo';
import { UserStore } from './user';

import * as todoApi from 'shared/api/todoapi';
import { makeObservable, observable } from 'mobx';
import { UiStore } from './ui';

export type ISessionUser = {
	id: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	login: string;
	expiresAtTimestamp: number;
	director?: ISessionUser;
};

export class RootStore {
	userStore: UserStore;
	todoStore: TodoStore;
	uiStore: UiStore;

	transportLayer: typeof todoApi;

	currentUser: ISessionUser = null;

	constructor() {
		this.userStore = new UserStore(this);
		this.todoStore = new TodoStore(this);
		this.uiStore = new UiStore(this);
		this.transportLayer = todoApi;

		makeObservable(this, {
			currentUser: observable,
		});

		makePersistable(this, {
			name: 'RootStore',
			properties: ['currentUser'],
			storage: localStorage,
		});
	}
}

export const rootStoreInstance = new RootStore();

export const Context = createContext<RootStore>(rootStoreInstance);

export const useStoreContext = () => useContext<RootStore>(Context);
