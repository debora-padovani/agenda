<script>
/* eslint-disable vuejs-accessibility/label-has-for */
/* eslint-disable vuejs-accessibility/click-events-have-key-events */
import { mapGetters } from 'vuex';

export default {
  name: 'AddContactModal',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
    };
  },
  mounted() {
    this.setSelectedContact();
  },
  watch: {
    selectedContact() {
      this.setSelectedContact();
    },
  },
  computed: {
    ...mapGetters({
      selectedContact: 'GET_SELECTED_CONTACT',
      contacts: 'GET_CONTACTLIST',
    }),
    isSomeInputFilled() {
      return this.name !== '' || this.email !== '' || this.phone !== '';
    },
  },
  methods: {
    closeModal() {
      this.$store.commit('SET_IS_ADD_MODAL_OPENED', false);
      this.$store.commit('SET_SELECTED_CONTACT', null);
    },
    saveContact() {
      const newContact = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        createdAt: new Date(),
      };
      if (this.selectedContact) {
        newContact.id = this.selectedContact;
      }
      this.$store.commit('ADD_CONTACT', newContact);
      this.name = '';
      this.email = '';
      this.phone = '';
    },
    setSelectedContact() {
      if (this.selectedContact) {
        const contactToEdit = this.contacts.find(
          (contact) => contact.id === this.selectedContact,
        );
        this.name = contactToEdit.name;
        this.email = contactToEdit.email;
        this.phone = contactToEdit.phone;
      } else {
        this.name = '';
        this.email = '';
        this.phone = '';
      }
    },
  },
};
</script>

<template>
  <div class="modal-container">
    <div class="modal-overlay" @click="closeModal"></div>
    <div class="modal-content">
      <div class="modal-header">
        <h2 v-if="selectedContact">Editar contato</h2>
        <h2 v-else>Criar novo contato</h2>
      </div>
      <form class="modal-form">
        <div class="form-group">
          <label for="name">Nome</label>
          <input type="text" id="name" v-model="name" />
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="form-group">
          <label for="phone">Telefone</label>
          <input type="text" id="phone" v-model="phone" />
        </div>
      </form>
      <div class="modal-buttons">
        <button class="cancel-button" @click="closeModal">Cancelar</button>
        <button
          class="save-button"
          :disabled="!isSomeInputFilled"
          @click="saveContact"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-container {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);

  cursor: pointer;
}
.modal-content {
  background: #fff;
  z-index: 1;
  position: absolute;
  border-radius: 16px;
  box-shadow: 0 16px 10px 0 rgba(0, 0, 0, 0.16);
  min-width: 20rem;
}
.modal-header {
  padding: 0 1.5rem;
  border-bottom: 1px solid #c0c3d2;

  h2 {
    color: #2a2d3b;
    font-size: 1rem;
    font-weight: 400;

    margin: 0;
    padding: 0.5rem 0;
  }
}
.modal-form {
  padding: 0.5rem 1.5rem;

  .form-group {
    margin-bottom: 0.5rem;

    label {
      display: block;

      font-size: 0.875rem;
      color: #2a2d3b;
    }
    input {
      border-radius: 4px;
      border: 1px solid #c0c3d2;
      width: 100%;
    }
  }
}

.modal-buttons {
  padding: 0.5rem 1.5rem;
  border-top: 1px solid #c0c3d2;

  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    font-size: 0.875rem;
    font-weight: 500;

    padding: 0.5rem 1rem;
    border-radius: 16px;
    border: none;

    cursor: pointer;
  }

  .cancel-button {
    color: #fa7268;
    background: #fff;
    border: none;
  }
  .save-button {
    background-color: #fa7268;
    color: #fff;

    &:disabled {
      opacity: 0.4;
      pointer-events: none;
      cursor: none;
    }
  }
}
</style>
