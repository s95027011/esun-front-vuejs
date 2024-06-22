<template>
    <div>
      <h2>Available Products</h2>
      <ul>
        <li v-for="product in products" :key="product.id">
          <label>
            <input type="checkbox" v-model="selectedProducts" :value="product.id">
            {{ product.productName }} - {{ product.price }}
          </label>
        </li>
      </ul>
      <button @click="addToLikeList">Add Selected Products to Like List</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { token, userId, account } from '../store'; 
  
  const products = ref([]);
  const selectedProducts = ref([]);
  let hasLikeList = ref(false); // Use let to reassign
  
  onMounted(() => {
    fetchProducts();
    checkLikeList();
  });
  
  const fetchProducts = () => {
    axios.get('/api/products/all', {
      headers: {
        Authorization: `Bearer ${token.value}` 
      }
    })
      .then(response => {
        products.value = response.data;
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };
  
  const checkLikeList = () => {
    axios.get(`/api/user/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
      .then(response => {
        hasLikeList.value = response.data && response.data.length > 0; // Assuming the response contains data indicating if user has like list
      })
      .catch(error => {
        console.error('Error checking like list:', error);
      });
  };
  
  const addToLikeList = () => {
    if (selectedProducts.value.length === 0) {
      console.error('No products selected.');
      return;
    }
  
    const productIds = selectedProducts.value;
  
    const postData = {
      userId: userId.value,
      account: account.value,
      productIds: productIds
    };
  
    const url = hasLikeList.value
      ? `/api/like-list/update-products/${userId.value}`
      : '/api/like-list/add';
  
    axios({
      method: hasLikeList.value ? 'put' : 'post',
      url: url,
      data: postData,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
      .then(response => {
        console.log('Products added to like list:', response.data);
        selectedProducts.value = [];
        hasLikeList.value = true; // Assuming successful addition or update
      })
      .catch(error => {
        console.error('Error adding or updating products to like list:', error);
      });
  };
  </script>
  
  <style scoped>
  h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  label {
    display: block;
    cursor: pointer;
  }
  
  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  