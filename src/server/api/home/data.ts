import { AuthConfig } from "~~/shared/config/auth.config"; 
import { MainPageData } from "~/types/pageData";
import { InitialEventData } from "~/types/products";
import { getCookie } from "h3";

const KEY = "EVENT_DATA";
const TTL = 60 * 1000;

export default defineEventHandler(async (event) => {
  try {
    const cachedData = await useStorage().getItem<MainPageData>(KEY);
    const date = new Date();

    if (cachedData) {
      const isCacheValid = new Date(cachedData.lastUpdated).getTime() <= date.getTime() - TTL;
      if (isCacheValid) return cachedData;
    }

    const token = getCookie(event, AuthConfig.accessTokenCookieKey);
    console.log("TEST: ", token)
    const config = useRuntimeConfig(event);
    const data = await $fetch<InitialEventData>(
      `/events/${config.public.server.eventId}/stands`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        baseURL: config.public.server.baseUrl,
      }
    );

    let eventData: MainPageData = {
      lastUpdated: date,
      eventId: data.eventId,
      eventBanner: data.eventImageUrl,
      eventName: data.eventName,
      stands: [],
      hasMultipleStands: false,
    };

    if (data.stand !== null) {
      eventData.stands.push(data.stand);
    } else {
      eventData.stands.push(...data.stands);
      eventData.hasMultipleStands = true;
    }

    await useStorage().setItem(KEY, eventData);

    return data;
  } catch (ex) {
    console.log(ex);
  }
});
