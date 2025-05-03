<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const IsFriend = ref(false);
const Followed = ref(false);
</script>

<template>
  <section id="profil-header">
    <div id="header">
      <div id="pp"></div>
      <div id="user-info">
        <span id="name">Alexandre Larue</span>
        <span id="username">@Karssou</span>
      </div>
    </div>
    <div id="content">
      <span id="follower"><strong>10K</strong> abonnés</span>
      <span id="followed"><strong>100</strong>Abonnements</span>
      <span id="posts"><strong>37</strong> publications</span>
    </div>
    <div id="bio">
      <p id="user-bio">Bonjour je me nomme Alexandre et je suis un gamer</p>
    </div>
    <div id="footer">
      <button id="follow-btn"><span>Suivre</span></button>
      <button id="message-btn"><span>Message</span></button>
      <button id="add-friend-btn">
        <component :is="icons['addfriend']" id="friend-icon" />
      </button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#profil-header {
  background-color: $color-panel;
  border-radius: 12px;
  border: 1px solid $color-border-discret;
  padding: 2% 4%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: "Mulish";

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

    #message-btn {
      margin-right: auto;
    }

    #add-friend-btn {
      padding: 5px 6px;
      #friend-icon {
        flex-shrink: 0;
        font-size: 1rem;
      }
    }

    #follow-btn {
    }
  }
}
</style>
