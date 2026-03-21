'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PREFECTURES = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県']

export default function RegisterPage({ params }: { params: { month: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', furigana: '', email: '', phone: '',
    prefecture: '', agency: '',
    survey_q1: '', survey_q2: [] as string[], survey_q3: [] as string[], survey_q4: [] as string[],
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))
  const toggle = (k: string, v: string) => setForm(f => {
    const arr = (f as any)[k] as string[]
    return { ...f, [k]: arr.includes(v) ? arr.filter((x: string) => x !== v) : [...arr, v] }
  })

  const handleSubmit = async () => {
    if (!form.name || !form.furigana || !form.email || !form.phone || !form.prefecture || !form.agency) {
      alert('必須項目をすべて入力してください')
      return
    }
    setLoading(true)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, desired_month: `2026年${params.month}月` }),
    })
    setLoading(false)
    if (res.ok) router.push('/complete')
    else alert('送信に失敗しました。もう一度お試しください。')
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">販売者認定講習・試験</h1>
        <p className="text-center text-blue-600 font-semibold mb-6">2026年{params.month}月 申込みフォーム</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">氏名 <span className="text-red-500">*</span></label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">フリガナ <span className="text-red-500">*</span></label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={form.furigana} onChange={e => set('furigana', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">メールアドレス <span className="text-red-500">*</span></label>
            <input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">電話番号 <span className="text-red-500">*</span></label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={form.phone} onChange={e => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">都道府県 <span className="text-red-500">*</span></label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={form.prefecture} onChange={e => set('prefecture', e.target.value)}>
              <option value="">選択してください</option>
              {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">所属代理店名 <span className="text-red-500">*</span></label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2" value={form.agency} onChange={e => set('agency', e.target.value)}>
                                        <option value="">選択してください</option>
                                                          {['牛王田雅章','川上利夫','藤井佑昴','池尾里絵'].map(a =>
                                                                              <option key={a} value={a}>{a}</option>
                                                                                                )}
                                                                                                                </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Q1. 今回の講習を知ったきっかけ</label>
            <input className="w-full border border-gray-300 rounded-lg px-3 py-2" value={form.survey_q1} onChange={e => set('survey_q1', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Q2. 受講の目的（複数選択可）</label>
            {['資格取得','スキルアップ','会社からの指示','更新のため','その他'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q2.includes(v)} onChange={() => toggle('survey_q2', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Q3. 過去の受講経験（複数選択可）</label>
            {['初めて','1回','2〜3回','4回以上'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q3.includes(v)} onChange={() => toggle('survey_q3', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Q4. 希望する講習形式（複数選択可）</label>
            {['会場受講','オンライン','どちらでも可'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q4.includes(v)} onChange={() => toggle('survey_q4', v)} />
                {v}
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? '送信中...' : '申込む'}
        </button>
      </div>
    </main>
  )
}