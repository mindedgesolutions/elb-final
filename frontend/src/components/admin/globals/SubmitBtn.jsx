import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SubmitBtn = ({ label = "Submit", isSubmitting, className }) => {
  return (
    <>
      <Button
        type="submit"
        className={className || `bg-green-500 hover:bg-green-400 capitalize`}
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting ..." : label}
      </Button>
    </>
  );
};
export default SubmitBtn;
