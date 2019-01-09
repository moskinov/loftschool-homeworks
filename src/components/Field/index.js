import React, { Component } from 'react';

export default class Field extends Component {
    
    render() {

        const { type, text, name, value, error, onChange} = this.props;

        return(
            <div className='field'>
                <label className='field__label'>
                    <span className='field-label'>{ text }</span>
                </label>
                <input 
                name={name} 
                className={`field__input field-input t-input-${name}`} 
                value={value} 
                type={type} 
                onChange={onChange} />
                <span className={`field__error field-error t-error-${name}`}>{ error }</span>
            </div>
        )
    }
}