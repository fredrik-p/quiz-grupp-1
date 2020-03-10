import React from 'react'

export default function DoQuizListItem(props) {
    const onAnswersClick = () => {
        props.handleClick(props.answer, props.questionId)

    }

    const isToggled = props.answer.selected ? 'active' : '';
    return (
        <li className={'quizAnswers ' + isToggled} onClick={onAnswersClick} >{props.answer.answerTitle}</li>
    )
}
