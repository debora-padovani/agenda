<script>
export default {
  name: 'ContactItem',
  props: ['contact'],
  data() {
    return {
      isContactRecentlyAdded: false,
    };
  },
  created() {
    this.checkIfIsContactRecentlyAdded();
    if (this.isContactRecentlyAdded) {
      setTimeout(() => {
        this.isContactRecentlyAdded = false;
      }, 10000);
    }
  },
  methods: {
    randomDigit() {
      return Math.round(Math.random() * 255);
    },
    editContact() {
      this.$store.commit('SET_SELECTED_CONTACT', this.contact.id);
      this.$store.commit('SET_IS_ADD_MODAL_OPENED', true);
    },
    deleteContact() {
      this.$store.commit('SET_DELETE_MODAL', {
        isOpened: true,
        idToDelete: this.contact.id,
      });
    },
    checkIfIsContactRecentlyAdded() {
      const { createdAt } = this.contact;
      if (createdAt) {
        const timeDifference = (
          new Date().getTime() - createdAt.getTime()
        ) / 1000;
        this.isContactRecentlyAdded = timeDifference < 10;
      } else {
        this.isContactRecentlyAdded = false;
      }
    },
  },
  computed: {
    randomBackground() {
      const r = this.randomDigit();
      const g = this.randomDigit();
      const b = this.randomDigit();
      return `background: rgba(${r}, ${g}, ${b})`;
    },
  },
};
</script>

<template>
  <div :class="['contactlist-item', isContactRecentlyAdded ? 'highlight' : '']">
    <span :style="randomBackground">{{ contact.name.substring(0, 1) }}</span>
    <p>{{ contact.name }}</p>
    <p>{{ contact.email }}</p>
    <p>{{ contact.phone }}</p>
    <div>
      <button type="button" @click="editContact">
        <img src="@/assets/ic-edit.svg" alt="edit icon" />
      </button>
      <button type="button" @click="deleteContact">
        <img src="@/assets/ic-delete.svg" alt="delete icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.contactlist-item {
  border-bottom: 1px solid #e1e1e1;

  width: 100%;
  display: grid;
  grid-template-columns: 10% 20% 40% 20% 10%;
  align-items: center;

  @media screen and (max-width: 767px) {
    grid-template-columns: 100%;
    padding: 0.25rem 0.75rem;
    width: auto;
  }

  &:hover,
  &.highlight {
    background: #fff3f2;
  }

  span {
    text-transform: uppercase;
    color: #fff;
    font-size: 1rem;

    background-color: #ff5722;

    margin: 0.5rem;
    height: 1.5rem;
    width: 1.5rem;

    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    color: #2a2d3b;
    font-size: 0.813rem;

    margin: 0.5rem;
  }

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;

    @media screen and (max-width: 767px) {
      gap: 1.5rem;
      order: -1;
      margin-top: 1rem;
    }
  }
  button {
    background: none;
    border: none;

    cursor: pointer;
  }
}
</style>
