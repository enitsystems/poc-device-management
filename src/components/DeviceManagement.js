import React, {Component} from 'react';
import DeviceTable from './DeviceTable';
import DeviceSearch from './DeviceSearch';

const data = [{
  key: '1',
  name: 'Röhrer',
  lastedited: '11.11.2019 11:11',
  tags: [{
      // 'key':'Ort',
      'value': 'Gebäude A',
      'color': 'red', 
    }, {
      // 'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
      } 
  ],
}, {
  key: '2',
  name: 'Rährer',
  lastedited: '11.11.2019 11:11',
  tags: [{
      // 'key':'Ort',
      'value': 'Gebäude B',
      'color': 'red', 
    }, {
      // 'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
      } 
  ],
}, {
  key: '3',
  name: 'Rührer',
  lastedited: '11.11.2019 11:11',
  tags: [{
      // 'key':'Ort',
      'value': 'Gebäude A',
      'color': 'red', 
    }, {
      // 'key':'Kostenstelle',
      'value': '42',
      'color': 'blue', 
      } 
  ],
}, {
  key: '4',
  name: 'Kneter',
  lastedited: '11.11.2019 11:11',
  tags: [{
      // 'key':'Ort',
      'value': 'Gebäude A',
      'color': 'red', 
    }, {
      // 'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
      } 
  ],
}, {
  key: '5',
  name: 'Stampfmaschine',
  lastedited: '11.11.2019 11:11',
  tags: [{
      // 'key':'Ort',
      'value': 'Gebäude B',
      'color': 'red', 
    }, {
      // 'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
      } 
  ],
}, {
  key: '6',
  name: 'Backofen',
  lastedited: '11.11.2019 11:11',
  tags: [{
      // 'key':'Ort',
      'value': 'Gebäude B',
      'color': 'red', 
    }, {
      // 'key':'Kostenstelle',
      'value': '42',
      'color': 'blue', 
      } 
  ],
}];



export default class DeviceManagement extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterText: '',
      filterCategories: [],
    };
  }

  handleSearchInputChange = (filterText) => {
    this.setState(state => ({
      filterText: filterText,
    }));
  }

  handleClearedSearchInput = () => {
    this.setState(state => ({
      filterText: '',
    }));
  }

  handleSelect = (filterCategory) => {
    if(filterCategory !== this.state.filterText){
      this.setState(state => ({
        filterCategories: this.state.filterCategories.concat(filterCategory),
      }))
    }
  }

  handleDeselect = (filterCategory) => {
    this.setState(state => ({
      filterCategories: this.state.filterCategories.filter(category => category !== filterCategory),
    }))
  }

  handleTagClick = (tag) => {
    const tagText = tag.target.textContent;
    if(this.state.filterCategories.indexOf(tagText) === -1){
      this.setState(state => ({
        filterCategories: this.state.filterCategories.concat(tagText),
      }));
    }
  }

  render() {
    const filteredDevices = data
      .filter(device => {
        return (this.state.filterText === '' ? true : device.name.includes(this.state.filterText)) 
          && (this.state.filterCategories.length === 0 ? true : this.state.filterCategories.every(category => device.tags.some(tag => tag.value === category)));
      });

    return (
      <div>
        <DeviceSearch 
          data={data} 
          filterText={this.state.filterText} 
          filterCategories={this.state.filterCategories} 
          onSearchInputChange={this.handleSearchInputChange} 
          onSearchInputCleared={this.handleClearedSearchInput}
          onSelect={this.handleSelect}
          onDeselect={this.handleDeselect}/>
        <DeviceTable data={filteredDevices} onTagClick={this.handleTagClick}/>
      </div>
    );
  }
}