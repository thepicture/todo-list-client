import { Input, Button, TextField } from '@mui/material';
import { when } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { storeApi } from 'shared/api';
import { Card, Heading, Logo } from 'shared/ui/presentational';

export const Auth = observer(() => {
	const [fields, setFields] = useState({
		login: '',
		password: '',
	});
	const { userStore } = storeApi.useStoreContext();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFields({
			...fields,
			[name]: value,
		});
	};

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				userStore.authenticate(fields.login, fields.password);
			}}
		>
			<Card>
				<Logo />
				<Heading>Вход в систему</Heading>
				<TextField
					label="Логин"
					autoComplete="username"
					name="login"
					value={fields.login}
					onChange={handleChange}
				/>
				<TextField
					label="Пароль"
					type="password"
					autoComplete="current-password"
					name="password"
					value={fields.password}
					onChange={handleChange}
				/>
				<Button type="submit">Войти</Button>
			</Card>
		</form>
	);
});
