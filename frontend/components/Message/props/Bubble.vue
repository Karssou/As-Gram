<script setup lang="ts">
import type { TemporaryConfirmDialog } from "#components";
import { icons } from "@/app/utils/icons";
import ReactionInterface from "./ReactionInterface.vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  sender: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  timestampUpdate: {
    type: String,
    required: false,
    default: null,
  },

  reactions: {
    type: Array<MessageReactions>,
    required: true,
    default: [],
  },
});

const IsEditing = ref(false);
const editedMessage = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const viewed = ref(true);
const sended = ref(true);
const confirmDialogRef = ref<InstanceType<
  typeof TemporaryConfirmDialog
> | null>(null);

const { EditMessage, DeleteMessage } = useMessage();

const ToggleMessageEdit = () => {
  if (IsEditing.value) {
    IsEditing.value = false;
    return;
  }
  editedMessage.value = props.message;
  IsEditing.value = true;
  watch(IsEditing, (newValue) => {
    if (newValue) {
      nextTick(() => textareaRef.value?.focus());
    }
  });
};

const handleMessageAction = async (action: "edit" | "delete") => {
  if (action === "edit") {
    const response = await EditMessage(props.id, editedMessage.value);
    if (response) IsEditing.value = false;
  } else {
    const confirmed = await confirmDialogRef.value?.open({
      title: "Supprimer ce message",
      message: "Cette action est irréversible. Es-tu sûr ?",
      confirm: "Supprimer",
      decline: "Annuler",
    });

    if (confirmed) {
      await DeleteMessage(props.id);
    }
  }
};
</script>

<template>
  <div
    id="messagebox"
    :class="{ 'sent-message': sender, 'received-message': !sender }"
  >
    <div class="message-container">
      <textarea
        v-if="IsEditing"
        name="edit-message-box"
        id="edit-message-box"
        v-model="editedMessage"
      />

      <p v-else id="message-content">{{ message }}</p>

      <button
        v-if="IsEditing"
        id="edit-accept-btn"
        @click="handleMessageAction('edit')"
      >
        Modifier
      </button>

      <span v-else id="message-timestamp">{{ timestamp }}</span>

      <div id="menu-reaction" v-if="!sender">
        <button class="hover-reaction-btn" id="reaction-btn">
          <MessagePropsReactionButton :message-id="props.id" /></button
        ><button class="hover-reaction-btn" id="quote-btn">
          <component
            :is="icons['reply']"
            v-if="icons['reply']"
            class="quote-icon"
          />
        </button>
      </div>
      <div v-if="sender" id="menu-on-hover">
        <div id="menu-content">
          <temporary-pop-over
            :message="IsEditing ? 'Annuler modification' : 'Modifier'"
          >
            <button
              @click="ToggleMessageEdit"
              class="hover-menu-action-btn"
              id="edit-message-btn"
            >
              <component
                class="icon-btn"
                :is="icons['close']"
                v-if="icons['close'] && IsEditing"
              />
              <component
                :is="icons['edit']"
                v-if="!IsEditing"
                class="icon-btn"
              />
            </button>
          </temporary-pop-over>

          <temporary-pop-over message="Supprimer">
            <button
              class="hover-menu-action-btn"
              id="delete-message-btn"
              @click="handleMessageAction('delete')"
            >
              <component :is="icons['delete']" class="icon-btn" />
            </button>
          </temporary-pop-over>
          <TemporaryConfirmDialog ref="confirmDialogRef" />
        </div>
      </div>
    </div>

    <div id="message-informations" :class="{ sent: sender, received: !sender }">
      <span
        class="modified"
        v-if="timestampUpdate && timestampUpdate !== timestamp"
      >
        Modifié
      </span>

      <!-- <button @click="(sended = !sended), (viewed = !viewed)"></button> -->

      <div id="watched-container" v-if="sender">
        <component
          :is="icons['doneall']"
          v-if="icons['doneall'] && viewed && sended"
          class="watched-icon"
          id="sawed-icon"
        />
        <component
          :is="icons['check']"
          v-if="icons['check'] && !viewed && sended"
          class="watched-icon"
          id="sended-icon"
        />
      </div>
    </div>
    <ReactionInterface
      v-if="props.reactions.length > 0"
      :Reactions="props.reactions"
      className="reactions"
    />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss" as *;

.reactions {
  position: absolute;
  transform: translateY(-50%);
  z-index: inherit;
}

