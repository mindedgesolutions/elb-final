const UserPageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col ml-[290px] bg-stone-100 min-h-screen">
      {children}
    </div>
  );
};
export default UserPageWrapper;
