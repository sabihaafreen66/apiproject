const CRUD_URL = 'https://crudcrud.com/api/ce7525308234451f8c4b5423b0ee768f/studentDetails';

function handleFormSubmit(event) {
    event.preventDefault();
    const studentDetails = {
        name: event.target.name.value,
        mobile: event.target.mobile.value,
        address: event.target.address.value,
    };

    axios.post(CRUD_URL, studentDetails)
        .then(response => {
            displayStudentOnScreen(response.data);
        })
        .catch(error => {
            console.log(error);
        });
}

function displayStudentOnScreen(studentDetails) {
    const studentItem = document.createElement("li");
    studentItem.appendChild(
        document.createTextNode(
            `${studentDetails.name} - ${studentDetails.mobile} - ${studentDetails.address}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    studentItem.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    studentItem.appendChild(editBtn);

    const studentList = document.querySelector("ul");
    studentList.appendChild(studentItem);

    deleteBtn.addEventListener("click", function (event) {
        axios.delete(`${CRUD_URL}/${studentDetails._id}`)
            .then(() => {
                studentList.removeChild(event.target.parentElement);
            })
            .catch(error => {
                console.log(error);
            });
    });

    editBtn.addEventListener("click", function (event) {
        document.getElementById("name").value = studentDetails.name;
        document.getElementById("mobile").value = studentDetails.mobile;
        document.getElementById("address").value = studentDetails.address;

        // Listen for blur event on input fields to update the record
        document.getElementById("name").addEventListener("blur", function () {
            studentDetails.name = document.getElementById("name").value;
            axios.put(`${CRUD_URL}/${studentDetails._id}`, studentDetails)
                .then(() => {
                    displayAllStudents(); // Refresh student list after update
                })
                .catch(error => {
                    console.log(error);
                });
        });

        document.getElementById("mobile").addEventListener("blur", function () {
            studentDetails.mobile = document.getElementById("mobile").value;
            axios.put(`${CRUD_URL}/${studentDetails._id}`, studentDetails)
                .then(() => {
                    displayAllStudents(); // Refresh student list after update
                })
                .catch(error => {
                    console.log(error);
                });
        });

        document.getElementById("address").addEventListener("blur", function () {
            studentDetails.address = document.getElementById("address").value;
            axios.put(`${CRUD_URL}/${studentDetails._id}`, studentDetails)
                .then(() => {
                    displayAllStudents(); // Refresh student list after update
                })
                .catch(error => {
                    console.log(error);
                });
        });
    });
}

function displayAllStudents() {
    axios.get(CRUD_URL)
        .then(response => {
            const studentList = document.querySelector("ul");
            studentList.innerHTML = ""; // Clear existing student list
            response.data.forEach(student => displayStudentOnScreen(student));
        })
        .catch(error => {
            console.log(error);
        });
}

// Initial display of students on page load
displayAllStudents();
