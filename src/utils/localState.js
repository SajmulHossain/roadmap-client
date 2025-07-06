export const setLocalUser = () => {
  localStorage.setItem("user", true);
};

export const getLocalUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const removeLocalUser = () => {
  localStorage.removeItem("user");
};
