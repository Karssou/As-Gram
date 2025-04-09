<script lang="ts" setup>
import { ref } from "vue";
import { icons } from "@/app/utils/icons";

const sections = ["friends", "user", "message", "conv"];

const links = {
  conv: { icon: "conversation", value: "conv" },
  message: { icon: "message", value: "message" },
  user: { icon: "user", value: "user" },
  friends: { icon: "friend", value: "friends" },
};

async function changeSection(section: "user" | "friends" | "conv" | "message") {
  Showing.value = section;
}

const Showing = ref<"user" | "message" | "conv" | "friends">("user");

const selectedLink = ref(1);
const barStyle = computed(() => {
  const index = sections.indexOf(Showing.value);
  const widthPercent = (100 - 2 * 2) / sections.length;
  return {
    width: `${widthPercent}%`,
    left: `${2 + widthPercent * index}%`,
  };
});

const getPosition = () => {
  return (selectedLink.value - 1) * 25;
};
</script>

<template>
  <nav id="utility-nav">
    <ul id="nav-list">
      <li
        id="nav-elems"
        v-for="link in links"
        :key="link.value"
        @click="changeSection(link.value)"
      >
        <component
          :is="icons[link.icon]"
          v-if="icons[link.icon]"
          class="nav-icon"
        />
      </li>
    </ul>

    <div id="before-line" :style="{ left: getPosition() + '%' }"></div>
  </nav>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#utility-nav {
  width: 100%;
  height: 100%;
  border-bottom: 1px solid $color-border-discret;
  position: relative;

  #before-line {
    content: "";
    width: 80px;
    height: 2px;
    position: absolute;
    top: 100%;
    background-color: red;
    transition: left 0.3s ease;
  }

  #nav-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    #nav-elems {
      height: 100%;
      width: fit-content;
      padding: 0 2% 15px;
      display: flex;
      align-items: flex-end;

      .nav-icon {
        font-size: 200%;
        color: $color-text;
        transition: color 0.125s ease;
      }

      &:hover {
        cursor: pointer;
        .nav-icon {
          color: $color-text-disabled;
        }
      }
    }
  }
}
</style>
