import {WaiterI} from "./type";
import {WaiterItem} from "./WaiterItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getList} from "./store/thunks";

export function WaiterList() {
    const list = useSelector((state: any) => state.waiter.list)
    const loading = useSelector((state: any) => state.waiter.listLoading)
    const error = useSelector((state: any) => state.waiter.listError)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(getList())
    }, [getList])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div style={{ color: 'red'}}>{error.message}</div>
    }

    return (
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
    );
}
