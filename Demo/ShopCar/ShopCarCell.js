
import React, {Component, PropTypes} from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  PixelRatio,
  Image,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';

var pixel = PixelRatio.get();
let screenW = Dimensions.get('window').width;

export default class ShopCarCell extends Component {

  static propTypes = {
    entity: PropTypes.object
  };


  constructor(props) {
    super(props);

    this.state = {
      disabled: this.props.entity.count == 0 ? true : false,
      count: this.props.entity.count
    }
  }

  render() {

    return (
        <View style={styles.contentStyle}>
          <Image style={styles.imgStyle}
                 source={{uri: this.props.entity.image}}
          />

          <View style={{marginLeft: 10, justifyContent: 'space-around', height: 100}}>
            <Text style={{fontSize: 18}}>{this.props.entity.name}</Text>
            <Text style={{fontSize: 15, color: 'red', textAlign: 'left'}}>¥{this.props.entity.money}</Text>
          </View>

          <View style={{position: 'absolute', right: 10, flexDirection: 'row'}}>
            <TouchableOpacity onPress={this._removeGood.bind(this)}
                              disabled={this.state.disabled}
            >
              <Text style={styles.textStyle}>－</Text>
            </TouchableOpacity>

            <Text style={styles.textStyle}>{this.props.entity.count}</Text>

            <TouchableOpacity onPress={this._addGood.bind(this)}
            >
              <Text style={styles.textStyle}>＋</Text>
            </TouchableOpacity>
          </View>

        </View>
    )
  }

  //逻辑处理
  _removeGood() {
    let count = this.props.entity.count;
    count -= 1;

    let disabled = false;
    if (count <= 0) {
      count = 0;
      disabled = true;
    }

    this.props.entity.count = count;

    this.setState({
      count: count,
      disabled: disabled
    });

    DeviceEventEmitter.emit('_removeGood', this.props.entity);
  }

  _addGood() {
    let count = this.props.entity.count;
    count += 1;
    let disabled = false;
    this.props.entity.count = count;
    this.setState({
      count: count,
      disabled: disabled
    });
    DeviceEventEmitter.emit('_addGood', this.props.entity);
  }

}

var styles = StyleSheet.create({
  contentStyle: {
    backgroundColor: 'white',
    width: screenW,
    height: 140,
    flexDirection: 'row',
    borderBottomWidth: 1/pixel,
    borderBottomColor: 'rgb(220,220,220)',
    alignItems: 'center',
  },

  imgStyle: {
    width: 100,
    height: 100,
    marginLeft: 20,
    borderRadius: 5
  },

  textStyle: {
    borderWidth:1/pixel,
    borderColor: 'rgb(200,200,200)',
    width: 30,
    height: 30,
    textAlign: 'center',
    lineHeight: 30,
  }

});