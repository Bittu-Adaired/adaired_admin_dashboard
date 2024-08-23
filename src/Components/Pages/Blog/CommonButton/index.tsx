import SVG from "@/CommonComponent/SVG";
import { Previous } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNavId } from "@/Redux/Reducers/AddPostSlice";
import { Button } from "reactstrap";

interface Props {
  submitForm: () => void;
}
const CommonButton: React.FC<Props> = ({ submitForm }) => {
  const { navId } = useAppSelector((state) => state.addPost);
  const dispatch = useAppDispatch();

  const handlePrevious = () => {
    if (navId > 1) {
      dispatch(setNavId(navId - 1));
    }
  };

  const handleNext = () => {
    if (navId <= 1) {
      dispatch(setNavId(navId + 1));
      
    }
  };

  return (
    <div className="product-buttons border-0">
      {navId > 1 && (
        <Button color="transparent" onClick={() => handlePrevious()}>
          <div className="d-flex align-items-center gap-sm-2 gap-1">
            <SVG iconId="back-arrow" />
            {Previous}
          </div>
        </Button>
      )}
      <Button
        color="transparent"
        className="ms-2"
        type={navId === 2 ? "submit" : "button"}
        onClick={navId === 2 ? submitForm : handleNext}
      >
        <div className="d-flex align-items-center gap-sm-2 gap-1">
          {navId === 2 ? "Submit" : "Next"}
          <SVG iconId="front-arrow" />
        </div>
      </Button>
    </div>
  );
};

export default CommonButton;
