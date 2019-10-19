const initialData = {
	tasks: {
		'task-1': { id:'task-1', details: '1 thing', completed: false },
		'task-2': { id:'task-2', details: '2 thing', completed: false },
		'task-3': { id:'task-3', details: '3 thing', completed: false },
		'task-4': { id:'task-4', details: '4 thing', completed: false },
		'task-5': { id:'task-5', details: '5 thing', completed: false },
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'To do',
			taskIds: [
				'task-1',
				'task-2',
				'task-3',
				'task-4',
				'task-5',

			]
		},
		'column-2': {
			id: 'column-2',
			title: 'Completed',
			taskIds: [],
		},

	},
	columnOrder: ['column-1', 'column-2'],
}



export default initialData

export const moreTasks = {	
	'task-6': { id:'task-6', details: '6 thing', completed: false },
	'task-7': { id:'task-7', details: '7 thing', completed: false },
	'task-8': { id:'task-8', details: '8 thing', completed: false },
	'task-9': { id:'task-9', details: '9 thing', completed: false },
	'task-10': { id: 'task-10', details: '10 thing', completed: false },
	'task-11': { id: 'task-11', details: '11 thing', completed: false },
	'task-12': { id: 'task-12', details: '12 thing', completed: false },
	'task-13': { id: 'task-13', details: '13 thing', completed: false },
	'task-14': { id: 'task-14', details: '14 thing', completed: false },
	'task-15': { id: 'task-15', details: '15 thing', completed: false },
	'task-16': { id: 'task-16', details: '16 thing', completed: false },
	'task-17': { id: 'task-17', details: '17 thing', completed: false },
	'task-18': { id: 'task-18', details: '18 thing', completed: false },
	'task-19': { id: 'task-19', details: '19 thing', completed: false },
	'task-20': { id: 'task-20', details: '20 thing', completed: false },
	
}
