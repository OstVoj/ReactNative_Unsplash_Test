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
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as SearchActions from '../redux/actions';
import { bindActionCreators } from 'redux';
import { getSearch } from '../redux/selectors';

const mapStateToProps = state => ({
  search: getSearch(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(SearchActions, dispatch)
});

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  onSearch = text => {
    const { search } = this.props.actions;
    search(text);
  };

  gotoUserScreen = user => {
    const { setSelectedUser } = this.props.actions;
    setSelectedUser(user);
    this.props.navigation.navigate('User');
  };

  render() {
    const { search } = this.props;
    const { users } = search;

    return (
      <Container>
        <Header>
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
                <Input placeholder="Search" onChangeText={this.onSearch} />
                <Icon name="md-people" />
              </InputGroup>
            </Item>
          </Form>
        </Header>
        <Content>
          <List>
            {users && users.length ? (
              users.map(user => (
                <ListItem
                  onPress={() => this.gotoUserScreen(user)}
                  key={user.id}
                >
                  <Text>{user.name}</Text>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Text>No Users</Text>
              </ListItem>
            )}
          </List>
        </Content>
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
