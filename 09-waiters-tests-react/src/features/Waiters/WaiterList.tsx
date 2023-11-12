import {WaiterI} from "./type";
import {WaiterItem} from "./WaiterItem";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Link} from "react-router-dom";
import {Page} from "../../components/Page";
import {Filters} from "./Filters";
import {filteredWaiterListSelector} from "./store/selectors";
import {getListActionRequest} from "./store/reducer";

export function WaiterList() {
    const list = useAppSelector(filteredWaiterListSelector)
    const loading = useAppSelector((state) => state.waiter.listLoading)
    const error = useAppSelector((state) => state.waiter.listError)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getListActionRequest())
    }, [dispatch, getListActionRequest])

    return (
        <Page
            title='Waiter List'
            loading={loading}
            error={error}>
            <div>
                <Link to="/waiter/create"><button>Create</button></Link>
            </div>
            <Filters />
            <table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {list.map((waiter: WaiterI) => (
                    <WaiterItem
                        waiter={waiter}
                        key={waiter.id}
                    />
                ))}
                </tbody>
            </table>
        </Page>
    );
}
