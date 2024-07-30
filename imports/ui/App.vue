<script setup>
import { Tracker } from 'meteor/tracker';
import { ref } from 'vue';
import { TestCollection } from '../api/collection';
import { collectionSize } from '../api/main';

const docs = ref(0);

Meteor.subscribe('testCollectionData');

Tracker.autorun(() => {
  const data = TestCollection.find({}).fetch();
  docs.value = data.length;
});
</script>

<template>
  <div v-if="docs < collectionSize" class="p-8">
    <h1 class="text-2xl">Please wait, loading collection...</h1>
    <div>{{ docs }} documents loaded</div>
  </div>

  <div v-else class="p-8">
    <router-view />
  </div>
</template>
