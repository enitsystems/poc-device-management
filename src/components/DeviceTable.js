import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import 'antd/dist/antd.css';

export default class DeviceTable extends Component {
  columns = [{
    title: 'Anlagen',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags, record) => (
      <div>
        <div>
            {record.name} 
        </div>
        <div>
            {tags.map(tag => {
            const value = tag.value;
            return <Tag color={tag.color} key={value} onClick={this.props.onTagClick} >{value}</Tag>;
            })}
        </div>
      </div>
    ),
  }, {
    title: 'Zuletzt editiert',
    dataIndex: 'lastedited',
    key: 'last',
    render: lastedited => (
      <span>
        {lastedited}
      </span>
    ),
  }];
  
  render() {
    return(
      <Table style={{ whiteSpace: 'pre'}} columns={this.columns} dataSource={this.props.data} pagination={false} />
    );
  }

}
