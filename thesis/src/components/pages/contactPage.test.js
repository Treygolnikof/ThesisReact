import React from 'react';
import ContactPage from './contactPage';
import {shallow} from 'enzyme';

describe('Testing <ContactPage/>', () => {
    const item = shallow(<ContactPage/>);

    it('ContactPage have rendered correctly', () => {
        expect(item).toMatchSnapshot();
    })

    it('ContactPage state "error" is false', () => {
        expect(item.state().error).toBeFalsy();
    })

    it('ContactPage state "loading" is true', () => {
        expect(item.state().loading).toBeFalsy();
    })

    it('ContactPage state "success" is true', () => {
        expect(item.state().success).toBeFalsy();
    })

    it('ContactPage state "item" is empty object', () => {
        expect(item.state().value).toBeNil();
    })
    
    it('Testing onSuccess', () => {
        item.instance().onSuccess();
        expect(item.state().success).toBeTruthy();
        expect(item.state().loading).toBeFalsy();
    })

    it('Testing onError', () => {
        item.instance().onError();
        expect(item.state().error).toBeTruthy();
        expect(item.state().loading).toBeFalsy();
    })

    it('Testing onBack', () => {
        item.instance().onBack();
        expect(item.state().success).toBeFalsy();
    })
})