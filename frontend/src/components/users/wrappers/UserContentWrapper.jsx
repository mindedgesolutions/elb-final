const UserContentWrapper = ({ children }) => {
  return (
    <div className="p-6 flex flex-col justify-start items-start">
      {children}
    </div>
  );
};
export default UserContentWrapper;
