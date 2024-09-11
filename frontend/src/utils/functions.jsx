import { Badge } from "@/components/ui/badge";
import customFetch from "./customFetch";

// ------
export const activeBadge = (status) => {
  switch (status) {
    case true:
      return (
        <Badge className="bg-green-400 group-hover:bg-green-500">Active</Badge>
      );

    case false:
      return (
        <Badge className="bg-red-400 group-hover:bg-red-500">Inactive</Badge>
      );
  }
};
// ------
export const requiredBadge = (status) => {
  switch (status) {
    case true:
      return (
        <Badge className="bg-green-400 group-hover:bg-green-500">
          Required
        </Badge>
      );

    case false:
      return (
        <Badge className="bg-red-400 group-hover:bg-red-500">Optional</Badge>
      );
  }
};

// ------
export const adminBadge = (isAdmin) => {
  switch (isAdmin) {
    case 1:
      return (
        <Badge className="bg-pink-400 group-hover:bg-pink-500">Admin</Badge>
      );
    case 2:
      return (
        <Badge className="bg-slate-400 group-hover:bg-slate-500">User</Badge>
      );
  }
};

// ------
export const fieldTypeBadge = (fieldType) => {
  switch (fieldType) {
    case "text":
      return (
        <Badge className="bg-yellow-400 group-hover:bg-yellow-500 capitalize">
          text
        </Badge>
      );
    case "textarea":
      return (
        <Badge className="bg-gray-400 group-hover:bg-gray-500 capitalize">
          textarea
        </Badge>
      );
    case "checkbox":
      return (
        <Badge className="bg-cyan-400 group-hover:bg-cyan-500 capitalize">
          checkbox
        </Badge>
      );
    case "radio":
      return (
        <Badge className="bg-blue-400 group-hover:bg-blue-500 capitalize">
          radio
        </Badge>
      );
    case "number":
      return (
        <Badge className="bg-rose-400 group-hover:bg-rose-500 capitalize">
          number
        </Badge>
      );
  }
};

// ------
export const reviewBadge = (status) => {
  switch (status) {
    case 1:
      return (
        <Badge className="bg-gray-400 group-hover:bg-gray-500 capitalize">
          Unpublished
        </Badge>
      );
    case 2:
      return (
        <Badge className="bg-green-400 group-hover:bg-green-500 capitalize">
          Published
        </Badge>
      );
    case 3:
      return (
        <Badge className="bg-red-400 group-hover:bg-red-500 capitalize">
          Rejected
        </Badge>
      );
  }
};

// ------
export const serialNo = (page) => {
  const srno = !page || page <= 1 ? 1 : (page - 1) * 10 + 1;
  return srno;
};

// Re: Pagination starts ------
export const constructUrl = ({ pageNumber, search, pathname }) => {
  const searchParams = new URLSearchParams(search);
  searchParams.set("page", pageNumber.toString());
  return `${pathname}?${searchParams.toString()}`;
};

export const constructPrevOrNext = ({
  curretPage,
  pageCount,
  search,
  pathname,
}) => {
  let prevPage = curretPage - 1;
  if (prevPage < 1) prevPage = 1;
  const prevUrl = constructUrl({ pageNumber: prevPage, search, pathname });

  let nextPage = curretPage + 1;
  if (nextPage > pageCount) nextPage = pageCount;
  const nextUrl = constructUrl({ pageNumber: nextPage, search, pathname });

  return { prevUrl, nextUrl };
};
// Re: Pagination ends ------

export const currencyFormat = () => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    // minimumFractionDigits: 2, // Ensures two decimal places
    minimumFractionDigits: 0, // Ensures two decimal places
  });
  return formatter;
};

// ------
export const getCityState = async (code) => {
  const response = await customFetch.get(
    `https://api.postalpincode.in/pincode/${Number(code)}`
  );

  return response;
};

// ------
export const calculateRating = (reviews) => {
  const oneStar = reviews && reviews?.filter((i) => i.rating === 1).length;
  const twoStar = reviews && reviews?.filter((i) => i.rating === 2).length;
  const threeStar = reviews && reviews?.filter((i) => i.rating === 3).length;
  const fourStar = reviews && reviews?.filter((i) => i.rating === 4).length;
  const fiveStar = reviews && reviews?.filter((i) => i.rating === 5).length;

  const rating =
    reviews.length > 0
      ? (
          (fiveStar * 5 +
            fourStar * 4 +
            threeStar * 3 +
            twoStar * 2 +
            oneStar * 1) /
          reviews.length
        ).toFixed(1)
      : 0;

  return [oneStar, twoStar, threeStar, fourStar, fiveStar, rating];
};

// ------
export const namePrefix = (name) => {
  const arr = name.split(" ");
  const pref =
    arr[0].substring(0, 1).toUpperCase() + arr[1].substring(0, 1).toUpperCase();

  return pref;
};
