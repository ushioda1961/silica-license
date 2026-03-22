'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ALL_LV = [
  {lv:1,xp:0,name:'シリカの卵',emoji:'🥚',rank:'ルーキー',g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:2,xp:8,name:'シリカ見習い',emoji:'🌱',rank:'ルーキー',g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:3,xp:18,name:'ケイ素入門者',emoji:'💧',rank:'ルーキー',g:'linear-gradient(135deg,#3bbfef,#29b0e0)'},
  {lv:4,xp:32,name:'ケイ素学習者',emoji:'📖',rank:'ルーキー',g:'linear-gradient(135deg,#29b0e0,#1a8cc7)'},
  {lv:5,xp:50,name:'ケイ素研究生',emoji:'🔬',rank:'ルーキー',g:'linear-gradient(135deg,#1a8cc7,#1567a0)'},
  {lv:6,xp:75,name:'シリカセールス',emoji:'💼',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:7,xp:105,name:'ケイ素推進者',emoji:'📢',rank:'セールス',g:'linear-gradient(135deg,#ff8c42,#e07d00)'},
  {lv:8,xp:140,name:'シリカアドバイザー',emoji:'💡',rank:'セールス',g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:9,xp:180,name:'ケイ素インストラクター',emoji:'🎓',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:10,xp:230,name:'シリカスペシャリスト',emoji:'⭐',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ffb830)'},
  {lv:11,xp:290,name:'ケイ素エキスパート',emoji:'✨',rank:'エキスパート',g:'linear-gradient(135deg,#ff9500,#e07d00)'},
  {lv:12,xp:360,name:'シリカプロ',emoji:'💎',rank:'エキスパート',g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:13,xp:440,name:'ケイ素マスター候補',emoji:'🏅',rank:'エキスパート',g:'linear-gradient(135deg,#c56500,#aa5000)'},
  {lv:14,xp:540,name:'シリカエリート',emoji:'🎯',rank:'エキスパート',g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:15,xp:660,name:'ケイ素上級者',emoji:'🔥',rank:'エキスパート',g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:16,xp:800,name:'シリカマスター',emoji:'👑',rank:'マスター',g:'linear-gradient(135deg,#9b59b6,#6c3483)'},
  {lv:17,xp:980,name:'ケイ素博士',emoji:'🏆',rank:'マスター',g:'linear-gradient(135deg,#7d3c98,#6c3483)'},
  {lv:18,xp:1200,name:'シリカ師匠',emoji:'🌟',rank:'マスター',g:'linear-gradient(135deg,#6c3483,#5b2c6f)'},
  {lv:19,xp:1480,name:'ケイ素の賢者',emoji:'🧙',rank:'マスター',g:'linear-gradient(135deg,#6c3483,#4a235a)'},
  {lv:20,xp:1800,name:'シリカグランドマスター',emoji:'⚡',rank:'マスター',g:'linear-gradient(135deg,#5b2c6f,#4a235a)'},
  {lv:21,xp:2200,name:'ケイ素レジェンド',emoji:'🌈',rank:'レジェンド',g:'linear-gradient(135deg,#e74c3c,#c0392b)'},
  {lv:22,xp:2700,name:'シリカ伝道師',emoji:'🕊️',rank:'レジェンド',g:'linear-gradient(135deg,#c0392b,#a93226)'},
  {lv:23,xp:3300,name:'ケイ素の守護者',emoji:'🛡️',rank:'レジェンド',g:'linear-gradient(135deg,#f39c12,#d68910)'},
  {lv:24,xp:4000,name:'シリカセンセイ',emoji:'🎆',rank:'レジェンド',g:'linear-gradient(135deg,#d68910,#b7770d)'},
  {lv:25,xp:5000,name:'ケイ素の英雄',emoji:'🦅',rank:'レジェンド',g:'linear-gradient(135deg,#2ecc71,#1a9a50)'},
  {lv:26,xp:6500,name:'シリカ神話の使者',emoji:'🌙',rank:'神',g:'linear-gradient(135deg,#1abc9c,#148f77)'},
  {lv:27,xp:8500,name:'ケイ素の申し子',emoji:'☀️',rank:'神',g:'linear-gradient(135deg,#2c3e50,#1a252f)'},
  {lv:28,xp:11000,name:'シリカ不滅の存在',emoji:'💫',rank:'神',g:'linear-gradient(135deg,#8e44ad,#6c3483)'},
  {lv:29,xp:15000,name:'ケイ素の化身',emoji:'🔮',rank:'神',g:'linear-gradient(135deg,#2980b9,#1a5276)'},
  {lv:30,xp:20000,name:'ケイソ神',emoji:'⚡',rank:'神',g:'linear-gradient(135deg,#f39c12,#e74c3c)'},
]
function getLv(xp){let r=ALL_LV[0];for(let i=ALL_LV.length-1;i>=0;i--){if(xp>=ALL_LV[i].xp){r=ALL_LV[i];break}}return r}

