document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionList = document.getElementById('transaction-list');
    const netBalance = document.getElementById('net-balance');

    let transactions = [];

    function updateTotal() {
        const total = transactions.reduce((acc, t) => acc + t.amount, 0);
        netBalance.textContent = `$${total.toFixed(2)}`;
    }

    function addTransaction(e) {
        e.preventDefault();
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value.trim());

        if (description && !isNaN(amount)) {
            const transaction = { id: Date.now(), description, amount };
            transactions.push(transaction);
            addTransactionDOM(transaction);
            updateTotal();
            descriptionInput.value = '';
            amountInput.value = '';
        }
    }

    function addTransactionDOM(transaction) {
        const item = document.createElement('li');
        item.innerHTML = `
            ${transaction.description}
            <span>${transaction.amount > 0 ? '+' : ''}${transaction.amount}</span>
        `;
        transactionList.appendChild(item);
    }

    addBtn.addEventListener('click', addTransaction);
});
