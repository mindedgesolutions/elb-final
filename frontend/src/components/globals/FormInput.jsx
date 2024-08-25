import { Input } from "../ui/input";
import { Label } from "../ui/label";

const FormInput = ({ label, required, type, name, placeholder }) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className="capitalize">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input type={type} id={name} name={name} placeholder={placeholder} />
    </div>
  );
};
export default FormInput;
