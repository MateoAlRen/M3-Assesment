import { userValidation } from "./forms/login.js";
import { registerUser } from "./forms/register.js";
import { modifyEvents } from "./views/admin/modifyevents.js";
import { addEvent } from "./views/admin/addevent.js";
export let router = {
    "#/login": userValidation,
    "#/register": registerUser,
    "#/modifyevents": modifyEvents,
    "#/addevent": addEvent
}