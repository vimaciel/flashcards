import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Footer, FooterTab, Button, Text, Form, Item, Input } from "native-base"
import { connect } from 'react-redux'
import { handleSaveDeck } from '../actions/decks'
import { isObjectEmpty } from '../helpers/common'
import { StackActions, NavigationActions } from 'react-navigation'

class NewDeck extends Component {
    static navigationOptions = {
        title: 'New Deck',
    }

    state = {
        title: '',
        saved: false
    }

    onTitleChange = (e) => {
        const title = e.nativeEvent.text
        this.setState({
            title
        })
    }

    onSaveDeck = () => {
        this.setState({
            saved: true
        })
        this.props.saveDeck(this.state.title)
    }

    navigateToDeckDetailHandler() {
        const { deckDetail, navigation } = this.props
        const { saved } = this.state

        if (saved && !isObjectEmpty(deckDetail)) {
            const resetAction = StackActions.reset({
                index: 1,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'DeckDetail', params: { id: 0 } })
                ],
            });

            setTimeout(() => {
                navigation.dispatch(resetAction);
            }, 1000)
        }
    }

    render() {
        this.navigateToDeckDetailHandler()
        const { title, saved } = this.state

        return (
            <Container style={styles.container}>
                <Content style={styles.content}>
                    {saved && (
                        <Text>
                            Saving...
                        </Text>
                    )}
                    <Text style={styles.title}>
                        What is the title of your new deck?
                    </Text>
                    <Form >
                        <Form>
                            <Item>
                                <Input error placeholder="Ex: Javascript" value={this.state.title} onChange={this.onTitleChange} />
                            </Item>
                        </Form>
                    </Form>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button disabled={title === '' || saved} full onPress={this.onSaveDeck}>
                            <Text>Add</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

function mapStateToProps({ deckDetail }) {
    return {
        deckDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveDeck: (title) => {
            dispatch(handleSaveDeck(title))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#D4DBED',
    },

    content: {
        backgroundColor: '#FFF',
        padding: 10,
        margin: 15,
        borderRadius: 10
    },

    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
        color: '#13244E'
    }
})