import React, { ChangeEventHandler, FC } from "react";
import { Radio, RadioChangeEvent, Space } from "antd";
import {
  BookOutlined,
  ReadOutlined,
  CheckOutlined,
  ReloadOutlined,
  StopOutlined,
} from "@ant-design/icons";

interface ReadingStatusRadioButtonProps {
  readingStatus: string;
  setReadingStatus: (val: string) => void;
}

const READING_STATUS: Record<string, { label: string; icon: JSX.Element }> = {
  WANT_TO_READ: { label: "Want To Read", icon: <BookOutlined /> },
  READING: { label: "Reading", icon: <ReadOutlined /> },
  READ: { label: "Read", icon: <CheckOutlined /> },
  RE_READING: { label: "Re Reading", icon: <ReloadOutlined /> },
  DID_NOT_FINISH: { label: "DNF", icon: <StopOutlined /> },
};

const ReadingStatusRadioBtn: FC<ReadingStatusRadioButtonProps> = ({
  readingStatus,
  setReadingStatus,
}) => {
  const handleChange: (e: RadioChangeEvent) => void = (event) => {
    setReadingStatus(event.target.value);
  };

  return (
    <Radio.Group
      onChange={handleChange}
      value={readingStatus}
      style={{ width: "100%" }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        {Object.entries(READING_STATUS).map(([key, { label, icon }]) => (
          <Radio
            key={key}
            value={key}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 12px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              marginBottom: "8px",
              transition: "all 0.3s",
            }}
          >
            <Space>
              {icon}
              {label}
            </Space>
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};

export default ReadingStatusRadioBtn;
