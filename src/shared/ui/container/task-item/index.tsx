import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

import { storeApi } from 'shared/api';
import { DATE_LOCALE, DATE_OPTIONS, TaskStatuses } from './config';
import { CardButton } from 'shared/ui/presentational/card-button';
import { Avatar, Priority, Row, Status } from 'shared/ui/presentational';
import { Box } from '@mui/material';

export const TaskItem = ({ task }: { task: storeApi.Task }) => (
	<Card>
		<CardButton>
			<CardHeader
				avatar={
					<Avatar
						title={task.responsibleUser.firstName[0]}
						tooltip={`ответственный ${task.responsibleUser.lastName} ${task.responsibleUser.firstName} ${task.responsibleUser.patronymic}`}
					/>
				}
				title={task.title}
				titleTypographyProps={{
					color:
						![TaskStatuses.DONE, TaskStatuses.CANCELLED].includes(
							task.status
						) && task.deadlineTimestamp < Date.now()
							? 'error'
							: task.status === TaskStatuses.DONE
							? 'green'
							: 'gray',
				}}
				subheader={
					<>
						<Row>
							<InsertInvitationIcon sx={{ alignItems: 'center' }} />
							дедлайн{' '}
							{new Date(task.deadlineTimestamp).toLocaleString(
								DATE_LOCALE,
								DATE_OPTIONS
							)}
						</Row>
						<Box mt={1}>
							<Row>
								<Status status={task.status} />
								<Priority priority={task.priority} />
							</Row>
						</Box>
					</>
				}
			/>

			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{task.description}
				</Typography>
			</CardContent>
		</CardButton>
	</Card>
);
