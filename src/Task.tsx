import { Trash } from "phosphor-react";
import styles from "./Task.module.css";

interface TaskProps {
  id: string;
  description: string;
  isDone: boolean;
  onDeleteTask: (taskId: string) => void;
  onChangeTask: (taskId: string) => void;
}
export function Task({
  id,
  description,
  isDone,
  onDeleteTask,
  onChangeTask,
}: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(id);
  }

  function handleUpdateTask() {
    onChangeTask(id);
  }

  return (
    <div className={styles.task}>
      <input type="checkbox" id={id} onChange={handleUpdateTask} />
      <label htmlFor={id} className="label">
        {description}
      </label>
      <button onClick={handleDeleteTask} title="Deletar Tarefa">
        <Trash size={25} />
      </button>
    </div>
  );
}
