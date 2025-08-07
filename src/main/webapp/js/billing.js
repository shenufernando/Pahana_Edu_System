
/*billing*/
// Get all elements
const customerSelect = document.getElementById('customerSelect');
const itemSelect = document.getElementById('itemSelect');
const qtyInput = document.getElementById('qtyInput');
const addItemBtn = document.getElementById('addItemBtn');
const totalAmountSpan = document.getElementById('totalAmount');
const billOutput = document.getElementById('billOutput');
const printBillBtn = document.getElementById('printBillBtn');
const paymentMethod = document.getElementById('paymentMethod');
const cardSection = document.getElementById('cardSection');
const cardName = document.getElementById('cardName');
const cardNumber = document.getElementById('cardNumber');
const cvv = document.getElementById('cvv');

let billItems = [];
let totalAmount = 0;




// 🔸 Track total units (books) added
let unitsConsumed = 0;

document.getElementById("addItemBtn").addEventListener("click", () => {
  const qty = parseInt(document.getElementById("qtyInput").value || 0);
  if (!isNaN(qty) && qty > 0) {
    unitsConsumed += qty;
    document.getElementById("unitsConsumed").textContent = unitsConsumed;
  }

  // Optional: Update billOutput as well (if needed)
  const output = document.getElementById("billOutput");
  output.textContent += `\nUnits Added: ${qty}`;
});



// Example:
document.getElementById("billOutput").textContent += `\nTotal Units Consumed: ${unitsConsumed}`;





// Show or hide card fields based on selected method
paymentMethod.addEventListener("change", () => {
  if (paymentMethod.value === "card") {
    cardSection.style.display = "block";
  } else {
    cardSection.style.display = "none";
  }
});

// Add item to bill
addItemBtn.addEventListener('click', () => {
  const customerId = customerSelect.value;
  if (!customerId) {
    alert('Please select a customer!');
    return;
  }

  const itemIndex = itemSelect.selectedIndex;
  if (itemIndex <= 0) {
    alert('Please select a book!');
    return;
  }

  const itemCode = itemSelect.value;
  const itemName = itemSelect.options[itemIndex].text.split(' - ')[0];
  const price = Number(itemSelect.options[itemIndex].dataset.price);
  const qty = Number(qtyInput.value);

  if (qty <= 0) {
    alert('Quantity must be at least 1');
    return;
  }

  billItems.push({ itemCode, itemName, price, qty });
  totalAmount += price * qty;
  totalAmountSpan.textContent = totalAmount;

  alert("Item added! Now select payment method and click Make Payment.");

  // Reset selection
  itemSelect.selectedIndex = 0;
  qtyInput.value = 1;
});

// Create Make Payment button dynamically
const payBtn = document.createElement('button');
payBtn.textContent = 'Make Payment';
payBtn.className = 'btn';
payBtn.style.marginTop = '20px';
document.querySelector('.billing-container').appendChild(payBtn);

payBtn.addEventListener('click', () => {
  if (billItems.length === 0) {
    alert("Add at least one item before paying.");
    return;
  }

  const method = paymentMethod.value;
  if (!method) {
    alert("Please select a payment method.");
    return;
  }

  // Validate card details if card is selected
  if (method === 'card') {
    if (!cardName.value.trim() || !cardNumber.value.trim() || !cvv.value.trim()) {
      alert("Please enter all card details.");
      return;
    }
  }

  // Render and show the bill
  renderBill();
  printBillBtn.style.display = 'inline-block';

  // Thank you message
  const thankYou = document.createElement('p');
  thankYou.textContent = "✅ Payment Successful. Thank you!";
  thankYou.style.color = "green";
  thankYou.style.fontWeight = "bold";
  thankYou.style.textAlign = "center";
  thankYou.style.marginTop = "15px";
  document.querySelector('.billing-container').appendChild(thankYou);

  // Disable button after payment
  payBtn.disabled = true;
});

// Render bill output
function renderBill() {
  let output = '--- Pahana Edu Bookshop ---\n';
  output += `Customer ID: ${customerSelect.value}\n\n`;
  output += 'Items:\n';
  output += 'Code | Title               | Qty | Price | Total\n';
  output += '----------------------------------------------\n';

  billItems.forEach(item => {
    const lineTotal = item.price * item.qty;
    output += `${item.itemCode.padEnd(5)}| ${item.itemName.padEnd(20)}| ${item.qty.toString().padEnd(4)}| ${item.price.toString().padEnd(6)}| ${lineTotal}\n`;
  });

  output += '----------------------------------------------\n';
  output += `Total Amount: Rs. ${totalAmount}\n`;
  output += `Payment Method: ${paymentMethod.value === "card" ? "Card" : "Cash"}\n`;
  output += 'Thank you for your purchase!';

  billOutput.textContent = output;
}

// Print bill
printBillBtn.addEventListener('click', () => {
  const printContents = billOutput.textContent;
  const newWindow = window.open('', '', 'width=600,height=400');
  newWindow.document.write('<pre>' + printContents + '</pre>');
  newWindow.document.close();
  newWindow.focus();
  newWindow.print();
  newWindow.close();
});



  // Load customers into dropdown
  window.onload = function () {
    const customerSelect = document.getElementById("customerSelect");
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    customers.forEach((c, i) => {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${c.name} (${c.accountNo})`;
      customerSelect.appendChild(option);
    });
  };

  function addBill() {
    const index = document.getElementById("customerSelect").value;
    const units = parseInt(document.getElementById("unitsInput").value);
    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    if (index !== "" && !isNaN(units)) {
      customers[index].units += units;
      localStorage.setItem("customers", JSON.stringify(customers));
      alert("Billing completed!");

      window.location.href = "view_customers.html";
    } else {
      alert("Please select a customer and enter valid units.");
    }
  }











