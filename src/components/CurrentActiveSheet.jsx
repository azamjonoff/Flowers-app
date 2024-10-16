import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAppStore } from "../lib/zustand";

function CurrentActiveSheet() {
  const { activeSheet, setActiveSheet } = useAppStore();

  const { title, description, children } = activeSheet.data || {};

  return (
    <Sheet
      open={activeSheet.open}
      onOpenChange={() => setActiveSheet(null, activeSheet.side)}
    >
      <SheetContent
        className={
          activeSheet.side === "top" || activeSheet.side === "bottom"
            ? "h-2/4"
            : ""
        }
        side={activeSheet.side}
      >
        <SheetHeader className="pb-2">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div
          className={`overflow-y-auto py-5 pl-1 pr-5 ${
            activeSheet.side === "top" || activeSheet.side === "bottom"
              ? "h-[calc(100%-56px)]"
              : "h-[calc(100%-80px)]"
          }`}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CurrentActiveSheet;
