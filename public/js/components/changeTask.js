import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const dbRef = ref(getDatabase());

export const updateTask = async ({ taskId, title, info, category, date, status }) => {
  const updatesFields = {
    title,
    info,
    category,
    date,
    status,
  };
  const updates = {};
  updates["tasks/" + taskId] = updatesFields;

  return update(dbRef, updates);
};