#messagebox {
  max-width: 50%;
  min-width: 50px;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  transition: transform 0.3s ease-out;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &.received-message {
    text-align: left;
    justify-self: flex-start;
    align-self: flex-start;

    &::before {
      right: 100%;
      transform: translateX(50%) rotate(45deg);
    }
  }

  &.sent-message {
    text-align: right;
    justify-self: flex-end;
    align-self: flex-end;

    .reactions {
      right: 0;
    }

    &::before {
      left: 100%;
      transform: translateX(-50%) rotate(45deg);
    }
  }

  &::before {
    content: "";
    position: absolute;
    border-radius: 2px;
    top: clamp(10px, 20%, 20px);
    width: 10px;
    height: 10px;
    background: $color-panel;
  }

  &:hover {
    #menu-on-hover {
      opacity: 1;
      pointer-events: all;
    }

    #menu-reaction {
      opacity: 1;
      pointer-events: all;
    }
  }

  .message-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    padding: 10px;
    margin: 0;
    border-radius: 12px;
    background-color: $color-panel;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  #message-content {
    z-index: 11;
    color: $color-text;
    font-size: 1rem;
    font-weight: 400;
    font-family: "lato";
    line-height: 1.3;
  }

  #edit-message-box {
    z-index: 11;
    color: $color-text;
    font-size: 1rem;
    background-color: transparent;
    border: 1px solid $color-border-discret;
    font-weight: 400;
    font-family: "lato";
    resize: none;
    field-sizing: content;
    width: auto;
    min-width: 200px;
    max-width: 100%;
    height: auto;
    border-radius: 7px;
    text-align: inherit;
    white-space: wrap;
    line-height: 1.3;
    overflow: hidden;
  }

  #message-timestamp {
    color: $color-text-disabled;
    font-size: 0.8rem;
    font-style: italic;
    font-family: "lato";
    user-select: none;
  }

  #edit-accept-btn {
    max-width: 50%;
    min-height: 20px;
    max-height: max-content;
    margin-left: auto;
    padding: 7px 10px;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    border-radius: 500px;
    transition: all 0.125s ease;
    font-family: "Mulish";
    font-weight: 800;
    letter-spacing: 0.1em;
    font-size: 12px;

    &:hover {
      cursor: pointer;
      background-color: white;
      color: $color-panel;
    }
  }

  #message-informations {
    width: 100%;
    height: fit-content;
    padding: 2px 5px;
    display: flex;

    .modified {
      font-size: 0.83rem;
      color: $color-text-secondary;
      font-family: "Mulish";
      pointer-events: none;
      user-select: none;
    }

    #watched-container {
      margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .watched-icon {
        color: $color-text;
      }

      #sawed-icon {
        color: rgb(107, 107, 250);
      }
    }

    &.sent {
      justify-content: flex-start;
    }

    &.received {
      justify-content: flex-end;
    }
  }
}

#menu-reaction {
  position: absolute;
  max-height: 500px;
  min-height: 50px;
  min-width: 50px;
  max-width: 300px;
  height: 100%;
  width: auto;
  bottom: 0;
  opacity: 0;
  right: -30px;
  pointer-events: none;
  transition: all 0.125s ease;
  z-index: 200;
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;

  .hover-reaction-btn {
    display: flex;
    width: 25px;
    height: 25px;
    padding: 0;
    box-sizing: border-box;
    background-color: transparent;
    border: none;
    transition: all 0.125s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;

    .quote-icon {
      color: $color-text;
      font-size: larger;
    }

    &:hover {
      cursor: pointer;
      background-color: rgba(244, 244, 244, 0.5);

      .quote-icon {
        transition: all 0.125s ease;
        color: black;
      }
    }
  }
}

#menu-on-hover {
  position: absolute;
  max-height: 500px;
  min-height: 50px;
  min-width: 50px;
  max-width: 300px;
  height: 100%;
  width: auto;
  opacity: 0;
  transform-origin: right;
  bottom: 0;
  left: -30px;
  pointer-events: none;
  transition: all 0.125s ease;
  z-index: 200;

  #menu-content {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 5px;
    justify-content: flex-end;
    flex-direction: column;
    position: relative;

    .hover-menu-action-btn {
      width: 25px;
      height: 25px;
      padding: 0;
      box-sizing: border-box;
      background-color: transparent;
      border: none;
      transition: all 0.125s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 7px;

      .icon-btn {
        flex-shrink: 0;
        color: $color-text;
        font-size: larger;
        transition: all 0.125s ease;
      }

      &:hover {
        cursor: pointer;
        background-color: rgba(244, 244, 244, 0.5);
      }
    }

    #delete-message-btn:hover {
      .icon-btn {
        color: red;
      }
    }
    #edit-message-btn:hover {
      .icon-btn {
        color: rgb(255, 106, 0);
      }
    }
  }
}
</style>
