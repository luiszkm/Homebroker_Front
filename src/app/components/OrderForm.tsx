import { Button, Label, TextInput } from '../components/flowbite-components'
import { revalidateTag } from 'next/cache'
import { env } from 'node:process'

async function initTransaction(formData: FormData) {
  "use server";
  const shares = formData.get('shares')
  const price = formData.get('price')
  const asset_id = formData.get('asset_id')
  const wallet_id = formData.get('wallet_id')
  const type = formData.get('type')

  const response = await fetch(`${env.API_URL}/wallets/${wallet_id}/orders`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      shares,
      price,
      asset_id,
      wallet_id,
      type,
      status: 'OPEN',
      Asset: {
        id: asset_id,
        symbol: 'PETR4',
        price: 30
      }
    })
  })
  revalidateTag(`orders-wallet-${wallet_id}`)
  return await response.json()
}

export function OrderForm(props: {
  asset_id: string
  wallet_id: string
  type: 'BUY' | 'SELL'
}) {
  return (
    <div>
      <h1>Order Form</h1>
      <form action={initTransaction}>
        <input name="asset_id" type="hidden" defaultValue={props.asset_id} />
        <input name="wallet_id" type="hidden" defaultValue={props.wallet_id} />
        <input name="type" type="hidden" defaultValue={'BUY'} />
        <div>
          <div className="mb-2 block" />
          <Label htmlFor="shares" value="Quantidade" />
        </div>
        <TextInput
          id="shares"
          name="shares"
          type="number"
          required
          min={1}
          step={1}
          defaultValue={1}
        />
        <br />
        <div>
          <div className="mb-2 block" />
          <Label htmlFor="price" value="Preço" />
        </div>
        <TextInput
          id="price"
          name="price"
          type="number"
          required
          min={1}
          step={0.1}
          defaultValue={1}
        />
        <br />
        <Button type="submit" color={props.type ==="BUY"? "success": "red"}
        >{props.type === "BUY" ? "Copmprar": "Vender"} Ativos</Button>
      </form>
    </div>
  )
}
