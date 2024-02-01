import { updateTask } from "./changeTask.js";

const tasks = document.querySelector(".tasks");

export const renderTasks = async (getTasks) => {
  tasks.innerHTML = "";

  getTasks.forEach((taskItem) => {
    const task = document.createElement("div");
    task.className = "task";
    task.id = taskItem.taskId;
    task.innerHTML = `
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

    const taskProgressBtn = task.querySelector(".task__progress");
    taskProgressBtn.addEventListener("click", async () => await updateAndRenderTask(taskItem));

    tasks.appendChild(task);
  });
};

const updateAndRenderTask = async (task) => {
  const newStatus = !task.status;
  task.status = newStatus;
  updateTask({
    ...task,
    status: newStatus,
  });
  const taskElement = document.getElementById(task.taskId);
  const statusImg = taskElement.querySelector(".task__progress img");
  statusImg.src = newStatus ? "./image/done.svg" : "./image/inProgress.svg";
  statusImg.alt = newStatus ? "done" : "inProgress";
};
