document.getElementById("add-new-student")?.addEventListener("click", function (): void {
    window.location.href = "http://localhost:3000/add-new-student";
});

function edit(id: string): void {
    window.location.href = `http://localhost:3000/edit/${id}`;
}

function deleteStudent(id: string): void {
    fetch(`/delete/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(data => {
        if(data.success) {
            loadData();
        }
    })
}
function loadData(): void {
    fetch("/students", {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                renderData(data.students);
            }
        })
}

loadData();

function renderData(students: any[]): void {
    const tableBody = document.getElementById("table-body") as HTMLElement;
    tableBody.innerHTML = "";

    console.log(students)

    students.forEach((student, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.stundentclass}</td>
                <td>${student.phone}</td>
                <td class="flex space-x-2">
                    <button 
                        onclick="edit('${student._id}')" 
                        type="button" 
                        class="edit-btn py-1 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Edit
                    </button>
                    <button 
                        onclick="deleteStudent('${student._id}')" 
                        type="button" 
                        class="delete-btn py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}
