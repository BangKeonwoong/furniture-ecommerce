"use client";

import { Tab } from "@headlessui/react";
import type { ProductDetail } from "@/lib/product-detail";

const tabs = [
  { key: "delivery", label: "배송" },
  { key: "returns", label: "반품" },
  { key: "warranty", label: "보증" }
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function ProductPolicies({ policies }: { policies: ProductDetail["policies"] }) {
  return (
    <Tab.Group>
      <Tab.List className="flex gap-3 rounded-full bg-slate-100 p-1 text-sm">
        {tabs.map((tab) => (
          <Tab key={tab.key} className={({ selected }) => `flex-1 rounded-full px-4 py-2 ${selected ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>
            {tab.label}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4 rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-600">
        <Tab.Panel>{policies.delivery}</Tab.Panel>
        <Tab.Panel>{policies.returns}</Tab.Panel>
        <Tab.Panel>{policies.warranty}</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
