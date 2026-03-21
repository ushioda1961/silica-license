'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window { paypal: any }
}

const PAYPAL_CLIENT_ID = 'AZh8WBCrUQZjr84i-nMj1JxPrEfia4XNhGeN3p5jUdWjehKiYEmgZNiLDEWl'
const AMOUNT = '5500'

export default function CompletePage() {
  const paypalRef = useRef<HTMLDivElement>(null)
  const rendered = useRef(false)

  useEffect(() => {
    if (rendered.current) return
    rendered.current = true

    const script = document.createElement('script')
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=JPY`
    script.async = true
    script.onload = () => {
      if (!paypalRef.current) return
      window.paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'pay',
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: { value: AMOUNT, currency_code: 'JPY' },
              description: '販売者認定講習・試験 受講料',
            }],
          })
        },
        onApprove: async (_data: any, actions: any) => {
          await actions.order.capture()
          alert('お支払いが完了しました！ありがとうございます。')
        },
        onError: (err: any) => {
          console.error(err)
          alert('決済中にエラーが発生しました。もう一度お試しください。')
        },
      }).render(paypalRef.current)
    }
    document.body.appendChild(script)
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          申込みが完了しました
        </h1>
        <p className="text-gray-600 mb-6">
          ご登録のメールアドレスに確認メールをお送りしました。
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-700 font-semibold mb-1">受講料お支払い</p>
          <p className="text-3xl font-bold text-blue-800 mb-1">¥5,500</p>
          <p className="text-xs text-blue-600">下記よりお支払いをお願いします</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">💳 PayPalでお支払い</p>
          <div ref={paypalRef} />
        </div>

        <div className="border-t pt-4 mt-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">📱 PayPayでお支払い</p>
          <p className="text-xs text-gray-500 bg-gray-100 rounded-lg p-3">
            PayPay決済は現在準備中です。<br />まもなくご利用いただけます。
          </p>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          ご不明な点はお問い合わせください。
        </p>
      </div>
    </main>
  )
}