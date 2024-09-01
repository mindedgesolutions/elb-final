import { useRouteError } from "react-router-dom";

const AdminError = () => {
  const error = useRouteError();

  return <div>AdminError</div>;
};
export default AdminError;
