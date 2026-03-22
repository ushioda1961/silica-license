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
  {lv:16,name:'シリカマスター',emoji:'👑',rank:'マスター',xp:800,g:'linear-gradient(135deg,#9b59b6,#6c3483)'},
  {lv:17,name:'ケイ素博士',emoji:'🏆',rank:'マスター',xp:980,g:'linear-gradient(135deg,#7d3c98,#6c3483)'},
  {lv:30,name:'ケイソ神',emoji:'⚡',rank:'神',xp:20000,g:'linear-gradient(135deg,#f39c12,#e74c3c)'},
]
const QUESTIONS = [
  {q:"シリカクリエーション株式会社の本社はどこにありますか？",options:["東京都新宿区","福井県福井市","大阪府大阪市","愛知県名古屋市"],answer:1,explanation:"本社は福井県福井市です。",diff:"easy"},
  {q:"ケイ素の元素番号は何番ですか？",options:["8番","12番","14番","20番"],answer:2,explanation:"ケイ素の元素記号はSi、元素番号14番です。",diff:"easy"},
  {q:"地球でケイ素は何番目に多い元素？",options:["1番目","2番目","5番目","10番目"],answer:1,explanation:"地球で最も多いのは酸素（49%）、2番目がケイ素（33%）です。",diff:"easy"},
  {q:"水晶はケイ素をどのくらい含んでいますか？",options:["約50%","約75%","約90%","約99.9%"],answer:3,explanation:"水晶は99.9%がケイ素でできています。",diff:"easy"},
  {q:"シリカクリエーションのケイ素の原料は？",options:["水晶","石英","花こう岩","大理石"],answer:1,explanation:"シリカクリエーションのケイ素の原料は石英という石です。",diff:"easy"},
  {q:"体内でケイ素の最も重要な役割は？",options:["カルシウムを吸収する","弾力を構成する","脂肪を燃焼する","ビタミンを合成する"],answer:1,explanation:"ケイ素の最大の役割は弾力を構成することです。",diff:"easy"},
  {q:"ケイ素不足が最初に現れやすい症状は？",options:["視力低下","爪が割れる・白髪が増える","食欲がなくなる","頭痛がする"],answer:1,explanation:"ミネラル不足で最初に出る症状は爪・髪のトラブルです。",diff:"easy"},
  {q:"水溶性ケイ素の精菌力とは？",options:["菌を全て殺す殺菌力","菌のバランスを整える力","菌を増やす力","菌から体を守るバリア"],answer:1,explanation:"精菌力は菌を殺すのではなく、バランスを整える力です！",diff:"hard"},
  {q:"石英をイオン化するために必要な温度は？",options:["600℃","900℃","1200℃","1650℃"],answer:3,explanation:"石英という石を1650℃という高温で燃焼するとケイ素がイオン化します。",diff:"hard"},
  {q:"ホワイトシリカの濃度として正しいのは？",options:["1,000ppm以上","3,500ppm以上","8,300ppm以上","12,000ppm以上"],answer:2,explanation:"ホワイトシリカは8,300ppm以上という高濃度で作られています。",diff:"hard"},
  {q:"一般的な大人が1日に摂取するホワイトシリカの目安量は？",options:["1〜3cc","5cc","10〜20cc","50cc以上"],answer:2,explanation:"1日の目安は10〜20ccです。体の大きさや食生活によって調整します。",diff:"easy"},
  {q:"ホワイトシリカを飲む場合の推奨希釈倍率は？",options:["10〜20倍","50倍","100〜200倍","500倍以上"],answer:2,explanation:"原液で飲むと飲みにくいため、100〜200倍に希釈して飲むことが推奨されています。",diff:"easy"},
  {q:"現在、日本人の何割がミネラル不足？",options:["3割","5割","7割","9割"],answer:3,explanation:"日本人の9割がミネラル不足に陥っていると言われています。",diff:"easy"},
  {q:"水溶性ケイ素の8つの特徴に含まれないのは？",options:["脂肪溶解力","抗酸化力","筋肉増強力","浸透力"],answer:2,explanation:"8つの特徴：消炎力・脂肪溶解力・抗酸化力・洗浄力・中和力・浸透力・精菌力・テラヘルツ。筋肉増強力は含まれません。",diff:"hard"},
  {q:"ホワイトシリカ10ccに含まれるケイ素量は？",options:["50mg","100mg","166mg","300mg"],answer:2,explanation:"ホワイトシリカ10ccで約166mgのケイ素が摂取できます。1リットルでは16,600mgになります。",diff:"hard"},
]
function getLv(xp){let r=LEVELS[0];for(let i=LEVELS.length-1;i>=0;i--){if(xp>=LEVELS[i].xp){r=LEVELS[i];break}}return r}
function getNextLv(xp){for(const l of LEVELS){if(xp<l.xp)return l}return null}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

