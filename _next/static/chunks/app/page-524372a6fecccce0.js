(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{9300:function(e,l,t){Promise.resolve().then(t.bind(t,8212))},8212:function(e,l,t){"use strict";t.r(l),t.d(l,{default:function(){return r}});var s=t(7437),i=t(2265),n=t(973),a=t.n(n);let c=["공식호실","동","층","호","명칭","대표","전화","휴대폰","기타","idx"];function r(){let[e,l]=(0,i.useState)([]),[t,n]=(0,i.useState)("명칭"),[r,o]=(0,i.useState)(""),[d,x]=(0,i.useState)(null),[h,p]=(0,i.useState)(null),[u,m]=(0,i.useState)(!1),f=()=>fetch("https://script.google.com/macros/s/AKfycbzyJbYPKQyXzPBn_6py2t5zRIqxLVlt3h19tFSr2Ap1FLn6htvGWq1Wj0IDanB6Lbyh/exec").then(e=>e.json()).then(e=>(localStorage.setItem("woolimfloor",JSON.stringify(e)),e));(0,i.useEffect)(()=>{let e=JSON.parse(localStorage.getItem("woolimfloor")||"[]");(e.length?Promise.resolve(e):f()).then(e=>{l(e.map((e,l)=>({idx:l,...e})))});let t=e=>{e.preventDefault(),p(e),m(!0)};return window.addEventListener("beforeinstallprompt",t),()=>{window.removeEventListener("beforeinstallprompt",t)}},[]);let j=async()=>{if(h){h.prompt();let{outcome:e}=await h.userChoice;"accepted"===e?console.log("User accepted the install prompt"):console.log("User dismissed the install prompt"),p(null),m(!1)}},w=(0,i.useMemo)(()=>""===r.trim()?e:e.filter(e=>e[t].includes(r)),[e,r,t]);return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("main",{className:"h-screen overflow-y-scroll relative flex flex-col items-center",children:[(0,s.jsxs)("nav",{className:"w-full h-12 max-w-[500px] min-w-[300px] sticky top-0 gap-4 flex justify-center py-2 bg-white flex-shrink-0 flex-grow-0",children:[u&&(0,s.jsx)("button",{onClick:j,className:"text-xs whitespace-pre w-16 font-bold",children:"설치"}),(0,s.jsx)("button",{onClick:()=>f().then(e=>{l(e.map((e,l)=>({idx:l,...e})))}),className:"text-xs whitespace-pre w-16",children:"새로고침 ↺"}),(0,s.jsx)("select",{value:t,onChange:e=>{n(e.target.value)},className:"w-16 whitespace-pre",children:c.map(e=>"idx"!==e&&(0,s.jsx)("option",{value:e,children:e},e))}),(0,s.jsx)("input",{type:"text",placeholder:"검색어 입력",onChange:e=>{o(e.target.value)},value:r,className:"w-[calc(100%-12rem)] h-8 py-0"})]}),(0,s.jsx)("ul",{className:"".concat(a().list," ").concat(a().head),children:(0,s.jsxs)("li",{children:[(0,s.jsx)("div",{children:"동"}),(0,s.jsx)("div",{children:"층"}),(0,s.jsx)("div",{children:"호"}),(0,s.jsx)("div",{children:"명칭"})]})}),(0,s.jsx)("ul",{className:a().list,children:w.map(e=>(0,s.jsxs)("li",{"data-idx":e.idx,onClick:()=>x(e),children:[(0,s.jsx)("div",{children:e["동"]}),(0,s.jsx)("div",{children:e["층"]}),(0,s.jsx)("div",{children:e["호"]}),(0,s.jsx)("div",{children:e["명칭"]})]},e.idx))}),d&&(0,s.jsxs)("div",{className:"h-screen w-full max-w-[500px] min-w-[300px] fixed top-0 bg-white px-4 py-2 flex flex-col justify-center",children:[(0,s.jsx)("b",{className:"text-3xl absolute top-2 right-4 cursor-pointer",onClick:()=>x(null),children:"\xd7"}),(0,s.jsx)("ul",{className:"flex flex-col gap-4",children:c.map(e=>"idx"!==e&&(0,s.jsxs)("li",{className:"flex w-full gap-4",children:[(0,s.jsx)("div",{className:"label w-20 text-right font-bold",children:e}),(0,s.jsx)("div",{className:"content flex-[1]",children:d[e]})]},e))})]})]})})}},973:function(e){e.exports={list:"list_list__psaL3",head:"list_head__l1j9T"}}},function(e){e.O(0,[957,971,23,744],function(){return e(e.s=9300)}),_N_E=e.O()}]);