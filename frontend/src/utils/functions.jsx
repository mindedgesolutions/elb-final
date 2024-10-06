import { Badge } from "@/components/ui/badge";
import customFetch from "./customFetch";
import splitErrors from "./splitErrors";
import CryptoJS from "crypto-js";

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
export const postStatusBadge = ({ is_sold, is_blocked }) => {
  let badge, label;
  if (is_sold) {
    badge = `in-progress`;
    label = `Sold`;
  } else if (is_blocked) {
    badge = `cancelled`;
    label = `Rejected`;
  } else {
    badge = `pending`;
    label = `Posted`;
  }
  return { badge, label };
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
export const calculateRating = (rating) => {
  const sellerRating =
    Number(rating[5]) > 0
      ? (
          (Number(rating[0]) * 1 +
            Number(rating[1]) * 2 +
            Number(rating[2]) * 3 +
            Number(rating[3]) * 4 +
            Number(rating[4]) * 5) /
          Number(rating[5])
        ).toFixed(1)
      : 0;

  return [rating[0], rating[1], rating[2], rating[3], rating[4], sellerRating];
};

// ------
export const namePrefix = (name) => {
  const arr = name.split(" ");
  const pref =
    arr[0].substring(0, 1).toUpperCase() + arr[1].substring(0, 1).toUpperCase();

  return pref;
};

// ------
export const checkLoginStatus = async () => {
  try {
    const status = await customFetch.get(`/auth/login-status`);
    return status.data.status;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// ------
export const encParam = (value) => {
  return encodeURIComponent(
    CryptoJS.AES.encrypt(value, import.meta.env.VITE_ENC_KEY).toString()
  );
};

export const decParam = (value) => {
  const data = CryptoJS.AES.decrypt(value, import.meta.env.VITE_ENC_KEY);

  return data.toString(CryptoJS.enc.Utf8);
};
