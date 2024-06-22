<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3 v-if="!isAuthenticated">
      想要開始使用請先
      <router-link to="/login" rel="noopener">登入</router-link>
      ，如果尚未有帳號者，請先
      <router-link to="/signup" rel="noopener">註冊</router-link>
    </h3>
    <h3 v-else>
      {{ userName }} 您好
      <button @click="handleLogout">登出</button>
    </h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { isAuthenticated, userName, logout } from '../store';

const props = defineProps({
  msg: {
    type: String,
    required: true
  }
});

const handleLogout = () => {
  logout();
  alert('Logout successful!');
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
