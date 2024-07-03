document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const amountInput = document.getElementById('amount');
    const transactionList = document.getElementById('transaction-list');
    const netBalance = document.getElementById('net-balance');

    let total = 0;

    function addTransaction(e) {
        e.preventDefault();
        const amount = parseFloat(amountInput.value.trim());

        if (!isNaN(amount)) {
            total += amount;
            netBalance.textContent = `$${total.toFixed(2)}`;
            addTransactionDOM(amount);
            amountInput.value = '';
        }
    }

    function addTransactionDOM(amount) {
        const item = document.createElement('li');
        item.textContent = amount > 0 ? `+${amount}` : `${amount}`;
        item.classList.add(amount >= 0 ? 'positive' : 'negative');
        transactionList.appendChild(item);
    }

    addBtn.addEventListener('click', addTransaction);
});
