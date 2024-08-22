import React from 'react';
import { WechatOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';


const ChatButton: React.FC = () => (
  <>
 
  <FloatButton
    icon={<WechatOutlined />}
    shape="circle"
    style={{ insetInlineEnd: 94 }}
  />
</>
);

export default ChatButton;