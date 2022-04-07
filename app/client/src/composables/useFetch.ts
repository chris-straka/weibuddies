import { ref, type Ref, onMounted } from "vue";

export const useFetch = <T, E>(url: string, method: "GET" | "POST", body?: object) => {
  const data = ref() as Ref<T>;
  const error = ref() as Ref<E>;

  onMounted(() => {
    fetch(url, {
      method: method,
      headers: { "Content-Type": "applications/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  });

  return { data, error };
};
