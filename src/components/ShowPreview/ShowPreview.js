// Реализуйте компонент превью шоу.
// Он должен показывать название, описание и картинку шоу.
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import * as styles from './ShowPreview.module.css';

export default class ShowPreview extends PureComponent {
	render() {
        const { data: { image, name, id, summary } } = this.props;

		return (
			<div className={`${styles.container} t-preview`}>
				<div>
					<Link to={`/shows/${id}`} className="t-link">{name}</Link>
                    <br/>
                    <br/>
					{image ? <img alt={name} src={image.medium} /> : ''}
				</div>
				<div dangerouslySetInnerHTML={{ __html: summary }} />
			</div>
		);
	}
}
