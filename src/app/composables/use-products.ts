export function useEventStands() {
  const runtimeConfig = useRuntimeConfig();
  const asyncDataOptions = {
    server: true,
    lazy: false,
    default: () => [],
  };

  const token = useCookie('access_token').value;
  return useAsyncData('event-stands',
    () => $fetch(`/api/events/${runtimeConfig.public.eventId}/products`, {
      baseURL: runtimeConfig.public.apiConfig.baseUrl,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    asyncDataOptions
  )
}

