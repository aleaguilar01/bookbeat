import { CSSProperties, FC, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Space, Image } from "antd";
import { IBook } from "../context/books-context";

interface BookRecommendationCarouselProps {
  items: Array<IBook>;
  size?: "normal" | "small" | "large";
  height?: number;
  width?: number;
}

const BookRecommendationCarousel: FC<BookRecommendationCarouselProps> = ({
  items,
  size = "small",
  height = 100,
  width = 300,
}) => {
  const [animationState, setAnimationState] = useState({
    active: 0,
  });
  const nodeRef = useRef(null);

  const handleLeftClick = () => {
    setAnimationState((prev) => ({
      active: prev.active - 1 < 0 ? items.length - 1 : prev.active - 1,
    }));
  };

  const handleRightClick = () => {
    setAnimationState((prev) => ({
      active: (prev.active + 1) % items.length,
    }));
  };

  const itemsToDisplay = useMemo(() => {
    let temp = [];
    let level;
    console.log(animationState.active);
    for (
      let i = animationState.active - (size === "small" ? 1 : 2);
      i < animationState.active + (size === "small" ? 2 : 3);
      i++
    ) {
      let index = i;
      if (i < 0) {
        index = items.length + i;
      } else if (i >= items.length) {
        index = i % items.length;
      }
      let position = undefined;

      level = animationState.active - i;
      if (level !== 0) {
        position = level > 0 ? "left" : "right";
      }

      const currentBook = items[index];
      temp.push(
        <div
          key={index}
          style={{
            ...baseStyles.item,
            ...styles[size].level[Math.abs(level)],
            ...(position ? { ...styles[size][position][Math.abs(level)] } : {}),
          }}
        >
          <Image
            src={currentBook.imageUrl}
            height={`${height * (1 - 0.1 * Math.abs(level))}px`}
            width={`${width * (1 - 0.1 * Math.abs(level))}px`}
          />
        </div>
      );
    }
    return temp;
  }, [animationState, items]);

  return (
    <Space style={{ ...baseStyles.container, ...styles[size].container }}>
      <div
        onClick={handleLeftClick}
        style={{ ...baseStyles.arrow, ...styles[size].arrow }}
      >
        <LeftOutlined />
      </div>
      <CSSTransition nodeRef={nodeRef} timeout={200}>
        <div ref={nodeRef}>{itemsToDisplay}</div>
      </CSSTransition>
      <div
        onClick={handleRightClick}
        style={{
          ...baseStyles.arrow,
          ...baseStyles.rightArrow,
          ...styles[size].arrow,
          ...styles[size].rightArrow,
        }}
      >
        <RightOutlined />
      </div>
    </Space>
  );
};

export default BookRecommendationCarousel;

const styles = {
  large: {
    container: {
      width: "810px",
      height: "200px",
    },
    arrow: {
      fontSize: "25px",
      width: "30px",
      height: "30px",
      lineHeight: "30px",
      marginTop: "85px",
    },
    rightArrow: {
      left: "780px",
    },
    level: {
      0: {
        height: "200px",
        width: "150px",
        lineHeight: "200px",
        backgroundColor: "#4ec9e1",
        left: "330px",
      },
      2: {
        height: "150px",
        width: "110px",
        lineHeight: "150px",
        backgroundColor: "#228291",
        marginTop: "25px",
      },
      1: {
        height: "180px",
        width: "130px",
        lineHeight: "180px",
        backgroundColor: "#6796e5",
        marginTop: "10px",
      },
    },
    right: {
      2: { left: "50px" },
      1: { left: "180px" },
    },
    left: {
      2: { left: "650px" },
      1: { left: "500px" },
    },
  },
  small: {
    container: {
      width: "400px",
      height: "100px",
    },
    arrow: {
      fontSize: "12px",
      width: "15px",
      height: "15px",
      lineHeight: "15px",
      marginTop: "42px",
    },
    rightArrow: {
      left: "390px",
    },
    level: {
      0: {
        height: "100px",
        lineHeight: "100px",
        backgroundColor: "#4ec9e1",
        left: "110px",
      },
      1: {
        height: "90px",
        lineHeight: "90px",
        backgroundColor: "#6796e5",
        marginTop: "5px",
      },
    },
    right: {
      1: { left: "25px" },
    },
    left: {
      1: { left: "250px" },
    },
  },
};

const baseStyles: Record<string, CSSProperties> = {
  container: {
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  arrow: {
    position: "absolute",
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: "50%",
    cursor: "pointer",
    color: "#228291",
    zIndex: 1000,
  },
  item: {
    textAlign: "center",
    color: "white",
    fontSize: "40px",
    position: "absolute",
    transition:
      "height 1s, width 1s, left 1s, margin-top 1s, line-height 1s, background-color 1s",
  },
};
