import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY)

const REMIND_SCHEDULE: { [key: string]: string } = {
  '08-24': '2026年9月',
  '09-24': '2026年10月',
  '10-24': '2026年11月',
}

export async function GET() {
  try {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }))
    const monthDay = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    const targetMonth = REMIND_SCHEDULE[monthDay]
    if (!targetMonth) {
      return NextResponse.json({ ok: true, message: 'リマインド送信日ではありません', date: monthDay })
    }

    const { data: applicants, error } = await supabase
      .from('applicants')
      .select('name, email')
      .eq('desired_month', targetMonth)
      .eq('status', 'confirmed')

    if (error) throw error
    if (!applicants || applicants.length === 0) {
      return NextResponse.json({ ok: true, message: `${targetMonth}の申込者なし` })
    }

    await Promise.all(
      applicants.map(({ name, email }: { name: string, email: string }) =>
        resend.emails.send({
          from: '販売者認定講習事務局 <mail@you-planning.org>',
          to: [email],
          subject: `【リマインド】${targetMonth} 販売者認定講習・試験のご確認`,
          html: `<p>${name} 様</p><br><p>認定講座、認定試験を主宰しております牛王田です。</p><p>シリカエバンジェリストのライセンス更新の為の認定講座、認定試験の月が翌月と迫ってきておりますが、予定の変更はございませんか？</p><p>もし受講を延期したい場合は、主宰者の牛王田までお申し付けください。</p><br><p>では、更新試験がんばってくださいね。</p><br><p>──────────────────────</p><p>販売者認定講習事務局<br>牛王田雅章<br>mail@you-planning.org</p>`,
        })
      )
    )

    return NextResponse.json({
      ok: true,
      message: `${targetMonth}の申込者${applicants.length}名にリマインドメールを送信しました`,
      count: applicants.length,
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}