import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Address = {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
};

type AddressState = {
  address: Address;
  setAddress: (address: Address) => void;
};

const defaultAddress: Address = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postalCode: "",
  country: "",
};

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      address: defaultAddress,

      setAddress: (address) => set({ address }),
    }),
    {
      name: "address-storage",
    }
  )
);