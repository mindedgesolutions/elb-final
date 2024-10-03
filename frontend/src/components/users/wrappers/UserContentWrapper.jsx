const UserContentWrapper = ({ children }) => {
  return (
    <div className="p-4 flex flex-col justify-start items-start">
      {children}
    </div>
  );
};
export default UserContentWrapper;
