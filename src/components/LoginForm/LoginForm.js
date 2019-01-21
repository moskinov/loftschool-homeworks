import React, { PureComponent, Fragment } from 'react';
import { withAuth } from '../../context/Auth';
import { Redirect } from 'react-router-dom';
import styles from './LoginForm.module.css';

class LoginForm extends PureComponent {
	state = {
		email: '',
		password: ''
	};

	changeEmail = (e) => {
		this.setState({ email: e.target.value });
	};

	changePassword = (e) => {
		this.setState({ password: e.target.value });
	};

	handleSubmit = (e) => {
		const { authorize } = this.props;
		const { email, password } = this.state;
		e.preventDefault();
		authorize(email, password);
	};

	renderForm = () => {
		const { authError } = this.props;

		return (
			<div className={styles.bg}>
				<form className={`${styles.form} t-form`} onSubmit={this.handleSubmit}>
					<p>
						<label htmlFor="email">
							<span className={styles.labelText}>Почта</span>
							<input
								className={`${styles.input} ${'t-input-email'}`}
								type="text"
								name="email"
								onChange={this.changeEmail}
							/>
						</label>
					</p>
					<p>
						<label htmlFor="password">
							<span className={styles.labelText}>Пароль</span>
							<input
								className={`${styles.input} ${'t-input-password'}`}
								type="password"
								name="password"
								onChange={this.changePassword}
							/>
						</label>
					</p>

					{authError !== '' && <p className={styles.error}>{authError}</p>}

					<div className={styles.buttons}>
						<button className={`${styles.button} t-login`}>Войти</button>
					</div>
				</form>
			</div>
		);
	};

	render() {
		const { isAuthorized } = this.props;

		return (
			<Fragment>
				{
					isAuthorized ? <Redirect to="/app" /> :
					this.renderForm()}
			</Fragment>
		);
	}
}

export default withAuth(LoginForm);
