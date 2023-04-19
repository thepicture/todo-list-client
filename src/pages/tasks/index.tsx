import React, { useEffect } from 'react';

import { Button, IconButton, Tooltip } from '@mui/material';

import { ExitToApp } from '@mui/icons-material';

import { observer } from 'mobx-react-lite';

import { useNavigate } from 'react-router-dom';

import { Task } from 'entities/task';
import { useStoreContext } from 'shared/api/store';
import { TaskContainer } from 'shared/ui/container';
import { Header, Heading, Logo, Paragraph } from 'shared/ui/presentational';
import { AUTH_PATH } from 'shared/config';
import { Loading } from 'processes/loading';
import { TaskFilters } from 'features/task-filters';
import { storeApi } from 'shared/api';

const TasksPage = observer(() => {
	const navigate = useNavigate();

	const { taskStore } = useStoreContext();

	useEffect(() => {
		taskStore.loadTasks();
	}, [taskStore.tasks.length]);

	const tasks = taskStore.filteredTasks;

	return (
		<>
			<Header title="Задачи" logo={<Logo />}>
				<TaskFilters />
				<Tooltip title="Назначить новую задачу в список">
					<Button variant="outlined">Новая задача</Button>
				</Tooltip>
				<Tooltip
					title="Выйти из аккаунта"
					onClick={() => {
						taskStore.rootStore.signout();
						navigate(AUTH_PATH);
						taskStore.rootStore.uiStore.notify('Выход успешен');
					}}
				>
					<IconButton>
						<ExitToApp color="secondary" />
					</IconButton>
				</Tooltip>
			</Header>
			<TaskContainer>
				{taskStore.isLoading ? (
					<Loading />
				) : taskStore.error ? (
					<Paragraph>
						Не удалось подгрузить задачи.{' '}
						{taskStore.error || 'Неизвестная ошибка'}
					</Paragraph>
				) : Array.isArray(tasks) ? (
					tasks.length === 0 ? (
						<Paragraph>Задач нет</Paragraph>
					) : (
						tasks.map((task) => <Task key={task.id} task={task} />)
					)
				) : (
					Object.keys(tasks).map((groupKey) => (
						<section
							key={groupKey}
							style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
						>
							<Heading>{tasks[groupKey].key}</Heading>
							<section
								style={{
									display: 'grid',
									gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
									gap: 16,
								}}
							>
								{tasks[groupKey].entries.length === 0 ? (
									<Paragraph>Задач нет</Paragraph>
								) : (
									tasks[groupKey].entries.map((task: storeApi.Task) => (
										<Task key={task.id} task={task} />
									))
								)}
							</section>
						</section>
					))
				)}
			</TaskContainer>
		</>
	);
});

export default TasksPage;
