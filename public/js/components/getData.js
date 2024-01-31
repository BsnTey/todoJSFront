import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const dbRef = ref(getDatabase());

export const getData = async () => {
  try {
    const snapshot = await get(child(dbRef, `tasks/`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
};

export const transformData = (data) => {
  const dataKeys = Object.keys(data);
  const transformData = [];

  dataKeys.forEach((item) => {
    transformData.push({
      ...data[item],
      taskId: item,
    });
  });

  return transformData;
};
