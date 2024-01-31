import { getData, transformData } from "./getData.js";
import { updateTask } from "./changeTask.js";

const tasks = document.querySelector(".tasks");

const renderTasks = async (getTasks) => {
  tasks.innerHTML = "";

  getTasks.forEach((taskItem) => {
    const task = document.createElement("div");
    task.className = "task";
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
          <button class="task__edit">
              <img src="./image/more.svg" alt="edit" />
          </button>
          `;

    const taskProgressBtn = task.querySelector(".task__progress");
    taskProgressBtn.addEventListener("click", async () => await updateAndRenderTask(taskItem));

    tasks.appendChild(task);
  });
};

const updateAndRenderTask = async (task) => {
  updateTask({
    ...task,
    status: !task.status,
  });
  const tasksData = await getData();
  const tasksTrans = transformData(tasksData);
  renderTasks(tasksTrans);
};

const tasksData = await getData();
const tasksTrans = transformData(tasksData);
renderTasks(tasksTrans);
