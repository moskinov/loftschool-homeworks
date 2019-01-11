import React, { Fragment, PureComponent } from 'react';
import SectionTitle from '../SectionTitle';
import './Layout.css';

export default class Layout extends PureComponent {
	render() {
		const { header, footer, children } = this.props;
		return (
			<Fragment>
				{this.renderHeader(header)}

				<main
					className={`main ${
						header ? 'main--with-header' :
						''} ${
						footer ? 'main--with-footer' :
						''}`}
				>
					<SectionTitle className="main__title">Main</SectionTitle>
					{children}
				</main>

				{this.renderFooter(footer)}
			</Fragment>
		);
	}

	renderHeader = (HeaderChild) => {
		if (!HeaderChild) return;
		return (
			<header className="header">
				<SectionTitle className="header__title">Header</SectionTitle>
				<div className="header__content">
					<HeaderChild />
				</div>
			</header>
		);
	};

	renderFooter(Footer) {
		if (!Footer) return;
		return (
			<footer className="footer">
				<SectionTitle className="header__title">Footer</SectionTitle>
				<Footer />
			</footer>
		);
	}
}
