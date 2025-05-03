<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
import type { User } from "~/types/User";

const props = defineProps<{
  user?: User;
}>();

const { user: Userinfo } = useUserStore();

const IsFriend = ref(false);
const Followed = ref(false);
const IsUser = ref(false);

if (Userinfo?.id === props.user?.id) {
  IsUser.value = true;
}
</script>

<template>
  <section id="profil-header">
    <div id="settings" v-if="IsUser">
      <shared-pop-over message="Paramètres">
        <button id="settings-btn">
          <component :is="icons['settings']" id="settings-icon" />
        </button>
      </shared-pop-over>
    </div>
    <div id="header">
      <div id="pp"></div>
      <div id="user-info">
        <span id="name">{{ props.user?.fullName }}</span>
        <span id="username">@{{ props.user?.username }}</span>
      </div>
    </div>
    <div id="content">
      <span id="follower"><strong>10K</strong> abonnés</span>
      <span id="followed"><strong>100</strong> abonnements</span>
      <span id="posts"><strong>37</strong> publications</span>
    </div>
    <div id="bio">
      <p id="user-bio">{{ props.user?.biography }}</p>
    </div>
    <div id="footer">
      <button id="follow-btn"><span>Suivre</span></button>
      <button id="message-btn"><span>Message</span></button>
      <shared-pop-over message="Ajouter">
        <button id="add-friend-btn">
          <component :is="icons['addfriend']" id="friend-icon" />
        </button>
      </shared-pop-over>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#profil-header {
  background-color: $color-panel;
  border-radius: 12px;
  border: 1px solid $color-border-discret;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: "Mulish";
  position: relative;

  #settings {
    position: absolute;
    top: 15px;
    right: 15px;

    #settings-btn {
      width: 25px;
      height: 25px;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      border-radius: 7px;
      transition: background 0.2s ease;

      #settings-icon {
        margin: 0;
        color: $color-text;
        flex-shrink: 0;
        font-size: 1.2rem;
        transition: color 0.125s ease-out;
      }

      &:hover {
        cursor: pointer;
        background-color: $color-text;
        #settings-icon {
          color: rgb(24, 24, 24);
        }
      }
    }
  }

  #header {
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
    #pp {
      width: 50px;
      height: 50px;
      background-color: grey;
      border-radius: 50%;
      margin-right: 15px;
    }

    #user-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2px;

      span {
        font-family: "Mulish";
        text-overflow: ellipsis;
      }

      #name {
        font-size: 1rem;
        color: $color-text;
      }

      #username {
        color: $color-text-secondary;
        font-size: 0.8rem;
      }
    }
  }

  #content {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      bottom: -7px;
      left: -2.5%;
      width: 105%;
      height: 1px;
      border-radius: 12px;
      background-color: $color-border-discret;
    }

    span {
      color: $color-text;
      font-family: "Mulish";
      font-size: 0.85rem;
    }

    strong {
      font-weight: 600;
      margin-right: 1px;
    }
  }

  #bio {
    #user-bio {
      color: $color-text;
      font-family: "Lato";
      font-size: 0.8rem;
    }
  }

  #footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin-top: 20px;

    button {
      border-radius: 7px;
      border: 2px solid $color-text;
      background-color: transparent;
      padding: 5px 10px;
      font-family: "Mulish";
      font-weight: 600;
      color: $color-text;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        flex-shrink: 0;
        font-size: 0.8rem;
      }

      &:hover {
        cursor: pointer;
        background-color: $color-text;
        color: black;
      }
    }

    #add-friend-btn {
      padding: 5px 6px;
      #friend-icon {
        flex-shrink: 0;
        font-size: 1rem;
      }
    }

    #follow-btn {
      margin-right: auto;
    }
  }
}
</style>
