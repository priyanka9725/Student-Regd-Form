document
  .getElementById("studentRegister")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const studentName = document.getElementById("name").value;
    const studentID = document.getElementById("studentId").value;
    const studentClass = document.getElementById("studentClass").value;
    const emailID = document.getElementById("mail").value;
    const contactNo = document.getElementById("contact").value;

    if (!studentID || !studentName) {
      // Basic validation
      alert("Please fill out the student ID and name.");
      return;
    }

    // Create and append the new record
    const newRecord = {
      studentName,
      studentID,
      studentClass,
      emailID,
      contactNo,
    };
    addOrUpdateRecord(newRecord);

    // Clear the form fields
    document.getElementById("studentRegister").reset();
    renderRecords();
  });

function addOrUpdateRecord(record, index = -1) {
  let records = JSON.parse(localStorage.getItem("students")) || [];
  if (index === -1) {
    // Add new record
    records.push(record);
    console.log(records);
  } else {
    // Update existing record
    records[index] = record;
    console.log(records);
  }
  localStorage.setItem("students", JSON.stringify(records));
}

function deleteRecord(index) {
  let records = JSON.parse(localStorage.getItem("students")) || [];
  records.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(records));
  renderRecords();
}

function editRecord(index) {
  let records = JSON.parse(localStorage.getItem("students")) || [];
  let record = records[index];
  document.getElementById("name").value = record.studentName;
  document.getElementById("studentId").value = record.studentID;
  document.getElementById("studentClass").value = record.studentClass;
  document.getElementById("mail").value = record.emailID;
  document.getElementById("contact").value = record.contactNo;

  // Remove the previous submit event handler
  const form = document.getElementById("studentRegister");
  form.removeEventListener("submit", submitFormHandler);
  form.onsubmit = function (event) {
    event.preventDefault();
    addOrUpdateRecord(
      {
        studentName: record.studentName,
        studentID: record.studentID,
        studentClass: record.studentClass,
        emailID: record.emailID,
        contactNo: record.contactNo,
      },
      index
    );
    renderRecords();
    form.addEventListener("submit", submitFormHandler); // Reattach the original handler
    form.reset();
  };
}

function renderRecords() {
  const records = JSON.parse(localStorage.getItem("students")) || [];
  const recordsList = document.getElementById("records");
  recordsList.innerHTML = ""; // Clear existing entries
  records.forEach((record, index) => {
    const recordItem = document.createElement("li");
    recordItem.classList.add("lists");
    recordItem.innerHTML = `Name: ${record.studentName}, ID: ${record.studentID}, CLASS: ${record.studentClass}, Email: ${record.emailID}, Contact: ${record.contactNo}
            <button onclick="editRecord(${index})">Edit</button>
            <button onclick="deleteRecord(${index})">Delete</button>`;
    recordsList.appendChild(recordItem);
  });
}

// Initial rendering of records
window.onload = renderRecords;

// Keep the original form submission handler
const submitFormHandler = document.getElementById("studentRegister").onsubmit;
