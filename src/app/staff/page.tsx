'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const TABS = ['2026年9月','2026年10月','2026年11月']

export default function StaffPage() {
  const [authed, setAuthed] = useState(false)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [tab, setTab] = useState('2026年9月')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const login = () => {
    if (id === 'sil4' && pw === 'pass14') { setAuthed(true); setErr('') }
    else setErr('IDまたはパスワードが違います')
  }

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    supabase.from('applicants').select('*')
      .eq('desired_month', tab).eq('status','confirmed')
      .order('created_at',{ascending:false})
      .then(({data}) => { setRows(data || []); setLoading(false) })
  }, [authed, tab])

  const togglePayment = async (rowId, cur) => {
    const next = cur === 'paid' ? 'unpaid' : 'paid'
    await supabase.from('applicants').update({payment_status: next}).eq('id', rowId)
    setRows(r => r.map(x => x.id === rowId ? {...x, payment_status: next} : x))
  }

  if (!authed) return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-sm mx-6">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-xl font-bold text-slate-800">ログイン</h1>
          <p className="text-sm text-slate-500 mt-1">管理システム</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">ログインID</label>
            <input className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-blue-50 focus:outline-none focus:ring-2 focus:ring-teal-500" value={id} onChange={e=>setId(e.target.value)} placeholder="ID"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">パスワード</label>
            <input className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-blue-50 focus:outline-none focus:ring-2 focus:ring-teal-500" type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()}/>
          </div>
          {err && <p className="text-red-500 text-sm text-center">{err}</p>}
          <button onClick={login} className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">ログイン</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-800 text-white py-4 px-6 flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest">ADMIN</p>
          <h1 className="text-lg font-bold">販売者認定講習・試験 管理画面</h1>
        </div>
        <button onClick={()=>setAuthed(false)} className="text-slate-400 hover:text-white text-sm">ログアウト</button>
      </header>
      <main className="max-w-6xl mx-auto py-8 px-6">
        <div className="flex gap-3 mb-6">
          {TABS.map(t => (
            <button key={t} onClick={()=>setTab(t)}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-colors ${tab===t?'bg-teal-600 text-white':'bg-white text-slate-600 border border-slate-200 hover:border-teal-400'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">{tab} 申込者一覧</h2>
            <span className="text-sm text-slate-500">{rows.length}名</span>
          </div>
          {loading ? (
            <div className="p-12 text-center text-slate-400">読み込み中...</div>
          ) : rows.length === 0 ? (
            <div className="p-12 text-center text-slate-400">申込みはありません</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">申込日時</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">氏名</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">都道府県</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">代理店</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">メール</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">電話</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">受講料</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-500">{new Date(r.created_at).toLocaleDateString('ja-JP')}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{r.name}</div>
                        <div className="text-xs text-slate-400">{r.furigana}</div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{r.prefecture}</td>
                      <td className="px-4 py-3 text-slate-600">{r.agency}</td>
                      <td className="px-4 py-3 text-slate-600">{r.email}</td>
                      <td className="px-4 py-3 text-slate-600">{r.phone}</td>
                      <td className="px-4 py-3">
                        <button onClick={()=>togglePayment(r.id, r.payment_status)}
                          className={`px-3 py-1 rounded-full text-xs font-bold ${r.payment_status==='paid'?'bg-green-100 text-green-700':'bg-orange-100 text-orange-700'}`}>
                          {r.payment_status === 'paid' ? '✓ 決済済み' : '未決済'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
