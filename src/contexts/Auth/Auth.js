import React, { PureComponent } from 'react';

const { Provider, Consumer: AuthConsumer } = React.createContext('');

const staticData = {
	email: 'stu@dent.com',
	password: '123'
};

class AuthProvider extends PureComponent {
	state = {
		isAuthorized: false,
		email: '',
		authorizeError: ''
	};

	authorize = (email, password) => {
		if (email === staticData.email && password === staticData.password) {
			this.setState({
				isAuthorized: true,
				authorizeError: '',
				email
			});
		} else {
			this.setState({ authorizeError: 'Email или пароль введён не верно' });
		}
	};

	logout = () => {
		this.setState({
			isAuthorized: false,
			authorizeError: ''
		});
	};

	getProviderValue = () => ({
		email: this.state.email,
		isAuthorized: this.state.auth,
		authorizeError: this.state.authorizeError,
		authorize: this.authorize,
		logout: this.logout
	});

	render() {
		const { children } = this.props;
		return <Provider value={this.getProviderValue()}>{children}</Provider>;
	}
}

const TestProvider = Provider;

export { AuthProvider, AuthConsumer, TestProvider };
