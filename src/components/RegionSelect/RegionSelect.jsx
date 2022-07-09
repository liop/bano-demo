import React, { useState } from 'react';
import style from './RegionsSelect.module.css';
import ReactDOM from 'react-dom';
import { FixedSizeList as List } from 'react-window';
import countryNames from 'country-json/src/country-by-abbreviation.json';
// eslint-disable-next-line no-unused-vars
import countryIcons from 'flag-icons';

// 国家名称和图标数组
const countries = countryNames.map((item) => {
  return {
    name: item.country,
    icon: item.abbreviation.toLowerCase(),
    lowerCase: item.country.toLowerCase(), // 搜索比较使用
  };
});

// 单个国家或地区条目
const Row = ({ index, style: innerStyle, data, onSelect }) => (
  <div style={innerStyle} className={style.regionRow} onClick={() => onSelect(data[index].name)}>
    <span className={`${style.rowIcon} fi fi-${data[index].icon}`}></span>
    <div className={style.regionRowTitle}>{data[index].name}</div>
  </div>
);

// 搜索框，支持清除
function SearchBar(props) {
  let { value, onChange } = props;
  const handleChange = (e) => onChange(e.target.value);
  const handleClear = () => onChange('');
  let showClose = false;
  if (value && value.length > 0) {
    showClose = true;
  }

  return (
    <div className={style.searchBar}>
      <img src={require('./svg/searchIcon.svg').default} alt="close" />
      <input type="text" placeholder="Search a country" value={value} onChange={handleChange} />
      {showClose && (
        <img
          src={require('./svg/searchClose.svg').default}
          className={style.clearIcon}
          alt="clearSearch"
          onClick={handleClear}
        />
      )}
    </div>
  );
}

class RegionSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      listData: countries,
      visiableCount: 0,
    };
    
    this.listRef = React.createRef();
  }
  
  show = () => {
    this.setState({
      show: true,
      query:'',
      visiableCount: this.getVsisableCount()
    });
  };
  hiden = () => {
    this.setState({
      show: false,
    });
  };

   // 默认显示的国家数量， 列表高度等于屏幕高度减去其余部分高度，显示
  getVsisableCount = () =>  Math.floor((document.body.clientHeight - 20 - 80 - 80) / 56) + 1

  handleQueryChange = (query) => {
    let filtered = countries;
    if (query) {
      const name = query.toLowerCase();
      filtered = countries.filter((country) => country.lowerCase.indexOf(name) !== -1);
    }

    this.setState({
      query: query,
      listData: filtered,
    });
  };

  render() {
    const { onSelect } = this.props;
    const { show, query, listData, visiableCount } = this.state;
    if (!show) return null;

    const getItemKey = (index, data) => data[index].name;
    // 高阶组件，添加 onSelect 支持
    const RowRender = (props) => Row({ ...props, onSelect });
    const listHeight = 56 * visiableCount;

    let content = null;
    if (listData.length === 0) {
      content = <p className={style.nodata}>No result</p>;
    } else {
      content = (
        <List
          className={style.regionList}
          height={listHeight}
          itemKey={getItemKey}
          itemCount={listData.length}
          itemData={listData}
          itemSize={56}
          width={'100%'}>
          {RowRender}
        </List>
      );
    }

    return ReactDOM.createPortal(
      <div className={style.regionbackgroud}>
        <div className={style.regionBanel}>
          <div className={style.panelheader}>
            Choose a country or region
            <img src={require('./svg/modalClose.svg').default} onClick={this.hiden} alt="close" />
          </div>
          <div className={style.panelSearch}>
            <SearchBar value={query} onChange={this.handleQueryChange} />
          </div>
          <div ref={this.listRef} className={style.panelContent}>
            {content}
          </div>
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
}

export default RegionSelect;
