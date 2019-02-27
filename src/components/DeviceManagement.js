import React, {Component} from 'react';
import DeviceTable from './DeviceTable';
import DeviceSearch from './DeviceSearch';

const data = [{
  key: '1',
  name: 'Röhrer',
  lastedited: '11.11.2018 11:11',
  tags: [{
      'key':'Ort',
      'value': 'Gebäude A',
      'color': 'red', 
    }, {
      'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
      }, {
        'key':'Vorarbeiter',
        'value': 'Klaus',
        'color': 'green', 
      }, 
  ],
}, {
  key: '2',
  name: 'Rährer',
  lastedited: '11.11.2017 11:11',
  tags: [{
      'key':'Ort',
      'value': 'Gebäude B',
      'color': 'red', 
    }, {
      'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
    },
  ],
}, {
  key: '3',
  name: 'Rührer',
  lastedited: '11.11.2017 11:11',
  tags: [{
      'key':'Ort',
      'value': 'Gebäude A',
      'color': 'red', 
    }, {
      'key':'Kostenstelle',
      'value': '42',
      'color': 'blue', 
    } , {
      'key':'Vorarbeiter',
      'value': 'Manni',
      'color': 'green', 
    }, 
  ],
}, {
  key: '4',
  name: 'Kneter',
  lastedited: '11.11.2018 11:11',
  tags: [{
      'key':'Ort',
      'value': 'Gebäude A',
      'color': 'red', 
    },
  ],
},{
  key: '5',
  name: 'Stampfmaschine',
  lastedited: '11.11.2018 11:11',
  tags: [{
      'key':'Ort',
      'value': 'Gebäude B',
      'color': 'red', 
    }, {
      'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
      } 
  ],
}, {
  key: '6',
  name: 'Stampfmaschine',
  lastedited: '11.11.2016 11:11',
  tags: [{
      'key':'Ort',
      'value': 'Gebäude B',
      'color': 'red', 
    }, {
      'key':'Kostenstelle',
      'value': '1337',
      'color': 'blue', 
      } 
  ],
}, {
  key: '7',
  name: 'Backofen',
  lastedited: '11.11.2018 11:11',
  tags: [{
      'key':'Ort',
      'value': 'Gebäude B',
      'color': 'red', 
    }, {
      'key':'Kostenstelle',
      'value': '42',
      'color': 'blue', 
    } , {
      'key':'Vorarbeiter',
      'value': 'Manni',
      'color': 'green', 
    }, 
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
    } else {
      const textSearchCategory = 'Freitext: ' + filterCategory;
      this.setState(state => ({
        filterCategories: this.state.filterCategories.concat(textSearchCategory),
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
    const freeTextSearch = [];
    this.state.filterCategories.forEach(category => {
      if(category.includes('Freitext')){
        freeTextSearch.push(category.substr(10));
      }
    });

    const filteredDevices = data
      .filter(device => {
        return (
          (this.state.filterText !== '' ? device.name.includes(this.state.filterText) : freeTextSearch.length === 0 ||  
            freeTextSearch.some(searchText => device.name.includes(searchText)))          
          && (this.state.filterCategories.length === 0 ? true : this.state.filterCategories
            .filter(category => !category.includes('Freitext'))
            .every(
            category => device.tags.some(
              tag => {
                if(category.split(':').length > 1){
                  return (tag.key === category.split(':')[0] && tag.value === category.split(':')[1].substr(1));
                } else {
                  return tag.key === category;
                }
              }))));
      });

    return (
      <div >
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