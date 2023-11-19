import {useEffect} from "react";
import {WaiterI} from "../type";
import {WaiterItem} from "./WaiterItem";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Link} from "react-router-dom";
import {Page} from "../../../components/Page";
import {Filters} from "./Filters";
import {filteredWaiterListSelector} from "../store/selectors";
import {getListActionRequest} from "../store/reducer";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import {useStyles} from "./styles";
import {useColumns} from "./useColumns";

export function WaiterList(): React.ReactElement {
  const list = useAppSelector(filteredWaiterListSelector)
  const loading = useAppSelector((state) => state.waiter.listLoading)
  const error = useAppSelector((state) => state.waiter.listError)
  const dispatch = useAppDispatch()
  const { columns } = useColumns();
  const {classes} = useStyles();

  useEffect(() => {
    dispatch(getListActionRequest())
  }, [dispatch, getListActionRequest])

  return (
    <Page
      title='Waiter List'
      loading={loading}
      error={error}
    >
      <Stack spacing={2}>
        <Box className={classes.end}>
          <Link to="/waiter/create">
            <Button size="small" variant="outlined">Create</Button>
          </Link>
          <Filters/>
        </Box>

        <Box sx={{height: 400, width: '100%'}}>
          <DataGrid
            rows={list}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </Stack>
    </Page>
  );
}
