import '@testing-library/react/cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import { render } from '@testing-library/react'
import useTable from './useTable'

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(
          (row, i) =>
            prepareRow(row) || (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
        )}
      </tbody>
    </table>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const data = React.useMemo(
    () => [
      {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 29,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
      },
    ],
    []
  )

  return <Table columns={columns} data={data} />
}

test('renders a basic table', () => {
  const { getByText } = render(<App />)

  expect(getByText('tanner')).toBeInTheDocument()
  expect(getByText('linsley')).toBeInTheDocument()
  expect(getByText('29')).toBeInTheDocument()
  expect(getByText('100')).toBeInTheDocument()
  expect(getByText('In Relationship')).toBeInTheDocument()
  expect(getByText('50')).toBeInTheDocument()
})