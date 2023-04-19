export const TOMORROW = () => Date.now() + 1000 * 60 * 60 * 24;

export const DEFAULT_EDITING_TASK = () => ({
	id: 0,
	title: '',
	description: '',
	status: 'todo',
	priority: 'medium',
	deadlineTimestamp: TOMORROW(),
	creationTimestamp: 0,
	updateTimestamp: 0,
	responsibleUserId: 0,
	creatorId: 0,
	responsibleUser: null,
});
