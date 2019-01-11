import React, { PureComponent } from 'react';

export default class Congratulations extends PureComponent {
	render() {
		return (
			<p className="t-congratulation">
				<span role="img" aria-label="congratulations!">
					🎉
				</span>
				Поздравляем!{' '}
				<span role="img" aria-label="congratulations!">
					🎉
				</span>
				<br /> Вы вошли в систему!
			</p>
		);
	}
}
