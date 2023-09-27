import React, {useEffect} from "react";
import {WaiterList} from "./WaiterList";
import {WaitersApi} from "./api/WaitersApi";
import {Waiter} from "./type";
import {FormEdit} from "./FormEdit";

export function WaiterApp() {
  const [list, setList] = React.useState<Waiter[]>([])

  useEffect(() => {
    WaitersApi.getList().then((waiterList) => {
      setList(waiterList)
    })
  }, [])

  const onWaiterSubmit = (waiter: Waiter) => {
    WaitersApi.create(waiter).then((newWaiter) => {
      setList([...list, newWaiter])
    })
  }

  return (
    <div>
      <FormEdit onWaiterSubmit={onWaiterSubmit} />
      <WaiterList list={list} />
    </div>
  );
}
