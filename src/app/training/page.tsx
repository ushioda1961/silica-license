'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
const LEVELS = [
  {lv:1,name:'シリカの卵',emoji:'🥚',rank:'ルーキー',xp:0,g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:2,name:'シリカ見習い',emoji:'🌱',rank:'ルーキー',xp:8,g:'linear-gradient(135deg,#a8e6cf,#3bbfef)'},
  {lv:3,name:'ケイ素入門者',emoji:'💧',rank:'ルーキー',xp:18,g:'linear-gradient(135deg,#3bbfef,#29b0e0)'},
  {lv:4,name:'ケイ素学習者',emoji:'📖',rank:'ルーキー',xp:32,g:'linear-gradient(135deg,#29b0e0,#1a8cc7)'},
  {lv:5,name:'ケイ素研究生',emoji:'🔬',rank:'ルーキー',xp:50,g:'linear-gradient(135deg,#1a8cc7,#1567a0)'},
  {lv:6,name:'シリカセールス',emoji:'💼',rank:'セールス',xp:75,g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:7,name:'ケイ素推進者',emoji:'📢',rank:'セールス',xp:105,g:'linear-gradient(135deg,#ff8c42,#e07d00)'},
  {lv:8,name:'シリカアドバイザー',emoji:'💡',rank:'セールス',xp:140,g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:9,name:'ケイ素インストラクター',emoji:'🎓',rank:'セールス',xp:180,g:'linear-gradient(135deg,#ffd166,#ff8c42)'},
  {lv:10,name:'シリカスペシャリスト',emoji:'⭐',rank:'セールス',xp:230,g:'linear-gradient(135deg,#ffd166,#ffb830)'},
  {lv:11,name:'ケイ素エキスパート',emoji:'✨',rank:'エキスパート',xp:290,g:'linear-gradient(135deg,#ff9500,#e07d00)'},
  {lv:12,name:'シリカプロ',emoji:'💎',rank:'エキスパート',xp:360,g:'linear-gradient(135deg,#e07d00,#c56500)'},
  {lv:13,name:'ケイ素マスター候補',emoji:'🏅',rank:'エキスパート',xp:440,g:'linear-gradient(135deg,#c56500,#aa5000)'},
  {lv:14,name:'シリカエリート',emoji:'🎯',rank:'エキスパート',xp:540,g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:15,name:'ケイ素上級者',emoji:'🔥',rank:'エキスパート',xp:660,g:'linear-gradient(135deg,#ef476f,#d63060)'},
  {lv:16,name:'シリカマスター',emoji:'👑',rank:'マスター',xp:800,g:'linear-gradient(135deg,#9b59b6,#6c3483)'},
  {lv:17,name:'ケイ素博士',emoji:'🏆',rank:'マスター',xp:980,g:'linear-gradient(135deg,#7d3c98,#6c3483)'},
  {lv:18,name:'シリカ師匠',emoji:'🌟',rank:'マスター',xp:1200,g:'linear-gradient(135deg,#6c3483,#5b2c6f)'},
  {lv:19,name:'ケイ素の賢者',emoji:'🧙',rank:'マスター',xp:1480,g:'linear-gradient(135deg,#6c3483,#4a235a)'},
  {lv:20,name:'シリカグランドマスター',emoji:'⚡',rank:'マスター',xp:1800,g:'linear-gradient(135deg,#5b2c6f,#4a235a)'},
  {lv:21,name:'ケイ素レジェンド',emoji:'🌈',rank:'レジェンド',xp:2200,g:'linear-gradient(135deg,#e74c3c,#c0392b)'},
  {lv:22,name:'シリカ伝道師',emoji:'🕊️',rank:'レジェンド',xp:2700,g:'linear-gradient(135deg,#c0392b,#a93226)'},
  {lv:23,name:'ケイ素の守護者',emoji:'🛡️',rank:'レジェンド',xp:3300,g:'linear-gradient(135deg,#f39c12,#d68910)'},
  {lv:24,name:'シリカセンセイ',emoji:'🎆',rank:'レジェンド',xp:4000,g:'linear-gradient(135deg,#d68910,#b7770d)'},
  {lv:25,name:'ケイ素の英雄',emoji:'🦅',rank:'レジェンド',xp:5000,g:'linear-gradient(135deg,#2ecc71,#1a9a50)'},
  {lv:26,name:'シリカ神話の使者',emoji:'🌙',rank:'神',xp:6500,g:'linear-gradient(135deg,#1abc9c,#148f77)'},
  {lv:27,name:'ケイ素の申し子',emoji:'☀️',rank:'神',xp:8500,g:'linear-gradient(135deg,#2c3e50,#1a252f)'},
  {lv:28,name:'シリカ不滅の存在',emoji:'💫',rank:'神',xp:11000,g:'linear-gradient(135deg,#8e44ad,#6c3483)'},
  {lv:29,name:'ケイ素の化身',emoji:'🔮',rank:'神',xp:15000,g:'linear-gradient(135deg,#2980b9,#1a5276)'},
  {lv:30,name:'ケイソ神',emoji:'⚡',rank:'神',xp:20000,g:'linear-gradient(135deg,#f39c12,#e74c3c)'},
]
const QS = [
  {q:"シリカクリエーション株式会社の本社はどこにありますか？",o:["東京都新宿区","福井県福井市","大阪府大阪市","愛知県名古屋市"],a:1,e:"本社は福井県福井市です。",d:"easy"},
  {q:"ケイ素の元素番号は何番ですか？",o:["8番","12番","14番","20番"],a:2,e:"ケイ素の元素記号はSi、元素番号14番です。",d:"easy"},
  {q:"地球でケイ素は何番目に多い元素ですか？",o:["1番目","2番目","5番目","10番目"],a:1,e:"地球で最も多いのは酸素（49%）、2番目がケイ素（33%）です。",d:"easy"},
  {q:"水晶はケイ素をどのくらい含んでいますか？",o:["約50%","約75%","約90%","約99.9%"],a:3,e:"水晶は99.9%がケイ素でできています。",d:"easy"},
  {q:"シリカクリエーションのケイ素の原料は？",o:["水晶","石英","花こう岩","大理石"],a:1,e:"原料は石英という石です。",d:"easy"},
  {q:"体内でケイ素の最も重要な役割は？",o:["カルシウムを吸収する","弾力を構成する","脂肪を燃焼する","ビタミンを合成する"],a:1,e:"ケイ素の最大の役割は弾力を構成することです。",d:"easy"},
  {q:"ケイ素不足が最初に現れやすい症状は？",o:["視力低下","爪が割れる・白髪が増える","食欲がなくなる","頭痛がする"],a:1,e:"ミネラル不足で最初に出る症状は爪・髪のトラブルです。",d:"easy"},
  {q:"水溶性ケイ素の精菌力とは？",o:["菌を全て殺す殺菌力","菌のバランスを整える力","菌を増やす力","菌から体を守るバリア"],a:1,e:"精菌力は菌を殺すのではなくバランスを整える力です！",d:"hard"},
  {q:"石英をイオン化するために必要な温度は？",o:["600℃","900℃","1200℃","1650℃"],a:3,e:"石英を1650℃という高温で燃焼するとケイ素がイオン化します。",d:"hard"},
  {q:"ホワイトシリカの濃度として正しいのは？",o:["1,000ppm以上","3,500ppm以上","8,300ppm以上","12,000ppm以上"],a:2,e:"ホワイトシリカは8,300ppm以上という高濃度で作られています。",d:"hard"},
  {q:"1日に摂取するホワイトシリカの目安量は？",o:["1〜3cc","5cc","10〜20cc","50cc以上"],a:2,e:"1日の目安は10〜20ccです。",d:"easy"},
  {q:"ホワイトシリカを飲む場合の推奨希釈倍率は？",o:["10〜20倍","50倍","100〜200倍","500倍以上"],a:2,e:"100〜200倍に希釈して飲むことが推奨されています。",d:"easy"},
  {q:"現在、日本人の何割がミネラル不足？",o:["3割","5割","7割","9割"],a:3,e:"日本人の9割がミネラル不足に陥っていると言われています。",d:"easy"},
  {q:"水溶性ケイ素の8つの特徴に含まれないのは？",o:["脂肪溶解力","抗酸化力","筋肉増強力","浸透力"],a:2,e:"8つの特徴：消炎力・脂肪溶解力・抗酸化力・洗浄力・中和力・浸透力・精菌力・テラヘルツ。",d:"hard"},
  {q:"ホワイトシリカを火にかけるとどうなりますか？",o:["全て蒸発する","毒素が発生する","性質は変わらない","効果が2倍になる"],a:2,e:"火にかけても性質は全く変わりません。料理での活用もできます。",d:"easy"},
]
function getLv(xp: number){let r=LEVELS[0];for(let i=LEVELS.length-1;i>=0;i--){if(xp>=LEVELS[i].xp){r=LEVELS[i];break}}return r}
function getNextLv(xp: number){for(const l of LEVELS){if(xp<l.xp)return l}return null}
function shuffle(arr: unknown[]){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export default function TrainingPage(){
  const[sc,setSc]=useState('register')
  const[nm,setNm]=useState('')
  const[inp,setInp]=useState('')
  const[xp,setXp]=useState(0)
  const[sxp,setSxp]=useState(0)
  const[qs,setQs]=useState([])
  const[qi,setQi]=useState(0)
  const[sc2,setSc2]=useState(0)
  const[st,setSt]=useState(0)
  const[ans,setAns]=useState(false)
  const[sel,setSel]=useState(null)
  const[fb,setFb]=useState('')
  const[lum,setLum]=useState('')
  const[sav,setSav]=useState(false)
  async function loadU(n){const{data}=await supabase.from('silica_training_users').select('total_xp').eq('user_name',n).single();if(data)setXp(data.total_xp||0)}
  async function reg(){
    if(!inp.trim())return
    setNm(inp.trim())
    const{data}=await supabase.from('silica_training_users').select('user_name').eq('user_name',inp.trim()).single()
    if(!data)await supabase.from('silica_training_users').insert({user_name:inp.trim()})
    await loadU(inp.trim())
    setSc('start')
  }
  async function start(){
    await loadU(nm)
    setQs(shuffle(QS).slice(0,5));setQi(0);setSc2(0);setSt(0);setSxp(0);setAns(false);setSel(null);setFb('');setSc('quiz')
  }
  async function pick(idx){
    if(ans)return
    setAns(true);setSel(idx)
    const q=qs[qi]
    const ok=idx===q.a
    let ax=q.d==='hard'?3:2
    let ns=st
    if(ok){ns=st+1;if(ns>=3)ax+=1;setSc2(s=>s+1);setSt(ns)}else{ns=0;setSt(0)}
    const add=ok?ax:0
    setFb(ok?'✅ 正解！+'+add+'XP'+(ns>=3?' 🔥ボーナス！':'')+'\n'+q.e:'❌ 正解は「'+q.o[q.a]+'」\n'+q.e)
    if(ok){const pl=getLv(xp);const nx=xp+add;const nl=getLv(nx);setXp(nx);setSxp(s=>s+add);if(nl.lv>pl.lv)setLum('🎉 レベルアップ！Lv.'+nl.lv+' '+nl.name)}
  }
  async function next(){
    if(qi+1>=qs.length){
      setSav(true)
      await supabase.from('silica_training_sessions').insert({user_name:nm,score:sc2,total:qs.length,xp_gained:sxp})
      await supabase.from('silica_training_users').update({total_xp:xp,level:getLv(xp).lv,last_trained_at:new Date().toISOString()}).eq('user_name',nm)
      setSav(false);setSc('result')
    }else{setQi(i=>i+1);setAns(false);setSel(null);setFb('')}
  }
  const lv=getLv(xp);const nx=getNextLv(xp)
  const pg=nx?Math.round((xp-lv.xp)/(nx.xp-lv.xp)*100):100
  const q=qs[qi]
  const W=(p)=>({...p})
  return(
    <div style={{minHeight:'100vh',background:'linear-gradient(160deg,#b8eaff 0%,#e8f9ff 40%,#fffbe6 100%)',fontFamily:"'M PLUS Rounded 1c',sans-serif",padding:'20px 16px 60px'}}>
      <div style={{maxWidth:560,margin:'0 auto'}}>
        <h1 style={{textAlign:'center',fontSize:'1.4rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>💧 ケイソくんトレーニング</h1>
        {sc!=='register'&&<div style={{background:'white',borderRadius:16,padding:'12px 16px',marginBottom:12,boxShadow:'0 4px 16px rgba(59,191,239,0.15)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
            <div style={{width:52,height:52,borderRadius:12,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.4rem'}}><span>{lv.emoji}</span><span style={{fontSize:'0.6rem',fontWeight:800,color:'rgba(255,255,255,0.9)'}}>Lv.{lv.lv}</span></div>
            <div><div style={{fontWeight:900,color:'#2d3a4a'}}>{lv.name}</div><div style={{fontSize:'0.72rem',color:'#6b7f92'}}>👤 {nm} / {lv.rank}</div></div>
          </div>
          <div style={{background:'rgba(0,0,0,0.07)',borderRadius:20,height:12,overflow:'hidden'}}><div style={{height:'100%',borderRadius:20,background:lv.g,width:pg+'%',transition:'width 0.8s ease'}}/></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.68rem',color:'#6b7f92',marginTop:4,fontWeight:700}}>
            <span>累計 {xp.toLocaleString()} XP</span><span>{nx?'次のLvまで: '+(nx.xp-xp)+' XP':'⚡ 最高レベル達成！'}</span>
          </div>
        </div>}
        {sc==='register'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'4rem',marginBottom:8}}>💧</div>
          <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>ケイソくんトレーニング</h2>
          <p style={{fontSize:'0.85rem',color:'#6b7f92',fontWeight:700,marginBottom:20}}>毎日5問でケイ素の知識を身につけよう！XPを獲得してレベルアップ🏆</p>
          <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==='Enter'&&reg()} placeholder="あなたの名前を入力" style={{width:'100%',padding:'12px 16px',border:'2.5px solid #daedf7',borderRadius:12,fontSize:'1rem',fontWeight:700,marginBottom:12,outline:'none',fontFamily:'inherit'}}/>
          <button onClick={reg} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer',fontFamily:'inherit'}}>スタート！🚀</button>
        </div>}
        {sc==='start'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'3rem',marginBottom:8}}>🎯</div>
          <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>今日のトレーニング</h2>
          <p style={{fontSize:'0.85rem',color:'#6b7f92',fontWeight:700,marginBottom:20}}>5問チャレンジ！正解してXPを獲得🔥</p>
          {lum&&<div style={{background:'#e6fff7',border:'2px solid #06d6a0',borderRadius:12,padding:12,marginBottom:16,fontWeight:800,color:'#008060'}}>{lum}</div>}
          <button onClick={start} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer',fontFamily:'inherit'}}>スタート！🚀</button>
        </div>}
        {sc==='quiz'&&q&&<div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            {[{n:sc2,l:'✅ 正解'},{n:st,l:'🔥 連続'},{n:5-qi,l:'📚 残り'}].map((s,i)=>(
              <div key={i} style={{flex:1,background:'white',borderRadius:12,padding:'8px 10px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
                <div style={{fontSize:'1.3rem',fontWeight:900,color:'#1a8cc7'}}>{s.n}</div>
                <div style={{fontSize:'0.65rem',color:'#6b7f92',fontWeight:700}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:20,padding:'20px 18px',boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
            <span style={{display:'inline-block',background:'#3bbfef',color:'white',fontSize:'0.68rem',fontWeight:800,padding:'3px 11px',borderRadius:20,marginBottom:10}}>Q{qi+1}</span>
            <div style={{fontSize:'0.97rem',fontWeight:800,color:'#2d3a4a',marginBottom:14,lineHeight:1.6}}>{q.q}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {q.o.map((op,i)=>{
                let bg='white',bd='2.5px solid #daedf7',co='#2d3a4a'
                if(ans){if(i===q.a){bg='#e6fff7';bd='2.5px solid #06d6a0';co='#00a77a'}else if(i===sel){bg='#fff0f4';bd='2.5px solid #ef476f';co='#ef476f'}}
                return<button key={i} onClick={()=>pick(i)} disabled={ans} style={{background:bg,border:bd,borderRadius:12,padding:'11px 14px',fontFamily:'inherit',fontSize:'0.91rem',fontWeight:700,color:co,cursor:ans?'default':'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:9}}>
                  <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:24,height:24,background:ans&&i===q.a?'#06d6a0':ans&&i===sel?'#ef476f':'#e8f5ff',borderRadius:7,fontSize:'0.76rem',fontWeight:900,color:ans&&(i===q.a||i===sel)?'white':'#1a8cc7',flexShrink:0}}>{['A','B','C','D'][i]}</span>{op}
                </button>
              })}
            </div>
            {fb&&<div style={{marginTop:12,padding:'11px 14px',borderRadius:12,background:sel===q.a?'#e6fff7':'#fff0f4',border:sel===q.a?'2px solid #06d6a0':'2px solid #ef476f',fontSize:'0.85rem',fontWeight:700,color:sel===q.a?'#008060':'#c0003a',lineHeight:1.5,whiteSpace:'pre-line'}}>{fb}</div>}
            {ans&&<button onClick={next} style={{width:'100%',marginTop:10,padding:13,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.95rem',fontWeight:800,cursor:'pointer'}}>{qi+1>=qs.length?(sav?'保存中...':'結果を見る 🏆'):'次の問題へ ▶'}</button>}
          </div>
        </div>}
        {sc==='result'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'3.5rem',fontWeight:900,color:'#1a8cc7'}}>{sc2}<span style={{fontSize:'1.6rem',color:'#ff8c42'}}>/{qs.length}問</span></div>
          <div style={{fontSize:'0.95rem',fontWeight:700,color:'#2d3a4a',marginTop:8,marginBottom:16}}>{sc2===5?'🏆 パーフェクト！':sc2>=4?'⭐ すばらしい！':sc2>=3?'😊 よくできました！':'📚 復習してまたチャレンジ！'}</div>
          <div style={{background:'#f0faff',borderRadius:14,padding:'14px 18px',marginBottom:20,display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:48,height:48,borderRadius:12,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.3rem'}}><span>{lv.emoji}</span><span style={{fontSize:'0.58rem',fontWeight:800,color:'rgba(255,255,255,0.92)'}}>Lv.{lv.lv}</span></div>
            <div><div style={{fontWeight:900,color:'#2d3a4a'}}>{lv.name}</div><div style={{fontSize:'0.73rem',color:'#6b7f92',fontWeight:700}}>累計 {xp.toLocaleString()} XP（今回 +{sxp} XP！）</div></div>
          </div>
          {lum&&<div style={{background:'#e6fff7',border:'2px solid #06d6a0',borderRadius:12,padding:12,marginBottom:16,fontWeight:800,color:'#008060'}}>{lum}</div>}
          <button onClick={()=>{setLum('');setSc('start')}} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#ff8c42,#ff6b1a)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.98rem',fontWeight:800,cursor:'pointer'}}>もう一度チャレンジ！🔄</button>
        </div>}
      </div>
    </div>
  )
}
