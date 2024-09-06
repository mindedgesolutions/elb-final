import { useLoaderData } from "react-router-dom";

const WbPostSorting = () => {
  const { postMeta } = useLoaderData();

  return (
    <div className="flex justify-between items-center bg-purple-200">
      <p>Total {postMeta.totalRecords} products</p>
      <div className="flex gap-3">
        <p>Sort by price</p>
        <p>Sort by alphabets</p>
      </div>
    </div>
  );
};
export default WbPostSorting;
