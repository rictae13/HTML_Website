// Function to animate the page
const pageAnimation = () => {
    document.querySelector('body').style.opacity = 1;
    };
    
    // A flag to keep track of whether the table is already displayed or not
    let flag = false;
    
    // Function to handle form submission
    const onSubmit = () => {
    const data = []; // Array to store user input data
    const skills = []; // Array to store user-selected skills
    
    // Get user input values
    const name = document.getElementById('inputName').value;
    const email = document.getElementById('inputEmail').value;
    const website = document.getElementById('inputWebsite').value;
    const image = document.getElementById('inputImage').value;
    
    // Get selected gender value
    const gender = document.querySelector('input[name="gender"]:checked').value;
    
    // Get selected skills
    const checkboxes = document.querySelectorAll('input[name="skills"]:checked');
    for (let i = 0; i < checkboxes.length; i++) {
    skills.push(checkboxes[i].value);
    }
    
    // Add user input to data array
    data.push({
    name,
    email,
    website,
    image,
    gender,
    skills: [...skills],
    });
    
    // If the table is not already displayed, show it
    if (!flag) {
    showTable();
    flag = true;
    }
    
    // Add user data to the table
    addRow(data);
    };
    
    // Function to display the table
    const showTable = () => {
    const template = document.querySelector('template');
    const dataTable = template.content.cloneNode(true);
    const enrolledSection = document.querySelector('.enrolled-section');
    const oldChild = enrolledSection.children[0];
    enrolledSection.replaceChild(dataTable, oldChild);
    };
    
    // Function to add a row to the table
    const addRow = (data) => {
    const table = document.getElementById('table-data');
    const rowCount = table.rows.length;
    const row = table.insertRow(rowCount);
    
    // Add user data to the table row
    row.insertCell(0).innerHTML = `<td>
       <span class="font-weight-bold">${data[0].name}</span><br />
       <span>${data[0].gender}</span><br />
       <span>${data[0].email}</span><br />
       <a href="http://${data[0].website}"
       target="_blank"
       rel="noopener noreferrer">
       <u>${data[0].website}</u></a><br />
       ${data[0].skills.map(skill => `<span>${skill}</span>`).join(',')}
    </td>`;

    // Add user image to the table row
    row.insertCell(1).innerHTML = `<td style="width:100px;height:1120px">
      <img src="${data[0].image}" onerror="this.src='assets/fallback-image.jpg'" alt="image"/>
    </td>`;
    };