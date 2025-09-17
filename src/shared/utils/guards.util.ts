export namespace Guards {

  export function isSsr(): boolean {
    return !import.meta.client;
  }

  export function isNullOrUndefined(obj: any): boolean {
    return (obj === null || obj === undefined);
  }
}
