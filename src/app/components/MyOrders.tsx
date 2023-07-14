import { env } from 'node:process'
import { Order } from '../models'
import {
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TableBody,
  Badge
} from './flowbite-components'
import Link from 'next/link'

async function getOrders(wallet_id: string): Promise<Order[]> {
  const response = await fetch(`${env.API_URL}/wallets/${wallet_id}/orders`, {
    next: {
      tags: [`orders-wallet-${wallet_id}`],
      //revalidate: isHomeBrokerClosed() ? 60 * 60 : 5 // production
      revalidate: 1 // development
    }
  })
  return response.json()
}

export default async function MyOrders(props: { wallet_id: string }) {
  const orders = await getOrders(props.wallet_id)
  return (
    <div>
      <article className="format format-invert">
        <h2>Minha ordens</h2>
      </article>
      <Table className="mt-2">
        <TableHead>
          <TableHeadCell>asset_id</TableHeadCell>
          <TableHeadCell>quant.</TableHeadCell>
          <TableHeadCell>price</TableHeadCell>
          <TableHeadCell>tipo</TableHeadCell>
          <TableHeadCell>status</TableHeadCell>
        </TableHead>
        <TableBody>
          {orders &&
            orders.map((order, key) => {
              return (
                <TableRow className=" border-gray-700 bg-gray-800" key={key}>
                  <TableCell className="whitespace-nowrap font-medium text-white">
                    {order.Asset.id}
                  </TableCell>
                  <TableCell>{order.shares}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    <Badge>{order.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{order.status}</Badge>
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
