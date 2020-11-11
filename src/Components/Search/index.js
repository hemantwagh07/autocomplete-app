import axios from 'axios';
import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: '',
            searchResults: []
        }
    }
    getSuggestion(search) {
        axios.get(`http://localhost:8000/posts?title_like=${search}`)
            .then((response) => {
                this.setState({ searchResults: response.data });
            }).catch(function (error) {
                console.error('Something went wrong retrieving list. Please try again', error);
            })
    }

    changeHandler = (e) => {
        let txtval = e.target.value;
        if (txtval !== "") {
            this.getSuggestion(txtval);
        } else {
            this.setState({ searchResults: [] });
        }
    }

    render() {
        return (
            <div>
                <div className="search-wrapper">
                    <h5>Search User</h5>
                    <input type="text" name="userName" onChange={this.changeHandler} />
                    <div className="suggestions">
                        {this.state.searchResults.map((result) => (
                            <div key={Math.random(100)}>{result.title}</div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}
