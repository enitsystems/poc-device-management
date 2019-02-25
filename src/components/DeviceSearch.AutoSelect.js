import React from 'react';
import { Icon, Input, AutoComplete, Tag } from 'antd';
import 'antd/dist/antd.css';


const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const dataSource = [{
  title: 'Kostenstellen',
  children: [{
    title: 'KS10001',
    count: 10000,
  }, {
    title: 'Rührer',
    count: 10600,
  }],
}, 
];


const renderTitle = (title)  => (
    <span>
      {title}
      <a
        style={{ float: 'right' }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
      blubb
      </a>
    </span>
  );

  // Filter this   
  const options = dataSource.map(group => (
    <OptGroup
      key={group.title}
      label={renderTitle(group.title)}
    >
      {group.children.map(opt => (
        <Option key={opt.title} value={opt.title}>
          {opt.title}
          <span className="certain-search-item-count">{opt.count}</span>
        </Option>
      ))}
    </OptGroup>
  )).concat([
    <Option disabled key="all" className="show-all">
      <a
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        Blubb
      </a>
    </Option>,
  ]);

const DeviceSearch = (props) => (
  <div className="certain-category-search-wrapper" style={{ width: 250 }}>
      <AutoComplete
        className="certain-category-search"
        dropdownClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        size="large"
        style={{ width: '100%' }}
        dataSource={options}
        defaultValue={props.filterText}
        placeholder="Filtern"
        optionLabelProp="value"
        onChange={props.onSearchInputChange}
        value={props.filterText}
      >
        <Input suffix={<Icon type="search" className="certain-category-icon" />}></Input>
      </AutoComplete>
    </div>
);

export default DeviceSearch;