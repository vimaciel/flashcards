import React, { Component, Fragment } from 'react'
import { View } from 'react-native'
import { StyleSheet } from "react-native"
import { connect } from 'react-redux'
import { Container, Button, Text } from "native-base"
import { handleGetDeckDetail } from "../actions/deckDetail"
import { buildDeckSubtitle, isObjectEmpty } from '../helpers/common'
import HistoryQuiz from './HistoryQuiz'

class DeckDetail extends Component {
    static navigationOptions = {
        title: "Deck's detail",
    }

    state = {
        sortQuizHistory: 'date'
    }

    componentDidMount() {
        const { id } = this.props.navigation.state.params
        id !== 0 && this.props.getDeckDetail(id)
    }

    onAddNewCard = () => {
        const { id } = this.props.deckDetail
        this.props.navigation.navigate('AddCard', { id })
    }

    onStartQuiz = () => {
        const { id } = this.props.deckDetail
        this.props.navigation.navigate('Quiz', { id })
    }

    changeHistoryQuizSort = () => {
        this.setState(prev => ({
            sortQuizHistory: prev.sortQuizHistory === 'date' ? 'score' : 'date'
        }))
    }

    textInfoHistoryQuizSort = () => {
        if (this.state.sortQuizHistory === 'date') {
            return 'Tap any card to sort by score'
        }

        return 'Tap any card to sort by date'
    }

    render() {
        const { deckDetail } = this.props

        if (isObjectEmpty(deckDetail)) {
            return <Text>Loading...</Text>
        }

        const { historyQuiz, title, questions } = deckDetail

        const historyQuizSort = historyQuiz.sort((a, b) => {
            if (this.state.sortQuizHistory === 'date') {
                return b.date - a.date
            }

            return parseInt(b.score) - parseInt(a.score)
        })

        return (
            <Fragment>
                <Container style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.subtitle}>
                            {buildDeckSubtitle(deckDetail)}
                        </Text>
                        {historyQuizSort.length > 0 && (
                            <View style={styles.containerHistory}>
                                <HistoryQuiz data={historyQuizSort} changeHistoryQuizSort={this.changeHistoryQuizSort} />
                            </View>
                        )}
                        <View style={styles.buttonsContainer}>
                            {historyQuizSort.length > 0 && (<View style={styles.historySortContainer}>
                                <Text style={styles.historySortText}>{this.textInfoHistoryQuizSort()}</Text>
                            </View>
                            )}
                            <Button disabled={questions.length === 0} rounded block style={styles.button} onPress={this.onStartQuiz}>
                                <Text>
                                    Start Quiz
                                </Text>
                            </Button>
                            <Button rounded success block style={styles.button} onPress={this.onAddNewCard}>
                                <Text>
                                    Add Card
                                </Text>
                            </Button>
                        </View>
                    </View>
                </Container>
            </Fragment>

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
        getDeckDetail: (id) => {
            dispatch(handleGetDeckDetail(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)

const styles = StyleSheet.create({
    containerHistory: {
        position: 'relative'
    },

    container: {
        backgroundColor: '#edf0f7',
    },

    content: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: '#FFF',
        padding: 10,
        margin: 15,
        borderRadius: 10
    },

    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 35,
        marginTop: 30,
        color: '#13244E'
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 30,
        color: 'black'
    },

    buttonsContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 36,
    },

    button: {
        marginTop: 15
    },

    historySortContainer: {
        textAlign: 'center'

    },

    historySortText: {
        fontSize: 11,
        fontStyle: 'italic'
    }
})