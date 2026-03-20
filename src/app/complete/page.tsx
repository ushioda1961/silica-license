export default function CompletePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          申込みが完了しました
        </h1>
        <p className="text-gray-600 mb-2">
          ご登録のメールアドレスに確認メールをお送りしました。
        </p>
        <p className="text-sm text-gray-500">
          ご不明な点はお問い合わせください。
        </p>
      </div>
    </main>
  )
}