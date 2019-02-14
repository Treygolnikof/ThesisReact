import React from 'react';
import ItemList from './itemList';
import {shallow} from 'enzyme';
import CoffeeService from '../../services/coffeeService';

const coffeeService = new CoffeeService();

describe('Testing <ItemList/>', () => {
    const item = shallow(<ItemList getData = {coffeeService.getCoffee}/>);

    it('ItemList have rendered correctly', () => {
        expect(item).toMatchSnapshot();
    })

    it('ItemList state "error" is false', () => {
        expect(item.state().error).toBeFalsy();
    })

    it('ItemList state "item" is empty object', () => {
        expect(item.state().item).toBeNil();
    })
    
    it('Testing onItemLoaded', () => {
        item.instance().onItemLoaded();
    })

    it('Testing onError', () => {
        item.instance().onError();
        expect(item.state().error).toBeTruthy();
    })
})