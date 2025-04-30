<script lang="ts" setup>
import { icons } from "@/app/utils/icons";

const EllipsisOptions = [
  {
    label: "Signaler",
    icon: "warn",
    OnClick: () => {
      console.log("Option clicked: Signaler");
    },
  },
];
</script>

<template>
  <div class="post-container">
    <section class="header">
      <div id="user">
        <div id="user-avatar"></div>
        <span id="user-name">Karssou</span>
      </div>
      <div id="timestamp">
        <span>Il y a 19h</span>
      </div>
    </section>
    <section class="main">
      <p id="text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo quae ipsa
        porro rerum, natus exercitationem architecto distinctio iste provident
        adipisci repellat perspiciatis culpa alias at error quisquam maiores
        fuga blanditiis quo laudantium. Harum laborum mollitia dolores velit,
        nesciunt nihil quisquam.
      </p>
    </section>
    <section class="footer">
      <div id="reactions">
        <button class="reactions-btn">
          <component :is="icons['love']" class="icon-btn" id="love-icon" />
        </button>

        <button class="reactions-btn">
          <component :is="icons['like']" class="icon-btn" id="like-icon" />
        </button>

        <button class="reactions-btn">
          <component
            :is="icons['dislike']"
            class="icon-btn"
            id="dislike-icon"
          />
        </button>
      </div>
      <div id="plus">
        <InputsEllipsis :options="EllipsisOptions" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.post-container {
  width: 100%;
  max-width: 450px;
  max-height: 300px;
  height: auto;
  background-color: red;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: $color-panel;
  font-size: 1rem;
  font-family: "Mulish";

  .header {
    width: 100%;
    min-height: 60px;
    flex: 1 1 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4%;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 10%;
      width: 80%;
      border-radius: 12px;
      height: 2px;
      background: $color-border-discret;
    }

    #user {
      max-width: 50%;
      height: fit-content;
      display: flex;
      place-items: center;
      flex-direction: row;
      flex-wrap: nowrap;
      #user-avatar {
        width: 35px;
        height: 35px;
        background-color: gray;
        border-radius: 50%;
        margin-right: 10px;
      }

      #user-name {
        text-overflow: ellipsis;
        color: $color-text;
        font-size: 1.25rem;
        font-weight: 700;
      }
    }

    #timestamp {
      max-width: 30%;
      height: 100%;
      display: flex;
      align-items: center;

      span {
        color: $color-text-disabled;
        line-height: 0;
        font-style: italic;
        font-size: 0.9rem;
      }
    }
  }

  .main {
    width: auto;
    flex: 2 1 80%;

    overflow-y: hidden;

    p {
      font-family: "Mulish";
      color: $color-text;
      font-weight: 300;
      font-size: 1.1rem;
      padding: 10px 5%;
      line-height: 1.2;
      word-break: break-all;
      overflow-wrap: break-word;
      overflow-y: hidden;
      max-height: 100%;
      word-spacing: normal;
      text-overflow: ellipsis;
    }
  }

  .footer {
    min-height: 50px;
    flex: 1 1 10%;
    display: flex;
    align-items: center;
    padding: 0 3%;
    justify-content: space-between;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0%;
      left: 0;
      width: 100%;
      border-radius: 12px;
      height: 2px;
      background: $color-border-discret;
    }

    #reactions {
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 0.3rem;

      .reactions-btn {
        max-width: 40px;
        max-height: 40px;
        background-color: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-btn {
          color: $color-text;
          font-size: 1rem;
          transition: color 0.125s ease;
        }

        &:hover {
          cursor: pointer;

          #like-icon {
            color: $color-like;
          }

          #dislike-icon {
            color: $color-dislike;
          }

          #love-icon {
            color: $color-love;
          }
        }
      }
    }
  }
}
</style>
