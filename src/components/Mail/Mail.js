import React, { Component } from 'react';
import styles from './Mail.module.css';

export default class Mail extends Component {
	render() {
		const { type, ...mail } = this.props;
		return (
			<div className={styles.container}>
				<p className={`t-mail-${type}`}>
					{`${type.charAt(0).toUpperCase() + type.slice(1)}: `}
					<b>{mail[type]}</b>
				</p>
				<p className="t-mail-body">{mail.body}</p>
			</div>
		);
	}
}
