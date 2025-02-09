const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

document.getElementById("expense-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    if (!title || !amount || !date) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
    }

    const expense = { id: Date.now(), title, amount, category, date };
    expenses.push(expense);
    saveToLocalStorage();
    renderExpenses();
    this.reset();
});

function renderExpenses() {
    const list = document.getElementById("expense-list");
    const noExpensesMessage = document.getElementById("no-expenses");
    list.innerHTML = "";

    if (expenses.length === 0) {
        noExpensesMessage.style.display = "block";
    } else {
        noExpensesMessage.style.display = "none";
        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.innerHTML = `${expense.title} - ${expense.amount} บาท (${expense.category}) วันที่: ${expense.date} 
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">ลบ</button>`;
            list.appendChild(li);
        });
    }
}

function deleteExpense(id) {
    const index = expenses.findIndex(expense => expense.id === id);
    if (index !== -1) {
        expenses.splice(index, 1);
        saveToLocalStorage();
        renderExpenses();
    }
}

renderExpenses();
