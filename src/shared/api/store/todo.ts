import { RootStore } from './model';

export class TodoStore {
	rootStore: RootStore;

	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}
}
