// src/store.js

import { ref } from 'vue';

export const isAuthenticated = ref(false);
export const userName = ref('');
export const account = ref('');
export const userId = ref('');
export const token = ref('');

// Check if token exists in localStorage
if (localStorage.getItem('token')) {
  token.value = localStorage.getItem('token');
  isAuthenticated.value = true;
  // Fetch user info using the stored token
  fetchUserInfo(); // This function should be called during initialization
}

async function fetchUserInfo() {
  try {
    const response = await fetch('api/users/me', {
      headers: {
        'Authorization': `Bearer ${token.value}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await response.json();
    userName.value = userData.userName;
    userId.value = userData.id; // Use userData.id to get the user ID
    account.value = userData.account;
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    logout();
  }
}

export async function login(userToken) {
  token.value = userToken;
  localStorage.setItem('token', userToken);
  isAuthenticated.value = true;
  await fetchUserInfo();
}

export function logout() {
  token.value = '';
  isAuthenticated.value = false;
  userName.value = '';
  userId.value = '';
  localStorage.removeItem('token');
}
