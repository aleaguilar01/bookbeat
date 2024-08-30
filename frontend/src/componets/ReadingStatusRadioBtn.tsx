import { ChangeEventHandler, FC } from "react";
import "./ReadingStatusRadioBtn.styles.css";

interface ReadingStatusRadioButtonProps {
  readingStatus: string;
  setReadingStatus: (val: string) => void;
  width?: string;
}

const READING_STATUS: Record<string, string> = {
  WANT_TO_READ: "Want To Read",
  READING: "Reading",
  READ: "Read",
  RE_READING: "Re Reading",
  DID_NOT_FINISH: "DNF",
};

const ReadingStatusRadioBtn: FC<ReadingStatusRadioButtonProps> = ({
  readingStatus,
  setReadingStatus,
  width = "100%",
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setReadingStatus(event.currentTarget.value);
  };
  return (
    <div>
      {Object.keys(READING_STATUS).map((key) => {
        return (
          <div className="inputGroup" key={key}>
            <input
              name="radio"
              type="radio"
              id={key}
              value={key}
              checked={readingStatus === key}
              onChange={handleChange}
            />
            <label htmlFor={key} style={{ width }}>
              {READING_STATUS[key]}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ReadingStatusRadioBtn;
