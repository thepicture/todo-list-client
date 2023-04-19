import * as React from 'react';

import { storeApi } from 'shared/api';

import { TaskItemContainer } from 'shared/ui/container';

export const Task = ({ task }: { task: storeApi.Task }) => {
	return <TaskItemContainer task={task} />;
};
