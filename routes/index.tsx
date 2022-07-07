/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/src/runtime/head.ts";
import { Handlers, PageProps} from "$fresh/server.ts"

const url: string = "https://api.coindesk.com/v1/bpi/currentprice.json";


export interface Price {
  time: Time
  disclaimer: string
  chartName: string
  bpi: Bpi
}

export interface Time {
  updated: string
  updatedISO: string
  updateduk: string
}

export interface Bpi {
  USD: Usd
  GBP: Gbp
  EUR: Eur
}

export interface Usd {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export interface Gbp {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export interface Eur {
  code: string
  symbol: string
  rate: string
  description: string
  rate_float: number
}

export const handler: Handlers<Price | null> = {
  async GET(_,ctx){
    const resp = await fetch(url);
    if(resp.status === 200){
      const price:Price = await resp.json();
      return ctx.render(price);
    }
    return ctx.render(null);
  }
}


export default function Home({data} : PageProps<Price|null>) {
  if(!data){
    return <h1>데이터가 없습니다</h1>
  }
  return (
    <div className={tw`w-screen h-screen bg-gray-900`}>
      <Head>
        <title>Fresh Blog</title>
      </Head>
      <div className={tw`p-8 mx-auto max-w-screen-md`}>
        <img
          src="/logo.svg"
          height="200px"
          class="mx-auto"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p className={tw`my-10 text(center 3xl white)`}>
          비트코인
        </p>
        <p className={tw`my-10 text(center 3xl white)`}>
          Bitcoin Price Checker
        </p>
        <p className={tw`my-10 text(center 2xl white)`}>
          USD: ${data.bpi.USD.rate}
        </p>
        <p className={tw`my-10 text(center 2xl white)`}>
          EUR: €{data.bpi.EUR.rate}
        </p>
        <p className={tw`my-10 text(center 2xl white)`}>
          GBP: £{data.bpi.GBP.rate}
        </p>
        <p className={tw`my-10 text(center md white)`}>
          Last Fetched at {data.time.updated}
        </p>
      </div>
    </div>

  );
}
