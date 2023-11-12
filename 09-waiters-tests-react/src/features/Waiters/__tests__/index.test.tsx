import React from "react";
import {render, screen, waitForElementToBeRemoved, act} from "../../../utils/test-utils";
import userEvent from '@testing-library/user-event'
import {WaiterApp} from "../index";
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {URL} from "../api/server";

const HEADER_COUNT = 1;
const mockedWaiter = [
    {
        "id": 1,
        "firstName": "Denys",
        "phone": "+380 77 777 77 77",
    },
    {
        "id": 2,
        "firstName": "Maksym",
        "phone": "+18 02 626 27 88"
    },
    {
        "id": 3,
        "firstName": "Igor",
        "phone": "+48 88 888 88 88"
    },
]

export const handlers = [
    rest.get(URL, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(mockedWaiter),
        )
    }),
]

const server = setupServer(...handlers)

describe('<WaiterApp/>', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen())

    // Disable API mocking after the tests are done.
    afterAll(() => server.close())

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers())

    it('should render table with rows', async () => {
        render(<WaiterApp/>);

        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        const rows = screen.getAllByRole('row');

        expect(rows).toHaveLength(mockedWaiter.length + HEADER_COUNT);
    });

    it('should filter elements when "Phone Filter" is applied', async () => {
        render(<WaiterApp/>);
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

        const filterBtn = screen.getByRole('button', {name: /UA Phone/});

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await userEvent.click(filterBtn);
        });

        const rows = screen.getAllByRole('row');
        expect(rows[1].innerHTML).toContain(mockedWaiter[0].firstName);
    });
});
