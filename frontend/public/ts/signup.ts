document.getElementById("signup")?.addEventListener('click', function (): void {

    //resettin email field style
    emailField();

    //resetting username field style
    usernameField();

    //resetting password field style
    passwordField();

    //resettin confiem-password field style
    confirmPasswordField();

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const confirmPasswordInput = document.getElementById("confirm-password") as HTMLInputElement;

    //checking email input
    if (!emailInput.value) emailField("red", "Enter Email");

    //checking username input feild
    if (!usernameInput.value) usernameField("red", "Enter username");

    //checking confirm-password input feild
    if (!confirmPasswordInput.value) confirmPasswordField("red", "Enter Confirm Password");

    //checking password input feild
    if (!passwordInput.value) passwordField("red", "Enter Password");

    if (!usernameInput || !emailInput || !passwordInput || !confirmPasswordInput) return;

    const password: string = passwordInput.value;
    const confirmPassword: string = confirmPasswordInput.value;

    if (password === confirmPassword) {

        //fetch data to server
        fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: usernameInput.value,
                email: emailInput.value,
                password, confirmPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "http://localhost:3000/";

                } else if (!data.success && data.email) {
                    emailField("red", "User another Email");
                } else if (!data.success && data.password) {
                    passwordField("red");
                    confirmPasswordField("red", "Confirm Password not matching");
                }
            })

    } else {

        passwordField("red");
        confirmPasswordField("red", "Confirm Password not matching");

        return;
    }
});

function emailField(state?: string, text?: string): void {

    //Email field and label
    const emailLabel = document.getElementById("email-label") as HTMLElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;

    emailLabel.innerText = text || "Email";
    emailInput.style.borderColor = state || "";
    emailLabel.style.color = state || "";

    return;

}

function usernameField(state?: string, text?: string): void {

    //Username field and label
    const usernameInput = document.getElementById("username") as HTMLInputElement;
    const usernameLabel = document.getElementById("username-label") as HTMLElement;

    usernameLabel.innerHTML = text || "username";
    usernameLabel.style.color = state || "";
    usernameInput.style.borderColor = state || "";

    return;
}

function passwordField(state?: string, text?: string): void {

    //password field and input
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const passwordLabe = document.getElementById("password-label") as HTMLElement;

    passwordLabe.innerText = text || "Password";
    passwordLabe.style.color = state || "";
    passwordInput.style.borderColor = state || "";

    return;
}

function confirmPasswordField(state?: string, text?: string): void {

    //confirm-password field and input
    const confirmPasswordInput = document.getElementById("confirm-password") as HTMLInputElement;
    const confirmPasswordLabel = document.getElementById("confirm-password-label") as HTMLElement;

    confirmPasswordLabel.innerHTML = text || "Confirm Password"
    confirmPasswordLabel.style.color = state || "";
    confirmPasswordInput.style.borderColor = state || "";

    return;
}