import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  Text
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default class InfiniteListView extends Component {
  static propTypes = {
    loadMore: PropTypes.func,
    renderItem: PropTypes.func,
    renderItemKey: PropTypes.func,
    data: PropTypes.array,
    loading: PropTypes.bool,
    loadingMore: PropTypes.bool,
    refreshing: PropTypes.bool,
    page: PropTypes.number
  };

  state = {
    error: null
  };

  componentDidMount() {
    const { loadMore } = this.props;
    loadMore(0);
  }

  _handleRefresh = () => {
    const { loadMore } = this.props;

    loadMore(0);
  };

  _handleLoadMore = () => {
    // console.log('loading More...');
    
    // const { loadMore, page } = this.props;
    // loadMore(page);
  };

  _renderFooter = () => {
    if (!this.props.loadingMore) return null;

    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: colors.veryLightPink
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    const { data, renderItem, renderItemKey, loading, refreshing } = this.props;

    return !loading ? (
      <FlatList
        contentContainerStyle={{
          flexDirection: 'column',
          width: '100%'
        }}
        data={data}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => renderItemKey(item)}
        ListFooterComponent={this._renderFooter}
        onRefresh={this._handleRefresh}
        refreshing={refreshing}
        onEndReached={this._handleLoadMore}
        onEndReachedThreshold={0.5}
        horizontal={false}
      />
    ) : (
      <View>
        <Text style={{ alignSelf: 'center' }}>Loading...</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
