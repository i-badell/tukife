import { TEST_STAND_ID } from "~~/shared/config/test.config";

export default defineEventHandler(async (event) => {
  const standId = getRouterParam(event, 'standId');
  return standId !== TEST_STAND_ID;
})
