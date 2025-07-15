export async function addEvent() {
    // Check if user is logged in and has admin role
    JSON.parse(localStorage.getItem("user")) ? null : window.location.hash = "#/login";
    if (JSON.parse(localStorage.getItem("user")).role !== "admin") { 
        window.location.hash = "#/myevents";
        return;
    }
    // Get user data from localStorage  
    let user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("pageContent").innerHTML = `
    <div style="display: flex; ">
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px; height: 100vh;">
                <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32">
                        <use xlink:href="#bootstrap"></use>
                    </svg>
                    <span class="fs-4">Events</span>
                </a>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <a href="#/addevent" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16">
                                <use xlink:href="#speedometer2"></use>
                            </svg>
                            Create Event
                        </a>
                    </li>
                    <li>
                        <a href="#/modifyevents" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16">
                                <use xlink:href="#speedometer2"></use>
                            </svg>
                            Current Events
                        </a>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                        <strong>${user.name}</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" id="logOut"href="#/login">Sign out</a></li>
                    </ul>
                </div>

            </div>
            <div style="display: flex; align-items: center; margin-left: auto; margin-right: auto;">
                <form>
                    <h1>Create Event</h1>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Event Title</label>
                        <input id="title" type="text" class="form-control"  aria-describedby="textHelp" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Info</label>
                        <input id="info" type="text" class="form-control" style="width: 300px; height: 100px; font-size: 16px;" aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Date</label>
                        <input id="date" type="date" class="form-control"  aria-describedby="emailHelp" required>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Capacity</label>
                        <input id="capacity" type="number" class="form-control"  aria-describedby="emailHelp" required>
                    </div>
                    
                    <button type="submit" id="newEvent" class="btn btn-primary" style="width: 100%;">Add to events</button>
                </form>

            </div>
    `
    // Set the hash to addevent to load this view
    // This will ensure that the user is on the add event page
    let logOut = document.getElementById("logOut");
    logOut.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.hash = "#/login";
    });
    // This will remove the user from localStorage and redirect to login page
    window.location.hash = "#/addevent";
    async function counter() {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();
        let id = data.length ? data[data.length - 1].id + 1 : 1;
        let idString = id.toString();
        return idString;
    }
    // This function will generate a unique id for the new event
    let newEvent = document.getElementById("newEvent");
    newEvent.addEventListener("click", (e) => {
        e.preventDefault()
        let title = document.getElementById("title").value;
        let info = document.getElementById("info").value;
        let date = document.getElementById("date").value;
        let capacity = document.getElementById("capacity").value;
        let id = counter();
        let idString = id.toString();
        addtoList(idString, title, info, date, capacity);
        ;
    })
    // This function will add the new event to the server
    async function addtoList(idString, title, info, date, capacity) {
        try {
            const response = await fetch("http://localhost:3000/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idString,
                    title,
                    info,
                    capacity,
                    date
                })
            });
            if (response.ok) {
                alert("Event added successfully!");
            } else {
                alert("Failed to add event.");
            }
        } catch (error) {
            console.error(`Your petition has a problem: ${error}`);
        }
    }
}