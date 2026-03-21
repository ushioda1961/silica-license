import Link from 'next/link'

export default function Home() {
  const months = ['9', '10', '11']
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          販売ライセンス更新用認定講習・試験
        </h1>
        <h2 className="text-lg text-center text-gray-600 mb-6">
          申込みフォーム
        </h2>

        {/* 受講料案内バナー */}
        <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4 mb-6">
          <p className="text-center text-amber-800 font-bold text-base mb-2">💰 受講料・受験料について</p>
          <p className="text-center text-2xl font-extrabold text-amber-700 mb-2">¥5,500（税込）</p>
          <ul className="text-sm text-amber-700 space-y-1">
            <li className="flex items-start gap-1"><span>✅</span><span>受講料・受験料は毎回 <strong>¥5,500</strong> がかかります</span></li>
            <li className="flex items-start gap-1"><span>✅</span><span>不合格の場合も、翌月以降に<strong>再チャレンジ可能</strong>です</span></li>
            <li className="flex items-start gap-1"><span>⚠️</span><span>再受講・再受験の場合も <strong>¥5,500</strong> が必要です</span></li>
          </ul>
        </div>

        <p className="text-center text-gray-600 mb-3">受講月を選んでください</p>
        <p className="text-sm text-center text-gray-500 mb-6">
          希望の月の「申込む」ボタンを押してください
        </p>
        <div className="space-y-4">
          {months.map((month) => (
            <div key={month} className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">認定講習・認定試験講習</p>
                <p className="text-sm text-gray-500">2026年{month}月</p>
              </div>
              <Link
                href={`/register/${month}`}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                申込む
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}