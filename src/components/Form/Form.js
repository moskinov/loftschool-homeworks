import React, { Component } from 'react'
import Field from '../Field';
import './Form.css'
import photo from './assets/bond_approve.jpg'

export default class Form extends Component {
    state = {
		valid: false,
		fields: {
			firstname: {
				type: 'text',
				text: 'Имя',
				data: 'james',
				emptyText: 'Нужно указать имя',
				wrongText: 'Имя указано не верно'
			},
			lastname: {
				type: 'text',
				text: 'Фамилия',
				data: 'bond',
				emptyText: 'Нужно указать фамилию',
				wrongText: 'Фамилия указана не верно'
			},
			password: {
				type: 'password',
				text: 'Пароль',
				data: '007',
				emptyText: 'Нужно указать пароль',
				wrongText: 'Пароль указан не верно'
			}
		},
        types: {
			firstname: '',
			lastname: '',
			password: ''
		},
		invalid: {
			firstname: '',
			lastname: '',
			password: ''
		}
	};
	
    changeInput = e => {
        this.setState({
			types: {
				...this.state.types,
				...{ [e.target.name]: e.target.value
				}
			},
            invalid: {
				firstname: '',
				lastname: '',
				password: ''
			}
		});
    };

    submitForm = e => {
        e.preventDefault();
		let error = {};
        Object.keys(this.state.types).forEach(item => {
            if (this.state.types[item] === '') {
                error[item] = this.state.fields[item].emptyText;
            } else if (this.state.types[item].toLowerCase() !== this.state.fields[item].data) {
                error[item] = this.state.fields[item].wrongText;
            }
		});
	
        this.setState({
			invalid: error,
			valid: !Object.keys(error).length
		});
    };

    render() {
        if (!this.state.valid) {
            return (
                    <form className='form' onSubmit={this.submitForm}>
                        <h1>Введите свои данные, агент</h1>
						{
							Object.keys(this.state.types).map(item => {
							return (
								<Field 
								key={item}
								text={this.state.fields[item].text}
								type={this.state.fields[item].type}
								name={item}
								value={this.state.types[item]}
								error={this.state.invalid[item]}
								onChange={this.changeInput}
								/>
							)
						})
						}
                        <div className='form__buttons'>
                            <button className='button t-submit' type='submit'>Проверить</button>
                        </div>
                    </form>
             
            )
        } else {
            return <img src={ photo } alt='' className='t-bond-image'/>
        }
    }
};