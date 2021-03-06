import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.searchInput = React.createRef();
        this.state = {
            searchText: ''
        };
    }

    /**
     * Flickr supports search with multiple tags. If the user enters more than one tag, either comma or space separated
     * the string sent to the searchTerm function is adjusted so that it matches the format needed for the API call
     */
    onSearchChange = () => {
        let searchTags = '';
        let tags = [];
        if(this.searchInput.current.value.indexOf(" ")){
            tags = this.searchInput.current.value.split(" ");
        }else if(this.searchInput.current.value.indexOf(",")){
            tags = this.searchInput.current.value.split(",");
        }

        if(tags.length > 0){
            for (let i =0; i < tags.length; i++){
                if(i === tags.length - 1){
                    searchTags += tags[i];
                }else {
                    searchTags += tags[i] + "%2C";
                }
            }
        }else{
            searchTags = this.searchInput.current.value;
        }

        this.setState({searchText: searchTags});
    }

    /**
     * When the form is submitted, the input field is reset and the user is redirected to a page with the results
     * @param {Event} event
     */
    handleOnSubmit = (event) => {
        event.preventDefault();
        this.props.history.push( `/search/${this.state.searchText}`);
        event.target.reset();
    }

    render() {
        return (
            <form className="search-form" onSubmit={this.handleOnSubmit}>
                <input
                    type="search"
                    name="search"
                    placeholder="Search"
                    ref={this.searchInput}
                    onChange={this.onSearchChange}
                    required/>

                    <button type="submit" className="search-button">
                        <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </button>
            </form>
        );
    }
}

export default withRouter (SearchForm);
