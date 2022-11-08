 import { app } from "./app";
import { getProfile } from "./endpoints/getProfile";
import { getProfileById } from "./endpoints/getProfileById";
import { getRecepieById } from "./endpoints/getRecepieById";
import { login } from "./endpoints/login";
import { postRecepie } from "./endpoints/PostRecepie";
import { singup } from "./endpoints/singup";

app.post("/user/singup", singup);
app.post("/user/login", login);
app.get("/user/profile", getProfile);
app.get("/user/:id", getProfileById);
app.post("/recepie/create", postRecepie);
app.post("/recepie/:id", getRecepieById);