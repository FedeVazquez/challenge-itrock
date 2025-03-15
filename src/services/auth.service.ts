import { generateToken } from "../utils/jwt";

const STATIC_USER = {
  id: "1",
  username: "admin",
  password: "password",
};

export const authenticateUser = (username: string, password: string) => {
  if (!username || !password) {
    throw { message: "Usuario y contraseña son obligatorios", status: 400 };
  }
  if (username !== STATIC_USER.username || password !== STATIC_USER.password) {
    throw { message: "Credenciales incorrectas", status: 401 };
  }
  return generateToken({ id: STATIC_USER.id, username });
};
