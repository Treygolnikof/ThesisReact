import React from 'react';
import FilterPanel from './filterPanel';
import {shallow} from 'enzyme';

describe('Testing <FilterPanel/>', () => {
    const item = shallow(<FilterPanel/>);

    it('FilterPanel have rendered correctly', () => {
        expect(item).toMatchSnapshot();
    })
})