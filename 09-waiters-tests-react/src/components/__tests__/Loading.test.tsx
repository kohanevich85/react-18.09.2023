import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {Loading} from "../Loading";

const loadingText = 'Loading...';

function renderLoading() {
    render(
        <Loading/>
    );
}

describe('<Loading/>', () => {
    it('should render Loading message', () => {
        renderLoading();

        let loading = screen.getByText(loadingText);

        expect(loading).toBeInTheDocument();
    });
});
