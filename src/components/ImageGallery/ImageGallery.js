import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export default function ImageGallery({ params, openModal }) {
   return (
      <ul id="ImageGallery" className={css.ImageGallery}>
         {params.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
               key={id}
               webformatURL={webformatURL}
               alt={tags}
               onOpen={() => openModal(largeImageURL, tags)}
            />
         ))}
      </ul>
   );
}

ImageGallery.propTypes = {
   params: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.number.isRequired,
         webformatURL: PropTypes.string,
         largeImageURL: PropTypes.string,
         tags: PropTypes.string,
      })
   ),
   openModal: PropTypes.func.isRequired,
};
