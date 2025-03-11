<script lang="ts" setup>
const isOpen = ref(false);

const { deleteFriend } = HandleFriendRequest();

defineProps<{ id: number; panelid: number }>();

const togglePanel = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <button @click="togglePanel" v-on:focusout="isOpen = false">
    <Icon name="ri:more-2-fill" id="icon" />

    <div v-if="isOpen" id="panel-instructions">
      <ul class="list-instruction">
        <li class="instructions" @click="deleteFriend(id, panelid)">
          <Icon name="ri:delete-bin-7-line" class="icon-btn" />
          <span> Supprimer</span>
        </li>
      </ul>
    </div>
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;
button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  border-radius: 50%;
  transition: all 0.125s ease;
  position: relative;

  #icon {
    color: white;
    font-size: 40px;
  }

  #panel-instructions {
    position: absolute;
    z-index: 2;
    right: 0;
    top: 100%;
    background-color: $color-background-black-similar;
    border: 1px solid $color-border-discret;
    width: fit-content;
    height: fit-content;
    padding: 10px 5px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;

    .list-instruction {
      display: flex;
      flex-direction: column;
      gap: 10px;
      .instructions {
        display: inline-flex;
        flex-wrap: nowrap;
        border-radius: 5px;
        padding: 7px 5px;
        align-items: center;
        line-height: 1;
        justify-content: center;
        transition: all 0.125s ease;

        span {
          color: white;
          font-family: "Lato";
          font-size: 16px;
          display: inline-flex;
        }
        .icon-btn {
          font-size: 16px;
          margin-right: 5px;
        }
        &:hover {
          background-color: rgb(241, 37, 37);
        }
      }
    }
  }

  &:hover {
    cursor: pointer;
    background: white;

    #icon {
      color: black;
    }
  }
}
</style>
