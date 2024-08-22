import { Modal, Button, Image, Flex, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

const BookModal = (props) => {
  const handleOk = () => {
    console.log("Adding book");
    props.setValue(undefined);
  };

  const handleCancel = () => {
    props.setValue(undefined);
  };
  if (!props.value) return null;
  console.log(props.value);
  return (
    <>
      <Modal
        title={props.value?.title}
        open={props.value}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flex gap={24}>
          <Image src={props.value.cover} width={600}></Image>
          <Flex vertical>
            <Text italic>{props.value.author}</Text>
            <Text>{props.value.published_year}</Text>
            <Text>{props.value.first_sentence}</Text>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
};

export default BookModal;
