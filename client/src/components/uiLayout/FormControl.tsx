import type { HTMLInputTypeAttribute } from "react";
import { Input } from "../ui/input";

type FormControlProps = {
  name: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
};

const FormControl = ({ name, type = "text", error = "" }: FormControlProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
      <Input placeholder={name} id={name} type={type} />
      <p className="text-red-600">{error}</p>
    </div>
  );
};

export default FormControl;
