export const checkLocalStorage = (key: "authorization" | "id" | "email") => {
  if (localStorage.getItem(key)) {
    return true;
  } else return false;
};
