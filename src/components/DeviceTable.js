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
            return <Tag color={tag.color} key={tag.key.concat(tag.value)} onClick={this.props.onTagClick} >{tag.key.concat(": ", tag.value)}</Tag>;
            })}
        </div>
      </div>
    ),
  }, {
    title: 'Zuletzt editiert',
    dataIndex: 'lastedited',
    key: 'last',
    sorter: 'true',
    render: lastedited => (
      <span>
        {lastedited}
      </span>
    ),
  }];
  
  render() {
    return(
      <Table 
        style={{ whiteSpace: 'pre'}} 
        columns={this.columns} 
        dataSource={this.props.data} 
        pagination={false}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log(record);
            },     
          };
        }}
        />
    );
  }

}
