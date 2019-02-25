import React from 'react';
import { List, Tag } from 'antd';
import 'antd/dist/antd.css';

const data = [
  {
    title: 'Knetmaschine',
    categories: ['Kostenstelle', 'Manfred', 'Otto']
  },
  {
    title: 'Schnetmakine',
  },
  {
    title: 'Rührer',
  },
  {
    title: 'Rührei',
  },
];


const App = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={item.title}
          description={
            <div>
              <Tag color="#108ee9">lime</Tag>
              <Tag color="#87d068">green</Tag>
            </div>}
        />
      </List.Item>
    )}
  />
);

export default App;
