const Query = {
	users(parent, args, { db }, info) {
		if (!args.query) {
			return db.users;
		}

		return db.users.filter((user) => {
			return user.name.toLowerCase().includes(args.query.toLowerCase());
		});
	},
	posts(parent, args, { db }, info) {
		if (!args.query) {
			return db.posts;
		}
		return db.posts.filter((post) => {
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
	comments(parent, args, { db }, info) {
		return db.comments;
	}
};

export { Query as default };
