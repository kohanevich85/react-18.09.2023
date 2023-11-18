import React from "react";
import {Alert} from "../Alert";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";

const alertText = 'Alert text';

function renderAlert() {
    render(
        <Alert message={alertText}/>
    );
}

describe('<Alert/>', () => {
    it('should render alert message', () => {
        renderAlert();

        let alert = screen.getByText(alertText);

        expect(alert).toBeInTheDocument();
    });
});
