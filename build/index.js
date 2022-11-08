"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const getProfile_1 = require("./endpoints/getProfile");
const getProfileById_1 = require("./endpoints/getProfileById");
const getRecepieById_1 = require("./endpoints/getRecepieById");
const login_1 = require("./endpoints/login");
const PostRecepie_1 = require("./endpoints/PostRecepie");
const singup_1 = require("./endpoints/singup");
app_1.app.post("/user/singup", singup_1.singup);
app_1.app.post("/user/login", login_1.login);
app_1.app.get("/user/profile", getProfile_1.getProfile);
app_1.app.get("/user/:id", getProfileById_1.getProfileById);
app_1.app.post("/recepie/create", PostRecepie_1.postRecepie);
app_1.app.post("/recepie/:id", getRecepieById_1.getRecepieById);
//# sourceMappingURL=index.js.map