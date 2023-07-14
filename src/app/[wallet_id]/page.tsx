import MyWallet  from '../components/MyWallet'

export default async function HomePage({
  params
}: {
  params: { wallet_id: string }
}) {
  return (
    <main className='container mx-auto PX-2'>
      <article className=' format format-invert'>
        <h1>Meus Investimentos</h1>
        </article>
      <h1></h1>
      <MyWallet wallet_id={params.wallet_id} />
    </main>
  )
}
