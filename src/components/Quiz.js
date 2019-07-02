import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { black, gray, blue, white, amber_darken_3 } from '../utils/colors'
import { connect } from 'react-redux'
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'

class Quiz extends Component {
  state = {
    currentIndex: 0,
    correctAnswers: 0,
    showAnswer: false
  }

  flipCard = () => this.setState({ showAnswer: !this.state.showAnswer })

  answerCorrect = () =>
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      correctAnswers: this.state.correctAnswers + 1,
      showAnswer: false
    })

  answerIncorrect = () =>
    this.setState({
      currentIndex: this.state.currentIndex + 1,
      showAnswer: false
    })

  returnToDeck = () => this.props.navigation.goBack()

  startQuiz = () => {
    this.setState({
      currentIndex: 0,
      correctAnswers: 0,
      showAnswer: false
    })
  }

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { deck } = this.props.navigation.state.params
    const { currentIndex, correctAnswers, showAnswer } = this.state

    const cards = this.props.decks[deck.title].questions
    const totalCards = deck.questions.length
    const showingCard = cards[currentIndex]
    const cardRemaining = currentIndex < totalCards

    return (
      <View style={styles.container}>
        {cardRemaining
          ?
          (
            <View>
              <View>
                <Text style={styles.textProgress}>{`Showing ${currentIndex + 1} / ${totalCards}`}</Text>
              </View>
              <View>
                {
                  showAnswer === false
                    ? <Text style={styles.textCard}>{showingCard.question}</Text>
                    : <Text style={styles.textCard}>{showingCard.answer}</Text>
                }
              </View>
              <View>
                {showAnswer === false
                  ? <TouchableOpacity onPress={this.flipCard}>
                    <Text style={styles.showButton}>
                      Show Answer
                    </Text>
                  </TouchableOpacity>
                  : <TouchableOpacity onPress={this.flipCard}>
                    <Text style={styles.showButton}>
                      Show Question
                    </Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryBtn} onPress={this.answerCorrect}>
                  <Text style={styles.primaryBtnText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn} onPress={this.answerIncorrect}>
                  <Text style={styles.secondaryBtnText}>Incorrect</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
          :
          (
            <View>
              <View>
                <Text style={styles.textSummary}>{`Your Scores: ${correctAnswers} / ${totalCards}`}</Text>
              </View>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryBtn} onPress={this.returnToDeck}>
                  <Text style={styles.primaryBtnText}>Back To Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryBtn} onPress={this.startQuiz}>
                  <Text style={styles.secondaryBtnText}>Restart Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    justifyContent: 'flex-start'
  },
  question: {
    marginTop: 10,
    fontSize: 18,
    color: black,
    textAlign: 'center'
  },
  actions: {
    marginTop: 80,
    alignItems: 'center'
  },
  primaryBtn: {
    backgroundColor: blue,
    borderRadius: 6,
    padding: 15,
    marginTop: 15,
    width: 220
  },
  secondaryBtn: {
    backgroundColor: white,
    borderRadius: 6,
    borderColor: blue,
    borderWidth: 1,
    padding: 15,
    marginTop: 15,
    width: 220
  },
  primaryBtnText: {
    fontSize: 18,
    color: white,
    textAlign: 'center'
  },
  secondaryBtnText: {
    fontSize: 18,
    color: blue,
    textAlign: 'center'
  },
  textCard: {
    fontSize: 30,
    color: black,
    textAlign: 'center'
  },
  textProgress: {
    fontSize: 14,
    color: gray,
    marginBottom: 30
  },
  textSummary: {
    fontSize: 30,
    color: blue,
    textAlign: 'center'
  },
  showButton: {
    textAlign: 'center',
    color: amber_darken_3,
    fontSize: 18,
    marginTop: 30
  }
})

function mapStateToProps(decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Quiz)