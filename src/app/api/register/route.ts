import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, furigana, email, phone, prefecture, desired_month, agency, survey_q1, survey_q2, survey_q3, survey_q4, survey_q5, survey_q6, survey_q7, survey_q8, survey_q9, survey_q10 } = body
    const { data, error } = await supabase.from('applicants').insert([{
      name, furigana, email, phone, prefecture, desired_month, agency,
      survey_q1, survey_q2, survey_q3, survey_q4,
      payment_status: 'unpaid',
      status: 'confirmed',
    }]).select('id').single()
    if (error) throw error
    await resend.emails.send({
      from: '販売者認定講習事務局 <mail@you-planning.org>',
      to: [email, 'mail@you-planning.org'],
      subject: `【申込み完了】販売者認定講習・試験 ${desired_month}`,
      html: `
        <h2>申込みが完了しました</h2>
        <p>以下の内容で受付いたしました。</p>
        <table border="1" cellpadding="8" style="border-collapse:collapse">
          <tr><th>氏名</th><td>${name}（${furigana}）</td></tr>
          <tr><th>メール</th><td>${email}</td></tr>
          <tr><th>電話</th><td>${phone}</td></tr>
          <tr><th>都道府県</th><td>${prefecture}</td></tr>
          <tr><th>受講月</th><td>${desired_month}</td></tr>
          <tr><th>所属代理店</th><td>${agency}</td></tr>
        </table>
        <p>受講料（¥5,500）のお支払いをお願いします。</p>
        <p>銀行振込の方は以下の口座へお振込をお願いします。</p>
        <table border="1" cellpadding="8" style="border-collapse:collapse">
          <tr><th>銀行名</th><td>GMOあおぞらネット銀行</td></tr>
          <tr><th>支店名</th><td>法人営業部</td></tr>
          <tr><th>口座種別</th><td>普通</td></tr>
          <tr><th>口座番号</th><td>2144755</td></tr>
          <tr><th>口座名義</th><td>カ）ユープランニング</td></tr>
        </table>
        <p>※振込手数料はご負担ください。</p>
        <p>ご不明な点はお問い合わせください。</p>
        <hr style="margin:24px 0">
        <h3 style="color:#1a8cc7">💧 ケイソくんトレーニングのご案内</h3>
        <p>試験対策として、<strong>ケイソくんトレーニング</strong>をぜひご活用ください！</p>
        <p>毎日5問のクイズでケイ素の知識を楽しく身につけられます。<br>
        XPを獲得してレベルアップ、ランキングで他の受講者と競い合いましょう！</p>
        <p style="margin:16px 0">
          <a href="https://silica-license.vercel.app/training"
             style="background:#1a8cc7;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">
            🚀 トレーニングを始める
          </a>
        </p>
        <p style="font-size:0.9em;color:#666">
          ログイン方法：申込み時にご登録いただいた<strong>電話番号の下6桁</strong>を入力するだけです。<br>
          URL: https://silica-license.vercel.app/training
        </p>
      `,
    })
    return NextResponse.json({ ok: true, id: data.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}