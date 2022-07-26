import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { GoSearch } from 'react-icons/go';

class Searchbar extends Component {
   state = { value: '' };

   onFormSubmit = e => {
      e.preventDefault();
      this.props.onSubmit(this.state.value);
   };

   onChangeInput = e => {
      const value = e.target.value;
      this.setState({ value });
   };

   render() {
      const { value } = this.state;

      return (
         <header className={css.Searchbar}>
            <form className={css.SearchForm} onSubmit={this.onFormSubmit}>
               <button type="submit" className={css.SearchFormButton}>
                  <GoSearch />
               </button>
               <label className={css.SearchFormButtonLabel}></label>
               <input
                  className={css.SearchFormInput}
                  type="text"
                  autoComplete="off"
                  autoFocus={true}
                  value={value}
                  onChange={this.onChangeInput}
                  placeholder="Search images and photos"
               />
            </form>
         </header>
      );
   }
}
Searchbar.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
