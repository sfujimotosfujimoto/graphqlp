import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// String, Boolean, Int, Float, ID

// Demo User data
const users = [
	{
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

const posts = [
	{
		id: '1',
		title: 'First Post',
		body: 'Body First',
		published: true,
		author: '1'
	},
	{
		id: '2',
		title: 'Second Post',
		body: 'Body Second',
		published: true,
		author: '1'
	},
	{
		id: '3',
		title: 'Third Post',
		body: 'Body Third',
		published: false,
		author: '2'
	}
];

const comments = [
	{
		id: '101',
		text: 'This is a comment.',
		author: '1',
		post: '1'
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

// Type definitions
const typeDefs = `
    type Query {
        users(query: String): [User!]!
		posts(query: String): [Post!]!
		comments: [Comment!]!
        me: User!
        post: Post!
	}
	
	type Mutation {
		createUser(name: String!, email: String!, age: Int): User!
		createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
		createComment(text: String!, author: ID!, post: ID!): Comment!
	}
    
    type User {
        id: ID!
        name: String!
        email: String!
		age: Int
		posts: [Post!]
		comments: [Comment!]!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
		published: Boolean!
		author: User!
		comments: [Comment!]!
	}
	
	type Comment {
		id: ID!
		text: String!
		author: User!
		post: Post!
	}
`;

// Resolvers
const resolvers = {
	Query: {
		users(parent, args, ctx, info) {
			if (!args.query) {
				return users;
			}

			return users.filter((user) => {
				return user.name.toLowerCase().includes(args.query.toLowerCase());
			});
		},
		posts(parent, args, ctx, info) {
			if (!args.query) {
				return posts;
			}
			return posts.filter((post) => {
				return post.title.includes(args.query);
			});
		},
		me() {
			return {
				id: '123098',
				name: 'John',
				email: 'john@example.com'
			};
		},
		post() {
			return {
				id: '1234asdf',
				title: 'My First Post',
				body: 'Hello this is from the post!',
				published: true
			};
		},
		comments(parent, args, ctx, info) {
			return comments;
		}
	},
	Mutation: {
		createUser(parent, args, ctx, info) {
			const emailTaken = users.some((user) => {
				return user.email === args.email;
			});

			if (emailTaken) {
				throw new Error('Email taken.');
			}

			const user = {
				id: uuidv4(),
				name: args.name,
				email: args.email,
				age: args.age
			};

			users.push(user);

			return user;
		},
		createPost(parent, args, ctx, info) {
			const userExists = users.some((user) => {
				return user.id === args.author;
			});

			if (!userExists) {
				throw new Error('User not found.');
			}

			const post = {
				id: uuidv4(),
				title: args.title,
				body: args.body,
				published: args.published,
				author: args.author
			};

			posts.push(post);
			return post;
		},
		createComment(parent, args, ctx, info) {
			const userExists = users.some((user) => {
				return user.id === args.author;
			});
			const postExists = posts.some((post) => {
				return post.id === args.post && post.published === true;
			});

			if (!userExists || !postExists) {
				throw new Error('User not found or Post');
			}

			const comment = {
				id: uuidv4(),
				text: args.text,
				author: args.author,
				post: args.post
			};

			comments.push(comment);
			return comment;
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author;
			});
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => {
				return comment.post === parent.id;
			});
		}
	},
	Comment: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author;
			});
		},
		post(parent, args, ctx, info) {
			return posts.find((post) => {
				return post.id === parent.post;
			});
		}
	},
	User: {
		posts(parent, args, ctx, info) {
			return posts.filter((post) => {
				return post.author === parent.id;
			});
		},
		comments(parent, args, ctx, info) {
			return comments.filter((comment) => {
				return comment.author === parent.id;
			});
		}
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers
});

server.start(() => {
	console.log('The server is up!');
});
