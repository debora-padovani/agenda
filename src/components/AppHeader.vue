<script>
/* eslint-disable vuejs-accessibility/form-control-has-label */

import { mapGetters } from 'vuex';
import AddContactButton from './AddContactButton.vue';

export default {
  name: 'AppHeader',
  data() {
    return {
      searchTerm: '',
    };
  },
  components: { AddContactButton },
  computed: {
    ...mapGetters({
      isContactListEmpty: 'GET_IS_CONTACTLIST_EMPTY',
    }),
  },
  watch: {
    searchTerm(value) {
      this.$store.commit('FILTER_CONTACT_LIST', value);
    },
  },
};
</script>

<template>
  <header class="app-header">
    <img src="@/assets/ic-logo.svg" class="ic_logo" alt="logo ubook" />
    <AddContactButton v-if="!isContactListEmpty" />
    <div class="header-search">
      <input type="search" placeholder="Buscar..." v-model="searchTerm"/>
      <span>
        <img src="@/assets/ic-search.svg" alt="search icon" />
      </span>
    </div>
  </header>
</template>

<style lang="scss">
.app-header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}

.header-search {
  position: relative;
  width: 60%;

  @media screen and (max-width: 992px) {
    width: 100%;
    margin-top: 1rem;
  }

  input {
    background: #e4e7f4;
    border: none;
    color: #9198af;

    width: 100%;
    padding: 0.438rem 0.5rem 0.375rem;
    border-radius: 4px;

    &::placeholder {
      color: inherit;
    }
  }

  span {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
