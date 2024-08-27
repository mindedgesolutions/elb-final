import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import iconkolkata from "@/assets/website/img/features/kolkata.png";
import iconkolkata2 from "@/assets/website/img/features/kolkata2.png";
import icondelhi from "@/assets/website/img/features/icon-delhi.png";
import icondelhi2 from "@/assets/website/img/features/icon-delhi2.png";
import iconchennai from "@/assets/website/img/features/icon-chennai.png";
import iconchennai2 from "@/assets/website/img/features/icon-chennai2.png";
import iconmumbai from "@/assets/website/img/features/icon-mumbai.png";
import iconmumbai2 from "@/assets/website/img/features/icon-mumbai2.png";
import iconbangalore from "@/assets/website/img/features/icon-bangaluru.png";
import iconbangalore2 from "@/assets/website/img/features/icon-bangaluru2.png";
import {
  closeLocationModal,
  setSearchLocation,
} from "@/features/wbSearchSlice";

const locations = [
  { id: 275, city: "Kolkata", img: iconkolkata, activeImg: iconkolkata2 },
  { id: 142, city: "Delhi", img: icondelhi, activeImg: icondelhi2 },
  { id: 344, city: "Navi Mumbai", img: iconmumbai, activeImg: iconmumbai2 },
  { id: 120, city: "Chennai", img: iconchennai, activeImg: iconchennai2 },
  { id: 73, city: "Bengaluru", img: iconbangalore, activeImg: iconbangalore2 },
];

const WbFilterLocation = ({ locationLabel, setLocationLabel }) => {
  const dispatch = useDispatch();
  const { locationModal } = useSelector((store) => store.wbSearch);

  const handleClose = () => {
    dispatch(closeLocationModal());
  };

  const setSearch = (id) => {
    dispatch(setSearchLocation(id));
    dispatch(closeLocationModal());
  };

  return (
    <Modal show={locationModal} size="lg" centered onHide={handleClose}>
      <Modal.Body>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-3">
          {locations.map((location) => {
            return (
              <div
                key={nanoid()}
                className="flex flex-col justify-center items-center border border-gray-300 rounded-lg p-3 cursor-pointer"
                onClick={() => {
                  setSearch(location.id);
                  setLocationLabel(location.city);
                }}
              >
                <img
                  src={
                    locationLabel === location.city
                      ? location.activeImg
                      : location.img
                  }
                  className="h-20 w-20"
                  alt={location.id}
                />
                <p className="text-center fs-6 text-muted cat-text">
                  {location.city}
                </p>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default WbFilterLocation;
