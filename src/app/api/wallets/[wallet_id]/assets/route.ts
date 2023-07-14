import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export async function GET(
  request: NextRequest,
  { params }: { params: { wallet_id: string } }
) {
  const response = await fetch(
   // `${env.API_URL}/wallets/${params.wallet_id}/assets`,
   `http://host.docker.internal:3002/wallets/${params.wallet_id}/assets`,
    {
      //cache: 'no-store', processamento sempre dinamico
      next: {
        //revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
        revalidate: 1,
      },
    }
  );
  return NextResponse.json(await response.json());
}