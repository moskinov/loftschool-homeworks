import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

class Todo extends PureComponent {
	state = {
		inputValue: ''
	};

	getId() {
		const { savedData } = this.props;
		if (!savedData) return 1;
		const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
		return biggest + 1;
	}

	handleChange = (event) => {
		this.setState({
			inputValue: event.target.value
		});
	};

	createNewRecordByEnter = (event) => {
		if (event.key === 'Enter') {
			this.createNewRecord();
		}
	};

	toggleRecordComplete = (el) => {
		const { saveData } = this.props;
		return () => {
			const item = {
				id: el.id,
				done: !el.done,
				text: el.text
			};
			saveData(item);
		};
	};

	createNewRecord = () => {
		const { saveData } = this.props;
		const { inputValue } = this.state;
		if (inputValue !== '') {
			const item = {
				id: this.getId(),
				done: false,
				text: inputValue
			};
			this.setState({ inputValue: '' });
			saveData(item);
		}
	};

	render() {
		const { savedData } = this.props;
		const { inputValue } = this.state;
		return (
			<Card title="Список дел">
				<div className="todo t-todo-list">
					<div className="todo-item todo-item-new">
						<input
							value={inputValue}
							placeholder="Введите задачу"
							className="todo-input t-input"
							onChange={this.handleChange}
							onKeyPress={this.createNewRecordByEnter}
						/>
						<span className="plus t-plus" onClick={this.createNewRecord}>
							+
						</span>
					</div>
					{
						savedData ? savedData.map((item) => this.renderRecord(item)) :
						this.renderEmptyRecord()}
				</div>
			</Card>
		);
	}

	renderEmptyRecord = () => {
		return <div className="todo-item__empty">Cписок пуст</div>;
	};

	renderRecord = (item) => {
		return (
			<div className="todo-item t-todo" key={item.id}>
				<p
					className={`todo-item__text ${
						item.done ? 'todo-item__text_done' :
						''}`}
				>
					{item.text}
				</p>
				<span className="todo-item__flag t-todo-complete-flag" onClick={this.toggleRecordComplete(item)}>
					{
						item.done ? '[x]' :
						'[ ]'}
				</span>
			</div>
		);
	};
}

export default withLocalstorage('todo-app', [])(Todo);
