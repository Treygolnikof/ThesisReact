import React, {Component} from 'react';
import CoffeeService from '../../services/coffeeService';
import Spinner from '../spinner'; 

import './itemList.css';

export default class ItemList extends Component {
    coffeeService = new CoffeeService();

    state = {
        item: null
    }

    onItemLoaded = (item) => {
        this.setState ({
            item, 
            loading: false
        })
    }

    onError = (err) => {
        this.setState({
            errorNumber: err,
            error: true,
            loading: false
        })
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then(this.onItemLoaded)
            .catch((res) => {
                this.onError(res.message);
            }); 
    }

    searchItem(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        });
    }

    filterItem(items, filter) {
        if (filter === 'Brazil') {
            return items.filter(item => item.country === "Brazil");
        } else if (filter === 'Columbia') {
            return items.filter(item => item.country === "Columbia");
        } else if (filter === 'Kenya') {
            return items.filter(item => item.country === "Kenya");
        } else {
            return items;
        }
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {name, url, price, country} = item;

            return (
                <div 
                    key={name} 
                    className={this.props.classItem + '__item'}
                    onClick = {() => this.props.onItemSelected(item)}
                    >
                    <img src={url} alt="coffee"/>
                    <div className={this.props.classItem + '__item-title'}>{name}</div>
                    {country &&
                        <div className={this.props.classItem + '__item-country'}>{country}</div>
                    }
                    <div className={this.props.classItem + '__item-price'}>{price}</div>
                </div>
            )
        })
    }
    
    render() {
        const {item} = this.state;
        const {term, filter} = this.props;

        let visibleItems = '';

        if (!item) {
            return <Spinner/>;
        }

        if (item[0].country) {
            visibleItems = this.filterItem(this.searchItem(item, term), filter);
        } else {
            visibleItems = item;
        }

        const items = this.renderItems(visibleItems);

        return (
            <>
                {items}
            </>
        );
    }
}