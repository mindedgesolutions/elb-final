import { UserContentWrapper } from "@/components";
import { Label } from "@/components/ui/label";
import UserPageHeader from "@/components/users/globals/UserPageHeader";
import galleryImg from "@/assets/users/gallery-icon.png";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector } from "react-redux";
import { useState } from "react";
import { nanoid } from "nanoid";
import { getCityState } from "@/utils/functions";
import { toast } from "@/components/ui/use-toast";
import splitErrors from "@/utils/splitErrors";
import customFetch from "@/utils/customFetch";
import { RadioGroup } from "@/components/ui/radio-group";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const UserPostAdd = () => {
  document.title = `Post an Ad | ${import.meta.env.VITE_APP_TITLE}`;

  const navigate = useNavigate();
  const { allCategories } = useSelector((store) => store.categories);
  const { currentUser } = useSelector((store) => store.currentUser);

  const parents = allCategories.filter((i) => i.parent_id === null);

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    catId: "",
    price: "",
    city: "",
    state: "",
    address: "",
    isNew: true,
  });
  const [pinCode, setPinCode] = useState("");
  const [char, setChar] = useState({ title: "", description: "" });
  const [remainingChar, setRemainingChar] = useState({
    title: 255,
    description: 500,
  });
  const [children, setChildren] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [dynamicFields, setDynamicFields] = useState([]);
  const [dynamicData, setDynamicData] = useState({});
  const [postImages, setPostImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState(new Map());

  const handleChange = (e) => {
    // Handle state change ------
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "catId") {
      const ch = allCategories
        .filter((i) => i.parent_id === Number(e.target.value))
        .sort((a, b) => a.category.localeCompare(b.category));
      setChildren(ch);
    }
  };

  const handleRemaining = (e) => {
    // Handle remaining characters ------
    const length = e.target.value.length;
    const maxAllowed = e.target.name === "title" ? 255 : 500;
    const remaining =
      Number(length) === 0
        ? Number(maxAllowed)
        : Number(maxAllowed) - Number(length);
    setRemainingChar({ ...remainingChar, [e.target.name]: remaining });

    let stateValue = "";
    switch (e.target.name) {
      case "title":
        stateValue =
          e.target.value.length > 255
            ? e.target.value.slice(0, 255)
            : e.target.value;
        break;
      case "description":
        stateValue =
          e.target.value.length > 500
            ? e.target.value.slice(0, 500)
            : e.target.value;
        break;
    }

    setChar({ ...char, [e.target.name]: stateValue });
  };

  const getPincodeInfo = async (pincode) => {
    // Get PIN code details ------
    setPinCode(pincode);
    if (pincode && pincode.length === 6) {
      setIsLoading(true);
      const result = await getCityState(pincode);
      let data = result?.data?.[0]?.PostOffice?.[0];
      if (!data) {
        setIsLoading(false);
        toast({
          title: "Not found!",
          description: "We could find neither city / district nor state",
        });
        return;
      }
      setIsLoading(false);
      setForm({ ...form, city: data.District, state: data.State });
    } else {
      setForm({ ...form, city: "", state: "" });
      return;
    }
  };

  // Re: Dynamic form fields start ------
  const getFormFields = async (subcatid) => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(
        `/masters/post-form-fields/${subcatid}`
      );
      const data = response.data.data.rows;
      setDynamicFields(data);
      setIsLoading(false);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      setIsLoading(false);
    }
  };

  const onSubCategoryChange = async (value) => {
    setSelectedSubCategory(value);
    await getFormFields(Number(value));
  };

  const handleDbChange = (e) => {
    setDynamicData({ ...dynamicData, [e.target.name]: e.target.value });
  };
  // Re: Dynamic form fields end ------

  // Handle image upload starts ------
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];

    files.forEach((file) => {
      if (validMimeTypes.includes(file.type)) {
        if (
          !(file.type == "image/jpeg") &&
          !(file.type == "image/jpg") &&
          !(file.type == "image/png") &&
          !(file.type == "image/gif") &&
          !(file.type == "image/webp")
        ) {
          toast({
            title: "Error!",
            description:
              "Image should be JPG or JPEG or PNG or GIF or WEBP type",
          });
          return;
        }
        if (file.size > 500 * 1024) {
          toast({
            title: "Error!",
            description: "Image size cannot be more than 500 KB",
          });
          return;
        }

        setPostImages((prevImages) => [...prevImages, file]);
        setSelectedImages((prevSelected) =>
          new Map(prevSelected).set(file.name, false)
        );
      } else {
        toast({
          title: "Error!",
          description: "Not an image",
        });
        return;
      }
    });
  };

  const deleteImage = (index) => {
    setPostImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedImages((prevSelected) => {
      const newSelected = new Map(prevSelected);
      newSelected.delete(postImages[index].name);
      return newSelected;
    });
  };

  const handleCheckboxChange = (name) => {
    setSelectedImages((prevSelected) => {
      const newSelected = new Map(prevSelected);
      newSelected.set(name, !newSelected.get(name));

      return newSelected;
    });
  };

  const loopImg = () => {
    return postImages.map((img, index) => (
      <div
        key={nanoid()}
        className="position-relative gig-media-thumb overflow-hidden"
      >
        <input
          type="radio"
          name="is_cover_image"
          className="form-check-input"
          value={img.name}
          checked={selectedImages.get(img.name) || false}
          onChange={() => handleCheckboxChange(img.name)}
        />
        <img src={URL.createObjectURL(img)} className="img-fluid" alt="" />
        <button
          type="button"
          className="gig-img-delete-btn"
          onClick={() => deleteImage(index)}
        >
          <FaRegTrashCan size={13} className="text-white" />
        </button>
      </div>
    ));
  };
  // Handle image upload ends ------

  // Handle form submit starts ------
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();

    // Append regular form data
    const formData = new FormData(e.currentTarget);
    for (const [key, value] of formData.entries()) {
      if (key !== "image") {
        // Skip the 'image' key if it exists
        data.append(key, value);
      }
    }

    // Append images
    postImages.forEach((img) => {
      data.append(`image`, img); // Use a unique key for each image
    });

    selectedImages.forEach((selected, name) => {
      if (selected) {
        data.append("cover", name);
      }
    });
    try {
      const response = await customFetch.post(`/users/posts/add`, data);
      toast({
        title: "Created!",
        description: "Post added",
      });
      navigate(`/user/${currentUser.slug}/posts`);
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      console.log(error);
      return null;
    }
  };
  // Handle form submit ends ------

  return (
    <UserContentWrapper>
      <UserPageHeader text={`post an ad`} subText={``} />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        autoComplete="off"
        className="w-full"
      >
        <div className="w-full rounded-xl flex flex-col space-y-8 bg-white mb-4">
          <div className="bg-purple-900 text-white rounded-xl rounded-b-none p-3 text-lg tracking-widest capitalize">
            post info
          </div>
          <div className="flex flex-col space-y-6 mt-0 p-4">
            <div className="flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="title"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  post title
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="title"
                id="title"
                placeholder="A relevant title is always useful"
                value={char.title}
                onChange={handleRemaining}
              />
              <span className="text-red-500 text-sm font-normal">
                Remaining characters: {remainingChar.title}
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2 flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1 mb-1">
                  <Label
                    htmlFor="catId"
                    className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                  >
                    category
                  </Label>
                  <span className="text-lg text-red-600">*</span>
                </div>
                <select
                  name="catId"
                  id="catId"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                  value={form.catId}
                  onChange={handleChange}
                >
                  <option value="">Select parent</option>
                  {parents.map((cat) => {
                    return (
                      <option key={nanoid()} value={cat.id}>
                        {cat.category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="basis-1/2 flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1 mb-1">
                  <Label
                    htmlFor="subcatId"
                    className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                  >
                    sub-category
                  </Label>
                  <span className="text-lg text-red-600">*</span>
                </div>
                <select
                  name="subcatId"
                  id="subcatId"
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none"
                  value={selectedSubCategory}
                  onChange={(e) => onSubCategoryChange(e.target.value)}
                >
                  <option value="">Select sub-category</option>
                  {children.map((cat) => {
                    return (
                      <option key={nanoid()} value={cat.id}>
                        {cat.category}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2 flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1 mb-1">
                  <Label
                    htmlFor="pinCode"
                    className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                  >
                    PIN code
                  </Label>
                  <span className="text-lg text-red-600">*</span>
                </div>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                  name="pinCode"
                  id="pinCode"
                  placeholder="Your PIN code goes here"
                  value={pinCode}
                  onChange={(e) => getPincodeInfo(e.target.value)}
                />
              </div>
              <div className="basis-1/2 flex flex-col">&nbsp;</div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2 flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1 mb-1">
                  <Label
                    htmlFor="city"
                    className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                  >
                    city
                  </Label>
                </div>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                  name="city"
                  id="city"
                  placeholder="City (auto-fill)"
                  value={form.city}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="basis-1/2 flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1 mb-1">
                  <Label
                    htmlFor="state"
                    className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                  >
                    state
                  </Label>
                </div>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                  name="state"
                  id="state"
                  placeholder="State (auto-fill)"
                  value={form.state}
                  onChange={handleChange}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="description"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  description
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border-1 border-input bg-background px-3 py-2 text-sm focus:outline-none"
                name="description"
                id="description"
                placeholder="Lets brag!"
                value={char.description}
                onChange={handleRemaining}
              ></textarea>
              <span className="text-red-500 text-sm font-normal">
                Remaning characters: {remainingChar.description}
              </span>
            </div>
            <div className="flex flex-row gap-4">
              <div className="basis-1/2 flex flex-col">
                <div className="flex flex-row justify-start items-center gap-1 mb-1">
                  <Label
                    htmlFor="price"
                    className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                  >
                    price
                  </Label>
                  <span className="text-lg text-red-600">*</span>
                </div>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                  name="price"
                  id="price"
                  placeholder="Product price"
                  value={form.price}
                  onChange={handleChange}
                />
              </div>
              <div className="basis-1/2 flex flex-col">
                <div className="flex flex-row justify-start items-center mt-10 ml-2 space-x-2">
                  <Checkbox
                    id="isNew"
                    name="isNew"
                    className="border-purple-700 data-[state=checked]:bg-purple-700"
                    checked={form.isNew}
                    onClick={() => setForm({ ...form, isNew: !form.isNew })}
                  />
                  <label
                    htmlFor="isNew"
                    className="flex justify-center items-baseline gap-1 text-sm tracking-widest font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <h3 className="text-lg font-semibold">YES,</h3> the product
                    is new
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedSubCategory && dynamicFields?.length > 0 && (
          <div className="w-full rounded-xl flex flex-col space-y-6 bg-white mb-4">
            <div className="bg-purple-900 text-white rounded-xl rounded-b-none p-3 text-lg tracking-widest capitalize">
              We will need a little more information
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 p-4 pt-0">
              {dynamicFields.map((field) => {
                return (
                  <div key={field.id} className="col-span-1">
                    <div className="flex flex-col space-y-1.5">
                      <Label
                        htmlFor={`title`}
                        className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                      >
                        {field.field_label}{" "}
                        {field?.is_required && (
                          <span className="text-red-500">*</span>
                        )}
                      </Label>
                      {(field.field_type === "text" ||
                        field.field_type === "number") && (
                        <input
                          type={field.field_type}
                          name={field.field_name}
                          id={field.field_name}
                          value={dynamicData[field.field_name] || ""}
                          onChange={handleDbChange}
                          placeholder={`Enter ${field.field_label}`}
                          className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                        />
                      )}

                      {field.field_type === "radio" && (
                        <>
                          <RadioGroup className="flex flex-row gap-4">
                            {field.options?.map((option) => {
                              return (
                                <div key={option.option_id} className="mt-3">
                                  <div className="flex items-center">
                                    <Label
                                      key={option.option_id}
                                      className="flex gap-2 items-center"
                                    >
                                      <input
                                        className="aspect-square h-4 w-4 rounded-full border border-purple-800 text-purple-800 ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="radio"
                                        name={field.field_name}
                                        value={option.option_id}
                                      />
                                      <span className="text-[16px] font-medium tracking-wide text-purple-800 capitalize">
                                        {option.option_value}
                                      </span>
                                    </Label>
                                  </div>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        </>
                      )}

                      {field.field_type === "textarea" && (
                        <textarea
                          name={field.field_name}
                          id={field.field_name}
                          value={dynamicData[field.field_name] || ""}
                          onChange={handleDbChange}
                          placeholder={`Enter ${field.field_label}`}
                          className="flex min-h-[80px] w-full rounded-md border-1 border-input bg-background px-3 py-2 text-sm focus:outline-none"
                        ></textarea>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="w-full rounded-xl flex flex-col space-y-6 bg-white">
          <div className="bg-purple-900 text-white rounded-xl rounded-b-none p-3 text-lg tracking-widest capitalize">
            Upload some cool images (max. 2)
          </div>
          <div className="flex flex-col space-y-6 mt-0 p-4">
            <div className="flex flex-row gap-4">
              <div className="d-flex flex-wrap gap-3">
                <div>
                  <label
                    htmlFor="gig-img"
                    className="border text-center gig-file-upload flex flex-col justify-center items-center"
                  >
                    <img src={galleryImg} alt="" />
                    <p className="text-dark-200">Max.Size 500KB</p>
                    <input
                      className="d-none"
                      type="file"
                      multiple
                      name="image"
                      id="gig-img"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {loopImg()}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-xl flex flex-row mt-6 justify-center items-center">
          <button
            type="submit"
            className="w-btn-secondary-lg border font-medium border-white px-6 py-3 text-md w-32 rounded-full capitalize tracking-wider"
          >
            Add post
          </button>
        </div>
      </form>
    </UserContentWrapper>
  );
};
export default UserPostAdd;
