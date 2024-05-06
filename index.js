document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // to stop submitting the form automatically again and again
  const studentName = document.getElementById("studentName").value.trim();
  const studentID = document.getElementById("studentID").value.trim();
  const emailID = document.getElementById("emailID").value.trim();
  const contactNo = document.getElementById("contactNo").value.trim();

  // for ensuring empty fields or null values are not allowed

  if (studentName && studentID && emailID && contactNo) {
    const student = {
      id: studentID,
      name: studentName,
      email: emailID,
      contact: contactNo,
    };

    // for adding new student details

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const existingIndex = students.findIndex((s) => s.id === studentID);
    const editingStudent =
      document.getElementById("editingStudent").value === "true";

    // if student not editing but while adding new student ID already exists will throw an error

    if (existingIndex > -1 && !editingStudent) {
      alert("This Student already exists.");
    } else if (editingStudent) {
      students[existingIndex] = student;
    } else {
      students.push(student);
    }
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    document.getElementById("studentForm").reset();
    document.getElementById("editingStudent").value = "false";
  }
});

// function to display students in the display section of the webpage

function displayStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.sort((a, b) => a.name.localeCompare(b.name)); // for sorting records alphabetically
  const listContainer = document.getElementById("studentList");
  listContainer.innerHTML = "<h2>Registered Students</h2>";
  students.forEach((student) => {
    const studentDiv = document.createElement("div");
    studentDiv.classList.add("student-entry");
    studentDiv.innerHTML = `
    Name: <span class="name-color">${student.name}</span>, 
    ID: <span class="id-color">${student.id}</span>, 
    Email: <span class="email-color">${student.email}</span>, 
    Contact: <span class="contact-color">${student.contact}</span>
    <button onclick="editStudent('${student.id}')">
    <i class="fa-solid fa-pen" style="color: #005A9C;"></i> Edit
    </button>
    <button onclick="deleteStudent('${student.id}')">
    <i class="fa-solid fa-trash" style="color: #005A9C;"></i> Delete
    </button>
    `;
    listContainer.appendChild(studentDiv);
  });
}

// function for editing students record taking the unique id as reference

function editStudent(studentID) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  const studentToEdit = students.find((s) => s.id === studentID);
  if (studentToEdit) {
    document.getElementById("studentName").value = studentToEdit.name;
    document.getElementById("studentID").value = studentToEdit.id;
    document.getElementById("emailID").value = studentToEdit.email;
    document.getElementById("contactNo").value = studentToEdit.contact;
    document.getElementById("editingStudent").value = "true";
  }
}

// function for deleting students record

function deleteStudent(studentID) {
  let students = JSON.parse(localStorage.getItem("students")) || [];
  students = students.filter((s) => s.id !== studentID);
  localStorage.setItem("students", JSON.stringify(students)); // updates the list of students
  displayStudents(); // displays the updated list of students
}

window.onload = function () {
  displayStudents(); // to display the stored student data from the local storage when the page is loaded
};
