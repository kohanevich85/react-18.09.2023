import {GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import {EditBtn} from "./Actions/EditBtn";
import {DeleteBtn} from "./Actions/DeleteBtn";
import {WaiterI} from "../type";

export function useColumns() {
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 2,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params: GridRenderCellParams<WaiterI>) => (
        <Stack spacing={2} direction="row">
          <EditBtn waiter={params.row}/>
          <DeleteBtn waiter={params.row}/>
        </Stack>
      ),
      flex: 1,
    },
  ];

  return {
    columns,
  }
}
