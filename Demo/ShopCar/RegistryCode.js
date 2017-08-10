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
  PixelRatio,
  DeviceEventEmitter
} from 'react-native';

import ShopCarCell from './Demo/ShopCar/ShopCarCell'

var carList = require('./Res/food.json');

let screenW = Dimensions.get('window').width;

export default class ListViewDemo extends Component {

  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1,r2)=>{r1 != r2},
      sectionHeaderHasChanged: (s1,s2)=>{s1 != s2}
    });

    carList.forEach((entity, i)=>{
      entity.count = 0;
    });

    this.state = {
      dataSource: ds.cloneWithRows(carList),
      totalPrice: 0,
    }

  }

  render() {
    return (
        <View>
          <ListView style={{marginTop: 20}}
                    renderRow={this._renderRow.bind(this)}
                    dataSource={this.state.dataSource}
                    contentInset={{top: 0, left: 0, bottom: 40, right: 0}}
          >
          </ListView>

          {/*底部view*/}
          <View style={styles.bottomStyle}>
            <Text style={{fontSize:15, marginLeft: 10}}>
              合计:
              <Text style={{color:'red'}}>{' '+ '¥' + this.state.totalPrice}</Text>
            </Text>
            <TouchableOpacity style={styles.bottomRightStyle}>
              <Text style={{fontSize:18, color:'white'}}>去结算</Text>
            </TouchableOpacity>
          </View>
        </View>

    )
  }

  componentDidMount() {

    DeviceEventEmitter.addListener('_removeGood', this._removeGood.bind(this));
    DeviceEventEmitter.addListener('_addGood', this._addGood.bind(this));
  }

  componentWillUnmount() {
    this.subscription.remove();
  }




  //渲染界面
  _renderRow(rowData, sectionId, rowId, highlightRow) {
    return (
        <ShopCarCell entity={rowData}/>
    )
  }

  //逻辑处理
  _removeGood(entity) {

    let totalPrice = this.state.totalPrice - parseInt(entity.money);

    this.setState({
      totalPrice: totalPrice
    })
  }

  _addGood(entity) {
    let totalPrice = this.state.totalPrice + parseInt(entity.money);
    this.setState({
      totalPrice: totalPrice
    })
  }

}

const styles = StyleSheet.create({
  bottomStyle:{
    position:'absolute',
    bottom:0,
    height:35,
    width:screenW,
    backgroundColor:'rgba(255,255,255,0.9)',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  bottomRightStyle:{
    backgroundColor:'red',
    width:80,
    height:40,
    justifyContent:'center',
    alignItems:'center'
  }
});

AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);
