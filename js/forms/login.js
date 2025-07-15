export async function userValidation() {
    if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).role === "admin") {
            window.location.hash = "#/modifyevents";
        } else {
            window.location.hash = "#/events";
        }
        return;
    }
    // Render the login form
    document.getElementById("pageContent").innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
            <div style="border: 1px solid gray; padding: 3rem; border-radius: 25px; box-shadow: 0px 0px 2px;">
                <form class="w-100 mx-auto p-4 " style="max-width: 400px;">
                    <div class="text-center pb-3">
                        <h2 class="m-0">Login</h2>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Email" required>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" required>
                    </div>

                    <button type="button" id="logIn" class="btn w-100"
                        style="background-color: blueviolet; color: white;">Sign In</button>
                    <div class="py-4 text-center text-secondary">
                        <span>Don't have an account? <a href="#/register">Register</a></span>
                    </div>
                </form>
            </div>

            <div id="outPut" class="text-center my-4">

            </div>
        </div>
    `
    // Set the hash to login to load this view
    window.location.hash = "#/login";
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let logIn = document.getElementById("logIn");

    logIn.addEventListener("click", async (e)  => {
        e.preventDefault();
    
        userConfirm(email.value, password.value);
    })
    // This function will check if the user exists in the database
    async function userConfirm(email,password){
        try {
            const response = await fetch("http://localhost:3000/users",{
                method:"GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let data = await response.json();
            let validation = data.find(user => user.email === email && user.password === password);
            if (validation) {
                localStorage.setItem("user", JSON.stringify(validation));
                if (validation.role === "admin") {
                    window.location.hash = "#/modifyevents";
                } else {
                    window.location.hash = "#/events";
                }
            } 
        } catch (error) {
            console.error(`Your petition has a problem: ${error}`);
        }
    } 
}