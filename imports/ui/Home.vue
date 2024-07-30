<script setup>
import { Meteor } from 'meteor/meteor';
import { ref } from 'vue';

const error = ref();
const username = ref('');
const userId = ref(null);
const token = ref(null);

const create = async () => {
  error.value = null;

  try {
    const response = await Meteor.callAsync('createUser', username.value);
    userId.value = response.userId;
    token.value = response.token;
    if (response.token) {
      Meteor.loginWithToken(response.token.token);
    }
  } catch (e) {
    error.value = e;
  }
}
</script>

<template>
  <input v-model="username" class="border rounded-lg p-2" placeholder="Enter username" type="text" />
  <button @click="create" :disabled="username === ''" class="border rounded-lg p-2 ml-5 hover:bg-gray-200">
    Create user
  </button>

  <div v-if="userId" class="mt-5">
    User <code class="bg-gray-200 px-1">{{ userId }}</code> created.
  </div>

  <div v-if="error" class="mt-5 text-red-700">
    {{ error }}
  </div>
</template>
