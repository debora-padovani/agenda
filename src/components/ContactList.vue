<script>

import { mapGetters } from 'vuex';
import ContactItem from './ContactItem.vue';

export default {
  name: 'ContactList',
  components: { ContactItem },
  computed: {
    ...mapGetters({
      contacts: 'GET_CONTACTLIST',
    }),
  },
};
</script>

<template>
  <div class="contactlist-table">
    <div class="contactlist-table-header">
      <p>Contatos</p>
      <p>E-mail</p>
      <p>Telefone</p>
    </div>
    <ContactItem v-for="contact in contacts" :key="contact.id" :contact="contact"/>
  </div>
</template>

<style lang="scss">
  .contactlist-table {
    margin-top: 1rem;
    border: 1px solid #e1e1e1;
  }
  .contactlist-table-header {
    width: 100%;
    display: grid;
    grid-template-columns: 30% 40% 30%;

    border-bottom: 1px solid #e1e1e1;

    p {
      color: #9198af;
      font-size: 0.813rem;

      margin: 0.5rem;
    }
  }
</style>
