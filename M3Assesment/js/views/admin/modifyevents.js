export async function modifyEvents() {
    document.getElementById("pageContent").innerHTML = `
         <div style="display: flex; width: 10rem;">
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
                        <strong>mdo</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#/login">Sign out</a></li>
                    </ul>
                </div>
            </div>
            <div>
                <div style="margin-left: 77rem;">
                    <div class="container" style="display: block; text-align: center; margin-top: 1rem;">
                        <a href="#/addevent"><button type="button" class="btn btn-dark rounded-pill" style="width: 300%;">Add a New event</button></a>
                    </div>
                </div>
                <div style="margin-left: 6rem; margin-top: 2rem;">
                    <div style="display: flex; margin-top: 4rem;">
                        <table class="table" style="width: 100%; margin-left: 2rem; margin-right: 2rem;">
                            <thead>
                              <tr>
                                <th scope="col"></th>
                                <th scope="col">Current Event</th>
                                <th scope="col">Description</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Date</th>
                                <th scope="col">Modify</th>
                                <th scope="col">Delete</th>
                              </tr>
                            </thead>
                            <tbody id="eventsTable">
                            
                            </tbody>
                          </table>

                    </div>
                </div>
            </div>
        </div>
    `
    window.location.hash = "#/modifyevents";
    
    
    try {
        const response = await fetch("http://localhost:3000/events", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let data = await response.json();
        data.forEach(event => {
            document.getElementById("eventsTable").innerHTML += `
            <tr>
                <td><img src="" alt="" style="max-width: 40%;"></td>
                    <td>${event.title}</td>
                    <td>${event.info}</td>
                    <td>${event.capacity}</td>
                    <td>${event.date}</td>
                    <td><button type="button" onclick = "modifyEvent(${event.id})" class="btn btn-success rounded-pill">Modify</button></td>
                    <td><button type="button" onclick = "deleteEvent(${event.id})" class="btn btn-danger rounded-pill">Delete</button></td>
                </tr>`
        });

        console.log(data);
    } catch (error) {
        console.error(`Your petition has a problem: ${error}`);
    }

    document.deleteEvent = async (id) => {
        try {
            await fetch(`http://localhost:3000/events/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            document.getElementById("eventsTable").innerHTML = "";
            // Refresh the table after deletion
            modifyEvents();
        } catch (error) {
            console.error(`Your petition has a problem: ${error}`);
        }
    }
    
    

}