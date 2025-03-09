export function timeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours} h`;
  if (days === 1) return "Hier";
  if (days < 7) return `Il y a ${days} j`;

  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(
    timestamp
  );
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 1) {
    return `Aujourd'hui à ${date.getHours()}h`;
  }
  if (diffDays < 2) {
    return `Hier à ${date.getHours()}h`;
  }
  if (diffDays < 7) {
    return `Il y a ${Math.floor(diffDays)} jours`;
  }

  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "long" }).format(date);
}
