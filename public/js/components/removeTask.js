import { getDatabase, ref, remove } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const db = getDatabase();

export const removeTask = async (taskId) => {
  return remove(ref(db, "tasks/" + taskId));
};
