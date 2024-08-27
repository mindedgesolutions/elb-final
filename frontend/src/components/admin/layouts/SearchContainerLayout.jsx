import { Form } from "react-router-dom";

const SearchContainerLayout = ({ children }) => {
  return (
    <Form>
      <div className="flex flex-col md:flex-row justify-start bg-muted items-center gap-3 p-2 sm:my-8 md:justify-end md:my-0 md:mb-4">
        {children}
      </div>
    </Form>
  );
};
export default SearchContainerLayout;
