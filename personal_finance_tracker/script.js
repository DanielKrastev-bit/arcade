document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-btn');
    const amountInput = document.getElementById('amount');
    const netBalance = document.getElementById('net-balance');

    let total = 0;

    function addTransaction(e) {
        e.preventDefault();
        const amount = parseFloat(amountInput.value.trim());

        if (!isNaN(amount)) {
            total += amount;
            netBalance.textContent = `$${total.toFixed(2)}`;
            amountInput.value = '';
        }
    }

    addBtn.addEventListener('click', addTransaction);
});
