import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Task from './Task'

const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	display: flex;
	flex-direction: column;
	flex: 1
`

const Title = styled.h3`
	padding: 8px;
`

const TaskList = styled.div`
	padding: 8px;
	min-height: 100px;
	height: 100%;
`

class Column extends React.Component {

	render() {
		return (
			<Container>
				<Title>{this.props.column.title}</Title>
				<Droppable droppableId={this.props.column.id}>
					{provided => (
						<TaskList
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
						{this.props.tasks.map((task, index) => {

							return (
								<Task
									key={task.id}
									task={task}
									index={index}
									action={this.props.action}
								/>
							)
						})}
						{provided.placeholder}
						</TaskList>
					)}
				</Droppable>
			</Container>

		)
	}
}

export default Column