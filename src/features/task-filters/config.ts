import { storeApi } from 'shared/api';

const TOMORROW = 1;
const IN_A_WEEK = 7;

export type FilterEntry = {
	id: number;
	title: string;
	forDirectorOnly: boolean;
	map: (tasks: storeApi.Task[]) => GroupResult | storeApi.Task[];
};

export type GroupResult = {
	[key: string]: { key: string; entries: storeApi.Task[] };
};

export const filters: Record<number, FilterEntry> = {
	1: {
		id: 1,
		title: 'дата завершения',
		forDirectorOnly: false,
		map: (tasks: storeApi.Task[]): GroupResult => {
			return tasks.reduce(
				(groups, task) => {
					const currentDate = new Date();
					currentDate.setHours(0, 0, 0, 0);

					if (task.deadlineTimestamp < Number(currentDate)) {
						return groups;
					}

					const tomorrow = new Date();
					tomorrow.setDate(currentDate.getDate() + TOMORROW);

					const nextWeek = new Date();
					nextWeek.setDate(currentDate.getDate() + IN_A_WEEK);

					if (task.deadlineTimestamp < Number(tomorrow)) {
						groups.today.entries.push(task);
					} else if (task.deadlineTimestamp < Number(nextWeek)) {
						groups.thisWeek.entries.push(task);
					} else {
						groups.inFuture.entries.push(task);
					}

					return groups;
				},
				{
					today: { key: 'На сегодня', entries: [] },
					thisWeek: { key: 'На неделю', entries: [] },
					inFuture: { key: 'На будущее', entries: [] },
				}
			);
		},
	},
	2: {
		id: 2,
		title: 'ответственные',
		forDirectorOnly: true,
		map: (tasks: storeApi.Task[]): GroupResult => {
			return tasks.reduce((groups, task) => {
				if (!groups[task.responsibleUserId]) {
					const { lastName, firstName, patronymic } = task.responsibleUser;
					const fullName = `${lastName} ${firstName} ${patronymic}`;
					groups[task.responsibleUserId] = { key: fullName, entries: [] };
				}

				groups[task.responsibleUserId].entries.push(task);

				return groups;
			}, {});
		},
	},
	3: {
		id: 3,
		title: 'без группировок',
		forDirectorOnly: false,
		map: (tasks: storeApi.Task[]) =>
			tasks
				.slice()
				.sort((task1, task2) => task2.updateTimestamp - task1.updateTimestamp),
	},
};

export const getFilterById = (id: number) => filters[id];

export const filterList = Object.values(filters);

export const DEFAULT_FILTER = 1;
