// Реализуйте страницу поиска.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле search вашего стейта
// и экшн searchRequest.
import React, { Component, Fragment } from 'react';
import * as styles from './Search.module.css';
import { connect } from 'react-redux';
import { searchRequest } from '../../actions/search';
import ShowPreview from '../ShowPreview';

class Search extends Component {
	state = {
		query: ''
	};

	inputChange = (e) => {
		this.setState({ query: e.target.value });
	};

	handleSearch = (e) => {
		const { searchRequest } = this.props;
		const { query } = this.state;
		searchRequest(query);
	};

	render() {
		const { query } = this.state;
		const {search: {isFetching, result, error}} = this.props;

		return (
			<Fragment>
				<div className={styles.previewList}>
					<input className={`${styles.input} t-input`} onChange={this.inputChange} value={query} placeholder="Название сериала"/>
					<div className={styles.buttonWrapper}>
						<button className={`${styles.button} t-search-button`} onClick={this.handleSearch}>
							Найти
						</button>
					</div>
				</div>
				<div className={`${styles.searchPanel} t-search-result`}>
				{
					isFetching ? <p>Выполняется поиск...</p> : 
					(error ? <p className={styles.error}>Ошибка: {error.message}</p> : result.length > 0 && result.map((item) => <ShowPreview key={item.id} data={item} />))
				}
				</div>
			</Fragment>
		);
	}
}



const mapStateToProps = (state) => state;
const mapDispatchToProps = { searchRequest };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
