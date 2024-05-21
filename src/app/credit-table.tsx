import * as Table from '~/components/ui/table'
import { format, parseISO } from 'date-fns';

export const CreditTable = ( { data, ...props } ) => {

  return (
    <Table.Root {...props}>
      <Table.Head>
        <Table.Row>
          <Table.Header>Date</Table.Header>
          <Table.Header>Number of Credits</Table.Header>
          <Table.Header>Price</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map((product, index) => (
          <Table.Row key={index}>
            <Table.Cell>{format(parseISO(product.purchaseDate), 'MMM dd, yyyy hh:mm a')}</Table.Cell>
            <Table.Cell>{product.credits}</Table.Cell>
            <Table.Cell>${product.price / 100}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}