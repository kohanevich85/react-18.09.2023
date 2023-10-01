import React from "react";
import {WaiterList} from "./WaiterList";
import {FormEdit} from "./FormEdit";
import {useWaiter} from "./hooks/useWaiter";

export function WaiterApp() {
    const {editingWaiter, list, onWaiterSubmit, deleteWaiter, editWaiter} = useWaiter()

    return (
        <div>
            <FormEdit waiter={editingWaiter} onWaiterSubmit={onWaiterSubmit}/>
            <WaiterList list={list} deleteWaiter={deleteWaiter} editWaiter={editWaiter}/>
        </div>
    );
}
