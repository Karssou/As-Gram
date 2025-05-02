<script lang="ts" setup>
const { user } = useUserStore();

const { data: conversations, status } = useAsyncData("conv", async () => {
  return await ApiCall("GET", `conversation/${user?.id}/conversation`);
});
</script>

<template>
  <div id="conv-panel">
    <section id="header">
      <h1>Vos messages</h1>
    </section>

    <LoadingWheel v-if="status === 'pending'" />

    <section id="list" v-else v-for="conv in conversations">
      <MessageConvPropsConvItems
        :convID="conv.id"
        :username="conv.users.username"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/variables.scss" as *;

#conv-panel {
  width: 300px;
  height: 500px;
  background-color: $color-panel;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

  #header {
    width: 100%;
    height: 100%;
    max-height: 60px;
    display: flex;
    align-items: flex-end;
    padding: 2% 2%;
    position: relative;

    h1 {
      font-family: "Lato";
      color: $color-text;
    }

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.5px;
      background-color: $color-text;
    }
  }

  #list {
    #conv-items {
      .conv-name {
      }
    }
  }
}
</style>
