document.getElementById("submit-student")?.addEventListener("click", function (): void {
    //resetting name field
    nameField();

    //resetting class field
    classField();

    //resetting phone field
    phoneField();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const classInput = document.getElementById("class") as HTMLInputElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;

    if (!nameInput.value) nameField("red", "Enter Name");
    if (!classInput.value) classField("red", "Enter Class");
    if (!phoneInput.value) phoneField("red", "Enter Phone number");

    if (!phoneInput.value || !classInput.value || !nameInput.value) return;

    fetch("/add-new-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.value, stundentclass: classInput.value, phone: phoneInput.value })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (!data.success && data.phone) {
                phoneField("red", "User another phone number");
            } else if (data.success) {
                window.location.href = "http://localhost:3000/home"
            }
        })

});

function nameField(color?: string, text?: string): void {

    //accessing name field to variables
    const nameLabel = document.getElementById("name-label") as HTMLElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;

    nameLabel.innerText = text || "Name";
    nameLabel.style.color = color || "";
    nameInput.style.borderColor = color || "";

    return;
}

function classField(color?: string, text?: string): void {

    //accessing class field to variables
    const classLabel = document.getElementById("class-label") as HTMLElement;
    const classInput = document.getElementById("class") as HTMLInputElement;

    classLabel.innerText = text || "Class";
    classLabel.style.color = color || "";
    classInput.style.borderColor = color || "";

    return;
}

function phoneField(color?: string, text?: string): void {

    //accessing phone field to variables
    const phoneLabel = document.getElementById("phone-label") as HTMLElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;

    phoneLabel.innerText = text || "Phone";
    phoneLabel.style.color = color || "";
    phoneInput.style.borderColor = color || "";

    return;
}