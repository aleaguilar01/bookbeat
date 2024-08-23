import Rating from "./Rating";
import { Modal, Button, Image, Flex, Typography } from "antd";
import ReadingStatusRadioButton from "./ReadingStatusRadioButton";

const noImage = new URL("../../no-image.png", import.meta.url).href;
const alternativeText = "NO DESCRIPTION AVAILABLE FOR THIS BOOK. SORRY!";
const { Text, Title } = Typography;

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
        open={props.value}
        onOk={handleOk}
        okText="Add"
        onCancel={handleCancel}
        styles={{
          header: {
            alignSelf: "center",
            justifySelf: "center",
            width: "100%",
            fontSize: "74px",
          },
          body: { height: 400 },
        }}
      >
        <Title level={3}>{props.value.title}</Title>
        <Flex gap={24}>
          <Image
            src={props.value.cover || noImage}
            style={{
              maxWidth: "600px",
              maxHeight: "400px",
              objectFit: "cover",
            }}
            preview={false}
          />
          <Flex vertical style={{width: 300}}>
            <Text italic>{props.value.author}</Text>
            <Rating rating={props.value.ratings || 0} isEditable={false} />
            <Text>First published: {props.value.published_year}</Text>
            <Text>{props.value.number_of_pages} pages</Text>
            <Text>{props.value.first_sentence || alternativeText}</Text>
          </Flex>
        </Flex>
        <ReadingStatusRadioButton />
      </Modal>
    </>
  );
};

export default BookModal;
