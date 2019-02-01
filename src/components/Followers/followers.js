import React, { PureComponent } from 'react';
import styles from './followers.module.css';
import { connect } from 'react-redux';
import cx from 'classnames';

class Followers extends PureComponent {
	render() {
		// Покажите статус загрузки
		// Если данные не были загружены - сообщите об этом пользователю
    const { data, isLoading } = this.props;

    if(isLoading) {
      return <p>Данные загружаются...</p>;
    } else if(data === null) {
      return <p className="t-no-followers">Нет информации о подписчиках</p>;
    } else {
      return (
        <div className={cx(styles.root, 't-followers')}>
        {data.map((item) => (
          <div key={item.id} className={styles.follower}>
            <img className={styles.followerImg} src={item.avatar_url} alt=''/>
            <p className={styles.followerLogin}>{item.login}</p>
          </div>
        ))}
      </div>
      )
    }
	}
}

const mapStateToProps = (state) => ({
	data: state.followers.data,
	isLoading: state.followers.isLoading
});

// Используйте поля data, isLoading из стейта
export default connect(mapStateToProps)(Followers);
