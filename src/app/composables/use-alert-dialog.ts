import { ModalAlert } from "#components";

export const useAlertDialog = () => {
  const overlay = useOverlay();

  const modal = overlay.create(ModalAlert);

  async function showAndWaitResponse() {
    const instance = modal.open();
    return await instance.result;
  }

  return {
    showAndWaitResponse
  };
};
