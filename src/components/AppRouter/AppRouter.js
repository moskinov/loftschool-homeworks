import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import styles from './AppRouter.module.css';
import InboxMail from '../InboxMail';
import OutboxMail from '../OutboxMail';

import Home from '../Home';
import InboxList from '../InboxList';
import OutboxList from '../OutboxList';

export default class AppRouter extends Component {
	state = {
		sectionName: 'Home'
	};

	setName = (e) => {
		this.setState({ sectionName: e.target.textContent });
	};

	render() {
		const { match } = this.props;
		let { sectionName } = this.state;

		return (
			<div className={styles.wrapper}>
				<div className={styles.container}>
					<nav className={styles.nav}>
						<ul className={`${styles.navList} t-nav-list`}>
							<li className={styles.navElement}>
								<Link
									to={`${match.url}`}
									className={`${styles.link} t-link-home`}
									onClick={this.setName}
								>
									Home
								</Link>
							</li>
							<li className={styles.navElement}>
								<Link
									to={`${match.url}/inbox`}
									className={`${styles.link} t-link-inbox`}
									onClick={this.setName}
								>
									Inbox
								</Link>
							</li>
							<li className={styles.navElement}>
								<Link
									to={`${match.url}/outbox`}
									className={`${styles.link} t-link-outbox`}
									onClick={this.setName}
								>
									Outbox
								</Link>
							</li>
						</ul>
					</nav>

					<div className={styles.content}>
						<h3 className={styles.title}>{sectionName}</h3>
						<Switch>
							<Route path={`${match.path}/`} exact component={Home} />
							<Route path={`${match.path}/inbox`} exact component={InboxList} />
							<Route path={`${match.path}/inbox/:id`} component={InboxMail} />
							<Route path={`${match.path}/outbox`} exact component={OutboxList} />
							<Route path={`${match.path}/outbox/:id`} component={OutboxMail} />
						</Switch>
					</div>
				</div>
			</div>
		);
	}
}
