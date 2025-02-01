"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";

const typeOptions = ["sport", "sedan", "electric", "suv"];
const brandOptions = ["porsche", "bmw", "audi", "tesla", "dodge", "hyundai", "chevrolet", "corvette", "lamborghini"];
const capacityOptions = [2, 4, 5, 7];

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTypes = searchParams.get("types")?.split(",") || [];
  const initialbrands = searchParams.get("brands")?.split(",") || [];
  const initialCapacity = searchParams.get("capacity")?.split(",").map(Number) || [];
  const initialPriceRange = searchParams.get("priceRange")?.split(",").map(Number) || [70, 300];

  const [capacitys, setCapacity] = useState<number[]>(initialCapacity);
  const [types, setTypes] = useState<string[]>(initialTypes);
  const [brands, setBrands] = useState<string[]>(initialbrands);
  const [priceRange, setPriceRange] = useState<number[]>(initialPriceRange);

  const [showAllBrands, setShowAllBrands] = useState(false);

  const visibleBrands = showAllBrands ? brandOptions.sort() : brandOptions.sort().slice(0, 5);

  const updateFilters = () => {
    const currentParams = new URLSearchParams(window.location.search);

    if (types.length > 0) {
      currentParams.set("types", types.join(","));
    } else {
      currentParams.delete("types");
    }

    if (brands.length > 0) {
      currentParams.set("brands", brands.join(","));
    } else {
      currentParams.delete("brands");
    }

    if (capacitys.length > 0) {
      currentParams.set("capacitys", capacitys.join(","));
    } else {
      currentParams.delete("capacitys");
    }

    if (priceRange && priceRange.length > 0) {
      currentParams.set("priceRange", priceRange.join(","));
    } else {
      currentParams.delete("priceRange");
    }

    router.push(`/cars?${currentParams.toString()}`, { shallow: true } as { shallow: boolean } & NavigateOptions);
  };

  const toggleType = (type: string) => {
    setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const toggleBrand = (brand: string) => {
    setBrands((prev) => (prev.includes(brand) ? prev.filter((t) => t !== brand) : [...prev, brand]));
  };

  const toggleCapacity = (capacity: number) => {
    setCapacity((prev) => (prev.includes(capacity) ? prev.filter((t) => t !== capacity) : [...prev, capacity]));
  };

  React.useEffect(() => {
    updateFilters();
  }, [types, capacitys, brands, priceRange]);

  return (
    <div className="flex justify-start flex-col gap-6 text-[#596780] text-lg font-semibold">
      <div className="ml-10 ">
        <h4 className="text-lg  mb-2 text-[#90A3BF] font-normal">Car Types</h4>
        <div className="flex flex-col gap-3">
          {typeOptions.map((type) => (
            <label key={type} className="flex items-center gap-2">
              <Checkbox checked={types.includes(type)} onCheckedChange={() => toggleType(type)} />
              <span className="hover:cursor-pointer">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>
      <hr className="bg-secondary opacity-40" />
      <div className="ml-10">
        <h4 className="text-lg  mb-2 text-[#90A3BF] font-normal">Car Capacity</h4>
        <div
          className="flex flex-col gap-3
        "
        >
          {capacityOptions.map((capacity) => (
            <label key={String(capacity)} className="flex items-center gap-2">
              <Checkbox checked={capacitys.includes(capacity)} onCheckedChange={() => toggleCapacity(capacity)} />
              <span className="hover:cursor-pointer">{capacity}</span>
            </label>
          ))}
        </div>
      </div>
      <hr className="bg-secondary opacity-40" />

      <div className="ml-10">
        <h4 className="text-lg  mb-2 text-[#90A3BF] font-normal">Car brand</h4>
        <div className="flex flex-col gap-3">
          {visibleBrands.map((brand) => (
            <label key={brand} className="flex items-center gap-2">
              <Checkbox checked={brands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
              <span className="hover:cursor-pointer">{brand.charAt(0).toUpperCase() + brand.slice(1)}</span>
            </label>
          ))}
          <button className="w-fit flex justify-center items-center cursor-pointer" onClick={() => setShowAllBrands((prev) => !prev)}>
            <span className="font-semibold underline  text-md ">{showAllBrands ? "Show Less" : "More"}</span>
            {showAllBrands ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
          </button>
        </div>
      </div>
      <hr className="bg-secondary opacity-40" />

      <div className="mx-8">
        <h4 className="text-lg  mb-2 text-[#90A3BF] font-normal">Price Range</h4>
        <Slider defaultValue={[110, 400]} max={400} min={110} step={10} value={priceRange} onValueChange={(value) => setPriceRange([value[0], value[1]])} />
        <div className="flex justify-between text-sm mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <hr className="bg-secondary opacity-40" />
    </div>
  );
}
