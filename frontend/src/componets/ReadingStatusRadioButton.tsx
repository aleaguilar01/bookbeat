import { ChangeEventHandler, FC, Fragment } from "react";
import "./ReadingStatusRadioButton.styles.css";

interface ReadingStatusRadioButtonProps {
  readingStatus: string;
  setReadingStatus: (val: string) => void;
}


const READING_STATUS: Record<string, string> = {
  WANT_TO_READ:  "Want To Read",
  READING: "Reading",
  READ: "Read",
  RE_READING: "Re Reading",
  DID_NOT_FINISH: "DNF",
};
const ReadingStatusRadioButton: FC<ReadingStatusRadioButtonProps> = ({
  readingStatus,
  setReadingStatus,
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setReadingStatus(event.currentTarget.value);
  };
  return (
    <div id="container-wrapper">
      <div id="container">
        <div id="reading-status-slider">
          {Object.keys(READING_STATUS).map((key) => {
            return (
              <Fragment key={key}>
                <input
                  type="radio"
                  name="reading-status"
                  id={key}
                  value={key}
                  checked={readingStatus === key}
                  onChange={handleChange}
                  required
                />
                <label htmlFor={key} data-reading-status={READING_STATUS[key]}></label>
              </Fragment>
            );
          })}
          <div id="reading-status-pos"></div>
        </div>
      </div>
    </div>
  );
};

export default ReadingStatusRadioButton;
