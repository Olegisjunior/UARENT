import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Props = {
  selectedCity: string | undefined;
  setSelectedCity: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const SelectComponent: React.FC<Props> = ({ selectedCity, setSelectedCity }) => {
  const Citys = [
    "Vinnytsya",
    "Volyn",
    "Dnipropetrovsk",
    "Donetsk",
    "Zhytomyr",
    "Zakarpattya",
    "Zaporizhzhya",
    "Ivano-Frankivsk",
    "Kyiv",
    "Kirovohrad",
    "Luhansk",
    "Lviv",
    "Mykolayiv",
    "Odesa",
    "Poltava",
    "Rivne",
    "Sumy",
    "Ternopyl",
    "Kharkiv",
    "Kherson",
    "Khmelnytskiy",
    "Cherkasy",
    "Chernivtsi",
    "Chernihiv",
  ];

  return (
    <Select onValueChange={setSelectedCity}>
      <SelectTrigger className="w-[170px]">
        <SelectValue placeholder="Select your location" />
      </SelectTrigger>
      <SelectContent>
        {Citys.sort().map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
