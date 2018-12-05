import { GraphQLServer } from 'graphql-yoga';

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

// Type definitions
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
		published: Boolean!
		author: User!
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
		}
	},
	Post: {
		author(parent, args, ctx, info) {
			return users.find((user) => {
				return user.id === parent.author;
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
