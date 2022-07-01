<script>
import { mapGetters } from 'vuex';

import AppHeader from './components/AppHeader.vue';
import ContactList from './components/ContactList.vue';
import EmptyList from './components/EmptyList.vue';
import AddContactModal from './components/AddContactModal.vue';
import DeleteContactModal from './components/DeleteContactModal.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    ContactList,
    EmptyList,
    AddContactModal,
    DeleteContactModal,
  },
  computed: {
    ...mapGetters({
      isContactListEmpty: 'GET_IS_CONTACTLIST_EMPTY',
      isContactModalOpened: 'GET_IS_ADD_MODAL_OPENED',
      deleteModal: 'GET_DELETE_MODAL',
    }),
  },
  created() {
    this.$store.dispatch('loadContacts');
  },

};
</script>

<template>
  <div class="container">
    <AppHeader/>
    <EmptyList v-if="isContactListEmpty"/>
    <ContactList v-else/>
    <AddContactModal v-show="isContactModalOpened"/>
    <DeleteContactModal v-show="deleteModal.isDeleteModalOpened"/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

html {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-weight: 400;
  font-size: 100%;

  @media screen and (max-width:767px) {
    font-size: 90%;
  }
  @media screen and (max-width:430px) {
    font-size: 85%;
  }
}

body {
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  background-color: #f8f9fd;
}

.container {
  padding: 1rem;
}
</style>
