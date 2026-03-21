import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, furigana, email, phone, prefecture, desired_month, agency,
      survey_q1, survey_q2, survey_q3, survey_q4,
      survey_q5, survey_q6, survey_q7, survey_q8, survey_q9, survey_q10 } = body

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
        <p>ご不明な点はお問い合わせください。</p>
      `,
    })

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}