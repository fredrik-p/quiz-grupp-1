import React from 'react'

export default function DoQuizListItem(props) {
    const onAnswersClick = () => {
        props.handleClick(props.answer)
    }

    const isToggled = props.answer.selected ? 'active' : '';
    return (
        <li className={'list-group-item ' + isToggled} onClick={onAnswersClick} >{props.answer.answersTitle}</li>
    )
}
