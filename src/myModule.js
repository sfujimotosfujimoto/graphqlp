const message = 'Some message from myModule.js';
const name = 'sf';

const location = 'Japan';

const getGreeting = (name) => {
	return `welcome to the course ${name}`;
};

export { message, name, getGreeting, location as default };
