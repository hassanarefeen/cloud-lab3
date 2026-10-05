const userForm = document.getElementById('userForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const userList = document.getElementById('userList');

// LocalStorage ya JSON file se data fetch karna
async function getUsers() {
  let users = localStorage.getItem('users_data');
  
  if (!users) {
    // Agar local memory me data nahi hai toh initial users.json file se load karo
    try {
      const res = await fetch('users.json');
      const data = await res.json();
      localStorage.setItem('users_data', JSON.stringify(data));
      return data;
    } catch (err) {
      return [];
    }
  }
  
  return JSON.parse(users);
}

// User List UI par display karna
async function renderUsers() {
  const users = await getUsers();
  userList.innerHTML = '';
  
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} (${user.email})`;
    userList.appendChild(li);
  });
}

// Form Submit handling (Naya user add karna)
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  
  const users = await getUsers();
  
  const newUser = {
    id: Date.now(),
    name,
    email
  };
  
  users.unshift(newUser); // Sub se upar add karo
  
  // Storage update (JSON stringify karke)
  localStorage.setItem('users_data', JSON.stringify(users));
  
  nameInput.value = '';
  emailInput.value = '';
  
  renderUsers();
});

// App start par users dikhao
renderUsers();