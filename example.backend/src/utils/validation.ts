export const validateUser = (data: {
  name: string;
  email: string;
  password: string;
}): void => {
  const { name, email, password } = data;
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }
};
