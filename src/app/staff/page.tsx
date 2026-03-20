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
  const [rows, setRows] = useState<any[]>([])
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

  const togglePayment = async (rowId: string, cur: string) => {
    const next = cur === 'paid' ? 'unpaid' : 'paid'
    await supabase.from('applicants').update({payment_status: next}).eq('id', rowId)
    setRows(r => r.map((x: any) => x.id === rowId ? {...x, payment_status: next} : x))
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
            <input className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400" value={id} onChange={e => setId(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">パスワード</label>
            <input type="password" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400" value={pw} onChange={e => setPw(e.target.value)} />
          </div>
          {err && <p className="text-red-500 text-sm">{err}</p>}
          <button onClick={login} className="w-full bg-blue-600 text-white rounded-lg py-2.5 font-semibold hover:bg-blue-700 transition-colors">ログイン</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">申込者管理</h1>
        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${tab === t ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-blue-50'}`}>
              {t}
            </button>
          ))}
        </div>
        {loading ? <p>読み込み中...</p> : (
          <div className="bg-white rounded-2xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b">
                <tr>
                  {['氏名','フリガナ','メール','電話','都道府県','所属代理店','受講月','支払'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-slate-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: any) => (
                  <tr key={row.id} className="border-b hover:bg-slate-50">
                    <td className="px-4 py-3">{row.name}</td>
                    <td className="px-4 py-3">{row.furigana}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3">{row.prefecture}</td>
                    <td className="px-4 py-3">{row.agency}</td>
                    <td className="px-4 py-3">{row.desired_month}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => togglePayment(row.id, row.payment_status)}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${row.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {row.payment_status === 'paid' ? '支払済' : '未払い'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length === 0 && <p className="text-center py-8 text-slate-500">データなし</p>}
          </div>
        )}
      </div>
    </div>
  )
}