import React from 'react';
import {Loading} from "./Loading";
import {Alert} from "./Alert";

interface PropsI {
  title: string,
  loading?: boolean,
  error?: string,
  children: React.ReactNode
}

export function Page({ title, error, loading, children }: PropsI) {
  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>{title}</h1>
      {loading && <Loading />}
      {error && <Alert message={error} />}
      {!loading && !error && children}
    </div>
  )
}