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
    survey_q5: '', survey_q6: '', survey_q7: [] as string[], survey_q8: [] as string[], survey_q9: '', survey_q10: '',
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
            {['価格に対してお客様の納得を得るのが難しい','他社類似製品との差別化説明が難しい','自分自身の商品知識・成分知識が不足している','新規顧客への入口商品として提案しにくい','リピート購入につながりにくい','SNS・オンラインでの発信方法がわからない','特に課題は感じていない'].map(v => (
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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">５．現在の月間販売量（本数・使用量）はどの程度ですか？</label>
            {['月1本から5本程度','月6本から15本程度','月16本から30本程度','月31本から50本程度','月51本以上','現在はほぼ販売できていない'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="radio" name="survey_q5" checked={form.survey_q5 === v} onChange={() => set('survey_q5', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">６．ケイ素商品を購入されるお客様の年代・傾向として最も多いのはどれですか？</label>
            {['20〜30代（健康意識・美容意識の高い若年層）','40〜50代（更年期・健康管理意識層）','60代以上（慢性的な健康課題を持つシニア層）','年代は幅広い（特定の年代傾向なし）','ペット・植物向けでエンドユーザー年代は不問','まだ顧客データが十分ではない'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="radio" name="survey_q6" checked={form.survey_q6 === v} onChange={() => set('survey_q6', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">７．商品の情報収集・学習において、どのような形式が最も使いやすいですか？（複数選択可）</label>
            {['PDF・テキスト資料（自分のペースで読める）','動画コンテンツ（YouTube・限定動画）','オンラインセミナー（Zoom等のライブ形式）','対面での集合研修・勉強会','LINEグループ・チャットでの情報共有','専用アプリ・会員サイトでの一元管理','どれでも対応できる'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q7.includes(v)} onChange={() => toggle('survey_q7', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">８．販売ライセンス取得後、あなたが最も期待するサポートはどれですか？（複数選択可）</label>
            {['販売促進ツール（チラシ・POPのデータ提供）','SNS投稿用テンプレート・画像素材の提供','お客様向け説明資料・パンフレットの提供','個別の販売相談・コンサルティングサポート','仕入れコスト・数量割引などの優遇制度','販売者同士の交流・情報交換コミュニティ','定期的な勉強会・最新情報のアップデート提供','自店舗でのセミナー・体験会開催サポート'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="checkbox" checked={form.survey_q8.includes(v)} onChange={() => toggle('survey_q8', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">９．今後、ケイ素商品の販売規模をどのように展開したいと考えていますか？</label>
            {['現状維持（今の規模で安定して販売できればよい）','少しずつ拡大したい（年20〜30%増程度）','積極的に拡大したい（販売の柱にしていきたい）','自分でもサブの販売者・紹介者を増やしたい','ケイ素専門のオンライン販売チャネルを立ち上げたい','まず今年は販売の基礎を固めることを優先したい'].map(v => (
              <label key={v} className="flex items-center gap-2 mt-1 cursor-pointer">
                <input type="radio" name="survey_q9" checked={form.survey_q9 === v} onChange={() => set('survey_q9', v)} />
                {v}
              </label>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">１０．◆自由記述◆　現在の販売活動において感じていること、サポートに期待すること、講習・試験制度への率直なご意見・ご要望を自由にお書きください。</label>
            <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32" value={form.survey_q10} onChange={e => set('survey_q10', e.target.value)} />
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