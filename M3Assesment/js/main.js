import { router } from "./router.js";

// Adding event listeners for hash changes and initial load
window.addEventListener("hashchange", () => {
  if (window.location.hash === "") {
    window.location.hash = "#/login";
  }
  let path = window.location.hash;
  router[path]();
});

// Initial load of the page
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "") {
    window.location.hash = "#/login";
  }
  let path = window.location.hash;
  router[path]();
})