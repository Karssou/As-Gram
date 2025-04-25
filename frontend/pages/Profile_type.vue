<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const userInfo = {
  username: route.query.username as string || '',
  fullName: route.query.fullName as string || '',
  biography: route.query.biography as string || '',
  gender: route.query.gender as string || '',
  birthdate: route.query.birthdate as string || '',
  email: route.query.email as string || '',
};
</script>

<template>
  <div id="profile-container">
    <h1>Profil de {{ userInfo.username }}</h1>

    <div class="profile-info">
      <p><strong>Nom complet :</strong> {{ userInfo.fullName }}</p>
      <p><strong>Bio :</strong> {{ userInfo.biography }}</p>
      <p><strong>Genre :</strong> {{ userInfo.gender }}</p>
      <p><strong>Date de naissance :</strong> {{ userInfo.birthdate }}</p>
      <p><strong>Email :</strong> {{ userInfo.email }}</p>
    </div>
  </div>
</template>

<style scoped>
#profile-container {
  padding: 40px;
  background: #f8f9fa;
  border-radius: 12px;
  max-width: 700px;
  margin: 50px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #222;
  font-family: "Lato", sans-serif;
}

h1 {
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #0077cc;
}

.profile-info p {
  font-size: 1.1rem;
  margin: 10px 0;
}
</style>
