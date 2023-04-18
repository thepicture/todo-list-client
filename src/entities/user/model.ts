type User = {
	firstName: string;
	lastName: string;
	patronymic: string;

	login: string;
	password: string;

	director: User;
};
