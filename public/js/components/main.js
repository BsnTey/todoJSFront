import { getData, transformData } from "./getData.js";
import { renderTasks } from "./renderTasks.js";

const navAll = document.querySelector(".nav__all");
const navCompleted = document.querySelector(".nav__completed");
const navUnCompleted = document.querySelector(".nav__not-completed");

let currentTaskState = "uncompletedTasksState";

document.addEventListener("click", (event) => {
  const activeEditElements = document.querySelectorAll(".show-edit.active-edit");
  const clickedElement = event.target;

  // Закрытие активных элементов, если клик был вне их области
  activeEditElements.forEach((el) => {
    if (!el.contains(clickedElement)) {
      el.classList.remove("active-edit");
    }
  });

  // Проверка, был ли клик внутри task__edit-wrap
  const taskEditWrapClicked = clickedElement.closest(".task__edit-wrap");
  if (taskEditWrapClicked) {
    const showEdit = taskEditWrapClicked.querySelector(".show-edit");
    showEdit.classList.add("active-edit");
  }
});

navAll.addEventListener("click", () => {
  navAll.classList.add("active");
  navCompleted.classList.remove("active");
  navUnCompleted.classList.remove("active");

  currentTaskState = "allTasksState";
  renderActiveTasks();
});

navCompleted.addEventListener("click", () => {
  navAll.classList.remove("active");
  navCompleted.classList.add("active");
  navUnCompleted.classList.remove("active");

  currentTaskState = "completedTasksState";
  renderActiveTasks();
});

navUnCompleted.addEventListener("click", () => {
  navAll.classList.remove("active");
  navCompleted.classList.remove("active");
  navUnCompleted.classList.add("active");

  currentTaskState = "uncompletedTasksState";
  renderActiveTasks();
});

const renderActiveTasks = async () => {
  const tasksData = await getData();
  if (tasksData !== undefined) {
    let tasksTrans = transformData(tasksData);

    switch (currentTaskState) {
      case "allTasksState":
        break;

      case "completedTasksState":
        tasksTrans = tasksTrans.filter((task) => task.status == true);
        break;

      case "uncompletedTasksState":
        tasksTrans = tasksTrans.filter((task) => task.status == false);
        break;
    }

    renderTasks(tasksTrans);
  } else {
    const tasks = document.querySelector(".tasks");
    const taskEmpty = document.createElement("div");
    taskEmpty.className = "tasks__empty";
    taskEmpty.innerHTML = "Нет задач";
    tasks.appendChild(taskEmpty);
  }
};

await renderActiveTasks();
