import React, { useEffect } from 'react';

import { Button, IconButton, Tooltip } from '@mui/material';

import { ExitToApp } from '@mui/icons-material';

import { observer } from 'mobx-react-lite';

import { Task } from 'entities/task';
import { useStoreContext } from 'shared/api/store';
import { TaskContainer } from 'shared/ui/container';
import { Header, Paragraph } from 'shared/ui/presentational';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATH } from 'shared/config';
import { Loading } from 'processes/loading';

const TasksPage = observer(() => {
	const navigate = useNavigate();

	const store = useStoreContext();

	useEffect(() => {
		store.taskStore.loadTasks();
	}, [store.taskStore.tasks.length]);

	return (
		<>
			<Header title="Задачи">
				<Tooltip title="Назначить новую задачу в список">
					<Button variant="outlined">Новая задача</Button>
				</Tooltip>
				<Tooltip
					title="Выйти из аккаунта"
					onClick={() => {
						store.signout();
						navigate(AUTH_PATH);
						store.uiStore.notify('Выход успешен');
					}}
				>
					<IconButton>
						<ExitToApp color="secondary" />
					</IconButton>
				</Tooltip>
			</Header>
			<TaskContainer>
				{store.taskStore.isLoading ? (
					<Loading />
				) : store.taskStore.error ? (
					<Paragraph>
						Не удалось подгрузить задачи.{' '}
						{store.taskStore.error || 'Неизвестная ошибка'}
					</Paragraph>
				) : (
					store.taskStore.tasks.map((task) => (
						<Task key={task.id} task={task} />
					))
				)}
			</TaskContainer>
		</>
	);
});

export default TasksPage;
