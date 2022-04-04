import { ref, onMounted } from "vue";
import type { HttpMethod } from "../types/types";

export const useFetch = <T>(url: string, method: HttpMethod, body?: object) => {
  const data = ref<(() => Promise<T>) | null>(null);
  const error = ref(null);

  onMounted(() => {
    fetch(url, {
      method: method,
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json)
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  });

  return { data, error };
};
