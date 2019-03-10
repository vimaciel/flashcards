import React, { PureComponent, Fragment } from 'react'
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Container, Button, Text, Footer, FooterTab } from 'native-base'
import Card from './Card'
import { handleAddQuizHistory } from '../actions/deckDetail'

class Quiz extends PureComponent {
    static navigationOptions = {
        title: "Quiz",
    }

    state = {
        quizIndex: 0,
        correctQuestions: 0,
        quizFinished: false
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })

        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })

        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })

        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })

        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    flipCard = () => {
        Animated.spring(this.animatedValue, {
            toValue: this.value >= 90 ? 0 : 180,
            friction: 8,
            tension: 10
        }).start();
    }

    buildProgressText = () => {
        const { questions } = this.props.deckDetail
        return `${this.state.quizIndex + 1}/${questions.length}`
    }

    buildPercentageText = () => {
        const { correctQuestions } = this.state
        const { questions } = this.props.deckDetail

        return `${(correctQuestions * 100) / questions.length}%`
    }

    onCorrectButtonClick = () => {
        this.quizHandler(true)
    }

    onIncorrectButtonClick = () => {
        this.quizHandler()
    }

    quizHandler = (isCorrectQuestion = false) => {
        const { quizIndex, correctQuestions } = this.state
        const { questions } = this.props.deckDetail
        const nextQuizIndex = quizIndex + 1
        const updateCorrectQuestions = isCorrectQuestion
            ? correctQuestions + 1 : correctQuestions

        // If there aren't more questions then finish the quiz, when only update the correct questions indicator.
        if (questions.length === nextQuizIndex) {
            this.setState({
                correctQuestions: updateCorrectQuestions,
                quizFinished: true
            })

            const { id } = this.props.navigation.state.params
            const { questions } = this.props.deckDetail
            const score = `${(updateCorrectQuestions * 100) / questions.length}%`
            this.props.addQuizHistory(id, score, questions.length)

            return
        }

        this.setState({
            quizIndex: nextQuizIndex,
            correctQuestions: updateCorrectQuestions
        })
    }

    restartQuiz = () => {
        this.setState({
            quizIndex: 0,
            correctQuestions: 0,
            quizFinished: false
        })
    }

    backToDeck = () => {
        this.props.navigation.navigate('DeckDetail')
    }

    render() {
        const { quizFinished } = this.state
        if (quizFinished) {
            return (
                <Container>
                    <View style={styles.finishQuizContainer}>
                        <Text style={styles.finalPercentageText}>{this.buildPercentageText()}</Text>
                        <Text style={styles.resultFinalText}>You've got {this.buildPercentageText()} of questions right</Text>                        
                    </View>
                    <Footer>
                        <FooterTab>
                            <Button style={styles.retartQuizButton} full success onPress={this.restartQuiz}>
                                <Text style={styles.textDefault}>Restart Quiz</Text>
                            </Button>
                            <Button style={styles.backToDeckButton} full danger onPress={this.backToDeck}>
                                <Text style={styles.textDefault}>Back to Deck</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            )
        }

        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        const { question, answer } = this.props.deckDetail.questions[this.state.quizIndex]

        return (
            <Fragment>
                <View style={styles.infoContainer}>
                    <View style={styles.progressText}>
                        <Text style={styles.textDefault}>{this.buildProgressText()}</Text>
                    </View>
                    <View style={styles.percentageText}>
                        <Text style={styles.textDefault}>{this.buildPercentageText()}</Text>
                    </View>
                </View>
                <Container style={styles.container}>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.flipCard}>
                            <View>
                                <Animated.View style={[styles.flipCard, frontAnimatedStyle, { opacity: this.frontOpacity }]}>
                                    <Card content={question} />
                                </Animated.View>
                                <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, { opacity: this.backOpacity }]}>
                                    <Card content={answer} />
                                </Animated.View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Footer>
                        <FooterTab>
                            <Button style={styles.correctButton} full success onPress={this.onCorrectButtonClick}>
                                <Text style={styles.textDefault}>Correct</Text>
                            </Button>
                            <Button style={styles.incorrectButton} full danger onPress={this.onIncorrectButtonClick}>
                                <Text style={styles.textDefault}>Incorrect</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps({ deckDetail }) {
    return {
        deckDetail
    }
}

function mapDipatchToProps(dispatch) {
    return {
        addQuizHistory: (id, score, numberOfQuestions) => {
            dispatch(handleAddQuizHistory(id, score, numberOfQuestions))
        }
    }
}

export default connect(mapStateToProps, mapDipatchToProps)(Quiz)

const styles = StyleSheet.create({
    finishQuizContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    finalPercentageText: {
        color: '#13244E',
        fontWeight: 'bold',
        fontSize: 50
    },

    resultFinalText: {
        color: '#13244E',
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 10
    },

    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: '#13244E'
    },

    progressText: {
        color: '#FFF',
        marginLeft: 10,
        fontWeight: 'bold'
    },

    percentageText: {
        color: '#FFF',
        marginLeft: 10,
        fontWeight: 'bold',
    },

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    flipCard: {
        width: 300,
        height: 300,
        borderRadius: 15,
        backgroundColor: '#13244E',
        backfaceVisibility: 'hidden',
    },

    flipCardBack: {
        backgroundColor: "#b30000",
        position: "absolute",
        top: 0,
    },

    correctButton: {
        backgroundColor: '#004d00'
    },

    incorrectButton: {
        backgroundColor: '#b30000'
    },

    retartQuizButton: {
        backgroundColor: '#001a00'
    },

    backToDeckButton: {
        backgroundColor: '#660000'
    },

    textDefault: {
        color: '#FFF'
    }
});