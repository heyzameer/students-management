document.getElementById("submit-student")?.addEventListener("click", function (): void {
    //resetting name field
    nameField1();

    //resetting class field
    classField1();

    //resetting phone field
    phoneField1();

    const nameInput = document.getElementById("name") as HTMLInputElement;
    const classInput = document.getElementById("class") as HTMLInputElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;
    const id = document.getElementById("id") as HTMLInputElement;

    if (!nameInput.value) nameField1("red", "Enter Name");
    if (!classInput.value) classField1("red", "Enter Class");
    if (!phoneInput.value) phoneField1("red", "Enter Phone number");

    if (!phoneInput.value || !classInput.value || !nameInput.value) return;

    fetch("/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.value, stundentclass: classInput.value, phone: phoneInput.value, id: id.value })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (!data.success && data.phone) {
                phoneField1("red", "User another phone number");
            } else if (data.success) {
                window.location.href = "http://localhost:3000/home"
            }
        })

});

function nameField1(color?: string, text?: string): void {

    //accessing name field to variables
    const nameLabel = document.getElementById("name-label") as HTMLElement;
    const nameInput = document.getElementById("name") as HTMLInputElement;

    nameLabel.innerText = text || "Name";
    nameLabel.style.color = color || "";
    nameInput.style.borderColor = color || "";

    return;
}

function classField1(color?: string, text?: string): void {

    //accessing class field to variables
    const classLabel = document.getElementById("class-label") as HTMLElement;
    const classInput = document.getElementById("class") as HTMLInputElement;

    classLabel.innerText = text || "Class";
    classLabel.style.color = color || "";
    classInput.style.borderColor = color || "";

    return;
}

function phoneField1(color?: string, text?: string): void {

    //accessing phone field to variables
    const phoneLabel = document.getElementById("phone-label") as HTMLElement;
    const phoneInput = document.getElementById("phone") as HTMLInputElement;

    phoneLabel.innerText = text || "Phone";
    phoneLabel.style.color = color || "";
    phoneInput.style.borderColor = color || "";

    return;
}