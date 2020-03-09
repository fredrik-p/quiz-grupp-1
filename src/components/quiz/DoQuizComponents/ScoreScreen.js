import React from 'react'

const ScoreScreen = (props) => {
    return (
        <div>
            {props.points.score}/{props.points.totalPoints}
        </div>
    )
}

export default ScoreScreen
