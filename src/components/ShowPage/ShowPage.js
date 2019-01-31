// Реализуйте страницу шоу.

// Используйте метод connect и mapStateToProps, mapDispatchToProps,
// чтобы получить ссылку на поле show вашего стейта
// и экшн showRequest.

// В методе componentDidMount вам нужно будет диспатчить showRequest action
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import * as styles from './ShowPage.module.css';
import { showRequest } from '../../actions/show';

class ShowPage extends PureComponent{
    componentDidMount(){
        const {showRequest, match} = this.props;
        showRequest(match.params.id)
    }

    render(){
        const { shows:{ isFetching, entities, error } } = this.props;
        const { name, image, summary, _embedded } = entities;

        return (
            isFetching ? <p>Данные загружаются...</p> : 
            (error ? <p className={styles.error}>Ошибка: {error.message}</p> : 
            <Fragment>
                    <p>{name}</p>
                    {image ? <img alt={name} src={image.medium}/> : ''}
                    <div dangerouslySetInnerHTML={{__html: summary}}/>
                    <div className={styles.cast}>
                        { _embedded ? _embedded.cast.map(item => {
                                const { person } = item;
                                return (
                                    <div key={person.id} className='t-person'>
                                        <p>{person.name}</p>
                                        { person.image ? <img alt={person.name} src={person.image.medium}/> : '' }            
                                    </div>
                                )
                            }) : ''
                        }
                    </div>
            </Fragment>)
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = { showRequest };

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage)