import React from 'react'
import { db } from '../../firebase/firebase'
import DoQuizUI from './DoQuizUI'

class DoQuiz extends React.Component {
    state = {
        currentQuiz: ''
    }
    componentDidMount() {
        this.getCuttentQuiz(this.props.match.params.quiz_id)
    }
    getCuttentQuiz = (id) => {
        console.log(id)
        db.collection('quizes').doc(id).get().then(doc => {
            //clear Quizz data.
            this.setState({
                currentQuiz: doc.data()
            })
        })
    }

    render() {
        return (
            <div>
                {this.state.currentQuiz ? <DoQuizUI quiz={this.state.currentQuiz} /> 
                : 
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                }
            </div>
        )
    }
}

export default DoQuiz
