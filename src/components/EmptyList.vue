<script>

import AddContactButton from './AddContactButton.vue';

export default {
  name: 'EmptyList',
  components: { AddContactButton },
};
</script>

<template>
  <main class="app-main">
    <img src="@/assets/ic-book.svg" class="ic_logo" alt="book icon">
    <p> Nenhum contato foi criado ainda </p>
    <AddContactButton/>
  </main>
</template>

<style lang="scss">

.app-main {
  margin-top: 5rem;
  text-align: center;

  p {
    font-size: 1rem;
    color: #2a2d3b
  }
}

</style>
