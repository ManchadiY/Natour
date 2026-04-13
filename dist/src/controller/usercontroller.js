"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUser = void 0;
exports.createuser = createuser;
exports.login = login;
const bcrypt = __importStar(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const handleFactory_1 = require("./handleFactory");
async function createuser(req, res) {
    try {
        console.log("hello from create user");
        const { name, email, password, passwordConfirm } = req.body;
        console.log(req.body);
        // body should contian name ,email ,password,passwordConfirm
        // 1)check user input
        if (!name || !email || !password || !passwordConfirm) {
            res.status(400).json({
                status: "failed",
                message: "invalid data",
            });
        }
        // 2)check if user already exist
        const checkIfUserExist = await userModel_1.default.findOne({ email });
        if (checkIfUserExist) {
            res.status(409).json({
                status: "failed",
                message: "user already exisit",
            });
            return;
        }
        // 3)check if the password is equal to password confirm
        if (password !== passwordConfirm) {
            res.status(401).json({
                status: "failed",
                message: "password and password confirm are not same",
            });
        }
        // 4)create a user in the db
        // 4a) hash the password using the bcrp
        const hasedpassword = await bcrypt.hash(password, 12);
        // for now we are saving password without hashing
        const newUser = await userModel_1.default.create({
            name,
            email,
            password: hasedpassword,
            passwordConfirm: undefined,
        });
        console.log(newUser);
        res.status(201).json({
            status: "success",
            message: "development phase",
            data: newUser,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            message: "something went wrong",
        });
    }
}
async function login(req, res) {
    try {
        const { email, userpassword } = req.body;
        if (!email || !userpassword) {
            res.status(400).json({
                status: "failed",
                message: "invalid password or email",
            });
            return;
        }
        // check if user exisit
        const getuser = await userModel_1.default.findOne({ email }).select("+password");
        if (!getuser) {
            res.status(400).json({
                status: "failed",
                message: "user not found",
            });
            return;
        }
        // check password
        const verifypassword = await bcrypt.compare(userpassword, getuser.password);
        if (!verifypassword) {
            res.status(401).json({
                status: "failed",
                message: "invalid email or password",
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "development phase",
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: "failed",
            message: "something went wrong",
        });
    }
}
const getUser = (0, handleFactory_1.getOne)(userModel_1.default);
exports.getUser = getUser;
const getAllUsers = (0, handleFactory_1.getAll)(userModel_1.default);
exports.getAllUsers = getAllUsers;
