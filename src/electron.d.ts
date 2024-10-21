export {};
declare global {
  interface Window {
    electron: {
      setStore: (key: string, value: any) => void;
      getStore: (key: string) => any;
    };
  }
}
