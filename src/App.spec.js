import {render} from '@testing-library/svelte';
import '@testing-library/jest-dom/extend-expect';
import App from './App.svelte';
describe('App', () => {
    test('message and input have always same values',  () => {
        const {container, getByText, getByTestId} = render(App);
        // const input = container.querySelector('input');
        // const button = container.querySelector('button');
    
        // initial state
        // expect(getByText('hi'));
        // expect(input.value).toBe('hi');
        const elem = getByTestId('text');
        expect(elem).toHaveTextContent('Hi');
    })
})