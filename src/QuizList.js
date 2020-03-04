import React from 'react'
import App from 'App'

class QuizList extends React.Component {
    state = {
		quiz: [],
    }
    render() {
        return (
            <div>
                <ul>
                    <Quiz />
                </ul>
            </div>
        )
    }
}

export default QuizList