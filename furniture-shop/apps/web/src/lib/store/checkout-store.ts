import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CheckoutState = {
  address: {
    name: string;
    phone: string;
    postalCode: string;
    address1: string;
    address2: string;
  };
  shippingOption: string;
  clientSecret?: string | null;
};

export type CheckoutStore = CheckoutState & {
  setAddress: (address: CheckoutState["address"]) => void;
  setShippingOption: (option: string) => void;
  setClientSecret: (secret: string | null) => void;
  reset: () => void;
};

const defaultState: CheckoutState = {
  address: {
    name: "",
    phone: "",
    postalCode: "",
    address1: "",
    address2: ""
  },
  shippingOption: "white-glove",
  clientSecret: null
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      ...defaultState,
      setAddress: (address) => set({ address }),
      setShippingOption: (option) => set({ shippingOption: option }),
      setClientSecret: (secret) => set({ clientSecret: secret }),
      reset: () => set(defaultState)
    }),
    {
      name: "checkout-state"
    }
  )
);
