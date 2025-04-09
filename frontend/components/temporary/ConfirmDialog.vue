<script lang="ts" setup>
const visible = ref(false);
const title = ref("");
const message = ref("");
const confirm = ref("");
const decline = ref("");

let resolver: (value: boolean) => void;

function open(options: {
  title?: string;
  message?: string;
  confirm?: string;
  decline?: string;
}) {
  title.value = options.title ?? "Confirmation";
  message.value = options.message ?? "Es-tu sûr ?";
  visible.value = true;
  confirm.value = options.confirm ?? "Confirmer";
  decline.value = options.decline ?? "Annuler";

  return new Promise<boolean>((resolve) => {
    resolver = resolve;
  });
}

function confirmation() {
  visible.value = false;
  resolver(true);
}

function cancel() {
  visible.value = false;
  resolver(false);
}

defineExpose({ open });
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="background">
        <div class="panel">
          <section class="header">
            <h2>{{ title }}</h2>
          </section>

          <p>{{ message }}</p>
          <div class="actions">
            <button class="cancel" @click="cancel">
              <span>{{ decline }}</span>
            </button>
            <button class="confirm" @click="confirmation">
              <span>{{ confirm }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

.background {
  position: fixed;
  z-index: 20;
  inset: 0;
  background: rgba(232, 229, 229, 0.167);
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel {
  background: $color-panel;
  border: 0.5px solid $color-border-discret;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  .header {
    flex: 1 1 20%;
    padding: min(15px, 10%) min(15px, 10%);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 5%;
      width: 90%;
      height: 1px;
      background-color: $color-border-discret;
    }

    h2 {
      color: $color-text;
      font-size: 1.2rem;
      font-family: "Ubuntu";
      line-height: 1.1;
    }
  }

  p {
    color: $color-text;
    font-family: "Lato";
    font-size: 0.83rem;
    padding: min(15px, 10%);
  }

  .actions {
    flex: 1 0 20%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
    padding: 15px;
  }
}

button {
  padding: 8px 12px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    color: $color-text;
  }
}

.cancel {
  background: $color-text;
  span {
    color: $color-panel;
  }

  &:hover {
    background: white;
  }
}
.confirm {
  background: transparent;
  border: 1px solid $color-text;

  span {
    color: $color-text;
  }

  &:hover {
    border-color: $color-warning;
    background-color: $color-warning;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
