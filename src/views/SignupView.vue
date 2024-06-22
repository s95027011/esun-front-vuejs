<template>
  <div class="register-form">
    <form @submit.prevent="handleSignup">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" placeholder="Enter your password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" placeholder="Confirm your password" required>
      </div>
      <div class="form-group">
        <label for="userName">Name:</label>
        <input type="text" id="userName" v-model="form.userName" placeholder="Enter your name" required>
      </div>
      <div class="form-group">
        <label for="bankAccount">Bank Account:</label>
        <input type="text" id="bankAccount" v-model="form.bankAccount" @keydown="checkDigit" placeholder="Enter your bank account number" required>
        <small v-if="!isInputValid.bankAccount" class="text-danger">Please enter only digits.</small>
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  email: '',
  password: '',
  confirmPassword: '',
  userName: '',
  bankAccount: ''
});

const isInputValid = ref({
  bankAccount: true
});

const handleSignup = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const signupData = {
    email: form.value.email,
    password: form.value.password,
    confirmPassword: form.value.confirmPassword,
    userName: form.value.userName,
    account: form.value.bankAccount
  };

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    });

    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || 'Registration failed');
    }

    alert('Registration successful!');
    // Reset form fields after successful registration
    Object.keys(form.value).forEach(key => form.value[key] = '');
  } catch (error) {
    console.error('Registration Error:', error.message);
    alert('Registration failed');
  }
};

const checkDigit = (event: KeyboardEvent) => {
  if (!(event.key === 'Backspace' || event.key === 'Delete') && isNaN(Number(event.key))) {
    event.preventDefault();
  }
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.text-danger {
  color: red;
}
</style>
