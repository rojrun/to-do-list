import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import axios from 'axios';
import List from './list';
import AddItem from './add_item';
import ViewItem from './view_item';
import {BASE_URL, API_KEY} from '../config/api';
import NotFound from './404';

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
                <Switch>
                    <Route path="/" exact render={(props) => {
                        return <List {...props} delete={this.deleteItem} toDos={list}/>;
                    }}/>
                    <Route path="/add-item" render={(props) => {
                        return <AddItem {...props} add={this.addItem}/>;
                    }}/>
                    <Route path="/item/:item_id" component={ViewItem}/>

                    {/*<ToggleComplete put={this.toggleComplete}/>*/}

                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;
