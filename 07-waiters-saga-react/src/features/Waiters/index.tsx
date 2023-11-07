import {WaiterList} from "./WaiterList";
import {FormEdit} from "./FormEdit";
import {Routes, Route} from "react-router-dom";
import {NotFound} from "../NotFound";

export function WaiterApp() {
    return (
        <Routes>
            <Route path="/" element={<WaiterList/>}/>
            <Route path="/create" element={<FormEdit/>}/>
            <Route path="/edit/:id" element={<FormEdit/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}