export default function AdminPage(){
  const[users,setUsers]=useState([])
  const[sessions,setSessions]=useState([])
  const[loading,setLoading]=useState(true)
  const[tab,setTab]=useState('dashboard')
  const[updated,setUpdated]=useState('')

  async function load(){
    setLoading(true)
    const{data:u}=await supabase.from('silica_training_users').select('*').order('total_xp',{ascending:false})
    const{data:s}=await supabase.from('silica_training_sessions').select('*').order('trained_at',{ascending:false}).limit(100)
    setUsers(u||[]);setSessions(s||[])
    setUpdated(new Date().toLocaleTimeString('ja-JP'))
    setLoading(false)
  }
  useEffect(()=>{load()},[])

  const today=new Date().toISOString().split('T')[0]
  const todayUsers=new Set(sessions.filter(s=>s.trained_at?.startsWith(today)).map(s=>s.user_name)).size
  const ranks=['ルーキー','セールス','エキスパート','マスター','レジェンド','神']
  const rankColors=['#3bbfef','#ff8c42','#ff6b35','#9b59b6','#e74c3c','#f39c12']

  return(
    <div style={{display:'flex',minHeight:'100vh',background:'#0f1623',fontFamily:"'M PLUS Rounded 1c',sans-serif",color:'#e8eef8'}}>
      <div style={{width:200,background:'#161e2e',borderRight:'1px solid rgba(255,255,255,0.07)',padding:'20px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh',zIndex:100}}>
        <div style={{padding:'0 16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',marginBottom:12}}>
          <div style={{fontSize:'0.9rem',fontWeight:900,color:'#3bbfef'}}>💧 シリカ管理画面</div>
          <div style={{fontSize:'0.68rem',color:'#7a90b0',marginTop:2}}>Silica Training Admin</div>
        </div>
        {[['dashboard','📊','ダッシュボード'],['members','👥','販売者一覧'],['ranking','🏆','ランキング']].map(([t,icon,label])=>(
          <div key={t} onClick={()=>setTab(t)} style={{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',cursor:'pointer',fontSize:'0.85rem',fontWeight:700,borderLeft:tab===t?'3px solid #3bbfef':'3px solid transparent',background:tab===t?'rgba(59,191,239,0.15)':'transparent',color:tab===t?'#3bbfef':'#7a90b0'}}>
            <span>{icon}</span>{label}
          </div>
        ))}
        <div style={{marginTop:'auto',padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.07)',fontSize:'0.68rem',color:'#4a607a'}}>
          最終更新: {updated}
          <button onClick={load} style={{display:'block',marginTop:6,padding:'4px 10px',background:'rgba(59,191,239,0.15)',border:'1px solid rgba(59,191,239,0.3)',color:'#3bbfef',borderRadius:8,fontSize:'0.7rem',fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>🔄 更新</button>
        </div>
      </div>
      <div style={{marginLeft:200,flex:1,padding:'24px 28px'}}>
        {loading&&<div style={{textAlign:'center',padding:40,color:'#3bbfef',fontSize:'1.1rem',fontWeight:700}}>読み込み中...</div>}
        {!loading&&tab==='dashboard'&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <h1 style={{fontSize:'1.3rem',fontWeight:900}}>📊 ダッシュボード</h1>
              <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(6,214,160,0.15)',border:'1px solid rgba(6,214,160,0.3)',padding:'5px 12px',borderRadius:20,fontSize:'0.75rem',fontWeight:700,color:'#06d6a0'}}>● リアルタイム</div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
              {[{label:'登録販売者数',v:users.length,u:'名',c:'#3bbfef',e:'👥'},{label:'今日の参加者',v:todayUsers,u:'名',c:'#06d6a0',e:'✅'},{label:'累計セッション',v:sessions.length,u:'回',c:'#ff8c42',e:'🔥'},{label:'平均XP',v:users.length>0?Math.round(users.reduce((a,u)=>a+(u.total_xp||0),0)/users.length):0,u:'XP',c:'#9b59b6',e:'⭐'}].map((k,i)=>(
                <div key={i} style={{background:'#1c2535',borderRadius:14,padding:'16px 18px',border:'1px solid rgba(255,255,255,0.07)',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:k.c}}/>
                  <div style={{position:'absolute',right:14,top:14,fontSize:'1.4rem',opacity:0.25}}>{k.e}</div>
                  <div style={{fontSize:'0.7rem',color:'#7a90b0',fontWeight:700,marginBottom:6}}>{k.label}</div>
                  <div style={{fontSize:'1.9rem',fontWeight:900,color:k.c,lineHeight:1}}>{k.v}{k.u}</div>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={{background:'#1c2535',borderRadius:14,padding:'18px 20px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:'0.88rem',fontWeight:800,marginBottom:14}}>🎖️ ランク別分布</div>
                {ranks.map((r,i)=>{
                  const cnt=users.filter(u=>getLv(u.total_xp||0).rank===r).length
                  const pct=users.length>0?Math.round(cnt/users.length*100):0
                  return<div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <div style={{width:90,fontSize:'0.75rem',fontWeight:800,color:rankColors[i]}}>{r}</div>
                    <div style={{flex:1,background:'#0f1623',borderRadius:6,height:18,overflow:'hidden'}}>
                      <div style={{height:'100%',borderRadius:6,background:rankColors[i],width:pct+'%'}}/>
                    </div>
                    <div style={{fontSize:'0.72rem',color:'#7a90b0',fontWeight:700,width:28,textAlign:'right'}}>{cnt}名</div>
                  </div>
                })}
              </div>
              <div style={{background:'#1c2535',borderRadius:14,padding:'18px 20px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:'0.88rem',fontWeight:800,marginBottom:14}}>📅 最近のトレーニング</div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['販売者','スコア','XP','日時'].map(h=><th key={h} style={{textAlign:'left',fontSize:'0.7rem',color:'#4a607a',padding:'4px 8px',borderBottom:'1px solid rgba(255,255,255,0.07)',fontWeight:800}}>{h}</th>)}</tr></thead>
                  <tbody>{sessions.slice(0,10).map((s,i)=><tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',fontWeight:700}}>{s.user_name}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',color:s.score===s.total?'#06d6a0':'#3bbfef',fontWeight:800}}>{s.score}/{s.total}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',color:'#3bbfef',fontWeight:800}}>+{s.xp_gained}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.72rem',color:'#7a90b0'}}>{new Date(s.trained_at).toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</td>
                  </tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {!loading&&tab==='members'&&(
          <div>
            <h1 style={{fontSize:'1.3rem',fontWeight:900,marginBottom:20}}>👥 販売者一覧 <span style={{fontSize:'0.85rem',color:'#7a90b0'}}>({users.length}名)</span></h1>
            <div style={{background:'#1c2535',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',overflow:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr style={{background:'rgba(0,0,0,0.2)'}}>
                  {['#','販売者名','レベル','累計XP','セッション','最終参加'].map(h=><th key={h} style={{textAlign:'left',fontSize:'0.7rem',color:'#4a607a',padding:'10px 14px',fontWeight:800}}>{h}</th>)}
                </tr></thead>
                <tbody>{users.map((u,i)=>{
                  const lv=getLv(u.total_xp||0)
                  const days=u.last_trained_at?Math.floor((Date.now()-new Date(u.last_trained_at).getTime())/86400000):999
                  return<tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding:'10px 14px',color:'#4a607a',fontSize:'0.8rem'}}>{i+1}</td>
                    <td style={{padding:'10px 14px',fontWeight:800,fontSize:'0.85rem'}}>{u.user_name}</td>
                    <td style={{padding:'10px 14px'}}><span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'3px 10px',borderRadius:20,fontSize:'0.72rem',fontWeight:800,background:'rgba(59,191,239,0.12)',color:'#3bbfef'}}>{lv.emoji} Lv.{lv.lv} {lv.name}</span></td>
                    <td style={{padding:'10px 14px',color:'#3bbfef',fontWeight:800,fontSize:'0.85rem'}}>{(u.total_xp||0).toLocaleString()} XP</td>
                    <td style={{padding:'10px 14px',color:'#7a90b0',fontSize:'0.82rem'}}>{u.session_count||0}回</td>
                    <td style={{padding:'10px 14px',fontSize:'0.75rem',color:days>30?'#ef476f':days>7?'#ff8c42':'#06d6a0',fontWeight:700}}>{days===0?'今日':days===1?'昨日':days+' 日前'}</td>
                  </tr>
                })}</tbody>
              </table>
              {users.length===0&&<div style={{textAlign:'center',padding:40,color:'#7a90b0',fontWeight:700}}>まだデータがありません</div>}
            </div>
          </div>
        )}
        {!loading&&tab==='ranking'&&(
          <div>
            <h1 style={{fontSize:'1.3rem',fontWeight:900,marginBottom:20}}>🏆 XPランキング</h1>
            <div style={{background:'#1c2535',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',overflow:'hidden'}}>
              {users.slice(0,20).map((u,i)=>{
                const lv=getLv(u.total_xp||0)
                const medal=i===0?'🥇':i===1?'🥈':i===2?'🥉':String(i+1)
                return<div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:'1px solid rgba(255,255,255,0.05)',background:i===0?'rgba(255,215,0,0.05)':i===1?'rgba(192,192,192,0.05)':i===2?'rgba(205,127,50,0.05)':'transparent'}}>
                  <div style={{width:32,textAlign:'center',fontSize:i<3?'1.2rem':'0.85rem',fontWeight:900,color:i===0?'#d4a000':i===1?'#888':i===2?'#a0632a':'#4a607a'}}>{medal}</div>
                  <div style={{width:42,height:42,borderRadius:11,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0}}>
                    <span>{lv.emoji}</span><span style={{fontSize:'0.55rem',fontWeight:800,color:'rgba(255,255,255,0.92)'}}>Lv.{lv.lv}</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:'0.88rem'}}>{u.user_name}</div>
                    <div style={{fontSize:'0.7rem',color:'#7a90b0'}}>{lv.name} / {lv.rank}</div>
                  </div>
                  <div style={{fontWeight:900,fontSize:'0.95rem',color:'#3bbfef'}}>{(u.total_xp||0).toLocaleString()} XP</div>
                </div>
              })}
              {users.length===0&&<div style={{textAlign:'center',padding:40,color:'#7a90b0',fontWeight:700}}>まだデータがありません</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const ALL_LV = [
  {lv:1,xp:0,name:'シリカの卵',emoji:'🥚',rank:'ルーキー',g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:2,xp:8,name:'シリカ見習い',emoji:'🌱',rank:'ルーキー',g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:3,xp:18,name:'ケイ素入門者',emoji:'💧',rank:'ルーキー',g:'linear-gradient(135deg,#3bbfef,#29b0e0)'},
  {lv:4,xp:32,name:'ケイ素学習者',emoji:'📖',rank:'ルーキー',g:'linear-gradient(135deg,#29b0e0,#1a8cc7)'},
  {lv:5,xp:50,name:'ケイ素研究生',emoji:'🔬',rank:'ルーキー',g:'linear-gradient(135deg,#1a8cc7,#1567a0)'},
  {lv:6,xp:75,name:'シリカセールス',emoji:'💼',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:7,xp:105,name:'ケイ素推進者',emoji:'📢',rank:'セールス',g:'linear-gradient(135deg,#ff8c42,#e07d00)'},
  {lv:8,xp:140,name:'シリカアドバイザー',emoji:'💡',rank:'セールス',g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:9,xp:180,name:'ケイ素インストラクター',emoji:'🎓',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:10,xp:230,name:'シリカスペシャリスト',emoji:'⭐',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ffb830)'},
  {lv:11,xp:290,name:'ケイ素エキスパート',emoji:'✨',rank:'エキスパート',g:'linear-gradient(135deg,#ff9500,#e07d00)'},
  {lv:12,xp:360,name:'シリカプロ',emoji:'💎',rank:'エキスパート',g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:13,xp:440,name:'ケイ素マスター候補',emoji:'🏅',rank:'エキスパート',g:'linear-gradient(135deg,#c56500,#aa5000)'},
  {lv:14,xp:540,name:'シリカエリート',emoji:'🎯',rank:'エキスパート',g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:15,xp:660,name:'ケイ素上級者',emoji:'🔥',rank:'エキスパート',g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:16,xp:800,name:'シリカマスター',emoji:'👑',rank:'マスター',g:'linear-gradient(135deg,#9b59b6,#6c3483)'},
  {lv:17,xp:980,name:'ケイ素博士',emoji:'🏆',rank:'マスター',g:'linear-gradient(135deg,#7d3c98,#6c3483)'},
  {lv:18,xp:1200,name:'シリカ師匠',emoji:'🌟',rank:'マスター',g:'linear-gradient(135deg,#6c3483,#5b2c6f)'},
  {lv:19,xp:1480,name:'ケイ素の賢者',emoji:'🧙',rank:'マスター',g:'linear-gradient(135deg,#6c3483,#4a235a)'},
  {lv:20,xp:1800,name:'シリカグランドマスター',emoji:'⚡',rank:'マスター',g:'linear-gradient(135deg,#5b2c6f,#4a235a)'},
  {lv:21,xp:2200,name:'ケイ素レジェンド',emoji:'🌈',rank:'レジェンド',g:'linear-gradient(135deg,#e74c3c,#c0392b)'},
  {lv:22,xp:2700,name:'シリカ伝道師',emoji:'🕊️',rank:'レジェンド',g:'linear-gradient(135deg,#c0392b,#a93226)'},
  {lv:23,xp:3300,name:'ケイ素の守護者',emoji:'🛡️',rank:'レジェンド',g:'linear-gradient(135deg,#f39c12,#d68910)'},
  {lv:24,xp:4000,name:'シリカセンセイ',emoji:'🎆',rank:'レジェンド',g:'linear-gradient(135deg,#d68910,#b7770d)'},
  {lv:25,xp:5000,name:'ケイ素の英雄',emoji:'🦅',rank:'レジェンド',g:'linear-gradient(135deg,#2ecc71,#1a9a50)'},
  {lv:26,xp:6500,name:'シリカ神話の使者',emoji:'🌙',rank:'神',g:'linear-gradient(135deg,#1abc9c,#148f77)'},
  {lv:27,xp:8500,name:'ケイ素の申し子',emoji:'☀️',rank:'神',g:'linear-gradient(135deg,#2c3e50,#1a252f)'},
  {lv:28,xp:11000,name:'シリカ不滅の存在',emoji:'💫',rank:'神',g:'linear-gradient(135deg,#8e44ad,#6c3483)'},
  {lv:29,xp:15000,name:'ケイ素の化身',emoji:'🔮',rank:'神',g:'linear-gradient(135deg,#2980b9,#1a5276)'},
  {lv:30,xp:20000,name:'ケイソ神',emoji:'⚡',rank:'神',g:'linear-gradient(135deg,#f39c12,#e74c3c)'},
]
function getLv(xp){let r=ALL_LV[0];for(let i=ALL_LV.length-1;i>=0;i--){if(xp>=ALL_LV[i].xp){r=ALL_LV[i];break}}return r}

export default function AdminPage(){
  const[users,setUsers]=useState([])
  const[sessions,setSessions]=useState([])
  const[loading,setLoading]=useState(true)
  const[tab,setTab]=useState('dashboard')
  const[updated,setUpdated]=useState('')

  async function load(){
    setLoading(true)
    const{data:u}=await supabase.from('silica_training_users').select('*').order('total_xp',{ascending:false})
    const{data:s}=await supabase.from('silica_training_sessions').select('*').order('trained_at',{ascending:false}).limit(100)
    setUsers(u||[]);setSessions(s||[])
    setUpdated(new Date().toLocaleTimeString('ja-JP'))
    setLoading(false)
  }
  useEffect(()=>{load()},[])

  const today=new Date().toISOString().split('T')[0]
  const todayUsers=new Set(sessions.filter(s=>s.trained_at?.startsWith(today)).map(s=>s.user_name)).size
  const avgRate=users.length>0?Math.round(users.reduce((a,u)=>a+(u.total_questions>0?u.correct_count/u.total_questions*100:0),0)/users.length):0
  const ranks=['ルーキー','セールス','エキスパート','マスター','レジェンド','神']
  const rankColors=['#3bbfef','#ff8c42','#ff6b35','#9b59b6','#e74c3c','#f39c12']

  const S={side:{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',cursor:'pointer',fontSize:'0.85rem',fontWeight:700,borderLeft:'3px solid transparent',transition:'all 0.15s',color:'#7a90b0'}}

  return(
    <div style={{display:'flex',minHeight:'100vh',background:'#0f1623',fontFamily:"'M PLUS Rounded 1c',sans-serif",color:'#e8eef8'}}>
      <div style={{width:200,background:'#161e2e',borderRight:'1px solid rgba(255,255,255,0.07)',padding:'20px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh',zIndex:100}}>
        <div style={{padding:'0 16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',marginBottom:12}}>
          <div style={{fontSize:'0.9rem',fontWeight:900,color:'#3bbfef'}}>💧 シリカ管理画面</div>
          <div style={{fontSize:'0.68rem',color:'#7a90b0',marginTop:2}}>Silica Training Admin</div>
        </div>
        {[['dashboard','📊','ダッシュボード'],['members','👥','販売者一覧'],['ranking','🏆','ランキング']].map(([t,icon,label])=>(
          <div key={t} onClick={()=>setTab(t)} style={{...S.side,color:tab===t?'#3bbfef':'#7a90b0',borderLeftColor:tab===t?'#3bbfef':'transparent',background:tab===t?'rgba(59,191,239,0.15)':'transparent'}}>
            <span>{icon}</span>{label}
          </div>
        ))}
        <div style={{marginTop:'auto',padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.07)',fontSize:'0.68rem',color:'#4a607a'}}>
          最終更新: {updated}
          <button onClick={load} style={{display:'block',marginTop:6,padding:'4px 10px',background:'rgba(59,191,239,0.15)',border:'1px solid rgba(59,191,239,0.3)',color:'#3bbfef',borderRadius:8,fontSize:'0.7rem',fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>🔄 更新</button>
        </div>
      </div>
      <div style={{marginLeft:200,flex:1,padding:'24px 28px'}}>
        {loading&&<div style={{textAlign:'center',padding:40,color:'#3bbfef',fontSize:'1.1rem',fontWeight:700}}>読み込み中...</div>}
        {!loading&&tab==='dashboard'&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <h1 style={{fontSize:'1.3rem',fontWeight:900}}>📊 ダッシュボード</h1>
              <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(6,214,160,0.15)',border:'1px solid rgba(6,214,160,0.3)',padding:'5px 12px',borderRadius:20,fontSize:'0.75rem',fontWeight:700,color:'#06d6a0'}}>
                ● リアルタイム
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
              {[{label:'登録販売者数',v:users.length,u:'名',c:'#3bbfef',e:'👥'},{label:'今日の参加者',v:todayUsers,u:'名',c:'#06d6a0',e:'✅'},{label:'累計セッション',v:sessions.length,u:'回',c:'#ff8c42',e:'🔥'},{label:'平均正解率',v:avgRate,u:'%',c:'#9b59b6',e:'⭐'}].map((k,i)=>(
                <div key={i} style={{background:'#1c2535',borderRadius:14,padding:'16px 18px',border:'1px solid rgba(255,255,255,0.07)',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:k.c}}/>
                  <div style={{position:'absolute',right:14,top:14,fontSize:'1.4rem',opacity:0.25}}>{k.e}</div>
                  <div style={{fontSize:'0.7rem',color:'#7a90b0',fontWeight:700,marginBottom:6}}>{k.label}</div>
                  <div style={{fontSize:'1.9rem',fontWeight:900,color:k.c,lineHeight:1}}>{k.v}{k.u}</div>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={{background:'#1c2535',borderRadius:14,padding:'18px 20px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:'0.88rem',fontWeight:800,marginBottom:14}}>🎖️ ランク別分布（{users.length}名）</div>
                {ranks.map((r,i)=>{
                  const cnt=users.filter(u=>getLv(u.total_xp||0).rank===r).length
                  const pct=users.length>0?Math.round(cnt/users.length*100):0
                  return<div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <div style={{width:90,fontSize:'0.75rem',fontWeight:800,color:rankColors[i]}}>{r}</div>
                    <div style={{flex:1,background:'#0f1623',borderRadius:6,height:18,overflow:'hidden'}}>
                      <div style={{height:'100%',borderRadius:6,background:rankColors[i],width:pct+'%',transition:'width 1s ease'}}/>
                    </div>
                    <div style={{fontSize:'0.72rem',color:'#7a90b0',fontWeight:700,width:28,textAlign:'right'}}>{cnt}名</div>
                  </div>
                })}
              </div>
              <div style={{background:'#1c2535',borderRadius:14,padding:'18px 20px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:'0.88rem',fontWeight:800,marginBottom:14}}>📅 最近のトレーニング</div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['販売者','スコア','XP','日時'].map(h=><th key={h} style={{textAlign:'left',fontSize:'0.7rem',color:'#4a607a',padding:'4px 8px',borderBottom:'1px solid rgba(255,255,255,0.07)',fontWeight:800}}>{h}</th>)}</tr></thead>
                  <tbody>{sessions.slice(0,10).map((s,i)=><tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',fontWeight:700}}>{s.user_name}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',color:s.score===s.total?'#06d6a0':'#3bbfef',fontWeight:800}}>{s.score}/{s.total}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',color:'#3bbfef',fontWeight:800}}>+{s.xp_gained}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.72rem',color:'#7a90b0'}}>{new Date(s.trained_at).toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</td>
                  </tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {!loading&&tab==='members'&&(
          <div>
            <h1 style={{fontSize:'1.3rem',fontWeight:900,marginBottom:20}}>👥 販売者一覧 <span style={{fontSize:'0.85rem',color:'#7a90b0',fontWeight:700}}>({users.length}名)</span></h1>
            <div style={{background:'#1c2535',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',overflow:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr style={{background:'rgba(0,0,0,0.2)'}}>
                  {['#','販売者名','レベル / ランク','累計XP','セッション数','最終参加'].map(h=><th key={h} style={{textAlign:'left',fontSize:'0.7rem',color:'#4a607a',padding:'10px 14px',fontWeight:800}}>{h}</th>)}
                </tr></thead>
                <tbody>{users.map((u,i)=>{
                  const lv=getLv(u.total_xp||0)
                  const days=u.last_trained_at?Math.floor((Date.now()-new Date(u.last_trained_at).getTime())/86400000):999
                  return<tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding:'10px 14px',color:'#4a607a',fontSize:'0.8rem'}}>{i+1}</td>
                    <td style={{padding:'10px 14px',fontWeight:800,fontSize:'0.85rem'}}>{u.user_name}</td>
                    <td style={{padding:'10px 14px'}}>
                      <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'3px 10px',borderRadius:20,fontSize:'0.72rem',fontWeight:800,background:'rgba(59,191,239,0.12)',color:'#3bbfef'}}>
                        {lv.emoji} Lv.{lv.lv} {lv.name}
                      </span>
                    </td>
                    <td style={{padding:'10px 14px',color:'#3bbfef',fontWeight:800,fontSize:'0.85rem'}}>{(u.total_xp||0).toLocaleString()} XP</td>
                    <td style={{padding:'10px 14px',color:'#7a90b0',fontSize:'0.82rem'}}>{u.session_count||0}回</td>
                    <td style={{padding:'10px 14px',fontSize:'0.75rem',color:days>30?'#ef476f':days>7?'#ff8c42':'#06d6a0',fontWeight:700}}>
                      {days===0?'今日':days===1?'昨日':days+' 日前'}
                    </td>
                  </tr>
                })}</tbody>
              </table>
              {users.length===0&&<div style={{textAlign:'center',padding:40,color:'#7a90b0',fontWeight:700}}>まだデータがありません</div>}
            </div>
          </div>
        )}
        {!loading&&tab==='ranking'&&(
          <div>
            <h1 style={{fontSize:'1.3rem',fontWeight:900,marginBottom:20}}>🏆 XPランキング</h1>
            <div style={{background:'#1c2535',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',overflow:'hidden'}}>
              {users.slice(0,20).map((u,i)=>{
                const lv=getLv(u.total_xp||0)
                const medal=i===0?'🥇':i===1?'🥈':i===2?'🥉':String(i+1)
                return<div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:'1px solid rgba(255,255,255,0.05)',background:i===0?'rgba(255,215,0,0.05)':i===1?'rgba(192,192,192,0.05)':i===2?'rgba(205,127,50,0.05)':'transparent'}}>
                  <div style={{width:32,textAlign:'center',fontSize:i<3?'1.2rem':'0.85rem',fontWeight:900,color:i===0?'#d4a000':i===1?'#888':i===2?'#a0632a':'#4a607a'}}>{medal}</div>
                  <div style={{width:42,height:42,borderRadius:11,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0,boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
                    <span>{lv.emoji}</span>
                    <span style={{fontSize:'0.55rem',fontWeight:800,color:'rgba(255,255,255,0.92)'}}>Lv.{lv.lv}</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:'0.88rem'}}>{u.user_name}</div>
                    <div style={{fontSize:'0.7rem',color:'#7a90b0'}}>{lv.name} / {lv.rank}</div>
                  </div>
                  <div style={{fontWeight:900,fontSize:'0.95rem',color:'#3bbfef'}}>{(u.total_xp||0).toLocaleString()} XP</div>
                </div>
              })}
              {users.length===0&&<div style={{textAlign:'center',padding:40,color:'#7a90b0',fontWeight:700}}>まだデータがありません</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const ALL_LV = [
  {lv:1,xp:0,name:'シリカの卵',emoji:'🥚',rank:'ルーキー',g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:2,xp:8,name:'シリカ見習い',emoji:'🌱',rank:'ルーキー',g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:3,xp:18,name:'ケイ素入門者',emoji:'💧',rank:'ルーキー',g:'linear-gradient(135deg,#3bbfef,#29b0e0)'},
  {lv:4,xp:32,name:'ケイ素学習者',emoji:'📖',rank:'ルーキー',g:'linear-gradient(135deg,#29b0e0,#1a8cc7)'},
  {lv:5,xp:50,name:'ケイ素研究生',emoji:'🔬',rank:'ルーキー',g:'linear-gradient(135deg,#1a8cc7,#1567a0)'},
  {lv:6,xp:75,name:'シリカセールス',emoji:'💼',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:7,xp:105,name:'ケイ素推進者',emoji:'📢',rank:'セールス',g:'linear-gradient(135deg,#ff8c42,#e07d00)'},
  {lv:8,xp:140,name:'シリカアドバイザー',emoji:'💡',rank:'セールス',g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:9,xp:180,name:'ケイ素インストラクター',emoji:'🎓',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:10,xp:230,name:'シリカスペシャリスト',emoji:'⭐',rank:'セールス',g:'linear-gradient(135deg,#ffd166,#ffb830)'},
  {lv:11,xp:290,name:'ケイ素エキスパート',emoji:'✨',rank:'エキスパート',g:'linear-gradient(135deg,#ff9500,#e07d00)'},
  {lv:12,xp:360,name:'シリカプロ',emoji:'💎',rank:'エキスパート',g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:13,xp:440,name:'ケイ素マスター候補',emoji:'🏅',rank:'エキスパート',g:'linear-gradient(135deg,#c56500,#aa5000)'},
  {lv:14,xp:540,name:'シリカエリート',emoji:'🎯',rank:'エキスパート',g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:15,xp:660,name:'ケイ素上級者',emoji:'🔥',rank:'エキスパート',g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:16,xp:800,name:'シリカマスター',emoji:'👑',rank:'マスター',g:'linear-gradient(135deg,#9b59b6,#6c3483)'},
  {lv:17,xp:980,name:'ケイ素博士',emoji:'🏆',rank:'マスター',g:'linear-gradient(135deg,#7d3c98,#6c3483)'},
  {lv:18,xp:1200,name:'シリカ師匠',emoji:'🌟',rank:'マスター',g:'linear-gradient(135deg,#6c3483,#5b2c6f)'},
  {lv:19,xp:1480,name:'ケイ素の賢者',emoji:'🧙',rank:'マスター',g:'linear-gradient(135deg,#6c3483,#4a235a)'},
  {lv:20,xp:1800,name:'シリカグランドマスター',emoji:'⚡',rank:'マスター',g:'linear-gradient(135deg,#5b2c6f,#4a235a)'},
  {lv:21,xp:2200,name:'ケイ素レジェンド',emoji:'🌈',rank:'レジェンド',g:'linear-gradient(135deg,#e74c3c,#c0392b)'},
  {lv:22,xp:2700,name:'シリカ伝道師',emoji:'🕊️',rank:'レジェンド',g:'linear-gradient(135deg,#c0392b,#a93226)'},
  {lv:23,xp:3300,name:'ケイ素の守護者',emoji:'🛡️',rank:'レジェンド',g:'linear-gradient(135deg,#f39c12,#d68910)'},
  {lv:24,xp:4000,name:'シリカセンセイ',emoji:'🎆',rank:'レジェンド',g:'linear-gradient(135deg,#d68910,#b7770d)'},
  {lv:25,xp:5000,name:'ケイ素の英雄',emoji:'🦅',rank:'レジェンド',g:'linear-gradient(135deg,#2ecc71,#1a9a50)'},
  {lv:26,xp:6500,name:'シリカ神話の使者',emoji:'🌙',rank:'神',g:'linear-gradient(135deg,#1abc9c,#148f77)'},
  {lv:27,xp:8500,name:'ケイ素の申し子',emoji:'☀️',rank:'神',g:'linear-gradient(135deg,#2c3e50,#1a252f)'},
  {lv:28,xp:11000,name:'シリカ不滅の存在',emoji:'💫',rank:'神',g:'linear-gradient(135deg,#8e44ad,#6c3483)'},
  {lv:29,xp:15000,name:'ケイ素の化身',emoji:'🔮',rank:'神',g:'linear-gradient(135deg,#2980b9,#1a5276)'},
  {lv:30,xp:20000,name:'ケイソ神',emoji:'⚡',rank:'神',g:'linear-gradient(135deg,#f39c12,#e74c3c)'},
]
function getLv(xp){let r=ALL_LV[0];for(let i=ALL_LV.length-1;i>=0;i--){if(xp>=ALL_LV[i].xp){r=ALL_LV[i];break}}return r}

export default function AdminPage(){
  const[users,setUsers]=useState([])
  const[sessions,setSessions]=useState([])
  const[loading,setLoading]=useState(true)
  const[tab,setTab]=useState('dashboard')
  const[updated,setUpdated]=useState('')

  async function load(){
    setLoading(true)
    const{data:u}=await supabase.from('silica_training_users').select('*').order('total_xp',{ascending:false})
    const{data:s}=await supabase.from('silica_training_sessions').select('*').order('trained_at',{ascending:false}).limit(100)
    setUsers(u||[]);setSessions(s||[])
    setUpdated(new Date().toLocaleTimeString('ja-JP'))
    setLoading(false)
  }
  useEffect(()=>{load()},[])

  const today=new Date().toISOString().split('T')[0]
  const todayUsers=new Set(sessions.filter(s=>s.trained_at?.startsWith(today)).map(s=>s.user_name)).size
  const avgRate=users.length>0?Math.round(users.reduce((a,u)=>a+(u.total_questions>0?u.correct_count/u.total_questions*100:0),0)/users.length):0
  const ranks=['ルーキー','セールス','エキスパート','マスター','レジェンド','神']
  const rankColors=['#3bbfef','#ff8c42','#ff6b35','#9b59b6','#e74c3c','#f39c12']

  const S={side:{display:'flex',alignItems:'center',gap:8,padding:'9px 16px',cursor:'pointer',fontSize:'0.85rem',fontWeight:700,borderLeft:'3px solid transparent',transition:'all 0.15s',color:'#7a90b0'}}

  return(
    <div style={{display:'flex',minHeight:'100vh',background:'#0f1623',fontFamily:"'M PLUS Rounded 1c',sans-serif",color:'#e8eef8'}}>
      <div style={{width:200,background:'#161e2e',borderRight:'1px solid rgba(255,255,255,0.07)',padding:'20px 0',display:'flex',flexDirection:'column',position:'fixed',height:'100vh',zIndex:100}}>
        <div style={{padding:'0 16px 20px',borderBottom:'1px solid rgba(255,255,255,0.07)',marginBottom:12}}>
          <div style={{fontSize:'0.9rem',fontWeight:900,color:'#3bbfef'}}>💧 シリカ管理画面</div>
          <div style={{fontSize:'0.68rem',color:'#7a90b0',marginTop:2}}>Silica Training Admin</div>
        </div>
        {[['dashboard','📊','ダッシュボード'],['members','👥','販売者一覧'],['ranking','🏆','ランキング']].map(([t,icon,label])=>(
          <div key={t} onClick={()=>setTab(t)} style={{...S.side,color:tab===t?'#3bbfef':'#7a90b0',borderLeftColor:tab===t?'#3bbfef':'transparent',background:tab===t?'rgba(59,191,239,0.15)':'transparent'}}>
            <span>{icon}</span>{label}
          </div>
        ))}
        <div style={{marginTop:'auto',padding:'12px 16px',borderTop:'1px solid rgba(255,255,255,0.07)',fontSize:'0.68rem',color:'#4a607a'}}>
          最終更新: {updated}
          <button onClick={load} style={{display:'block',marginTop:6,padding:'4px 10px',background:'rgba(59,191,239,0.15)',border:'1px solid rgba(59,191,239,0.3)',color:'#3bbfef',borderRadius:8,fontSize:'0.7rem',fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>🔄 更新</button>
        </div>
      </div>
      <div style={{marginLeft:200,flex:1,padding:'24px 28px'}}>
        {loading&&<div style={{textAlign:'center',padding:40,color:'#3bbfef',fontSize:'1.1rem',fontWeight:700}}>読み込み中...</div>}
        {!loading&&tab==='dashboard'&&(
          <div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
              <h1 style={{fontSize:'1.3rem',fontWeight:900}}>📊 ダッシュボード</h1>
              <div style={{display:'flex',alignItems:'center',gap:8,background:'rgba(6,214,160,0.15)',border:'1px solid rgba(6,214,160,0.3)',padding:'5px 12px',borderRadius:20,fontSize:'0.75rem',fontWeight:700,color:'#06d6a0'}}>
                ● リアルタイム
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
              {[{label:'登録販売者数',v:users.length,u:'名',c:'#3bbfef',e:'👥'},{label:'今日の参加者',v:todayUsers,u:'名',c:'#06d6a0',e:'✅'},{label:'累計セッション',v:sessions.length,u:'回',c:'#ff8c42',e:'🔥'},{label:'平均正解率',v:avgRate,u:'%',c:'#9b59b6',e:'⭐'}].map((k,i)=>(
                <div key={i} style={{background:'#1c2535',borderRadius:14,padding:'16px 18px',border:'1px solid rgba(255,255,255,0.07)',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:k.c}}/>
                  <div style={{position:'absolute',right:14,top:14,fontSize:'1.4rem',opacity:0.25}}>{k.e}</div>
                  <div style={{fontSize:'0.7rem',color:'#7a90b0',fontWeight:700,marginBottom:6}}>{k.label}</div>
                  <div style={{fontSize:'1.9rem',fontWeight:900,color:k.c,lineHeight:1}}>{k.v}{k.u}</div>
                </div>
              ))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div style={{background:'#1c2535',borderRadius:14,padding:'18px 20px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:'0.88rem',fontWeight:800,marginBottom:14}}>🎖️ ランク別分布（{users.length}名）</div>
                {ranks.map((r,i)=>{
                  const cnt=users.filter(u=>getLv(u.total_xp||0).rank===r).length
                  const pct=users.length>0?Math.round(cnt/users.length*100):0
                  return<div key={i} style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
                    <div style={{width:90,fontSize:'0.75rem',fontWeight:800,color:rankColors[i]}}>{r}</div>
                    <div style={{flex:1,background:'#0f1623',borderRadius:6,height:18,overflow:'hidden'}}>
                      <div style={{height:'100%',borderRadius:6,background:rankColors[i],width:pct+'%',transition:'width 1s ease'}}/>
                    </div>
                    <div style={{fontSize:'0.72rem',color:'#7a90b0',fontWeight:700,width:28,textAlign:'right'}}>{cnt}名</div>
                  </div>
                })}
              </div>
              <div style={{background:'#1c2535',borderRadius:14,padding:'18px 20px',border:'1px solid rgba(255,255,255,0.07)'}}>
                <div style={{fontSize:'0.88rem',fontWeight:800,marginBottom:14}}>📅 最近のトレーニング</div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['販売者','スコア','XP','日時'].map(h=><th key={h} style={{textAlign:'left',fontSize:'0.7rem',color:'#4a607a',padding:'4px 8px',borderBottom:'1px solid rgba(255,255,255,0.07)',fontWeight:800}}>{h}</th>)}</tr></thead>
                  <tbody>{sessions.slice(0,10).map((s,i)=><tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',fontWeight:700}}>{s.user_name}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',color:s.score===s.total?'#06d6a0':'#3bbfef',fontWeight:800}}>{s.score}/{s.total}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.8rem',color:'#3bbfef',fontWeight:800}}>+{s.xp_gained}</td>
                    <td style={{padding:'7px 8px',fontSize:'0.72rem',color:'#7a90b0'}}>{new Date(s.trained_at).toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</td>
                  </tr>)}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {!loading&&tab==='members'&&(
          <div>
            <h1 style={{fontSize:'1.3rem',fontWeight:900,marginBottom:20}}>👥 販売者一覧 <span style={{fontSize:'0.85rem',color:'#7a90b0',fontWeight:700}}>({users.length}名)</span></h1>
            <div style={{background:'#1c2535',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',overflow:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr style={{background:'rgba(0,0,0,0.2)'}}>
                  {['#','販売者名','レベル / ランク','累計XP','セッション数','最終参加'].map(h=><th key={h} style={{textAlign:'left',fontSize:'0.7rem',color:'#4a607a',padding:'10px 14px',fontWeight:800}}>{h}</th>)}
                </tr></thead>
                <tbody>{users.map((u,i)=>{
                  const lv=getLv(u.total_xp||0)
                  const days=u.last_trained_at?Math.floor((Date.now()-new Date(u.last_trained_at).getTime())/86400000):999
                  return<tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding:'10px 14px',color:'#4a607a',fontSize:'0.8rem'}}>{i+1}</td>
                    <td style={{padding:'10px 14px',fontWeight:800,fontSize:'0.85rem'}}>{u.user_name}</td>
                    <td style={{padding:'10px 14px'}}>
                      <span style={{display:'inline-flex',alignItems:'center',gap:6,padding:'3px 10px',borderRadius:20,fontSize:'0.72rem',fontWeight:800,background:'rgba(59,191,239,0.12)',color:'#3bbfef'}}>
                        {lv.emoji} Lv.{lv.lv} {lv.name}
                      </span>
                    </td>
                    <td style={{padding:'10px 14px',color:'#3bbfef',fontWeight:800,fontSize:'0.85rem'}}>{(u.total_xp||0).toLocaleString()} XP</td>
                    <td style={{padding:'10px 14px',color:'#7a90b0',fontSize:'0.82rem'}}>{u.session_count||0}回</td>
                    <td style={{padding:'10px 14px',fontSize:'0.75rem',color:days>30?'#ef476f':days>7?'#ff8c42':'#06d6a0',fontWeight:700}}>
                      {days===0?'今日':days===1?'昨日':days+' 日前'}
                    </td>
                  </tr>
                })}</tbody>
              </table>
              {users.length===0&&<div style={{textAlign:'center',padding:40,color:'#7a90b0',fontWeight:700}}>まだデータがありません</div>}
            </div>
          </div>
        )}
        {!loading&&tab==='ranking'&&(
          <div>
            <h1 style={{fontSize:'1.3rem',fontWeight:900,marginBottom:20}}>🏆 XPランキング</h1>
            <div style={{background:'#1c2535',borderRadius:14,border:'1px solid rgba(255,255,255,0.07)',overflow:'hidden'}}>
              {users.slice(0,20).map((u,i)=>{
                const lv=getLv(u.total_xp||0)
                const medal=i===0?'🥇':i===1?'🥈':i===2?'🥉':String(i+1)
                return<div key={i} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:'1px solid rgba(255,255,255,0.05)',background:i===0?'rgba(255,215,0,0.05)':i===1?'rgba(192,192,192,0.05)':i===2?'rgba(205,127,50,0.05)':'transparent'}}>
                  <div style={{width:32,textAlign:'center',fontSize:i<3?'1.2rem':'0.85rem',fontWeight:900,color:i===0?'#d4a000':i===1?'#888':i===2?'#a0632a':'#4a607a'}}>{medal}</div>
                  <div style={{width:42,height:42,borderRadius:11,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',flexShrink:0,boxShadow:'0 2px 8px rgba(0,0,0,0.2)'}}>
                    <span>{lv.emoji}</span>
                    <span style={{fontSize:'0.55rem',fontWeight:800,color:'rgba(255,255,255,0.92)'}}>Lv.{lv.lv}</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:'0.88rem'}}>{u.user_name}</div>
                    <div style={{fontSize:'0.7rem',color:'#7a90b0'}}>{lv.name} / {lv.rank}</div>
                  </div>
                  <div style={{fontWeight:900,fontSize:'0.95rem',color:'#3bbfef'}}>{(u.total_xp||0).toLocaleString()} XP</div>
                </div>
              })}
              {users.length===0&&<div style={{textAlign:'center',padding:40,color:'#7a90b0',fontWeight:700}}>まだデータがありません</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
