import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import SearchForm from "./SearchForm";
import MainNavigation from "./MainNavigation";
import PhotoContainer from "./PhotoContainer";
import PageNotFound from "./PageNotFound";
import NoTags from "./NoTags";
import axios from "axios";
import apiKey from "./config";

class App extends Component {
    constructor(props) {
        super(props);
        this.defaultTags = ["tango", "yoga", "books"];

        this.state = {
            loading: true,
            tango: [],
            yoga: [],
            books: [],
            others: []
        };
    }

    componentDidMount() {
        for (let i = 0; i < this.defaultTags.length; i++) {
            this.searchTerm(this.defaultTags[i]);
        }
    }

    searchTerm = (term) => {
        this.setState({loading: true});
        if (term !== "search") {

            axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${term}&per_page=24&format=json&nojsoncallback=1`)
                .then(response => {
                    let obj = {};
                    if (this.state.hasOwnProperty(term)) {
                        obj[term] = response.data.photos.photo;
                    } else {
                        obj["others"] = response.data.photos.photo;
                    }
                    obj["loading"] = false;
                    this.setState(obj);
                })
                .catch(error => console.error("Error fetching data: ", error));
        }
    }

    render() {
        return (
            <div className="container">
                <SearchForm/>
                <MainNavigation tagNames={["Tango", "Yoga", "Books"]}/>
                <Switch>
                    <Route exact path="/" render={() =>
                        <h3>Click on the tags above to see photos from my favourite topics or search another term</h3>}
                    />
                    <Route exact={true} path="/error/no-tags" component={NoTags}/>
                    <Route exact path="/:tag" render={(props) => {
                        if(props.match.params.tag === "search") {
                            return (<Redirect to="/error/no-tags"/>);
                        }
                        else if (this.state.hasOwnProperty(props.match.params.tag)) {
                            return (
                                <PhotoContainer tag={props.match.params.tag} photos={this.state[props.match.params.tag]}
                                                loading={this.state.loading}/>)
                        } else {
                            return (<PhotoContainer tag={props.match.params.tag} photos={this.state["others"]}
                                                    loading={this.state.loading} search={this.searchTerm}/>)
                        }
                    }}/>
                    <Route exact path="/search/:tag"
                           render={(props) => <PhotoContainer tag={props.match.params.tag} photos={this.state["others"]}
                                                              loading={this.state.loading} search={this.searchTerm}/>
                           }/>
                    <Route path="/404/page-not-found" exact={true} component={PageNotFound}/>
                    <Redirect to="/404/page-not-found"/>
                </Switch>
            </div>
        )
    }
}

export default App;
