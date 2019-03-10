import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Card } from 'native-base'
import { formatTimeStamp } from '../helpers/common'

class HistoryQuiz extends Component {
    formatText = (numberOfQuestions, dateQuiz) => {
        const { date, time } = formatTimeStamp(dateQuiz)
        const questions = numberOfQuestions > 1 ? `${numberOfQuestions} questions` : `${numberOfQuestions} question`

        return `${date} at ${time} with ${questions}`
    }

    render() {
        const { data, changeHistoryQuizSort } = this.props        
        
        return (
            <View style={styles.fragmentContainer}>
                <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.container}>
                        {data.map(({ score, numberOfQuestions, date }) => (
                            <TouchableOpacity key={date} onPress={changeHistoryQuizSort}>
                                <Card style={styles.box}>
                                    <View style={styles.scoreContainer}>
                                        <Text style={styles.score}>{score}</Text>
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.info}>{this.formatText(numberOfQuestions, date)}</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.container}>
                        <Card style={styles.box}>
                            <View style={styles.noMoreRegistriesContainer}>
                                <Text style={styles.noMoreRegistriesText}>No more registries</Text>
                            </View>
                        </Card>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default HistoryQuiz

const styles = new StyleSheet.create({
    fragmentContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    scroll: {
        position: 'absolute',
        top: 15,
        zIndex: 9999
    },

    container: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    box: {
        marginRight: 10,
        width: 150,
        height: 150,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 2,
        padding: 10
    },

    scoreContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    score: {
        color: '#13244E',
        fontWeight: 'bold',
        fontSize: 20,
    },

    infoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },

    info: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 11
    },

    noMoreRegistriesContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    noMoreRegistriesText: {
        textAlign: 'center',
        fontStyle: 'italic',
        fontSize: 11
    }
})