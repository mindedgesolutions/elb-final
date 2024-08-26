import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FormInput = ({ label, required, type, name, placeholder, value }) => {
  const [input, setInput] = useState(value || "");

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className="capitalize">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};
export default FormInput;
