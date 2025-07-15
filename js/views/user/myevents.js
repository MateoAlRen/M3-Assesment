export async function myEvents() {
    // Check if user is logged in, if not redirect to login page
    JSON.parse(localStorage.getItem("user")) ? null : window.location.hash = "#/login";
    if (JSON.parse(localStorage.getItem("user")).role !== "user") { 
        window.location.hash = "#/addevent";
        return;
    }
    // Get user data from localStorage
    let user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("pageContent").innerHTML = `
    // HTML structure for the My Events page
     <div style="display: flex;">
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
                        <a href="#/events" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16">
                                <use xlink:href="#speedometer2"></use>
                            </svg>
                            See Current Events
                        </a>
                    </li>
                    <li>
                        <a href="#/myevents" class="nav-link text-white">
                            <svg class="bi me-2" width="16" height="16">
                                <use xlink:href="#speedometer2"></use>
                            </svg>
                            My Events
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
                        <li><a class="dropdown-item" id="logOut" href="#/login">Sign out</a></li>
                    </ul>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h1 style="text-align:center; padding-top: 1rem">Events</h1>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Info</th>
                                    <th scope="col">Capacity</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Modify</th>
                                </tr>
                            </thead>
                            <tbody id="eventsTable">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            `

    // Fetching events from localStorage and displaying them in the table
    let logOut = document.getElementById("logOut");
    logOut.addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.hash = "#/login";
    });
    window.location.hash = "#/myevents";
}