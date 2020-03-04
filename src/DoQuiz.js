import React from 'react'

class DoQuiz extends React.Component {
    
    render() {
        return (
            <div className="card" id="doQuiz">
                <h1>Quizz Title!</h1>
                <section className="questions">
                    <h2>Qusestion 1</h2>
                    <ul className="list-group">
                        <li className="list-group-item">Answer 1</li>
                        <li className="list-group-item">Answer 2</li>
                        <li className="list-group-item active">Answer 3</li>
                        <li className="list-group-item">Answer 4</li>
                    </ul>
                </section>
                <section>
                    <h2>Qusestion 2</h2>
                    <ul className="list-group">
                        <li className="list-group-item">Answer 1</li>
                        <li className="list-group-item active">Answer 2</li>
                        <li className="list-group-item">Answer 3</li>
                        <li className="list-group-item">Answer 4</li>
                    </ul>
                </section>   
            </div>
        )
    }
}

export default DoQuiz
