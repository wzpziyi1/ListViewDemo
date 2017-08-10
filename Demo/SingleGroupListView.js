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
  Platform
} from 'react-native';

var liveList = require('./Res/live.json');
var screenW = Dimensions.get('window').width;

export default class ListViewDemo extends Component {


  constructor(props) {
    super(props);

    let ds = new ListView.DataSource({
      rowHasChanged: (r1,r2)=>{r1 != r2},
    });

    this.state = {
      dataSource: ds.cloneWithRows(liveList),
    };

  }

  render() {

    return (

        <ListView dataSource={this.state.dataSource}
                  renderRow={this._renderRow.bind(this)}
                  style={{marginTop: Platform == 'ios' ? 20 : 0}}
        />
    )

  }

  //ListView Method
  _renderRow(rowData, sectionId, rowId, highlightRow) {
    return (
        <View>
          <View style={styles.topViewStyle}>
            <Image source={{uri:rowData.creator.portrait}} style={{width:35,height:35,marginLeft:10}}></Image>
            <View style={{marginLeft:10,justifyContent:'space-between',height:35}}>
              <Text style={styles.nameStyle}>{rowData.creator.nick}</Text>
              <Text style={styles.nameStyle}>{rowData.city}</Text>
            </View>
            <Text style={{position:'absolute',right:0,color:'red'}}>{rowData.online_users}
              <Text style={{color:'black'}}>人在看</Text>
            </Text>
          </View>
          <Image source={{uri:rowData.creator.portrait}} style={{height:300,width:screenW}}/>
        </View>
    )
  }


}

const styles = StyleSheet.create({
  topViewStyle:{
    height:50,
    width:screenW,
    flexDirection:'row',
    alignItems:'center'
  },
  nameStyle:{
    fontSize:13
  }
});

AppRegistry.registerComponent('ListViewDemo', () => ListViewDemo);
