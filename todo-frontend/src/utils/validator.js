export const passwordValidator = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (!password) {
    return "Password is required";
  } else if (password.length < 8 || password.length > 30) {
    return "Password must be between 8 and 30 characters";
  } else if (!passwordRegex.test(password)) {
    return "Password must contain uppercase, lowercase, number, and special character";
  }

  return null;
};
