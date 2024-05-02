document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const studentName = document.getElementById("studentName").value.trim();
    const studentID = document.getElementById("studentID").value.trim();
    const emailID = document.getElementById("emailID").value.trim();
    const contactNo = document.getElementById("contactNo").value.trim();

    if (studentName && studentID && emailID && contactNo) {
      const student = {
        id: studentID,
        name: studentName,
        email: emailID,
        contact: contactNo,
      };
      const students = JSON.parse(localStorage.getItem("students")) || [];
      const existingIndex = students.findIndex((s) => s.id === studentID);
      if (existingIndex > -1) {
        students[existingIndex] = student;
      } else {
        students.push(student);
      }
      localStorage.setItem("students", JSON.stringify(students));
      displayStudents();
      document.getElementById("studentForm").reset();
    }
  });

function displayStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const listContainer = document.getElementById("studentList");
  listContainer.innerHTML = "<h2>Registered Students</h2>";
  students.forEach((student) => {
    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student-entry");
    studentDiv.innerHTML = `
            Name: ${student.name}, ID: ${student.id}, Email: ${student.email}, Contact: ${student.contact}
            <button onclick="editStudent('${student.id}')">Edit</button>
            <button onclick="deleteStudent('${student.id}')">Delete</button>
        `;
    listContainer.appendChild(studentDiv);
  });
}

//  for editing students record taking the unique id as reference

function editStudent(studentID) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const studentToEdit = students.find((s) => s.id === studentID);
  if (studentToEdit) {
    document.getElementById("studentName").value = studentToEdit.name;
    document.getElementById("studentID").value = studentToEdit.id;
    document.getElementById("emailID").value = studentToEdit.email;
    document.getElementById("contactNo").value = studentToEdit.contact;
  }
}

function deleteStudent(studentID) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students = students.filter((s) => s.id !== studentID);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

window.onload = function () {
  displayStudents();
};
