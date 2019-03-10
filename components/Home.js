import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Footer, FooterTab, Button, Text } from 'native-base'
import Decks from './Decks'

class Home extends Component {
    static navigationOptions = {
        title: 'Decks',
    }

    onDeckNotFound = () => {
        this.props.navigation.navigate('NewDeck')
    }

    onDeckDetail = (id) => {
        this.props.navigation.navigate('DeckDetail', { id })
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    <Decks onDeckNotFound={this.onDeckNotFound} onDeckDetail={this.onDeckDetail} />
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full onPress={() => this.props.navigation.navigate('NewDeck')}>
                            <Text>New Deck</Text>
                        </Button>                      
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D4DBED'
    },

    content: {
        padding: 10
    }
});
