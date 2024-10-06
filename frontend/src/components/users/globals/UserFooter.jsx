const UserFooter = () => {
  return (
    <div className="py-2 px-8 bg-slate-100 flex flex-row justify-end items-center mt-8">
      <h1>
        All rights reserved &copy; Easy Lending Buddy,{" "}
        {new Date().getFullYear()}
      </h1>
    </div>
  );
};
export default UserFooter;
