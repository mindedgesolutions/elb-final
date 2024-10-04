const UserPageHeader = ({ text, subText }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start mb-3 -mt-10">
      <h3 className="text-2xl font-bold tracking-widest capitalize">{text}</h3>
      {subText && (
        <p className="italic mt-2 text-sm font-light tracking-wide">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, rem!
        </p>
      )}
    </div>
  );
};
export default UserPageHeader;
