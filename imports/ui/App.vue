<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { autorun, subscribe } from 'vue-meteor-tracker';
import { TestCollection } from '../api/collection';

subscribe('testCollectionData');
const tes = autorun(() => TestCollection.find({}).fetch()).result;

const docs = computed(() => tes.value.length);
</script>

<template>
  <div v-if="docs < 10000" class="p-8">
    <h1 class="text-2xl">Please wait, loading collection...</h1>
    <div>{{ docs }} documents loaded</div>
  </div>

  <div v-else class="p-8">
    <router-view />
  </div>
</template>
