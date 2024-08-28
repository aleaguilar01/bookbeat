import { CSSProperties, FC } from "react";
import "./Loading.styles.css";

interface ILoading {
  style?: CSSProperties;
}
const Loading: FC<ILoading> = ({ style }) => {
  return (
    <div className="loader" style={style}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
      <div className="bar4"></div>
      <div className="bar5"></div>
      <div className="bar6"></div>
    </div>
  );
};

export default Loading;
