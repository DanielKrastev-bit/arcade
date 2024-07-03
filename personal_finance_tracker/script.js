document.addEventListener('DOMContentLoaded', () => {
    const incomeBtn = document.getElementById('income-btn');
    const expenseBtn = document.getElementById('expense-btn');
    const resetBtn = document.getElementById('reset-btn');
    const amountInput = document.getElementById('amount');
    const transactionList = document.getElementById('transaction-list');
    const netBalance = document.getElementById('net-balance');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    let total = 0;

    function saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function updateTotal() {
        total = transactions.reduce((acc, t) => acc + t.amount, 0);
        netBalance.textContent = `$${total.toFixed(2)}`;
    }

    function addIncome() {
        const amount = parseFloat(amountInput.value.trim());
        
        if (!isNaN(amount)) {
            transactions.push({ id: Date.now(), amount: amount });
            addTransactionDOM(amount);
            updateTotal();
            saveTransactions();
            amountInput.value = '';
        }
    }

    function addExpense() {
        const amount = parseFloat(amountInput.value.trim());
        
        if (!isNaN(amount)) {
            transactions.push({ id: Date.now(), amount: -amount });
            addTransactionDOM(-amount);
            updateTotal();
            saveTransactions();
            amountInput.value = '';
        }
    }

    function addTransactionDOM(amount) {
        const item = document.createElement('li');
        item.textContent = amount > 0 ? `+${amount}` : `${amount}`;
        item.classList.add(amount >= 0 ? 'positive' : 'negative');
        transactionList.appendChild(item);
    }

    function resetTransactions() {
        transactions = [];
        transactionList.innerHTML = '';
        total = 0;
        netBalance.textContent = `$${total.toFixed(2)}`;
        localStorage.removeItem('transactions');
    }

    incomeBtn.addEventListener('click', addIncome);
    expenseBtn.addEventListener('click', addExpense);
    resetBtn.addEventListener('click', resetTransactions);
    
    function init() {
        transactionList.innerHTML = '';
        transactions.forEach(transaction => {
            addTransactionDOM(transaction.amount);
        });
        updateTotal();
    }

    init();
    document.addEventListener("DOMContentLoaded", function() {
        const username = localStorage.getItem("username");
        if (username) {
            showApp();
        } else {
            showLoginForm();
        }
    });
    
    document.getElementById("login-btn").addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
    
        if (username === "daniel" && password === "daniel") {
            localStorage.setItem("username", username);
            showApp();
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });
    
    function showLoginForm() {
        document.getElementById("login-form").style.display = "block";
        document.getElementById("app").style.display = "none";
    }
    
    function showApp() {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("app").style.display = "block";
    }
    
});
