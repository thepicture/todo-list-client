import * as React from 'react';

import dayjs from 'dayjs';

import { observer } from 'mobx-react-lite';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import {
	InputLabel,
	MenuItem,
	Select,
	Slide,
	useMediaQuery,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import { storeApi } from 'shared/api';
import { MOBILE_SCREEN } from 'shared/config';
import { Paragraph } from 'shared/ui/presentational';
import { ResponsiveContentContainer } from 'shared/ui/container';
import { TASK_PRIORITIES, TASK_STATUSES } from './config';
import { runInAction } from 'mobx';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export const Form = observer(() => {
	const rootStore = storeApi.useStoreContext();
	const isMobileScreen = useMediaQuery(MOBILE_SCREEN);

	const handleClose = () => {
		rootStore.uiStore.closeTaskForm();
	};

	if (!rootStore.uiStore.isTaskFormOpen) {
		return null;
	}

	return (
		<Dialog
			{...(isMobileScreen && { fullScreen: true })}
			open={rootStore.uiStore.isTaskFormOpen}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<DialogTitle>Редактирование задачи</DialogTitle>
			<ResponsiveContentContainer>
				{rootStore.taskStore.canUserChangeTask && (
					<>
						<TextField
							autoFocus
							label="Заголовок"
							type="text"
							autoComplete="off"
							required
							value={rootStore.taskStore.editingTask.title}
							onChange={(event) => {
								runInAction(() => {
									rootStore.taskStore.editingTask.title = event.target.value;
								});
							}}
						/>
						<TextField
							label="Описание"
							type="text"
							autoComplete="off"
							multiline={true}
							value={rootStore.taskStore.editingTask.description || ''}
							onChange={(event) => {
								runInAction(() => {
									rootStore.taskStore.editingTask.description =
										event.target.value;
								});
							}}
						/>
						<InputLabel id="priority">Приоритет</InputLabel>
						<Select
							labelId="priority"
							required
							value={rootStore.taskStore.editingTask.priority}
							onChange={(event) => {
								runInAction(() => {
									rootStore.taskStore.editingTask.priority = event.target.value;
								});
							}}
						>
							{TASK_PRIORITIES.map((priority) => (
								<MenuItem key={priority.value} value={priority.value}>
									<em>{priority.title}</em>
								</MenuItem>
							))}
						</Select>
						<MobileDateTimePicker
							label="Дата окончания"
							value={dayjs(rootStore.taskStore.editingTask.deadlineTimestamp)}
							onChange={(event) => {
								runInAction(() => {
									rootStore.taskStore.editingTask.deadlineTimestamp =
										event.get('milliseconds');
								});
							}}
						/>
					</>
				)}
				<InputLabel id="status">Статус</InputLabel>
				<Select
					labelId="status"
					required
					value={rootStore.taskStore.editingTask.status}
					onChange={(event) => {
						runInAction(() => {
							rootStore.taskStore.editingTask.status = event.target.value;
						});
					}}
				>
					{TASK_STATUSES.map((status) => (
						<MenuItem key={status.value} value={status.value}>
							<em>{status.title}</em>
						</MenuItem>
					))}
				</Select>
				{rootStore.taskStore.canUserChangeTask && (
					<>
						<InputLabel id="responsible">Ответственный</InputLabel>
						{rootStore.userStore.areResponsibleUsersLoading ? (
							<Paragraph>Загрузка подчинённых...</Paragraph>
						) : rootStore.userStore.error ? (
							<Paragraph>
								Ошибка при подгрузке подчинённых. {rootStore.userStore.error}
							</Paragraph>
						) : rootStore.taskStore.editingTask.responsibleUserId ===
						  0 ? null : (
							<Select
								labelId="responsible"
								value={
									rootStore.userStore.responsibleUsers?.some(
										(user) =>
											user.id ===
											rootStore.taskStore.editingTask.responsibleUserId
									)
										? rootStore.taskStore.editingTask.responsibleUserId
										: ''
								}
								onChange={(event) => {
									runInAction(() => {
										rootStore.taskStore.editingTask.responsibleUserId = event
											.target.value as number;
									});
								}}
							>
								{rootStore.userStore.responsibleUsers.map((user) => (
									<MenuItem key={user.id} value={user.id}>
										<em>{`${user.lastName} ${user.firstName} ${user.patronymic}`}</em>
									</MenuItem>
								))}
							</Select>
						)}
					</>
				)}
			</ResponsiveContentContainer>
			<DialogActions>
				<Button onClick={handleClose}>Отмена</Button>
				<Button
					onClick={() => rootStore.taskStore.saveTask()}
					disabled={!rootStore.taskStore.canTaskSave}
				>
					Сохранить
				</Button>
			</DialogActions>
		</Dialog>
	);
});
