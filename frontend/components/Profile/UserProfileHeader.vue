<script lang="ts" setup>
import { icons } from "@/app/utils/icons";
import type { relations } from "~/types/Relations";
import type { Stats } from "~/types/Stats";
import type { User } from "~/types/User";

const props = defineProps<{
  user: User;
  stats: Stats;
  relations: relations;
}>();

const { addNotification } = useNotificationStore();

const { user: Userinfo } = useUserStore();
const { subscribeToUser, unsubscribeToUser } = useSubscription();

const isFollowing = ref(props.relations?.isFollowedByYou);

const IsUser = ref(false);
if (Userinfo?.id === props.user?.id) {
  IsUser.value = true;
}

const AVATAR_PATH = `${useRuntimeConfig().public.apiBase}/${
  props.user?.avatar
}`;

const SETTINGS_PATH = `/modify-profile/${Userinfo?.id}`;

const btnText = computed(() =>
  isFollowing.value ? "Ne plus suivre" : "Suivre"
);
const btnClass = computed(() =>
  isFollowing.value ? "following" : "not-following"
);
const FollowLoading = ref(false);

const toggleFollow = async () => {
  if (isFollowing.value) {
    FollowLoading.value = true;
    const { status } = await useAsyncData(
      `unfollow-to-${props.user.id}`,
      async () => {
        return await unsubscribeToUser(props.user.id);
      }
    );

    FollowLoading.value = false;
    if (status.value === "pending") FollowLoading.value = true;
    if (status.value === "success") {
      isFollowing.value = false;
      addNotification("Vous ne suivez plus l'utilisateur", "success");
    }
  } else {
    FollowLoading.value = true;
    const { status } = await useAsyncData(
      `follow-to-${props.user.id}`,
      async () => {
        return await subscribeToUser(props.user.id);
      }
    );
    if (status.value === "success") {
      isFollowing.value = true;
      addNotification("Vous suivez l'utilisateur", "success");
    }
    FollowLoading.value = false;
  }
};
</script>

<template>
  <section id="profil-header">
    <div id="settings" v-if="IsUser">
      <shared-pop-over message="Paramètres">
        <button id="settings-btn">
          <NuxtLink :to="SETTINGS_PATH" class="param-link">
            <component :is="icons['settings']" id="settings-icon" />
          </NuxtLink>
        </button>
      </shared-pop-over>
    </div>
    <div id="header">
      <div id="pp">
        <img :src="AVATAR_PATH" alt="avatar" />
      </div>
      <div id="user-info">
        <span id="name">{{ props.user?.fullName }}</span>
        <span id="username">@{{ props.user?.username }}</span>
      </div>
    </div>
    <div id="content">
      <span id="follower"
        ><strong> {{ props.stats.followersCount }}</strong> abonnés</span
      >
      <span id="followed"
        ><strong>{{ props.stats.followingCount }}</strong> abonnements</span
      >
      <span id="posts"
        ><strong>{{ props.stats.postsCount }}</strong> publications</span
      >
    </div>
    <div id="bio">
      <p id="user-bio">{{ props.user?.biography }}</p>
    </div>
    <div id="footer">
      <button id="follow-btn" @click="toggleFollow" :class="btnClass">
        <loading-wheel v-if="FollowLoading" className="loading-wheel" />
        <span v-else>{{ btnText }}</span>
      </button>
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

.loading-wheel {
  width: 15px;
  height: 15px;
  border-width: 2px;
}

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
    top: 10px;
    right: 10px;

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

      .param-link {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;

        flex-shrink: 0;
      }

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
      overflow: hidden;
      background-color: grey;
      border-radius: 50%;
      margin-right: 15px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
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

        &.following {
          background-color: $color-warning;
          border-color: $color-warning;
          color: $color-text;
        }
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
