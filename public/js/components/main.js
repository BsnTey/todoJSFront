import { getData, transformData } from "./getData.js";
import { renderTasks } from "./renderTasks.js";

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

const tasksData = await getData();
const tasksTrans = transformData(tasksData);
renderTasks(tasksTrans);
