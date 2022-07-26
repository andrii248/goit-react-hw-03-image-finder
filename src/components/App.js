import React, { Component } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import FetchData from 'services/API';
import Notiflix from 'notiflix';
import * as Scroll from 'react-scroll';

class App extends Component {
   state = {
      searchName: ' ',
      countPage: 1,
      per_page: 12,
      ImagesList: [],
      showModal: false,
      showLoadMore: false,
      loading: false,
      openModalItem: { url: '', alt: '' },
   };

   componentDidUpdate(_, prevState) {
      const { searchName, per_page, countPage, ImagesList } = this.state;

      if (
         prevState.countPage !== countPage ||
         prevState.searchName !== searchName
      ) {
         this.setState({ showLoadMore: false, loading: true });
         FetchData(searchName, countPage, per_page)
            .then(data => {
               const filterDataHits = data.hits.map(img => {
                  return Object.fromEntries(
                     Object.entries(img).filter(([key]) =>
                        [
                           'id',
                           'tags',
                           'largeImageURL',
                           'webformatURL',
                        ].includes(key)
                     )
                  );
               });
               this.setState(prev => ({
                  ImagesList: [...prev.ImagesList, ...filterDataHits],
                  totalHits: data.totalHits,
                  loading: false,
               }));
               if (data.total !== data.hits.length) {
                  this.setState({ showLoadMore: true });
               }
               if (countPage === 1) {
                  Notiflix.Notify.success(
                     `Woo-hoo!!! We've found ${data.totalHits} images.`
                  );
               }
               if (data.total <= ImagesList.length + per_page) {
                  this.setState({ showLoadMore: false });
                  Notiflix.Notify.info(
                     "Whoops! You've just reached the end of the image list."
                  );
               }
            })
            .catch(this.onApiError);
      }
   }
   onApiError = () => {
      Notiflix.Notify.failure(
         'Oops! No images found for your request. Please try again.'
      );
      this.setState({ showLoadMore: false, loading: false });
   };

   onSubmit = name => {
      this.setState(prev =>
         prev.searchName === name && prev.countPage === 1
            ? { countPage: 1 }
            : {
                 searchName: name,
                 countPage: 1,
                 ImagesList: [],
              }
      );
   };

   onloadMore = () => {
      this.setState(prev => ({
         countPage: prev.countPage + 1,
      }));
      this.scrollSlowly();
   };

   scrollSlowly = () => {
      const { height: cardHeight } = document
         .querySelector('#ImageGallery')
         .firstElementChild.getBoundingClientRect();
      Scroll.animateScroll.scrollMore(cardHeight * 2);
   };
   openModal = (url, alt) => {
      const openModalItem = { url, alt };
      this.setState({
         showModal: true,
         openModalItem,
      });
   };
   closeModal = () => {
      this.setState({ showModal: false });
   };
   render() {
      const { ImagesList, showModal, openModalItem, showLoadMore, loading } =
         this.state;
      return (
         <div className="App">
            <Searchbar onSubmit={this.onSubmit} />
            {showModal && (
               <Modal
                  url={openModalItem.url}
                  alt={openModalItem.alt}
                  onClose={this.closeModal}
               />
            )}
            <ImageGallery params={ImagesList} openModal={this.openModal} />
            {loading && <Loader />}
            {showLoadMore && (
               <Button onClick={this.onloadMore} title="Load more..." />
            )}
         </div>
      );
   }
}

export default App;
