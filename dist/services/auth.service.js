"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jwt_1 = require("../utils/jwt");
const STATIC_USER = {
    id: "1",
    username: "admin",
    password: "password",
};
const authenticateUser = (username, password) => {
    if (!username || !password) {
        throw { message: "Usuario y contraseña son obligatorios", status: 400 };
    }
    if (username !== STATIC_USER.username || password !== STATIC_USER.password) {
        throw { message: "Credenciales incorrectas", status: 401 };
    }
    return (0, jwt_1.generateToken)({ id: STATIC_USER.id, username });
};
exports.authenticateUser = authenticateUser;
