/* ================== 数据 ================== */
var plans = [
  {name:'深山失踪型', cat:'nature', cost:'¥180', votes:48210, trend:'up', trendText:'▲ 三连冠',
   note:'深山 · 溪水 · 零信号', img:'assets/plan-01.jpg'},
  {name:'海边躺平型', cat:'nature', cost:'¥320', votes:41098, trend:'flat', trendText:'— 持平',
   note:'浪花 · 书 · 防晒霜', img:'assets/plan-02.jpg'},
  {name:'县城漫游型', cat:'city', cost:'¥90', votes:38776, trend:'up', trendText:'▲ 2',
   note:'米粉 · 老街 · 慢公交', img:'assets/plan-03.jpg'},
  {name:'雨夜温泉型', cat:'nature', cost:'¥450', votes:33210, trend:'down', trendText:'▼ 1',
   note:'雨声 · 木盆 · 热汤', img:'assets/plan-04.jpg'},
  {name:'公路骑行型', cat:'nature', cost:'¥40', votes:29845, trend:'up', trendText:'▲ 1',
   note:'风 · 爆胎 · 大巴', img:'assets/plan-05.jpg'},
  {name:'露营观星型', cat:'nature', cost:'¥260', votes:27600, trend:'down', trendText:'▼ 2',
   note:'帐篷 · 银河 · 泡面', img:'assets/plan-06.jpg'},
  {name:'沙发投奔型', cat:'city', cost:'¥0', votes:22137, trend:'new', trendText:'NEW',
   note:'旧友 · 沙发 · 外卖', img:'assets/plan-07.jpg'},
  {name:'午夜影院型', cat:'city', cost:'¥120', votes:18904, trend:'up', trendText:'▲ 3',
   note:'黑暗 · 三连映 · 失联', img:'assets/plan-08.jpg'},
  {name:'古镇发呆型', cat:'city', cost:'¥210', votes:15562, trend:'down', trendText:'▼ 1',
   note:'石桥 · 茶水 · 没人', img:'assets/plan-09.jpg'},
  {name:'终极家里蹲', cat:'home', cost:'¥30', votes:14002, trend:'new', trendText:'NEW',
   note:'窗帘 · 床 · 自然醒', img:'assets/plan-10.jpg'}
];
var voted = []; // 票仓

/* ================== Hero 圆形图 + TOP3 ================== */
document.getElementById('heroTins').innerHTML =
  '<img src="'+plans[0].img+'" alt="'+plans[0].name+'"><img src="'+plans[1].img+'" alt="'+plans[1].name+'">';

function serifNum(i){ return String(i+1).padStart(2,'0'); }
document.getElementById('monthList').innerHTML = plans.slice(0,3).map(function(p,i){
  return '<div><div><strong>'+p.name+'</strong><small>'+p.note+'</small></div><span class="serif">'+serifNum(i)+'</span></div>';
}).join('');

/* ================== 卡片渲染 ================== */
function fmt(n){ return n.toLocaleString('en-US'); }
function renderProducts(){
  document.getElementById('products').innerHTML = plans.map(function(p,i){
    var isVoted = voted.indexOf(i)>-1;
    var trendCls = p.trend==='new' ? 'trend new' : 'trend';
    return '<article class="product-card" data-cat="'+p.cat+'">'
      + '<div class="product-art">'
      +   '<span class="rank">'+serifNum(i)+'</span>'
      +   '<img src="'+p.img+'" alt="'+p.name+'">'
      +   '<button class="art-arrow'+(isVoted?' voted':'')+'" data-vote="'+i+'" aria-label="给'+p.name+'投票">'+(isVoted?'✓':'→')+'</button>'
      + '</div>'
      + '<div class="product-info">'
      +   '<div><h3>'+p.name+'</h3><p>'+p.note+' · <span class="'+trendCls+'">'+p.trendText+'</span></p></div>'
      +   '<span class="cost">'+p.cost+'</span>'
      + '</div>'
      + '</article>';
  }).join('');
  bindVoteButtons();
}
function bindVoteButtons(){
  document.querySelectorAll('[data-vote]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var i = +btn.getAttribute('data-vote');
      if(voted.indexOf(i)>-1){ openBag(); return; }
      voted.push(i);
      afterVoteChange();
      btn.textContent='✓'; btn.classList.add('voted');
    });
  });
}
function afterVoteChange(){
  var el = document.getElementById('bagCount');
  el.textContent = voted.length;
  el.classList.remove('added-pulse'); void el.offsetWidth; el.classList.add('added-pulse');
}

