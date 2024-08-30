import ReactStars from "react-rating-stars-component";
import { FC } from "react";

interface RatingProps {
  rating?: number,
  isEditable?: boolean
  handleRating?: (rating: number) => void
}
const Rating: FC<RatingProps> = ({rating, isEditable, handleRating}) => {

  return (
    <ReactStars
      count={5}
      value={rating}
      onChange={handleRating}
      size={24}
      isHalf={true}
      edit={isEditable}
      activeColor="#ffd700"
    />
  );
}

export default Rating; 