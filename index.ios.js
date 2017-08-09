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
  TouchableOpacity
} from 'react-native';

var screenW = Dimensions.get('window').width;

export default class ListViewDemo extends Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1,r2)=>{
        r1 != r2
      },
    });

    this.state = {
      ds: ds.cloneWithRows(['row1', 'row2']),
    }

  }

  render() {

    return (
        <ListView dataSource={this.state.ds}
                  renderRow={this._renderRow.bind(this)}
                  renderFooter={this._renderFooter.bind(this)}
                  renderHeader={this._renderHeader.bind(this)}
                  onScroll={this._onScroll.bind(this)}
        >

        </ListView>
    )
  }

  componentDidMount() {

  }

  //ListView相关方法
  _renderRow(rowData, sectionId, rowId, highlightRow) {
    return (
        <TouchableOpacity>
          <View style={{
            height:44,
            justifyContent:'center',
            backgroundColor:'green',
            borderBottomWidth:1,
            borderBottomColor:'#e8e8e8'
          }} onPress={()=>{

          }}>
            <Text>{rowData}</Text>
          </View>
        </TouchableOpacity>
    )
  }

  _renderHeader(){
    return ( <View style={{backgroundColor:'blue',height:300}}></View>)
  }

  _renderFooter(){
    return (<View style={{backgroundColor:'yellow',height:200}}></View>)
  }

  _onScroll(e) {
    console.log(e.nativeEvent.contentSize);
  }

}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);
