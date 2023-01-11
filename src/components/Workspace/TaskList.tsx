import { motion, Variants } from "framer-motion";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { ITask } from "../../typeinterfaces/types";
import Task from "./Task";
import TaskAddButton from "./TaskAddButton";

interface IPropsTask {
  taskList: ITask[];
}
export const item: Variants = {
  visible: {
    opacity: [0, 1],
    y: [-100, 30, 0],
  },
};
const TaskList: FC<IPropsTask> = ({ taskList }) => {
  // /const { taskList } = useSelector((state: RootState) => state.viewTaskSlice);

  return (
    <>
      {taskList.map((task) => (
        <motion.article key={task.id} variants={item}>
          <Task task={task} />
        </motion.article>
      ))}
      <TaskAddButton />
      <Outlet />
    </>
  );
};

export default TaskList;
