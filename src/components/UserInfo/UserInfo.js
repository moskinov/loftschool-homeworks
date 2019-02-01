import React, { PureComponent } from 'react';
import styles from './UserInfo.module.css';

import { connect } from 'react-redux';

class UserInfo extends PureComponent {
	render() {
		// Покажите статус загрузки
		// Если данные не были загружены - сообщите об этом пользователю
    const { data, isLoading } = this.props;
    
    if(isLoading) {
      return <p>Данные загружаются...</p>;
    } else if(data === null) {
      return <p className="t-no-user-info">Нет информации о пользователе</p>;
    } else {
      const { avatar_url, name, bio } = data;
      return (
				<div className={styles.root}>
					<div className={styles.imageWrapper}>
						<img className={styles.image} src={avatar_url} alt='' />
					</div>
					<p className="t-user-name">{name}</p>
					<p className="t-user-bio">{bio}</p>
				</div>
      )
    }
	}
}

const mapStateToProps = (state) => ({
	data: state.user.data,
	isLoading: state.user.isLoading
});

// Используйте поля data, isLoading из стейта
export default connect(mapStateToProps)(UserInfo);
