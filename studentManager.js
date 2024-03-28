const CRUD_URL = 'https://crudcrud.com/api/ddd79ffefc8c456781c3d8b826ee9ed8/studentDetails';
function handleFormSubmit(event) {
    event.preventDefault();
    const studentDetails = {
      name: event.target.name.value,
      mobile: event.target.mobile.value,
      address: event.target.address.value,
    };
    window.addEventListener("DOMContentLoaded",()=>
    {
     axios
     .get(CRUD_URL,studentDetails)
     .then((response)=>{console.log(response);
      for(let i=0;i<response.data.length;i++){
        displayStudentOnScreen(response.data[i]);
      }
    })
     .catch((error)=>{console.log(error);})
    })
    axios
    .post(CRUD_URL,studentDetails)
    .then((response) => displayStudentOnScreen(response.data))
    .catch((error) => console.log(error));
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
  
    const studentList= document.querySelector("ul");
    studentList.appendChild(studentItem);
  
    deleteBtn.addEventListener("click", function (event) {
      studentList.removeChild(event.target.parentElement);
      localStorage.removeItem(studentDetails.name);
    });
  
    editBtn.addEventListener("click", function (event) {
      studentList.removeChild(event.target.parentElement);
      localStorage.removeItem(studentDetails.email);
      document.getElementById("name").value = studentDetails.name;
      document.getElementById("mobile").value = studentDetails.mobile;
      document.getElementById("address").value = studentDetails.address;
    });
  }
  