/* ================== 筛选 ================== */
document.getElementById('filters').addEventListener('click', function(e){
  var btn = e.target.closest('.filter'); if(!btn) return;
  this.querySelectorAll('.filter').forEach(function(b){ b.classList.remove('selected'); });
  btn.classList.add('selected');
  var cat = btn.getAttribute('data-cat');
  document.querySelectorAll('.product-card').forEach(function(card, idx){
    var show = cat==='all' || card.getAttribute('data-cat')===cat;
    card.hidden = !show;
    if(show){ card.style.animation='none'; void card.offsetWidth; card.style.animation=''; }
  });
});

/* ================== 票仓抽屉 ================== */
var dialog = document.getElementById('bagDialog');
var bagBody = document.getElementById('bagBody');

function openBag(){
  renderBag();
  if(typeof dialog.showModal==='function'){ dialog.showModal(); } else { dialog.setAttribute('open',''); }
}
function closeBag(){ dialog.close ? dialog.close() : dialog.removeAttribute('open'); }
document.getElementById('bagTrigger').addEventListener('click', openBag);
document.getElementById('heroVote').addEventListener('click', openBag);
document.getElementById('detailsVote').addEventListener('click', function(e){ e.preventDefault(); openBag(); });
document.getElementById('bagClose').addEventListener('click', closeBag);
dialog.addEventListener('click', function(e){ if(e.target===dialog) closeBag(); });

function renderBag(){
  if(!voted.length){
    bagBody.innerHTML =
      '<div class="empty-bag"><h3>还一张票没投。</h3>'
      + '<p>从十种出逃里挑一条本周最想执行的，点卡片右下角的箭头。</p>'
      + '<button class="button" id="emptyClose">去看看榜单 <span class="arrow">→</span></button></div>';
    document.getElementById('emptyClose').addEventListener('click', closeBag);
    return;
  }
  var rows = voted.map(function(i){
    var p = plans[i];
    return '<div class="bag-row">'
      + '<img src="'+p.img+'" alt="'+p.name+'">'
      + '<div><h3>'+serifNum(i)+' · '+p.name+'</h3><p>'+p.note+'</p>'
      + '<div class="row-bottom"><button class="remove" data-remove="'+i+'">撤回这一票</button><span>'+p.cost+'</span></div></div>'
      + '</div>';
  }).join('');
  bagBody.innerHTML = rows
    + '<div class="bag-total"><div><span>选票合计</span><span class="total">'+voted.length+' 张</span></div></div>'
    + '<button class="button" id="submitVote">提交本周选票 <span class="arrow">→</span></button>'
    + '<p class="terms">投完即视为承诺本周末至少出门半天，家里蹲除外。</p>';
  bagBody.querySelectorAll('[data-remove]').forEach(function(b){
    b.addEventListener('click', function(){
      var i = +b.getAttribute('data-remove');
      voted = voted.filter(function(x){ return x!==i; });
      afterVoteChange(); renderBag(); renderProducts();
    });
  });
  document.getElementById('submitVote').addEventListener('click', submitVotes);
}
function submitVotes(){
  voted.forEach(function(i){ plans[i].votes += 1; });
  document.getElementById('heroVotes').textContent = fmt(plans[0].votes);
  voted = [];
  afterVoteChange(); renderProducts();
  bagBody.innerHTML =
    '<div class="empty-bag"><h3>已受理，<br>周五见。</h3>'
    + '<p>选票已被站长的电子鸽子叼走。请于本周五 18:00 准时失踪。</p>'
    + '<button class="button" id="doneClose">继续逛逛 <span class="arrow">→</span></button></div>';
  document.getElementById('doneClose').addEventListener('click', closeBag);
}

/* ================== 公告条倒计时 ================== */
function tick(){
  var n = new Date();
  var day = n.getDay(), h = n.getHours(), m = n.getMinutes(), s = n.getSeconds();
  var el = document.getElementById('tgif');
  if(day===6||day===0||(day===5&&h>=18)){ el.textContent = '· 出逃窗口已开启，立即失踪 ·'; return; }
  var daysToFri = (5 - day + 7) % 7;
  if(day===5){ var left = (17-h)*3600 + (59-m)*60 + (60-s); if(left<0) left=0; }
  var target = new Date(n);
  target.setDate(n.getDate() + daysToFri);
  target.setHours(18,0,0,0);
  var diff = Math.max(0, target - n);
  var d = Math.floor(diff/86400000);
  var hh = String(Math.floor(diff%86400000/3600000)).padStart(2,'0');
  var mm = String(Math.floor(diff%3600000/60000)).padStart(2,'0');
  var ss = String(Math.floor(diff%60000/1000)).padStart(2,'0');
  el.textContent = '· 距周五 18:00 还有 '+(d>0?d+' 天 ':'')+hh+':'+mm+':'+ss+' ·';
}
setInterval(tick,1000); tick();

/* ================== 启动 ================== */
renderProducts();
