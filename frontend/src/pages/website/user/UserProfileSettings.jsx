import { UserContentWrapper } from "@/components";
import { Label } from "@/components/ui/label";
import UserPageHeader from "@/components/users/globals/UserPageHeader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import galleryImg from "@/assets/users/gallery-icon.png";

const UserProfileSettings = () => {
  document.title = `Profile Settings | ${import.meta.env.VITE_APP_TITLE}`;

  return (
    <UserContentWrapper>
      <UserPageHeader text={`your profile`} />
      <div className="w-full rounded-xl flex flex-col space-y-8 bg-white mb-4">
        <div className="bg-purple-900 text-white rounded-xl rounded-b-none p-3 text-lg tracking-widest capitalize">
          profile info
        </div>
        <div className="flex flex-col space-y-6 mt-0 p-4">
          <div className="flex flex-row gap-4">
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="firstName"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  first name
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="firstName"
                id="firstName"
                placeholder="John"
              />
            </div>
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="lastName"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  last name
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="lastName"
                id="lastName"
                placeholder="Cena"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/3 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="lastName"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  gender
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <RadioGroup className="flex flex-row" defaultValue="comfortable">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label
                    htmlFor="male"
                    className="text-[16px] font-normal tracking-wide text-purple-800 capitalize"
                  >
                    male
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label
                    htmlFor="female"
                    className="text-[16px] font-normal tracking-wide text-purple-800 capitalize"
                  >
                    female
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <div className="basis-1/3 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="email"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  email address
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="email"
                id="email"
                placeholder="johncena@test.com"
              />
            </div>
            <div className="basis-1/3 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="mobile"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  mobile
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="number"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="mobile"
                id="mobile"
                placeholder="98XXXXXXXX"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-2/3 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="address"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  address
                </Label>
              </div>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="address"
                id="address"
                placeholder="Your address goes here or may be not"
              />
            </div>
            <div className="basis-1/3 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="pincode"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  PIN code
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="number"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="pincode"
                id="pincode"
                placeholder="XXXXXX"
              />
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="location"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  location
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="location"
                id="location"
                placeholder="Your location (auto-fill)"
                disabled
              />
            </div>
            <div className="basis-1/2 flex flex-col">
              <div className="flex flex-row justify-start items-center gap-1 mb-1">
                <Label
                  htmlFor="country"
                  className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
                >
                  country
                </Label>
                <span className="text-lg text-red-600">*</span>
              </div>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border-[1px] bg-background px-3 py-2 text-sm focus:outline-none"
                name="country"
                id="country"
                placeholder="India (auto-fill)"
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center gap-1 mb-1">
              <Label
                htmlFor="location"
                className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
              >
                tell us something about yourself
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
        </div>
      </div>
      <div className="w-full rounded-xl flex flex-col space-y-8 bg-white">
        <div className="bg-purple-900 text-white rounded-xl rounded-b-none p-3 text-lg tracking-widest">
          Drop your pic & make your profile pop!
        </div>
        <div className="flex flex-col space-y-6 mt-0 p-4">
          <div className="flex flex-col">
            <div className="flex flex-row justify-start items-center gap-1 mb-1">
              <Label
                htmlFor="location"
                className="text-[16px] font-medium tracking-wide text-purple-800 capitalize"
              >
                profile picture
              </Label>
            </div>
            <label
              htmlFor="profile-img"
              className="border text-center gig-file-upload flex flex-col justify-center items-center"
            >
              <img src={galleryImg} alt="Upload" className="object-cover" />
              <p className="text-dark-200">Max.Size 500KB</p>
              <input
                className="d-none"
                type="file"
                name="profile_img"
                id="profile-img"
              />
            </label>
          </div>
        </div>
      </div>
    </UserContentWrapper>
  );
};
export default UserProfileSettings;
