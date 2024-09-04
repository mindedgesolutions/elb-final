import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminSmallerTitle = ({ title, allowed = 30 }) => {
  const label =
    title.length > allowed ? title.substring(0, allowed) + ` ...` : title;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{label}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default AdminSmallerTitle;
