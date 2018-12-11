const users = [{
		id: '1',
		name: 'SF',
		email: 'sf@example.com',
		age: 45
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@example.com'
	},
	{
		id: '3',
		name: 'Mike',
		email: 'mike@example.com'
	}
];

const posts = [{
		id: '11',
		title: 'First Post',
		body: 'Body First',
		published: true,
		author: '1'
	},
	{
		id: '12',
		title: 'Second Post',
		body: 'Body Second',
		published: true,
		author: '1'
	},
	{
		id: '13',
		title: 'Third Post',
		body: 'Body Third',
		published: false,
		author: '2'
	}
];

const comments = [{
		id: '101',
		text: 'This is a comment.',
		author: '1',
		post: '11'
	},
	{
		id: '102',
		text: 'This is another comment.',
		author: '2',
		post: '2'
	},
	{
		id: '103',
		text: 'This is the third comment.',
		author: '3',
		post: '3'
	},
	{
		id: '104',
		text: 'This is the fourth comment.',
		author: '2',
		post: '2'
	}
];

const db = {
	users,
	posts,
	comments
};

export {
	db as
	default
};