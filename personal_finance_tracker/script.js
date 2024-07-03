function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
  }
  
  function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  }
  
  async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const result = await response.json();
      if (result.success) {
        showTracker(result.username);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function register() {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
  
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: newUsername, password: newPassword })
      });
  
      const result = await response.json();
      if (result.success) {
        alert(result.message);
        showLoginForm();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function showTracker(username) {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('tracker').style.display = 'block';
  
    try {
      const response = await fetch(`http://localhost:3000/userdata/${username}`);
      const result = await response.json();
  
      if (result.success) {
        updateTransactions(result.user.transactions);
        updateBalance(result.user.balance);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  async function addTransaction() {
    const username = document.getElementById('username').value;
    const amount = document.getElementById('transactionAmount').value;
  
    try {
      const response = await fetch(`http://localhost:3000/addtransaction/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount })
      });
  
      const result = await response.json();
      showTracker(username);
      updateBalance(username);

    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function logout() {
    document.getElementById('tracker').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  }
  
  function updateTransactions(transactions) {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
      const listItem = document.createElement('li');
      listItem.textContent = transaction > 0 ? `+${transaction}` : `${transaction}`;
      listItem.className = transaction > 0 ? 'positive' : 'negative';
      transactionList.appendChild(listItem);
    });
  }
  
  function updateBalance(balance) {
    document.getElementById('net-balance').textContent = `$${balance.toFixed(2)}`;
  }
  