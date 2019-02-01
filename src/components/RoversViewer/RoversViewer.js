// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import SelectSol from '../SelectSol';
import RoverPhotos from '../RoverPhotos';
import styles from './RoversViewer.module.css';
import { getRoversPhotos, roversNames } from '../../modules/RoverPhotos';
import {
  getSol,
  changeSol,
  fetchPhotosRequest
} from '../../modules/RoverPhotos';

class RoverViewers extends PureComponent {
  componentDidMount() {
    const { fetchPhotosRequest, sol } = this.props;
    roversNames.forEach(name => fetchPhotosRequest({ name, sol: sol.current }));
  }

  changeSol = value => {
    const { changeSol, sol } = this.props;

    value !== sol.current && changeSol(value);
  };

  renderRoversPhoto = () => {
    const { photos, sol } = this.props;

    return roversNames.map(rover => {
      const currentPhotos = photos[rover][sol.current];
      const roverPhotos = !currentPhotos || !currentPhotos.isLoaded ? [] : currentPhotos.photos;

      if (currentPhotos && currentPhotos.error) {
        return <div>{currentPhotos.error}</div>;
      }

      return <RoverPhotos name={rover} photos={roverPhotos} key={rover} />;
    });
  };

  render() {
    const { sol } = this.props;

    return (
      <div className={styles.root}>
        <SelectSol
          minSol={sol.min}
          maxSol={sol.max}
          selectedSol={sol.current}
          changeSol={this.changeSol}
        />
        <div className={styles.сontainer}>{this.renderRoversPhoto()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sol: getSol(state),
  photos: getRoversPhotos(state)
});

const mapDispatchToProps = {
  changeSol,
  fetchPhotosRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoverViewers);
