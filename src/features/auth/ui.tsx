import React, { useState } from 'react';
import { Button, TextField, useMediaQuery } from '@mui/material';

import { observer } from 'mobx-react-lite';

import { storeApi } from 'shared/api';
import { MOBILE_SCREEN } from 'shared/config';
import { Card, Heading, Logo } from 'shared/ui/presentational';

export const Auth = observer(() => {
	const { userStore } = storeApi.useStoreContext();

	const [fields, setFields] = useState({
		login: '',
		password: '',
	});

	const isMobileScreen = useMediaQuery(MOBILE_SCREEN);

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
			style={{
				minWidth: isMobileScreen ? 'unset' : 500,
				...{
					...(isMobileScreen && {
						position: 'fixed',
						left: 0,
						width: '100vw',
					}),
				},
			}}
		>
			<Card noBordersOnMobile>
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
