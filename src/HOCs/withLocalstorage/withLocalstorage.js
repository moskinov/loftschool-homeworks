import React, { Component } from 'react';
import { load, save } from '../../localstorage';

const withLocalstorage = (localStorageKey, data) => (Wrapper) => {
	return class extends Component {
		state = {
			savedData: data
		};

		componentDidMount = () => {
			this.setState({
				savedData: load(localStorageKey)
			});
		};

		saveData = (data) => {
			const { savedData } = this.state;
			let newArr;
			const old = (item) => item.id === data.id;
			if (!savedData) {
				newArr = [ data ];
			} else if (savedData.findIndex(old) !== -1) {
				newArr = savedData.map(
					(item) =>

							old(item) ? data :
							item
				);
			} else {
				newArr = [ ...savedData, data ];
			}
			save(localStorageKey, newArr);
			this.setState({
				savedData: load(localStorageKey)
			});
		};

		render() {
			return <Wrapper savedData={this.state.savedData} saveData={this.saveData} />;
		}
	};
};

export default withLocalstorage;
