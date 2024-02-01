import { serializeForm } from "./addTask.js";
import { updateTask } from "./changeTask.js";
import { getNodeTask } from "./renderTasks.js";

const editTaskForm = document.querySelector(".edit-task-form");
const addTask = document.querySelector(".add-task");
const tasks = document.querySelector(".tasks");

let putItem;

export const editTaskFromList = async (taskItem) => {
  editTaskForm.style.display = "block";
  addTask.style.display = "none";

  const title = editTaskForm.querySelector(".add-task-info__title");
  const info = editTaskForm.querySelector(".add-task-info__about");
  const category = editTaskForm.querySelector(".add-task-info__category");
  const date = editTaskForm.querySelector(".add-task-info__date");

  title.value = taskItem.title;
  info.value = taskItem.info;
  category.value = taskItem.category;
  date.value = taskItem.date;

  putItem = taskItem;
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const dataSer = serializeForm(event.target);
  const data = transformData(dataSer);
  await updateData(data);
  const nodeTask = getNodeTask(data);
  const oldNode = document.getElementById(putItem.taskId);
  tasks.replaceChild(nodeTask, oldNode);

  editTaskForm.style.display = "none";
  addTask.style.display = "block";
};

const transformData = (data) => {
  const transformData = {};
  data.forEach((item) => {
    transformData[item.name] = item.value;
  });
  transformData["status"] = putItem.status;
  transformData["taskId"] = putItem.taskId;

  return transformData;
};

const updateData = async (data) => {
  await updateTask({
    ...data,
  });
};

editTaskForm.addEventListener("submit", handleFormSubmit);
