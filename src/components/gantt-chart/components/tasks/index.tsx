import { Task, TaskProps } from '../task';
import './styles/index.less';

export function Tasks(props: TasksProps) {
  const { subTasks, ...rest } = props;
  if (Array.isArray(subTasks)) {
    return <div className="gantt-chart-tasks"></div>;
  }
  return (
    <div className="gantt-chart-tasks">
      <Task {...rest} />
    </div>
  );
}

export interface TasksProps extends TaskProps {
  subTasks?: TaskProps[];
}
