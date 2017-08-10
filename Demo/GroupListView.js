/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
  PixelRatio
} from 'react-native';

var cityList = require('./Res/city.json');
var screenW = Dimensions.get('window').width;

export default class ListViewDemo extends Component {


  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1,r2)=> {r1 != r2},
      sectionHeaderHasChanged: (s1, s2)=> {s1 != s2},
    });

    /*
 *   ListView自动支持的格式 :  [rowData1,rowData2]
 *   {
 *       sectionID1:[rowData1,rowData2],
 *       sectionID2:[rowData1,rowData2]
 *   }
 *
 * */

    let sectionData = this._resolveData(cityList);

    this.state = {
      dataSource: ds.cloneWithRowsAndSections(sectionData)
    }
  }

  render() {

    return (
        <ListView style={{marginTop: 20}}
                  renderRow={this._renderRow.bind(this)}
                  renderSectionHeader={this._renderSectionHeader.bind(this)}
                  dataSource={this.state.dataSource}
        >

        </ListView>
    )

  }

  //ListView Method
  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
        <View style={{
          height: 44,
          borderBottomWidth: 1 / PixelRatio.get(),
          borderBottomColor: '#e5e5e5',
          justifyContent: 'center'
        }}>
          <Text style={{fontSize: 18}}>{rowData}</Text>
        </View>
    )
  }


  _renderSectionHeader(sectionData, sectionID) {
    return (
        <View style={{backgroundColor:'#e8e8e8'}}>
          <Text style={{fontSize:20}}>{sectionID}</Text>
        </View>
    )
  }



  //逻辑处理
  /*
{
  'key1': [],
  'key2': [],
  'key3': []
}
*/
  _resolveData(listData) {

    let sectionData = {};

    listData.forEach((value,index)=>{
      let name = value.name;
      let type = value.type;
      let subList = value.sub;
      let cityArr = [];

      subList.forEach((city,i)=>{
        cityArr.push(city.name);
      })
      sectionData[name] = cityArr;
    });

    return sectionData;
  }

}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);
