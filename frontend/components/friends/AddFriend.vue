<script lang="ts" setup>
import { useDebounceFn } from "@vueuse/core";

const { searchFriends, sendRequest } = HandleFriendRequest();
const searchQuery = ref("");
const results = ref<Array<Record<string, any>>>([]);

const showresult = ref(false);

let timeoutId: ReturnType<typeof setTimeout>;

const debouncedSearch = useDebounceFn(async () => {
  const request = (await searchFriends(searchQuery.value)) as Array<
    Record<string, any>
  >;
  results.value = request;
}, 300);

function handleFocusOut() {
  timeoutId = setTimeout(() => {
    showresult.value = false;
  }, 200);
}

function handleFocusIn() {
  clearTimeout(timeoutId);
  showresult.value = true;
}

function lala(id: number) {
  console.log("ID", id);
  sendRequest(id);
}
</script>

<template>
  <div id="add-friend-panel">
    <h1>Ajouter un ami</h1>
    <div id="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher..."
        @input="debouncedSearch"
        id="search-input"
        @focusout="handleFocusOut"
        @focusin="handleFocusIn"
      />

      <div v-show="showresult" id="show-result">
        <div
          v-if="results.length === 0 && searchQuery === ''"
          class="search-error"
        >
          <h1>Commencez à taper</h1>
        </div>

        <div v-else-if="results.length === 0" class="search-error">
          <h1>Aucun résultat</h1>
        </div>

        <div v-else id="search-result">
          <ul id="search-result-list">
            <li
              v-for="result in results"
              :key="result.id"
              class="search-result-element"
            >
              <div id="profile-pics"></div>
              <span class="span-result">{{ result.username }}</span>

              <button id="add-friend-button" @click="lala(result.id)">
                <Icon name="ri:user-add-line" class="icon-add-friend" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#add-friend-panel {
  width: 100%;
  @include gradient-blue-leger;
  border-radius: 12px;
  border: 2px solid $color-border;
  height: 250px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    padding: 15px;
    color: $color-text;
    font-size: clamp(20px, 26px, 35px);
  }

  #search-container {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    #search-input {
      width: 100%;
      border-radius: 7px;
      height: fit-content;
      padding: 7px 5px;
      color: $color-text;
      border: 2px solid $color-border-discret;
      background-color: $color-panel;
      position: relative;

      &::placeholder {
        color: $color-text;
      }
    }

    #show-result {
      position: absolute;
      top: 100%;
      margin-top: 5px;
      padding-bottom: 2px;
      left: 0;
      width: 100%;
      background-color: $color-panel;
      border: 1px solid $color-border-discret;
      border-radius: 7px;
      min-height: 50px;
      height: fit-content;
      max-height: 150px;

      #search-result-list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        .search-result-element {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 50px;
          min-height: 50px;
          width: 100%;
          padding: 0 4% 0 2%;

          #profile-pics {
            width: 35px;
            border-radius: 50%;
            height: 35px;
            background-color: grey;
            margin-right: 3%;
          }
          .span-result {
            color: $color-text;
            font-family: "lato";
            font-size: 1.2rem;
            margin: 0 auto 0 0;
          }

          #add-friend-button {
            width: 35px;
            height: 35px;
            border: none;
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.125s ease;

            .icon-add-friend {
              color: rgb(255, 255, 255);
              font-size: 32px;
            }

            &:hover {
              background-color: $color-text;
              cursor: pointer;

              .icon-add-friend {
                color: rgb(0, 0, 0);
              }
            }
          }
        }
      }
    }

    .search-error {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      h1 {
        text-align: center;
        line-height: 0;
        color: white;
        font-family: "Lato";
      }
    }
  }
}
</style>
