<script>
/* eslint-disable vuejs-accessibility/label-has-for */
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
import { mapGetters } from 'vuex';

export default {
  name: 'DeleteContactModal',
  computed: {
    ...mapGetters({
      deleteModal: 'GET_DELETE_MODAL',
    }),
  },
  methods: {
    deleteItem() {
      this.$store.commit('DELETE_CONTACT', this.deleteModal.idToDelete);
    },
    closeModal() {
      this.$store.commit('SET_DELETE_MODAL', {
        isOpened: false,
        idToDelete: null,
      });
    },
  },
};
</script>

<template>
  <div class="modal-container">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2>Excluir contato</h2>
      </div>
      <div class="confirm-message">
        <p>Deseja realmente excluir o contato?</p>
      </div>
      <div class="modal-buttons">
        <button class="cancel-button" @click="closeModal">Cancelar</button>
        <button
          class="save-button"
          @click="deleteItem"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.confirm-message {
  p {
    color: #2a2d3b;
    font-size: 0.875rem;
    padding: 1rem 2rem 3rem;
  }
}
</style>
