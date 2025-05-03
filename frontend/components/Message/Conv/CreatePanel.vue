<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
import { useDebounceFn } from "@vueuse/core";

const { createConversation } = UseConversation();
const { searchFriends } = HandleFriendRequest();
const userList = ref<Array<Record<string, any>>>([]);
const userSearch = ref();
const userResult = ref<Array<Record<string, any>>>([]);
const showresult = ref(false);

const createConv = async () => {
  const type: string = userList.value.length > 1 ? "group" : "private";

  const participantIds = userList.value.map((user) => user.id);

  await createConversation(participantIds, type);
};

let timeoutId: ReturnType<typeof setTimeout>;

const debouncedSearch = useDebounceFn(async () => {
  const request = (await searchFriends(userSearch.value)) as Array<
    Record<string, any>
  >;
  userResult.value = request;
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

watch(userSearch, (val) => {
  if (!val.trim()) userResult.value = [];
});

function addUser(user: Record<string, any>) {
  const exists = userList.value.some((u) => u.id === user.id);
  if (!exists) {
    userList.value.push(user);
    userResult.value = userResult.value.filter((u) => u.id !== user.id);
  }
}

function removeUser(userId: string) {
  userList.value = userList.value.filter((user) => user.id !== userId);
}
</script>

<template>
  <div id="create-conv-panel">
    <section id="header">
      <h1>Créer une conversation</h1>
    </section>
    <section id="search-friends">
      <InputsSearchBar
        v-model="userSearch"
        className="search-bar"
        @input="debouncedSearch"
        @focusout="handleFocusOut"
        @focusin="handleFocusIn"
      />

      <div id="search-result" v-if="userResult.length > 0 && showresult">
        <div class="user" v-for="user in userResult" :key="user.id">
          <span class="user-name">{{ user.username }}</span>
          <button class="remove-btn" @click="addUser(user)">
            <component :is="icons['plus']" class="add-icon" />
          </button>
        </div>
      </div>
    </section>
    <section id="user-list">
      <div class="user" v-for="user in userList" :key="user.id">
        <div class="pp"></div>
        <h1 class="name">{{ user.username }}</h1>
        <button class="remove-btn" @click="removeUser(user.id)">
          <component :is="icons['close']" class="close-icon" />
        </button>
      </div>
    </section>
    <section id="footer">
      <button
        id="create-conv-btn"
        :disabled="userList.length === 0"
        @click="createConv"
      >
        Créer la conversation
      </button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.search-bar {
  width: 200px;
  position: relative;
}

#create-conv-panel {
  width: 500px;
  height: 500px;
  background-color: $color-panel;
  border: 1px solid $color-border;
  border-radius: 12px;
  padding: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  #header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 10%;
  }

  h1 {
    color: $color-text;
    font-size: 2rem;
    font-family: "Montserrat";
    font-weight: 600;
  }
  #search-friends {
    position: relative;
    display: flex;
    width: 100%;
    max-height: 200px;
    height: 100%;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    justify-content: center;
    flex: 2 1 100px;

    #search-result {
      position: absolute;
      top: 65%;
      border-radius: 7px;
      border: 2px solid $color-border;
      background-color: $color-panel-secondary;
      width: 200px;

      .user {
        width: 100%;
        height: 40px;
        max-height: 40px;
        display: inline-flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        border-radius: 7px;
        padding: 0 5px;

        .user-name {
          margin-right: auto;
          line-height: 0;
          font-size: 16px;
          color: $color-text;
          font-family: "Montserrat";
        }

        .remove-btn {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;

          &:hover {
            cursor: pointer;

            .add-icon {
              transform: scale(1.2);
            }
          }

          .add-icon {
            font-size: 150%;
            flex-shrink: 0;
            color: $color-text;
          }
        }
      }
    }
  }

  #user-list {
    width: 100%;
    padding: 5px;
    max-height: 300px;
    overflow-y: auto;
    height: 100%;
    flex: 1 1 200px;
    background-color: $color-panel-secondary;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    .user {
      background-color: green;
      width: 100%;
      height: 60px;
      max-height: 60px;
      display: inline-flex;
      align-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      border-radius: 7px;
      padding: 0 2%;

      .pp {
        width: 45px;
        height: 45px;
        background-color: grey;
        border-radius: 50%;
        margin-right: 5px;
      }

      .name {
        margin-right: auto;
        line-height: 0;
      }

      .remove-btn {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;

        &:hover {
          cursor: pointer;

          .close-icon {
            color: $color-dislike;
          }
        }

        .close-icon {
          font-size: 200%;
          flex-shrink: 0;
          color: $color-text;
        }
      }
    }
  }

  #footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    max-height: 50px;

    #create-conv-btn {
      padding: 5px 7px;
      border-radius: 12px;
      border: 2px solid $color-text;
      font-weight: 500;
      color: $color-text;
      font-family: "Mulish";
      background-color: transparent;
      transition: background 0.2s ease;

      &:hover {
        cursor: pointer;
        background-color: $color-text;
        color: black;
      }
    }
    #create-conv-btn:disabled {
      padding: 5px 7px;
      border-radius: 12px;
      border: 2px solid grey;
      font-weight: 500;
      color: gray;
      font-family: "Mulish";
      background-color: transparent;
      transition: background 0.2s ease;

      &:hover {
        cursor: not-allowed;
      }
    }
  }
}
</style>
