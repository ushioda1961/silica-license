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
            <label className="block text-sm font-semibold text-gray-700 mb-2">１．あなたは認定試験に合格したのは何年前ですか？</label>
            {['去年','2年前','3年前','4年前','5年前以降','未受験'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q1.includes(v)} onChange={() => toggle('survey_q1', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">２．あなたのご職業・ビジネスジャンルをお選び下さい</label>
            {['整体師・カイロプラクター・鍼灸師などの手技療法系','エステ・美容サロンオーナー','ヒーラー・チャネラー・占い師などのスピリチュアル系','クリニック・歯科・医療関連','飲食店・カフェ・レストランオーナー','雑貨・健康食品などの物販店舗オーナー','オンライン販売（ECサイト・SNS）専業','その他'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q2.includes(v)} onChange={() => toggle('survey_q2', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">３．お客様への販売において、現在最も大きな課題はどれですか？（複数選択可）</label>
            {['商品の科学的根拠・エビデンスの説明が難しい','価格に対してお客様の納得を得るのが難しい','他社類似製品との差別化説明が難しい','自分自身の商品知識・成分知識が不足している','新規顧客への入口商品として提案しにくい','リピート購入につながりにくい','SNS・オンラインでの発信方法がわからない','特に課題は感じていない'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q3.includes(v)} onChange={() => toggle('survey_q3', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">４．認定講習を通じて、最も強化したい知識・スキルは何ですか？（複数選択可）</label>
            {['ケイ素の成分・科学的メカニズムの深い理解','体質別・症状別の具体的な活用提案の方法','お客様への効果的なセールストーク・説明話法','SNS・ブログ等での情報発信・集客方法','他商品・他サービスとの組み合わせ提案','クレーム対応・注意事項の知識','新規顧客の開拓方法','販売実績を上げた成功事例・ロールプレイング'].map(v => (
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