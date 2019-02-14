import React from 'react';
import SearchPanel from './searchPanel';
import {shallow} from 'enzyme';

describe('Testing <SearchPanel/>', () => {
    const item = shallow(<SearchPanel/>);

    it('SearchPanel have rendered correctly', () => {
        expect(item).toMatchSnapshot();
    })

    it('SearchPanel state "item" is empty object', () => {
        expect(item.state().term).toBeNil();
    })
})