import { UserContentWrapper } from "@/components";
import { Label } from "@/components/ui/label";
import UserPageHeader from "@/components/users/globals/UserPageHeader";
import galleryImg from "@/assets/users/gallery-icon.png";

const UserPostAdd = () => {
  document.title = `Post an Ad | ${import.meta.env.VITE_APP_TITLE}`;

  return (
    <UserContentWrapper>
      <UserPageHeader text={`post an ad`} subText={``} />
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
            />
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="category"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  category
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <select
                name="category"
                id="category"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
              </select>
            </div>
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="subCategory"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  sub-category
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <select
                name="subCategory"
                id="subCategory"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select sub-category</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="state"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  state
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <select
                name="state"
                id="state"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select state</option>
              </select>
            </div>
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="city"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  city
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <select
                name="city"
                id="city"
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Select city</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center gap-1 mb-1">
              <Label
                htmlFor="location"
                className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
              >
                description
              </Label>
              <span className="text-lg text-red-600">*</span>
            </div>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border-1 border-input bg-background px-3 py-2 text-sm focus:outline-none"
              name="location"
              id="location"
              placeholder="Lets brag!"
            ></textarea>
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
              />
            </div>
            <div className="basis-1/2 flex flex-col">&nbsp;</div>
          </div>
        </div>
      </div>

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
                    // onChange={handleImageChange}
                  />
                </label>
              </div>
              {/* {loopImg()} */}
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
    </UserContentWrapper>
  );
};
export default UserPostAdd;
