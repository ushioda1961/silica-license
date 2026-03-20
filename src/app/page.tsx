import Link from 'next/link'

export default function Home() {
  const months = ['9', '10', '11']

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                                販売者認定講習・試験
                                        </h1>
                                                <h2 className="text-lg text-center text-gray-600 mb-8">
                                                          申込みフォーム
                                                                  </h2>
                                                                          <p className="text-center text-gray-600 mb-6">
                                                                                    受講月を選んでください
                                                                                            </p>
                                                                                                    <p className="text-sm text-center text-gray-500 mb-8">
                                                                                                              希望の月の「申込む」ボタンを押してください
                                                                                                                      </p>
                                                                                                                              <div className="space-y-4">
                                                                                                                                        {months.map((month) => (
                                                                                                                                                    <div key={month} className="border rounded-xl p-4 flex items-center justify-between">
                                                                                                                                                                  <div>
                                                                                                                                                                                  <p className="font-semibold text-gray-800">
                                                                                                                                                                                                    認定講習・認定試験講習
                                                                                                                                                                                                                    </p>
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