import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import React, {Component} from 'react';
import {Route} from "react-router-dom";
import axios from 'axios';
import List from './list';
import AddItem from './add_item';

const BASE_URL = 'http://api.reactprototypes.com/todos';
const API_KEY = '?key=rungsisullatanont';

class App extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        this.getListData();
    }

    addItem = async (item) => {
        await axios.post(BASE_URL + API_KEY, item);

        await this.getListData();
    }

    async getListData(){
        //Call server to get list data, http://api.reactprototyes.com/todos?key=c918_demouser
        // axios.get(BASE_URL + API_KEY).then((response) => {
        //     console.log('Get Todos Response:', response);
        // }).catch((err) => {
        //     console.log('Error getting list data:', err.message);
        // });
        try {
            const resp = await axios.get(BASE_URL + API_KEY);
            console.log('Get Data Response:', resp);
            this.setState({
                list: resp.data.todos
            });
        } catch(err){
            console.log('Something went wrong in getListData:', err.message);
        }
    }

    deleteItem = async (id) => {
        await axios.delete(`${BASE_URL}/${id + API_KEY}`);
        this.getListData();
    }

    toggleComplete = async (id) => {
        await axios.put(`${BASE_URL}/${id + API_KEY}`);
        this.getListData();
    }

    render() {
        const {list} = this.state;
        return (
            <div className="container">
                <Route path="/" exact render={(props) => {
                    return <List {...props} delete={this.deleteItem} toDos={list}/>;
                }}/>
                <Route path="/add-item" render={(props) => {
                    return <AddItem {...props} add={this.addItem}/>;
                }}/>

                {/*<ToggleComplete put={this.toggleComplete}/>*/}
            </div>
        );
    }
}

export default App;
