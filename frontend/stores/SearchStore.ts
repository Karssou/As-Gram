export const useSearchStore = defineStore("Search", () => {
  const searchResult = ref<{ id: Number; username: string }[]>([]);
  return { searchResult };
});
