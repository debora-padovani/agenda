<script>
/* eslint-disable vuejs-accessibility/form-control-has-label */

export default {
  name: 'AddContactButton',
  methods: {
    openAddModal() {
      this.$store.commit('SET_IS_ADD_MODAL_OPENED', true);
    },
  },

};
</script>

<template>
  <button type="button" @click="openAddModal" class="button-addcontact">
    &#43; Criar Contato
  </button>
</template>

<style lang="scss">
.button-addcontact {
  width: 9rem;
  height: 2.5rem;
  padding: 0.75rem 1.375rem 0.75rem 1rem;
  border-radius: 20px;
  border: none;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.16), 0 0 0 0.5px
rgba(0, 0, 0, 0.08), inset 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 2px 4px 0.5px rgba(0, 0, 0, 0.16);
  background-color: #dbff90;

  color: #fa7268;
  font-size: 0.875rem;
  font-weight: 600;

  cursor: pointer;
}
</style>
