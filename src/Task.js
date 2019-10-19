import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
	background-color: #fff;
	display: flex;
	justify-content: space-between
`

class Task extends React.Component {
	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{provided => (
					<Container
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						{this.props.task.details}
						<input
							onChange={() => this.props.action(this.props.task.id)}
							type="checkbox"
							name={this.props.task.details}
							value="complete"
							checked={this.props.task.completed}
						/>
					</Container>
				)}
			</Draggable>

		)
	}
}

export default Task