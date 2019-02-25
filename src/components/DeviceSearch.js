import React from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';

const Option = Select.Option;

const renderOptions = (data) => {
  return data
    .flatMap(device => device.tags)
    .map(tag => tag.value)
    .filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos;
    })
    .sort()
    .map(tagValue => <Option key={tagValue}>{tagValue}</Option>);
}

const DeviceSearch = (props) => (
  <Select
    mode="tags"
    autoClearSearchValue="false"
    style={{ width: '100%' }}
    onSearch={props.onSearchInputChange}
    onSelect={props.onSelect}
    onDeselect={props.onDeselect}
    onBlur={props.onSearchInputCleared}
    tokenSeparators={[',']}
    value={props.filterCategories}
  >
    {renderOptions(props.data)}
  </Select>
);

export default DeviceSearch;