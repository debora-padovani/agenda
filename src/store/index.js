import { createStore } from 'vuex';
import { db } from '../db';

const store = createStore({
  state() {
    return {
      contactList: [],
      isAddModalOpened: false,
      deleteModal: {
        isDeleteModalOpened: false,
        idToDelete: null,
      },
      currentContact: null,
    };
  },
  getters: {
    GET_CONTACTLIST: (state) => state.contactList,
    GET_IS_CONTACTLIST_EMPTY: (state) => state.contactList.length === 0,
    GET_IS_ADD_MODAL_OPENED: (state) => state.isAddModalOpened,
    GET_DELETE_MODAL: (state) => state.deleteModal,
    GET_CURRENT_CONTACT: (state) => state.currentContact,
  },
  mutations: {
    SET_CONTACTLIST: (state, contacts) => {
      state.contactList = contacts;
    },
    SET_IS_ADD_MODAL_OPENED: (state, isOpened) => {
      state.isAddModalOpened = isOpened;
    },
    SET_DELETE_MODAL: (state, data) => {
      const { isOpened, idToDelete } = data;
      state.deleteModal.isDeleteModalOpened = isOpened;
      state.deleteModal.idToDelete = idToDelete;
    },
    SET_CURRENT_CONTACT: (state, contact) => {
      state.currentContact = contact;
    },
    FILTER_CONTACT_LIST: (state, searchTerm) => {
      const filteredContactList = [...state.contactList];
      filteredContactList.filter(((contact) => contact.name.includes(searchTerm)));
      console.log(filteredContactList);
      store.commit('SET_CONTACTLIST', filteredContactList);
    },
    // eslint-disable-next-line consistent-return
    ADD_CONTACT: async (state, contact) => {
      const { currentContact } = state;
      if (currentContact) return store.commit('UPDATE_CONTACT');
      const contactList = [...state.contactList];
      const newContact = { ...contact };
      newContact.highight = true;
      contactList.push(contact);
      store.commit('SET_CONTACTLIST', contactList);
      try {
        const id = await db.contacts.add(contact);

        store.commit('SET_IS_ADD_MODAL_OPENED', false);
        db.contacts.toArray().then((response) => {
          store.commit('SET_CONTACTLIST', response);
        });
        console.log('Contato adicionado com sucesso:', id);
      } catch (error) {
        console.error('Tivemos problemas para adicionar o contato, tente novamente mais tarde!');
      }
    },
    UPDATE_CONTACT: (state) => {
      const updatingContact = state.currentContact;
      db.contacts.put(updatingContact, updatingContact.id);
      store.commit('SET_CURRENT_CONTACT', null);
    },
    DELETE_CONTACT: (state, id) => {
      const contactList = [...state.contactList];
      const index = contactList.findIndex((item) => item.id === id);
      contactList.splice(index, 1);
      store.commit('SET_CONTACTLIST', contactList);
      db.contacts.delete(id);
      store.commit('SET_DELETE_MODAL', {
        isOpened: false,
        idToDelete: null,
      });
    },
  },
  actions: {
    loadContacts() {
      db.contacts.toArray().then((response) => store.commit('SET_CONTACTLIST', response));
    },
  },
});

export default store;
