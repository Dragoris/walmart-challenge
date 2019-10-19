import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Column from './Column'
import initialData from './initialData'
import { moreTasks } from './initialData'

const Container = styled.div`
	display: flex;
	flex: 1

`
const StyledButton = styled.button`
    width: 99%;
    margin: 8px;
    height: 45px;
`

class App extends React.Component {
	constructor(props) {
	 	super(props);
	
		this.state = {
			...initialData,
			tasksAdded: 5
		}
	}

	handleCompletionToggle = (id) => {

		const isCompleted = !this.state.tasks[id].completed

		const newTasks = {
			...this.state.tasks,
			[id]: {
				...this.state.tasks[id],
				completed: isCompleted
			}
		}


		const completedIds = []
		const incompletedIds = []
		Object.keys(newTasks).forEach(task => {
			if (newTasks[task].completed) {
				completedIds.push(task)
			}
			else{
				incompletedIds.push(task)
			}
			
		})
		const newColumns = {
			...this.state.columns,
			'column-1': {
				...this.state.columns['column-1'],
				taskIds:[
					
					...incompletedIds
				]

			},
			'column-2': {
				...this.state.columns['column-2'],
				taskIds:[
					
					...completedIds
				]

			}

		}

		


		const newState = {
			...this.state,
			tasks: newTasks,
			columns: newColumns
		}

		this.setState(newState)
	}

	handleAdding = () => {
		const addedTaskIds = Object.keys(moreTasks).filter(task => {
			const taskNum = parseInt( task.replace('task-', ''))
			return (taskNum <= this.state.tasksAdded + 5 && taskNum > this.state.tasksAdded ) 
		})

		const addedTasks = {}
		addedTaskIds.forEach(task => {
			addedTasks[task] = moreTasks[task]
		})

		const newTasks = {
			...this.state.tasks,
			...addedTasks
		}

		const newState = {
			...this.state,
			tasks:  newTasks,
			columns: {
				...this.state.columns,
				'column-1': {
					...this.state.columns['column-1'],
					taskIds:[
						 ...this.state.columns['column-1'].taskIds,
						...addedTaskIds
					]
				}
			},
			tasksAdded: this.state.tasksAdded + 5,
		}
		this.setState(newState)

	}





	onDragEnd = result => {
		const { destination, source, draggableId} = result;

		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const start = this.state.columns[source.droppableId]
		const finish = this.state.columns[destination.droppableId]

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds)
			//remove from position
			newTaskIds.splice(source.index, 1)
			//add dragged task to destination location
			newTaskIds.splice(destination.index, 0, draggableId)


			const newColumn = {
				...start,
				taskIds: newTaskIds,
			}

			const newState = {
				...this.state,
				columns: {
					...this.state.columns,
					[newColumn.id]: newColumn,
				}
			}

			this.setState(newState);
			return;
		}

		console.log(draggableId)
		const startId = parseInt(source.droppableId.replace('column-', ''))
		const finishId = parseInt(destination.droppableId.replace('column-', ''))
		const isCompleted = (startId < finishId)
		
		const newTasks = {
			...this.state.tasks,
			[draggableId]: {
				...this.state.tasks[draggableId],
				completed: isCompleted
			}
		}

		const startTaskIds = Array.from(start.taskIds)
		startTaskIds.splice(source.index, 1)

		const newStart = {
			...start,
			taskIds: startTaskIds,
		}

		const finishTaskIds = Array.from(finish.taskIds)
		finishTaskIds.splice(destination.index, 0, draggableId)


		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		}

		const newState = {
			...this.state,
			tasks: newTasks,
			columns: {
				[newStart.id]: newStart,
				[newFinish.id]: newFinish,
			}
		}
		this.setState(newState)
	
	}

	render() {
		return (
				<DragDropContext
					onDragEnd={this.onDragEnd}
					onDragStart={this.onDragStart}
				>
					<StyledButton onClick={()=> this.handleAdding()}>Show More</StyledButton>
					<Container>
						{this.state.columnOrder.map((columnId, index) => {
							const column = this.state.columns[columnId]
							const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

							return( 
								<Column
									key={column.id}
									column={column}
									tasks={tasks}
									action={this.handleCompletionToggle}
								/>
							)
						})}
					</Container>
				</DragDropContext>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
