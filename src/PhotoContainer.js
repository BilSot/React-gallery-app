import React, {Component} from 'react';
import Photo from "./Photo";
import NoResults from "./NoResults";

class PhotoContainer extends Component {
    componentDidMount() {
        if (this.props.search)
            this.props.search(this.props.tag);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.search) {
            if (this.props.tag !== prevProps.tag) {
                this.props.search(this.props.tag);
            }
        }
    }

    render() {
        const mainImages = this.props.photos;
        let photosToDisplay;

        if (mainImages.length > 0) {
            photosToDisplay = mainImages.map(img => <Photo
                url={`https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}
                key={img.id}/>)
        } else {
            photosToDisplay = [];
        }
        return (
            <div className="photo-container">
                {this.props.loading
                    ? <h2>Loading...</h2>
                    : !this.props.loading && photosToDisplay.length > 0
                        ? <><h2>Results</h2>
                            <ul>{photosToDisplay}</ul></>
                        : <NoResults/>
                }
            </div>
        );
    }
}

export default PhotoContainer;
