import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Left,
  Body,
  Right,
  Title,
  List,
  ListItem,
  Text,
  InputGroup,
  Icon
} from 'native-base';
import { StyleSheet, Platform, Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import * as SearchActions from '../redux/actions';
import { bindActionCreators } from 'redux';
import { getSearch } from '../redux/selectors';

import InfiniteListView from '../components/InfiniteListView/InfiniteListView';

const mapStateToProps = state => ({
  search: getSearch(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(SearchActions, dispatch)
});

const screenWidth = Dimensions.get('window').width;

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    searchText: null,
    page: 1
  };

  loadMore = page => {
    this.setState({
      page: page + 1
    });
    const { searchText } = this.state;
    const { search } = this.props.actions;
    search(searchText, page + 1);
  };

  renderItem = item => {
    return (
      <ListItem onPress={() => this.gotoUserScreen(item)} key={item.id} style={{ width:  screenWidth }}>
        <Text>{item.name}</Text>
      </ListItem>
    );
  };

  renderItemKey = item => {
    return item.id;
  };

  onSearch = text => {
    this.setState({
      searchText: text
    });
    this.loadMore(0);
  };

  gotoUserScreen = user => {
    const { setSelectedUser } = this.props.actions;
    setSelectedUser(user);
    this.props.navigation.navigate('User');
  };

  render() {
    const { searchText, page } = this.state;
    const { search } = this.props;
    const { users, loading } = search;

    return (
      <Container>
        <Header
          style={{
            paddingTop:
              Platform.OS === 'android' ? Constants.statusBarHeight : 1,
            height: Constants.statusBarHeight + 49
          }}
        >
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Header style={styles.searchContainer}>
          <Form>
            <Item>
              <InputGroup>
                <Icon name="md-search" />
                <Input
                  placeholder="Search"
                  onChangeText={this.onSearch}
                  value={searchText}
                />
                <Icon name="md-people" />
              </InputGroup>
            </Item>
          </Form>
        </Header>
        <View style={{ flex: 1 }}>
          {users && users.length || loading ? (
            <InfiniteListView
              renderItem={this.renderItem}
              renderItemKey={this.renderItemKey}
              loadMore={pageNumber => this.loadMore(pageNumber)}
              data={users ? users : []}
              loading={loading ? loading : false}
              loadingMore={loading ? loading && page !== 0 : false}
              refreshing={loading ? loading && page === 0 : false}
            />
          ) : (
            <ListItem>
              <Text>No Users</Text>
            </ListItem>
          )}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: -40,
    height: 40
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
