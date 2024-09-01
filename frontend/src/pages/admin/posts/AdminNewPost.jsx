import {
  AdminBreadcrum,
  AdminPageLayout,
  AdminPostImage,
  PageHeader,
  SubmitBtn,
} from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import customFetch from "@/utils/customFetch";
import splitErrors from "@/utils/splitErrors";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link } from "react-router-dom";
import { getCityState } from "@/utils/functions";
import { toast } from "@/components/ui/use-toast";

const AdminNewPost = () => {
  document.title = `Add New Post | ${import.meta.env.VITE_APP_TITLE}`;

  const { allCategories } = useSelector((store) => store.categories);
  const parents = allCategories.filter((i) => i.parent_id === null);

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    catId: "",
    title: "",
    description: "",
    price: "",
    pinCode: "",
    city: "",
    state: "",
    address: "",
  });
  const [children, setChildren] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [dynamicFields, setDynamicFields] = useState([]);
  const [dynamicData, setDynamicData] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "catId") {
      const ch = allCategories
        .filter((i) => i.parent_id === Number(e.target.value))
        .sort((a, b) => a.category.localeCompare(b.category));
      setChildren(ch);
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

  const getPincodeInfo = async () => {
    const result = await getCityState(form.pinCode);
    const data = result?.data?.[0]?.PostOffice?.[0];
    if (!data) {
      toast({
        title: "Not found!",
        description: "We could find neither city / district nor state",
      });
      return;
    }
    setForm({ ...form, city: data.District, state: data.State });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  return (
    <>
      <PageHeader main={`Add post`} />
      <AdminBreadcrum
        parentLabel={`all posts`}
        parentHref={`/admin/posts`}
        childLabel={`Add post`}
      />

      <AdminPageLayout>
        <div className="grid col-span-1 border-1 rounded-md sm:p-2 md:p-3 md:-mt-4">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="w-full p-3 bg-muted text-accent-foreground font-medium capitalize">
              General information
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`catId`} className="capitalize">
                    Parent category <span className="text-red-500">*</span>
                  </Label>
                  <select
                    name="catId"
                    id="catId"
                    className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
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
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`subcatId`} className="capitalize">
                    Sub-category <span className="text-red-500">*</span>
                  </Label>
                  <select
                    name="subcatId"
                    id="subcatId"
                    className="flex h-10 w-full items-center justify-between rounded-md border-[1px] bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
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
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`title`}>
                    Enter a fitting title{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="We need something to show on the website"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col mt-4 space-y-1.5">
                  <Label htmlFor={`price`} className="capitalize">
                    Product price <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="price"
                    name="price"
                    placeholder="We need something to show on the website"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`description`}>
                    A brief description would help the buyer{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    name="description"
                    id="description"
                    placeholder="A teeny-tiny description won't hurt the buyer"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <Separator />

            <div className="col-span-2 p-3 bg-muted text-accent-foreground font-medium capitalize mt-3">
              Location
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`pinCode`} className="capitalize">
                    Enter PIN code <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex gap-3 items-center">
                    <Input
                      type="text"
                      id="pinCode"
                      name="pinCode"
                      placeholder="Enter your PIN code"
                      value={form.pinCode}
                      onChange={handleChange}
                    />
                    <Button
                      type="button"
                      className="w-20 py-2 bg-blue-500 hover:bg-blue-400 rounded-md"
                      onClick={getPincodeInfo}
                    >
                      Get
                    </Button>
                  </div>
                </div>
              </div>
              <div className="sm:hidden md:block col-span-1"></div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`city`}>City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`state`}>State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor={`address`}>Address</Label>
                  <Textarea
                    name="address"
                    id="address"
                    placeholder="Totally optional!"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {selectedSubCategory && dynamicFields?.length > 0 && (
              <>
                <Separator />

                <div className="col-span-2 p-3 bg-muted text-accent-foreground font-medium capitalize mt-3">
                  Other information
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  {dynamicFields.map((field) => {
                    return (
                      <div key={field.id} className="col-span-1">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor={`title`} className="capitalize">
                            {field.field_label}{" "}
                            {field?.is_required && (
                              <span className="text-red-500">*</span>
                            )}
                          </Label>
                          {(field.field_type === "text" ||
                            field.field_type === "number") && (
                            <Input
                              type={field.field_type}
                              id="title"
                              name="title"
                              placeholder={`Enter ${field.field_label}`}
                              value={form.title}
                              onChange={handleChange}
                            />
                          )}

                          {field.field_type === "radio" && (
                            <>
                              <RadioGroup className="flex flex-row gap-3">
                                {field.options?.map((option) => {
                                  return (
                                    <div
                                      key={option.option_id}
                                      className="mt-3"
                                    >
                                      <div className="flex items-center">
                                        <RadioGroupItem
                                          name={option.field_name}
                                          value={option.option_id}
                                          id={option.option_id}
                                        />
                                        <Label
                                          htmlFor={option.option_id}
                                          className="px-2"
                                        >
                                          {option.option_value}
                                        </Label>
                                      </div>
                                    </div>
                                  );
                                })}
                              </RadioGroup>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            <Separator />
            <AdminPostImage />
            <Separator />
            <div className="flex gap-4 justify-center mt-3">
              <Button variant="ghost">
                <Link to={`/admin/posts`}>Back</Link>
              </Button>
              <SubmitBtn label={`add post`} isSubmitting={isLoading} />
            </div>
          </form>
        </div>
      </AdminPageLayout>
    </>
  );
};
export default AdminNewPost;
