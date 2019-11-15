import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
  Text
} from 'react-native';

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

  _handleLoadMore = ({ nativeEvent }) => {
    let previousOffsetY = 0;
    if (this.nativeEvent) {
      previousOffsetY = this.nativeEvent.contentOffset.y;
    }
    const offsetY = nativeEvent.contentOffset.y;

    if (
      offsetY - previousOffsetY > 20 &&
      offsetY >=
        nativeEvent.contentSize.height +
          nativeEvent.contentInset.bottom -
          nativeEvent.layoutMeasurement.height
    ) {
      const { loadMore, page, loadingMore } = this.props;

      if (!loadingMore) {
        loadMore(page);
      }
    }

    this.nativeEvent = nativeEvent;
  };

  _renderFooter = () => {
    return !this.props.loadingMore && <ActivityIndicator />;
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
        horizontal={false}
        onScroll={this._handleLoadMore}
      />
    ) : (
      <View>
        <Text style={{ alignSelf: 'center' }}>Loading...</Text>
        <ActivityIndicator />
      </View>
    );
  }
}
