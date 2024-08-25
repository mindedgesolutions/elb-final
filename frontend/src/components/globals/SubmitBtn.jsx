import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const SubmitBtn = ({ label = "Submit", isSubmitting, className }) => {
  return (
    <>
      <Button
        type="submit"
        className={className || `bg-primary`}
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting ..." : label}
      </Button>
    </>
  );
};
export default SubmitBtn;
