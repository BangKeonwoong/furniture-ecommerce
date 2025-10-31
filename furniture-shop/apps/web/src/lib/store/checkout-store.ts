"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { PgApprovalResult, PgPaymentResult } from "@/lib/payments/types";

export type CheckoutState = {
  address: {
    name: string;
    phone: string;
    postalCode: string;
    address1: string;
    address2: string;
  };
  shippingOption: string;
  paymentSession?: PgPaymentResult | null;
  paymentApproval?: PgApprovalResult | null;
};

export type CheckoutStore = CheckoutState & {
  setAddress: (address: CheckoutState["address"]) => void;
  setShippingOption: (option: string) => void;
  setPaymentSession: (session: PgPaymentResult | null) => void;
  setPaymentApproval: (approval: PgApprovalResult | null) => void;
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
  paymentSession: null,
  paymentApproval: null
};

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      ...defaultState,
      setAddress: (address) => set({ address }),
      setShippingOption: (option) => set({ shippingOption: option }),
      setPaymentSession: (session) => set({ paymentSession: session }),
      setPaymentApproval: (approval) => set({ paymentApproval: approval }),
      reset: () => set(defaultState)
    }),
    {
      name: "checkout-state"
    }
  )
);
