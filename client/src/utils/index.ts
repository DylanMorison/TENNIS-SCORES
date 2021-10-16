export const checkLocalStorage = () => {
  if (localStorage.getItem("authorization") && localStorage.getItem("email")) {
    debugger;
    return true;
  } else {
    localStorage.removeItem("authorization")
    localStorage.removeItem("email")
    return false;
  }
};

export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
