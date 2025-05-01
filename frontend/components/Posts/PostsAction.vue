<script lang="ts" setup>
import { PostsPropsTags } from "#components";
import { icons } from "@/app/utils/icons";

const postContent = ref("");
const tags = ref<string[]>([]);
const maxChars = 240;
const charCount = computed(() => postContent.value.length);

watch(postContent, (val) => {
  const foundTags = [...val.matchAll(/#(\w+)/g)].map((match) => match[1]);
  tags.value = [...new Set(foundTags.filter((tag) => tag.length >= 2))];
});
</script>

<template>
  <div class="post-input">
    <div class="text-area">
      <textarea
        name="salut"
        id="post-text"
        placeholder="Ecrire un post..."
        v-model="postContent"
        :maxlength="maxChars"
      />

      <span class="span-counter" :class="{ danger: charCount > maxChars }">
        {{ charCount }} / {{ maxChars }}</span
      >
    </div>

    <div id="tags" v-if="tags.length > 0">
      <div class="tag-list">
        <PostsPropsTags
          v-for="tag in tags"
          :tag="tag"
          @remove="
            (t) => {
              tags = tags.filter((tag) => tag !== t);
              postContent = postContent
                .replaceAll(new RegExp(`#${t}\\b`, 'g'), '')
                .trim();
            }
          "
        />
      </div>
    </div>

    <section class="footer">
      <shared-pop-over message="Joindre un fichier">
        <button class="add-file">
          <component :is="icons['attach']" class="attach-icon" />
        </button>
      </shared-pop-over>
      <button id="send-btn" :disabled="charCount <= 0">
        <component :is="icons['send']" class="send-icon" />
        <span>Poster</span>
      </button>
    </section>
    <section class="file-loaded"></section>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.post-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  background-color: $color-panel;
  border-radius: 12px;
  padding: 15px 0;
  gap: 10px;
  transition: all 0.12s ease;

  .text-area {
    width: 95%;
    min-height: 100px;
    position: relative;
    #post-text {
      width: 100%;
      height: 100%;
      border-radius: 7px;
      padding: 1% 2%;
      background: none;
      border: 1px solid $color-border-discret;
      resize: none;
      field-sizing: content;
      color: $color-text;
      font-family: "Mulish";
      font-size: 0.8rem;
    }

    .span-counter {
      position: absolute;
      right: 1%;
      bottom: 5px;
      color: $color-text-disabled;
      font-size: 0.75rem;
      font-family: "Inter";

      &.danger {
        color: $color-warning;
      }
    }
  }

  #tags {
    display: flex;

    flex-direction: row;
    height: fit-content;
    width: 95%;

    .tag-list {
      height: 100%;
      width: 95%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: row;
      gap: 10px;
    }
  }

  .footer {
    width: 95%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .add-file {
      height: 30px;
      width: 30px;
      background-color: transparent;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .attach-icon {
        flex-grow: 1;
        flex-shrink: 0;
        color: $color-text;
        font-size: 1.1rem;
      }

      &:hover {
        background-color: $color-text;
        cursor: pointer;
        .attach-icon {
          color: black;
        }
      }
    }

    #send-btn {
      min-height: 30px;
      min-width: 80px;
      color: $color-text;
      font-size: 1rem;
      border-radius: 40px;
      background: none;
      border: 1px solid $color-text;
      padding: 5px 10px;
      font-family: "Inter";
      transition: all 0.2s ease;
      display: flex;
      align-items: center;

      .send-icon {
        margin-right: 3px;
      }

      &:hover {
        cursor: pointer;
        color: black;
        background-color: $color-text;
      }
    }
  }
}
</style>
