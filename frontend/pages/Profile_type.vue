<script setup lang="ts">
import { useUserStore } from '~/stores/UserStore';
const userStore = useUserStore();
const user = userStore.user;
</script>

<template>
  <div class="profile-container">
    <div class="profile-header">
      <img 
  src="https://upload.wikimedia.org/wikipedia/en/7/7d/Garfield_cat.png" 
  alt="avatar" 
  class="avatar"
  onerror="this.onerror=null; this.src='https:/preview.redd.it/instagram-default-user-profile-pic-flip-flops-v0-g983oflfeg4d1.jpg?width=262&format=pjpg&auto=webp&s=c6ec2305199c633fc6d460238d0409f41812fe75';" 
/>
      <h1>{{ user.username }}</h1>
    </div>

    <div class="UserName"><span>Nom: {{ user.fullName }}</span></div>
<br>
    <div class="profile-stats">
      
      <span>publication : {{ user.publications }}</span>
      <span>followers : {{ user.followers }}</span>
      <span>suivie : {{ user.following }}</span>
    </div>
    <div class="profile-actions">
      <NuxtLink to="/modifier_profile" class="profile-btn">modifier profile</NuxtLink>
      <button class="profile-btn">partager profil</button>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  background: #fff;
  width: 100%;
  min-height: 90vh;
  max-width: 400px;
  margin: 0 auto;
  border-left: 4px solid #222;
  border-right: 4px solid #222;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  font-family: "Lato", sans-serif;
}
.profile-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
  object-fit: cover;
  border: 2px solid #222;
  background: #fff;
}
.profile-header h1 {
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  margin-right: 16px;
}
.menu-btn {
  background: none;
  border: none;
  position: absolute;
  right: 0;
  top: 0;
  font-size: 2rem;
  cursor: pointer;
}
.profile-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  width: 100%;
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: #222;
}
.profile-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.profile-btn {
  border: 1px solid #222;
  background: #fff;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  color: #222;
  margin-right: 4px;
  transition: background 0.2s;
}
.profile-btn:hover {
  background: #f2f2f2;
}
.profile-icon {
  font-size: 2rem;
  margin-left: 10px;
}
</style>
