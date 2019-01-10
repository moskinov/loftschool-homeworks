import React, { Component } from 'react';
import './Show.css';
import { getShowInfo } from '../../api';

export default class Show extends Component {
	state = {
		data: {}
	};

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	return (prevState = { showId: nextProps.showId });
	// }

	componentDidUpdate(prevProps) {
		if (prevProps.showId !== this.props.showId) {
			getShowInfo(this.props.showId).then((res) =>
				this.setState({
					data: res
				})
			);
		}
	}

	render() {
		const data = this.state.data;

		if (Object.keys(data).length !== 0) {
			const { image, name, genres, summary } = data;

			return (
				<div className="show">
					<img className="show-image" src={image.medium} alt="film" />
					<h2 className="show-label t-show-name">{name}</h2>
					<p className="show-text t-show-genre">
						<strong>Жанр: </strong>
						{genres.join(', ')}
					</p>
					<p className="show-text t-show-summary" dangerouslySetInnerHTML={{ __html: summary }} />
				</div>
			);
		} else {
			return <p className="show-text t-show-info">Шоу не выбрано</p>;
		}
	}
}
