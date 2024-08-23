import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FC } from "react";
 
const ratingChanged = (newRating) => {
  console.log(newRating);
};

interface RatingProps {
  rating?: number,
  isEditable?: boolean
}
const Rating: FC<RatingProps> = ({rating, isEditable}) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      onChange={ratingChanged}
      size={24}
      isHalf={true}
      edit={isEditable}
      emptyIcon={<FontAwesomeIcon icon={faBookOpen} />}
      halfIcon={<FontAwesomeIcon icon={faBook} />}
      fullIcon={<FontAwesomeIcon icon={faBook} />}
      activeColor="#ffd700"
    />
  );
}

export default Rating; 