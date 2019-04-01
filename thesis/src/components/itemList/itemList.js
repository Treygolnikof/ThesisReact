import React, {Component} from 'react';
import CoffeeService from '../../services/coffeeService';
import Spinner from '../spinner'; 
import ErrorMessage from '../errorMessage';

import './itemList.css';

export default class ItemList extends Component {
    coffeeService = new CoffeeService();

    state = {
        item: null,
        error: false
    }

    onItemLoaded = (item) => {
        this.setState ({
            item
        })
    }

    onError = () => {
        this.setState({
            error: true
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
        if (filter !== '' && filter !== 'all') {
            return items.filter(item => item.country === filter);
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
                    >
                    <div id="card-front" className="card">
                        <img src={url} alt="coffee"/>
                    </div>
                    <div id="card-back" className="card">
                        <span className={this.props.classItem + '__item-title'}>{name}</span>
                        {country &&
                            <span className={this.props.classItem + '__item-country'}>Country: {country}</span>
                        }
                        <span className={this.props.classItem + '__item-price'}>Price: {price}</span>
                        <button className="best__btn text-decoration-none" onClick = {() => this.props.onItemSelected(item)}>More</button>
                    </div>
                </div>
            )
        })
    }
    
    render() {
        const {item, error} = this.state;
        const {term, filter} = this.props;

        let visibleItems = '';

        if(error) {
            return (
                <div className={this.props.classItem + '__wrapper'}>
                    <ErrorMessage/>
                </div>
            )
        }

        if (!item) {
            return (
                <div className={this.props.classItem + '__wrapper'}>
                    <Spinner/>
                </div>
            );
        } 

        if (item[0].country) {
            visibleItems = this.filterItem(this.searchItem(item, term), filter);
        } else {
            visibleItems = item;
        }
        
        const items = this.renderItems(visibleItems);

        if (items.length === 0) {
            return (
                <div className={this.props.classItem + '__wrapper'}>
                    <ErrorMessage/>
                </div>
            )
        }

        return (
            <div className={this.props.classItem + '__wrapper'}>
                {items}
            </div>
        );
    }
}