import { defineStore } from "pinia";
import { computed } from "vue";
import { useCookie } from "#app";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthResult {
  token: string;
  user: User;
}

export const useAuthStore = defineStore("auth", () => {
  // Utilisation des cookies pour le stockage persistant côté client et serveur
  const token = useCookie<string | null>("token", { default: () => null });
  const user = useCookie<User | null>("user", { default: () => null });

  const isAuthenticated = computed(() => !!token.value);

  // Fonction API générique pour faciliter les appels
  async function api(
    method: string,
    url: string,
    payload: Record<string, any> = {}
  ) {
    try {
      console.log(`[API] ${method} ${url}`, payload);

      const response = await fetch(`http://localhost:3333${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token.value ? `Bearer ${token.value}` : "",
        },
        body: method !== "GET" ? JSON.stringify(payload) : null,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("[API ERROR]", error);
      throw error;
    }
  }

  // Authentification réussie : stockage du token et de l'utilisateur via les cookies
  function authenticate(result: AuthResult) {
    console.log("[AUTH] Avant stockage", result);

    if (result.token && result.user) {
      token.value = result.token;
      user.value = result.user;

      console.log("[AUTH] Après stockage", {
        token: token.value,
        user: user.value,
      });
      console.log("[AUTH] Utilisateur authentifié :", user.value);
    } else {
      console.error("[AUTH ERROR] Données invalides reçues", result);
    }
  }

  // Connexion
  async function login(payload: Record<string, any>) {
    try {
      const result = await api("POST", "/login", payload);
      authenticate(result);
      console.log("[LOGIN RESPONSE]", result);
    } catch (error) {
      console.error("[LOGIN ERROR]", error);
      throw error;
    }
  }

  // Inscription
  async function register(payload: Record<string, any>) {
    try {
      const result = await api("POST", "/register", payload);
      authenticate(result);
    } catch (error) {
      console.error("[REGISTER ERROR]", error);
      throw error;
    }
  }

  // Déconnexion : suppression des cookies
  function logout() {
    token.value = null;
    user.value = null;
    console.log("[AUTH] Utilisateur déconnecté");
  }

  // Récupération des informations de l'utilisateur depuis les cookies
  function me() {
    console.log("[ME] Récupération de l'utilisateur :", user.value);
    return user.value;
  }

  return { user, token, isAuthenticated, login, register, logout, me };
});
