// Importing necessary modules for the router functionality
import { userValidation } from "./forms/login.js";
import { registerUser } from "./forms/register.js";
import { modifyEvents } from "./views/admin/modifyevents.js";
import { addEvent } from "./views/admin/addevent.js";
import { events } from "./views/user/events.js";
import { myEvents } from "./views/user/myevents.js";

// router object that maps paths to their respective functions
export let router = {
    "#/login": userValidation,
    "#/register": registerUser,
    "#/modifyevents": modifyEvents,
    "#/addevent": addEvent,
    "#/events": events,
    "#/myevents": myEvents
}