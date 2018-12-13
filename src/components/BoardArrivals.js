import React, { Component } from 'react'
import {
  Table, Input, Button, Icon,
} from 'antd'
import data from '../api/trips1.json'

class Board extends Component {
  state = {
    searchText: '',
  };

  handleSearch = (selectedKeys, confirm) => () => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = clearFilters => () => {
    clearFilters();
    this.setState({ searchText: '' });
  }
    render() {
      const columns = [{
        title: 'Номер',
        dataIndex: 'number',
        key: 'number',
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => this.searchInput = ele}
              placeholder="Номер рейса"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={this.handleSearch(selectedKeys, confirm)}
            />
            <Button type="primary" onClick={this.handleSearch(selectedKeys, confirm)}>Поиск</Button>
            <Button onClick={this.handleReset(clearFilters)}>Сброс</Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />,
        onFilter: (value, record) => record.number.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            });
          }
        },
        render: (text) => {
          const { searchText } = this.state;
          return searchText ? (
            <span>
              {text.split(new RegExp(`(${searchText})`, 'gi')).map((fragment, i) => (
                fragment.toLowerCase() === searchText.toLowerCase()
                  ? <span key={i} className="highlight">{fragment}</span> : fragment 
              ))}
            </span>
          ) : text;
        },
      }, {
        title: 'Рейс',
        dataIndex: 'flight',
        key: 'flight',
      }, {
        title: 'Время прибытия',
        dataIndex: 'timeOfArrivals',
        key: 'timeOfArrivals',
      }, {
        title: 'Терминал',
        dataIndex: 'terminal',
        key: 'terminal',
      }, {
        title: 'Авиакомпания',
        dataIndex: 'airline',
        key: 'airline',
      }, {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        filters: [{
          text: 'Рейс задержан',
          value: 'Рейс задержан',
        }],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
      }]
      return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
      );
    }
  }
  
export default Board;