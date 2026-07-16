let students = JSON.parse(localStorage.getItem("students")) || [];

const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const sub1 = document.getElementById("sub1");
const sub2 = document.getElementById("sub2");
const sub3 = document.getElementById("sub3");
const sub4 = document.getElementById("sub4");
const sub5 = document.getElementById("sub5");

const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");
const showAllBtn = document.getElementById("showAllBtn");
const sortBtn = document.getElementById("sortBtn");
const searchInput = document.getElementById("search");

const table = document.getElementById("studentTable");

displayStudents(students);

addBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();

    const marks = [
        Number(sub1.value),
        Number(sub2.value),
        Number(sub3.value),
        Number(sub4.value),
        Number(sub5.value)
    ];

    if (
        name === "" ||
        roll === "" ||
        marks.some(mark => isNaN(mark) || mark < 0 || mark > 100)
    ) {
        alert("Enter valid details.");
        return;
    }

    if (students.find(student => student.roll === roll)) {
        alert("Roll Number already exists.");
        return;
    }

    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (total / 5).toFixed(2);

    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B+";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else grade = "F";

    const result = marks.every(mark => mark >= 35) ? "Pass" : "Fail";

    students.push({
        name,
        roll,
        total,
        percentage,
        grade,
        result
    });

    localStorage.setItem("students", JSON.stringify(students));

    clearInputs();
    displayStudents(students);
});

function displayStudents(data) {
    table.innerHTML = "";

    data.forEach((student, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.total}</td>
            <td>${student.percentage}%</td>
            <td>${student.grade}</td>
            <td>${student.result}</td>
            <td>
                <button class="deleteBtn" onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        `;

        table.appendChild(row);

    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents(students);
}

searchBtn.addEventListener("click", () => {

    const roll = searchInput.value.trim();

    const result = students.filter(student => student.roll === roll);

    displayStudents(result);

});

showAllBtn.addEventListener("click", () => {

    searchInput.value = "";
    displayStudents(students);

});

sortBtn.addEventListener("click", () => {

    students.sort((a, b) => b.percentage - a.percentage);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents(students);

});

function clearInputs() {

    nameInput.value = "";
    rollInput.value = "";
    sub1.value = "";
    sub2.value = "";
    sub3.value = "";
    sub4.value = "";
    sub5.value = "";

}