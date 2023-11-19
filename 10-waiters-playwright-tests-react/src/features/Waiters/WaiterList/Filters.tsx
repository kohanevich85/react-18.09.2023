import {useSearchParams} from "react-router-dom";
import {FILTER} from "../constants";
import {useEffect} from "react";
import {setFilterAction} from "../store/reducer";
import {useDispatch, useSelector} from "react-redux";
import Button from '@mui/material/Button';
import {ButtonGroup} from "@mui/material";
import {filterSelector} from "../store/selectors";

export function Filters() {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter')
    const selectedFilter = useSelector(filterSelector)
    const setFilter = (val: FILTER) => setSearchParams(`filter=${val}`)
    const isActive = (val: FILTER) => val === selectedFilter


    useEffect(() => {
        if (filter) {
            dispatch(setFilterAction(filter as FILTER))
        }
    }, [filter])

    return (
        <ButtonGroup size="small" variant="outlined" aria-label="outlined button group">
            <Button disabled={isActive(FILTER.ALL)} onClick={() => setFilter(FILTER.ALL)}>All</Button>
            <Button disabled={isActive(FILTER.UA)} onClick={() => setFilter(FILTER.UA)}>UA Phone</Button>
            <Button disabled={isActive(FILTER.US)} onClick={() => setFilter(FILTER.US)}>US Phone</Button>
            <Button disabled={isActive(FILTER.OTHER)} onClick={() => setFilter(FILTER.OTHER)}>Others</Button>
        </ButtonGroup>
    )
}
