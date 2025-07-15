export async function registerUser() {
    if (localStorage.getItem("user")) {
        if (JSON.parse(localStorage.getItem("user")).role === "admin") {
            window.location.hash = "#/modifyevents";
        } else {
            window.location.hash = "#/events";
        }
        return;
    }
    // Render the registration form
    document.getElementById("pageContent").innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
            <div style="border: 1px solid gray; padding: 3rem; border-radius: 25px; box-shadow: 0px 0px 2px;">
                <form class="w-100 mx-auto p-4 " style="max-width: 400px;" id="singUp">
                    <div class="text-center pb-3">
                        <h2 class="m-0">Register</h2>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name" placeholder="Name" required>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="email" placeholder="Email" required>
                    </div>


                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" placeholder="Password" required>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword" placeholder="Password"
                            required>
                    </div>

                    <button type="submit"  class="btn w-100"
                        style="background-color: blueviolet; color: white;">Sign Up</button>
                    <div id="outPut" class="text-center my-4">

                    </div>
                    <div class="py-4 text-center text-secondary">
                        <span>Already have an account? <a href="#/login">Sign In</a></span>
                    </div>
                </form>
            </div>

            
        </div>
    `
    window.location.hash = "#/register";

    // Inputs fields
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirmPassword");

    // Sign Up button
    let singUp = document.getElementById("singUp");

    // Warnings
    let outPut = document.getElementById("outPut")

    singUp.addEventListener("submit", (e) => {
        e.preventDefault();
        validation()
        async function validation() {
            try {
                const res = await fetch("http://localhost:3000/users")
                const data = await res.json();
                const userExists = data.find(user => user.email === email.value);

                if (userExists) {
                    outPut.innerHTML = `<p style="red"> This user already exists</p>`;
                    return;
                } else if (password.value !== confirmPassword.value) {
                    outPut.innerHTML = `<p style="red"> Passwords do not match</p>`;
                    return;
                } else {
                    let user = {
                        "name": name.value,
                        "email": email.value,
                        "password": password.value,
                        "role": user
                    }

                    newUser(user);
                    outPut.innerHTML = `<p style="color: green"> User created successfully</p>`;
                }
            } catch (error) {
                console.error(`Your petition has a problem: ${error}`);
            }
        }
    });
    // Function to create a new user
    async function newUser(user){
        try {
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            setTimeout(() => {
                localStorage.setItem("user", JSON.stringify(user));
                window.location.hash = "#/myevents";
            }, 2000);
        } catch (error){
            console.error(`Your petition has a problem: ${error}`)
        }
    }
}