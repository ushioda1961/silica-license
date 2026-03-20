'use client'
import { useRouter } from 'next/navigation'

const months = [
  { label: '2026年9月', value: '9', desc: '2026年9月開催', color: 'from-teal-600 to-teal-700' },
    { label: '2026年10月', value: '10', desc: '2026年10月開催', color: 'from-blue-600 to-blue-700' },
      { label: '2026年11月', value: '11', desc: '2026年11月開催', color: 'from-indigo-600 to-indigo-700' },
      ]

      export default function Home() {
        const router = useRouter()
          return (
              <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                    <header className="bg-slate-800 text-white py-4 px-6">
                            <div className="max-w-3xl mx-auto">
                                      <p className="text-xs text-slate-400 uppercase tracking-widest">LICENSE RENEWAL REGISTRATION</p>
                                                <h1 className="text-xl font-bold">販売者認定講習・試験 申込みフォーム</h1>
                                                        </div>
                                                              </header>
                                                                    <main className="max-w-3xl mx-auto py-12 px-6">
                                                                            <div className="text-center mb-10">
                                                                                      <h2 className="text-2xl font-bold text-slate-800 mb-2">受講月を選んでください</h2>
                                                                                                <p className="text-slate-500">希望の月の「申込む」ボタンを押してください</p>
                                                                                                        </div>
                                                                                                                <div className="grid gap-6">
                                                                                                                          {months.map((m) => (
                                                                                                                                      <div key={m.value} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                                                                                                                                                    <div>
                                                                                                                                                                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">認定講習・認定試験</p>
                                                                                                                                                                                    <p className="text-2xl font-bold text-slate-800">{m.label}</p>
                                                                                                                                                                                                    <p className="text-sm text-slate-500 mt-1">講習・試験</p>
                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                <button
                                                                                                                                                                                                                                                onClick={() => router.push(`/register/${m.value}`)}
                                                                                                                                                                                                                                                                className={`bg-gradient-to-r ${m.color} text-white px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-md`}
                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                              この月で申込む →
                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                </main>
                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                      )
                                                                                                                                                                                                                                                                                                                                                      }