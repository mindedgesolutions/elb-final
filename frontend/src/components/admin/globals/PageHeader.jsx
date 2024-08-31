const PageHeader = ({ main, second }) => {
  return (
    <div className="w-full p-8 -mb-10">
      <h1 className="text-2xl font-semibold mb-2 capitalize">{main}</h1>
      {second && (
        <h3 className="text-sm font-normal text-muted-foreground">{second}</h3>
      )}
    </div>
  );
};
export default PageHeader;
