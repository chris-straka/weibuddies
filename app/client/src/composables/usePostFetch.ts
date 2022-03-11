import { ref } from "vue";

export const usePostFetch = <T>(url: string, body: object) => {
  const data = ref<(() => Promise<T>) | null>(null);
  const error = ref(null);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "applications/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json)
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
};
