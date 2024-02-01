import { updateTask } from "./changeTask.js";
import { removeTask } from "./removeTask.js";
import { editTaskFromList } from "./editTask.js";


const tasks = document.querySelector(".tasks");

export const renderTasks = async (getTasks) => {
  tasks.innerHTML = "";

  getTasks.forEach((taskItem) => {
    const task = getNodeTask(taskItem);
    tasks.appendChild(task);
  });
};

export const getNodeTask = (taskItem) => {
  const taskNode = document.createElement("div");
  taskNode.className = "task";
  taskNode.id = taskItem.taskId;
  taskNode.innerHTML = `
          <button class="task__progress">
             ${taskItem.status === true ? '<img src="./image/done.svg" alt="done" />' : '<img src="./image/inProgress.svg" alt="inProgress" />'}
          </button>
          <div class="task__info">
              <div class="task__title">
                  <p class="task__todo">${taskItem.title}</p>
                  <p class="task__category">${taskItem.category}</p>
              </div>

              <div class="task__bottom">
                  <p class="task__descript">${taskItem.info}</p>
                  <p class="task__date">${taskItem.date}</p>
              </div>
          </div>
          <div class="task__edit-wrap">
            <button class="task__edit">
              <img src="./image/more.svg" alt="edit" />
            </button>
            <div class="show-edit">
              <button class="edit-task-btn show-edit__edit-btn">
                <img src="./image/edit.svg" alt="edit" />
                Редактировать
              </button>
              <button class="edit-task-btn show-edit__remove-btn">
                <img src="./image/delete.svg" alt="delete" />
                Удалить
              </button>
            </div>
          </div>
          `;

  const taskProgressBtn = taskNode.querySelector(".task__progress");
  const showEditRemoveBtn = taskNode.querySelector(".show-edit__remove-btn");
  const showEditBtn = taskNode.querySelector(".show-edit__edit-btn");

  taskProgressBtn.addEventListener("click", async () => await updateTaskStatus(taskItem));
  showEditRemoveBtn.addEventListener("click", async () => await removeTaskFromList(taskNode));
  showEditBtn.addEventListener("click", async () => await editTaskFromList(taskItem));

  return taskNode;
};

const updateTaskStatus = async (task) => {
  const newStatus = !task.status;
  task.status = newStatus;
  await updateTask({
    ...task,
    status: newStatus,
  });
  const taskElement = document.getElementById(task.taskId);
  const statusImg = taskElement.querySelector(".task__progress img");
  statusImg.src = newStatus ? "./image/done.svg" : "./image/inProgress.svg";
  statusImg.alt = newStatus ? "done" : "inProgress";
};

const removeTaskFromList = async (taskNode) => {
  const taskId = taskNode.getAttribute("id");
  tasks.removeChild(taskNode);
  await removeTask(taskId);
};
