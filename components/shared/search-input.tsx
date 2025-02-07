import React from "react";
import { Input } from "../ui/input";
import { Car } from "@prisma/client";
import Link from "next/link";

type Props = {};

export const SearchInput: React.FC<Props> = () => {
  const [text, setText] = React.useState("");
  const [cars, setCars] = React.useState<Car[]>([]);
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setDropdownVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchCars = async (searchText: string) => {
    const res = await fetch(`/api/cars?q=${searchText}`, { method: "GET" });
    const data = await res.json();
    setCars(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDropdownVisible(true);
    setText(value);
    searchCars(value);
  };

  return (
    <div className="relative w-[175px] lg:w-[500px]" ref={dropdownRef}>
      <div className="relative">
        <Input
          value={text}
          onChange={handleSearch}
          className=" h-12 pl-4 pr-10 rounded-lg border border-gray-200 focus:border-primary w-full lg:w-full"
          placeholder="Пошук машини"
        />
        {text && (
          <button
            onClick={() => setText("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {isDropdownVisible && text && cars.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-[200]">
          <ul className="max-h-[400px] overflow-y-auto">
            {cars.map((car: Car) => (
              <li
                key={car.id}
                className="group hover:bg-gray-50 transition-colors"
              >
                <Link href={`/car/${car.id}`} onClick={() => setText("")}>
                  <div className="flex items-center flex-col lg:flex-row gap-4 p-3 cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {car.name}
                      </p>
                    </div>
                    <div className="flex-shrink-0 h-16 w-24 relative">
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        className="h-full w-full object-cover "
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
