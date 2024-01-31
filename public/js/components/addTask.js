import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const db = getDatabase();

const addTaskBtn = document.querySelector(".add-task-btn");
const addTaskInfoWrap = document.querySelector(".add-task-info-wrap");
const addTaskDoBtnCancelBtn = document.querySelector(".add-task-do-btn__cancel-btn");

addTaskBtn.addEventListener("click", () => {
  addTaskInfoWrap.style.display = "block";
});

addTaskDoBtnCancelBtn.addEventListener("click", (event) => {
  const formNode = event.target.form;
  clearForm(formNode);
  addTaskInfoWrap.style.display = "none";
});

addTaskInfoWrap.addEventListener("change", (event) => {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();
  formNode.querySelector(".add-task-do-btn__add-btn").disabled = !isValid;
});

const handleFormSubmit = async (event) => {
  event.preventDefault();
  const dataSer = serializeForm(event.target);
  const data = transformData(dataSer);
  await sendData(data);
};

addTaskInfoWrap.addEventListener("submit", handleFormSubmit);

const serializeForm = (formNode) => {
  const { elements } = formNode;
  const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element;
      return { name, value };
    });
  return data;
};

const clearForm = (formNode) => {
  const inputs = formNode.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
};

const transformData = (data) => {
  const transformData = {};
  data.forEach((item) => {
    transformData[item.name] = item.value;
  });
  const taskId = uuid.v4();
  transformData["taskId"] = taskId;
  transformData["status"] = false;

  return transformData;
};



const sendData = async ({ taskId, title, info, category, date, status }) => {
  set(ref(db, "tasks/" + taskId), {
    title,
    info,
    category,
    date,
    status,
  });
};
