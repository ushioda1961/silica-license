'use client'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

const PREFECTURES = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県']
const AGENCIES = ['牛王田雅章','川上利夫','藤井佑弥','池尾里絵']
const MONTH_LABEL = { '9': '2026年9月', '10': '2026年10月', '11': '2026年11月' }
const Q1 = ['去年','2年前','3年前','4年前','5年前以降','未受験']
const Q2 = ['整体師・カイロプラクター等','エステ・美容サロン','ヒーラー・スピリチュアル系','クリニック・医療関連','飲食店・カフェ','物販店舗オーナー','オンライン販売専業','その他']
const Q3 = ['科学的根拠の説明が難しい','価格納得が難しい','差別化説明が難しい','商品知識不足','新規提案しにくい','リピートにつながりにくい']
const Q4 = ['成分・原料の知識','効果的な説明トーク','差別化ポイント','提案力向上','SNS発信力','代理店育成']

export default function RegisterPage() {
  const params = useParams()
  const router = useRouter()
  const month = params.month
  const monthLabel = MONTH_LABEL[month] || `2026年${month}月`
  const [form, setForm] = useState({name:'',furigana:'',email:'',phone:'',prefecture:'',agency:'',q1:'',q2:[],q3:[],q4:[]})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggle = (key, val) => setForm(f=>({...f,[key]:f[key].includes(val)?f[key].filter(x=>x!==val):[...f[key],val]}))

  const submit = async () => {
    if (!form.name||!form.furigana||!form.email||!form.phone||!form.prefecture||!form.agency){setError('必須項目をすべて入力してください');return}
    setLoading(true);setError('')
    try{
      const res = await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,desired_month:monthLabel})})
      if(!res.ok)throw new Error('送信に失敗しました')
      router.push('/complete')
    }catch(e){setError(e.message)}
    setLoading(false)
  }

  const inp="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50"
  const lbl="block text-sm font-semibold text-slate-700 mb-1"

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-slate-800 text-white py-4 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs text-slate-400 uppercase tracking-widest">LICENSE RENEWAL REGISTRATION</p>
          <h1 className="text-xl font-bold">販売者認定講習・試験 申込みフォーム</h1>
        </div>
      </header>
      <main className="max-w-2xl mx-auto py-10 px-6">
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-8 text-center">
          <p className="text-sm text-teal-700 font-medium">受講月：<span className="text-xl font-bold">{monthLabel}</span></p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-3">申込み情報</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={lbl}>氏名 <span className="text-red-500">*</span></label><input className={inp} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="山田 太郎"/></div>
            <div><label className={lbl}>フリガナ <span className="text-red-500">*</span></label><input className={inp} value={form.furigana} onChange={e=>setForm(f=>({...f,furigana:e.target.value}))} placeholder="ヤマダ タロウ"/></div>
          </div>
          <div><label className={lbl}>メールアドレス <span className="text-red-500">*</span></label><input className={inp} type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="example@email.com"/></div>
          <div><label className={lbl}>電話番号 <span className="text-red-500">*</span></label><input className={inp} type="tel" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="090-0000-0000"/></div>
          <div><label className={lbl}>都道府県 <span className="text-red-500">*</span></label><select className={inp} value={form.prefecture} onChange={e=>setForm(f=>({...f,prefecture:e.target.value}))}><option value="">選択してください</option>{PREFECTURES.map(p=><option key={p} value={p}>{p}</option>)}</select></div>
          <div><label className={lbl}>所属代理店名 <span className="text-red-500">*</span></label><select className={inp} value={form.agency} onChange={e=>setForm(f=>({...f,agency:e.target.value}))}><option value="">選択してください</option>{AGENCIES.map(a=><option key={a} value={a}>{a}</option>)}</select></div>
          <div className="border-t pt-6">
            <h3 className="text-base font-bold text-slate-700 mb-4">アンケート（任意）</h3>
            <div className="space-y-6">
              <div><label className={lbl}>1. 認定試験に合格したのは何年前ですか？</label><div className="flex flex-wrap gap-2 mt-2">{Q1.map(o=><button key={o} type="button" onClick={()=>setForm(f=>({...f,q1:o}))} className={`px-4 py-2 rounded-lg text-sm border ${form.q1===o?'bg-teal-600 text-white':'bg-white text-slate-600 border-slate-200'}`}>{o}</button>)}</div></div>
              <div><label className={lbl}>2. ご職業・ビジネスジャンル（複数可）</label><div className="space-y-2 mt-2">{Q2.map(o=><label key={o} className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.q2.includes(o)} onChange={()=>toggle('q2',o)}/>{o}</label>)}</div></div>
              <div><label className={lbl}>3. 販売での最大の課題（複数可）</label><div className="space-y-2 mt-2">{Q3.map(o=><label key={o} className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.q3.includes(o)} onChange={()=>toggle('q3',o)}/>{o}</label>)}</div></div>
              <div><label className={lbl}>4. 講習で得たいスキル（複数可）</label><div className="space-y-2 mt-2">{Q4.map(o=><label key={o} className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={form.q4.includes(o)} onChange={()=>toggle('q4',o)}/>{o}</label>)}</div></div>
            </div>
          </div>
          {error&&<p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>}
          <button onClick={submit} disabled={loading} className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 shadow-md">{loading?'送信中...':'申込みを送信する →'}</button>
        </div>
      </main>
    </div>
  )
}