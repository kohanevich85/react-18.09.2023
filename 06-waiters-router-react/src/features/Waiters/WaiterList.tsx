import {WaiterI} from "./type";
import {WaiterItem} from "./WaiterItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getList} from "./store/thunks";
import {Link} from "react-router-dom";
import {Page} from "../../components/Page";
import {RootState} from "../../store";
import {Filters} from "./Filters";
import {filteredWaiterListSelector} from "./store/selectors";

export function WaiterList() {
    const list = useSelector(filteredWaiterListSelector)
    const loading = useSelector((state: RootState) => state.waiter.listLoading)
    const error = useSelector((state: RootState) => state.waiter.listError)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getList())
    }, [getList])

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