export default function TrainingPage(){
  const[screen,setScreen]=useState('register')
  const[userName,setUserName]=useState('')
  const[inputName,setInputName]=useState('')
  const[totalXP,setTotalXP]=useState(0)
  const[sessionXP,setSessionXP]=useState(0)
  const[questions,setQuestions]=useState([])
  const[qIdx,setQIdx]=useState(0)
  const[score,setScore]=useState(0)
  const[streak,setStreak]=useState(0)
  const[answered,setAnswered]=useState(false)
  const[selected,setSelected]=useState(null)
  const[feedback,setFeedback]=useState('')
  const[levelUpMsg,setLevelUpMsg]=useState('')
  const[saving,setSaving]=useState(false)

  async function loadUser(name){
    const{data}=await supabase.from('silica_training_users').select('total_xp').eq('user_name',name).single()
    if(data)setTotalXP(data.total_xp||0)
  }
  async function handleRegister(){
    if(!inputName.trim())return
    const name=inputName.trim()
    setUserName(name)
    const{data}=await supabase.from('silica_training_users').select('user_name').eq('user_name',name).single()
    if(!data)await supabase.from('silica_training_users').insert({user_name:name})
    await loadUser(name)
    setScreen('start')
  }
  async function startQuiz(){
    await loadUser(userName)
    setQuestions(shuffle(QUESTIONS).slice(0,5))
    setQIdx(0);setScore(0);setStreak(0);setSessionXP(0)
    setAnswered(false);setSelected(null);setFeedback('')
    setScreen('quiz')
  }
  async function selectAnswer(idx){
    if(answered)return
    setAnswered(true);setSelected(idx)
    const q=questions[qIdx]
    const correct=idx===q.answer
    let xp=q.diff==='hard'?3:2
    let newStreak=streak
    if(correct){newStreak=streak+1;if(newStreak>=3)xp+=1;setScore(s=>s+1);setStreak(newStreak)}
    else{newStreak=0;setStreak(0)}
    const addXP=correct?xp:0
    setFeedback(correct?'✅ 正解！+'+addXP+'XP'+(newStreak>=3?' 🔥ボーナス！':'')+'\n'+q.explanation:'❌ 正解は「'+q.options[q.answer]+'」\n'+q.explanation)
    if(correct){
      const prevLv=getLv(totalXP)
      const newXP=totalXP+addXP
      const newLv=getLv(newXP)
      setTotalXP(newXP);setSessionXP(s=>s+addXP)
      if(newLv.lv>prevLv.lv)setLevelUpMsg('🎉 レベルアップ！Lv.'+newLv.lv+' '+newLv.name)
    }
  }
  async function nextQ(){
    if(qIdx+1>=questions.length){
      setSaving(true)
      await supabase.from('silica_training_sessions').insert({user_name:userName,score,total:questions.length,xp_gained:sessionXP})
      await supabase.from('silica_training_users').update({total_xp:totalXP,level:getLv(totalXP).lv,last_trained_at:new Date().toISOString()}).eq('user_name',userName)
      setSaving(false);setScreen('result')
    }else{setQIdx(i=>i+1);setAnswered(false);setSelected(null);setFeedback('')}
  }
  const lv=getLv(totalXP)
  const nextLv=getNextLv(totalXP)
  const prog=nextLv?Math.round((totalXP-lv.xp)/(nextLv.xp-lv.xp)*100):100
  const q=questions[qIdx]
  return(
    <div style={{minHeight:'100vh',background:'linear-gradient(160deg,#b8eaff 0%,#e8f9ff 40%,#fffbe6 100%)',fontFamily:"'M PLUS Rounded 1c',sans-serif",padding:'20px 16px 60px'}}>
      <div style={{maxWidth:560,margin:'0 auto'}}>
        <h1 style={{textAlign:'center',fontSize:'1.4rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>💧 ケイソくんトレーニング</h1>
        {screen!=='register'&&<div style={{background:'white',borderRadius:16,padding:'12px 16px',marginBottom:12,boxShadow:'0 4px 16px rgba(59,191,239,0.15)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
            <div style={{width:52,height:52,borderRadius:12,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
              <span>{lv.emoji}</span><span style={{fontSize:'0.6rem',fontWeight:800,color:'rgba(255,255,255,0.9)'}}>Lv.{lv.lv}</span>
            </div>
            <div><div style={{fontWeight:900,fontSize:'1rem',color:'#2d3a4a'}}>{lv.name}</div><div style={{fontSize:'0.72rem',color:'#6b7f92'}}>👤 {userName} / {lv.rank}</div></div>
          </div>
          <div style={{background:'rgba(0,0,0,0.07)',borderRadius:20,height:12,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:20,background:lv.g,width:prog+'%',transition:'width 0.8s ease'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.68rem',color:'#6b7f92',marginTop:4,fontWeight:700}}>
            <span>累計 {totalXP.toLocaleString()} XP</span>
            <span>{nextLv?'次のLvまで: '+(nextLv.xp-totalXP)+' XP':'⚡ 最高レベル達成！'}</span>
          </div>
        </div>}
        {screen==='register'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'4rem',marginBottom:8}}>💧</div>
          <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>ケイソくんトレーニング</h2>
          <p style={{fontSize:'0.85rem',color:'#6b7f92',fontWeight:700,marginBottom:20,lineHeight:1.7}}>毎日5問でケイ素の知識を身につけよう！XPを獲得してレベルアップ🏆</p>
          <input value={inputName} onChange={e=>setInputName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleRegister()} placeholder="あなたの名前を入力"
            style={{width:'100%',padding:'12px 16px',border:'2.5px solid #daedf7',borderRadius:12,fontSize:'1rem',fontWeight:700,marginBottom:12,outline:'none',fontFamily:'inherit'}}/>
          <button onClick={handleRegister} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer'}}>スタート！🚀</button>
        </div>}
        {screen==='start'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'3rem',marginBottom:8}}>🎯</div>
          <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>今日のトレーニング</h2>
          <p style={{fontSize:'0.85rem',color:'#6b7f92',fontWeight:700,marginBottom:20,lineHeight:1.7}}>5問チャレンジ！正解してXPを獲得しよう✨連続正解でボーナスXPも！🔥</p>
          {levelUpMsg&&<div style={{background:'#e6fff7',border:'2px solid #06d6a0',borderRadius:12,padding:12,marginBottom:16,fontWeight:800,color:'#008060'}}>{levelUpMsg}</div>}
          <button onClick={startQuiz} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer'}}>スタート！🚀</button>
        </div>}
        {screen==='quiz'&&q&&<div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            {[{num:score,lbl:'✅ 正解'},{num:streak,lbl:'🔥 連続'},{num:5-qIdx,lbl:'📚 残り'}].map((s,i)=>(
              <div key={i} style={{flex:1,background:'white',borderRadius:12,padding:'8px 10px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
                <div style={{fontSize:'1.3rem',fontWeight:900,color:'#1a8cc7'}}>{s.num}</div>
                <div style={{fontSize:'0.65rem',color:'#6b7f92',fontWeight:700}}>{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{background:'rgba(255,255,255,0.6)',borderRadius:20,height:10,marginBottom:12,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:20,background:'linear-gradient(90deg,#3bbfef,#06d6a0)',width:(qIdx/5*100)+'%'}}/>
          </div>
          <div style={{background:'white',borderRadius:20,padding:'20px 18px',boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
            <span style={{display:'inline-block',background:'#3bbfef',color:'white',fontSize:'0.68rem',fontWeight:800,padding:'3px 11px',borderRadius:20,marginBottom:10}}>Q{qIdx+1}</span>
            <div style={{fontSize:'0.97rem',fontWeight:800,color:'#2d3a4a',marginBottom:14,lineHeight:1.6}}>{q.q}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {q.options.map((opt,i)=>{
                let bg='white',border='2.5px solid #daedf7',color='#2d3a4a'
                if(answered){if(i===q.answer){bg='#e6fff7';border='2.5px solid #06d6a0';color='#00a77a'}else if(i===selected){bg='#fff0f4';border='2.5px solid #ef476f';color='#ef476f'}}
                return<button key={i} onClick={()=>selectAnswer(i)} disabled={answered} style={{background:bg,border,borderRadius:12,padding:'11px 14px',fontFamily:'inherit',fontSize:'0.91rem',fontWeight:700,color,cursor:answered?'default':'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:9}}>
                  <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:24,height:24,background:answered&&i===q.answer?'#06d6a0':answered&&i===selected?'#ef476f':'#e8f5ff',borderRadius:7,fontSize:'0.76rem',fontWeight:900,color:answered&&(i===q.answer||i===selected)?'white':'#1a8cc7',flexShrink:0}}>{['A','B','C','D'][i]}</span>{opt}
                </button>
              })}
            </div>
            {feedback&&<div style={{marginTop:12,padding:'11px 14px',borderRadius:12,background:selected===q.answer?'#e6fff7':'#fff0f4',border:selected===q.answer?'2px solid #06d6a0':'2px solid #ef476f',fontSize:'0.85rem',fontWeight:700,color:selected===q.answer?'#008060':'#c0003a',lineHeight:1.5,whiteSpace:'pre-line'}}>{feedback}</div>}
            {answered&&<button onClick={nextQ} style={{width:'100%',marginTop:10,padding:13,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.95rem',fontWeight:800,cursor:'pointer'}}>{qIdx+1>=questions.length?(saving?'保存中...':'結果を見る 🏆'):'次の問題へ ▶'}</button>}
          </div>
        </div>}
        {screen==='result'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'3.5rem',fontWeight:900,color:'#1a8cc7',lineHeight:1}}>{score}<span style={{fontSize:'1.6rem',color:'#ff8c42'}}>/{questions.length}問</span></div>
          <div style={{fontSize:'0.95rem',fontWeight:700,color:'#2d3a4a',marginTop:8,marginBottom:16}}>{score===5?'🏆 パーフェクト！':score>=4?'⭐ すばらしい！':score>=3?'😊 よくできました！':'📚 復習してまたチャレンジ！'}</div>
          <div style={{background:'#f0faff',borderRadius:14,padding:'14px 18px',marginBottom:20,textAlign:'left'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:48,height:48,borderRadius:12,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.3rem'}}>
                <span>{lv.emoji}</span><span style={{fontSize:'0.58rem',fontWeight:800,color:'rgba(255,255,255,0.92)'}}>Lv.{lv.lv}</span>
              </div>
              <div>
                <div style={{fontWeight:900,fontSize:'0.95rem',color:'#2d3a4a'}}>{lv.name}</div>
                <div style={{fontSize:'0.73rem',color:'#6b7f92',fontWeight:700}}>累計 {totalXP.toLocaleString()} XP（今回 +{sessionXP} XP！）</div>
              </div>
            </div>
          </div>
          {levelUpMsg&&<div style={{background:'#e6fff7',border:'2px solid #06d6a0',borderRadius:12,padding:12,marginBottom:16,fontWeight:800,color:'#008060'}}>{levelUpMsg}</div>}
          <button onClick={()=>{setLevelUpMsg('');setScreen('start')}} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#ff8c42,#ff6b1a)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.98rem',fontWeight:800,cursor:'pointer'}}>もう一度チャレンジ！🔄</button>
        </div>}
      </div>
    </div>
  )
}
'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
  {lv:16,name:'シリカマスター',emoji:'👑',rank:'マスター',xp:800,g:'linear-gradient(135deg,#9b59b6,#6c3483)'},
  {lv:17,name:'ケイ素博士',emoji:'🏆',rank:'マスター',xp:980,g:'linear-gradient(135deg,#7d3c98,#6c3483)'},
  {lv:30,name:'ケイソ神',emoji:'⚡',rank:'神',xp:20000,g:'linear-gradient(135deg,#f39c12,#e74c3c)'},
]
const QUESTIONS = [
  {q:"シリカクリエーション株式会社の本社はどこにありますか？",options:["東京都新宿区","福井県福井市","大阪府大阪市","愛知県名古屋市"],answer:1,explanation:"本社は福井県福井市です。",diff:"easy"},
  {q:"ケイ素の元素番号は何番ですか？",options:["8番","12番","14番","20番"],answer:2,explanation:"ケイ素の元素記号はSi、元素番号14番です。",diff:"easy"},
  {q:"地球でケイ素は何番目に多い元素？",options:["1番目","2番目","5番目","10番目"],answer:1,explanation:"地球で最も多いのは酸素（49%）、2番目がケイ素（33%）です。",diff:"easy"},
  {q:"水晶はケイ素をどのくらい含んでいますか？",options:["約50%","約75%","約90%","約99.9%"],answer:3,explanation:"水晶は99.9%がケイ素でできています。",diff:"easy"},
  {q:"シリカクリエーションのケイ素の原料は？",options:["水晶","石英","花こう岩","大理石"],answer:1,explanation:"シリカクリエーションのケイ素の原料は石英という石です。",diff:"easy"},
  {q:"体内でケイ素の最も重要な役割は？",options:["カルシウムを吸収する","弾力を構成する","脂肪を燃焼する","ビタミンを合成する"],answer:1,explanation:"ケイ素の最大の役割は弾力を構成することです。",diff:"easy"},
  {q:"ケイ素不足が最初に現れやすい症状は？",options:["視力低下","爪が割れる・白髪が増える","食欲がなくなる","頭痛がする"],answer:1,explanation:"ミネラル不足で最初に出る症状は爪・髪のトラブルです。",diff:"easy"},
  {q:"水溶性ケイ素の精菌力とは？",options:["菌を全て殺す殺菌力","菌のバランスを整える力","菌を増やす力","菌から体を守るバリア"],answer:1,explanation:"精菌力は菌を殺すのではなく、バランスを整える力です！",diff:"hard"},
  {q:"石英をイオン化するために必要な温度は？",options:["600℃","900℃","1200℃","1650℃"],answer:3,explanation:"石英という石を1650℃という高温で燃焼するとケイ素がイオン化します。",diff:"hard"},
  {q:"ホワイトシリカの濃度として正しいのは？",options:["1,000ppm以上","3,500ppm以上","8,300ppm以上","12,000ppm以上"],answer:2,explanation:"ホワイトシリカは8,300ppm以上という高濃度で作られています。",diff:"hard"},
  {q:"一般的な大人が1日に摂取するホワイトシリカの目安量は？",options:["1〜3cc","5cc","10〜20cc","50cc以上"],answer:2,explanation:"1日の目安は10〜20ccです。体の大きさや食生活によって調整します。",diff:"easy"},
  {q:"ホワイトシリカを飲む場合の推奨希釈倍率は？",options:["10〜20倍","50倍","100〜200倍","500倍以上"],answer:2,explanation:"原液で飲むと飲みにくいため、100〜200倍に希釈して飲むことが推奨されています。",diff:"easy"},
  {q:"現在、日本人の何割がミネラル不足？",options:["3割","5割","7割","9割"],answer:3,explanation:"日本人の9割がミネラル不足に陥っていると言われています。",diff:"easy"},
  {q:"水溶性ケイ素の8つの特徴に含まれないのは？",options:["脂肪溶解力","抗酸化力","筋肉増強力","浸透力"],answer:2,explanation:"8つの特徴：消炎力・脂肪溶解力・抗酸化力・洗浄力・中和力・浸透力・精菌力・テラヘルツ。筋肉増強力は含まれません。",diff:"hard"},
  {q:"ホワイトシリカ10ccに含まれるケイ素量は？",options:["50mg","100mg","166mg","300mg"],answer:2,explanation:"ホワイトシリカ10ccで約166mgのケイ素が摂取できます。1リットルでは16,600mgになります。",diff:"hard"},
]
function getLv(xp){let r=LEVELS[0];for(let i=LEVELS.length-1;i>=0;i--){if(xp>=LEVELS[i].xp){r=LEVELS[i];break}}return r}
function getNextLv(xp){for(const l of LEVELS){if(xp<l.xp)return l}return null}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

export default function TrainingPage(){
  const[screen,setScreen]=useState('register')
  const[userName,setUserName]=useState('')
  const[inputName,setInputName]=useState('')
  const[totalXP,setTotalXP]=useState(0)
  const[sessionXP,setSessionXP]=useState(0)
  const[questions,setQuestions]=useState([])
  const[qIdx,setQIdx]=useState(0)
  const[score,setScore]=useState(0)
  const[streak,setStreak]=useState(0)
  const[answered,setAnswered]=useState(false)
  const[selected,setSelected]=useState(null)
  const[feedback,setFeedback]=useState('')
  const[levelUpMsg,setLevelUpMsg]=useState('')
  const[saving,setSaving]=useState(false)

  async function loadUser(name){
    const{data}=await supabase.from('silica_training_users').select('total_xp').eq('user_name',name).single()
    if(data)setTotalXP(data.total_xp||0)
  }
  async function handleRegister(){
    if(!inputName.trim())return
    const name=inputName.trim()
    setUserName(name)
    const{data}=await supabase.from('silica_training_users').select('user_name').eq('user_name',name).single()
    if(!data)await supabase.from('silica_training_users').insert({user_name:name})
    await loadUser(name)
    setScreen('start')
  }
  async function startQuiz(){
    await loadUser(userName)
    setQuestions(shuffle(QUESTIONS).slice(0,5))
    setQIdx(0);setScore(0);setStreak(0);setSessionXP(0)
    setAnswered(false);setSelected(null);setFeedback('')
    setScreen('quiz')
  }
  async function selectAnswer(idx){
    if(answered)return
    setAnswered(true);setSelected(idx)
    const q=questions[qIdx]
    const correct=idx===q.answer
    let xp=q.diff==='hard'?3:2
    let newStreak=streak
    if(correct){newStreak=streak+1;if(newStreak>=3)xp+=1;setScore(s=>s+1);setStreak(newStreak)}
    else{newStreak=0;setStreak(0)}
    const addXP=correct?xp:0
    setFeedback(correct?'✅ 正解！+'+addXP+'XP'+(newStreak>=3?' 🔥ボーナス！':'')+'\n'+q.explanation:'❌ 正解は「'+q.options[q.answer]+'」\n'+q.explanation)
    if(correct){
      const prevLv=getLv(totalXP)
      const newXP=totalXP+addXP
      const newLv=getLv(newXP)
      setTotalXP(newXP);setSessionXP(s=>s+addXP)
      if(newLv.lv>prevLv.lv)setLevelUpMsg('🎉 レベルアップ！Lv.'+newLv.lv+' '+newLv.name)
    }
  }
  async function nextQ(){
    if(qIdx+1>=questions.length){
      setSaving(true)
      await supabase.from('silica_training_sessions').insert({user_name:userName,score,total:questions.length,xp_gained:sessionXP})
      await supabase.from('silica_training_users').update({total_xp:totalXP,level:getLv(totalXP).lv,last_trained_at:new Date().toISOString()}).eq('user_name',userName)
      setSaving(false);setScreen('result')
    }else{setQIdx(i=>i+1);setAnswered(false);setSelected(null);setFeedback('')}
  }
  const lv=getLv(totalXP)
  const nextLv=getNextLv(totalXP)
  const prog=nextLv?Math.round((totalXP-lv.xp)/(nextLv.xp-lv.xp)*100):100
  const q=questions[qIdx]
  return(
    <div style={{minHeight:'100vh',background:'linear-gradient(160deg,#b8eaff 0%,#e8f9ff 40%,#fffbe6 100%)',fontFamily:"'M PLUS Rounded 1c',sans-serif",padding:'20px 16px 60px'}}>
      <div style={{maxWidth:560,margin:'0 auto'}}>
        <h1 style={{textAlign:'center',fontSize:'1.4rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>💧 ケイソくんトレーニング</h1>
        {screen!=='register'&&<div style={{background:'white',borderRadius:16,padding:'12px 16px',marginBottom:12,boxShadow:'0 4px 16px rgba(59,191,239,0.15)'}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
            <div style={{width:52,height:52,borderRadius:12,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',boxShadow:'0 2px 8px rgba(0,0,0,0.15)'}}>
              <span>{lv.emoji}</span><span style={{fontSize:'0.6rem',fontWeight:800,color:'rgba(255,255,255,0.9)'}}>Lv.{lv.lv}</span>
            </div>
            <div><div style={{fontWeight:900,fontSize:'1rem',color:'#2d3a4a'}}>{lv.name}</div><div style={{fontSize:'0.72rem',color:'#6b7f92'}}>👤 {userName} / {lv.rank}</div></div>
          </div>
          <div style={{background:'rgba(0,0,0,0.07)',borderRadius:20,height:12,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:20,background:lv.g,width:prog+'%',transition:'width 0.8s ease'}}/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'0.68rem',color:'#6b7f92',marginTop:4,fontWeight:700}}>
            <span>累計 {totalXP.toLocaleString()} XP</span>
            <span>{nextLv?'次のLvまで: '+(nextLv.xp-totalXP)+' XP':'⚡ 最高レベル達成！'}</span>
          </div>
        </div>}
        {screen==='register'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'4rem',marginBottom:8}}>💧</div>
          <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>ケイソくんトレーニング</h2>
          <p style={{fontSize:'0.85rem',color:'#6b7f92',fontWeight:700,marginBottom:20,lineHeight:1.7}}>毎日5問でケイ素の知識を身につけよう！XPを獲得してレベルアップ🏆</p>
          <input value={inputName} onChange={e=>setInputName(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleRegister()} placeholder="あなたの名前を入力"
            style={{width:'100%',padding:'12px 16px',border:'2.5px solid #daedf7',borderRadius:12,fontSize:'1rem',fontWeight:700,marginBottom:12,outline:'none',fontFamily:'inherit'}}/>
          <button onClick={handleRegister} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer'}}>スタート！🚀</button>
        </div>}
        {screen==='start'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'3rem',marginBottom:8}}>🎯</div>
          <h2 style={{fontSize:'1.2rem',fontWeight:900,color:'#1a8cc7',marginBottom:8}}>今日のトレーニング</h2>
          <p style={{fontSize:'0.85rem',color:'#6b7f92',fontWeight:700,marginBottom:20,lineHeight:1.7}}>5問チャレンジ！正解してXPを獲得しよう✨連続正解でボーナスXPも！🔥</p>
          {levelUpMsg&&<div style={{background:'#e6fff7',border:'2px solid #06d6a0',borderRadius:12,padding:12,marginBottom:16,fontWeight:800,color:'#008060'}}>{levelUpMsg}</div>}
          <button onClick={startQuiz} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontSize:'1rem',fontWeight:900,cursor:'pointer'}}>スタート！🚀</button>
        </div>}
        {screen==='quiz'&&q&&<div>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            {[{num:score,lbl:'✅ 正解'},{num:streak,lbl:'🔥 連続'},{num:5-qIdx,lbl:'📚 残り'}].map((s,i)=>(
              <div key={i} style={{flex:1,background:'white',borderRadius:12,padding:'8px 10px',textAlign:'center',boxShadow:'0 2px 8px rgba(0,0,0,0.07)'}}>
                <div style={{fontSize:'1.3rem',fontWeight:900,color:'#1a8cc7'}}>{s.num}</div>
                <div style={{fontSize:'0.65rem',color:'#6b7f92',fontWeight:700}}>{s.lbl}</div>
              </div>
            ))}
          </div>
          <div style={{background:'rgba(255,255,255,0.6)',borderRadius:20,height:10,marginBottom:12,overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:20,background:'linear-gradient(90deg,#3bbfef,#06d6a0)',width:(qIdx/5*100)+'%'}}/>
          </div>
          <div style={{background:'white',borderRadius:20,padding:'20px 18px',boxShadow:'0 8px 32px rgba(59,191,239,0.18)'}}>
            <span style={{display:'inline-block',background:'#3bbfef',color:'white',fontSize:'0.68rem',fontWeight:800,padding:'3px 11px',borderRadius:20,marginBottom:10}}>Q{qIdx+1}</span>
            <div style={{fontSize:'0.97rem',fontWeight:800,color:'#2d3a4a',marginBottom:14,lineHeight:1.6}}>{q.q}</div>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {q.options.map((opt,i)=>{
                let bg='white',border='2.5px solid #daedf7',color='#2d3a4a'
                if(answered){if(i===q.answer){bg='#e6fff7';border='2.5px solid #06d6a0';color='#00a77a'}else if(i===selected){bg='#fff0f4';border='2.5px solid #ef476f';color='#ef476f'}}
                return<button key={i} onClick={()=>selectAnswer(i)} disabled={answered} style={{background:bg,border,borderRadius:12,padding:'11px 14px',fontFamily:'inherit',fontSize:'0.91rem',fontWeight:700,color,cursor:answered?'default':'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:9}}>
                  <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:24,height:24,background:answered&&i===q.answer?'#06d6a0':answered&&i===selected?'#ef476f':'#e8f5ff',borderRadius:7,fontSize:'0.76rem',fontWeight:900,color:answered&&(i===q.answer||i===selected)?'white':'#1a8cc7',flexShrink:0}}>{['A','B','C','D'][i]}</span>{opt}
                </button>
              })}
            </div>
            {feedback&&<div style={{marginTop:12,padding:'11px 14px',borderRadius:12,background:selected===q.answer?'#e6fff7':'#fff0f4',border:selected===q.answer?'2px solid #06d6a0':'2px solid #ef476f',fontSize:'0.85rem',fontWeight:700,color:selected===q.answer?'#008060':'#c0003a',lineHeight:1.5,whiteSpace:'pre-line'}}>{feedback}</div>}
            {answered&&<button onClick={nextQ} style={{width:'100%',marginTop:10,padding:13,background:'linear-gradient(135deg,#3bbfef,#1a8cc7)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.95rem',fontWeight:800,cursor:'pointer'}}>{qIdx+1>=questions.length?(saving?'保存中...':'結果を見る 🏆'):'次の問題へ ▶'}</button>}
          </div>
        </div>}
        {screen==='result'&&<div style={{background:'white',borderRadius:20,padding:24,boxShadow:'0 8px 32px rgba(59,191,239,0.18)',textAlign:'center'}}>
          <div style={{fontSize:'3.5rem',fontWeight:900,color:'#1a8cc7',lineHeight:1}}>{score}<span style={{fontSize:'1.6rem',color:'#ff8c42'}}>/{questions.length}問</span></div>
          <div style={{fontSize:'0.95rem',fontWeight:700,color:'#2d3a4a',marginTop:8,marginBottom:16}}>{score===5?'🏆 パーフェクト！':score>=4?'⭐ すばらしい！':score>=3?'😊 よくできました！':'📚 復習してまたチャレンジ！'}</div>
          <div style={{background:'#f0faff',borderRadius:14,padding:'14px 18px',marginBottom:20,textAlign:'left'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:48,height:48,borderRadius:12,background:lv.g,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',fontSize:'1.3rem'}}>
                <span>{lv.emoji}</span><span style={{fontSize:'0.58rem',fontWeight:800,color:'rgba(255,255,255,0.92)'}}>Lv.{lv.lv}</span>
              </div>
              <div>
                <div style={{fontWeight:900,fontSize:'0.95rem',color:'#2d3a4a'}}>{lv.name}</div>
                <div style={{fontSize:'0.73rem',color:'#6b7f92',fontWeight:700}}>累計 {totalXP.toLocaleString()} XP（今回 +{sessionXP} XP！）</div>
              </div>
            </div>
          </div>
          {levelUpMsg&&<div style={{background:'#e6fff7',border:'2px solid #06d6a0',borderRadius:12,padding:12,marginBottom:16,fontWeight:800,color:'#008060'}}>{levelUpMsg}</div>}
          <button onClick={()=>{setLevelUpMsg('');setScreen('start')}} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#ff8c42,#ff6b1a)',color:'white',border:'none',borderRadius:14,fontFamily:'inherit',fontSize:'0.98rem',fontWeight:800,cursor:'pointer'}}>もう一度チャレンジ！🔄</button>
        </div>}
      </div>
    </div>
  )
}
