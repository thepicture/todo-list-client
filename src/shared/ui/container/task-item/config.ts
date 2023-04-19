export const DATE_LOCALE = 'ru';
export const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
	day: 'numeric',
	month: 'long',
	weekday: 'long',
};

export class TaskStatuses {
	static DONE = 'done';
	static CANCELLED = 'cancelled';
}
