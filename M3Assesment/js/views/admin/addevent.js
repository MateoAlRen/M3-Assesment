export async function addEvent() {
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
                        <a href="#" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16">
                                <use xlink:href="#speedometer2"></use>
                            </svg>
                            Create Event
                        </a>
                    </li>
                    <li>
                        <a href="#" class="nav-link text-white">
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
                        <strong>mdo</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
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
            window.location.hash = "#/addevent";
        
        let newEvent = document.getElementById("newEvent");

        newEvent.addEventListener("click", (e) => {
            e.preventDefault()
            let title = document.getElementById("title").value;
            let info = document.getElementById("info").value;
            let date = document.getElementById("date").value;
            let capacity = document.getElementById("capacity").value;

            addtoList(title, info, date, capacity);
            ;})
        
        async function addtoList(title, info, date, capacity) {
            try {
                const response = await fetch("http://localhost:3000/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title,
                        info,
                        date,
                        capacity
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