"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppStore } from "../lib/zustand";
import { collectItem } from "../lib/my-utils";
import { Label } from "./ui/label";

export function SelectCountry({ outsideCountry }) {
  const flowers = useAppStore((state) => state.flowers);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    outsideCountry ? outsideCountry : ""
  );
  let countries = flowers && collectItem(flowers, "country");
  const button = React.useRef(null);

  React.useEffect(() => {
    let id = null;
    function changer() {
      if (open && button) {
        id = setTimeout(() => {
          const element = document.querySelector(
            "[data-radix-popper-content-wrapper]"
          );

          const listbox = document.querySelector("[role='listbox']");
          listbox.style.maxHeight = "170px";

          element.style.width = button.current.offsetWidth + "px";
        }, 1);
      }
    }

    changer();

    window.addEventListener("resize", changer);

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", changer);
      id = null;
    };
  }, [open, button]);

  return (
    flowers && (
      <div className="flex flex-col gap-[6px] w-full">
        <Label onClick={() => setOpen(!open)}>Select country*</Label>
        <Popover open={open} onOpenChange={setOpen} className="w-full">
          <PopoverTrigger asChild>
            <Button
              ref={button}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? countries.find((country) => country === value)
                : "Select country..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country}
                      value={country}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    )
  );
}
