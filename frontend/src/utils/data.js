export const userType = [
  { typeId: 1, typeLabel: "Admin" },
  { typeId: 2, typeLabel: "User" },
];

// export const fieldTypes = ["text", "textarea", "checkbox", "radio", "number"];
export const fieldTypes = ["text", "textarea", "radio", "number"];

export const postStatus = [
  { value: "sold", label: "sold" },
  { value: "unsold", label: "unsold" },
  { value: "featured", label: "featured" },
  { value: "not_featured", label: "not featured" },
];

export const sortBy = [
  { value: "1-2", label: "Price low to high" },
  { value: "2-1", label: "Price high to low" },
  { value: "a-b", label: "A to z" },
  { value: "b-a", label: "Z to a" },
];

export const reviewTypes = [
  { value: "all", label: "all reviews" },
  { value: "new", label: "new / unpublished reviews" },
  { value: "published", label: "published reviews" },
  { value: "rejected", label: "rejected reviews" },
];
