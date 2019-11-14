import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Thumbnail,
  Text
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import { getSelectedUser } from '../redux/selectors';

import ImageLoad from '../components/ImageLoad/ImageLoad';

const mapStateToProps = state => ({
  user: getSelectedUser(state)
});

class User extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    previewVisible: false,
    selectedPhoto: null
  };

  openPreview = photo => {
    this.setState({
      previewVisible: true,
      selectedPhoto: photo
    });
  };

  closePreview = photo => {
    this.setState({
      previewVisible: false
    });
  };

  render() {
    const { user } = this.props;
    const { name, username, profile_image, photos } = user;
    const { selectedPhoto, previewVisible } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button
              iconLeft
              light
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{name}</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Grid>
            <Row>
              <Col size={3}>
                <Thumbnail square large source={{ uri: profile_image.large }} />
              </Col>
              <Col size={7} style={styles.userNameCol}>
                <Text>{username}</Text>
              </Col>
            </Row>
            <Row style={styles.thumbnailContainer}>
              {photos && photos.length ? (
                photos.map(photo => (
                  <TouchableOpacity
                    onPress={() => this.openPreview(photo)}
                    key={photo.id}
                  >
                    <Thumbnail
                      square
                      large
                      source={{ uri: photo.urls.thumb }}
                      style={styles.thumbnail}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <Col>
                  <Text>No Photos</Text>
                </Col>
              )}
            </Row>
          </Grid>
        </Content>
        <Modal
          animationType="slide"
          transparent={false}
          visible={previewVisible}
        >
          <TouchableOpacity
            onPress={() => this.closePreview()}
            style={styles.previewContainer}
          >
            {selectedPhoto && (
              <ImageLoad
                style={styles.previewImage}
                imageStyle={styles.previewImage}
                source={{ uri: selectedPhoto.urls.full }}
                placeholderStyle={styles.placeholderImage}
              />
            )}
          </TouchableOpacity>
        </Modal>
      </Container>
    );
  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  userNameCol: {
    justifyContent: 'center'
  },
  thumbnailContainer: {
    paddingTop: 30,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  thumbnail: {
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  },
  previewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight
  },
  previewImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'contain',
    backgroundColor: 'black'
  },
  placeholderImage: {
    width: screenWidth,
    height: screenHeight / 2,
    resizeMode: 'contain'
  }
});

export default connect(mapStateToProps)(User);
