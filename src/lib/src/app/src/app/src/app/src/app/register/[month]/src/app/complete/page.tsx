'use client'
import { useRouter } from 'next/navigation'
export default function CompletePage() {
  const router = useRouter()
  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 max-w-md w-full mx-6 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-2xl font-bold text-slate-800 mb-3">申込みが完了しました</h1>
        <p className="text-slate-500 text-sm mb-2">ご登録のメールアドレスに確認メールをお送りしました。</p>
        <p className="text-slate-500 text-sm mb-8">メールが届かない場合は迷惑メールフォルダをご確認ください。</p>
        <button onClick={()=>router.push('/')} className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-colors">トップページに戻る</button>
      </div>
    </div>
  )
}