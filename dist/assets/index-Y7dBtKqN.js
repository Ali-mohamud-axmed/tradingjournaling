(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();const qs="modulepreload",Fs=function(t){return"/"+t},wr={},_e=function(e,r,s){let n=Promise.resolve();if(r&&r.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));n=Promise.allSettled(r.map(l=>{if(l=Fs(l),l in wr)return;wr[l]=!0;const c=l.endsWith(".css"),d=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${d}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":qs,c||(u.as="script"),u.crossOrigin="",u.href=l,o&&u.setAttribute("nonce",o),document.head.appendChild(u),c)return new Promise((f,h)=>{u.addEventListener("load",f),u.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return n.then(a=>{for(const o of a||[])o.status==="rejected"&&i(o.reason);return e().catch(i)})},Hs=Symbol.for("@supabase/supabase-js.traceContextExtractor");function Ws(){return globalThis[Hs]}function Mt(t,e){var r={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(r[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,s=Object.getOwnPropertySymbols(t);n<s.length;n++)e.indexOf(s[n])<0&&Object.prototype.propertyIsEnumerable.call(t,s[n])&&(r[s[n]]=t[s[n]]);return r}function Vs(t,e,r,s){function n(i){return i instanceof r?i:new r(function(a){a(i)})}return new(r||(r=Promise))(function(i,a){function o(d){try{c(s.next(d))}catch(u){a(u)}}function l(d){try{c(s.throw(d))}catch(u){a(u)}}function c(d){d.done?i(d.value):n(d.value).then(o,l)}c((s=s.apply(t,e||[])).next())})}const Ks=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class mr extends Error{constructor(e,r="FunctionsError",s){super(e),this.name=r,this.context=s}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class Gs extends mr{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class kr extends mr{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class xr extends mr{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var sr;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(sr||(sr={}));class Js{constructor(e,{headers:r={},customFetch:s,region:n=sr.Any}={}){this.url=e,this.headers=r,this.region=n,this.fetch=Ks(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Vs(this,arguments,void 0,function*(r,s={}){var n,i;let a,o,l;try{const{headers:c,method:d,body:u,signal:f,timeout:h}=s;let p={},{region:g}=s;g||(g=this.region);const m=new URL(`${this.url}/${r}`);g&&g!=="any"&&(p["x-region"]=g,m.searchParams.set("forceFunctionRegion",g));let b;const k=!!c&&Object.keys(c).some(X=>X.toLowerCase()==="content-type");u&&!k?typeof Blob<"u"&&u instanceof Blob||u instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",b=u):typeof u=="string"?(p["Content-Type"]="text/plain",b=u):typeof FormData<"u"&&u instanceof FormData?b=u:(p["Content-Type"]="application/json",b=JSON.stringify(u)):u&&typeof u!="string"&&!(typeof Blob<"u"&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<"u"&&u instanceof FormData)?b=JSON.stringify(u):b=u;let v=f;h&&(o=new AbortController,a=setTimeout(()=>o.abort(),h),f?(v=o.signal,l=()=>o.abort(),f.addEventListener("abort",l)):v=o.signal);const S=yield this.fetch(m.toString(),{method:d||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),c),body:b,signal:v}).catch(X=>{throw new Gs(X)}),O=S.headers.get("x-relay-error");if(O&&O==="true")throw new kr(S);if(!S.ok)throw new xr(S);let $=((n=S.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim().toLowerCase(),C;return $==="application/json"?C=yield S.json():$==="application/octet-stream"||$==="application/pdf"?C=yield S.blob():$==="text/event-stream"?C=S:$==="multipart/form-data"?C=yield S.formData():C=yield S.text(),{data:C,error:null,response:S}}catch(c){return{data:null,error:c,response:c instanceof xr||c instanceof kr?c.context:void 0}}finally{a&&clearTimeout(a),l&&((i=s.signal)===null||i===void 0||i.removeEventListener("abort",l))}})}}const ds=3,_r=t=>Math.min(1e3*2**t,3e4),Ys=[520,503],us=["GET","HEAD","OPTIONS"];var Gt=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function st(t){"@babel/helpers - typeof";return st=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},st(t)}function Xs(t,e){if(st(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(st(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Zs(t){var e=Xs(t,"string");return st(e)=="symbol"?e:e+""}function Qs(t,e,r){return(e=Zs(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Sr(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),r.push.apply(r,s)}return r}function ze(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Sr(Object(r),!0).forEach(function(s){Qs(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Sr(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}function Er(t,e){return new Promise(r=>{if(e!=null&&e.aborted){r();return}const s=setTimeout(()=>{e==null||e.removeEventListener("abort",n),r()},t);function n(){clearTimeout(s),r()}e==null||e.addEventListener("abort",n)})}function en(t,e,r,s){return!(!s||r>=ds||!us.includes(t)||!Ys.includes(e))}var tn=class{constructor(t){var e,r,s,n,i;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(r=t.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(s=t.shouldStripNulls)!==null&&s!==void 0?s:!1,this.urlLengthLimit=(n=t.urlLengthLimit)!==null&&n!==void 0?n:8e3,this.retryEnabled=(i=t.retry)!==null&&i!==void 0?i:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const a=this.headers.get("Accept");a==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!a||a==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const s=this.fetch;let i=(async()=>{let a=0;for(;;){const c={};r.headers.forEach((u,f)=>{c[f]=u}),a>0&&(c["X-Retry-Count"]=String(a));let d;try{d=await s(r.url.toString(),{method:r.method,headers:c,body:JSON.stringify(r.body,(u,f)=>typeof f=="bigint"?f.toString():f),signal:r.signal})}catch(u){if((u==null?void 0:u.name)==="AbortError"||(u==null?void 0:u.code)==="ABORT_ERR"||!us.includes(r.method))throw u;if(r.retryEnabled&&a<ds){const f=_r(a);a++,await Er(f,r.signal);continue}throw u}if(en(r.method,d.status,a,r.retryEnabled)){var o,l;const u=(o=(l=d.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,f=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:_r(a);await d.text(),a++,await Er(f,r.signal);continue}return await r.processResponse(d)}})();return this.shouldThrowOnError||(i=i.catch(a=>{var o;let l="",c="",d="";const u=a==null?void 0:a.cause;if(u){var f,h,p,g;const k=(f=u==null?void 0:u.message)!==null&&f!==void 0?f:"",v=(h=u==null?void 0:u.code)!==null&&h!==void 0?h:"";l=`${(p=a==null?void 0:a.name)!==null&&p!==void 0?p:"FetchError"}: ${a==null?void 0:a.message}`,l+=`

Caused by: ${(g=u==null?void 0:u.name)!==null&&g!==void 0?g:"Error"}: ${k}`,v&&(l+=` (${v})`),u!=null&&u.stack&&(l+=`
${u.stack}`)}else{var m;l=(m=a==null?void 0:a.stack)!==null&&m!==void 0?m:""}const b=this.url.toString().length;return(a==null?void 0:a.name)==="AbortError"||(a==null?void 0:a.code)==="ABORT_ERR"?(d="",c="Request was aborted (timeout or manual cancellation)",b>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${b} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",c="HTTP headers exceeded server limits (typically 16KB)",b>this.urlLengthLimit&&(c+=`. Your request URL is ${b} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=a==null?void 0:a.name)!==null&&o!==void 0?o:"FetchError"}: ${a==null?void 0:a.message}`,details:l,hint:c,code:d},data:null,count:null,status:0,statusText:""}})),i.then(t,e)}async processResponse(t){var e=this;let r=null,s=null,n=null,i=t.status,a=t.statusText;if(t.ok){var o,l;if(e.method!=="HEAD"){var c;const h=await t.text();if(h!=="")if(e.headers.get("Accept")==="text/csv")s=h;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))s=h;else try{s=JSON.parse(h)}catch{if(r={message:h},s=null,e.shouldThrowOnError)throw new Gt({message:h,details:"",hint:"",code:""})}}const u=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),f=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");if(u&&f&&f.length>1&&(n=parseInt(f[1])),e.isMaybeSingle&&Array.isArray(s))if(s.length>1){if(r={code:"PGRST116",details:`Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},s=null,n=null,i=406,a="Not Acceptable",e.shouldThrowOnError){var d;throw new Gt(ze(ze({},r),{},{hint:(d=r.hint)!==null&&d!==void 0?d:""}))}}else s.length===1?s=s[0]:s=null}else{const u=await t.text();try{r=JSON.parse(u),Array.isArray(r)&&t.status===404&&(s=[],r=null,i=200,a="OK")}catch{t.status===404&&u===""?(i=204,a="No Content"):r={message:u}}if(r&&e.shouldThrowOnError)throw new Gt(r)}return{success:r===null,error:r,data:s,count:n,status:i,statusText:a}}returns(){return this}overrideTypes(){return this}},rn=class extends tn{throwOnError(){return super.throwOnError()}select(t){let e=!1;const r=(t??"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:r,foreignTable:s,referencedTable:n=s}={}){const i=n?`${n}.order`:"order",a=this.url.searchParams.get(i);return this.url.searchParams.set(i,`${a?`${a},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:r=e}={}){const s=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${t}`),this}range(t,e,{foreignTable:r,referencedTable:s=r}={}){const n=typeof s>"u"?"offset":`${s}.offset`,i=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(n,`${t}`),this.url.searchParams.set(i,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:r=!1,buffers:s=!1,wal:n=!1,format:i="text"}={}){var a;const o=[t?"analyze":null,e?"verbose":null,r?"settings":null,s?"buffers":null,n?"wal":null].filter(Boolean).join("|"),l=(a=this.headers.get("Accept"))!==null&&a!==void 0?a:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${i}; for="${l}"; options=${o};`),i==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const Tr=new RegExp("[,()]");var Ne=class extends rn{throwOnError(){return super.throwOnError()}eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&Tr.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`in.(${r})`),this}notIn(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&Tr.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`not.in.(${r})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:r,type:s}={}){let n="";s==="plain"?n="pl":s==="phrase"?n="ph":s==="websearch"&&(n="w");const i=r===void 0?"":`(${r})`;return this.url.searchParams.append(t,`${n}fts${i}.${e}`),this}match(t){return Object.entries(t).filter(([e,r])=>r!==void 0).forEach(([e,r])=>{this.url.searchParams.append(e,`eq.${r}`)}),this}not(t,e,r){return this.url.searchParams.append(t,`not.${e}.${r}`),this}or(t,{foreignTable:e,referencedTable:r=e}={}){const s=r?`${r}.or`:"or";return this.url.searchParams.append(s,`(${t})`),this}filter(t,e,r){return this.url.searchParams.append(t,`${e}.${r}`),this}},sn=class{constructor(t,{headers:e={},schema:r,fetch:s,urlLengthLimit:n=8e3,retry:i}){this.url=t,this.headers=new Headers(e),this.schema=r,this.fetch=s,this.urlLengthLimit=n,this.retry=i}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:r=!1,count:s}=e??{},n=r?"HEAD":"GET";let i=!1;const a=(t??"*").split("").map(c=>/\s/.test(c)&&!i?"":(c==='"'&&(i=!i),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",a),s&&l.append("Prefer",`count=${s}`),new Ne({method:n,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:r=!0}={}){var s;const n="POST",{url:i,headers:a}=this.cloneRequestState();if(e&&a.append("Prefer",`count=${e}`),r||a.append("Prefer","missing=default"),Array.isArray(t)){const o=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);i.searchParams.set("columns",l.join(","))}}return new Ne({method:n,url:i,headers:a,schema:this.schema,body:t,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:r=!1,count:s,defaultToNull:n=!0}={}){var i;const a="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),s&&l.append("Prefer",`count=${s}`),n||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((d,u)=>d.concat(Object.keys(u)),[]);if(c.length>0){const d=[...new Set(c)].map(u=>`"${u}"`);o.searchParams.set("columns",d.join(","))}}return new Ne({method:a,url:o,headers:l,schema:this.schema,body:t,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var r;const s="PATCH",{url:n,headers:i}=this.cloneRequestState();return e&&i.append("Prefer",`count=${e}`),new Ne({method:s,url:n,headers:i,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const r="DELETE",{url:s,headers:n}=this.cloneRequestState();return t&&n.append("Prefer",`count=${t}`),new Ne({method:r,url:s,headers:n,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},nn=class hs{constructor(e,{headers:r={},schema:s,fetch:n,timeout:i,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(r),this.schemaName=s,this.urlLengthLimit=a;const l=n??globalThis.fetch;i!==void 0&&i>0?this.fetch=(c,d)=>{const u=new AbortController,f=setTimeout(()=>u.abort(),i),h=d==null?void 0:d.signal;if(h){if(h.aborted)return clearTimeout(f),l(c,d);const p=()=>{clearTimeout(f),u.abort()};return h.addEventListener("abort",p,{once:!0}),l(c,ze(ze({},d),{},{signal:u.signal})).finally(()=>{clearTimeout(f),h.removeEventListener("abort",p)})}return l(c,ze(ze({},d),{},{signal:u.signal})).finally(()=>clearTimeout(f))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new sn(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new hs(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,r={},{head:s=!1,get:n=!1,count:i}={}){var a;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=h=>h!==null&&typeof h=="object"&&(!Array.isArray(h)||h.some(d)),u=s&&Object.values(r).some(d);u?(o="POST",c=r):s||n?(o=s?"HEAD":"GET",Object.entries(r).filter(([h,p])=>p!==void 0).map(([h,p])=>[h,Array.isArray(p)?`{${p.join(",")}}`:`${p}`]).forEach(([h,p])=>{l.searchParams.append(h,p)})):(o="POST",c=r);const f=new Headers(this.headers);return u?f.set("Prefer",i?`count=${i},return=minimal`:"return=minimal"):i&&f.set("Prefer",`count=${i}`),new Ne({method:o,url:l,headers:f,schema:this.schemaName,body:c,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class an{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const r=globalThis;if(typeof globalThis<"u"&&typeof r.WebSocket<"u")return{type:"native",wsConstructor:r.WebSocket};const s=typeof global<"u"?global:void 0;if(s&&typeof s.WebSocket<"u")return{type:"native",wsConstructor:s.WebSocket};if(typeof globalThis<"u"&&typeof r.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&r.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const n=globalThis.process;if(n){const i=n.versions;if(i&&i.node)return{type:"unsupported",error:"Node.js detected but native WebSocket not found.",workaround:"Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static isWebSocketSupported(){try{return this.detectEnvironment().type==="native"}catch{return!1}}}const on="2.112.0",ln=`realtime-js/${on}`,cn="1.0.0",fs="2.0.0",dn=fs,un=1e4,hn=100,ke={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},ps={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},nr={connecting:"connecting",closing:"closing",closed:"closed"};class fn{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,r){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return r(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var r;return this._isArrayBuffer((r=e.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var r,s;const n=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,n)}_encodeJsonUserBroadcastPush(e){var r,s;const n=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:{},a=new TextEncoder().encode(JSON.stringify(n)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,a)}_encodeUserBroadcastPush(e,r,s){var n,i;const a=new TextEncoder,o=a.encode(e.topic),l=a.encode((n=e.ref)!==null&&n!==void 0?n:""),c=a.encode((i=e.join_ref)!==null&&i!==void 0?i:""),d=a.encode(e.payload.event),u=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},f=a.encode(Object.keys(u).length===0?"":JSON.stringify(u));if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(d.length>255)throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);if(f.length>255)throw new Error(`metadata length ${f.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+o.length+d.length+f.length,p=new ArrayBuffer(this.HEADER_LENGTH+h),g=new DataView(p),m=new Uint8Array(p);let b=0;g.setUint8(b++,this.KINDS.userBroadcastPush),g.setUint8(b++,c.length),g.setUint8(b++,l.length),g.setUint8(b++,o.length),g.setUint8(b++,d.length),g.setUint8(b++,f.length),g.setUint8(b++,r),m.set(c,b),b+=c.length,m.set(l,b),b+=l.length,m.set(o,b),b+=o.length,m.set(d,b),b+=d.length,m.set(f,b),b+=f.length;var k=new Uint8Array(p.byteLength+s.byteLength);return k.set(new Uint8Array(p),0),k.set(new Uint8Array(s),p.byteLength),k.buffer}decode(e,r){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return r(s)}if(typeof e=="string"){const s=JSON.parse(e),[n,i,a,o,l]=s;return r({join_ref:n,ref:i,topic:a,event:o,payload:l})}return r({})}_binaryDecode(e){const r=new DataView(e),s=r.getUint8(0),n=new TextDecoder;switch(s){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,r,n)}}_decodeUserBroadcast(e,r,s){const n=r.getUint8(1),i=r.getUint8(2),a=r.getUint8(3),o=r.getUint8(4);let l=this.HEADER_LENGTH+4;const c=s.decode(e.slice(l,l+n));l=l+n;const d=s.decode(e.slice(l,l+i));l=l+i;const u=s.decode(e.slice(l,l+a));l=l+a;const f=e.slice(l,e.byteLength),h=o===this.JSON_ENCODING?JSON.parse(s.decode(f)):f,p={type:this.BROADCAST_EVENT,event:d,payload:h};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){var r;return e instanceof ArrayBuffer||((r=e==null?void 0:e.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(e,r){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>r.includes(s)))}}var P;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(P||(P={}));const Rr=(t,e,r={})=>{var s;const n=(s=r.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((i,a)=>(i[a]=pn(a,t,e,n),i),{}):{}},pn=(t,e,r,s)=>{const n=e.find(o=>o.name===t),i=n==null?void 0:n.type,a=r[t];return i&&!s.includes(i)?gs(i,a):ir(a)},gs=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return vn(e,r)}switch(t){case P.bool:return gn(e);case P.float4:case P.float8:case P.int2:case P.int4:case P.int8:case P.numeric:case P.oid:return mn(e);case P.json:case P.jsonb:return yn(e);case P.timestamp:return bn(e);case P.abstime:case P.date:case P.daterange:case P.int4range:case P.int8range:case P.money:case P.reltime:case P.text:case P.time:case P.timestamptz:case P.timetz:case P.tsrange:case P.tstzrange:return ir(e);default:return ir(e)}},ir=t=>t,gn=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},mn=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},yn=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},vn=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,s=t[r];if(t[0]==="{"&&s==="}"){let i;const a=t.slice(1,r);try{i=JSON.parse("["+a+"]")}catch{i=a?a.split(","):[]}return i.map(o=>gs(e,o))}return t},bn=t=>typeof t=="string"?t.replace(" ","T"):t,ms=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var Fe=t=>typeof t=="function"?t:function(){return t},wn=typeof self<"u"?self:null,Me=typeof window<"u"?window:null,oe=wn||Me||globalThis,kn="2.0.0",xn=1e4,_n=1e3,Sn=100,le={connecting:0,open:1,closing:2,closed:3},F={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},fe={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},ar={longpoll:"longpoll",websocket:"websocket"},En={complete:4},or="base64url.bearer.phx.",vt=class{constructor(t,e,r,s){this.channel=t,this.event=e,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=s,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:r}){this.recHooks.filter(s=>s.status===t).forEach(s=>s.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},ys=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},Tn=class{constructor(t,e,r){this.state=F.closed,this.topic=t,this.params=Fe(e||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new vt(this,fe.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new ys(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=F.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this.joinPush.receive("error",s=>{this.state=F.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=F.closed,this.socket.remove(this)}),this.onError(s=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.isJoining()&&this.joinPush.reset(),this.state=F.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new vt(this,fe.leave,Fe({}),this.timeout).send(),this.state=F.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(fe.reply,(s,n)=>{this.trigger(this.replyEventName(n),s)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=F.closed,this.bindings=[]}onClose(t){this.on(fe.close,t)}onError(t){return this.on(fe.error,e=>t(e))}on(t,e){let r=this.bindingRef++;return this.bindings.push({event:t,ref:r,callback:e}),r}off(t,e){this.bindings=this.bindings.filter(r=>!(r.event===t&&(typeof e>"u"||e===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,r=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let s=new vt(this,t,function(){return e},r);return this.canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=F.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(fe.close,"leave")},r=new vt(this,fe.leave,Fe({}),t);return r.receive("ok",()=>e()).receive("timeout",()=>e()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(t,e,r){return e}filterBindings(t,e,r){return!0}isMember(t,e,r,s){return this.topic!==t?!1:s&&s!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:r,joinRef:s}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=F.joining,this.joinPush.resend(t))}trigger(t,e,r,s){let n=this.onMessage(t,e,r,s);if(e&&!n)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let i=this.bindings.filter(a=>a.event===t&&this.filterBindings(a,e,r));for(let a=0;a<i.length;a++)i[a].callback(n,r,s||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===F.closed}isErrored(){return this.state===F.errored}isJoined(){return this.state===F.joined}isJoining(){return this.state===F.joining}isLeaving(){return this.state===F.leaving}},It=class{static request(t,e,r,s,n,i,a){if(oe.XDomainRequest){let o=new oe.XDomainRequest;return this.xdomainRequest(o,t,e,s,n,i,a)}else if(oe.XMLHttpRequest){let o=new oe.XMLHttpRequest;return this.xhrRequest(o,t,e,r,s,n,i,a)}else{if(oe.fetch&&oe.AbortController)return this.fetchRequest(t,e,r,s,n,i,a);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,r,s,n,i,a){let o={method:t,headers:r,body:s},l=null;return n&&(l=new AbortController,setTimeout(()=>l.abort(),n),o.signal=l.signal),oe.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>a&&a(c)).catch(c=>{c.name==="AbortError"&&i?i():a&&a(null)}),l}static xdomainRequest(t,e,r,s,n,i,a){return t.timeout=n,t.open(e,r),t.onload=()=>{let o=this.parseJSON(t.responseText);a&&a(o)},i&&(t.ontimeout=i),t.onprogress=()=>{},t.send(s),t}static xhrRequest(t,e,r,s,n,i,a,o){t.open(e,r,!0),t.timeout=i;for(let[l,c]of Object.entries(s))t.setRequestHeader(l,c);return t.onerror=()=>o&&o(null),t.onreadystatechange=()=>{if(t.readyState===En.complete&&o){let l=this.parseJSON(t.responseText);o(l)}},a&&(t.ontimeout=a),t.send(n),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let r=[];for(var s in t){if(!Object.prototype.hasOwnProperty.call(t,s))continue;let n=e?`${e}[${s}]`:s,i=t[s];typeof i=="object"?r.push(this.serialize(i,n)):r.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}return r.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let r=t.match(/\?/)?"&":"?";return`${t}${r}${this.serialize(e)}`}},Rn=t=>{let e="",r=new Uint8Array(t),s=r.byteLength;for(let n=0;n<s;n++)e+=String.fromCharCode(r[n]);return btoa(e)},Pe=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(or)&&(this.authToken=atob(e[1].slice(or.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=le.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+ar.websocket),"$1/"+ar.longpoll)}endpointURL(){return It.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,r){this.close(t,e,r),this.readyState=le.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===le.open||this.readyState===le.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:r,token:s,messages:n}=e;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=s}else r=0;switch(r){case 200:n.forEach(i=>{setTimeout(()=>this.onmessage({data:i}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=le.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(t){typeof t!="string"&&(t=Rn(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t,e=0){this.awaitingBatchAck=!0;const r=e+Sn,s=t.slice(e,r);this.ajax("POST",{"Content-Type":"application/x-ndjson"},s.join(`
`),()=>this.onerror("timeout"),n=>{!n||n.status!==200?(this.awaitingBatchAck=!1,this.onerror(n&&n.status),this.closeAndRetry(1011,"internal server error",!1)):r<t.length?this.batchSend(t,r):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(t,e,r){for(let n of this.reqs)n.abort();this.readyState=le.closed;let s=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",s)):this.onclose(s)}ajax(t,e,r,s,n){let i,a=()=>{this.reqs.delete(i),s()};i=It.request(t,this.endpointURL(),e,r,this.timeout,a,o=>{this.reqs.delete(i),this.isActive()&&n(o)}),this.reqs.add(i)}},An=class Ze{constructor(e,r={}){let s=r.events||{state:"presence_state",diff:"presence_diff"};this.state=Object.create(null),this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(s.state,n=>{let{onJoin:i,onLeave:a,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=Ze.syncState(this.state,n,i,a),this.pendingDiffs.forEach(l=>{this.state=Ze.syncDiff(this.state,l,i,a)}),this.pendingDiffs=[],o()}),this.channel.on(s.diff,n=>{let{onJoin:i,onLeave:a,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(n):(this.state=Ze.syncDiff(this.state,n,i,a),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return Ze.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,r,s,n){let i=this.toNullProtoObj(this.clone(e));r=this.toNullProtoObj(r);let a=Object.create(null),o=Object.create(null);return this.map(i,(l,c)=>{r[l]||(o[l]=c)}),this.map(r,(l,c)=>{let d=i[l];if(d){let u=c.metas.map(g=>g.phx_ref),f=d.metas.map(g=>g.phx_ref),h=c.metas.filter(g=>f.indexOf(g.phx_ref)<0),p=d.metas.filter(g=>u.indexOf(g.phx_ref)<0);h.length>0&&(a[l]=c,a[l].metas=h),p.length>0&&(o[l]=this.clone(d),o[l].metas=p)}else a[l]=c}),this.syncDiff(i,{joins:a,leaves:o},s,n)}static syncDiff(e,r,s,n){e=this.toNullProtoObj(e);let{joins:i,leaves:a}=this.clone(r);return s||(s=function(){}),n||(n=function(){}),this.map(i,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let d=e[o].metas.map(f=>f.phx_ref),u=c.metas.filter(f=>d.indexOf(f.phx_ref)<0);e[o].metas.unshift(...u)}s(o,c,l)}),this.map(a,(o,l)=>{let c=e[o];if(!c)return;let d=l.metas.map(u=>u.phx_ref);c.metas=c.metas.filter(u=>d.indexOf(u.phx_ref)<0),n(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,r){return r||(r=function(s,n){return n}),this.map(e,(s,n)=>r(s,n))}static map(e,r){return Object.getOwnPropertyNames(e).map(s=>r(s,e[s]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let r=Object.create(null);return Object.getOwnPropertyNames(e).forEach(s=>{r[s]=e[s]}),r}static clone(e){return JSON.parse(JSON.stringify(e))}},bt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(r))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[r,s,n,i,a]=JSON.parse(t);return e({join_ref:r,ref:s,topic:n,event:i,payload:a})}},binaryEncode(t){let{join_ref:e,ref:r,event:s,topic:n,payload:i}=t,a=new TextEncoder,o=a.encode(e),l=a.encode(r),c=a.encode(n),d=a.encode(s);this.assertFieldSize(o.byteLength,"join_ref"),this.assertFieldSize(l.byteLength,"ref"),this.assertFieldSize(c.byteLength,"topic"),this.assertFieldSize(d.byteLength,"event");let u=this.META_LENGTH+o.byteLength+l.byteLength+c.byteLength+d.byteLength,f=new ArrayBuffer(this.HEADER_LENGTH+u),h=new Uint8Array(f),p=new DataView(f),g=0;p.setUint8(g++,this.KINDS.push),p.setUint8(g++,o.byteLength),p.setUint8(g++,l.byteLength),p.setUint8(g++,c.byteLength),p.setUint8(g++,d.byteLength),h.set(o,g),g+=o.byteLength,h.set(l,g),g+=l.byteLength,h.set(c,g),g+=c.byteLength,h.set(d,g),g+=d.byteLength;var m=new Uint8Array(f.byteLength+i.byteLength);return m.set(h,0),m.set(new Uint8Array(i),f.byteLength),m.buffer},assertFieldSize(t,e){if(t>255)throw new Error(`unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${t} bytes`)},binaryDecode(t){let e=new DataView(t),r=e.getUint8(0),s=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(t,e,s);case this.KINDS.reply:return this.decodeReply(t,e,s);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,s)}},decodePush(t,e,r){let s=e.getUint8(1),n=e.getUint8(2),i=e.getUint8(3),a=this.HEADER_LENGTH+this.META_LENGTH-1,o=r.decode(t.slice(a,a+s));a=a+s;let l=r.decode(t.slice(a,a+n));a=a+n;let c=r.decode(t.slice(a,a+i));a=a+i;let d=t.slice(a,t.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:d}},decodeReply(t,e,r){let s=e.getUint8(1),n=e.getUint8(2),i=e.getUint8(3),a=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=r.decode(t.slice(o,o+s));o=o+s;let c=r.decode(t.slice(o,o+n));o=o+n;let d=r.decode(t.slice(o,o+i));o=o+i;let u=r.decode(t.slice(o,o+a));o=o+a;let f=t.slice(o,t.byteLength),h={status:u,response:f};return{join_ref:l,ref:c,topic:d,event:fe.reply,payload:h}},decodeBroadcast(t,e,r){let s=e.getUint8(1),n=e.getUint8(2),i=this.HEADER_LENGTH+2,a=r.decode(t.slice(i,i+s));i=i+s;let o=r.decode(t.slice(i,i+n));i=i+n;let l=t.slice(i,t.byteLength);return{join_ref:null,ref:null,topic:a,event:o,payload:l}}},$n=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||xn,this.transport=e.transport||oe.WebSocket||Pe,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let r=null;try{r=oe&&oe.sessionStorage}catch{}this.sessionStore=e.sessionStorage||r,this.establishedConnections=0,this.defaultEncoder=bt.encode.bind(bt),this.defaultDecoder=bt.decode.bind(bt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==Pe?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let s=null;Me&&Me.addEventListener&&(Me.addEventListener("pagehide",n=>{this.conn&&(this.disconnect(),s=this.connectClock)}),Me.addEventListener("pageshow",n=>{s===this.connectClock&&(s=null,this.connect())}),Me.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=n=>e.rejoinAfterMs?e.rejoinAfterMs(n):[1e3,2e3,5e3][n-1]||1e4,this.reconnectAfterMs=n=>e.reconnectAfterMs?e.reconnectAfterMs(n):[10,50,100,150,200,250,500,1e3,2e3][n-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(n,i,a)=>{console.log(`${n}: ${i}`,a)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=Fe(e.params||{}),this.endPoint=`${t}/${ar.websocket}`,this.vsn=e.vsn||kn,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new ys(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken&&Fe(e.authToken)}getLongPollTransport(){return Pe}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=It.appendParams(It.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,r)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=Fe(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==Pe?this.connectWithFallback(Pe,this.longPollFallbackMs):this.transportConnect())}log(t,e,r){this.logger&&this.logger(t,e,r)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let s=this.onMessage(n=>{n.ref===e&&(this.off([s]),t(Date.now()-r))});return!0}transportName(t){switch(t){case Pe:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${or}${btoa(this.authToken()).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let r=!1,s=!0,n,i,a=this.transportName(t),o=l=>{this.log("transport",`falling back to ${a}...`,l),this.off([n,i]),s=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),i=this.onError(l=>{this.log("transport","error",l),s&&!r&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!s){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),_n,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,r){if(!this.conn)return t&&t();const s=this.conn;this.waitForBufferDone(s,()=>{e?s.close(e,r||""):s.close(),this.waitForSocketClosed(s,()=>{this.conn===s&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,r=1){if(r===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,r+1)},150*r)}waitForSocketClosed(t,e,r=1){if(r===5||t.readyState===le.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,r+1)},150*r)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(t),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport","error",t);let e=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",t,e,r),(e===this.transport||r>0)&&this.triggerChanError(t)}triggerChanError(t){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(fe.error,t)})}connectionState(){switch(this.conn&&this.conn.readyState){case le.connecting:return"connecting";case le.open:return"open";case le.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([r])=>t.indexOf(r)===-1)}channel(t,e={}){let r=new Tn(t,e,this);return this.channels.push(r),r}push(t){if(this.hasLogger()){let{topic:e,event:r,payload:s,ref:n,join_ref:i}=t;this.log("push",`${e} ${r} (${i}, ${n})`,s)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:r,event:s,payload:n,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(n.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${n.status||""} ${r} ${s} ${i&&"("+i+")"||""}`.trim(),n);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(r,s,n,a)&&l.trigger(s,n,i,a)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([r,s])=>{try{s(...e)}catch(n){this.log("error",`error in ${t} callback`,n)}})}catch(r){this.log("error",`error triggering ${t} callbacks`,r)}}leaveOpenTopic(t){let e=this.channels.find(r=>r.topic===t&&(r.isJoined()||r.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class tt{constructor(e,r){const s=In(r);this.presence=new An(e.getChannel(),s),this.presence.onJoin((n,i,a)=>{const o=tt.onJoinPayload(n,i,a);e.getChannel().trigger("presence",o)}),this.presence.onLeave((n,i,a)=>{const o=tt.onLeavePayload(n,i,a);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return tt.transformState(this.presence.state)}static transformState(e){return e=Cn(e),Object.getOwnPropertyNames(e).reduce((r,s)=>{const n=e[s];return r[s]=Rt(n),r},{})}static onJoinPayload(e,r,s){const n=Ar(r),i=Rt(s);return{event:"join",key:e,currentPresences:n,newPresences:i}}static onLeavePayload(e,r,s){const n=Ar(r),i=Rt(s);return{event:"leave",key:e,currentPresences:n,leftPresences:i}}}function Rt(t){return t.metas.map(e=>{const r=Object.getOwnPropertyDescriptors(e),s=Object.defineProperties({},r);return s.presence_ref=s.phx_ref,delete s.phx_ref,delete s.phx_ref_prev,s})}function Cn(t){return JSON.parse(JSON.stringify(t))}function In(t){return(t==null?void 0:t.events)&&{events:t.events}}function Ar(t){return t!=null&&t.metas?Rt(t):[]}var $r;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})($r||($r={}));class Ln{get state(){return this.presenceAdapter.state}constructor(e,r){this.channel=e,this.presenceAdapter=new tt(this.channel.channelAdapter,r)}}function On(t){if(t instanceof Error)return t;if(typeof t=="string")return new Error(t);if(t&&typeof t=="object"){const e=t;if(typeof e.code=="number"){const r=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${r}`,{cause:t})}return new Error("channel error: transport failure",{cause:t})}return new Error("channel error: connection lost")}class Pn{constructor(e,r,s){const n=Bn(s);this.channel=e.getSocket().channel(r,n),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,r){return this.channel.on(e,r)}off(e,r){this.channel.off(e,r)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,r,s){let n;try{n=this.channel.push(e,r,s)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>hn){const i=this.channel.pushBuffer.shift();i.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${i.event}`,i.payload())}return n}updateJoinPayload(e){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),e)}canPush(){return this.socket.isConnected()&&this.state===ke.joined}isJoined(){return this.state===ke.joined}isJoining(){return this.state===ke.joining}isClosed(){return this.state===ke.closed}isLeaving(){return this.state===ke.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function Bn(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}const Dn=/[,()"\\]/,jn=t=>Dn.test(t)||t!==t.trim(),Un=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,Cr=t=>{const e=t===null?"null":String(t);return jn(e)?Un(e):e},Nn=t=>t===null?"null":String(t),Mn=(t,e)=>{if(t==="in"){const r=Array.isArray(e)?e:[e];if(r.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(r)).map(n=>Cr(n)).join(",")})`}return t==="is"?`is.${Nn(e)}`:`${t}.${Cr(e)}`};class zn{constructor(){this.filters=[]}add(e,r,s,n=!1){const i=n?"not.":"";return this.filters.push(`${e}=${i}${Mn(r,s)}`),this}eq(e,r){return this.add(e,"eq",r)}neq(e,r){return this.add(e,"neq",r)}gt(e,r){return this.add(e,"gt",r)}gte(e,r){return this.add(e,"gte",r)}lt(e,r){return this.add(e,"lt",r)}lte(e,r){return this.add(e,"lte",r)}in(e,r){return this.add(e,"in",r)}like(e,r){return this.add(e,"like",r)}ilike(e,r){return this.add(e,"ilike",r)}match(e,r){return this.add(e,"match",r)}imatch(e,r){return this.add(e,"imatch",r)}is(e,r){return this.add(e,"is",r)}isDistinct(e,r){return this.add(e,"isdistinct",r)}not(e,r,s){return this.add(e,r,s,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var Ir;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(Ir||(Ir={}));var qe;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(qe||(qe={}));var pe;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(pe||(pe={}));class rt{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,r={config:{}},s){var n,i;if(this.topic=e,this.params=r,this.socket=s,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new Pn(this.socket.socketAdapter,e,this.params),this.presence=new Ln(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=ms(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((i=(n=this.params.config)===null||n===void 0?void 0:n.broadcast)===null||i===void 0)&&i.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,r=this.timeout){var s,n,i;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:a,presence:o,private:l}}=this.params,c=(n=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(h=>h.filter))!==null&&n!==void 0?n:[],d=!!this.bindings[qe.PRESENCE]&&this.bindings[qe.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,u={},f={broadcast:a,presence:Object.assign(Object.assign({},o),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(h=>{e==null||e(pe.CHANNEL_ERROR,On(h))}),this._onClose(()=>e==null?void 0:e(pe.CLOSED)),this.updateJoinPayload(Object.assign({config:f},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:h})=>{if(this.socket._isManualToken()||this.socket.setAuth(),h===void 0){e==null||e(pe.SUBSCRIBED);return}this._updatePostgresBindings(h,e)}).receive("error",h=>{this.state=ke.errored;const p=Object.values(h).join(", ")||"error";e==null||e(pe.CHANNEL_ERROR,new Error(p,{cause:h}))}).receive("timeout",()=>{e==null||e(pe.TIMED_OUT)})}return this}_updatePostgresBindings(e,r){var s;const n=this.bindings.postgres_changes,i=(s=n==null?void 0:n.length)!==null&&s!==void 0?s:0,a=[];for(let o=0;o<i;o++){const l=n[o],{filter:{event:c,schema:d,table:u,filter:f}}=l,h=e&&e[o];if(h&&h.event===c&&rt.isFilterValueEqual(h.schema,d)&&rt.isFilterValueEqual(h.table,u)&&rt.isFilterValueEqual(h.filter,f))a.push(Object.assign(Object.assign({},l),{id:h.id}));else{this.unsubscribe(),this.state=ke.errored,r==null||r(pe.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=a,this.state!=ke.errored&&r&&r(pe.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,s){const n=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===qe.PRESENCE||e===qe.POSTGRES_CHANGES;if(n&&i)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,r,s)}async httpSend(e,r,s={}){var n;if(r==null)return Promise.reject(new Error("Payload is required for httpSend()"));const i=r instanceof ArrayBuffer||ArrayBuffer.isView(r),a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":i?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:a,body:i?r:JSON.stringify(r)},c=await this._fetchWithTimeout(o.toString(),l,(n=s.timeout)!==null&&n!==void 0?n:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=c.statusText;try{const u=await c.json();d=u.error||u.message||d}catch{}return Promise.reject(new Error(d))}async send(e,r={}){var s,n;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:a}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:a,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=r.timeout)!==null&&s!==void 0?s:this.timeout);return await((n=c.body)===null||n===void 0?void 0:n.cancel()),c.ok?"ok":"error"}catch(c){return c instanceof Error&&c.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var a,o,l;const c=this.channelAdapter.push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(a=this.params)===null||a===void 0?void 0:a.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&i("ok"),c.receive("ok",()=>i("ok")),c.receive("error",()=>i("error")),c.receive("timeout",()=>i("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,r,s){const n=new AbortController,i=setTimeout(()=>n.abort(),s),a=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:n.signal}));return clearTimeout(i),a}_on(e,r,s){const n=e.toLocaleLowerCase(),i=r==null?void 0:r.filter;(i instanceof zn||typeof i=="object"&&i!==null&&typeof i.build=="function")&&(r=Object.assign(Object.assign({},r),{filter:i.build()}));const a=this.channelAdapter.on(e,s),o={type:n,filter:r,callback:s,ref:a};return this.bindings[n]?this.bindings[n].push(o):this.bindings[n]=[o],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,r,s)=>{var n,i,a,o,l,c,d;const u=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,s))return!1;const f=(n=this.bindings[u])===null||n===void 0?void 0:n.find(h=>h.ref===e.ref);if(!f)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in f){const h=f.id,p=(i=f.filter)===null||i===void 0?void 0:i.event;return h&&((a=r.ids)===null||a===void 0?void 0:a.includes(h))&&(p==="*"||(p==null?void 0:p.toLocaleLowerCase())===((o=r.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const h=(c=(l=f==null?void 0:f.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return h==="*"||h===((d=r==null?void 0:r.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return f.type.toLocaleLowerCase()===u})}_notThisChannelEvent(e,r){const{close:s,error:n,leave:i,join:a}=ps;return r&&[s,n,i,a].includes(e)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,r,s)=>{if(typeof r=="object"&&"ids"in r){const n=r.data,{schema:i,table:a,commit_timestamp:o,type:l,errors:c}=n;return Object.assign(Object.assign({},{schema:i,table:a,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(n))}return r})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in e.bindings)for(const s of e.bindings[r])this._on(s.type,s.filter,s.callback)}static isFilterValueEqual(e,r){return(e??void 0)===(r??void 0)}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=Rr(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=Rr(e.columns,e.old_record)),r}}class qn{constructor(e,r){this.socket=new $n(e,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,r,s,n=1e4){return new Promise(i=>{setTimeout(()=>i("timeout"),n),this.socket.disconnect(()=>{e(),i("ok")},r,s)})}push(e){this.socket.push(e)}log(e,r,s){this.socket.log(e,r,s)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==nr.connecting}isDisconnecting(){return this.socket.connectionState()==nr.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Lr={HEARTBEAT_INTERVAL:25e3},Fn=[1e3,2e3,5e3,1e4],Hn=1e4;function Wn(){const t=new Map;return{get length(){return t.size},clear(){t.clear()},getItem(e){return t.has(e)?t.get(e):null},key(e){var r;return(r=Array.from(t.keys())[e])!==null&&r!==void 0?r:null},removeItem(e){t.delete(e)},setItem(e,r){t.set(e,String(r))}}}function Vn(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return Wn()}const Kn=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Gn{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,r){var s;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new fn,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=i=>i?(...a)=>i(...a):(...a)=>fetch(...a),!(!((s=r==null?void 0:r.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const n=this._initializeOptions(r);this.socketAdapter=new qn(e,n),this.httpEndpoint=ms(e),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const r=e.message;throw new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,r){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,r)}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return r==="ok"&&e.teardown(),r}async removeAllChannels(){const e=this.channels.map(async s=>{const n=await s.unsubscribe();return s.teardown(),n}),r=await Promise.all(e);return await this.disconnect(),r}log(e,r,s){this.socketAdapter.log(e,r,s)}connectionState(){return this.socketAdapter.connectionState()||nr.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,r={config:{}}){const s=`realtime:${e}`,n=this.getChannels().find(i=>i.topic===s);if(n)return n;{const i=new rt(`realtime:${e}`,r,this);return this._cancelPendingDisconnect(),this.channels.push(i),i}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e=null){let r,s=!1;if(e)r=e,s=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(n){this.log("error","Error fetching access token from callback",n),r=this.accessTokenValue}else r=this.accessTokenValue;s?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(n=>{const i={access_token:r,version:ln};r&&n.updateJoinPayload(i),n.joinedOnce&&n.channelAdapter.isJoined()&&n.channelAdapter.push(ps.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${e}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(r,s)=>{r!=="disconnected"&&(r=="sent"&&this._setAuthSafely(),e&&e(r,s))}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let r;if(e)r=e;else{const s=new Blob([Kn],{type:"application/javascript"});r=URL.createObjectURL(s)}return r}_initializeOptions(e){var r,s,n,i,a,o,l,c,d,u,f,h;this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(s=e==null?void 0:e.accessToken)!==null&&s!==void 0?s:null;const p={};p.timeout=(n=e==null?void 0:e.timeout)!==null&&n!==void 0?n:un,p.heartbeatIntervalMs=(i=e==null?void 0:e.heartbeatIntervalMs)!==null&&i!==void 0?i:Lr.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(a=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&a!==void 0?a:2*((o=e==null?void 0:e.heartbeatIntervalMs)!==null&&o!==void 0?o:Lr.HEARTBEAT_INTERVAL),p.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:an.getWebSocketConstructor(),p.params=e==null?void 0:e.params,p.logger=e==null?void 0:e.logger,p.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),p.sessionStorage=(c=e==null?void 0:e.sessionStorage)!==null&&c!==void 0?c:Vn(),p.reconnectAfterMs=(d=e==null?void 0:e.reconnectAfterMs)!==null&&d!==void 0?d:k=>Fn[k-1]||Hn;let g,m;const b=(u=e==null?void 0:e.vsn)!==null&&u!==void 0?u:dn;switch(b){case cn:g=(k,v)=>v(JSON.stringify(k)),m=(k,v)=>v(JSON.parse(k));break;case fs:g=this.serializer.encode.bind(this.serializer),m=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${p.vsn}`)}if(p.vsn=b,p.encode=(f=e==null?void 0:e.encode)!==null&&f!==void 0?f:g,p.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:m,p.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,p.params=Object.assign(Object.assign({},p.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,p.autoSendHeartbeat=!this.worker}return p}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var nt=class extends Error{constructor(t,e){var r;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((r=e.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Jn(t,e,r){const s=new URL(e,t);if(r)for(const[n,i]of Object.entries(r))i!==void 0&&s.searchParams.set(n,i);return s.toString()}async function Yn(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function Xn(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:r,path:s,query:n,body:i,headers:a}){const o=Jn(t.baseUrl,s,n),l=await Yn(t.auth),c=await e(o,{method:r,headers:{...i?{"Content-Type":"application/json"}:{},...l,...a},body:i?JSON.stringify(i):void 0}),d=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),f=u&&d?JSON.parse(d):d;if(!c.ok){const h=u?f:void 0,p=h==null?void 0:h.error;throw new nt((p==null?void 0:p.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:p==null?void 0:p.type,icebergCode:p==null?void 0:p.code,details:h})}return{status:c.status,headers:c.headers,data:f}}}}function wt(t){return t.join("")}var Zn=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:wt(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(t,e){const r={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${wt(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${wt(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${wt(t.namespace)}`}),!0}catch(e){if(e instanceof nt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(r){if(r instanceof nt&&r.status===409)return;throw r}}};function Be(t){return t.join("")}var Qn=class{constructor(t,e="",r){this.client=t,this.prefix=e,this.accessDelegation=r}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Be(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Be(t.namespace)}/tables`,body:e,headers:r})).data.metadata}async updateTable(t,e){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${Be(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Be(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Be(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Be(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(r){if(r instanceof nt&&r.status===404)return!1;throw r}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(r){if(r instanceof nt&&r.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw r}}},ei=class{constructor(t){var s;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const r=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=Xn({baseUrl:r,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(s=t.accessDelegation)==null?void 0:s.join(","),this.namespaceOps=new Zn(this.client,e),this.tableOps=new Qn(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}};function it(t){"@babel/helpers - typeof";return it=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},it(t)}function ti(t,e){if(it(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(it(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function ri(t){var e=ti(t,"string");return it(e)=="symbol"?e:e+""}function si(t,e,r){return(e=ri(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Or(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),r.push.apply(r,s)}return r}function R(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Or(Object(r),!0).forEach(function(s){si(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Or(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}var zt=class extends Error{constructor(t,e="storage",r,s){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function qt(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var lr=class extends zt{constructor(t,e,r,s="storage",n){super(t,s,e,r),this.name=s==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=r,this.code=n}toJSON(){return R(R({},super.toJSON()),{},{code:this.code})}},vs=class extends zt{constructor(t,e,r="storage"){super(t,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function Lt(t,e,r){const s=R({},t),n=e.toLowerCase();for(const i of Object.keys(s))i.toLowerCase()===n&&delete s[i];return s[n]=r,s}function ni(t){const e={};for(const[r,s]of Object.entries(t))e[r.toLowerCase()]=s;return e}const ii=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),ai=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},cr=t=>{if(Array.isArray(t))return t.map(r=>cr(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,s])=>{const n=r.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));e[n]=cr(s)}),e},oi=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t),bs=t=>t.split("/").map(encodeURIComponent).join("/"),Pr=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const r=e.error;if(typeof r.message=="string")return r.message}}return JSON.stringify(t)},li=async(t,e,r,s)=>{if(t!==null&&typeof t=="object"&&"json"in t&&typeof t.json=="function"){const n=t;let i=parseInt(String(n.status),10);Number.isFinite(i)||(i=500),n.json().then(a=>{const o=(a==null?void 0:a.statusCode)||(a==null?void 0:a.code)||i+"";e(new lr(Pr(a),i,o,s,a==null?void 0:a.code))}).catch(()=>{const a=i+"";e(new lr(n.statusText||`HTTP ${i} error`,i,a,s))})}else e(new vs(Pr(t),t,s))},ci=(t,e,r,s)=>{const n={method:t,headers:(e==null?void 0:e.headers)||{}};if(t==="GET"||t==="HEAD"||!s)return R(R({},n),r);if(ai(s)){var i;const a=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(a))l.toLowerCase()==="content-type"&&(o=c);n.headers=Lt(a,"Content-Type",(i=o)!==null&&i!==void 0?i:"application/json"),n.body=JSON.stringify(s)}else n.body=s;return e!=null&&e.duplex&&(n.duplex=e.duplex),R(R({},n),r)};async function Je(t,e,r,s,n,i,a){return new Promise((o,l)=>{t(r,ci(e,s,n,i)).then(c=>{if(!c.ok)throw c;if(s!=null&&s.noResolveJson)return c;if(a==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>li(c,l,s,a))})}function ws(t="storage"){return{get:async(e,r,s,n)=>Je(e,"GET",r,s,n,void 0,t),post:async(e,r,s,n,i)=>Je(e,"POST",r,n,i,s,t),put:async(e,r,s,n,i)=>Je(e,"PUT",r,n,i,s,t),head:async(e,r,s,n)=>Je(e,"HEAD",r,R(R({},s),{},{noResolveJson:!0}),n,void 0,t),remove:async(e,r,s,n,i)=>Je(e,"DELETE",r,n,i,s,t)}}const di=ws("storage"),{get:at,post:te,put:dr,head:ui,remove:ot}=di,V=ws("vectors");var Ve=class{constructor(t,e={},r,s="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=ni(e),this.fetch=ii(r),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=Lt(this.headers,t,e),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(qt(r))return{data:null,error:r};throw r}}};let ks;ks=Symbol.toStringTag;var hi=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[ks]="StreamDownloadBuilder",this.promise=null}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(qt(e))return{data:null,error:e};throw e}}};let xs;xs=Symbol.toStringTag;var fi=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[xs]="BlobDownloadBuilder",this.promise=null}asStream(){return new hi(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(qt(e))return{data:null,error:e};throw e}}};const Jt={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Br={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var pi=class extends Ve{constructor(t,e={},r,s){super(t,e,s,"storage"),this.bucketId=r}async uploadOrUpdate(t,e,r,s){var n=this;return n.handleOperation(async()=>{let i;const a=R(R({},Br),s);let o=R(R({},n.headers),t==="POST"&&{"x-upsert":String(a.upsert)});const l=a.metadata;if(typeof Blob<"u"&&r instanceof Blob?(i=new FormData,i.append("cacheControl",a.cacheControl),l&&i.append("metadata",n.encodeMetadata(l)),i.append("",r)):typeof FormData<"u"&&r instanceof FormData?(i=r,i.has("cacheControl")||i.append("cacheControl",a.cacheControl),l&&!i.has("metadata")&&i.append("metadata",n.encodeMetadata(l))):(i=r,o["cache-control"]=`max-age=${a.cacheControl}`,o["content-type"]=a.contentType,l&&(o["x-metadata"]=n.toBase64(n.encodeMetadata(l))),(typeof ReadableStream<"u"&&i instanceof ReadableStream||i&&typeof i=="object"&&"pipe"in i&&typeof i.pipe=="function")&&!a.duplex&&(a.duplex="half")),s!=null&&s.headers)for(const[f,h]of Object.entries(s.headers))o=Lt(o,f,h);const c=n._removeEmptyFolders(e),d=n._getFinalPath(c),u=await(t=="PUT"?dr:te)(n.fetch,`${n.url}/object/${d}`,i,R({headers:o},a!=null&&a.duplex?{duplex:a.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}})}async upload(t,e,r){return this.uploadOrUpdate("POST",t,e,r)}async uploadToSignedUrl(t,e,r,s){var n=this;const i=n._removeEmptyFolders(t),a=n._getFinalPath(i),o=new URL(n.url+`/object/upload/sign/${a}`);return o.searchParams.set("token",e),n.handleOperation(async()=>{let l;const c=R(R({},Br),s);let d=R(R({},n.headers),{"x-upsert":String(c.upsert)});const u=c.metadata;if(typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),u&&l.append("metadata",n.encodeMetadata(u)),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),u&&!l.has("metadata")&&l.append("metadata",n.encodeMetadata(u))):(l=r,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType,u&&(d["x-metadata"]=n.toBase64(n.encodeMetadata(u))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),s!=null&&s.headers)for(const[f,h]of Object.entries(s.headers))d=Lt(d,f,h);return{path:i,fullPath:(await dr(n.fetch,o.toString(),l,R({headers:d},c!=null&&c.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(t,e){var r=this;return r.handleOperation(async()=>{let s=r._getFinalPath(t);const n=R({},r.headers);e!=null&&e.upsert&&(n["x-upsert"]="true");const i=await te(r.fetch,`${r.url}/object/upload/sign/${s}`,{},{headers:n}),a=new URL(r.url+i.url),o=a.searchParams.get("token");if(!o)throw new zt("No token returned by API");return{signedUrl:a.toString(),path:t,token:o}})}async update(t,e,r){return this.uploadOrUpdate("PUT",t,e,r)}async move(t,e,r){var s=this;return s.handleOperation(async()=>await te(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers}))}async copy(t,e,r){var s=this;return s.handleOperation(async()=>({path:(await te(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers})).Key}))}async createSignedUrl(t,e,r){var s=this;return s.handleOperation(async()=>{let n=s._getFinalPath(t);const i=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let a=await te(s.fetch,`${s.url}/object/sign/${n}`,R({expiresIn:e},i?{transform:r.transform}:{}),{headers:s.headers});const o=new URLSearchParams;r!=null&&r.download&&o.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&o.set("cacheNonce",String(r.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${s.url}${a.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,r){var s=this;return s.handleOperation(async()=>{const n=await te(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:e,paths:t},{headers:s.headers}),i=new URLSearchParams;r!=null&&r.download&&i.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&i.set("cacheNonce",String(r.cacheNonce));const a=i.toString();return n.map(o=>R(R({},o),{},{signedUrl:o.signedURL?encodeURI(`${s.url}${o.signedURL}${a?`&${a}`:""}`):null}))})}download(t,e,r){const s=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",n=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(n,e.transform),(e==null?void 0:e.cacheNonce)!=null&&n.set("cacheNonce",String(e.cacheNonce));const i=n.toString(),a=this._getFinalPath(t),o=()=>at(this.fetch,`${this.url}/${s}/${a}${i?`?${i}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new fi(o,this.shouldThrowOnError)}async info(t){var e=this;const r=e._getFinalPath(t);return e.handleOperation(async()=>cr(await at(e.fetch,`${e.url}/object/info/${r}`,{headers:e.headers})))}async exists(t){var e=this;const r=e._getFinalPath(t);try{return await ui(e.fetch,`${e.url}/object/${r}`,{headers:e.headers}),{data:!0,error:null}}catch(n){if(e.shouldThrowOnError)throw n;if(qt(n)){var s;const i=n instanceof lr?n.status:n instanceof vs?(s=n.originalError)===null||s===void 0?void 0:s.status:void 0;if(i!==void 0&&[400,404].includes(i))return{data:!1,error:n}}throw n}}getPublicUrl(t,e){const r=this._getFinalPath(t),s=new URLSearchParams;e!=null&&e.download&&s.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(s,e.transform),(e==null?void 0:e.cacheNonce)!=null&&s.set("cacheNonce",String(e.cacheNonce));const n=s.toString(),i=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${i}/public/${r}`)+(n?`?${n}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await ot(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async purgeCache(t,e,r){var s=this;return s.handleOperation(async()=>{const n=bs(s._getFinalPath(t)),i=new URLSearchParams;e!=null&&e.transformations&&i.set("transformations","true");const a=i.toString();return await ot(s.fetch,`${s.url}/cdn/${n}${a?`?${a}`:""}`,{},{headers:s.headers},r)})}async list(t,e,r){var s=this;return s.handleOperation(async()=>{const n=e!=null&&e.sortBy?R(R({},Jt.sortBy),e.sortBy):Jt.sortBy,i=R(R(R({},Jt),e),{},{sortBy:n,prefix:t||""});return await te(s.fetch,`${s.url}/object/list/${s.bucketId}`,i,{headers:s.headers},r)})}async listV2(t,e){var r=this;return r.handleOperation(async()=>{const s=R({},t);return await te(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,s,{headers:r.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const gi="2.112.0",ft={"X-Client-Info":`storage-js/${gi}`};var mi=class extends Ve{constructor(t,e={},r,s){const n=new URL(t);s!=null&&s.useNewHostname&&/supabase\.(co|in|red)$/.test(n.hostname)&&!n.hostname.includes("storage.supabase.")&&(n.hostname=n.hostname.replace("supabase.","storage.supabase."));const i=n.href.replace(/\/$/,""),a=R(R({},ft),e);super(i,a,r,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=e.listBucketOptionsToQueryString(t);return await at(e.fetch,`${e.url}/bucket${r}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await at(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var r=this;return r.handleOperation(async()=>await te(r.fetch,`${r.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async updateBucket(t,e){var r=this;return r.handleOperation(async()=>await dr(r.fetch,`${r.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await te(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await ot(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}async purgeBucketCache(t,e,r){var s=this;return s.handleOperation(async()=>{const n=new URLSearchParams;e!=null&&e.transformations&&n.set("transformations","true");const i=n.toString();return await ot(s.fetch,`${s.url}/cdn/${bs(t)}${i?`?${i}`:""}`,{},{headers:s.headers},r)})}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},yi=class extends Ve{constructor(t,e={},r){const s=t.replace(/\/$/,""),n=R(R({},ft),e);super(s,n,r,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await te(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&r.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&r.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&r.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&r.set("sortOrder",t.sortOrder),t!=null&&t.search&&r.set("search",t.search);const s=r.toString(),n=s?`${e.url}/bucket?${s}`:`${e.url}/bucket`;return await at(e.fetch,n,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await ot(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!oi(t))throw new zt("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new ei({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(r,{get(n,i){const a=n[i];return typeof a!="function"?a:async(...o)=>{try{return{data:await a.apply(n,o),error:null}}catch(l){if(s)throw l;return{data:null,error:l}}}}})}},vi=class extends Ve{constructor(t,e={},r){const s=t.replace(/\/$/,""),n=R(R({},ft),{},{"Content-Type":"application/json"},e);super(s,n,r,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var r=this;return r.handleOperation(async()=>await V.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var r=this;return r.handleOperation(async()=>await V.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers})||{})}},bi=class extends Ve{constructor(t,e={},r){const s=t.replace(/\/$/,""),n=R(R({},ft),{},{"Content-Type":"application/json"},e);super(s,n,r,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},wi=class extends Ve{constructor(t,e={},r){const s=t.replace(/\/$/,""),n=R(R({},ft),{},{"Content-Type":"application/json"},e);super(s,n,r,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await V.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},ki=class extends wi{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new xi(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,r=this;return e().call(r,t)}async getBucket(t){var e=()=>super.getBucket,r=this;return e().call(r,t)}async listBuckets(t={}){var e=()=>super.listBuckets,r=this;return e().call(r,t)}async deleteBucket(t){var e=()=>super.deleteBucket,r=this;return e().call(r,t)}},xi=class extends vi{constructor(t,e,r,s){super(t,e,s),this.vectorBucketName=r}async createIndex(t){var e=()=>super.createIndex,r=this;return e().call(r,R(R({},t),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,r=this;return e().call(r,R(R({},t),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,r=this;return e().call(r,r.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,r=this;return e().call(r,r.vectorBucketName,t)}index(t){return new _i(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},_i=class extends bi{constructor(t,e,r,s,n){super(t,e,n),this.vectorBucketName=r,this.indexName=s}async putVectors(t){var e=()=>super.putVectors,r=this;return e().call(r,R(R({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(t){var e=()=>super.getVectors,r=this;return e().call(r,R(R({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,r=this;return e().call(r,R(R({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,r=this;return e().call(r,R(R({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,r=this;return e().call(r,R(R({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},Si=class extends mi{constructor(t,e={},r,s){super(t,e,r,s)}from(t){return new pi(this.url,this.headers,t,this.fetch)}get vectors(){return new ki(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new yi(this.url+"/iceberg",this.headers,this.fetch)}};const _s="2.112.0",ge=30*1e3,Qe=3,Yt=Qe*ge,Ei=2*ge,Ti="http://localhost:9999",Ri="supabase.auth.token",Ai={"X-Client-Info":`gotrue-js/${_s}`},ur="X-Supabase-Api-Version",Ss={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},$i=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,$e="sb_flow_id",Ci=5,Ii=10*60*1e3;class lt extends Error{constructor(e,r,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=s}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function w(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class Li extends lt{constructor(e,r,s){super(e,r,s),this.name="AuthApiError",this.status=r,this.code=s}}function Dr(t){return w(t)&&t.name==="AuthApiError"}class re extends lt{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class de extends lt{constructor(e,r,s,n){super(e,s,n),this.name=r,this.status=s}}class N extends de{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function kt(t){return w(t)&&t.name==="AuthSessionMissingError"}class De extends de{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class xt extends de{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class _t extends de{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function Oi(t){return w(t)&&t.name==="AuthImplicitGrantRedirectError"}class jr extends de{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class Pi extends de{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class hr extends de{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function St(t){return w(t)&&t.name==="AuthRetryableFetchError"}class Ur extends de{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function Bi(t){return w(t)&&t.name==="AuthRefreshDiscardedError"}class Nr extends de{constructor(e,r,s){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class Ot extends de{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Pt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),Mr=` 	
\r=`.split(""),Di=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<Mr.length;e+=1)t[Mr[e].charCodeAt(0)]=-2;for(let e=0;e<Pt.length;e+=1)t[Pt[e].charCodeAt(0)]=e;return t})();function zr(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(Pt[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(Pt[s]),e.queuedBits-=6}}function Es(t,e,r){const s=Di[t];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function qr(t){const e=[],r=a=>{e.push(String.fromCodePoint(a))},s={utf8seq:0,codepoint:0},n={queue:0,queuedBits:0},i=a=>{Ni(a,s,r)};for(let a=0;a<t.length;a+=1)Es(t.charCodeAt(a),n,i);return e.join("")}function ji(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function Ui(t,e){for(let r=0;r<t.length;r+=1){let s=t.charCodeAt(r);if(s>55295&&s<=56319){const n=(s-55296)*1024&65535;s=(t.charCodeAt(r+1)-56320&65535|n)+65536,r+=1}ji(s,e)}}function Ni(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let s=1;s<6;s+=1)if(!(t>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function He(t){const e=[],r={queue:0,queuedBits:0},s=n=>{e.push(n)};for(let n=0;n<t.length;n+=1)Es(t.charCodeAt(n),r,s);return new Uint8Array(e)}function Mi(t){const e=[];return Ui(t,r=>e.push(r)),new Uint8Array(e)}function Ce(t){const e=[],r={queue:0,queuedBits:0},s=n=>{e.push(n)};return t.forEach(n=>zr(n,r,s)),zr(null,r,s),e.join("")}function zi(t){return Math.round(Date.now()/1e3)+t}function qi(){return Symbol("auth-callback")}const M=()=>typeof window<"u"&&typeof document<"u",Ee={tested:!1,writable:!1},Ts=()=>{if(!M())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Ee.tested)return Ee.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),Ee.tested=!0,Ee.writable=!0}catch{Ee.tested=!0,Ee.writable=!1}return Ee.writable};function Fr(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((n,i)=>{e[i]=n})}catch{}return r.searchParams.forEach((s,n)=>{e[n]=s}),e}const Rs=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Fi=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",ye=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},z=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return null}},W=async(t,e)=>{await t.removeItem(e)};class Ft{constructor(){this.promise=new Ft.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}Ft.promiseConstructor=Promise;function Et(t){const e=t.split(".");if(e.length!==3)throw new Ot("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!$i.test(e[s]))throw new Ot("JWT not in base64url format");return{header:JSON.parse(qr(e[0])),payload:JSON.parse(qr(e[1])),signature:He(e[2]),raw:{header:e[0],payload:e[1]}}}async function Hi(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function Wi(t,e){return new Promise((s,n)=>{(async()=>{for(let i=0;i<1/0;i++)try{const a=await t(i);if(!e(i,null,a)){s(a);return}}catch(a){if(!e(i,a)){n(a);return}}})()})}function As(t){return("0"+t.toString(16)).substr(-2)}function Vi(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=r.length;let n="";for(let i=0;i<56;i++)n+=r.charAt(Math.floor(Math.random()*s));return n}return crypto.getRandomValues(e),Array.from(e,As).join("")}async function Ki(t){const r=new TextEncoder().encode(t),s=await crypto.subtle.digest("SHA-256",r),n=new Uint8Array(s);return Array.from(n).map(i=>String.fromCharCode(i)).join("")}async function Gi(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await Ki(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Ji=/^[a-zA-Z0-9_-]{8,64}$/;function At(t){return typeof t=="string"&&Ji.test(t)?t:null}function Yi(){if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,As).join("")}let t="";for(let e=0;e<32;e++)t+=Math.floor(Math.random()*16).toString(16);return t}const We=(t,e)=>`${t}-flow-${e}-code-verifier`,ct=t=>`${t}-flows-code-verifier`;async function yr(t,e){const r=await z(t,ct(e));return Array.isArray(r)?r.filter(s=>At(s)!==null):[]}async function Xi(t,e,r,s,n){await ye(t,We(e,r),s);const i=(await yr(t,e)).filter(a=>a!==r);for(i.push(r);i.length>Ci;){const a=i.shift();await W(t,We(e,a)),n==null||n(a)}await ye(t,ct(e),i),await ye(t,`${e}-code-verifier`,s)}async function Zi(t,e,r){if(r){const n=await z(t,We(e,r));return{verifier:typeof n=="string"?n:null,flowId:r}}const s=await z(t,`${e}-code-verifier`);return{verifier:typeof s=="string"?s:null,flowId:null}}async function Z(t,e,r){const s=`${e}-code-verifier`;if(!r){await W(t,s);return}const n=We(e,r),i=await z(t,n);await W(t,n);const a=await yr(t,e),o=a.filter(l=>l!==r);o.length!==a.length&&(o.length>0?await ye(t,ct(e),o):await W(t,ct(e))),i!=null&&i===await z(t,s)&&await W(t,s)}async function Qi(t,e){const r=await yr(t,e);for(const s of r)await W(t,We(e,s));await W(t,ct(e)),await W(t,`${e}-code-verifier`)}function ea(t,e){const r=t.indexOf("#");let s=r===-1?t:t.slice(0,r);const n=r===-1?"":t.slice(r),i=s.indexOf("?");if(i!==-1){const o=s.slice(0,i),l=s.slice(i+1).split("&").filter(c=>c!==""&&c!==$e&&!c.startsWith(`${$e}=`));s=l.length>0?`${o}?${l.join("&")}`:o}const a=s.includes("?")?"&":"?";return`${s}${a}${$e}=${encodeURIComponent(e)}${n}`}async function ta(t,e,r=!1,s){const n=Vi();let i=n;r&&(i+="/recovery");const a=Yi();await Xi(t,e,a,i,s);const o=await Gi(n);return[o,n===o?"plain":"s256",a]}const ra=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function sa(t){const e=t.headers.get(ur);if(!e||!e.match(ra))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function na(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function ia(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const aa=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function ue(t){if(!aa.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function ee(t){if(!t.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function Xt(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const s=r.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function oa(t,e){return new Proxy(t,{get:(r,s,n)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const i=s.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,s,n)}return!e.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,s,n)}})}function Hr(t){return JSON.parse(JSON.stringify(t))}const Re=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(t)},la=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function Wr(t){var e;if(!Fi(t))throw new hr(Re(t),0);if(la.includes(t.status))throw new hr(Re(t),t.status);let r;try{r=await t.json()}catch(i){throw new re(Re(i),i)}let s;const n=sa(t);if(n&&n.getTime()>=Ss["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?s=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(s=r.error_code),s){if(s==="weak_password")throw new Nr(Re(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new N}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((i,a)=>i&&typeof a=="string",!0))throw new Nr(Re(r),t.status,r.weak_password.reasons);throw new Li(Re(r),t.status||500,s)}const ca=(t,e,r,s)=>{const n={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?n:(n.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),n.body=JSON.stringify(s),Object.assign(Object.assign({},n),r))};async function _(t,e,r,s){var n;const i=Object.assign({},s==null?void 0:s.headers);i[ur]||(i[ur]=Ss["2024-01-01"].name),s!=null&&s.jwt&&(i.Authorization=`Bearer ${s.jwt}`);const a=(n=s==null?void 0:s.query)!==null&&n!==void 0?n:{};s!=null&&s.redirectTo&&(a.redirect_to=s.redirectTo);const o=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",l=await da(t,e,r+o,{headers:i,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function da(t,e,r,s,n,i){const a=ca(e,s,n,i);let o;try{o=await t(r,Object.assign({},a))}catch(l){throw new hr(Re(l),0)}if(o.ok||await Wr(o),s!=null&&s.noResolveJson)return o;try{return await o.json()}catch(l){await Wr(l)}}function J(t){var e;let r=null;fa(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=zi(t.expires_in)));const s=(e=t.user)!==null&&e!==void 0?e:typeof(t==null?void 0:t.id)=="string"?t:null;return{data:{session:r,user:s},error:null}}function Vr(t){const e=J(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,s)=>r&&typeof s=="string",!0)&&(e.data.weak_password=t.weak_password),e}function xe(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function ua(t){return{data:t,error:null}}function ha(t){const{action_link:e,email_otp:r,hashed_token:s,redirect_to:n,verification_type:i}=t,a=Mt(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:r,hashed_token:s,redirect_to:n,verification_type:i},l=Object.assign({},a);return{data:{properties:o,user:l},error:null}}function Kr(t){return t}function fa(t){return!!t.access_token&&!!t.refresh_token&&!!t.expires_in}const Zt=["global","local","others"];class pa{constructor({url:e="",headers:r={},fetch:s,experimental:n}){this.url=e,this.headers=r,this.fetch=Rs(s),this.experimental=n??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,r=Zt[0]){if(Zt.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Zt.join(", ")}`);try{return await _(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(w(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,r={}){try{return await _(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:xe})}catch(s){if(w(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:r}=e,s=Mt(e,["options"]),n=Object.assign(Object.assign({},s),r);return"newEmail"in s&&(n.new_email=s==null?void 0:s.newEmail,delete n.newEmail),await _(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:n,headers:this.headers,xform:ha,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(w(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await _(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:xe})}catch(r){if(w(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,s,n,i,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await _(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(i=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&i!==void 0?i:""},xform:Kr});if(d.error)throw d.error;const u=await d.json(),f=(a=d.headers.get("x-total-count"))!==null&&a!==void 0?a:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),m=JSON.parse(p.split(";")[1].split("=")[1]);c[`${m}Page`]=g}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(w(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){ue(e);try{return await _(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:xe})}catch(r){if(w(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){ue(e);try{return await _(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:xe})}catch(s){if(w(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,r=!1){ue(e);try{return await _(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:xe})}catch(s){if(w(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){ue(e.userId);try{const{data:r,error:s}=await _(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:n=>({data:{factors:n},error:null})});return{data:r,error:s}}catch(r){if(w(r))return{data:null,error:r};throw r}}async _deleteFactor(e){ue(e.userId),ue(e.id);try{return{data:await _(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(w(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,s,n,i,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await _(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(i=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&i!==void 0?i:""},xform:Kr});if(d.error)throw d.error;const u=await d.json(),f=(a=d.headers.get("x-total-count"))!==null&&a!==void 0?a:0,h=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),m=JSON.parse(p.split(";")[1].split("=")[1]);c[`${m}Page`]=g}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(w(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await _(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(w(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await _(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(w(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await _(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(w(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await _(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(w(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await _(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(w(r))return{data:null,error:r};throw r}}async _listCustomProviders(e){try{const r={};return e!=null&&e.type&&(r.type=e.type),await _(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:s=>{var n;return{data:{providers:(n=s==null?void 0:s.providers)!==null&&n!==void 0?n:[]},error:null}}})}catch(r){if(w(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(e){try{return await _(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(w(r))return{data:null,error:r};throw r}}async _getCustomProvider(e){try{return await _(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(w(r))return{data:null,error:r};throw r}}async _updateCustomProvider(e,r){try{return await _(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(w(s))return{data:null,error:s};throw s}}async _deleteCustomProvider(e){try{return await _(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(w(r))return{data:null,error:r};throw r}}async _adminListPasskeys(e){ee(this.experimental),ue(e.userId);try{return await _(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(w(r))return{data:null,error:r};throw r}}async _adminDeletePasskey(e){ee(this.experimental),ue(e.userId),ue(e.passkeyId);try{return await _(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(w(r))return{data:null,error:r};throw r}}}function Gr(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}globalThis&&Ts()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class ga extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function ma(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function $s(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function ya(t){return parseInt(t,16)}function va(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function ba(t){var e;const{chainId:r,domain:s,expirationTime:n,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:l,resources:c,scheme:d,uri:u,version:f}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(a&&a.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(f!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const h=$s(t.address),p=d?`${d}://${s}`:s,g=t.statement?`${t.statement}
`:"",m=`${p} wants you to sign in with your Ethereum account:
${h}

${g}`;let b=`URI: ${u}
Version: ${f}
Chain ID: ${r}${a?`
Nonce: ${a}`:""}
Issued At: ${i.toISOString()}`;if(n&&(b+=`
Expiration Time: ${n.toISOString()}`),o&&(b+=`
Not Before: ${o.toISOString()}`),l&&(b+=`
Request ID: ${l}`),c){let k=`
Resources:`;for(const v of c){if(!v||typeof v!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${v}`);k+=`
- ${v}`}b+=k}return`${m}
${b}`}class U extends Error{constructor({message:e,code:r,cause:s,name:n}){var i;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(i=n??(s instanceof Error?s.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=r}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class Bt extends U{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function wa({error:t,options:e}){var r,s,n;const{publicKey:i}=e;if(!i)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new U({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=i.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new U({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((s=i.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new U({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((n=i.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new U({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new U({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new U({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return i.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new U({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new U({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const a=window.location.hostname;if(Cs(a)){if(i.rp.id!==a)return new U({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new U({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new U({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new U({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new U({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function ka({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new U({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new U({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const s=window.location.hostname;if(Cs(s)){if(r.rpId!==s)return new U({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new U({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new U({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new U({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class xa{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const fr=new xa;function Jr(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:s}=t,n=Mt(t,["challenge","user","excludeCredentials"]),i=He(e).buffer,a=Object.assign(Object.assign({},r),{id:He(r.id).buffer}),o=Object.assign(Object.assign({},n),{challenge:i,user:a});if(s&&s.length>0){o.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const c=s[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:He(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function Yr(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,s=Mt(t,["challenge","allowCredentials"]),n=He(e).buffer,i=Object.assign(Object.assign({},s),{challenge:n});if(r&&r.length>0){i.allowCredentials=new Array(r.length);for(let a=0;a<r.length;a++){const o=r[a];i.allowCredentials[a]=Object.assign(Object.assign({},o),{id:He(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return i}function Xr(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:Ce(new Uint8Array(t.response.attestationObject)),clientDataJSON:Ce(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Zr(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,s=t.getClientExtensionResults(),n=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:Ce(new Uint8Array(n.authenticatorData)),clientDataJSON:Ce(new Uint8Array(n.clientDataJSON)),signature:Ce(new Uint8Array(n.signature)),userHandle:n.userHandle?Ce(new Uint8Array(n.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Cs(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function Dt(){var t,e;return!!(M()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Is(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Bt("Browser returned unexpected credential type",e)}:{data:null,error:new Bt("Empty credential response",e)}}catch(e){return{data:null,error:wa({error:e,options:t})}}}async function Ls(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Bt("Browser returned unexpected credential type",e)}:{data:null,error:new Bt("Empty credential response",e)}}catch(e){return{data:null,error:ka({error:e,options:t})}}}const _a={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Sa={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function jt(...t){const e=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),r=n=>n instanceof ArrayBuffer||ArrayBuffer.isView(n),s={};for(const n of t)if(n)for(const i in n){const a=n[i];if(a!==void 0)if(Array.isArray(a))s[i]=a;else if(r(a))s[i]=a;else if(e(a)){const o=s[i];e(o)?s[i]=jt(o,a):s[i]=jt(a)}else s[i]=a}return s}function Ea(t,e){return jt(_a,t,e||{})}function Ta(t,e){return jt(Sa,t,e||{})}class Ra{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:s,signal:n},i){var a;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!o)return{data:null,error:l};const c=n??fr.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:d}=o.webauthn.credential_options.publicKey;if(!d.name){const u=s;if(u)d.name=`${d.id}:${u}`;else{const h=(await this.client.getUser()).data.user,p=((a=h==null?void 0:h.user_metadata)===null||a===void 0?void 0:a.name)||(h==null?void 0:h.email)||(h==null?void 0:h.id)||"User";d.name=`${d.id}:${p}`}}d.displayName||(d.displayName=d.name)}switch(o.webauthn.type){case"create":{const d=Ea(o.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:u,error:f}=await Is({publicKey:d,signal:c});return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:f}}case"request":{const d=Ta(o.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:u,error:f}=await Ls(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:d,signal:c}));return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:f}}}}catch(o){return w(o)?{data:null,error:o}:{data:null,error:new re("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:r,webauthn:s}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},i){if(!r)return{data:null,error:new lt("rpId is required for WebAuthn authentication")};try{if(!Dt())return{data:null,error:new re("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:s},signal:n},{request:i});if(!a)return{data:null,error:o};const{webauthn:l}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:s,credential_response:l.credential_response}})}catch(a){return w(a)?{data:null,error:a}:{data:null,error:new re("Unexpected error in authenticate",a)}}}async _register({friendlyName:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},i){if(!r)return{data:null,error:new lt("rpId is required for WebAuthn registration")};try{if(!Dt())return{data:null,error:new re("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(d=>{var u;return(u=d.data)===null||u===void 0?void 0:u.all.find(f=>f.factor_type==="webauthn"&&f.friendly_name===e&&f.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:r,rpOrigins:s},signal:n},{create:i});return l?this._verify({factorId:a.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(a){return w(a)?{data:null,error:a}:{data:null,error:new re("Unexpected error in register",a)}}}}ma();const Aa={url:Ti,storageKey:Ri,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Ai,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},je={};class dt{get jwks(){var e,r;return(r=(e=je[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){je[this.storageKey]=Object.assign(Object.assign({},je[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=je[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){je[this.storageKey]=Object.assign(Object.assign({},je[this.storageKey]),{cachedAt:e})}constructor(e){var r,s,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const i=Object.assign(Object.assign({},Aa),e);if(this.storageKey=i.storageKey,this.instanceID=(r=dt.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,dt.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.instanceID>0&&M()){const a=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(a),this.logDebugMessages&&console.trace(a)}if(this.persistSession=i.persistSession,this.autoRefreshToken=i.autoRefreshToken,this.experimental=(s=i.experimental)!==null&&s!==void 0?s:{},this.admin=new pa({url:i.url,headers:i.headers,fetch:i.fetch,experimental:this.experimental}),this.url=i.url,this.headers=i.headers,this.fetch=Rs(i.fetch),this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,this.throwOnError=i.throwOnError,this.lockAcquireTimeout=i.lockAcquireTimeout,i.lock!=null&&(this.lock=i.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Ra(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:Ts()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=Gr(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=Gr(this.memoryStorage)),M()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(a){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",a)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async a=>{this._debug("received broadcast notification from other tab or client",a),(a.data.event==="TOKEN_REFRESHED"||a.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(a.data.event,a.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}i.skipAutoInitialize||this.initialize().catch(a=>{this._debug("#initialize()","error",a)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${_s}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){var e;if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())();const r=await this.initializePromise,s=(e=this._pendingInitNotifications)!==null&&e!==void 0?e:[];this._pendingInitNotifications=null;for(const n of s)await this._notifyAllSubscribers(n.event,n.session,n.broadcast);return r}async _initialize(){var e;try{let r={},s="none";if(M()&&(r=Fr(window.location.href),this._isImplicitGrantCallback(r)?s="implicit":await this._isPKCECallback(r)&&(s="pkce")),M()&&this.detectSessionInUrl&&s!=="none"){const{data:n,error:i}=await this._getSessionFromURL(r,s);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),Oi(i)){const l=(e=i.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:i}}return{error:i}}const{session:a,redirectType:o}=n;return this._debug("#_initialize()","detected session in URL",a,"redirect type",o),await this._saveSession(a),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",a):await this._notifyAllSubscribers("SIGNED_IN",a)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return w(r)?this._returnResult({error:r}):this._returnResult({error:new re("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,s,n;try{const i=await _(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}},xform:J}),{data:a,error:o}=i;if(o||!a)return this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(i){if(w(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signUp(e){var r,s,n;let i=null;try{let a;if("email"in e){const{email:u,password:f,options:h}=e;let p=null,g=null;this.flowType==="pkce"&&([p,g,i]=await this._getCodeChallengeAndMethod()),a=await _(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(h==null?void 0:h.emailRedirectTo,i),body:{email:u,password:f,data:(r=h==null?void 0:h.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:p,code_challenge_method:g},xform:J})}else if("phone"in e){const{phone:u,password:f,options:h}=e;a=await _(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:u,password:f,data:(s=h==null?void 0:h.data)!==null&&s!==void 0?s:{},channel:(n=h==null?void 0:h.channel)!==null&&n!==void 0?n:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:J})}else throw new xt("You must provide either an email or phone number and a password");const{data:o,error:l}=a;if(l||!o)return await Z(this.storage,this.storageKey,i),this._returnResult({data:{user:null,session:null},error:l});const c=o.session,d=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:d,session:c},error:null})}catch(a){if(await Z(this.storage,this.storageKey,i),w(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(e){try{let r;if("email"in e){const{email:i,password:a,options:o}=e;r=await _(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Vr})}else if("phone"in e){const{phone:i,password:a,options:o}=e;r=await _(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:Vr})}else throw new xt("You must provide either an email or phone number and a password");const{data:s,error:n}=r;if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!s||!s.session||!s.user){const i=new De;return this._returnResult({data:{user:null,session:null},error:i})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:n})}catch(r){if(w(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(e){var r,s,n,i;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(n=e.options)===null||n===void 0?void 0:n.queryParams,skipBrowserRedirect:(i=e.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(e,r){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,r)):this._exchangeCodeForSession(e,r)}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,s,n,i,a,o,l,c,d,u,f;let h,p;if("message"in e)h=e.message,p=e.signature;else{const{chain:g,wallet:m,statement:b,options:k}=e;let v;if(M())if(typeof m=="object")v=m;else{const q=window;if("ethereum"in q&&typeof q.ethereum=="object"&&"request"in q.ethereum&&typeof q.ethereum.request=="function")v=q.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof m!="object"||!(k!=null&&k.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");v=m}const S=new URL((r=k==null?void 0:k.url)!==null&&r!==void 0?r:window.location.href),O=await v.request({method:"eth_requestAccounts"}).then(q=>q).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!O||O.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const $=$s(O[0]);let C=(s=k==null?void 0:k.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!C){const q=await v.request({method:"eth_chainId"});C=ya(q)}const X={domain:S.host,address:$,statement:b,uri:S.href,version:"1",chainId:C,nonce:(n=k==null?void 0:k.signInWithEthereum)===null||n===void 0?void 0:n.nonce,issuedAt:(a=(i=k==null?void 0:k.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&a!==void 0?a:new Date,expirationTime:(o=k==null?void 0:k.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=k==null?void 0:k.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=k==null?void 0:k.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=k==null?void 0:k.signInWithEthereum)===null||d===void 0?void 0:d.resources};h=ba(X),p=await v.request({method:"personal_sign",params:[va(h),$]})}try{const{data:g,error:m}=await _(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:p},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(f=e.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:J});if(m)throw m;if(!g||!g.session||!g.user){const b=new De;return this._returnResult({data:{user:null,session:null},error:b})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:m})}catch(g){if(w(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var r,s,n,i,a,o,l,c,d,u,f,h;let p,g;if("message"in e)p=e.message,g=e.signature;else{const{chain:m,wallet:b,statement:k,options:v}=e;let S;if(M())if(typeof b=="object")S=b;else{const $=window;if("solana"in $&&typeof $.solana=="object"&&("signIn"in $.solana&&typeof $.solana.signIn=="function"||"signMessage"in $.solana&&typeof $.solana.signMessage=="function"))S=$.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(v!=null&&v.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");S=b}const O=new URL((r=v==null?void 0:v.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in S&&S.signIn){const $=await S.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},v==null?void 0:v.signInWithSolana),{version:"1",domain:O.host,uri:O.href}),k?{statement:k}:null));let C;if(Array.isArray($)&&$[0]&&typeof $[0]=="object")C=$[0];else if($&&typeof $=="object"&&"signedMessage"in $&&"signature"in $)C=$;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in C&&"signature"in C&&(typeof C.signedMessage=="string"||C.signedMessage instanceof Uint8Array)&&C.signature instanceof Uint8Array)p=typeof C.signedMessage=="string"?C.signedMessage:new TextDecoder().decode(C.signedMessage),g=C.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in S)||typeof S.signMessage!="function"||!("publicKey"in S)||typeof S!="object"||!S.publicKey||!("toBase58"in S.publicKey)||typeof S.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");p=[`${O.host} wants you to sign in with your Solana account:`,S.publicKey.toBase58(),...k?["",k,""]:[""],"Version: 1",`URI: ${O.href}`,`Issued At: ${(n=(s=v==null?void 0:v.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&n!==void 0?n:new Date().toISOString()}`,...!((i=v==null?void 0:v.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${v.signInWithSolana.notBefore}`]:[],...!((a=v==null?void 0:v.signInWithSolana)===null||a===void 0)&&a.expirationTime?[`Expiration Time: ${v.signInWithSolana.expirationTime}`]:[],...!((o=v==null?void 0:v.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${v.signInWithSolana.chainId}`]:[],...!((l=v==null?void 0:v.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${v.signInWithSolana.nonce}`]:[],...!((c=v==null?void 0:v.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${v.signInWithSolana.requestId}`]:[],...!((u=(d=v==null?void 0:v.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||u===void 0)&&u.length?["Resources",...v.signInWithSolana.resources.map(C=>`- ${C}`)]:[]].join(`
`);const $=await S.signMessage(new TextEncoder().encode(p),"utf8");if(!$||!($ instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=$}}try{const{data:m,error:b}=await _(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:p,signature:Ce(g)},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:J});if(b)throw b;if(!m||!m.session||!m.user){const k=new De;return this._returnResult({data:{user:null,session:null},error:k})}return m.session&&(await this._saveSession(m.session),await this._notifyAllSubscribers("SIGNED_IN",m.session)),this._returnResult({data:Object.assign({},m),error:b})}catch(m){if(w(m))return this._returnResult({data:{user:null,session:null},error:m});throw m}}async _exchangeCodeForSession(e,r){const s=(r==null?void 0:r.flowId)!=null,n=s?At(r==null?void 0:r.flowId):M()?At(Fr(window.location.href)[$e]):null;s&&!n&&this._debug("#_exchangeCodeForSession()","provided flowId is not a valid flow id",r==null?void 0:r.flowId);const{verifier:i,flowId:a}=s&&!n?{verifier:null,flowId:null}:await Zi(this.storage,this.storageKey,n),[o,l]=(i??"").split("/");try{if(!o&&this.flowType==="pkce")throw new Pi;const{data:c,error:d}=await _(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:J});if(await Z(this.storage,this.storageKey,a),d)throw d;if(!c||!c.session||!c.user){const u=new De;return this._returnResult({data:{user:null,session:null,redirectType:null},error:u})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers(l==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c.session)),this._returnResult({data:Object.assign(Object.assign({},c),{redirectType:l??null}),error:d})}catch(c){if(await Z(this.storage,this.storageKey,a),w(c))return this._returnResult({data:{user:null,session:null,redirectType:null},error:c});throw c}}async signInWithIdToken(e){try{const{options:r,provider:s,token:n,access_token:i,nonce:a}=e,o=await _(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:n,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:J}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new De;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(r){if(w(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(e){var r,s,n,i,a;let o=null;try{if("email"in e){const{email:l,options:c}=e;let d=null,u=null;this.flowType==="pkce"&&([d,u,o]=await this._getCodeChallengeAndMethod());const{error:f}=await _(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(r=c==null?void 0:c.data)!==null&&r!==void 0?r:{},create_user:(s=c==null?void 0:c.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:d,code_challenge_method:u},redirectTo:this._maybeAppendFlowIdToRedirect(c==null?void 0:c.emailRedirectTo,o)});return this._returnResult({data:{user:null,session:null},error:f})}if("phone"in e){const{phone:l,options:c}=e,{data:d,error:u}=await _(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(n=c==null?void 0:c.data)!==null&&n!==void 0?n:{},create_user:(i=c==null?void 0:c.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(a=c==null?void 0:c.channel)!==null&&a!==void 0?a:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:d==null?void 0:d.message_id},error:u})}throw new xt("You must provide either an email or phone number.")}catch(l){if(await Z(this.storage,this.storageKey,o),w(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(e){var r,s;try{let n,i;"options"in e&&(n=(r=e.options)===null||r===void 0?void 0:r.redirectTo,i=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:a,error:o}=await _(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:i}}),redirectTo:n,xform:J});if(o)throw o;if(!a)throw new Error("An error occurred on token verification.");const l=a.session,c=a.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(w(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithSSO(e){var r,s,n,i;let a=null;try{let o=null,l=null;this.flowType==="pkce"&&([o,l,a]=await this._getCodeChallengeAndMethod());const c=await _(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect((r=e.options)===null||r===void 0?void 0:r.redirectTo,a)}),!((s=e==null?void 0:e.options)===null||s===void 0)&&s.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:ua});return!((n=c.data)===null||n===void 0)&&n.url&&M()&&!(!((i=e.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await Z(this.storage,this.storageKey,a),w(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)throw s;if(!r)throw new N;const{error:n}=await _(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:n})})}catch(e){if(w(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let r=null;try{const s=`${this.url}/resend`;if("email"in e){const{email:n,type:i,options:a}=e;let o=null,l=null;this.flowType==="pkce"&&([o,l,r]=await this._getCodeChallengeAndMethod());const{error:c}=await _(this.fetch,"POST",s,{headers:this.headers,body:{email:n,type:i,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken},code_challenge:o,code_challenge_method:l},redirectTo:this._maybeAppendFlowIdToRedirect(a==null?void 0:a.emailRedirectTo,r)});return c&&await Z(this.storage,this.storageKey,r),this._returnResult({data:{user:null,session:null},error:c})}else if("phone"in e){const{phone:n,type:i,options:a}=e,{data:o,error:l}=await _(this.fetch,"POST",s,{headers:this.headers,body:{phone:n,type:i,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:l})}throw new xt("You must provide either an email or phone number and a type")}catch(s){if(await Z(this.storage,this.storageKey,r),w(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await s,await r()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=r();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const n=[...this.pendingInLock];await Promise.all(n),this.pendingInLock.splice(0,n.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await z(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<Yt:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const a=await z(this.userStorage,this.storageKey+"-user");a!=null&&a.user?e.user=a.user:e.user=Xt()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const a={value:this.suppressGetSessionWarning};e.user=oa(e.user,a),a.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:n,error:i}=await this._callRefreshToken(e.refresh_token);if(i){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const o=await z(this.storage,this.storageKey);if(o&&o.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:i})}return this._returnResult({data:{session:n},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let r;return this.lock!=null?r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):r=await this._getUser(),r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(e){try{return e?await _(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:xe}):await this._useSession(async r=>{var s,n,i;const{data:a,error:o}=r;if(o)throw o;return!(!((s=a.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new N}:await _(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(n=a.session)===null||n===void 0?void 0:n.access_token)!==null&&i!==void 0?i:void 0,xform:xe})})}catch(r){if(w(r))return kt(r)&&await this._removeSession(),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(e,r={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,r)):await this._updateUser(e,r)}async _updateUser(e,r={}){let s=null;try{return await this._useSession(async n=>{const{data:i,error:a}=n;if(a)throw a;if(!i.session)throw new N;const o=i.session;let l=null,c=null;this.flowType==="pkce"&&e.email!=null&&([l,c,s]=await this._getCodeChallengeAndMethod());const{data:d,error:u}=await _(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(r==null?void 0:r.emailRedirectTo,s),body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:xe});if(u)throw u;return o.user=d.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(n){if(await Z(this.storage,this.storageKey,s),w(n))return this._returnResult({data:{user:null},error:n});throw n}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new N;const r=Date.now()/1e3;let s=r,n=!0,i=null;const{payload:a}=Et(e.access_token);if(a.exp&&(s=a.exp,n=s<=r),n){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};i=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});i={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:s-r,expires_at:s},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(r){if(w(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async r=>{var s;if(!e){const{data:a,error:o}=r;if(o)throw o;e=(s=a.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new N;const{data:n,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{user:null,session:null},error:i}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(w(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(e,r){var s;try{if(!M())throw new _t("No browser detected.");if(e.error||e.error_description||e.error_code)throw new _t(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new jr("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new _t("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new jr("No code detected.");const{data:v,error:S}=await this._exchangeCodeForSession(e.code,{flowId:e[$e]});if(S)throw S;const O=new URL(window.location.href);return O.searchParams.delete("code"),O.searchParams.delete($e),window.history.replaceState(window.history.state,"",O.toString()),{data:{session:v.session,redirectType:(s=v.redirectType)!==null&&s!==void 0?s:null},error:null}}const{provider_token:n,provider_refresh_token:i,access_token:a,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=e;if(!a||!l||!o||!d)throw new _t("No session defined in URL");const u=Math.round(Date.now()/1e3),f=parseInt(l);let h=u+f;c&&(h=parseInt(c));const p=h-u;p*1e3<=ge&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${f}s`);const g=h-f;u-g>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",g,h,u):u-g<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",g,h,u);const{data:m,error:b}=await this._getUser(a);if(b)throw b;const k={provider_token:n,provider_refresh_token:i,access_token:a,expires_in:f,expires_at:h,refresh_token:o,token_type:d,user:m.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:k,redirectType:e.type},error:null})}catch(n){if(w(n))return this._returnResult({data:{session:null,redirectType:null},error:n});throw n}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;const r=At(e[$e]);return r&&await z(this.storage,We(this.storageKey,r))?!0:!!await z(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var s;const n=async()=>{await this._removeSession()},{data:i,error:a}=r;if(a&&!kt(a))return this._returnResult({error:a});const o=(s=i.session)===null||s===void 0?void 0:s.access_token;if(o){const{error:l}=await this.admin.signOut(o,e);if(l&&!(Dr(l)&&(l.status===404||l.status===401||l.status===403)||kt(l)))return e!=="others"&&await n(),this._returnResult({error:l})}return e!=="others"&&await n(),this._returnResult({error:null})})}onAuthStateChange(e){const r=qi(),s={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,s),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)}):await this._emitInitialSession(r)))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async r=>{var s,n;try{const{data:{session:i},error:a}=r;if(a)throw a;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",e,"session",i)}catch(i){await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",i),kt(i)||St(i)||Dr(i)&&(i.code==="refresh_token_not_found"||i.code==="refresh_token_already_used"||i.code==="session_expired")?console.warn(i):console.error(i)}})}async resetPasswordForEmail(e,r={}){let s=null,n=null,i=null;this.flowType==="pkce"&&([s,n,i]=await this._getCodeChallengeAndMethod(!0));try{return await _(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:n,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(r.redirectTo,i)})}catch(a){if(await Z(this.storage,this.storageKey,i),w(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var e;try{const{data:r,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;let s=null;try{const{data:n,error:i}=await this._useSession(async a=>{var o,l,c,d,u;const{data:f,error:h}=a;if(h)throw h;const{url:p,flowId:g}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return s=g,await _(this.fetch,"GET",p,{headers:this.headers,jwt:(u=(d=f.session)===null||d===void 0?void 0:d.access_token)!==null&&u!==void 0?u:void 0})});if(i)throw i;return M()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),this._returnResult({data:{provider:e.provider,url:n==null?void 0:n.url,flowId:s},error:null})}catch(n){if(w(n))return this._returnResult({data:{provider:e.provider,url:null,flowId:s},error:n});throw n}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var s;try{const{error:n,data:{session:i}}=r;if(n)throw n;const{options:a,provider:o,token:l,access_token:c,nonce:d}=e,u=await _(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=i==null?void 0:i.access_token)!==null&&s!==void 0?s:void 0,body:{provider:o,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:J}),{data:f,error:h}=u;return h?this._returnResult({data:{user:null,session:null},error:h}):!f||!f.session||!f.user?this._returnResult({data:{user:null,session:null},error:new De}):(f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("USER_UPDATED",f.session)),this._returnResult({data:f,error:h}))}catch(n){if(await Z(this.storage,this.storageKey,null),w(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var s,n;const{data:i,error:a}=r;if(a)throw a;return await _(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(n=(s=i.session)===null||s===void 0?void 0:s.access_token)!==null&&n!==void 0?n:void 0})})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(e){const r="#_refreshAccessToken()";this._debug(r,"begin");try{const s=Date.now();return await Wi(async n=>(n>0&&await Hi(200*Math.pow(2,n-1)),this._debug(r,"refreshing attempt",n),await _(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:J})),(n,i)=>{const a=200*Math.pow(2,n);return i&&St(i)&&Date.now()+a-s<ge})}catch(s){if(this._debug(r,"error",s),w(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const{url:s,flowId:n}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",s),M()&&!r.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s,flowId:n},error:null}}async _recoverAndRefresh(){var e,r;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const n=await z(this.storage,this.storageKey);if(n&&this.userStorage){let a=await z(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!a&&(a={user:n.user},await ye(this.userStorage,this.storageKey+"-user",a)),n.user=(e=a==null?void 0:a.user)!==null&&e!==void 0?e:Xt()}else if(n&&!n.user&&!n.user){const a=await z(this.storage,this.storageKey+"-user");a&&(a!=null&&a.user)?(n.user=a.user,await W(this.storage,this.storageKey+"-user"),await ye(this.storage,this.storageKey,n)):n.user=Xt()}if(this._debug(s,"session from storage",n),!this._isValidSession(n)){this._debug(s,"session is not valid"),n!==null&&await this._removeSession();return}const i=((r=n.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<Yt;if(this._debug(s,`session has${i?"":" not"} expired with margin of ${Yt}s`),i){if(this.autoRefreshToken&&n.refresh_token){const{error:a}=await this._callRefreshToken(n.refresh_token);a&&(Bi(a)?this._debug(s,"refresh discarded by commit guard",a):this._debug(s,"refresh failed",a))}}else if(n.user&&n.user.__isUserNotAvailableProxy===!0)try{const{data:a,error:o}=await this._getUser(n.access_token);!o&&(a!=null&&a.user)?(n.user=a.user,await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(a){console.error("Error getting user data:",a),this._debug(s,"error getting user data, skipping SIGNED_IN notification",a)}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(s,"error",n),St(n)?console.warn(n):console.error(n);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var r,s;if(!e)throw new N;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const n="#_callRefreshToken()";this._debug(n,"begin");try{this.refreshingDeferred=new Ft;const i=await z(this.storage,this.storageKey),{data:a,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!a.session)throw new N;const l=await z(this.storage,this.storageKey);if(i!==null&&(l===null||l.refresh_token!==i.refresh_token)){this._debug(n,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const f={data:null,error:new Ur};return this.refreshingDeferred.resolve(f),f}const d=this._sessionRemovalEpoch;if(await this._saveSession(a.session),this._sessionRemovalEpoch!==d){this._debug(n,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await W(this.storage,this.storageKey),this.userStorage&&await W(this.userStorage,this.storageKey+"-user");const f={data:null,error:new Ur};return this.refreshingDeferred.resolve(f),f}await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const u={data:a.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(u),u}catch(i){if(this._debug(n,"error",i),w(i)){const a={data:null,error:i};if(!St(i)){const o=await z(this.storage,this.storageKey);!!(o!=null&&o.expires_at&&o.expires_at*1e3>Date.now())?this._debug(n,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:a,expiresAt:Date.now()+Ei},(r=this.refreshingDeferred)===null||r===void 0||r.resolve(a),a}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(i),i}finally{this.refreshingDeferred=null,this._debug(n,"end")}}async _notifyAllSubscribers(e,r,s=!0){if(this._pendingInitNotifications!==null&&s){this._pendingInitNotifications.push({event:e,session:r,broadcast:s});return}const n=`#_notifyAllSubscribers(${e})`;this._debug(n,"begin",r,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:r});const i=[],a=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,r)}catch(l){i.push(l)}});if(await Promise.all(a),i.length>0){for(let o=0;o<i.length;o+=1)console.error(i[o]);throw i[0]}}finally{this._debug(n,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const r=Object.assign({},e),s=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&r.user&&await ye(this.userStorage,this.storageKey+"-user",{user:r.user});const n=Object.assign({},r);delete n.user;const i=Hr(n);await ye(this.storage,this.storageKey,i)}else{const n=Hr(r);await ye(this.storage,this.storageKey,n)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await W(this.storage,this.storageKey),await Qi(this.storage,this.storageKey),await W(this.storage,this.storageKey+"-user"),this.userStorage&&await W(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&M()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),ge);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((s.expires_at*1e3-e)/ge);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${ge}ms, refresh threshold is ${Qe} ticks`),n<=Qe&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof ga)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((s.expires_at*1e3-e)/ge);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${ge}ms, refresh threshold is ${Qe} ticks`),n<=Qe&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!M()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;if(this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(r,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,s){let n=s==null?void 0:s.redirectTo,i=null,a=null,o=null;this.flowType==="pkce"&&([i,a,o]=await this._getCodeChallengeAndMethod(),n=this._maybeAppendFlowIdToRedirect(n,o));const l=[`provider=${encodeURIComponent(r)}`];if(n&&l.push(`redirect_to=${encodeURIComponent(n)}`),s!=null&&s.scopes&&l.push(`scopes=${encodeURIComponent(s.scopes)}`),i!=null&&a!=null){const c=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(a)}`});l.push(c.toString())}if(s!=null&&s.queryParams){const c=new URLSearchParams(s.queryParams);l.push(c.toString())}return s!=null&&s.skipBrowserRedirect&&l.push(`skip_http_redirect=${s.skipBrowserRedirect}`),{url:`${e}?${l.join("&")}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,r){return!e||!r||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:ea(e,r)}async _getCodeChallengeAndMethod(e=!1){return ta(this.storage,this.storageKey,e,r=>this._debug("#_getCodeChallengeAndMethod()","evicted oldest pending PKCE verifier slot",r))}async _unenroll(e){try{return await this._useSession(async r=>{var s;const{data:n,error:i}=r;return i?this._returnResult({data:null,error:i}):await _(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token})})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(e){try{return await this._useSession(async r=>{var s,n;const{data:i,error:a}=r;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await _(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((n=l==null?void 0:l.totp)===null||n===void 0)&&n.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _verify(e){const r=async()=>{try{return await this._useSession(async s=>{var n;const{data:i,error:a}=s;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Xr(e.webauthn.credential_response):Zr(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await _(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(s){if(w(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challenge(e){const r=async()=>{try{return await this._useSession(async s=>{var n;const{data:i,error:a}=s;if(a)return this._returnResult({data:null,error:a});const o=await _(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Jr(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:Yr(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(s){if(w(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challengeAndVerify(e){const{data:r,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:s}=await this.getUser();if(s)return{data:null,error:s};const n={all:[],phone:[],totp:[],webauthn:[]};for(const i of(e=r==null?void 0:r.factors)!==null&&e!==void 0?e:[])n.all.push(i),i.status==="verified"&&n[i.factor_type].push(i);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){var r,s,n,i;if(e)try{const{payload:h}=Et(e);let p=null;h.aal&&(p=h.aal);let g=p;const{data:{user:m},error:b}=await this.getUser(e);if(b)return this._returnResult({data:null,error:b});((s=(r=m==null?void 0:m.factors)===null||r===void 0?void 0:r.filter(S=>S.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(g="aal2");const v=h.amr||[];return{data:{currentLevel:p,nextLevel:g,currentAuthenticationMethods:v},error:null}}catch(h){if(w(h))return this._returnResult({data:null,error:h});throw h}const{data:{session:a},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!a)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Et(a.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((i=(n=a.user.factors)===null||n===void 0?void 0:n.filter(h=>h.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(d="aal2");const f=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:f},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:s},error:n}=r;return n?this._returnResult({data:null,error:n}):s?await _(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new N})})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:n},error:i}=s;if(i)return this._returnResult({data:null,error:i});if(!n)return this._returnResult({data:null,error:new N});const a=await _(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&M()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(s){if(w(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:n},error:i}=s;if(i)return this._returnResult({data:null,error:i});if(!n)return this._returnResult({data:null,error:new N});const a=await _(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&M()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(s){if(w(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;return s?this._returnResult({data:null,error:s}):r?await _(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new N})})}catch(e){if(w(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async r=>{const{data:{session:s},error:n}=r;return n?this._returnResult({data:null,error:n}):s?(await _(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new N})})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(e,r={keys:[]}){let s=r.keys.find(o=>o.kid===e);if(s)return s;const n=Date.now();if(s=this.jwks.keys.find(o=>o.kid===e),s&&this.jwks_cached_at+Ii>n)return s;const{data:i,error:a}=await _(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=n,s=i.keys.find(o=>o.kid===e),!s)?null:s}async getClaims(e,r={}){try{let s=e;if(!s){const{data:h,error:p}=await this.getSession();if(p||!h.session)return this._returnResult({data:null,error:p});s=h.session.access_token}const{header:n,payload:i,signature:a,raw:{header:o,payload:l}}=Et(s);if(!(r!=null&&r.allowExpired))try{na(i.exp)}catch(h){throw new Ot(h instanceof Error?h.message:"JWT validation failed")}const c=!n.alg||n.alg.startsWith("HS")||!n.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(n.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!c){const{error:h}=await this.getUser(s);if(h)throw h;return{data:{claims:i,header:n,signature:a},error:null}}const d=ia(n.alg),u=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,u,a,Mi(`${o}.${l}`)))throw new Ot("Invalid JWT signature");return{data:{claims:i,header:n,signature:a},error:null}}catch(s){if(w(s))return this._returnResult({data:null,error:s});throw s}}async signInWithPasskey(e){var r,s,n;ee(this.experimental);try{if(!Dt())return this._returnResult({data:null,error:new re("Browser does not support WebAuthn",null)});const{data:i,error:a}=await this._startPasskeyAuthentication({options:{captchaToken:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}});if(a||!i)return this._returnResult({data:null,error:a});const o=Yr(i.options),l=(n=(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.signal)!==null&&n!==void 0?n:fr.createNewAbortSignal(),{data:c,error:d}=await Ls({publicKey:o,signal:l});if(d||!c)return this._returnResult({data:null,error:d??new re("WebAuthn ceremony failed",null)});const u=Zr(c);return this._verifyPasskeyAuthentication({challengeId:i.challenge_id,credential:u})}catch(i){if(w(i))return this._returnResult({data:null,error:i});throw i}}async registerPasskey(e){var r,s;ee(this.experimental);try{if(!Dt())return this._returnResult({data:null,error:new re("Browser does not support WebAuthn",null)});const{data:n,error:i}=await this._startPasskeyRegistration();if(i||!n)return this._returnResult({data:null,error:i});const a=Jr(n.options),o=(s=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.signal)!==null&&s!==void 0?s:fr.createNewAbortSignal(),{data:l,error:c}=await Is({publicKey:a,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new re("WebAuthn ceremony failed",null)});const d=Xr(l);return this._verifyPasskeyRegistration({challengeId:n.challenge_id,credential:d})}catch(n){if(w(n))return this._returnResult({data:null,error:n});throw n}}async _startPasskeyRegistration(){ee(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new N});const{data:n,error:i}=await _(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:r.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:n,error:null})})}catch(e){if(w(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){ee(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:n}=r;if(n)return this._returnResult({data:null,error:n});if(!s)return this._returnResult({data:null,error:new N});const{data:i,error:a}=await _(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:s.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _startPasskeyAuthentication(e){var r;ee(this.experimental);try{const{data:s,error:n}=await _(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:s,error:null})}catch(s){if(w(s))return this._returnResult({data:null,error:s});throw s}}async _verifyPasskeyAuthentication(e){ee(this.experimental);try{const{data:r,error:s}=await _(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:J});return s?this._returnResult({data:null,error:s}):(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:r,error:null}))}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _listPasskeys(){ee(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new N});const{data:n,error:i}=await _(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:r.access_token,xform:a=>({data:a,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:n,error:null})})}catch(e){if(w(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){ee(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:n}=r;if(n)return this._returnResult({data:null,error:n});if(!s)return this._returnResult({data:null,error:new N});const{data:i,error:a}=await _(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}async _deletePasskey(e){ee(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:n}=r;if(n)return this._returnResult({data:null,error:n});if(!s)return this._returnResult({data:null,error:new N});const{error:i}=await _(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(r){if(w(r))return this._returnResult({data:null,error:r});throw r}}}dt.nextInstanceID={};const $a=dt,Ca="2.112.0";let et="",Ut;if(typeof Deno<"u"){var Qt;et="deno",Ut=(Qt=Deno.version)===null||Qt===void 0?void 0:Qt.deno}else if(typeof document<"u")et="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")et="react-native";else{var er;et="node";const t=globalThis.process;Ut=t==null||(er=t.version)===null||er===void 0?void 0:er.replace(/^v/,"")}const Os=[`runtime=${et}`];Ut&&Os.push(`runtime-version=${Ut}`);const Ia={"X-Client-Info":`supabase-js/${Ca}; ${Os.join("; ")}`},La={headers:Ia},Oa={schema:"public"},Pa={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Ba={},Da={enabled:!1,respectSamplingDecision:!0};function ja(t){if(!t||typeof t!="string")return null;const e=t.split("-");if(e.length!==4)return null;const[r,s,n,i]=e;if(r.length!==2||s.length!==32||n.length!==16||i.length!==2)return null;const a=/^[0-9a-f]+$/i;return!a.test(r)||!a.test(s)||!a.test(n)||!a.test(i)||s==="00000000000000000000000000000000"||n==="0000000000000000"?null:{version:r,traceId:s,parentId:n,traceFlags:i,isSampled:(parseInt(i,16)&1)===1}}function Ua(t,e){if(!t||!e||e.length===0)return!1;let r;if(t instanceof URL)r=t;else try{r=new URL(t)}catch{return!1}for(const s of e)try{if(typeof s=="string"){if(Na(r.hostname,s))return!0}else if(s instanceof RegExp){if(s.test(r.hostname))return!0}else if(typeof s=="function"&&s(r))return!0}catch{continue}return!1}function Na(t,e){if(e===t)return!0;if(e.startsWith("*.")){const r=e.slice(2);if(t.endsWith(r)&&(t===r||t.endsWith("."+r)))return!0}return!1}function Ma(t){const e=[];try{const r=new URL(t);e.push(r.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function ut(t){"@babel/helpers - typeof";return ut=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ut(t)}function za(t,e){if(ut(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(ut(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function qa(t){var e=za(t,"string");return ut(e)=="symbol"?e:e+""}function Fa(t,e,r){return(e=qa(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Qr(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),r.push.apply(r,s)}return r}function B(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Qr(Object(r),!0).forEach(function(s){Fa(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Qr(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}const Ha=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Wa=()=>Headers,Ps=t=>t.startsWith("sb_publishable_")||t.startsWith("sb_secret_"),Va="sb_temp_",es=new Set,Ka=t=>{var e,r;if(!t.startsWith("sb_")||Ps(t)||t.startsWith(Va))return;const s=(e=(r=t.match(/^sb_[a-zA-Z0-9]+_/))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:"unknown";es.has(s)||(es.add(s),console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."))},ts=(t,e,r,s,n,i)=>{const a=Ha(s),o=Wa(),l=(n==null?void 0:n.enabled)===!0,c=(n==null?void 0:n.respectSamplingDecision)!==!1,d=l?Ma(e):null,u=!(i!=null&&i.omitApiKeyAsBearer&&Ps(t));return async(f,h)=>{const p=await r();let g=new o(h==null?void 0:h.headers);if(g.has("apikey")||g.set("apikey",t),!g.has("Authorization")){const m=p??(u?t:null);m&&g.set("Authorization",`Bearer ${m}`)}if(d){const m=Ga(f,d,c);m&&(m.traceparent&&!g.has("traceparent")&&g.set("traceparent",m.traceparent),m.tracestate&&!g.has("tracestate")&&g.set("tracestate",m.tracestate),m.baggage&&!g.has("baggage")&&g.set("baggage",m.baggage))}return a(f,B(B({},h),{},{headers:g}))}};let rs=!1;function Ga(t,e,r){const s=Ws();if(!s)return rs||(rs=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!Ua(typeof t=="string"||t instanceof URL?t:t.url,e))return null;const n=s();if(!n||!n.traceparent)return null;if(r){const i=ja(n.traceparent);if(i&&!i.isSampled)return null}return n}function ss(t){return typeof t=="boolean"?{enabled:t}:t}function Ja(t){return t.endsWith("/")?t:t+"/"}function Ya(t,e){var r,s,n,i,a,o;const{db:l,auth:c,realtime:d,global:u}=t,{db:f,auth:h,realtime:p,global:g}=e,m=ss(t.tracePropagation),b=ss(e.tracePropagation),k={db:B(B({},f),l),auth:B(B({},h),c),realtime:B(B({},p),d),storage:{},global:B(B(B({},g),u),{},{headers:B(B({},(r=g==null?void 0:g.headers)!==null&&r!==void 0?r:{}),(s=u==null?void 0:u.headers)!==null&&s!==void 0?s:{})}),tracePropagation:{enabled:(n=(i=m==null?void 0:m.enabled)!==null&&i!==void 0?i:b==null?void 0:b.enabled)!==null&&n!==void 0?n:!1,respectSamplingDecision:(a=(o=m==null?void 0:m.respectSamplingDecision)!==null&&o!==void 0?o:b==null?void 0:b.respectSamplingDecision)!==null&&a!==void 0?a:!0},accessToken:async()=>""};return t.accessToken?k.accessToken=t.accessToken:delete k.accessToken,k}function Xa(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Ja(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Za=class extends $a{constructor(t){super(t)}},Qa=class{constructor(t,e,r){var s,n;this.supabaseUrl=t,this.supabaseKey=e;const i=Xa(t);if(!e)throw new Error("supabaseKey is required.");Ka(e),this.realtimeUrl=new URL("realtime/v1",i),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",i),this.storageUrl=new URL("storage/v1",i),this.functionsUrl=new URL("functions/v1",i);const a=`sb-${i.hostname.split(".")[0]}-auth-token`,o={db:Oa,realtime:Ba,auth:B(B({},Pa),{},{storageKey:a}),global:La,tracePropagation:Da},l=Ya(r??{},o);if(this.settings=l,this.storageKey=(s=l.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(n=l.global.headers)!==null&&n!==void 0?n:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=ts(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation),this.functionsFetch=ts(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(B({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new nn(new URL("rest/v1",i).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit,retry:l.db.retry}),this.storage=new Si(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Js(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,r)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var t=this,e,r;if(t.accessToken)return await t.accessToken();const{data:s}=await t.auth.getSession();return(e=(r=s.session)===null||r===void 0?void 0:r.access_token)!==null&&e!==void 0?e:null}async _getAccessToken(){var t=this,e;return(e=await t._getSessionToken())!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:n,storageKey:i,flowType:a,lock:o,debug:l,throwOnError:c,experimental:d,lockAcquireTimeout:u,skipAutoInitialize:f},h,p){const g={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Za({url:this.authUrl.href,headers:B(B({},g),h),storageKey:i,autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:n,flowType:a,lock:o,debug:l,throwOnError:c,experimental:d,fetch:p,lockAcquireTimeout:u,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(m=>m.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new Gn(this.realtimeUrl.href,B(B({},t),{},{params:B(B({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,r){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN"||t==="INITIAL_SESSION")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const eo=(t,e,r)=>new Qa(t,e,r);function to(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const r=e.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=20:!1}to()&&console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");const ro="https://aakqmdwyglroulqngrdr.supabase.co",Bs="sb_publishable_IpitJ3f_VLEGV0BuKZdJdg_oY72FIc0";let ce=!Bs.includes("your-anon-key="),se=ce?eo(ro,Bs):null;const so="TradeMasterDB",no=2;let Tt=null;function L(t,e,r,s){const n=e?"#10b981":"#ef4444",i=`${r} - ${s} ${t?"(Setup)":"(Outcome)"}`,a=Array.from({length:8},(h,p)=>`<line x1="0" y1="${p*25}" x2="300" y2="${p*25}" stroke="#222b36" stroke-width="1"/>`).join(""),l=[{x:40,open:120,close:100,high:90,low:130},{x:70,open:100,close:80,high:75,low:110},{x:100,open:80,close:110,high:70,low:120},{x:130,open:110,close:95,high:90,low:125},{x:160,open:95,close:60,high:50,low:105},{x:190,open:60,close:t?65:e?40:110,high:t?55:e?30:120,low:t?75:e?50:100},{x:220,open:t?65:e?40:110,close:t?70:e?20:130,high:t?60:e?10:140,low:t?80:e?30:120}].map(h=>{const g=h.close<h.open?"#10b981":"#ef4444",m=Math.min(h.open,h.close),b=Math.abs(h.open-h.close);return`
      <line x1="${h.x}" y1="${h.high}" x2="${h.x}" y2="${h.low}" stroke="${g}" stroke-width="1.5"/>
      <rect x="${h.x-6}" y="${m}" width="12" height="${b}" fill="${g}" rx="1"/>
    `}).join(""),c=s==="Buy"?`<rect x="154" y="20" width="120" height="40" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1" stroke-dasharray="2"/>
       <rect x="154" y="60" width="120" height="30" fill="#ef4444" fill-opacity="0.1" stroke="#ef4444" stroke-width="1" stroke-dasharray="2"/>`:`<rect x="154" y="60" width="120" height="40" fill="#ef4444" fill-opacity="0.1" stroke="#ef4444" stroke-width="1" stroke-dasharray="2"/>
       <rect x="154" y="20" width="120" height="30" fill="#10b981" fill-opacity="0.1" stroke="#10b981" stroke-width="1" stroke-dasharray="2"/>`,d=`
    <circle cx="160" cy="60" r="4" fill="#3b82f6"/>
    <text x="170" y="55" fill="#3b82f6" font-size="9" font-family="sans-serif" font-weight="bold">ENTRY</text>
  `,u=t?"":`<path d="M 160 60 Q 200 ${e?20:120} 240 ${e?25:125}" fill="none" stroke="${n}" stroke-width="2" stroke-dasharray="4"/>
       <circle cx="240" cy="${e?25:125}" r="5" fill="${n}"/>`,f=`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#0f131a"/>
      ${a}
      ${c}
      ${l}
      ${d}
      ${u}
      <text x="12" y="24" fill="#94a3b8" font-size="11" font-family="sans-serif" font-weight="bold">${i}</text>
      <text x="245" y="185" fill="#64748b" font-size="9" font-family="sans-serif">TradeMaster</text>
    </svg>
  `;return"data:image/svg+xml;utf8,"+encodeURIComponent(f.trim())}function Ie(){return new Promise((t,e)=>{if(Tt){t(Tt);return}const r=indexedDB.open(so,no);r.onerror=s=>{console.error("Database error:",s.target.error),e(s.target.error)},r.onsuccess=s=>{Tt=s.target.result,t(Tt)},r.onupgradeneeded=s=>{const n=s.target.result;n.objectStoreNames.contains("TradingJournal")||n.createObjectStore("TradingJournal",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("BacktestingJournal")||n.createObjectStore("BacktestingJournal",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("Strategies")||n.createObjectStore("Strategies",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("Checklists")||n.createObjectStore("Checklists",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("Users")||n.createObjectStore("Users",{keyPath:"email"})}})}function Le(){if(!ce||!se)throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");return se}function Ke(){return!!se}async function vr(){const t=Le(),{data:e,error:r}=await t.from("Users").select("email").limit(1).maybeSingle();if(r)throw new Error(r.message||"Supabase connection test failed.");return{success:!0,connected:!0,sample:e||null}}async function Ds(){if(!ce)return{mode:"local"};try{return await vr(),{mode:"supabase"}}catch(t){return console.warn("Supabase unavailable at startup, switching to local DB:",t.message||t),ce=!1,se=null,{mode:"local",error:t}}}async function K(t){if(Ke())try{let r=Le().from(t).select("*");t!=="Users"&&(r=r.order("id",{ascending:!0}));const{data:s,error:n}=await r;if(n)throw n;return s||[]}catch(e){console.warn("Supabase read failed, disabling Supabase and falling back to local DB:",e.message||e),ce=!1,se=null}return Ie().then(e=>new Promise((r,s)=>{const a=e.transaction(t,"readonly").objectStore(t).getAll();a.onsuccess=()=>r(a.result),a.onerror=()=>s(a.error)}))}async function ve(t,e){if(Ke())try{const r=Le(),s=Array.isArray(e)?e:[e],{data:n,error:i}=await r.from(t).insert(s).select();if(i)throw i;return Array.isArray(e)?n:(n==null?void 0:n[0])||null}catch(r){console.warn("Supabase insert failed, disabling Supabase and falling back to local DB:",r.message||r),ce=!1,se=null}return Ie().then(r=>new Promise((s,n)=>{const o=r.transaction(t,"readwrite").objectStore(t).add(e);o.onsuccess=()=>s(o.result),o.onerror=()=>n(o.error)}))}async function Ht(t,e){if(Ke())try{const r=Le(),s=t==="Users"?"email":"id";if(e[s]===void 0||e[s]===null)throw new Error(`Missing primary key field ${s} for ${t} update.`);const{data:n,error:i}=await r.from(t).update(e).eq(s,e[s]).select();if(i)throw i;return Array.isArray(n)?n[0]:n}catch(r){console.warn("Supabase update failed, disabling Supabase and falling back to local DB:",r.message||r),ce=!1,se=null}return Ie().then(r=>new Promise((s,n)=>{const o=r.transaction(t,"readwrite").objectStore(t).put(e);o.onsuccess=()=>s(o.result),o.onerror=()=>n(o.error)}))}async function Wt(t,e){if(Ke())try{const r=Le(),s=t==="Users"?"email":"id",n=r.from(t).delete().eq(s,e),{error:i}=await n;if(i)throw i;return!0}catch(r){console.warn("Supabase delete failed, disabling Supabase and falling back to local DB:",r.message||r),ce=!1,se=null}return Ie().then(r=>new Promise((s,n)=>{const a=r.transaction(t,"readwrite").objectStore(t),o=isNaN(e)||typeof e=="string"?e:Number(e),l=a.delete(o);l.onsuccess=()=>s(!0),l.onerror=()=>n(l.error)}))}function js(t){return ve("Users",t)}async function Us(t){if(Ke())try{const e=Le(),{data:r,error:s}=await e.from("Users").select("*").eq("email",t).maybeSingle();if(s)throw s;if(r)return r}catch(e){console.warn("Supabase getUser failed, disabling Supabase and falling back to local DB:",e.message||e),ce=!1,se=null}return Ie().then(e=>new Promise((r,s)=>{const a=e.transaction("Users","readonly").objectStore("Users").get(t);a.onsuccess=()=>r(a.result),a.onerror=()=>s(a.error)}))}function pr(){return K("Users")}function gr(t){return Ht("Users",t)}async function Ns(){const t=await K("Users"),e=t.some(a=>a.role==="admin");if(t.length===0||!e){const a=[];e||a.push({username:"AdminMaster",email:"admin@trademaster.com",password:"admin123",role:"admin",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:"AM",currency:"USD",riskDefault:1,notifications:!0}),t.length===0&&a.push({username:"AlexTrader",email:"alex.forex@master.com",password:"password123",role:"user",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:"AT",currency:"USD",riskDefault:1,notifications:!0},{username:"HassanFX",email:"hassan.trade@journal.com",password:"hassan123",role:"user",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:"HF",currency:"USD",riskDefault:1,notifications:!0});for(const o of a)await Us(o.email)||await ve("Users",o)}const r=await K("TradingJournal"),s=await K("BacktestingJournal"),n=await K("Strategies"),i=await K("Checklists");if(n.length===0){const a=[{name:"SMC Order Block",description:"Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow."},{name:"Liquidity Grab & Reversal",description:"Fading structural high/low grabs at New York/London session opens."},{name:"Support & Resistance Bounce",description:"Reversing off major daily/weekly supply & demand zones."}];for(const o of a)o.userEmail="alex.forex@master.com",await ve("Strategies",o)}if(i.length===0){const a=[{name:"Standard Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined"]},{name:"Conservative Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined","Session open volatility settled","RR greater than 1:3"]}];for(const o of a)o.userEmail="alex.forex@master.com",await ve("Checklists",o)}if(r.length===0){const a=[{date:"2026-07-01",day:"Wednesday",session:"London",pair:"EURUSD",type:"Buy",entryPrice:1.085,stopLoss:1.084,takeProfit:1.088,riskPercent:1,rr:3,result:"Win",strategy:"SMC Order Block",setup:"15m Bullish OB Tap",checklist:["HTF Trend Aligned","OB Tapped","Risk defined"],emotion:"Disciplined",mistakes:"None",lessonLearned:"Patience pays off. Waited for the tap.",notes:"Price tapped the 15m OB right at London open and rallied.",beforeScreenshot:L(!0,!0,"EURUSD","Buy"),afterScreenshot:L(!1,!0,"EURUSD","Buy")},{date:"2026-07-02",day:"Thursday",session:"New York",pair:"GBPUSD",type:"Sell",entryPrice:1.268,stopLoss:1.271,takeProfit:1.259,riskPercent:1.5,rr:3,result:"Loss",strategy:"Liquidity Grab & Reversal",setup:"NY Session High Sweep",checklist:["Liquidity Swept","Risk defined"],emotion:"Anxious",mistakes:"FOMO",lessonLearned:"Do not chase if entry is missed. Wait for pullback.",notes:"Felt like I was missing the drop, entered late, stopped out before reversal.",beforeScreenshot:L(!0,!1,"GBPUSD","Sell"),afterScreenshot:L(!1,!1,"GBPUSD","Sell")},{date:"2026-07-03",day:"Friday",session:"Asia",pair:"USDJPY",type:"Buy",entryPrice:155.5,stopLoss:155.2,takeProfit:156.1,riskPercent:.5,rr:2,result:"Break Even",strategy:"Support & Resistance Bounce",setup:"155.50 Support test",checklist:["HTF Trend Aligned","Risk defined"],emotion:"Disciplined",mistakes:"None",lessonLearned:"Moved stop loss to entry correctly as target 1 hit.",notes:"Rallied to +1R then reversed back to entry.",beforeScreenshot:L(!0,!0,"USDJPY","Buy"),afterScreenshot:L(!1,!1,"USDJPY","Buy")},{date:"2026-07-06",day:"Monday",session:"London",pair:"XAUUSD",type:"Sell",entryPrice:2320,stopLoss:2325,takeProfit:2300,riskPercent:1,rr:4,result:"Win",strategy:"SMC Order Block",setup:"4H Supply Zone Reject",checklist:["HTF Trend Aligned","OB Tapped","Risk defined"],emotion:"Disciplined",mistakes:"None",lessonLearned:"Trust higher timeframe structural bias.",notes:"Beautiful clean rejection off 4H supply.",beforeScreenshot:L(!0,!0,"XAUUSD","Sell"),afterScreenshot:L(!1,!0,"XAUUSD","Sell")},{date:"2026-07-07",day:"Tuesday",session:"New York",pair:"EURUSD",type:"Sell",entryPrice:1.092,stopLoss:1.094,takeProfit:1.086,riskPercent:1,rr:3,result:"Win",strategy:"Liquidity Grab & Reversal",setup:"NY Session High Sweep",checklist:["Liquidity Swept","MSS on LTF","Risk defined"],emotion:"Disciplined",mistakes:"None",lessonLearned:"Sweeping daily highs leads to strong intraday reversals.",notes:"Excellent high grab confirmation.",beforeScreenshot:L(!0,!0,"EURUSD","Sell"),afterScreenshot:L(!1,!0,"EURUSD","Sell")},{date:"2026-07-07",day:"Tuesday",session:"London",pair:"GBPUSD",type:"Buy",entryPrice:1.272,stopLoss:1.27,takeProfit:1.278,riskPercent:1,rr:3,result:"Loss",strategy:"SMC Order Block",setup:"1H demand zone block",checklist:["OB Tapped","Risk defined"],emotion:"Greedy",mistakes:"Over-leveraged",lessonLearned:"Check major news calendars before entering near London sessions.",notes:"Tapped demand but UK CPI data spiked and stopped me out immediately.",beforeScreenshot:L(!0,!1,"GBPUSD","Buy"),afterScreenshot:L(!1,!1,"GBPUSD","Buy")}];for(const o of a)o.userEmail="alex.forex@master.com",await ve("TradingJournal",o)}if(s.length===0){const a=[{user_id:"alex.forex@master.com",date:"2026-06-01",session:"New York",pair:"EURUSD",strategy:"SMC Order Block",timeframe:"15m",direction:"Buy",entry_price:1.078,stop_loss:1.076,take_profit:1.084,risk_percent:1,target_rr:3,actual_rr:3,result:"Win",lesson_learned:"Classic bullish structural continuation block.",notes:"Perfect mitigation, quick run to target.",before_image:L(!0,!0,"EURUSD","Buy"),after_image:L(!1,!0,"EURUSD","Buy"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-03",session:"London",pair:"GBPUSD",strategy:"SMC Order Block",timeframe:"15m",direction:"Buy",entry_price:1.254,stop_loss:1.252,take_profit:1.26,risk_percent:1,target_rr:3,actual_rr:3,result:"Win",lesson_learned:"Dip was fast, order execution filled nicely.",notes:"High probability SMC setup.",before_image:L(!0,!0,"GBPUSD","Buy"),after_image:L(!1,!0,"GBPUSD","Buy"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-05",session:"New York",pair:"GBPUSD",strategy:"Liquidity Grab & Reversal",timeframe:"1H",direction:"Sell",entry_price:1.262,stop_loss:1.264,take_profit:1.256,risk_percent:1,target_rr:3,actual_rr:-1,result:"Loss",lesson_learned:"Sometimes sweeps turn into full structural breaks.",notes:"Structure failed, price continued trading higher into daily resistance.",before_image:L(!0,!1,"GBPUSD","Sell"),after_image:L(!1,!1,"GBPUSD","Sell"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-09",session:"London",pair:"EURUSD",strategy:"SMC Order Block",timeframe:"15m",direction:"Sell",entry_price:1.082,stop_loss:1.0835,take_profit:1.076,risk_percent:1,target_rr:4,actual_rr:4,result:"Win",lesson_learned:"R:R is maximized when using HTF boundaries with LTF triggers.",notes:"Very clean delivery of orders.",before_image:L(!0,!0,"EURUSD","Sell"),after_image:L(!1,!0,"EURUSD","Sell"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-12",session:"Asia",pair:"USDJPY",strategy:"Support & Resistance Bounce",timeframe:"4H",direction:"Buy",entry_price:154.2,stop_loss:154,take_profit:154.8,risk_percent:1,target_rr:3,actual_rr:-1,result:"Loss",lesson_learned:"Support holds work best when accompanied by volume divergence.",notes:"Price broke straight through the support level without halting.",before_image:L(!0,!1,"USDJPY","Buy"),after_image:L(!1,!1,"USDJPY","Buy"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-15",session:"New York",pair:"XAUUSD",strategy:"Liquidity Grab & Reversal",timeframe:"15m",direction:"Sell",entry_price:2350,stop_loss:2355,take_profit:2335,risk_percent:1,target_rr:3,actual_rr:3,result:"Win",lesson_learned:"Gold NYC reversal is one of the most reliable trade setups.",notes:"Classic gold sweep. NY volume expedited the drop.",before_image:L(!0,!0,"XAUUSD","Sell"),after_image:L(!1,!0,"XAUUSD","Sell"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-18",session:"London",pair:"EURUSD",strategy:"Support & Resistance Bounce",timeframe:"30m",direction:"Buy",entry_price:1.074,stop_loss:1.072,take_profit:1.08,risk_percent:1,target_rr:3,actual_rr:3,result:"Win",lesson_learned:"High reward zone entry.",notes:"Classic double bottom verification.",before_image:L(!0,!0,"EURUSD","Buy"),after_image:L(!1,!0,"EURUSD","Buy"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-22",session:"New York",pair:"GBPUSD",strategy:"SMC Order Block",timeframe:"15m",direction:"Sell",entry_price:1.258,stop_loss:1.26,take_profit:1.252,risk_percent:1,target_rr:3,actual_rr:0,result:"Break Even",lesson_learned:"Securing BE at 1R is crucial in range-bound market conditions.",notes:"Price reached +1.5R then reversed aggressively.",before_image:L(!0,!0,"GBPUSD","Sell"),after_image:L(!1,!1,"GBPUSD","Sell"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-25",session:"London",pair:"EURUSD",strategy:"Liquidity Grab & Reversal",timeframe:"5m",direction:"Sell",entry_price:1.089,stop_loss:1.091,take_profit:1.083,risk_percent:1,target_rr:3,actual_rr:-1,result:"Loss",lesson_learned:"Asia session grabs are lower probability if London starts trending.",notes:"Stopped out quickly. Trend was too strong.",before_image:L(!0,!1,"EURUSD","Sell"),after_image:L(!1,!1,"EURUSD","Sell"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()},{user_id:"alex.forex@master.com",date:"2026-06-29",session:"New York",pair:"XAUUSD",strategy:"SMC Order Block",timeframe:"1H",direction:"Buy",entry_price:2315,stop_loss:2310,take_profit:2335,risk_percent:1,target_rr:4,actual_rr:4,result:"Win",lesson_learned:"High-conviction setups warrant maximum position sizing (1%).",notes:"Tapped and launched immediately. Incredible trade.",before_image:L(!0,!0,"XAUUSD","Buy"),after_image:L(!1,!0,"XAUUSD","Buy"),created_at:new Date().toISOString(),updated_at:new Date().toISOString()}];for(const o of a)await ve("BacktestingJournal",o)}}async function Ms(){if(Ke())try{const t=Le(),e=["TradingJournal","BacktestingJournal","Strategies","Checklists","Users"];for(const r of e){const s=t.from(r).delete();r==="Users"?s.not("email","is",null):s.not("id","is",null);const{error:n}=await s;if(n)throw n}return!0}catch(t){console.warn("Supabase clearDatabase failed, disabling Supabase and falling back to local DB:",t.message||t),ce=!1,se=null}return Ie().then(t=>new Promise((e,r)=>{const s=["TradingJournal","BacktestingJournal","Strategies","Checklists","Users"],n=t.transaction(s,"readwrite");s.forEach(i=>{t.objectStoreNames.contains(i)&&n.objectStore(i).clear()}),n.oncomplete=()=>e(!0),n.onerror=()=>r(n.error)}))}const Se=Object.freeze(Object.defineProperty({__proto__:null,addStoreData:ve,clearDatabase:Ms,deleteStoreData:Wt,getAllUsers:pr,getStoreData:K,getUser:Us,initDB:Ie,initializeDatabaseMode:Ds,populateMockDataIfEmpty:Ns,registerUser:js,get supabase(){return se},testSupabaseConnection:vr,updateStoreData:Ht,updateUser:gr},Symbol.toStringTag,{value:"Module"})),x={user:null,activeView:"dashboard",tradingTrades:[],backtestTrades:[],strategies:[],checklists:[],activeDashboardTab:"live",listeners:[],language:"en",async init(){this.language=localStorage.getItem("trademaster-lang")||"en";const t=localStorage.getItem("trademaster-theme")||"dark";document.body.className=t==="light"?"light-theme":"";try{const r=await Ds();r.mode==="local"&&console.warn("Database mode:",r.mode,"using local IndexedDB fallback.")}catch(r){console.error("Failed to initialize database mode:",r)}try{await Ns()}catch(r){console.error("Failed to populate databases:",r)}const e=localStorage.getItem("trademaster-user")||sessionStorage.getItem("trademaster-user");if(e){const r=JSON.parse(e);try{const{getUser:s}=await _e(async()=>{const{getUser:i}=await Promise.resolve().then(()=>Se);return{getUser:i}},void 0),n=await s(r.email);n&&n.status==="active"?(this.user=n,localStorage.getItem("trademaster-user")?localStorage.setItem("trademaster-user",JSON.stringify(this.user)):sessionStorage.setItem("trademaster-user",JSON.stringify(this.user))):(this.user=null,localStorage.removeItem("trademaster-user"),sessionStorage.removeItem("trademaster-user"))}catch{this.user=r}}else this.user=null;await this.refreshCache()},async refreshCache(){try{const t=await K("TradingJournal"),e=await K("BacktestingJournal"),r=await K("Strategies"),s=await K("Checklists");this.user?this.user.role==="admin"?(this.tradingTrades=t,this.backtestTrades=e,this.strategies=r,this.checklists=s):(this.tradingTrades=t.filter(n=>n.userEmail===this.user.email),this.backtestTrades=e.filter(n=>n.user_id===this.user.email),this.strategies=r.filter(n=>n.userEmail===this.user.email),this.checklists=s.filter(n=>n.userEmail===this.user.email)):(this.tradingTrades=[],this.backtestTrades=[],this.strategies=[],this.checklists=[]),this.notifyListeners()}catch(t){console.error("Failed to refresh data cache:",t)}},setView(t){this.activeView=t,this.notifyListeners()},setDashboardTab(t){this.activeDashboardTab=t,this.notifyListeners()},setLanguage(t){this.language=t,localStorage.setItem("trademaster-lang",t),this.notifyListeners()},async login(t,e,r=!1){const{getUser:s}=await _e(async()=>{const{getUser:i}=await Promise.resolve().then(()=>Se);return{getUser:i}},void 0),n=await s(t);if(!n)throw new Error("invalidCredentials");if(n.password!==e)throw new Error("invalidCredentials");if(n.status==="suspended")throw new Error("suspendedError");return this.user=n,r?(localStorage.setItem("trademaster-user",JSON.stringify(this.user)),sessionStorage.removeItem("trademaster-user")):(sessionStorage.setItem("trademaster-user",JSON.stringify(this.user)),localStorage.removeItem("trademaster-user")),await this.refreshCache(),this.notifyListeners(),this.user},async register(t,e,r,s=""){const{getUser:n,registerUser:i,addStoreData:a}=await _e(async()=>{const{getUser:c,registerUser:d,addStoreData:u}=await Promise.resolve().then(()=>Se);return{getUser:c,registerUser:d,addStoreData:u}},void 0);if(await n(e))throw new Error("emailExists");const l={username:t,fullName:s,email:e,password:r,role:"user",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:t.slice(0,2).toUpperCase(),currency:"USD",riskDefault:1,notifications:!0};await i(l);try{const c=[{name:"SMC Order Block",description:"Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow.",userEmail:e},{name:"Liquidity Grab & Reversal",description:"Fading structural high/low grabs at New York/London session opens.",userEmail:e},{name:"Support & Resistance Bounce",description:"Reversing off major daily/weekly supply & demand zones.",userEmail:e}];for(const u of c)await a("Strategies",u);const d=[{name:"Standard Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined"],userEmail:e}];for(const u of d)await a("Checklists",u)}catch(c){console.error("Failed to seed user templates:",c)}return this.user=l,sessionStorage.setItem("trademaster-user",JSON.stringify(this.user)),await this.refreshCache(),this.notifyListeners(),this.user},logout(){this.user=null,localStorage.removeItem("trademaster-user"),sessionStorage.removeItem("trademaster-user"),this.setView("auth"),this.notifyListeners()},async updateProfile(t){const{updateUser:e}=await _e(async()=>{const{updateUser:r}=await Promise.resolve().then(()=>Se);return{updateUser:r}},void 0);this.user={...this.user,...t},await e(this.user),localStorage.getItem("trademaster-user")?localStorage.setItem("trademaster-user",JSON.stringify(this.user)):sessionStorage.setItem("trademaster-user",JSON.stringify(this.user)),this.notifyListeners()},subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}},notifyListeners(){this.listeners.forEach(t=>t(this))}},ns={en:{dashboard:"Dashboard",journal:"Trading Journal",backtesting:"Backtesting",calendar:"Calendar",analytics:"Analytics",gallery:"Gallery",reports:"Reports",settings:"Settings",adminPanel:"Admin Panel",logout:"Log Out",premiumTrader:"Premium Trader",adminUser:"Administrator",welcomeBack:"Welcome Back",loginSubtitle:"Login to access your trading journals",emailLabel:"Email Address",passwordLabel:"Password",forgotLink:"Forgot?",accessAccount:"Access Account",dontHaveAccount:"Don't have an account?",createOne:"Create one",createAccount:"Create Account",registerSubtitle:"Start tracking your trades like a master",usernameLabel:"Username",registerAccount:"Register Account",alreadyHaveAccount:"Already have an account?",signIn:"Sign in",resetPassword:"Reset Password",resetSubtitle:"We will send you a reset link instructions",sendInstructions:"Send Instructions",backToSignIn:"Back to Sign in",suspendedError:"Your account is suspended. Please contact the administrator.",invalidCredentials:"Invalid email or password.",emailExists:"Email is already registered.",profileSettings:"Trader Profile Settings",saveChanges:"Save Changes",defaultCurrency:"Default Currency",defaultRisk:"Default Risk Size per Trade (%)",appPreferences:"Application Preferences",colorTheme:"Color Theme Mode",themeDescription:"Toggle between Premium Dark and Clean Light view options.",themeDark:"Switch to Dark Mode",themeLight:"Switch to Light Mode",notificationsTitle:"Trading Notifications",notificationsDesc:"Receive desktop audio/alerts when journal milestones are reached.",dangerZone:"Danger Zone",dangerZoneDesc:"These operations permanently delete stored assets and data logs. They cannot be undone.",resetDatabase:"Reset Database Logs",logoutAccount:"Log Out Account",profileUpdated:"Trader Profile successfully updated.",logoutConfirm:"Are you sure you want to log out?",resetConfirm:"WARNING: This will permanently delete all trades in both Live Trading and Backtesting journals. This cannot be undone. Do you want to proceed?",dbCleared:"All journal logs successfully cleared.",winRate:"Win Rate",netPL:"Net P&L",totalTrades:"Total Trades",avgRR:"Average R:R",liveJournalTab:"Live Journal",backtestJournalTab:"Backtesting",performanceOverview:"Performance Overview",recentTrades:"Recent Trades",noTradesYet:"No trades recorded yet.",adminDashboard:"System Admin Dashboard",totalUsers:"Total Users",activeUsers:"Active Accounts",suspendedUsers:"Suspended Accounts",totalLogs:"Total Trade Logs",systemWinRate:"System Win Rate",registeredUsers:"Registered Users",addUserBtn:"Add New User",colUsername:"Username",colEmail:"Email",colRole:"Role",colStatus:"Status",colRegistered:"Registered At",colActions:"Actions",btnSuspend:"Suspend",btnActivate:"Activate",btnMakeAdmin:"Make Admin",btnDemote:"Demote to User",btnEdit:"Edit",titleAddNewUser:"Add New User Account",btnSaveUser:"Save User",btnCancel:"Cancel",userCreatedMsg:"User successfully created.",userUpdatedMsg:"User successfully updated.",cannotSuspendSelf:"You cannot suspend your own admin account.",cannotDemoteSelf:"You cannot demote your own admin account."},so:{dashboard:"Dashboard-ka",journal:"Diiwaanka Live-ka",backtesting:"Tijaabada Xeeladaha",calendar:"Kalandarka",analytics:"Falanqaynta xogta",gallery:"Sawirrada Shaxda",reports:"Warbixinnada",settings:"Habaynta Profiilka",adminPanel:"Maamulka Sare",logout:"Ka Bax",premiumTrader:"Ganacsade Premium",adminUser:"Maamule Sare",welcomeBack:"Kusoo Dhawaada Bogga",loginSubtitle:"Soo gal si aad u gasho diiwaankaaga ganacsi",emailLabel:"Email-ka Koontada",passwordLabel:"Furaha (Password)",forgotLink:"Ma Hilmaantay?",accessAccount:"Geli Koontada",dontHaveAccount:"Miyaanad lahayn koonto?",createOne:"Halkan ka sameyso",createAccount:"Sameyso Koonto Cusub",registerSubtitle:"Bilaaw in aad u diiwaangeliso ganacsigaaga si xirfad leh",usernameLabel:"Magaca Isticmaalaha",registerAccount:"Diiwaan-geli Koontada",alreadyHaveAccount:"Miyaad horey u lahayd koonto?",signIn:"Halkan kaga soo gal",resetPassword:"Beddel Furaha",resetSubtitle:"Waxaan kuu soo diri doonaa tilmaamaha beddelka furaha",sendInstructions:"Soo dir Tilmaamaha",backToSignIn:"Ku laabo Bogga Soo-gelista",suspendedError:"Koontadaada waa la hakiyey. Fadlan la xiriir maamulaha nidaamka.",invalidCredentials:"E-mail ama password khaldan.",emailExists:"E-mail-kaan horay ayaa loo diiwaan geliyey.",profileSettings:"Habaynta Macluumaadka Ganacsadaha",saveChanges:"Keydi Isbeddellada",defaultCurrency:"Lacagta caadiga ah",defaultRisk:"Halista caadiga ah halkii Ganacsi (%)",appPreferences:"Dookhyada Codsiga",colorTheme:"Habka Midabka (Theme)",themeDescription:"U kala beddel muuqaalka madowga ee quruxda badan ama iftiinka nadiifka ah.",themeDark:"U beddel Cadaan",themeLight:"U beddel Madow",notificationsTitle:"Ogeysiisyada Ganacsiga",notificationsDesc:"Hel ogeysiisyada maqalka/desktop-ka marka aad gaarto yoolalka diiwaanka.",dangerZone:"Aagga Halista (Danger Zone)",dangerZoneDesc:"Hawlgalladani waxay si joogto ah u tirtirayaan xogta iyo sawirrada. Dib looma soo celin karo.",resetDatabase:"Tirtir Dhammaan Xogta Diiwaanka",logoutAccount:"Ka Bax Koontada",profileUpdated:"Habaynta profiilka si guul leh ayaa loo keydiyey.",logoutConfirm:"Ma hubtaa inaad rabto inaad ka baxdo?",resetConfirm:"DIGNIIN: Tani waxay si joogto ah u tirtirbaa dhammaan ganacsiyadaada Live-ka iyo Backtest-ka. Dib looma soo celin karo. Ma rabtaa inaad sii waddo?",dbCleared:"Dhammaan xogta diiwaanka si guul leh ayaa loo tirtiray.",winRate:"Heerka Guusha",netPL:"Faa’idada/Khasaaraha",totalTrades:"Ganacsiyada Guud",avgRR:"Celceliska R:R",liveJournalTab:"Diiwaanka Live-ka",backtestJournalTab:"Diiwaanka Tijaabada",performanceOverview:"Guud-mar weyn ee Waxqabadka",recentTrades:"Ganacsiyadii Ugu Dambeeyay",noTradesYet:"Ma jiraan ganacsiyo la duubay weli.",adminDashboard:"Dashboard-ka Maamulka Nidaamka",totalUsers:"Isticmaalayaasha Guud",activeUsers:"Koontooyinka Firfircoon",suspendedUsers:"Koontooyinka La Hakiyeen",totalLogs:"Diiwaanka Ganacsiyada",systemWinRate:"Heerka Guusha Nidaamka",registeredUsers:"Isticmaalayaasha Diiwaan-gashan",addUserBtn:"Ku dar Isticmaale Cusub",colUsername:"Magaca",colEmail:"Email-ka",colRole:"Doorka",colStatus:"Xaaladda",colRegistered:"Taariikhda",colActions:"Tallaabooyinka",btnSuspend:"Haki Koontada",btnActivate:"Daar Koontada",btnMakeAdmin:"Ka dhig Admin",btnDemote:"U beddel User",btnEdit:"Beddel",titleAddNewUser:"Abuur Koonto Isticmaale Cusub",btnSaveUser:"Keydi Isticmaalaha",btnCancel:"Ka Laabo",userCreatedMsg:"Isticmaalaha cusub si guul leh ayaa loo abuuray.",userUpdatedMsg:"Isticmaalaha si guul leh ayaa loo cusbooneysiiyey.",cannotSuspendSelf:"Ma hakin kartid koontadaada admin-nimada ah.",cannotDemoteSelf:"Ma hoos u dhigi kartid doorkaaga admin-nimada ah."}};function y(t){var r,s;const e=localStorage.getItem("trademaster-lang")||"en";return((r=ns[e])==null?void 0:r[t])||((s=ns.en)==null?void 0:s[t])||t}let A={search:"",date:"",session:"All",pair:"All",strategy:"All",result:"All",rr:"All",timeframe:"All",sortBy:"date-desc"};function io(t){const e=x.backtestTrades,r=["All",...new Set(e.map(a=>a.pair).filter(Boolean))],s=["All",...new Set(e.map(a=>a.strategy).filter(Boolean))],n=["All","M1","M5","M15","M30","H1","H4","D1","W1"];oo(),t.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Filters and Header Controls -->
      <div class="card" style="padding: 18px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; flex: 1;">
            <!-- Filter Date -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Date</span>
              <input type="date" id="filter-backtest-date" class="form-control" style="padding: 6px 10px; font-size: 13px; width: 130px; height: 36px;" value="${A.date}">
            </div>

            <!-- Filter Pair -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Pair</span>
              <select id="filter-backtest-pair" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${r.map(a=>`<option value="${a}" ${A.pair===a?"selected":""}>${a}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Session -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Session</span>
              <select id="filter-backtest-session" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${A.session==="All"?"selected":""}>All Sessions</option>
                <option value="Asia" ${A.session==="Asia"?"selected":""}>Asia</option>
                <option value="London" ${A.session==="London"?"selected":""}>London</option>
                <option value="New York" ${A.session==="New York"?"selected":""}>New York</option>
              </select>
            </div>

            <!-- Filter Result -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Result</span>
              <select id="filter-backtest-result" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${A.result==="All"?"selected":""}>All Outcomes</option>
                <option value="Win" ${A.result==="Win"?"selected":""}>Wins</option>
                <option value="Loss" ${A.result==="Loss"?"selected":""}>Losses</option>
                <option value="Break Even" ${A.result==="Break Even"?"selected":""}>Break Evens</option>
              </select>
            </div>

            <!-- Filter Strategy -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Strategy</span>
              <select id="filter-backtest-strategy" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                ${s.map(a=>`<option value="${a}" ${A.strategy===a?"selected":""}>${a}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Timeframe -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Timeframe</span>
              <select id="filter-backtest-timeframe" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${n.map(a=>`<option value="${a}" ${A.timeframe===a?"selected":""}>${a}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Min RR -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">R:R Trigger</span>
              <select id="filter-backtest-rr" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                <option value="All" ${A.rr==="All"?"selected":""}>All R:R</option>
                <option value="1" ${A.rr==="1"?"selected":""}>&ge; 1.0 R:R</option>
                <option value="2" ${A.rr==="2"?"selected":""}>&ge; 2.0 R:R</option>
                <option value="3" ${A.rr==="3"?"selected":""}>&ge; 3.0 R:R</option>
                <option value="4" ${A.rr==="4"?"selected":""}>&ge; 4.0 R:R</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: auto; flex-wrap: wrap;">
            <button class="btn btn-secondary" id="clear-backtest-filters-btn" style="height: 36px; padding: 0 14px;">Reset</button>
            <button class="btn btn-primary" id="add-backtest-btn" style="height: 36px; padding: 0 16px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Backtest
            </button>
          </div>

        </div>

        <!-- Export & Sorting Sub-Bar -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 14px; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" id="export-csv-btn" style="height: 32px; padding: 0 10px; font-size: 11px; text-transform: uppercase;">CSV</button>
            <button class="btn btn-secondary" id="export-excel-btn" style="height: 32px; padding: 0 10px; font-size: 11px; text-transform: uppercase;">Excel</button>
            <button class="btn btn-secondary" id="export-pdf-btn" style="height: 32px; padding: 0 10px; font-size: 11px; text-transform: uppercase;">PDF Report</button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size:12px; color: var(--text-secondary); font-weight:600;">Sort By:</span>
            <select id="filter-backtest-sort" class="form-control" style="padding: 4px 8px; font-size: 12px; width: 120px; height: 32px;">
              <option value="date-desc" ${A.sortBy==="date-desc"?"selected":""}>Newest First</option>
              <option value="date-asc" ${A.sortBy==="date-asc"?"selected":""}>Oldest First</option>
              <option value="rr-desc" ${A.sortBy==="rr-desc"?"selected":""}>Highest R:R</option>
              <option value="rr-asc" ${A.sortBy==="rr-asc"?"selected":""}>Lowest R:R</option>
            </select>
          </div>
        </div>

      </div>

      <!-- Table View -->
      <div class="card" style="padding: 0;">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Session</th>
                <th>Pair</th>
                <th>Buy/Sell</th>
                <th>Risk %</th>
                <th>Target RR</th>
                <th>Result</th>
                <th>Lesson Learned</th>
                <th>Before</th>
                <th>After</th>
                <th style="text-align: right; padding-right: 24px;">Actions</th>
              </tr>
            </thead>
            <tbody id="backtest-table-body">
              <!-- Dynamically rendered -->
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;const i=a=>{A.search=a.detail,Q()};return window.addEventListener("globalSearch",i),document.getElementById("filter-backtest-date").addEventListener("change",a=>{A.date=a.target.value,Q()}),document.getElementById("filter-backtest-pair").addEventListener("change",a=>{A.pair=a.target.value,Q()}),document.getElementById("filter-backtest-session").addEventListener("change",a=>{A.session=a.target.value,Q()}),document.getElementById("filter-backtest-result").addEventListener("change",a=>{A.result=a.target.value,Q()}),document.getElementById("filter-backtest-strategy").addEventListener("change",a=>{A.strategy=a.target.value,Q()}),document.getElementById("filter-backtest-timeframe").addEventListener("change",a=>{A.timeframe=a.target.value,Q()}),document.getElementById("filter-backtest-rr").addEventListener("change",a=>{A.rr=a.target.value,Q()}),document.getElementById("filter-backtest-sort").addEventListener("change",a=>{A.sortBy=a.target.value,Q()}),document.getElementById("clear-backtest-filters-btn").addEventListener("click",()=>{A={search:"",date:"",session:"All",pair:"All",strategy:"All",result:"All",rr:"All",timeframe:"All",sortBy:"date-desc"};const a=document.getElementById("global-search");a&&(a.value=""),document.getElementById("filter-backtest-date").value="",document.getElementById("filter-backtest-pair").value="All",document.getElementById("filter-backtest-session").value="All",document.getElementById("filter-backtest-result").value="All",document.getElementById("filter-backtest-strategy").value="All",document.getElementById("filter-backtest-timeframe").value="All",document.getElementById("filter-backtest-rr").value="All",document.getElementById("filter-backtest-sort").value="date-desc",Q()}),document.getElementById("export-csv-btn").addEventListener("click",()=>lo($t())),document.getElementById("export-excel-btn").addEventListener("click",()=>co($t())),document.getElementById("export-pdf-btn").addEventListener("click",()=>uo($t())),document.getElementById("add-backtest-btn").addEventListener("click",()=>ht()),Q(),()=>{window.removeEventListener("globalSearch",i)}}function $t(){let t=[...x.backtestTrades];if(A.search){const e=A.search.toLowerCase();t=t.filter(r=>r.pair.toLowerCase().includes(e)||r.strategy&&r.strategy.toLowerCase().includes(e)||r.session.toLowerCase().includes(e)||r.result.toLowerCase().includes(e)||r.date.includes(e)||r.notes&&r.notes.toLowerCase().includes(e)||r.timeframe&&r.timeframe.toLowerCase().includes(e))}if(A.date&&(t=t.filter(e=>e.date===A.date)),A.pair!=="All"&&(t=t.filter(e=>e.pair===A.pair)),A.session!=="All"&&(t=t.filter(e=>e.session===A.session)),A.result!=="All"&&(t=t.filter(e=>e.result===A.result)),A.strategy!=="All"&&(t=t.filter(e=>e.strategy===A.strategy)),A.timeframe!=="All"&&(t=t.filter(e=>e.timeframe===A.timeframe)),A.rr!=="All"){const e=parseFloat(A.rr);t=t.filter(r=>(r.target_rr||0)>=e)}return A.sortBy==="date-desc"?t.sort((e,r)=>new Date(r.date)-new Date(e.date)):A.sortBy==="date-asc"?t.sort((e,r)=>new Date(e.date)-new Date(r.date)):A.sortBy==="rr-desc"?t.sort((e,r)=>(r.target_rr||0)-(e.target_rr||0)):A.sortBy==="rr-asc"&&t.sort((e,r)=>(e.target_rr||0)-(r.target_rr||0)),t}function Q(){const t=$t(),e=document.getElementById("backtest-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="11" style="text-align: center; padding: 48px; color: var(--text-muted);">No backtests found. Click "New Backtest" to log one!</td></tr>';return}e.innerHTML=t.map(r=>{const s=r.result==="Win"?"badge-win":r.result==="Loss"?"badge-loss":"badge-be",n=r.direction==="Buy"?"badge-buy":"badge-sell",i=r.before_image?`<img src="${r.before_image}" class="table-img-thumbnail" data-action="view-charts" data-id="${r.id}">`:'<span style="font-size:11px; color:var(--text-muted);">No image</span>',a=r.after_image?`<img src="${r.after_image}" class="table-img-thumbnail" data-action="view-charts" data-id="${r.id}">`:'<span style="font-size:11px; color:var(--text-muted);">No image</span>';return`
      <tr>
        <td style="font-weight: 600;">${r.date}</td>
        <td><span class="badge badge-session ${r.session.toLowerCase().replace(" ","")}">${r.session}</span></td>
        <td style="font-weight: 700; font-size: 14px;">${r.pair} (${r.timeframe||"N/A"})</td>
        <td><span class="badge ${n}">${r.direction}</span></td>
        <td>${r.risk_percent}%</td>
        <td style="font-weight: 600;">${r.target_rr||0}:1</td>
        <td><span class="badge ${s}">${r.result}</span></td>
        <td class="lesson-text-column" title="${r.lesson_learned||""}">${r.lesson_learned||"N/A"}</td>
        <td>${i}</td>
        <td>${a}</td>
        <td>
          <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
            <button class="btn btn-secondary table-action-btn" data-action="view" data-id="${r.id}">View</button>
            <button class="btn btn-secondary table-action-btn" data-action="edit" data-id="${r.id}">Edit</button>
            <button class="btn btn-secondary table-action-btn" data-action="duplicate" data-id="${r.id}">Duplicate</button>
            <button class="btn btn-danger table-action-btn" data-action="delete" data-id="${r.id}" style="padding: 6px 10px; font-size: 12px; height: 28px;">Delete</button>
          </div>
        </td>
      </tr>
    `}).join(""),e.querySelectorAll(".table-action-btn").forEach(r=>{r.addEventListener("click",s=>{const n=r.dataset.action,i=Number(r.dataset.id),a=t.find(o=>o.id===i);if(a)if(n==="view")as(a);else if(n==="edit")ht(a);else if(n==="duplicate"){const o={...a};delete o.id,o.date=new Date().toISOString().split("T")[0],ht(o)}else n==="delete"&&confirm("Are you sure you want to permanently delete this backtesting record?")&&Wt("BacktestingJournal",a.id).then(()=>{x.refreshCache()})})}),e.querySelectorAll(".table-img-thumbnail").forEach(r=>{r.addEventListener("click",()=>{const s=Number(r.dataset.id),n=t.find(i=>i.id===s);n&&as(n)})})}}function ht(t=null){let e=document.getElementById("backtest-modal");e||(e=document.createElement("div"),e.id="backtest-modal",e.className="modal-overlay",document.body.appendChild(e));const r=t&&t.id!==void 0,s=t&&t.id===void 0;e.innerHTML=`
    <div class="modal-container" style="max-width: 750px;">
      <div class="modal-header">
        <h3>${r?"Edit Backtesting Record":s?"Duplicate Backtest":"Log New Backtest"}</h3>
        <button class="modal-close" id="close-backtest-modal-btn">&times;</button>
      </div>
      <form id="backtest-form">
        <div class="modal-body" style="max-height: 75vh; overflow-y: auto; padding: 20px;">
          
          <input type="hidden" id="backtest-id" value="${r?t.id:""}">

          <!-- Section 1: General Info -->
          <h4 class="modal-section-title">General Information</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-date">Date</label>
              <input type="date" id="back-date" class="form-control" required value="${(t==null?void 0:t.date)||new Date().toISOString().split("T")[0]}">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-session">Session</label>
              <select id="back-session" class="form-control">
                <option value="Asia" ${(t==null?void 0:t.session)==="Asia"?"selected":""}>Asia</option>
                <option value="London" ${(t==null?void 0:t.session)==="London"||!t?"selected":""}>London</option>
                <option value="New York" ${(t==null?void 0:t.session)==="New York"?"selected":""}>New York</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-pair">Pair</label>
              <input type="text" id="back-pair" class="form-control" placeholder="e.g. EURUSD" required value="${(t==null?void 0:t.pair)||""}">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-direction">Buy / Sell</label>
              <select id="back-direction" class="form-control">
                <option value="Buy" ${(t==null?void 0:t.direction)==="Buy"?"selected":""}>Buy</option>
                <option value="Sell" ${(t==null?void 0:t.direction)==="Sell"?"selected":""}>Sell</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-strategy">Strategy Name</label>
              <input type="text" id="back-strategy" class="form-control" placeholder="e.g. SMC Order Block" required value="${(t==null?void 0:t.strategy)||""}">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-timeframe">Timeframe</label>
              <select id="back-timeframe" class="form-control">
                <option value="M1" ${(t==null?void 0:t.timeframe)==="M1"?"selected":""}>M1</option>
                <option value="M5" ${(t==null?void 0:t.timeframe)==="M5"?"selected":""}>M5</option>
                <option value="M15" ${(t==null?void 0:t.timeframe)==="M15"||!t?"selected":""}>M15</option>
                <option value="M30" ${(t==null?void 0:t.timeframe)==="M30"?"selected":""}>M30</option>
                <option value="H1" ${(t==null?void 0:t.timeframe)==="H1"?"selected":""}>H1</option>
                <option value="H4" ${(t==null?void 0:t.timeframe)==="H4"?"selected":""}>H4</option>
                <option value="D1" ${(t==null?void 0:t.timeframe)==="D1"?"selected":""}>D1</option>
              </select>
            </div>
          </div>

          <!-- Section 2: Risk Management -->
          <h4 class="modal-section-title">Risk Management</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-risk">Risk %</label>
              <input type="number" id="back-risk" step="0.1" class="form-control" placeholder="1.0" value="${(t==null?void 0:t.risk_percent)??1}">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-target-rr">Target RR</label>
              <input type="number" id="back-target-rr" step="0.01" class="form-control" placeholder="e.g. 3.0" value="${(t==null?void 0:t.target_rr)||""}" required>
            </div>
          </div>

          <!-- Section 3: Trade Result -->
          <h4 class="modal-section-title">Trade Outcome</h4>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="back-result">Result</label>
              <select id="back-result" class="form-control">
                <option value="Win" ${(t==null?void 0:t.result)==="Win"?"selected":""}>Win</option>
                <option value="Loss" ${(t==null?void 0:t.result)==="Loss"?"selected":""}>Loss</option>
                <option value="Break Even" ${(t==null?void 0:t.result)==="Break Even"?"selected":""}>Break Even</option>
              </select>
            </div>
          </div>

          <!-- Section 4: Lessons -->
          <h4 class="modal-section-title">Lessons & Notes</h4>
          <div class="form-group">
            <label class="form-label" for="back-lessons">Lesson Learned</label>
            <textarea id="back-lessons" rows="3" class="form-control" placeholder="What did this trade teach you?" required>${(t==null?void 0:t.lesson_learned)||""}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label" for="back-notes">Trade Notes (Optional)</label>
            <textarea id="back-notes" rows="2" class="form-control" placeholder="Any additional observations...">${(t==null?void 0:t.notes)||""}</textarea>
          </div>

          <!-- Section 5: Drag and Drop Screenshots -->
          <h4 class="modal-section-title">Screenshots</h4>
          <div class="screenshot-dropzone-grid">
            <div class="form-group">
              <label class="form-label">Before Screenshot</label>
              <div class="screenshot-dropzone" id="dropzone-before">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Drag & Drop or Click to Upload</span>
              </div>
              <div class="screenshot-preview-container" id="preview-before" style="display: ${t!=null&&t.before_image?"block":"none"};">
                ${t!=null&&t.before_image?`<img src="${t.before_image}"><button type="button" class="screenshot-remove-btn" id="rm-btn-before">&times;</button>`:""}
              </div>
              <input type="hidden" id="back-before-img" value="${(t==null?void 0:t.before_image)||""}">
            </div>

            <div class="form-group">
              <label class="form-label">After Screenshot</label>
              <div class="screenshot-dropzone" id="dropzone-after">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Drag & Drop or Click to Upload</span>
              </div>
              <div class="screenshot-preview-container" id="preview-after" style="display: ${t!=null&&t.after_image?"block":"none"};">
                ${t!=null&&t.after_image?`<img src="${t.after_image}"><button type="button" class="screenshot-remove-btn" id="rm-btn-after">&times;</button>`:""}
              </div>
              <input type="hidden" id="back-after-img" value="${(t==null?void 0:t.after_image)||""}">
            </div>
          </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" id="cancel-backtest-modal-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Backtest</button>
        </div>
      </form>
    </div>
  `,e.classList.add("active");const n=document.getElementById("back-direction"),i=document.getElementById("back-target-rr"),a=document.getElementById("back-result"),o=()=>e.classList.remove("active");document.getElementById("close-backtest-modal-btn").addEventListener("click",o),document.getElementById("cancel-backtest-modal-btn").addEventListener("click",o),e.addEventListener("click",l=>{l.target===e&&o()}),is("dropzone-before","preview-before","back-before-img","rm-btn-before"),is("dropzone-after","preview-after","back-after-img","rm-btn-after"),document.getElementById("backtest-form").addEventListener("submit",async l=>{l.preventDefault();const c=document.getElementById("backtest-id").value,d=document.getElementById("back-date").value,u=parseFloat(i.value)||0,f=a.value;let h=0;f==="Win"?h=u:f==="Loss"?h=-1:f==="Break Even"&&(h=0);const p={user_id:x.user.email,date:d,session:document.getElementById("back-session").value,pair:document.getElementById("back-pair").value.trim().toUpperCase(),direction:n.value,strategy:document.getElementById("back-strategy").value.trim(),timeframe:document.getElementById("back-timeframe").value,entry_price:null,stop_loss:null,take_profit:null,risk_percent:parseFloat(document.getElementById("back-risk").value||1),target_rr:u,actual_rr:h,result:f,lesson_learned:document.getElementById("back-lessons").value.trim(),notes:document.getElementById("back-notes").value.trim(),before_image:document.getElementById("back-before-img").value||null,after_image:document.getElementById("back-after-img").value||null,updated_at:new Date().toISOString()};c?(p.id=Number(c),p.created_at=t.created_at||new Date().toISOString(),await Ht("BacktestingJournal",p)):(p.created_at=new Date().toISOString(),await ve("BacktestingJournal",p)),o(),x.refreshCache()})}function is(t,e,r,s){const n=document.getElementById(t),i=document.getElementById(e),a=document.getElementById(r),o=document.createElement("input");o.type="file",o.accept="image/*",o.style.display="none",document.body.appendChild(o);const l=d=>{const u=new FileReader;u.onload=f=>{const h=f.target.result;a.value=h,i.style.display="block",i.innerHTML=`
        <img src="${h}">
        <button type="button" class="screenshot-remove-btn" id="${s}">&times;</button>
      `,document.getElementById(s).addEventListener("click",p=>{p.stopPropagation(),a.value="",i.innerHTML="",i.style.display="none"})},u.readAsDataURL(d)};n.addEventListener("click",()=>o.click()),n.addEventListener("dragover",d=>{d.preventDefault(),n.style.borderColor="var(--accent-color)",n.style.background="rgba(59, 130, 246, 0.05)"}),n.addEventListener("dragleave",()=>{n.style.borderColor="var(--border-color)",n.style.background="transparent"}),n.addEventListener("drop",d=>{d.preventDefault(),n.style.borderColor="var(--border-color)",n.style.background="transparent",d.dataTransfer.files.length&&l(d.dataTransfer.files[0])}),o.addEventListener("change",()=>{o.files.length&&l(o.files[0])});const c=document.getElementById(s);c&&c.addEventListener("click",d=>{d.stopPropagation(),a.value="",i.innerHTML="",i.style.display="none"})}function as(t){let e=document.getElementById("trade-drawer-overlay"),r=document.getElementById("trade-drawer-container");if(!e||!r)return;const s=t.direction==="Buy"?"badge-buy":"badge-sell",n=t.result==="Win"?"badge-win":t.result==="Loss"?"badge-loss":"badge-be",i=t.result==="Win"?`+${t.actual_rr}R`:t.result==="Loss"?`-${Math.abs(t.actual_rr)}R`:"0.00R";r.innerHTML=`
    <div class="drawer-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="badge ${s}">${t.direction}</span>
        <h3 style="font-size: 20px; font-weight: 700; font-family: var(--font-heading);">${t.pair} (${t.timeframe||"N/A"})</h3>
      </div>
      <button class="modal-close" id="close-drawer-btn" style="padding: 6px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    
    <div class="drawer-body" style="padding-bottom: 80px;">
      
      <!-- Parameters Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result</span>
          <div style="margin-top: 6px; display: flex; align-items: center; gap: 8px;">
            <span class="badge ${n}">${t.result}</span>
            <span style="font-weight: 700; color: ${t.result==="Win"?"var(--color-win)":t.result==="Loss"?"var(--color-loss)":"var(--color-be)"}">${i}</span>
          </div>
        </div>
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Session</span>
          <div style="margin-top: 6px; font-weight: 600; font-size: 14px;">${t.session}</div>
        </div>
      </div>

      <!-- Detailed Metrics List -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Execution Specs</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Entry Price</span><span style="font-weight: 600; color: var(--text-primary);">${t.entry_price||"N/A"}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Stop Loss</span><span style="font-weight: 600; color: var(--text-primary);">${t.stop_loss||"N/A"}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Take Profit</span><span style="font-weight: 600; color: var(--text-primary);">${t.take_profit||"N/A"}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Risk Percentage</span><span style="font-weight: 600; color: var(--text-primary);">${t.risk_percent}%</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Target R:R</span><span style="font-weight: 600; color: var(--text-primary);">${t.target_rr}:1</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Actual R:R Realized</span><span style="font-weight: 600; color: var(--text-primary);">${t.actual_rr}:1</span></div>
        </div>
      </div>

      <!-- Strategy & Timeframe -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Strategy & Timeframe</h4>
        <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Strategy</span><span style="font-weight: 600; color: var(--text-primary);">${t.strategy||"N/A"}</span></div>
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-top: 8px;"><span style="color: var(--text-secondary);">Timeframe</span><span style="font-weight: 600; color: var(--text-primary);">${t.timeframe||"N/A"}</span></div>
      </div>

      <!-- Psychology & Lessons -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Lessons & Notes</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Lesson Learned</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; font-weight: 500;">${t.lesson_learned||"No lessons recorded."}</div>
          </div>
          <div style="margin-top: 8px;">
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Notes</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${t.notes||"No extra notes logged."}</div>
          </div>
        </div>
      </div>

      <!-- Screenshot Comparison Slider -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Chart Comparison</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">Before Setup</div>
            <div style="border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
              ${t.before_image?`<img src="${t.before_image}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="drawer-comp-img">`:'<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No before image</div>'}
            </div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">After Outcome</div>
            <div style="border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
              ${t.after_image?`<img src="${t.after_image}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="drawer-comp-img">`:'<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No after image</div>'}
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer Control Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
        <button class="btn btn-danger" id="delete-drawer-backtest-btn">Delete</button>
        <button class="btn btn-primary" id="edit-drawer-backtest-btn">Edit</button>
      </div>

    </div>
  `,e.classList.add("active"),r.classList.add("active");const a=()=>{e.classList.remove("active"),r.classList.remove("active")};document.getElementById("close-drawer-btn").addEventListener("click",a),e.addEventListener("click",a),document.getElementById("delete-drawer-backtest-btn").addEventListener("click",()=>{confirm("Are you sure you want to permanently delete this backtest record?")&&Wt("BacktestingJournal",t.id).then(()=>{a(),x.refreshCache()})}),document.getElementById("edit-drawer-backtest-btn").addEventListener("click",()=>{a(),ht(t)}),r.querySelectorAll(".drawer-comp-img").forEach(o=>{o.addEventListener("click",()=>{ao(t)})})}function ao(t){const e=document.createElement("div");e.className="modal-overlay active",e.style.zIndex="2000",e.innerHTML=`
    <div class="modal-container" style="max-width: 900px; padding:0; background: #000; border-color: rgba(255,255,255,0.1);">
      <div class="modal-header" style="background:#0f131a; border-bottom:1px solid rgba(255,255,255,0.1)">
        <h3>Before & After Comparison: ${t.pair}</h3>
        <button class="modal-close" id="close-lightbox-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; gap:16px;">
        <div class="slider-overlay-body">
          <div class="comparison-slider-container" id="backtest-slider-container">
            <img src="${t.before_image||""}" class="slider-image slider-image-before">
            <div class="slider-image-after" id="backtest-slider-after-container">
              <img src="${t.after_image||""}" class="slider-image" style="width: 800px; max-width: none;">
            </div>
            <div class="slider-handle" id="backtest-slider-handle">
              <div class="slider-handle-button">↔</div>
            </div>
            <span class="slider-label slider-label-before">BEFORE (SETUP)</span>
            <span class="slider-label slider-label-after">AFTER (OUTCOME)</span>
          </div>
        </div>
        <div style="color: #94a3b8; font-size:13px; text-align:center;">
          Drag the center handle left/right to compare trade execution setup with the actual outcome.
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const r=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),250)};e.querySelector("#close-lightbox-btn").addEventListener("click",r),e.addEventListener("click",c=>{c.target===e&&r()});const s=e.querySelector("#backtest-slider-container"),n=e.querySelector("#backtest-slider-after-container"),i=e.querySelector("#backtest-slider-handle"),a=n.querySelector("img");let o=!1;const l=c=>{const d=s.getBoundingClientRect();let u=c-d.left;u<0&&(u=0),u>d.width&&(u=d.width);const f=u/d.width*100;n.style.width=`${f}%`,i.style.left=`${f}%`,a.style.width=`${d.width}px`};setTimeout(()=>{const c=s.getBoundingClientRect();a.style.width=`${c.width}px`},100),i.addEventListener("mousedown",()=>o=!0),window.addEventListener("mouseup",()=>o=!1),window.addEventListener("mousemove",c=>{o&&l(c.clientX)}),i.addEventListener("touchstart",()=>o=!0),window.addEventListener("touchend",()=>o=!1),window.addEventListener("touchmove",c=>{o&&l(c.touches[0].clientX)})}function oo(){if(document.getElementById("backtest-custom-styles"))return;const t=document.createElement("style");t.id="backtest-custom-styles",t.innerHTML=`
    .filter-label-text {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
    }
    .table-img-thumbnail {
      width: 48px;
      height: 28px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid var(--border-color);
      cursor: pointer;
      transition: transform var(--transition-fast), border-color var(--transition-fast);
      background: #000;
    }
    .table-img-thumbnail:hover {
      transform: scale(1.1);
      border-color: var(--accent-color);
    }
    .lesson-text-column {
      color: var(--text-secondary);
      max-width: 160px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
    }
    .modal-section-title {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--accent-color);
      margin: 18px 0 10px 0;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 6px;
    }
    .screenshot-dropzone-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 10px;
    }
    @media (max-width: 600px) {
      .screenshot-dropzone-grid {
        grid-template-columns: 1fr;
      }
    }
    .screenshot-dropzone {
      border: 2px dashed var(--border-color);
      border-radius: var(--border-radius-md);
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      cursor: pointer;
      color: var(--text-muted);
      font-size: 12px;
      font-weight: 600;
      transition: all var(--transition-normal);
      text-align: center;
      min-height: 100px;
    }
    .screenshot-dropzone:hover {
      border-color: var(--accent-color);
      color: var(--text-primary);
      background: rgba(59, 130, 246, 0.02);
    }
    .screenshot-dropzone svg {
      width: 24px;
      height: 24px;
      stroke: var(--text-muted);
    }
    .screenshot-preview-container {
      position: relative;
      margin-top: 10px;
      border-radius: var(--border-radius-md);
      overflow: hidden;
      border: 1px solid var(--border-color);
      aspect-ratio: 16/9;
      background: #000;
    }
    .screenshot-preview-container img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    .screenshot-remove-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(239, 68, 68, 0.9);
      color: #fff;
      border: none;
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background var(--transition-fast);
      z-index: 10;
    }
    .screenshot-remove-btn:hover {
      background: var(--color-loss-hover);
    }
  `,document.head.appendChild(t)}function lo(t){if(t.length===0){alert("No data available to export.");return}const e=["Date","Session","Pair","Direction","Strategy","Timeframe","Entry Price","Stop Loss","Take Profit","Risk %","Target R:R","Actual R:R","Result","Lesson Learned","Notes"],r=t.map(o=>[o.date,o.session,o.pair,o.direction,`"${(o.strategy||"").replace(/"/g,'""')}"`,o.timeframe||"",o.entry_price,o.stop_loss,o.take_profit,o.risk_percent,o.target_rr,o.actual_rr,o.result,`"${(o.lesson_learned||"").replace(/"/g,'""')}"`,`"${(o.notes||"").replace(/"/g,'""')}"`]),s=[e.join(","),...r.map(o=>o.join(","))].join(`
`),n=new Blob([s],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(n),a=document.createElement("a");a.setAttribute("href",i),a.setAttribute("download",`trademaster_backtests_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(a),a.click(),document.body.removeChild(a)}function co(t){if(t.length===0){alert("No data available to export.");return}let e='<table border="1" style="font-family: sans-serif; border-collapse: collapse;">';e+='<tr style="background-color: #3b82f6; color: #ffffff; font-weight: bold;">',e+="<td>Date</td><td>Session</td><td>Pair</td><td>Direction</td><td>Strategy</td><td>Timeframe</td><td>Entry Price</td><td>Stop Loss</td><td>Take Profit</td><td>Risk %</td><td>Target RR</td><td>Actual RR</td><td>Result</td><td>Lesson Learned</td><td>Notes</td>",e+="</tr>",t.forEach(i=>{e+=`<tr>
      <td>${i.date}</td>
      <td>${i.session}</td>
      <td>${i.pair}</td>
      <td>${i.direction}</td>
      <td>${i.strategy||""}</td>
      <td>${i.timeframe||""}</td>
      <td>${i.entry_price}</td>
      <td>${i.stop_loss}</td>
      <td>${i.take_profit}</td>
      <td>${i.risk_percent}</td>
      <td>${i.target_rr}</td>
      <td>${i.actual_rr}</td>
      <td>${i.result}</td>
      <td>${i.lesson_learned||""}</td>
      <td>${i.notes||""}</td>
    </tr>`}),e+="</table>";const r=new Blob([e],{type:"application/vnd.ms-excel"}),s=URL.createObjectURL(r),n=document.createElement("a");n.setAttribute("href",s),n.setAttribute("download",`trademaster_backtests_${new Date().toISOString().split("T")[0]}.xls`),document.body.appendChild(n),n.click(),document.body.removeChild(n)}function uo(t){if(t.length===0){alert("No data available to export.");return}const e=window.open("","_blank","width=900,height=700");let r=`
    <html>
      <head>
        <title>TradeMaster Backtesting Report</title>
        <style>
          body { font-family: 'Outfit', sans-serif; background-color: #ffffff; color: #0f172a; padding: 30px; }
          h2 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: bold; color: #1e293b; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .badge { padding: 3px 8px; border-radius: 12px; font-size: 10px; font-weight: bold; text-transform: uppercase; display: inline-block; }
          .badge-win { background-color: #d1fae5; color: #065f46; }
          .badge-loss { background-color: #fee2e2; color: #991b1b; }
          .badge-be { background-color: #fef3c7; color: #92400e; }
          .badge-buy { background-color: #dbeafe; color: #1e40af; }
          .badge-sell { background-color: #fce7f3; color: #9d174d; }
          .summary-card { display: inline-block; padding: 12px 20px; background-color: #f1f5f9; border-radius: 8px; margin-right: 15px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
          .summary-card-val { font-size: 18px; font-weight: bold; color: #2563eb; }
          .summary-card-lbl { font-size: 10px; text-transform: uppercase; color: #64748b; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>TradeMaster Backtesting Analytics Report</h2>
        <div style="margin-bottom: 10px;">
          <div class="summary-card"><div class="summary-card-val">${t.length}</div><div class="summary-card-lbl">Total Backtests</div></div>
          <div class="summary-card"><div class="summary-card-val">${(t.filter(s=>s.result==="Win").length/t.length*100).toFixed(1)}%</div><div class="summary-card-lbl">Win Rate</div></div>
          <div class="summary-card"><div class="summary-card-val">${t.reduce((s,n)=>s+(n.actual_rr||0),0).toFixed(2)} R</div><div class="summary-card-lbl">Realized R</div></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Session</th>
              <th>Pair</th>
              <th>Direction</th>
              <th>Strategy</th>
              <th>TF</th>
              <th>Risk %</th>
              <th>Target RR</th>
              <th>Actual RR</th>
              <th>Result</th>
              <th>Lesson Learned</th>
            </tr>
          </thead>
          <tbody>
  `;t.forEach(s=>{const n=s.result==="Win"?"badge-win":s.result==="Loss"?"badge-loss":"badge-be",i=s.direction==="Buy"?"badge-buy":"badge-sell";r+=`
      <tr>
        <td>${s.date}</td>
        <td>${s.session}</td>
        <td>${s.pair}</td>
        <td><span class="badge ${i}">${s.direction}</span></td>
        <td>${s.strategy||""}</td>
        <td>${s.timeframe||""}</td>
        <td>${s.risk_percent}%</td>
        <td>${s.target_rr}:1</td>
        <td>${s.actual_rr}:1</td>
        <td><span class="badge ${n}">${s.result}</span></td>
        <td>${s.lesson_learned||""}</td>
      </tr>
    `}),r+=`
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            window.close();
          }
        <\/script>
      </body>
    </html>
  `,e.document.write(r),e.document.close()}let tr=null,rr=null;function ho(t){const e=x.activeDashboardTab,r=e==="live"?x.tradingTrades:x.backtestTrades,s=fo(r);t.innerHTML=`
    <!-- Dashboard Header Nav Tabs -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${e==="live"?"btn-primary":"btn-secondary"}" id="tab-live-btn" style="padding: 8px 16px; font-size: 13px;">Live Trading</button>
        <button class="btn ${e==="backtest"?"btn-primary":"btn-secondary"}" id="tab-backtest-btn" style="padding: 8px 16px; font-size: 13px;">Backtesting</button>
      </div>
      <div>
        <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Data Status: <span style="color: var(--color-win)">● Sync Complete</span></span>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-card-label">${e==="live"?"Total Trades":"Total Backtests"}</div>
        <div class="metric-card-value">${s.total}</div>
        <div class="metric-card-sub">Active Journal</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Win Rate</div>
        <div class="metric-card-value" style="color: var(--color-win);">${s.winRate}%</div>
        <div class="metric-card-sub">Target: &gt;50%</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Avg. Risk Reward</div>
        <div class="metric-card-value">${s.avgRR}:1</div>
        <div class="metric-card-sub">Ratio per trade</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Profit Factor</div>
        <div class="metric-card-value" style="color: ${s.profitFactor>=1.5?"var(--color-win)":"var(--text-primary)"}">${s.profitFactor}</div>
        <div class="metric-card-sub">Gross Win / Loss</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Realized R-Multiple</div>
        <div class="metric-card-value" style="color: ${s.netR>=0?"var(--color-win)":"var(--color-loss)"}">${s.netR>0?"+":""}${s.netR} R</div>
        <div class="metric-card-sub">Growth return</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Max Drawdown</div>
        <div class="metric-card-value" style="color: var(--color-loss);">${s.maxDrawdown}%</div>
        <div class="metric-card-sub">Peak to trough decline</div>
      </div>
    </div>

    <!-- Secondary Metrics row -->
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); margin-bottom: 32px;">
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Win Streak</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-win);">${s.winStreak} Wins</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Loss Streak</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-loss);">${s.lossStreak} Losses</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Avg. Risk</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--text-primary);">${s.avgRisk}%</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Best Pair</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--accent-secondary);">${s.bestPair}</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Best Session</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--accent-color);">${s.bestSession}</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Loss Rate</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-loss);">${s.lossRate}%</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Break Even Rate</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-be);">${s.beRate}%</div>
      </div>
    </div>

    <!-- Charts Area -->
    <div class="charts-grid">
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Equity Growth Curve (R-multiple cumulative)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="equityCurveChart"></canvas>
        </div>
      </div>
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Session & Performance Distribution
          </div>
        </div>
        <div class="chart-container">
          <canvas id="sessionDistChart"></canvas>
        </div>
      </div>
    </div>

    <!-- Recent Trades Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><list x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          Recent Activity Logs
        </div>
        <button class="btn btn-secondary" id="view-all-journal-btn" style="padding: 6px 12px; font-size: 12px;">Go to Journal</button>
      </div>
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Pair</th>
              <th>Type</th>
              <th>Session</th>
              <th>Result</th>
              <th>R-Realized</th>
              <th>Strategy</th>
              <th>Setup</th>
            </tr>
          </thead>
          <tbody id="recent-trades-body">
            <!-- Populated by script -->
          </tbody>
        </table>
      </div>
    </div>
  `,document.getElementById("tab-live-btn").addEventListener("click",()=>{x.setDashboardTab("live")}),document.getElementById("tab-backtest-btn").addEventListener("click",()=>{x.setDashboardTab("backtest")}),document.getElementById("view-all-journal-btn").addEventListener("click",()=>{x.setView(e==="live"?"journal":"backtesting")});const n=document.getElementById("recent-trades-body"),i=[...r].sort((a,o)=>new Date(o.date)-new Date(a.date)).slice(0,5);i.length===0?n.innerHTML=`<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">No trades logged yet. Click 'New Trade' to get started!</td></tr>`:(n.innerHTML=i.map(a=>{const o=e==="backtest",l=a.result==="Win"?"badge-win":a.result==="Loss"?"badge-loss":"badge-be",c=o?a.direction:a.type,d=c==="Buy"?"badge-buy":"badge-sell",u=o?a.target_rr||0:a.rr||0,f=o?a.actual_rr!==void 0?a.actual_rr.toFixed(2):a.result==="Win"?u:a.result==="Loss"?-1:0:a.result==="Win"?a.rr:a.result==="Loss"?-1:0,h=a.result==="Win"?`+${f}`:f,p=o?a.timeframe||"N/A":a.setup||"N/A";return`
        <tr style="cursor: pointer;" class="recent-trade-row" data-id="${a.id}">
          <td>${a.date}</td>
          <td style="font-weight: 700;">${a.pair}</td>
          <td><span class="badge ${d}">${c}</span></td>
          <td><span class="badge badge-session ${a.session.toLowerCase().replace(" ","")}">${a.session}</span></td>
          <td><span class="badge ${l}">${a.result}</span></td>
          <td style="font-weight: 600; color: ${a.result==="Win"?"var(--color-win)":a.result==="Loss"?"var(--color-loss)":"var(--color-be)"}">${h}R</td>
          <td>${a.strategy||"N/A"}</td>
          <td style="color: var(--text-muted); font-size: 13px;">${p}</td>
        </tr>
      `}).join(""),document.querySelectorAll(".recent-trade-row").forEach(a=>{a.addEventListener("click",()=>{const o=a.dataset.id,l=r.find(c=>c.id===Number(o));l&&(e==="backtest"?ht(l):Vt(l,e))})})),po(r,s.equityData)}function fo(t){const e=t.length;if(e===0)return{total:0,winRate:0,lossRate:0,beRate:0,avgRR:"0.00",profitFactor:"0.00",netR:"0.00",maxDrawdown:0,winStreak:0,lossStreak:0,bestPair:"N/A",bestSession:"N/A",avgRisk:"0.00",equityData:[]};const r=t.map(E=>{const D=E.target_rr!==void 0||E.actual_rr!==void 0,Oe=D?E.target_rr||0:E.rr||0,gt=D&&E.actual_rr!==void 0?E.actual_rr:E.result==="Win"?Oe:E.result==="Loss"?-1:0,mt=D?E.risk_percent||0:E.riskPercent||0,yt=D?E.direction||"":E.type||"";return{...E,targetRR:Oe,actualRR:gt,riskPercent:mt,direction:yt}}),s=r.filter(E=>E.result==="Win"),n=r.filter(E=>E.result==="Loss"),i=r.filter(E=>E.result==="Break Even"),a=(s.length/e*100).toFixed(1),o=(n.length/e*100).toFixed(1),l=(i.length/e*100).toFixed(1),c=(r.reduce((E,D)=>E+D.targetRR,0)/e).toFixed(2),d=(r.reduce((E,D)=>E+D.riskPercent,0)/e).toFixed(2);let u=0,f=[0],h=0,p=0;const g=[...r].sort((E,D)=>new Date(E.date)-new Date(D.date));g.forEach(E=>{u+=E.actualRR,f.push(u),u>h&&(h=u);const D=h-u;D>p&&(p=D)});const m=s.reduce((E,D)=>E+D.actualRR,0),b=n.reduce((E,D)=>E+Math.abs(D.actualRR),0),k=b>0?(m/b).toFixed(2):m.toFixed(2);let v=0,S=0,O=0,$=0;g.forEach(E=>{E.result==="Win"?(S++,$=0,S>v&&(v=S)):E.result==="Loss"?($++,S=0,$>O&&(O=$)):(S=0,$=0)});const C={};r.forEach(E=>{C[E.pair]=(C[E.pair]||0)+E.actualRR});let X="N/A",q=-1/0;Object.keys(C).forEach(E=>{C[E]>q&&(q=C[E],X=E)});const be={};r.forEach(E=>{be[E.session]=(be[E.session]||0)+E.actualRR});let pt="N/A",Ge=-1/0;return Object.keys(be).forEach(E=>{be[E]>Ge&&(Ge=be[E],pt=E)}),{total:e,winRate:a,lossRate:o,beRate:l,avgRR:c,profitFactor:k,netR:u.toFixed(2),maxDrawdown:p.toFixed(1),winStreak:v,lossStreak:O,bestPair:X,bestSession:pt,avgRisk:d,equityData:f}}function po(t,e){var d,u;const r=(d=document.getElementById("equityCurveChart"))==null?void 0:d.getContext("2d"),s=(u=document.getElementById("sessionDistChart"))==null?void 0:u.getContext("2d");if(!r||!s)return;tr&&tr.destroy(),rr&&rr.destroy();const n=document.body.classList.contains("light-theme"),i=n?"rgba(0, 0, 0, 0.05)":"rgba(255, 255, 255, 0.05)",a=n?"#475569":"#94a3b8",o=e.map((f,h)=>`T${h}`),l=r.createLinearGradient(0,0,0,300);l.addColorStop(0,"rgba(59, 130, 246, 0.3)"),l.addColorStop(1,"rgba(59, 130, 246, 0.0)"),tr=new Chart(r,{type:"line",data:{labels:o,datasets:[{label:"Cumulative R",data:e,borderColor:"#3b82f6",borderWidth:3,pointBackgroundColor:"#3b82f6",pointHoverRadius:6,fill:!0,backgroundColor:l,tension:.3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{color:i},ticks:{color:a,font:{family:"Plus Jakarta Sans"}}},y:{grid:{color:i},ticks:{color:a,font:{family:"Plus Jakarta Sans"}}}}}});const c={Asia:0,London:0,"New York":0};t.forEach(f=>{c[f.session]!==void 0&&c[f.session]++}),rr=new Chart(s,{type:"doughnut",data:{labels:["Asia","London","New York"],datasets:[{data:[c.Asia,c.London,c["New York"]],backgroundColor:["#8b5cf6","#3b82f6","#ec4899"],borderWidth:0,hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:a,font:{family:"Plus Jakarta Sans",size:12},padding:16}}},cutout:"70%"}})}let I={search:"",pair:"All",session:"All",result:"All",strategy:"All",sortBy:"date-desc"};function go(t,e="live"){const r=e==="live"?x.tradingTrades:x.backtestTrades,s=e==="live"?"TradingJournal":"BacktestingJournal",n=["All",...new Set(r.map(l=>l.pair))],i=["All",...new Set(r.map(l=>l.strategy).filter(Boolean))];t.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Filters and Header Controls -->
      <div class="card" style="padding: 18px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; flex: 1;">
            <!-- Filter Pair -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Pair</span>
              <select id="filter-pair" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${n.map(l=>`<option value="${l}" ${I.pair===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Session -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Session</span>
              <select id="filter-session" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${I.session==="All"?"selected":""}>All Sessions</option>
                <option value="Asia" ${I.session==="Asia"?"selected":""}>Asia</option>
                <option value="London" ${I.session==="London"?"selected":""}>London</option>
                <option value="New York" ${I.session==="New York"?"selected":""}>New York</option>
              </select>
            </div>

            <!-- Filter Result -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result</span>
              <select id="filter-result" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${I.result==="All"?"selected":""}>All Outcomes</option>
                <option value="Win" ${I.result==="Win"?"selected":""}>Wins</option>
                <option value="Loss" ${I.result==="Loss"?"selected":""}>Losses</option>
                <option value="Break Even" ${I.result==="Break Even"?"selected":""}>Break Evens</option>
              </select>
            </div>

            <!-- Filter Strategy -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Strategy</span>
              <select id="filter-strategy" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                ${i.map(l=>`<option value="${l}" ${I.strategy===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>

            <!-- Sort By -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Sort By</span>
              <select id="filter-sort" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                <option value="date-desc" ${I.sortBy==="date-desc"?"selected":""}>Newest First</option>
                <option value="date-asc" ${I.sortBy==="date-asc"?"selected":""}>Oldest First</option>
                <option value="rr-desc" ${I.sortBy==="rr-desc"?"selected":""}>Highest R:R</option>
                <option value="rr-asc" ${I.sortBy==="rr-asc"?"selected":""}>Lowest R:R</option>
              </select>
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-top: auto;">
            <button class="btn btn-secondary" id="clear-filters-btn" style="height: 36px; padding: 0 14px;">Reset</button>
            <button class="btn btn-primary" id="add-trade-journal-btn" style="height: 36px; padding: 0 16px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Record
            </button>
          </div>

        </div>
      </div>

      <!-- Table View -->
      <div class="card" style="padding: 0;">
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th>Date / Day</th>
                <th>Pair</th>
                <th>Direction</th>
                <th>Session</th>
                <th>Result</th>
                <th>Target RR</th>
                <th>Risk %</th>
                <th>Strategy</th>
                <th>Setup</th>
              </tr>
            </thead>
            <tbody id="journal-table-body">
              <!-- Dynamically rendered -->
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;function a(){let l=[...r];if(I.search){const d=I.search;l=l.filter(u=>u.pair.toLowerCase().includes(d)||u.strategy&&u.strategy.toLowerCase().includes(d)||u.session.toLowerCase().includes(d)||u.result.toLowerCase().includes(d)||u.date.includes(d)||u.notes&&u.notes.toLowerCase().includes(d))}I.pair!=="All"&&(l=l.filter(d=>d.pair===I.pair)),I.session!=="All"&&(l=l.filter(d=>d.session===I.session)),I.result!=="All"&&(l=l.filter(d=>d.result===I.result)),I.strategy!=="All"&&(l=l.filter(d=>d.strategy===I.strategy)),I.sortBy==="date-desc"?l.sort((d,u)=>new Date(u.date)-new Date(d.date)):I.sortBy==="date-asc"?l.sort((d,u)=>new Date(d.date)-new Date(u.date)):I.sortBy==="rr-desc"?l.sort((d,u)=>u.rr-d.rr):I.sortBy==="rr-asc"&&l.sort((d,u)=>d.rr-u.rr);const c=document.getElementById("journal-table-body");if(l.length===0){c.innerHTML='<tr><td colspan="9" style="text-align: center; padding: 48px; color: var(--text-muted);">No records found matching current criteria.</td></tr>';return}c.innerHTML=l.map(d=>{const u=d.result==="Win"?"badge-win":d.result==="Loss"?"badge-loss":"badge-be",f=d.type==="Buy"?"badge-buy":"badge-sell";return`
        <tr class="journal-row" data-id="${d.id}" style="cursor: pointer;">
          <td>
            <div style="font-weight: 600; color: var(--text-primary);">${d.date}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${d.day}</div>
          </td>
          <td style="font-weight: 700; font-size: 15px;">${d.pair}</td>
          <td><span class="badge ${f}">${d.type}</span></td>
          <td><span class="badge badge-session ${d.session.toLowerCase().replace(" ","")}">${d.session}</span></td>
          <td><span class="badge ${u}">${d.result}</span></td>
          <td style="font-weight: 600;">${d.rr}:1</td>
          <td>${d.riskPercent}%</td>
          <td>${d.strategy||"N/A"}</td>
          <td style="color: var(--text-secondary); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${d.setup||"N/A"}</td>
        </tr>
      `}).join(""),document.querySelectorAll(".journal-row").forEach(d=>{d.addEventListener("click",()=>{const u=Number(d.dataset.id),f=r.find(h=>h.id===u);f&&mo(f,s,e)})})}const o=l=>{I.search=l.detail,a()};return window.addEventListener("globalSearch",o),document.getElementById("filter-pair").addEventListener("change",l=>{I.pair=l.target.value,a()}),document.getElementById("filter-session").addEventListener("change",l=>{I.session=l.target.value,a()}),document.getElementById("filter-result").addEventListener("change",l=>{I.result=l.target.value,a()}),document.getElementById("filter-strategy").addEventListener("change",l=>{I.strategy=l.target.value,a()}),document.getElementById("filter-sort").addEventListener("change",l=>{I.sortBy=l.target.value,a()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{I={search:"",pair:"All",session:"All",result:"All",strategy:"All",sortBy:"date-desc"};const l=document.getElementById("global-search");l&&(l.value=""),document.getElementById("filter-pair").value="All",document.getElementById("filter-session").value="All",document.getElementById("filter-result").value="All",document.getElementById("filter-strategy").value="All",document.getElementById("filter-sort").value="date-desc",a()}),document.getElementById("add-trade-journal-btn").addEventListener("click",()=>{Vt(null,e)}),a(),()=>{window.removeEventListener("globalSearch",o)}}function mo(t,e,r){const s=document.getElementById("trade-drawer-overlay"),n=document.getElementById("trade-drawer-container"),i=t.type==="Buy"?"badge-buy":"badge-sell",a=t.result==="Win"?"badge-win":t.result==="Loss"?"badge-loss":"badge-be",o=t.result==="Win"?`+${t.rr}R`:t.result==="Loss"?"-1.00R":"0.00R";n.innerHTML=`
    <div class="drawer-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="badge ${i}">${t.type}</span>
        <h3 style="font-size: 20px; font-weight: 700; font-family: var(--font-heading);">${t.pair}</h3>
      </div>
      <button class="modal-close" id="close-drawer-btn" style="padding: 6px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    
    <div class="drawer-body">
      
      <!-- Parameters Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result Code</span>
          <div style="margin-top: 6px; display: flex; align-items: center; gap: 8px;">
            <span class="badge ${a}">${t.result}</span>
            <span style="font-weight: 700; color: ${t.result==="Win"?"var(--color-win)":t.result==="Loss"?"var(--color-loss)":"var(--color-be)"}">${o}</span>
          </div>
        </div>
        <div class="card" style="padding: 14px; background: var(--bg-tertiary);">
          <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Session / Day</span>
          <div style="margin-top: 6px; font-weight: 600; font-size: 14px;">${t.session} - ${t.day}</div>
        </div>
      </div>

      <!-- Detailed Metrics List -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Execution Specs</h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Entry Price</span><span style="font-weight: 600; color: var(--text-primary);">${t.entryPrice}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Stop Loss</span><span style="font-weight: 600; color: var(--text-primary);">${t.stopLoss}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Take Profit</span><span style="font-weight: 600; color: var(--text-primary);">${t.takeProfit}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Risk Percentage</span><span style="font-weight: 600; color: var(--text-primary);">${t.riskPercent}%</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Risk-to-Reward</span><span style="font-weight: 600; color: var(--text-primary);">${t.rr}:1</span></div>
        </div>
      </div>

      <!-- Checklist confirmations -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Checklist</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${t.checklist&&t.checklist.length>0?t.checklist.map(c=>`<span class="badge badge-win" style="font-size: 10px;">✓ ${c}</span>`).join(""):'<span style="font-size: 12px; color: var(--text-muted);">No items checked.</span>'}
        </div>
      </div>

      <!-- Psychology & Lessons -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Psychology & Analysis</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Emotion</div>
            <div style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${t.emotion||"Disciplined"}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Mistake logged</div>
            <div style="font-size: 13px; font-weight: 600; color: ${t.mistakes==="None"?"var(--color-win)":"var(--color-loss)"}">${t.mistakes||"None"}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Lesson Learned</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${t.lessonLearned||"No lesson logged."}</div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Notes</div>
            <div style="font-size: 13px; color: var(--text-secondary); line-height: 1.4;">${t.notes||"No notes."}</div>
          </div>
        </div>
      </div>

      <!-- Screenshot Comparison Slider -->
      <div class="card" style="margin-bottom: 24px; padding: 18px;">
        <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Chart Comparison</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">Before Setup</div>
            <div style="border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
              ${t.beforeScreenshot?`<img src="${t.beforeScreenshot}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="details-chart-img">`:'<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No screenshot uploaded</div>'}
            </div>
          </div>
          <div>
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 6px; font-weight: 700; text-transform: uppercase;">After Outcome</div>
            <div style="border-radius: var(--border-radius-md); overflow: hidden; border: 1px solid var(--border-color); aspect-ratio: 16/9; background: #000;">
              ${t.afterScreenshot?`<img src="${t.afterScreenshot}" style="width:100%; height:100%; object-fit:contain; cursor:pointer;" class="details-chart-img">`:'<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No screenshot uploaded</div>'}
            </div>
          </div>
        </div>
      </div>

      <!-- Drawer Control Buttons -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px;">
        <button class="btn btn-danger" id="delete-trade-btn">Delete Trade</button>
        <button class="btn btn-primary" id="edit-trade-btn">Edit Trade</button>
      </div>

    </div>
  `,s.classList.add("active"),n.classList.add("active");const l=()=>{s.classList.remove("active"),n.classList.remove("active")};document.getElementById("close-drawer-btn").addEventListener("click",l),s.addEventListener("click",l),document.getElementById("delete-trade-btn").addEventListener("click",async()=>{confirm("Are you sure you want to delete this trade record permanently?")&&(await Wt(e,t.id),l(),x.refreshCache())}),document.getElementById("edit-trade-btn").addEventListener("click",()=>{l(),Vt(t,r)}),document.querySelectorAll(".details-chart-img").forEach(c=>{c.addEventListener("click",()=>{yo(t)})})}function yo(t){const e=document.createElement("div");e.className="modal-overlay active",e.style.zIndex="2000",e.innerHTML=`
    <div class="modal-container" style="max-width: 900px; padding:0; background: #000; border-color: rgba(255,255,255,0.1);">
      <div class="modal-header" style="background:#0f131a; border-bottom:1px solid rgba(255,255,255,0.1)">
        <h3>Before & After Comparison: ${t.pair}</h3>
        <button class="modal-close" id="close-viewer-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; gap:16px;">
        <div class="slider-overlay-body">
          <div class="comparison-slider-container" id="fullscreen-slider-container">
            <!-- Background: Before image -->
            <img src="${t.beforeScreenshot||""}" class="slider-image slider-image-before">
            
            <!-- Foreground: After image container (clipped width) -->
            <div class="slider-image-after" id="slider-after-container">
              <img src="${t.afterScreenshot||""}" class="slider-image" style="width: 800px; max-width: none;">
            </div>

            <!-- Slide handle divider line -->
            <div class="slider-handle" id="slider-handle">
              <div class="slider-handle-button">↔</div>
            </div>

            <span class="slider-label slider-label-before">BEFORE (SETUP)</span>
            <span class="slider-label slider-label-after">AFTER (OUTCOME)</span>
          </div>
        </div>
        <div style="color: #94a3b8; font-size:13px; text-align:center;">
          Drag the center handle left/right to compare trade execution setup with the actual outcome.
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const r=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),250)};e.querySelector("#close-viewer-btn").addEventListener("click",r),e.addEventListener("click",c=>{c.target===e&&r()});const s=e.querySelector("#fullscreen-slider-container"),n=e.querySelector("#slider-after-container"),i=e.querySelector("#slider-handle"),a=n.querySelector("img");let o=!1;const l=c=>{const d=s.getBoundingClientRect();let u=c-d.left;u<0&&(u=0),u>d.width&&(u=d.width);const f=u/d.width*100;n.style.width=`${f}%`,i.style.left=`${f}%`,a.style.width=`${d.width}px`};setTimeout(()=>{const c=s.getBoundingClientRect();a.style.width=`${c.width}px`},100),i.addEventListener("mousedown",()=>o=!0),window.addEventListener("mouseup",()=>o=!1),window.addEventListener("mousemove",c=>{o&&l(c.clientX)}),i.addEventListener("touchstart",()=>o=!0),window.addEventListener("touchend",()=>o=!1),window.addEventListener("touchmove",c=>{o&&l(c.touches[0].clientX)})}let we=new Date,ne="all";function Ae(t){let e=[];(ne==="all"||ne==="live")&&(e=e.concat(x.tradingTrades.map(d=>({...d,source:"live"})))),(ne==="all"||ne==="backtest")&&(e=e.concat(x.backtestTrades.map(d=>({...d,source:"backtest"}))));const r=we.getFullYear(),s=we.getMonth(),n=we.toLocaleDateString("en-US",{month:"long"}),i=new Date(r,s,1).getDay(),a=i===0?6:i-1,o=new Date(r,s+1,0).getDate();let l="";for(let d=0;d<a;d++)l+='<div class="calendar-day empty"></div>';const c=new Date().toISOString().split("T")[0];for(let d=1;d<=o;d++){const u=String(d).padStart(2,"0"),f=String(s+1).padStart(2,"0"),h=`${r}-${f}-${u}`,p=e.filter(O=>O.date===h),g=p.filter(O=>O.result==="Win").length,m=p.filter(O=>O.result==="Loss").length,b=p.filter(O=>O.result==="Break Even").length,k=c===h,v=p.length>0;let S="";g>0&&(S+=`<div class="calendar-day-badge win"><span>Wins</span><span>${g}</span></div>`),m>0&&(S+=`<div class="calendar-day-badge loss"><span>Loss</span><span>${m}</span></div>`),b>0&&(S+=`<div class="calendar-day-badge be"><span>BE</span><span>${b}</span></div>`),l+=`
      <div class="calendar-day ${k?"today":""}" data-date="${h}" style="${v?"border-color: rgba(59, 130, 246, 0.3);":""}">
        <span class="calendar-day-num">${d}</span>
        <div class="calendar-day-stats">
          ${S}
        </div>
      </div>
    `}t.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Calendar Controls Header -->
      <div class="card" style="padding: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          
          <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
            <button class="btn ${ne==="all"?"btn-primary":"btn-secondary"}" id="cal-src-all" style="padding: 6px 12px; font-size: 12px;">All Trades</button>
            <button class="btn ${ne==="live"?"btn-primary":"btn-secondary"}" id="cal-src-live" style="padding: 6px 12px; font-size: 12px;">Live Only</button>
            <button class="btn ${ne==="backtest"?"btn-primary":"btn-secondary"}" id="cal-src-backtest" style="padding: 6px 12px; font-size: 12px;">Backtest Only</button>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <button class="btn btn-secondary btn-icon" id="cal-prev-month-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span class="calendar-month-year">${n} ${r}</span>
            <button class="btn btn-secondary btn-icon" id="cal-next-month-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div>
            <button class="btn btn-primary" id="cal-today-btn" style="padding: 8px 16px; font-size: 13px;">Today</button>
          </div>

        </div>
      </div>

      <!-- Calendar Board -->
      <div class="card" style="padding: 24px;">
        <div class="calendar-grid">
          <!-- Weekday Headers -->
          <div class="calendar-day-header">Mon</div>
          <div class="calendar-day-header">Tue</div>
          <div class="calendar-day-header">Wed</div>
          <div class="calendar-day-header">Thu</div>
          <div class="calendar-day-header">Fri</div>
          <div class="calendar-day-header">Sat</div>
          <div class="calendar-day-header">Sun</div>

          ${l}
        </div>
      </div>

    </div>
  `,document.getElementById("cal-prev-month-btn").addEventListener("click",()=>{we.setMonth(we.getMonth()-1),Ae(t)}),document.getElementById("cal-next-month-btn").addEventListener("click",()=>{we.setMonth(we.getMonth()+1),Ae(t)}),document.getElementById("cal-today-btn").addEventListener("click",()=>{we=new Date,Ae(t)}),document.getElementById("cal-src-all").addEventListener("click",()=>{ne="all",Ae(t)}),document.getElementById("cal-src-live").addEventListener("click",()=>{ne="live",Ae(t)}),document.getElementById("cal-src-backtest").addEventListener("click",()=>{ne="backtest",Ae(t)}),document.querySelectorAll(".calendar-day:not(.empty)").forEach(d=>{d.addEventListener("click",()=>{const u=d.dataset.date,f=e.filter(h=>h.date===u);f.length>0&&vo(u,f)})})}function vo(t,e){const r=document.createElement("div");r.className="modal-overlay active",r.style.zIndex="1500",r.innerHTML=`
    <div class="modal-container" style="max-width: 550px;">
      <div class="modal-header">
        <h3>Trades on ${t}</h3>
        <button class="modal-close" id="close-cal-overlay-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="modal-body" style="padding: 20px; display: flex; flex-direction: column; gap: 12px; max-height: 400px; overflow-y: auto;">
        ${e.map(n=>{const i=n.type==="Buy"?"badge-buy":"badge-sell",a=n.result==="Win"?"badge-win":n.result==="Loss"?"badge-loss":"badge-be",o=n.source==="live";return`
            <div class="card cal-trade-item" data-id="${n.id}" data-source="${n.source}" style="padding: 16px; background: var(--bg-tertiary); cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-color: ${o?"rgba(59,130,246,0.1)":"rgba(236,72,153,0.1)"}">
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="badge ${i}" style="padding: 2px 6px; font-size: 9px;">${n.type}</span>
                  <span style="font-weight: 700; color: var(--text-primary); font-size: 14px;">${n.pair}</span>
                  <span style="font-size: 10px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">(${n.source.toUpperCase()})</span>
                </div>
                <div style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">
                  Session: ${n.session} | Strategy: ${n.strategy||"N/A"}
                </div>
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">
                <span class="badge ${a}">${n.result}</span>
                <span style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${n.result==="Win"?`+${n.rr}`:n.result==="Loss"?"-1.00":"0.00"}R</span>
              </div>
            </div>
          `}).join("")}
      </div>
      <div class="modal-footer" style="padding: 12px 20px;">
        <button class="btn btn-secondary" id="close-cal-overlay-ok">Close</button>
      </div>
    </div>
  `,document.body.appendChild(r);const s=()=>{r.classList.remove("active"),setTimeout(()=>r.remove(),250)};r.querySelector("#close-cal-overlay-btn").addEventListener("click",s),r.querySelector("#close-cal-overlay-ok").addEventListener("click",s),r.addEventListener("click",n=>{n.target===r&&s()}),r.querySelectorAll(".cal-trade-item").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.id),a=n.dataset.source;(a==="live"?x.tradingTrades:x.backtestTrades).find(l=>l.id===i),s(),x.setView(a==="live"?"journal":"backtesting"),setTimeout(()=>{const l=document.querySelector(`.journal-row[data-id="${i}"]`);l&&l.click()},300)})})}let ie={};function bo(t){const e=x.activeDashboardTab,r=e==="live"?x.tradingTrades:x.backtestTrades;t.innerHTML=`
    <!-- Tab Controls -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${e==="live"?"btn-primary":"btn-secondary"}" id="analy-tab-live" style="padding: 8px 16px; font-size: 13px;">Live Trading Analytics</button>
        <button class="btn ${e==="backtest"?"btn-primary":"btn-secondary"}" id="analy-tab-backtest" style="padding: 8px 16px; font-size: 13px;">Backtesting Analytics</button>
      </div>
      <div>
        <span style="font-size: 13px; color: var(--text-muted); font-weight: 500;">Period: <strong style="color:var(--text-primary);">All-Time</strong></span>
      </div>
    </div>

    <!-- Analytics Charts Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(450px, 1fr)); gap: 24px;">
      
      <!-- 1. Equity Curve & Drawdown -->
      <div class="card chart-panel" style="grid-column: span 2;">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Equity Curve & Realized Drawdown (R-multiple)
          </div>
        </div>
        <div class="chart-container" style="min-height: 320px;">
          <canvas id="analy-equity-chart"></canvas>
        </div>
      </div>

      <!-- 2. Win Rate Distribution -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/></svg>
            Outcome Distribution
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-winrate-chart"></canvas>
        </div>
      </div>

      <!-- 3. Session Success Rate -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Session Performance (Average R realization)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-session-chart"></canvas>
        </div>
      </div>

      <!-- 4. Pair Profitability -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Pair Profitability (Net R Realized)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-pair-chart"></canvas>
        </div>
      </div>

      <!-- 5. Strategy Success Rate -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            Strategy Win Rates & Volume
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-strategy-chart"></canvas>
        </div>
      </div>

      <!-- 6. Monthly Growth -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
            Monthly Growth Progress (R Total)
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-monthly-chart"></canvas>
        </div>
      </div>

      <!-- 7. Risk-to-Reward Distribution -->
      <div class="card chart-panel">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            Target Risk-to-Reward Scatter Plot
          </div>
        </div>
        <div class="chart-container">
          <canvas id="analy-rr-chart"></canvas>
        </div>
      </div>

    </div>
  `,document.getElementById("analy-tab-live").addEventListener("click",()=>{x.setDashboardTab("live")}),document.getElementById("analy-tab-backtest").addEventListener("click",()=>{x.setDashboardTab("backtest")}),setTimeout(()=>wo(r),50)}function wo(t){var E,D,Oe,gt,mt,yt,br;if(Object.keys(ie).forEach(T=>{ie[T]&&ie[T].destroy()}),t.length===0)return;const e=document.body.classList.contains("light-theme"),r=e?"rgba(0, 0, 0, 0.05)":"rgba(255, 255, 255, 0.05)",s=e?"#475569":"#94a3b8",n=[...t].sort((T,G)=>new Date(T.date)-new Date(G.date)),i=[0],a=[0];let o=0,l=0;n.forEach(T=>{const G=T.result==="Win"?T.rr:T.result==="Loss"?-1:0;o+=G,i.push(o),o>l&&(l=o);const Kt=l-o;a.push(-Kt)});const c=(E=document.getElementById("analy-equity-chart"))==null?void 0:E.getContext("2d");c&&(ie.equity=new Chart(c,{type:"line",data:{labels:i.map((T,G)=>`T${G}`),datasets:[{label:"Cumulative Realized R",data:i,borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.08)",borderWidth:3,fill:!0,tension:.25},{label:"Drawdown curve (R)",data:a,borderColor:"#ef4444",backgroundColor:"rgba(239, 68, 68, 0.05)",borderWidth:1.5,fill:!0,tension:.25}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:r},ticks:{color:s}},y:{grid:{color:r},ticks:{color:s}}},plugins:{legend:{labels:{color:s}}}}}));const d={Win:0,Loss:0,BE:0};t.forEach(T=>{T.result==="Win"?d.Win++:T.result==="Loss"?d.Loss++:d.BE++});const u=(D=document.getElementById("analy-winrate-chart"))==null?void 0:D.getContext("2d");u&&(ie.winrate=new Chart(u,{type:"doughnut",data:{labels:["Win","Loss","Break Even"],datasets:[{data:[d.Win,d.Loss,d.BE],backgroundColor:["#10b981","#ef4444","#f59e0b"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:s}}}}}));const f={Asia:{r:0,count:0},London:{r:0,count:0},"New York":{r:0,count:0}};t.forEach(T=>{const G=T.result==="Win"?T.rr:T.result==="Loss"?-1:0;f[T.session]&&(f[T.session].r+=G,f[T.session].count++)});const h=Object.keys(f).map(T=>f[T].count>0?(f[T].r/f[T].count).toFixed(2):0),p=(Oe=document.getElementById("analy-session-chart"))==null?void 0:Oe.getContext("2d");p&&(ie.session=new Chart(p,{type:"bar",data:{labels:["Asia","London","New York"],datasets:[{label:"Avg R Realized",data:h,backgroundColor:["rgba(139, 92, 246, 0.7)","rgba(59, 130, 246, 0.7)","rgba(236, 72, 153, 0.7)"],borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:r},ticks:{color:s}},y:{grid:{color:r},ticks:{color:s}}},plugins:{legend:{display:!1}}}}));const g={};t.forEach(T=>{const G=T.result==="Win"?T.rr:T.result==="Loss"?-1:0;g[T.pair]=(g[T.pair]||0)+G});const m=Object.keys(g),b=Object.values(g),k=(gt=document.getElementById("analy-pair-chart"))==null?void 0:gt.getContext("2d");k&&(ie.pair=new Chart(k,{type:"bar",data:{labels:m,datasets:[{label:"Net R-multiple",data:b,backgroundColor:b.map(T=>T>=0?"rgba(16, 185, 129, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:r},ticks:{color:s}},y:{grid:{color:r},ticks:{color:s}}},plugins:{legend:{display:!1}}}}));const v={};t.forEach(T=>{T.strategy&&(v[T.strategy]||(v[T.strategy]={win:0,loss:0,be:0,total:0}),v[T.strategy].total++,T.result==="Win"?v[T.strategy].win++:T.result==="Loss"?v[T.strategy].loss++:v[T.strategy].be++)});const S=Object.keys(v),O=S.map(T=>(v[T].win/v[T].total*100).toFixed(1)),$=(mt=document.getElementById("analy-strategy-chart"))==null?void 0:mt.getContext("2d");$&&(ie.strategy=new Chart($,{type:"bar",data:{labels:S,datasets:[{label:"Win Rate %",data:O,backgroundColor:"rgba(16, 185, 129, 0.75)",borderColor:"#10b981",borderWidth:1,borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:r},ticks:{color:s}},y:{min:0,max:100,grid:{color:r},ticks:{color:s}}},plugins:{legend:{display:!1}}}}));const C={};t.forEach(T=>{const G=T.date.substring(0,7),Kt=T.result==="Win"?T.rr:T.result==="Loss"?-1:0;C[G]=(C[G]||0)+Kt});const X=Object.keys(C).sort(),q=X.map(T=>C[T]),be=(yt=document.getElementById("analy-monthly-chart"))==null?void 0:yt.getContext("2d");be&&(ie.monthly=new Chart(be,{type:"line",data:{labels:X,datasets:[{label:"Growth (R)",data:q,borderColor:"#0ea5e9",backgroundColor:"rgba(14, 165, 233, 0.1)",fill:!0,tension:.2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:r},ticks:{color:s}},y:{grid:{color:r},ticks:{color:s}}},plugins:{legend:{display:!1}}}}));const pt=t.map(T=>({x:T.riskPercent,y:T.rr})),Ge=(br=document.getElementById("analy-rr-chart"))==null?void 0:br.getContext("2d");Ge&&(ie.rr=new Chart(Ge,{type:"scatter",data:{datasets:[{label:"Target R:R / Risk %",data:pt,backgroundColor:"#3b82f6",pointRadius:6,pointHoverRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{title:{display:!0,text:"Risk %",color:s},grid:{color:r},ticks:{color:s}},y:{title:{display:!0,text:"Target RR",color:s},grid:{color:r},ticks:{color:s}}},plugins:{legend:{display:!1}}}}))}let Ye="live",Te="All";function Ct(t){let s=(Ye==="live"?x.tradingTrades:x.backtestTrades).map(i=>{const a=i.before_image!==void 0||i.after_image!==void 0;return{id:i.id,pair:i.pair,date:i.date,session:i.session,result:i.result,direction:a?i.direction:i.type,targetRR:a?i.target_rr||0:i.rr||0,lessonLearned:a?i.lesson_learned||"":i.lessonLearned||"",beforeImage:a?i.before_image:i.beforeScreenshot,afterImage:a?i.after_image:i.afterScreenshot}}).filter(i=>i.beforeImage||i.afterImage);Te!=="All"&&(s=s.filter(i=>i.result===Te)),t.innerHTML=`
    <!-- Gallery Controls Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${Ye==="live"?"btn-primary":"btn-secondary"}" id="gal-btn-live" style="padding: 8px 16px; font-size: 13px;">Trading Screenshots</button>
        <button class="btn ${Ye==="backtest"?"btn-primary":"btn-secondary"}" id="gal-btn-backtest" style="padding: 8px 16px; font-size: 13px;">Backtesting Screenshots</button>
      </div>

      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result Filter</span>
        <select id="gal-filter-outcome" class="form-control" style="padding: 6px 12px; font-size: 13px; width: 140px; height: 34px;">
          <option value="All" ${Te==="All"?"selected":""}>All Screenshots</option>
          <option value="Win" ${Te==="Win"?"selected":""}>Wins Only</option>
          <option value="Loss" ${Te==="Loss"?"selected":""}>Losses Only</option>
          <option value="Break Even" ${Te==="Break Even"?"selected":""}>Break Evens Only</option>
        </select>
      </div>

    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid" id="screenshot-gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <!-- Populated by script -->
    </div>
  `;const n=document.getElementById("screenshot-gallery-grid");s.length===0?n.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 64px 0; color: var(--text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <p style="font-weight: 600; font-size:15px; color: var(--text-primary);">No screenshots found</p>
        <p style="font-size: 13px; margin-top: 4px;">Upload Before/After charts when logging trades to populate your gallery.</p>
      </div>
    `:(n.innerHTML=s.map(i=>{const a=i.direction==="Buy"?"badge-buy":"badge-sell",o=i.result==="Win"?"badge-win":i.result==="Loss"?"badge-loss":"badge-be";return`
        <div class="gallery-card" data-id="${i.id}" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); display: flex; flex-direction: column;">
          <!-- Card Header -->
          <div style="padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.01);">
            <div>
              <span style="font-size: 15px; font-weight: 700; color: var(--text-primary);">${i.pair}</span>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">${i.date} (${i.session})</div>
            </div>
            <span class="badge ${o}">${i.result}</span>
          </div>

          <!-- Stacked Images Area -->
          <div style="padding: 12px; display: flex; flex-direction: column; align-items: center; gap: 8px; background: rgba(0,0,0,0.15);">
            <!-- Before Image -->
            <div class="gallery-image-viewport" style="width: 100%; aspect-ratio: 16/9; position: relative; border-radius: var(--border-radius-sm); overflow: hidden; border: 1px solid var(--border-color); background: #000;">
              ${i.beforeImage?`<img src="${i.beforeImage}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" class="gallery-trigger-img" data-id="${i.id}">`:'<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No Before Image</div>'}
              <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.05em; border: 1px solid rgba(255,255,255,0.1);">BEFORE SETUP</div>
            </div>

            <!-- Separator Arrow -->
            <div style="display: flex; align-items: center; justify-content: center; width: 26px; height: 26px; border-radius: 50%; background: var(--bg-tertiary); border: 1px solid var(--border-color); color: var(--accent-color); font-size: 13px; font-weight: bold; z-index: 2; margin: -4px 0;">
              ↓
            </div>

            <!-- After Image -->
            <div class="gallery-image-viewport" style="width: 100%; aspect-ratio: 16/9; position: relative; border-radius: var(--border-radius-sm); overflow: hidden; border: 1px solid var(--border-color); background: #000;">
              ${i.afterImage?`<img src="${i.afterImage}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" class="gallery-trigger-img" data-id="${i.id}">`:'<div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-muted); font-size:12px;">No After Image</div>'}
              <div style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); color: #fff; font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.05em; border: 1px solid rgba(255,255,255,0.1);">AFTER OUTCOME</div>
            </div>
          </div>

          <!-- Summary Area -->
          <div class="gallery-card-content" style="padding: 16px; border-top: 1px solid var(--border-color); flex-grow: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span class="badge ${a}">${i.direction}</span>
                <span style="font-size: 13px; font-weight: 600; color: var(--text-secondary);">RR Realized: <strong style="color: var(--text-primary); font-size: 14px;">${i.targetRR}:1</strong></span>
              </div>
              <div style="font-size: 10px; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 0.03em;">Lesson Learned</div>
              <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.4; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; height: 54px;" title="${i.lessonLearned||""}">
                ${i.lessonLearned||"No lesson recorded."}
              </p>
            </div>
            <button class="btn btn-secondary compare-trigger-btn" data-id="${i.id}" style="width: 100%; margin-top: 14px; height: 32px; font-size: 12px;">Compare Charts Slider</button>
          </div>
        </div>
      `}).join(""),n.querySelectorAll(".gallery-trigger-img").forEach(i=>{i.addEventListener("click",()=>{const a=Number(i.dataset.id),o=s.find(l=>l.id===a);o&&os(o)})}),n.querySelectorAll(".compare-trigger-btn").forEach(i=>{i.addEventListener("click",()=>{const a=Number(i.dataset.id),o=s.find(l=>l.id===a);o&&os(o)})})),document.getElementById("gal-btn-live").addEventListener("click",()=>{Ye="live",Ct(t)}),document.getElementById("gal-btn-backtest").addEventListener("click",()=>{Ye="backtest",Ct(t)}),document.getElementById("gal-filter-outcome").addEventListener("change",i=>{Te=i.target.value,Ct(t)})}function os(t){const e=document.createElement("div");e.className="modal-overlay active",e.style.zIndex="2000",e.innerHTML=`
    <div class="modal-container" style="max-width: 900px; padding:0; background: #000; border-color: rgba(255,255,255,0.1);">
      <div class="modal-header" style="background:#0f131a; border-bottom:1px solid rgba(255,255,255,0.1)">
        <h3>Before & After Comparison: ${t.pair}</h3>
        <button class="modal-close" id="close-gal-viewer-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; gap:16px;">
        <div class="slider-overlay-body">
          <div class="comparison-slider-container" id="gal-slider-container">
            <img src="${t.beforeImage||""}" class="slider-image slider-image-before">
            <div class="slider-image-after" id="gal-slider-after-container">
              <img src="${t.afterImage||""}" class="slider-image" style="width: 800px; max-width: none;">
            </div>
            <div class="slider-handle" id="gal-slider-handle">
              <div class="slider-handle-button">↔</div>
            </div>
            <span class="slider-label slider-label-before">BEFORE (SETUP)</span>
            <span class="slider-label slider-label-after">AFTER (OUTCOME)</span>
          </div>
        </div>
        <div style="color: #94a3b8; font-size:13px; text-align:center;">
          Drag the center handle left/right to compare trade execution setup with the actual outcome.
        </div>
      </div>
    </div>
  `,document.body.appendChild(e);const r=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),250)};e.querySelector("#close-gal-viewer-btn").addEventListener("click",r),e.addEventListener("click",c=>{c.target===e&&r()});const s=e.querySelector("#gal-slider-container"),n=e.querySelector("#gal-slider-after-container"),i=e.querySelector("#gal-slider-handle"),a=n.querySelector("img");let o=!1;const l=c=>{const d=s.getBoundingClientRect();let u=c-d.left;u<0&&(u=0),u>d.width&&(u=d.width);const f=u/d.width*100;n.style.width=`${f}%`,i.style.left=`${f}%`,a.style.width=`${d.width}px`};setTimeout(()=>{const c=s.getBoundingClientRect();a.style.width=`${c.width}px`},100),i.addEventListener("mousedown",()=>o=!0),window.addEventListener("mouseup",()=>o=!1),window.addEventListener("mousemove",c=>{o&&l(c.clientX)}),i.addEventListener("touchstart",()=>o=!0),window.addEventListener("touchend",()=>o=!1),window.addEventListener("touchmove",c=>{o&&l(c.touches[0].clientX)})}let Y="monthly",me="live";function he(t){var i;const e=me==="live"?x.tradingTrades:x.backtestTrades,r=ko(e,Y),s=xo(r),n=_o(Y);t.innerHTML=`
    <div class="reports-layout">
      
      <!-- Report Controls Sidebar -->
      <div class="report-controls">
        
        <!-- Target Journal -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Journal Source</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label class="checkbox-label" style="margin-bottom:0;">
              <input type="radio" name="report-src" value="live" ${me==="live"?"checked":""} id="src-live">
              <span>Live Trading Journal</span>
            </label>
            <label class="checkbox-label" style="margin-bottom:0;">
              <input type="radio" name="report-src" value="backtest" ${me==="backtest"?"checked":""} id="src-back">
              <span>Backtesting Journal</span>
            </label>
          </div>
        </div>

        <!-- Frequency select -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Report Range</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn ${Y==="daily"?"btn-primary":"btn-secondary"}" id="btn-rep-daily" style="justify-content: flex-start;">Daily Report</button>
            <button class="btn ${Y==="weekly"?"btn-primary":"btn-secondary"}" id="btn-rep-weekly" style="justify-content: flex-start;">Weekly Report</button>
            <button class="btn ${Y==="monthly"?"btn-primary":"btn-secondary"}" id="btn-rep-monthly" style="justify-content: flex-start;">Monthly Report</button>
            <button class="btn ${Y==="yearly"?"btn-primary":"btn-secondary"}" id="btn-rep-yearly" style="justify-content: flex-start;">Yearly Report</button>
          </div>
        </div>

        <!-- Exports Panel -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Export Document</h4>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="btn btn-secondary" id="export-pdf-btn" style="width:100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
              Print / Save PDF
            </button>
            <button class="btn btn-secondary" id="export-csv-btn" style="width:100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              Export CSV
            </button>
            <button class="btn btn-secondary" id="export-excel-btn" style="width:100%;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Export Excel (.xls)
            </button>
          </div>
        </div>

      </div>

      <!-- Report Viewport Paper Preview -->
      <div class="report-preview-container">
        <div class="report-preview-paper" id="printable-report-area">
          <div class="report-header">
            <div class="report-header-left">
              <h3>TradeMaster</h3>
              <p>Forex Performance Audit Report</p>
            </div>
            <div class="report-header-right">
              <div style="font-weight: 700; font-size: 15px;">Range: ${n}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Logged: ${((i=x.user)==null?void 0:i.username)||"Trader"}</div>
            </div>
          </div>

          <!-- Summary Block Cards -->
          <div class="report-summary-block">
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Total Trades</span>
              <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${s.total}</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Win Rate</span>
              <div style="font-size: 20px; font-weight: 700; color: var(--color-win); margin-top: 4px;">${s.winRate}%</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Net R realized</span>
              <div style="font-size: 20px; font-weight: 700; color: ${s.netR>=0?"var(--color-win)":"var(--color-loss)"}; margin-top: 4px;">${s.netR>0?"+":""}${s.netR}R</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Profit Factor</span>
              <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${s.profitFactor}</div>
            </div>
          </div>

          <!-- Secondary Metrics -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
            <div style="font-size: 12px; color: var(--text-secondary);">Wins: <strong style="color:var(--color-win);">${s.wins}</strong></div>
            <div style="font-size: 12px; color: var(--text-secondary);">Losses: <strong style="color:var(--color-loss);">${s.losses}</strong></div>
            <div style="font-size: 12px; color: var(--text-secondary);">Break Evens: <strong style="color:var(--color-be);">${s.bes}</strong></div>
          </div>

          <!-- Trades List Table -->
          <div class="report-table-section">
            <h4 style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;">Audited Logs</h4>
            <div class="table-container" style="border: none;">
              <table class="table" style="width: 100%;">
                <thead>
                  <tr style="background: var(--bg-primary);">
                    <th>Date</th>
                    <th>Pair</th>
                    <th>Direction</th>
                    <th>Session</th>
                    <th>Result</th>
                    <th>RR</th>
                    <th>Risk %</th>
                    <th>Strategy</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.length===0?'<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">No records found in this range.</td></tr>':r.map(a=>{const o=a.type||a.direction||"N/A",l=o==="Buy"?"badge-buy":"badge-sell",c=a.result==="Win"?"badge-win":a.result==="Loss"?"badge-loss":"badge-be",d=a.rr??a.target_rr??a.actual_rr??0,u=a.riskPercent??a.risk_percent??0;return`
                          <tr>
                            <td>${a.date}</td>
                            <td style="font-weight: 700;">${a.pair}</td>
                            <td><span class="badge ${l}">${o}</span></td>
                            <td><span class="badge badge-session ${a.session.toLowerCase().replace(" ","")}">${a.session}</span></td>
                            <td><span class="badge ${c}">${a.result}</span></td>
                            <td style="font-weight:600;">${d}:1</td>
                            <td>${u}%</td>
                            <td style="font-size:12px; color:var(--text-muted);">${a.strategy||"N/A"}</td>
                          </tr>
                        `}).join("")}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Signature Footer -->
          <div style="margin-top: 60px; border-top: 1px solid var(--border-color); padding-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
            <span>Generated via TradeMaster Audit API</span>
            <span>Signature: Verified Account Holder</span>
          </div>

        </div>
      </div>

    </div>
  `,document.getElementById("src-live").addEventListener("change",()=>{me="live",he(t)}),document.getElementById("src-live").parentElement.addEventListener("click",()=>{me="live",he(t)}),document.getElementById("src-back").addEventListener("change",()=>{me="backtest",he(t)}),document.getElementById("src-back").parentElement.addEventListener("click",()=>{me="backtest",he(t)}),document.getElementById("btn-rep-daily").addEventListener("click",()=>{Y="daily",he(t)}),document.getElementById("btn-rep-weekly").addEventListener("click",()=>{Y="weekly",he(t)}),document.getElementById("btn-rep-monthly").addEventListener("click",()=>{Y="monthly",he(t)}),document.getElementById("btn-rep-yearly").addEventListener("click",()=>{Y="yearly",he(t)}),document.getElementById("export-pdf-btn").addEventListener("click",()=>{window.print()}),document.getElementById("export-csv-btn").addEventListener("click",()=>{So(r)}),document.getElementById("export-excel-btn").addEventListener("click",()=>{Eo(r,n)})}function ko(t,e){const r=[...t].sort((i,a)=>new Date(a.date)-new Date(i.date));if(r.length===0)return[];const s=new Date(r[0].date),n=24*60*60*1e3;return r.filter(i=>{const a=new Date(i.date),o=Math.ceil(Math.abs(s-a)/n);return e==="daily"?o<=1:e==="weekly"?o<=7:e==="monthly"?o<=30:e==="yearly"?o<=365:!0})}function xo(t){const e=t.length;if(e===0)return{total:0,winRate:0,netR:0,profitFactor:"0.00",wins:0,losses:0,bes:0};const r=t.filter(c=>c.result==="Win").length,s=t.filter(c=>c.result==="Loss").length,n=t.filter(c=>c.result==="Break Even").length,i=(r/e*100).toFixed(1);let a=0;t.forEach(c=>{const d=c.rr??c.target_rr??c.actual_rr??0;c.result==="Win"?a+=d:c.result==="Loss"&&(a-=1)});const o=t.filter(c=>c.result==="Win").reduce((c,d)=>c+(d.rr??d.target_rr??d.actual_rr??0),0),l=s>0?(o/s).toFixed(2):o.toFixed(2);return{total:e,winRate:i,netR:a.toFixed(2),profitFactor:l,wins:r,losses:s,bes:n}}function _o(t){const e=new Date;return t==="daily"?e.toISOString().split("T")[0]:t==="weekly"?`${new Date(e.getTime()-6048e5).toISOString().split("T")[0]} to ${e.toISOString().split("T")[0]}`:t==="monthly"?e.toLocaleString("en-US",{month:"long",year:"numeric"}):t==="yearly"?`Year ${e.getFullYear()}`:"All Time"}function So(t,e){const r=["Date","Day","Pair","Direction","Session","Result","RR","Risk %","Strategy","Emotion","Mistake","Lesson","Notes"],s=t.map(l=>{const c=l.rr??l.target_rr??l.actual_rr??0,d=l.riskPercent??l.risk_percent??0,u=l.type||l.direction||"",f=l.day||"";return[l.date,f,l.pair,u,l.session,l.result,c,d,`"${(l.strategy||"").replace(/"/g,'""')}"`,l.emotion||"",l.mistakes||"",`"${(l.lessonLearned||"").replace(/"/g,'""')}"`,`"${(l.notes||"").replace(/"/g,'""')}"`]}),n=[r.join(","),...s.map(l=>l.join(","))].join(`
`),i=new Blob([n],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(i),o=document.createElement("a");o.setAttribute("href",a),o.setAttribute("download",`trademaster_${me}_report_${Y}.csv`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)}function Eo(t,e){let r=t.map(o=>`
    <tr>
      <td>${o.date}</td>
      <td>${o.day}</td>
      <td>${o.pair}</td>
      <td>${o.type}</td>
      <td>${o.session}</td>
      <td>${o.result}</td>
      <td>${o.rr}</td>
      <td>${o.riskPercent}</td>
      <td>${o.strategy||""}</td>
      <td>${o.emotion||""}</td>
      <td>${o.mistakes||""}</td>
      <td>${o.lessonLearned||""}</td>
      <td>${o.notes||""}</td>
    </tr>
  `).join("");const s=`
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>TradeMaster Report</x:Name>
              <x:WorksheetOptions>
                <x:DisplayGridlines/>
              </x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        table { border-collapse: collapse; }
        th { background-color: #3b82f6; color: white; font-weight: bold; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      </style>
    </head>
    <body>
      <h2>TradeMaster Performance Audit - ${e}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Pair</th>
            <th>Direction</th>
            <th>Session</th>
            <th>Result</th>
            <th>RR</th>
            <th>Risk %</th>
            <th>Strategy</th>
            <th>Emotion</th>
            <th>Mistakes</th>
            <th>Lesson Learned</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${r}
        </tbody>
      </table>
    </body>
    </html>
  `,n=new Blob([s],{type:"application/vnd.ms-excel"}),i=URL.createObjectURL(n),a=document.createElement("a");a.setAttribute("href",i),a.setAttribute("download",`trademaster_${me}_report_${Y}.xls`),a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)}function zs(t){const e=x.user||{username:"AlexTrader",email:"alex.forex@master.com",currency:"USD",riskDefault:1,notifications:!0,role:"user"},r=document.body.classList.contains("light-theme");t.innerHTML=`
    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Profile settings -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${y("profileSettings")}
          </div>
        </div>
        <form id="settings-profile-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-fullname">Full Name</label>
              <input type="text" id="set-fullname" class="form-control" value="${e.fullName||""}" placeholder="e.g. Alex Sterling">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-username">${y("usernameLabel")}</label>
              <input type="text" id="set-username" class="form-control" value="${e.username}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="set-email">${y("emailLabel")}</label>
              <input type="email" id="set-email" class="form-control" value="${e.email}" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-currency">${y("defaultCurrency")}</label>
              <select id="set-currency" class="form-control">
                <option value="USD" ${e.currency==="USD"?"selected":""}>USD ($)</option>
                <option value="EUR" ${e.currency==="EUR"?"selected":""}>EUR (€)</option>
                <option value="GBP" ${e.currency==="GBP"?"selected":""}>GBP (£)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="set-risk">${y("defaultRisk")}</label>
              <input type="number" id="set-risk" step="0.1" class="form-control" value="${e.riskDefault}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">${y("colRole")}</label>
              <input type="text" class="form-control" value="${(e.role||"user").toUpperCase()}" readonly style="opacity: 0.7; cursor: not-allowed; background: var(--bg-primary);">
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
            <button type="submit" class="btn btn-primary">${y("saveChanges")}</button>
          </div>
        </form>
      </div>

      <!-- App preferences -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            ${y("appPreferences")}
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Theme Switcher -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
            <div>
              <div style="font-weight: 600; font-size: 14px;">${y("colorTheme")}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${y("themeDescription")}</div>
            </div>
            <button class="btn btn-secondary" id="theme-toggle-btn" style="padding: 8px 16px; font-size:13px;">
              ${y(r?"themeDark":"themeLight")}
            </button>
          </div>

          <!-- Notification Toggles -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: 14px;">${y("notificationsTitle")}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${y("notificationsDesc")}</div>
            </div>
            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="notification-toggle" ${e.notifications?"checked":""} style="width: 20px; height: 20px;">
            </label>
          </div>
        </div>
      </div>

      <!-- Account Management / Actions -->
      <div class="card" style="border-color: rgba(239, 68, 68, 0.2);">
        <div class="card-header">
          <div class="card-title" style="color: var(--color-loss);">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            ${y("dangerZone")}
          </div>
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">
          ${y("dangerZoneDesc")}
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <button class="btn btn-warning" id="supabase-test-btn" style="background: #f59e0b; border-color: #f59e0b; color: #ffffff;">Test Supabase Connection</button>
          <button class="btn btn-danger" id="clear-database-btn">${y("resetDatabase")}</button>
          <button class="btn btn-secondary" id="logout-btn" style="border-color: var(--color-loss); color: var(--color-loss);">${y("logoutAccount")}</button>
        </div>
      </div>

    </div>
  `,document.getElementById("settings-profile-form").addEventListener("submit",n=>{n.preventDefault();const i={username:document.getElementById("set-username").value,email:document.getElementById("set-email").value,fullName:document.getElementById("set-fullname").value,currency:document.getElementById("set-currency").value,riskDefault:parseFloat(document.getElementById("set-risk").value||1)};x.updateProfile(i),alert(y("profileUpdated"))}),document.getElementById("theme-toggle-btn").addEventListener("click",()=>{document.body.classList.contains("light-theme")?(document.body.classList.remove("light-theme"),localStorage.setItem("trademaster-theme","dark")):(document.body.classList.add("light-theme"),localStorage.setItem("trademaster-theme","light")),zs(t)}),document.getElementById("notification-toggle").addEventListener("change",n=>{x.updateProfile({notifications:n.target.checked})});const s=document.getElementById("supabase-test-btn");s&&s.addEventListener("click",async()=>{try{const n=await vr();alert(n&&n.connected?"Supabase connection successful.":"Supabase connection test returned no data.")}catch(n){console.error(n),alert(`Supabase connection failed: ${n.message||n}`)}}),document.getElementById("clear-database-btn").addEventListener("click",async()=>{if(confirm(y("resetConfirm")))try{await Ms(),alert(y("dbCleared")),x.refreshCache()}catch(n){console.error(n),alert(y("dbClearError")||"Unable to clear database.")}}),document.getElementById("logout-btn").addEventListener("click",()=>{confirm(y("logoutConfirm"))&&x.logout()})}let H="login",Ue=null;function To(){if(document.getElementById("auth-custom-styles"))return;const t=document.createElement("style");t.id="auth-custom-styles",t.innerHTML=`
    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    .password-toggle-btn {
      position: absolute;
      right: 12px;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      transition: color var(--transition-fast);
      user-select: none;
    }
    .password-toggle-btn:hover {
      color: var(--text-primary);
    }
    .strength-bar-container {
      display: flex;
      gap: 4px;
      margin-top: 6px;
      height: 4px;
      width: 100%;
      border-radius: 2px;
      overflow: hidden;
    }
    .strength-bar-segment {
      flex: 1;
      height: 100%;
      background: var(--border-color);
      transition: background-color var(--transition-fast);
    }
    .strength-label {
      font-size: 11px;
      font-weight: 700;
      margin-top: 4px;
      text-align: right;
      transition: color var(--transition-fast);
    }
    .verification-digit-input {
      width: 48px;
      height: 48px;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      border-radius: var(--border-radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-tertiary);
      color: var(--text-primary);
      margin: 0 4px;
    }
    .verification-digit-input:focus {
      border-color: var(--accent-color);
      outline: none;
      box-shadow: 0 0 10px var(--accent-glow);
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      font-size: 13px;
      color: var(--text-secondary);
      user-select: none;
    }
    .checkbox-container input {
      width: 16px;
      height: 16px;
      accent-color: var(--accent-color);
      cursor: pointer;
    }
  `,document.head.appendChild(t)}function Ro(t){To(),t.innerHTML=`
    <div class="auth-page-container">
      <div class="auth-card" id="auth-card-body">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;const e=document.getElementById("auth-card-body");ae(e)}function j(t,e="success"){let r=document.getElementById("auth-toast-container");r||(r=document.createElement("div"),r.id="auth-toast-container",r.style.cssText=`
      position: fixed;
      top: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    `,document.body.appendChild(r));const s=document.createElement("div"),n=e==="success"?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>':'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',i=e==="success"?"rgba(16, 185, 129, 0.95)":"rgba(239, 68, 68, 0.95)";s.style.cssText=`
    background: ${i};
    color: #ffffff;
    padding: 12px 20px;
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 13px;
    font-family: var(--font-body);
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  `,s.innerHTML=`${n} <span>${t}</span>`,r.appendChild(s),setTimeout(()=>{s.style.transform="translateY(0)",s.style.opacity="1"},10),setTimeout(()=>{s.style.transform="translateY(-20px)",s.style.opacity="0",setTimeout(()=>s.remove(),300)},3e3)}function Ao(t){if(t.length===0)return{score:0,label:"None",color:"transparent"};if(t.length<6)return{score:1,label:"Weak",color:"var(--color-loss)"};const e=/[a-zA-Z]/.test(t),r=/[0-9]/.test(t),s=/[^A-Za-z0-9]/.test(t),n=/[A-Z]/.test(t);return t.length>=8&&e&&r&&s&&n?{score:3,label:"Strong",color:"var(--color-win)"}:t.length>=6&&e&&r?{score:2,label:"Medium",color:"var(--color-be)"}:{score:1,label:"Weak",color:"var(--color-loss)"}}function Xe(t,e){e.addEventListener("click",r=>{r.preventDefault(),t.type==="password"?(t.type="text",e.textContent="Hide"):(t.type="password",e.textContent="Show")})}function ls(t,e,r){const s=Ao(t);e.querySelectorAll(".strength-bar-segment").forEach((i,a)=>{a<s.score?i.style.backgroundColor=s.color:i.style.backgroundColor="var(--border-color)"}),r.textContent=s.label!=="None"?`Strength: ${s.label}`:"",r.style.color=s.color}function ae(t){if(H==="login"){t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">TM</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">TradeMaster</span>
        </div>
        <h3 class="auth-title">${y("welcomeBack")}</h3>
        <p class="auth-subtitle">${y("loginSubtitle")}</p>
      </div>

      <form id="login-form">
        <div class="form-group">
          <label class="form-label" for="login-email">${y("emailLabel")}</label>
          <input type="email" id="login-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label class="form-label" for="login-password">${y("passwordLabel")}</label>
            <a href="#" id="goto-forgot" style="font-size:12px; color: var(--accent-color); text-decoration:none; margin-bottom:8px;">${y("forgotLink")}</a>
          </div>
          <div class="password-input-wrapper">
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="login-pwd-toggle">Show</button>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <label class="checkbox-container">
            <input type="checkbox" id="login-remember">
            <span>Remember Me</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${y("accessAccount")}</button>
      </form>

      <div class="auth-footer-link">
        ${y("dontHaveAccount")} <a href="#" class="auth-link" id="goto-register">${y("createOne")}</a>
      </div>
    `;const e=localStorage.getItem("trademaster-remember-email");e&&(document.getElementById("login-email").value=e,document.getElementById("login-remember").checked=!0),Xe(document.getElementById("login-password"),document.getElementById("login-pwd-toggle")),document.getElementById("login-form").addEventListener("submit",async r=>{r.preventDefault();const s=document.getElementById("login-email").value.trim(),n=document.getElementById("login-password").value,i=document.getElementById("login-remember").checked;try{await x.login(s,n,i),i?localStorage.setItem("trademaster-remember-email",s):localStorage.removeItem("trademaster-remember-email"),j("Login successful! Welcoming you back...","success"),setTimeout(()=>x.setView("dashboard"),800)}catch(a){j(y(a.message)||a.message,"error")}}),document.getElementById("goto-register").addEventListener("click",r=>{r.preventDefault(),H="register",ae(t)}),document.getElementById("goto-forgot").addEventListener("click",r=>{r.preventDefault(),H="forgot",ae(t)})}else if(H==="register"){t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">TM</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">TradeMaster</span>
        </div>
        <h3 class="auth-title">${y("createAccount")}</h3>
        <p class="auth-subtitle">${y("registerSubtitle")}</p>
      </div>

      <form id="register-form">
        <div class="form-group">
          <label class="form-label" for="reg-fullname">Full Name</label>
          <input type="text" id="reg-fullname" class="form-control" placeholder="Alex Sterling" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-username">${y("usernameLabel")}</label>
          <input type="text" id="reg-username" class="form-control" placeholder="AlexTrader" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-email">${y("emailLabel")}</label>
          <input type="email" id="reg-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group" style="margin-bottom: 12px;">
          <label class="form-label" for="reg-password">${y("passwordLabel")}</label>
          <div class="password-input-wrapper">
            <input type="password" id="reg-password" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reg-pwd-toggle">Show</button>
          </div>
          <div class="strength-bar-container" id="reg-strength-container">
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
          </div>
          <div class="strength-label" id="reg-strength-lbl"></div>
        </div>
        <div class="form-group" style="margin-bottom: 20px;">
          <label class="form-label" for="reg-confirm">Confirm Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="reg-confirm" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reg-confirm-toggle">Show</button>
          </div>
        </div>
        <div class="form-group" style="margin-bottom: 24px;">
          <label class="checkbox-container">
            <input type="checkbox" id="reg-terms" required>
            <span>I accept the Terms and Conditions of TradeMaster</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${y("registerAccount")}</button>
      </form>

      <div class="auth-footer-link">
        ${y("alreadyHaveAccount")} <a href="#" class="auth-link" id="goto-login">${y("signIn")}</a>
      </div>
    `;const e=document.getElementById("reg-password"),r=document.getElementById("reg-confirm"),s=document.getElementById("reg-strength-container"),n=document.getElementById("reg-strength-lbl");Xe(e,document.getElementById("reg-pwd-toggle")),Xe(r,document.getElementById("reg-confirm-toggle")),e.addEventListener("input",()=>{ls(e.value,s,n)}),document.getElementById("register-form").addEventListener("submit",async i=>{i.preventDefault();const a=document.getElementById("reg-fullname").value.trim(),o=document.getElementById("reg-username").value.trim(),l=document.getElementById("reg-email").value.trim(),c=e.value,d=r.value;if(!document.getElementById("reg-terms").checked){j("You must accept the Terms and Conditions to proceed.","error");return}if(c!==d){j("Passwords do not match.","error");return}if(c.length<6){j("Password must be at least 6 characters.","error");return}try{const{getUser:f}=await _e(async()=>{const{getUser:p}=await Promise.resolve().then(()=>Se);return{getUser:p}},void 0);if(await f(l)){j(y("emailExists"),"error");return}Ue={username:o,email:l,password:c,fullname:a},H="verify",j("Verification code sent to email!","success"),ae(t)}catch(f){j(y(f.message)||f.message,"error")}}),document.getElementById("goto-login").addEventListener("click",i=>{i.preventDefault(),H="login",ae(t)})}else if(H==="verify"){if(!Ue){j("No registration in progress. Redirecting to register.","error"),H="register",ae(t);return}t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">TM</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">TradeMaster</span>
        </div>
        <h3 class="auth-title">Verify Your Email</h3>
        <p class="auth-subtitle">We have sent a verification code to <strong>${(Ue==null?void 0:Ue.email)||"your email"}</strong>.</p>
      </div>

      <form id="verify-form" style="text-align: center;">
        <div style="display: flex; justify-content: center; margin-bottom: 24px;">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-1">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-2">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-3">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-4">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-5">
          <input type="text" maxlength="1" class="verification-digit-input" required id="code-6">
        </div>

        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 24px;">
          Simulation Hint: Enter <strong>123456</strong> to verify successfully.
        </p>
        <p style="font-size: 13px; margin-top: -12px; margin-bottom: 20px;">
          <a href="#" id="use-hint-btn" class="auth-link">Use Simulation Hint</a>
        </p>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">Verify Code</button>
      </form>

      <div class="auth-footer-link">
        Didn't receive code? <a href="#" class="auth-link" id="resend-code-btn">Resend Code</a>
      </div>
    `;const e=document.querySelectorAll(".verification-digit-input");e.forEach((s,n)=>{s.addEventListener("input",()=>{s.value&&n<e.length-1&&e[n+1].focus()}),s.addEventListener("keydown",i=>{i.key==="Backspace"&&!s.value&&n>0&&e[n-1].focus()})});const r=document.getElementById("use-hint-btn");r&&r.addEventListener("click",s=>{s.preventDefault();const n="123456";e.forEach((a,o)=>{a.value=n[o]}),e[e.length-1].focus();const i=document.getElementById("verify-form");i.requestSubmit?i.requestSubmit():i.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))}),document.getElementById("resend-code-btn").addEventListener("click",s=>{s.preventDefault(),j("Simulating: Verification code resent to email.","success")}),document.getElementById("verify-form").addEventListener("submit",async s=>{if(s.preventDefault(),Array.from(e).map(i=>i.value).join("")==="123456")try{const{username:i,email:a,password:o,fullname:l}=Ue;await x.register(i,a,o,l),j("Account successfully verified & activated!","success"),setTimeout(()=>x.setView("dashboard"),800)}catch(i){j(y(i.message)||i.message,"error")}else j("Invalid verification code. Enter 123456.","error")})}else if(H==="forgot")t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">TM</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">TradeMaster</span>
        </div>
        <h3 class="auth-title">${y("resetPassword")}</h3>
        <p class="auth-subtitle">${y("resetSubtitle")}</p>
      </div>

      <form id="forgot-form">
        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label" for="forgot-email">${y("emailLabel")}</label>
          <input type="email" id="forgot-email" class="form-control" placeholder="trader@forex.com" required>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${y("sendInstructions")}</button>
      </form>

      <div class="auth-footer-link">
        <a href="#" class="auth-link" id="goto-login-back">${y("backToSignIn")}</a>
      </div>
    `,document.getElementById("forgot-form").addEventListener("submit",async e=>{e.preventDefault();const r=document.getElementById("forgot-email").value.trim(),{getUser:s}=await _e(async()=>{const{getUser:i}=await Promise.resolve().then(()=>Se);return{getUser:i}},void 0);await s(r)?(j("Instructions and reset link successfully sent to your email.","success"),setTimeout(()=>{H="reset",ae(t)},1200)):j("No account registered with this email address.","error")}),document.getElementById("goto-login-back").addEventListener("click",e=>{e.preventDefault(),H="login",ae(t)});else if(H==="reset"){t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">TM</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">TradeMaster</span>
        </div>
        <h3 class="auth-title">Create New Password</h3>
        <p class="auth-subtitle">Enter your new credentials below to restore account access.</p>
      </div>

      <form id="reset-form">
        <div class="form-group">
          <label class="form-label" for="reset-email">Verify Email</label>
          <input type="email" id="reset-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reset-pwd">New Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="reset-pwd" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reset-pwd-toggle">Show</button>
          </div>
          <div class="strength-bar-container" id="reset-strength-container">
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
            <div class="strength-bar-segment"></div>
          </div>
          <div class="strength-label" id="reset-strength-lbl"></div>
        </div>
        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label" for="reset-confirm">Confirm New Password</label>
          <div class="password-input-wrapper">
            <input type="password" id="reset-confirm" class="form-control" placeholder="••••••••" required style="width: 100%; padding-right: 60px;">
            <button type="button" class="password-toggle-btn" id="reset-confirm-toggle">Show</button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">Save Password</button>
      </form>

      <div class="auth-footer-link">
        <a href="#" class="auth-link" id="goto-login-back">${y("backToSignIn")}</a>
      </div>
    `;const e=document.getElementById("reset-pwd"),r=document.getElementById("reset-confirm"),s=document.getElementById("reset-strength-container"),n=document.getElementById("reset-strength-lbl");Xe(e,document.getElementById("reset-pwd-toggle")),Xe(r,document.getElementById("reset-confirm-toggle")),e.addEventListener("input",()=>{ls(e.value,s,n)}),document.getElementById("reset-form").addEventListener("submit",async i=>{i.preventDefault();const a=document.getElementById("reset-email").value.trim(),o=e.value,l=r.value;if(o!==l){j("Passwords do not match.","error");return}if(o.length<6){j("Password must be at least 6 characters.","error");return}try{const{getUser:c,updateUser:d}=await _e(async()=>{const{getUser:f,updateUser:h}=await Promise.resolve().then(()=>Se);return{getUser:f,updateUser:h}},void 0),u=await c(a);u?(u.password=o,await d(u),j("Password updated! Redirecting to login...","success"),setTimeout(()=>{H="login",ae(t)},1200)):j("Account email verification failed.","error")}catch(c){j(y(c.message)||c.message,"error")}}),document.getElementById("goto-login-back").addEventListener("click",i=>{i.preventDefault(),H="login",ae(t)})}}async function Nt(t){const e=await pr(),r=await K("TradingJournal"),s=await K("BacktestingJournal"),n=e.length,i=e.filter(h=>h.status==="active").length,a=e.filter(h=>h.status==="suspended").length,o=[...r,...s],l=o.length,c=o.filter(h=>h.result==="Win").length,d=l>0?(c/l*100).toFixed(1)+"%":"0.0%";t.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      
      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <!-- Total Users -->
        <div class="metric-card">
          <span class="metric-card-label">${y("totalUsers")}</span>
          <div class="metric-card-value">${n}</div>
          <div class="metric-card-sub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-color);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>System Traders</span>
          </div>
        </div>

        <!-- Active Users -->
        <div class="metric-card">
          <span class="metric-card-label">${y("activeUsers")}</span>
          <div class="metric-card-value">${i}</div>
          <div class="metric-card-sub">
            <span class="badge badge-win" style="padding: 2px 6px; font-size: 10px;">Active</span>
          </div>
        </div>

        <!-- Suspended Users -->
        <div class="metric-card">
          <span class="metric-card-label">${y("suspendedUsers")}</span>
          <div class="metric-card-value">${a}</div>
          <div class="metric-card-sub">
            <span class="badge badge-loss" style="padding: 2px 6px; font-size: 10px;">Suspended</span>
          </div>
        </div>

        <!-- Total Trade Logs -->
        <div class="metric-card">
          <span class="metric-card-label">${y("totalLogs")}</span>
          <div class="metric-card-value">${l}</div>
          <div class="metric-card-sub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Live + Backtesting</span>
          </div>
        </div>

        <!-- System Win Rate -->
        <div class="metric-card">
          <span class="metric-card-label">${y("systemWinRate")}</span>
          <div class="metric-card-value" style="color: var(--color-win);">${d}</div>
          <div class="metric-card-sub">
            <span class="metric-trend-up">★</span>
            <span>Avg Win Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Main Action Area: Table & Creation -->
      <div style="display: grid; grid-template-columns: 2.2fr 1fr; gap: 28px; align-items: start;">
        
        <!-- User Accounts Table -->
        <div class="card" style="padding: 24px; min-height: 400px; display: flex; flex-direction: column; gap: 20px;">
          <div class="card-header" style="margin-bottom: 0;">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
              ${y("registeredUsers")}
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>${y("colUsername")}</th>
                  <th>${y("colEmail")}</th>
                  <th>${y("colRole")}</th>
                  <th>${y("colStatus")}</th>
                  <th>${y("colRegistered")}</th>
                  <th>${y("colActions")}</th>
                </tr>
              </thead>
              <tbody id="users-table-body">
                <!-- User rows rendered dynamically -->
              </tbody>
            </table>
          </div>
        </div>

        <!-- Add New User Form -->
        <div class="card" style="padding: 24px;">
          <div class="card-header">
            <div class="card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
              ${y("titleAddNewUser")}
            </div>
          </div>

          <form id="admin-create-user-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${y("usernameLabel")}</label>
              <input type="text" id="admin-user-name" class="form-control" placeholder="HassanFX" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${y("emailLabel")}</label>
              <input type="email" id="admin-user-email" class="form-control" placeholder="hassan@trademaster.com" required>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${y("passwordLabel")}</label>
              <input type="password" id="admin-user-pass" class="form-control" placeholder="••••••••" required>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${y("colRole")}</label>
              <select id="admin-user-role" class="form-control">
                <option value="user" selected>User (Standard Trader)</option>
                <option value="admin">Admin (System Manager)</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 12px; height: 42px;">
              ${y("btnSaveUser")}
            </button>
          </form>
        </div>

      </div>
    </div>
  `;const u=document.getElementById("users-table-body");$o(e,u);const f=document.getElementById("admin-create-user-form");f.addEventListener("submit",async h=>{h.preventDefault();const p=document.getElementById("admin-user-name").value.trim(),g=document.getElementById("admin-user-email").value.trim(),m=document.getElementById("admin-user-pass").value,b=document.getElementById("admin-user-role").value;if((await pr()).some(S=>S.email===g)){alert(y("emailExists"));return}const v={username:p,email:g,password:m,role:b,status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:p.slice(0,2).toUpperCase(),currency:"USD",riskDefault:1,notifications:!0};await js(v);try{const{addStoreData:S}=await _e(async()=>{const{addStoreData:C}=await Promise.resolve().then(()=>Se);return{addStoreData:C}},void 0),O=[{name:"SMC Order Block",description:"Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow.",userEmail:g},{name:"Liquidity Grab & Reversal",description:"Fading structural high/low grabs at New York/London session opens.",userEmail:g}];for(const C of O)await S("Strategies",C);const $=[{name:"Standard Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined"],userEmail:g}];for(const C of $)await S("Checklists",C)}catch(S){console.error(S)}alert(y("userCreatedMsg")),f.reset(),Nt(t)})}function $o(t,e){e.innerHTML="",t.forEach(r=>{const s=x.user&&x.user.email===r.email,n=document.createElement("tr"),i=r.role==="admin"?"badge-buy":"badge-session",a=r.status==="active"?"badge-win":"badge-loss";n.innerHTML=`
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="avatar" style="width: 32px; height: 32px; font-size: 11px; margin: 0; background: var(--bg-tertiary); border: 1px solid var(--border-color);">${r.avatar||r.username.slice(0,2).toUpperCase()}</div>
          <span style="font-weight: 600; color: var(--text-primary);">${r.username} ${s?' <span style="font-size:10px; color:var(--text-muted);">(You)</span>':""}</span>
        </div>
      </td>
      <td>${r.email}</td>
      <td><span class="badge ${i}">${r.role.toUpperCase()}</span></td>
      <td><span class="badge ${a}">${r.status.toUpperCase()}</span></td>
      <td>${r.registeredAt||"-"}</td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-status-toggle" style="padding: 6px 10px; font-size: 11px;" ${s?"disabled":""}>
            ${r.status==="active"?y("btnSuspend"):y("btnActivate")}
          </button>
          <button class="btn btn-secondary btn-role-toggle" style="padding: 6px 10px; font-size: 11px;" ${s?"disabled":""}>
            ${r.role==="admin"?y("btnDemote"):y("btnMakeAdmin")}
          </button>
        </div>
      </td>
    `,n.querySelector(".btn-status-toggle").addEventListener("click",async()=>{if(s){alert(y("cannotSuspendSelf"));return}r.status=r.status==="active"?"suspended":"active",await gr(r),alert(y("userUpdatedMsg"));const o=document.getElementById("content-viewport");o&&Nt(o)}),n.querySelector(".btn-role-toggle").addEventListener("click",async()=>{if(s){alert(y("cannotDemoteSelf"));return}r.role=r.role==="admin"?"user":"admin",await gr(r),alert(y("userUpdatedMsg"));const o=document.getElementById("content-viewport");o&&Nt(o)}),e.appendChild(n)})}const cs={dashboard:{titleKey:"dashboard",render:ho},journal:{titleKey:"journal",render:t=>go(t,"live")},backtesting:{titleKey:"backtesting",render:io},calendar:{titleKey:"calendar",render:Ae},analytics:{titleKey:"analytics",render:bo},gallery:{titleKey:"gallery",render:Ct},reports:{titleKey:"reports",render:he},settings:{titleKey:"settings",render:zs},admin:{titleKey:"adminPanel",render:Nt},auth:{titleKey:"welcomeBack",render:Ro}};document.addEventListener("DOMContentLoaded",async()=>{await x.init();const t=document.getElementById("content-viewport"),e=document.getElementById("current-view-title"),r=document.querySelectorAll(".nav-item"),s=document.getElementById("global-search");function n(){const o=x.activeView;if(!x.user&&o!=="auth"){x.setView("auth");return}if(x.user&&o==="admin"&&x.user.role!=="admin"){x.setView("dashboard");return}const l=cs[o];if(!l){x.setView("dashboard");return}const c=document.getElementById("app"),d=document.getElementById("auth-root");if(o==="auth"){c&&(c.style.display="none"),document.body.classList.add("auth-body"),d&&(d.style.display="block",d.innerHTML="",cs.auth.render(d));return}else c&&(c.style.display="flex"),d&&(d.style.display="none"),document.body.classList.remove("auth-body");e.textContent=y(l.titleKey);const u=document.getElementById("nav-admin-link");if(u&&(u.style.display=x.user&&x.user.role==="admin"?"flex":"none"),r.forEach(h=>{h.dataset.view===o?h.classList.add("active"):h.classList.remove("active")}),x.user){document.getElementById("profile-avatar").textContent=x.user.avatar||"US",document.getElementById("profile-name").textContent=x.user.username||"User";const h=x.user.role==="admin"?y("adminUser"):y("premiumTrader");document.querySelector(".user-role").textContent=h}document.querySelector(".sidebar-dashboard-text").textContent=y("dashboard"),document.querySelector(".sidebar-journal-text").textContent=y("journal"),document.querySelector(".sidebar-backtesting-text").textContent=y("backtesting"),document.querySelector(".sidebar-calendar-text").textContent=y("calendar"),document.querySelector(".sidebar-analytics-text").textContent=y("analytics"),document.querySelector(".sidebar-gallery-text").textContent=y("gallery"),document.querySelector(".sidebar-reports-text").textContent=y("reports"),document.querySelector(".sidebar-settings-text").textContent=y("settings");const f=document.querySelector(".sidebar-admin-text");f&&(f.textContent=y("adminPanel")),document.getElementById("quick-add-trade-text").textContent=x.language==="so"?"Ganacsi Cusub":"New Trade",document.getElementById("global-search").placeholder=x.language==="so"?"Raadi lamaanaha, xeeladda, taariikhda...":"Search pair, strategy, date...",t.innerHTML="",l.render(t)}r.forEach(o=>{o.addEventListener("click",l=>{l.preventDefault();const c=o.dataset.view;x.setView(c)})});const i=document.getElementById("lang-selector");i&&(i.value=x.language,i.addEventListener("change",o=>{x.setLanguage(o.target.value)})),document.getElementById("profile-summary").addEventListener("click",()=>{x.setView("settings")});let a=null;s.addEventListener("input",o=>{clearTimeout(a),a=setTimeout(()=>{const l=o.target.value.toLowerCase().trim();l&&(x.activeView!=="journal"&&x.activeView!=="backtesting"&&x.setView("journal"),window.dispatchEvent(new CustomEvent("globalSearch",{detail:l})))},300)}),x.subscribe(()=>{n()}),n(),Co()});function Co(){const t=document.getElementById("trade-modal"),e=document.getElementById("close-trade-modal-btn"),r=document.getElementById("cancel-trade-modal-btn"),s=document.getElementById("quick-add-trade-btn"),n=document.getElementById("trade-form"),i=document.getElementById("form-entry"),a=document.getElementById("form-sl"),o=document.getElementById("form-tp"),l=document.getElementById("form-rr"),c=document.getElementById("form-direction");s.addEventListener("click",()=>{Vt()}),[e,r].forEach(u=>{u.addEventListener("click",()=>{t.classList.remove("active")})}),t.addEventListener("click",u=>{u.target===t&&t.classList.remove("active")});function d(){const u=parseFloat(i.value),f=parseFloat(a.value),h=parseFloat(o.value),p=c.value;if(isNaN(u)||isNaN(f)||isNaN(h)){l.value="";return}let g=0,m=0;if(p==="Buy"?(g=u-f,m=h-u):(g=f-u,m=u-h),g<=0){l.value="Invalid SL";return}const b=(m/g).toFixed(2);l.value=b}[i,a,o,c].forEach(u=>{u.addEventListener("input",d)}),Io(),n.addEventListener("submit",async u=>{u.preventDefault();const f=document.getElementById("form-trade-id").value,p=document.getElementById("form-journal-type").value==="live"?"TradingJournal":"BacktestingJournal",g=[];document.querySelectorAll(".checklist-form-checkbox").forEach(v=>{v.checked&&g.push(v.value)});const m=document.getElementById("form-date").value,b=new Date(m).toLocaleDateString("en-US",{weekday:"long"}),k={userEmail:x.user.email,date:m,day:b,session:document.getElementById("form-session").value,pair:document.getElementById("form-pair").value.toUpperCase(),type:c.value,entryPrice:parseFloat(i.value),stopLoss:parseFloat(a.value),takeProfit:parseFloat(o.value),riskPercent:parseFloat(document.getElementById("form-risk").value||1),rr:parseFloat(l.value)||0,result:document.getElementById("form-result").value,strategy:document.getElementById("form-strategy").value,setup:document.getElementById("form-setup").value,checklist:g,emotion:document.getElementById("form-emotion").value,mistakes:document.getElementById("form-mistakes").value,lessonLearned:document.getElementById("form-lessons").value,notes:document.getElementById("form-notes").value,beforeScreenshot:document.getElementById("form-before-img").value||null,afterScreenshot:document.getElementById("form-after-img").value||null};f?(k.id=Number(f),await Ht(p,k)):await ve(p,k),t.classList.remove("active"),x.refreshCache()})}function Vt(t=null,e=null){var c;const r=document.getElementById("trade-modal"),s=document.getElementById("modal-title");document.getElementById("trade-form").reset(),document.getElementById("form-date").value=new Date().toISOString().split("T")[0],document.getElementById("form-journal-type").value=e||(x.activeView==="backtesting"?"backtest":"live");const i=document.getElementById("checklist-selectors-area");i.innerHTML="",(((c=x.checklists[0])==null?void 0:c.items)||["HTF Trend Aligned","Liquidity Swept","OB Tapped","Risk defined"]).forEach((d,u)=>{i.innerHTML+=`
      <label class="checkbox-label">
        <input type="checkbox" class="checklist-form-checkbox" value="${d}" id="chk-${u}">
        <span>${d}</span>
      </label>
    `});const o=document.getElementById("before-preview"),l=document.getElementById("after-preview");o.style.display="none",l.style.display="none",document.getElementById("form-before-img").value="",document.getElementById("form-after-img").value="",t?(s.textContent="Edit Trade Record",document.getElementById("form-trade-id").value=t.id,document.getElementById("form-date").value=t.date,document.getElementById("form-session").value=t.session,document.getElementById("form-pair").value=t.pair,document.getElementById("form-direction").value=t.type,document.getElementById("form-entry").value=t.entryPrice,document.getElementById("form-sl").value=t.stopLoss,document.getElementById("form-tp").value=t.takeProfit,document.getElementById("form-risk").value=t.riskPercent,document.getElementById("form-rr").value=t.rr,document.getElementById("form-result").value=t.result,document.getElementById("form-strategy").value=t.strategy,document.getElementById("form-setup").value=t.setup,document.getElementById("form-emotion").value=t.emotion,document.getElementById("form-mistakes").value=t.mistakes,document.getElementById("form-lessons").value=t.lessonLearned,document.getElementById("form-notes").value=t.notes,t.checklist&&document.querySelectorAll(".checklist-form-checkbox").forEach(d=>{t.checklist.includes(d.value)&&(d.checked=!0)}),t.beforeScreenshot&&(document.getElementById("form-before-img").value=t.beforeScreenshot,o.style.display="block",o.innerHTML=`<img src="${t.beforeScreenshot}">`),t.afterScreenshot&&(document.getElementById("form-after-img").value=t.afterScreenshot,l.style.display="block",l.innerHTML=`<img src="${t.afterScreenshot}">`)):(s.textContent="Log New Trade",document.getElementById("form-trade-id").value=""),r.classList.add("active")}function Io(){const t=document.getElementById("before-dropzone"),e=document.getElementById("after-dropzone"),r=document.getElementById("before-file-input"),s=document.getElementById("after-file-input"),n=(a,o,l,c)=>{const d=document.getElementById(l),u=document.getElementById(c);a.addEventListener("click",()=>o.click()),a.addEventListener("dragover",f=>{f.preventDefault(),a.style.borderColor="var(--accent-color)"}),a.addEventListener("dragleave",()=>{a.style.borderColor="var(--border-color)"}),a.addEventListener("drop",f=>{f.preventDefault(),a.style.borderColor="var(--border-color)",f.dataTransfer.files.length&&i(f.dataTransfer.files[0],d,u)}),o.addEventListener("change",()=>{o.files.length&&i(o.files[0],d,u)})},i=(a,o,l)=>{const c=new FileReader;c.onload=d=>{const u=d.target.result;l.value=u,o.style.display="block",o.innerHTML=`
        <img src="${u}">
        <button type="button" class="image-preview-remove">&times;</button>
      `,o.querySelector(".image-preview-remove").addEventListener("click",f=>{f.stopPropagation(),l.value="",o.innerHTML="",o.style.display="none"})},c.readAsDataURL(a)};n(t,r,"before-preview","form-before-img"),n(e,s,"after-preview","form-after-img")}
