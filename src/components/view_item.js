import React, {Component} from 'react';
import axios from 'axios';
import {BASE_URL, API_KEY} from '../config/api';

class ViewItem extends Component {
    async componentDidMount() {
        console.log("item id:", this.props.match.params.item_id);
        const resp = await axios.get(`${BASE_URL}/${this.props.match.params.item_id + API_KEY}`);
        console.log("get item response:", resp);
    }

    render(){
        console.log("view item props:", this.props);
        return (
            <div>
                <h1 className="center">View Item</h1>
            </div>
        );
    }
}

export default ViewItem;
