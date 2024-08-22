import { Avatar, List } from 'antd';

const data = [
  {
    title: 'Reading',
    icon: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTM1LWJvb2stMDJhXzEucG5n.png",
  },
  {
    title: 'Read',
    icon: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTM1LWJvb2stMDJhXzEucG5n.png",
  },
  {
    title: 'To be read',
    icon: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTM1LWJvb2stMDJhXzEucG5n.png",
  },
  {
    title: 'Re read',
    icon: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTM1LWJvb2stMDJhXzEucG5n.png",
  },
  {
    title: 'Did not finish',
    icon: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTEwL3JtNTM1LWJvb2stMDJhXzEucG5n.png",
  },
];

const BookStatus: React.FC = () => (
  <List
  style={{width: "40vw"}}
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.icon} />}
          title={<a href="https://ant.design">{item.title}</a>}
        />
      </List.Item>
    )}
  />
);

export default BookStatus;