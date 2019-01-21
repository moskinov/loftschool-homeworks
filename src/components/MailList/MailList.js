import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styles from './MailList.module.css';

class MailList extends Component {
	render() {
		const { data, match, type } = this.props;
		return (
			<div className={`${styles.container} t-${type}-list`}>
				{data.map((item) => (
					<Link to={`${match.path}/${item.id}`} key={item.id} className={styles.link}>
						{item.body.slice(0, 56) + '...'}
					</Link>
				))}
			</div>
		);
	}
}

export default withRouter(MailList);
