document.getElementById("login")?.addEventListener("click", function (): void {
    //resetting email field
    emailLoginField();

    //resetting password field
    passwordLoginField();

    const passwordInput = document.getElementById("password") as HTMLInputElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;

    if (!emailInput.value) emailLoginField("red", "Enter Email");
    if (!passwordInput.value) passwordLoginField("red", "Enter password");

    if (!emailInput.value || !passwordInput.value) return;

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput.value, email: emailInput.value })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data.success && data.email) {
                emailLoginField("red", "Wrong Email");
            } else if (!data.success && data.password) {
                passwordLoginField("red", "Wrong Password");
            } else {
                window.location.href = "http://localhost:3000/home";
            }
        })

});

function emailLoginField(color?: string, text?: string): void {

    //accessing email field and email input field in variable
    const emailLabel = document.getElementById("email-label") as HTMLElement;
    const emailInput = document.getElementById("email") as HTMLInputElement;

    //setting style and color to accessed elements
    emailLabel.innerText = text || "Email";
    emailInput.style.borderColor = color || "";
    emailLabel.style.color = color || "";

    return;
}

function passwordLoginField(color?: string, text?: string): void {

    //accessing password label and input field in variable
    const passwordLabel = document.getElementById("password-label") as HTMLElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    //setting style and content of password area
    passwordLabel.innerText = text || "Password";
    passwordInput.style.borderColor = color || "";
    passwordLabel.style.color = color || "";

    return;
}