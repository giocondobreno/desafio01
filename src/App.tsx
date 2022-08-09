import todoClipboard from "./assets/Clipboard.svg";
import "./global.css";
import styles from "./App.module.css";
import { PlusCircle } from "phosphor-react";
import { Header } from "./Header";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./Task";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";

export type TaskType = {
  id: string;
  description: string;
  isDone: boolean;
};

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newDescriptionTask, setNewDescriptionTask] = useState("");

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();
    setTasks([
      {
        id: uuidv4(),
        description: newDescriptionTask,
        isDone: false,
      },
      ...tasks,
    ]);
    setNewDescriptionTask("");
  }

  function handleNewDescriptionTaskChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    event.target.setCustomValidity("");
    setNewDescriptionTask(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório.");
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskId;
    });
    setTasks(tasksWithoutDeletedOne);
  }

  function handleToggleTaskAsDone(taskId: string) {
    const tasksUpdated = [...tasks];
    const taskSelectedIndex = tasksUpdated.findIndex(
      (task) => task.id === taskId
    );
    tasksUpdated[taskSelectedIndex].isDone =
      !tasksUpdated[taskSelectedIndex].isDone;
    setTasks(tasksUpdated);
  }

  function totalCreateTasks() {
    return tasks.length;
  }

  function totalDoneTasks() {
    return tasks.reduce((acc, current) => {
      return current.isDone ? acc + 1 : acc;
    }, 0);
  }

  return (
    <>
      <Header />

      <div className={styles.wraper}>
        <form onSubmit={handleCreateTask} className={styles.newTask}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            required
            onChange={handleNewDescriptionTaskChange}
            onInvalid={handleNewCommentInvalid}
            value={newDescriptionTask}
          />
          <button type="submit">
            Criar
            <PlusCircle />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.createdTasks}>
              <span className={styles.description}>Tarefas criadas</span>
              <span className={styles.total}>{totalCreateTasks()}</span>
            </div>

            <div className={styles.doneTasks}>
              <span className={styles.description}>Concluídas</span>

              <span className={styles.total}>
                {totalCreateTasks() == 0
                  ? 0
                  : totalDoneTasks() + " de " + totalCreateTasks()}
              </span>
            </div>
          </div>

          <div className={styles.list}>
            {tasks.length == 0 && (
              <>
                <img src={todoClipboard} alt="Imagem vazia" />
                <p>
                  <span>Você ainda não tem tarefas cadastradas</span> <br />
                  Crie tarefas e organize seus itens a fazer
                </p>
              </>
            )}
            {tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  isDone={task.isDone}
                  onDeleteTask={deleteTask}
                  onChangeTask={handleToggleTaskAsDone}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
