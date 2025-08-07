/*signup*/

  document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const user = { fullName, username, password, role };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now log in.");
    window.location.href = "login.html";
  });



/*login*/
    document.getElementById("loginForm").addEventListener("submit", function(e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Get users array from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find matching user
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        alert("Login successful!");

        // Redirect by role
        if (user.role === "admin") {
          window.location.href = "admin_dashboard.html";
        } else if (user.role === "cashier") {
          window.location.href = "cashier_dashboard.html";
        } else {
          alert("Unknown role!");
        }
      } else {
        alert("Invalid credentials. Please try again or sign up.");
      }
    });
  
 /* seach*/
    function filterTable() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toLowerCase();
    const table = document.getElementById("customerTable");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName("td");
      let match = false;

      // Only check column 0 (Account No) and 1 (Name)
      for (let j of [0, 1]) {
        if (cells[j]) {
          const textValue = cells[j].textContent || cells[j].innerText;
          if (textValue.toLowerCase().includes(filter)) {
            match = true;
            break;
          }
        }
      }

      row.style.display = match ? "" : "none";
    }
  }
/* filterBooks  */
function filterBooks() {
    const input = document.getElementById("categorySearch").value.toLowerCase();
    const table = document.getElementById("booksTable");
    const tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
      const td = tr[i].getElementsByTagName("td")[3]; // Category column
      if (td) {
        const txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().includes(input)) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
  
//  view_customers.html – Show All Customers + Units Consumed
  window.onload = function () {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const tableBody = document.getElementById("customerTableBody");

    customers.forEach((c) => {
      const row = `
        <tr>
          <td>${c.accountNo}</td>
          <td>${c.name}</td>
          <td>${c.address}</td>
          <td>${c.phone}</td>
          <td>${c.units}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
  };

// add_customer.html – Store Customer 
document.getElementById("addCustomerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const customer = {
      accountNo: this.accountNo.value.trim(),
      name: this.name.value.trim(),
      address: this.address.value.trim(),
      phone: this.phone.value.trim(),
      units: 0
    };

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    customers.push(customer);
    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Customer added successfully!");
    window.location.href = "billing.html"; // Redirect to billing
  });
  
  
  // edit js
  