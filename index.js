document
  .getElementById("student-register")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const studentName = document.getElementById("StudentName").value;
    const studentDOB = document.getElementById("StudentDOB").value;
    const studentId = document.getElementById("StudentId").value;
    const studentEmail = document.getElementById("StudentEmail").value;
    const studentClass = document.getElementById("StudentClass").value;
    const studentContact = document.getElementById("StudentContact").value;

    if (!studentId || !studentDOB || !studentEmail || !studentClass) {
      alert("Please fill out the required information");
      return;
    }
    //   create and append student records

    const newStudentRecord = {
      studentName,
      studentDOB,
      studentId,
      studentEmail,
      studentClass,
      studentContact,
    };
    addOrUpdateStudentRecord(newStudentRecord);

    // clearing the form fields after registration

    document.getElementById("student-register").reset();
    renderStudentRecords();
  });

//   function to add and update student records
 
function addOrUpdateStudentRecord(StudentRecord, index = -1) {
    let StudentRecords = localStorage.getItem("student-records") || [];
    if (index === -1) {
        StudentRecords.push(StudentRecord);
    }else{
        StudentRecords[index] = StudentRecord;
    }
    localStorage.setItem("student-records")
}
