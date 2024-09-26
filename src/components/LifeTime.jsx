import { Input } from "./ui/input";
import { Label } from "./ui/label";

function LifeTime({ time }) {
  return (
    <div>
      <Label className="mb-1" htmlFor="lifetime">
        From period*
      </Label>
      <div className="flex justify-between items-center gap-5">
        <Input
          defaultValue={time}
          id="lifetime"
          placeholder="Enter the period"
          type="text"
          name="lifetime"
        />
      </div>
    </div>
  );
}

export default LifeTime;
