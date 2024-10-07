import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupDemo({ setColor }) {
  return (
    <RadioGroup
      onValueChange={(value) => setColor(value)}
      defaultValue="1"
      className="flex gap-4"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="1" id="r1" />
        <Label htmlFor="r1">View 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="2" id="r2" />
        <Label htmlFor="r2">View 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="3" id="r3" />
        <Label htmlFor="r3">View 3</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="4" id="r4" />
        <Label htmlFor="r4">View 4</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="5" id="r5" />
        <Label htmlFor="r5">View 5</Label>
      </div>
    </RadioGroup>
  );
}
