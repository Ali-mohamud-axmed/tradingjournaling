(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const yn="modulepreload",bn=function(t){return"/"+t},Ds={},ge=function(e,s,r){let n=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));n=Promise.allSettled(s.map(l=>{if(l=bn(l),l in Ds)return;Ds[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":yn,c||(d.as="script"),d.crossOrigin="",d.href=l,o&&d.setAttribute("nonce",o),document.head.appendChild(d),c)return new Promise((f,h)=>{d.addEventListener("load",f),d.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return n.then(a=>{for(const o of a||[])o.status==="rejected"&&i(o.reason);return e().catch(i)})},wn=Symbol.for("@supabase/supabase-js.traceContextExtractor");function kn(){return globalThis[wn]}function Qt(t,e){var s={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(s[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)e.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(s[r[n]]=t[r[n]]);return s}function xn(t,e,s,r){function n(i){return i instanceof s?i:new s(function(a){a(i)})}return new(s||(s=Promise))(function(i,a){function o(u){try{c(r.next(u))}catch(d){a(d)}}function l(u){try{c(r.throw(u))}catch(d){a(d)}}function c(u){u.done?i(u.value):n(u.value).then(o,l)}c((r=r.apply(t,e||[])).next())})}const _n=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class Ls extends Error{constructor(e,s="FunctionsError",r){super(e),this.name=s,this.context=r}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class En extends Ls{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Ns extends Ls{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class Us extends Ls{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var ms;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(ms||(ms={}));class Sn{constructor(e,{headers:s={},customFetch:r,region:n=ms.Any}={}){this.url=e,this.headers=s,this.region=n,this.fetch=_n(r)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return xn(this,arguments,void 0,function*(s,r={}){var n,i;let a,o,l;try{const{headers:c,method:u,body:d,signal:f,timeout:h}=r;let p={},{region:g}=r;g||(g=this.region);const y=new URL(`${this.url}/${s}`);g&&g!=="any"&&(p["x-region"]=g,y.searchParams.set("forceFunctionRegion",g));let v;const x=!!c&&Object.keys(c).some(B=>B.toLowerCase()==="content-type");d&&!x?typeof Blob<"u"&&d instanceof Blob||d instanceof ArrayBuffer?(p["Content-Type"]="application/octet-stream",v=d):typeof d=="string"?(p["Content-Type"]="text/plain",v=d):typeof FormData<"u"&&d instanceof FormData?v=d:(p["Content-Type"]="application/json",v=JSON.stringify(d)):d&&typeof d!="string"&&!(typeof Blob<"u"&&d instanceof Blob)&&!(d instanceof ArrayBuffer)&&!(typeof FormData<"u"&&d instanceof FormData)?v=JSON.stringify(d):v=d;let m=f;h&&(o=new AbortController,a=setTimeout(()=>o.abort(),h),f?(m=o.signal,l=()=>o.abort(),f.addEventListener("abort",l)):m=o.signal);const k=yield this.fetch(y.toString(),{method:u||"POST",headers:Object.assign(Object.assign(Object.assign({},p),this.headers),c),body:v,signal:m}).catch(B=>{throw new En(B)}),I=k.headers.get("x-relay-error");if(I&&I==="true")throw new Ns(k);if(!k.ok)throw new Us(k);let T=((n=k.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim().toLowerCase(),S;return T==="application/json"?S=yield k.json():T==="application/octet-stream"||T==="application/pdf"?S=yield k.blob():T==="text/event-stream"?S=k:T==="multipart/form-data"?S=yield k.formData():S=yield k.text(),{data:S,error:null,response:k}}catch(c){return{data:null,error:c,response:c instanceof Us||c instanceof Ns?c.context:void 0}}finally{a&&clearTimeout(a),l&&((i=r.signal)===null||i===void 0||i.removeEventListener("abort",l))}})}}const Pr=3,Ms=t=>Math.min(1e3*2**t,3e4),Rn=[520,503],Br=["GET","HEAD","OPTIONS"];var as=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function mt(t){"@babel/helpers - typeof";return mt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},mt(t)}function Tn(t,e){if(mt(t)!="object"||!t)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var r=s.call(t,e);if(mt(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function An(t){var e=Tn(t,"string");return mt(e)=="symbol"?e:e+""}function $n(t,e,s){return(e=An(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function zs(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),s.push.apply(s,r)}return s}function Qe(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]!=null?arguments[e]:{};e%2?zs(Object(s),!0).forEach(function(r){$n(t,r,s[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):zs(Object(s)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(s,r))})}return t}function Fs(t,e){return new Promise(s=>{if(e!=null&&e.aborted){s();return}const r=setTimeout(()=>{e==null||e.removeEventListener("abort",n),s()},t);function n(){clearTimeout(r),s()}e==null||e.addEventListener("abort",n)})}function Cn(t,e,s,r){return!(!r||s>=Pr||!Br.includes(t)||!Rn.includes(e))}var Ln=class{constructor(t){var e,s,r,n,i;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(s=t.isMaybeSingle)!==null&&s!==void 0?s:!1,this.shouldStripNulls=(r=t.shouldStripNulls)!==null&&r!==void 0?r:!1,this.urlLengthLimit=(n=t.urlLengthLimit)!==null&&n!==void 0?n:8e3,this.retryEnabled=(i=t.retry)!==null&&i!==void 0?i:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var s=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const a=this.headers.get("Accept");a==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!a||a==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const r=this.fetch;let i=(async()=>{let a=0;for(;;){const c={};s.headers.forEach((d,f)=>{c[f]=d}),a>0&&(c["X-Retry-Count"]=String(a));let u;try{u=await r(s.url.toString(),{method:s.method,headers:c,body:JSON.stringify(s.body,(d,f)=>typeof f=="bigint"?f.toString():f),signal:s.signal})}catch(d){if((d==null?void 0:d.name)==="AbortError"||(d==null?void 0:d.code)==="ABORT_ERR"||!Br.includes(s.method))throw d;if(s.retryEnabled&&a<Pr){const f=Ms(a);a++,await Fs(f,s.signal);continue}throw d}if(Cn(s.method,u.status,a,s.retryEnabled)){var o,l;const d=(o=(l=u.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,f=d!==null?Math.max(0,parseInt(d,10)||0)*1e3:Ms(a);await u.text(),a++,await Fs(f,s.signal);continue}return await s.processResponse(u)}})();return this.shouldThrowOnError||(i=i.catch(a=>{var o;let l="",c="",u="";const d=a==null?void 0:a.cause;if(d){var f,h,p,g;const x=(f=d==null?void 0:d.message)!==null&&f!==void 0?f:"",m=(h=d==null?void 0:d.code)!==null&&h!==void 0?h:"";l=`${(p=a==null?void 0:a.name)!==null&&p!==void 0?p:"FetchError"}: ${a==null?void 0:a.message}`,l+=`

Caused by: ${(g=d==null?void 0:d.name)!==null&&g!==void 0?g:"Error"}: ${x}`,m&&(l+=` (${m})`),d!=null&&d.stack&&(l+=`
${d.stack}`)}else{var y;l=(y=a==null?void 0:a.stack)!==null&&y!==void 0?y:""}const v=this.url.toString().length;return(a==null?void 0:a.name)==="AbortError"||(a==null?void 0:a.code)==="ABORT_ERR"?(u="",c="Request was aborted (timeout or manual cancellation)",v>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${v} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((d==null?void 0:d.name)==="HeadersOverflowError"||(d==null?void 0:d.code)==="UND_ERR_HEADERS_OVERFLOW")&&(u="",c="HTTP headers exceeded server limits (typically 16KB)",v>this.urlLengthLimit&&(c+=`. Your request URL is ${v} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=a==null?void 0:a.name)!==null&&o!==void 0?o:"FetchError"}: ${a==null?void 0:a.message}`,details:l,hint:c,code:u},data:null,count:null,status:0,statusText:""}})),i.then(t,e)}async processResponse(t){var e=this;let s=null,r=null,n=null,i=t.status,a=t.statusText;if(t.ok){var o,l;if(e.method!=="HEAD"){var c;const h=await t.text();if(h!=="")if(e.headers.get("Accept")==="text/csv")r=h;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))r=h;else try{r=JSON.parse(h)}catch{if(s={message:h},r=null,e.shouldThrowOnError)throw new as({message:h,details:"",hint:"",code:""})}}const d=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),f=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");if(d&&f&&f.length>1&&(n=parseInt(f[1])),e.isMaybeSingle&&Array.isArray(r))if(r.length>1){if(s={code:"PGRST116",details:`Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},r=null,n=null,i=406,a="Not Acceptable",e.shouldThrowOnError){var u;throw new as(Qe(Qe({},s),{},{hint:(u=s.hint)!==null&&u!==void 0?u:""}))}}else r.length===1?r=r[0]:r=null}else{const d=await t.text();try{s=JSON.parse(d),Array.isArray(s)&&t.status===404&&(r=[],s=null,i=200,a="OK")}catch{t.status===404&&d===""?(i=204,a="No Content"):s={message:d}}if(s&&e.shouldThrowOnError)throw new as(s)}return{success:s===null,error:s,data:r,count:n,status:i,statusText:a}}returns(){return this}overrideTypes(){return this}},In=class extends Ln{throwOnError(){return super.throwOnError()}select(t){let e=!1;const s=(t??"*").split("").map(r=>/\s/.test(r)&&!e?"":(r==='"'&&(e=!e),r)).join("");return this.url.searchParams.set("select",s),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:s,foreignTable:r,referencedTable:n=r}={}){const i=n?`${n}.order`:"order",a=this.url.searchParams.get(i);return this.url.searchParams.set(i,`${a?`${a},`:""}${t}.${e?"asc":"desc"}${s===void 0?"":s?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:s=e}={}){const r=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(r,`${t}`),this}range(t,e,{foreignTable:s,referencedTable:r=s}={}){const n=typeof r>"u"?"offset":`${r}.offset`,i=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(n,`${t}`),this.url.searchParams.set(i,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:s=!1,buffers:r=!1,wal:n=!1,format:i="text"}={}){var a;const o=[t?"analyze":null,e?"verbose":null,s?"settings":null,r?"buffers":null,n?"wal":null].filter(Boolean).join("|"),l=(a=this.headers.get("Accept"))!==null&&a!==void 0?a:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${i}; for="${l}"; options=${o};`),i==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const qs=new RegExp("[,()]");var Xe=class extends In{throwOnError(){return super.throwOnError()}eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const s=Array.from(new Set(e)).map(r=>typeof r=="string"&&qs.test(r)?`"${r}"`:`${r}`).join(",");return this.url.searchParams.append(t,`in.(${s})`),this}notIn(t,e){const s=Array.from(new Set(e)).map(r=>typeof r=="string"&&qs.test(r)?`"${r}"`:`${r}`).join(",");return this.url.searchParams.append(t,`not.in.(${s})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:s,type:r}={}){let n="";r==="plain"?n="pl":r==="phrase"?n="ph":r==="websearch"&&(n="w");const i=s===void 0?"":`(${s})`;return this.url.searchParams.append(t,`${n}fts${i}.${e}`),this}match(t){return Object.entries(t).filter(([e,s])=>s!==void 0).forEach(([e,s])=>{this.url.searchParams.append(e,`eq.${s}`)}),this}not(t,e,s){return this.url.searchParams.append(t,`not.${e}.${s}`),this}or(t,{foreignTable:e,referencedTable:s=e}={}){const r=s?`${s}.or`:"or";return this.url.searchParams.append(r,`(${t})`),this}filter(t,e,s){return this.url.searchParams.append(t,`${e}.${s}`),this}},Pn=class{constructor(t,{headers:e={},schema:s,fetch:r,urlLengthLimit:n=8e3,retry:i}){this.url=t,this.headers=new Headers(e),this.schema=s,this.fetch=r,this.urlLengthLimit=n,this.retry=i}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:s=!1,count:r}=e??{},n=s?"HEAD":"GET";let i=!1;const a=(t??"*").split("").map(c=>/\s/.test(c)&&!i?"":(c==='"'&&(i=!i),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",a),r&&l.append("Prefer",`count=${r}`),new Xe({method:n,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:s=!0}={}){var r;const n="POST",{url:i,headers:a}=this.cloneRequestState();if(e&&a.append("Prefer",`count=${e}`),s||a.append("Prefer","missing=default"),Array.isArray(t)){const o=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);i.searchParams.set("columns",l.join(","))}}return new Xe({method:n,url:i,headers:a,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:s=!1,count:r,defaultToNull:n=!0}={}){var i;const a="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${s?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),r&&l.append("Prefer",`count=${r}`),n||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((u,d)=>u.concat(Object.keys(d)),[]);if(c.length>0){const u=[...new Set(c)].map(d=>`"${d}"`);o.searchParams.set("columns",u.join(","))}}return new Xe({method:a,url:o,headers:l,schema:this.schema,body:t,fetch:(i=this.fetch)!==null&&i!==void 0?i:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var s;const r="PATCH",{url:n,headers:i}=this.cloneRequestState();return e&&i.append("Prefer",`count=${e}`),new Xe({method:r,url:n,headers:i,schema:this.schema,body:t,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const s="DELETE",{url:r,headers:n}=this.cloneRequestState();return t&&n.append("Prefer",`count=${t}`),new Xe({method:s,url:r,headers:n,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}},Bn=class Or{constructor(e,{headers:s={},schema:r,fetch:n,timeout:i,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(s),this.schemaName=r,this.urlLengthLimit=a;const l=n??globalThis.fetch;i!==void 0&&i>0?this.fetch=(c,u)=>{const d=new AbortController,f=setTimeout(()=>d.abort(),i),h=u==null?void 0:u.signal;if(h){if(h.aborted)return clearTimeout(f),l(c,u);const p=()=>{clearTimeout(f),d.abort()};return h.addEventListener("abort",p,{once:!0}),l(c,Qe(Qe({},u),{},{signal:d.signal})).finally(()=>{clearTimeout(f),h.removeEventListener("abort",p)})}return l(c,Qe(Qe({},u),{},{signal:d.signal})).finally(()=>clearTimeout(f))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Pn(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new Or(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,s={},{head:r=!1,get:n=!1,count:i}={}){var a;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const u=h=>h!==null&&typeof h=="object"&&(!Array.isArray(h)||h.some(u)),d=r&&Object.values(s).some(u);d?(o="POST",c=s):r||n?(o=r?"HEAD":"GET",Object.entries(s).filter(([h,p])=>p!==void 0).map(([h,p])=>[h,Array.isArray(p)?`{${p.join(",")}}`:`${p}`]).forEach(([h,p])=>{l.searchParams.append(h,p)})):(o="POST",c=s);const f=new Headers(this.headers);return d?f.set("Prefer",i?`count=${i},return=minimal`:"return=minimal"):i&&f.set("Prefer",`count=${i}`),new Xe({method:o,url:l,headers:f,schema:this.schemaName,body:c,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class On{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const s=globalThis;if(typeof globalThis<"u"&&typeof s.WebSocket<"u")return{type:"native",wsConstructor:s.WebSocket};const r=typeof global<"u"?global:void 0;if(r&&typeof r.WebSocket<"u")return{type:"native",wsConstructor:r.WebSocket};if(typeof globalThis<"u"&&typeof s.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&s.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const n=globalThis.process;if(n){const i=n.versions;if(i&&i.node)return{type:"unsupported",error:"Node.js detected but native WebSocket not found.",workaround:"Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option."}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let s=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(s+=`

Suggested solution: ${e.workaround}`),new Error(s)}static isWebSocketSupported(){try{return this.detectEnvironment().type==="native"}catch{return!1}}}const jn="2.112.0",Dn=`realtime-js/${jn}`,Nn="1.0.0",jr="2.0.0",Un=jr,Mn=1e4,zn=100,Le={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Dr={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},vs={connecting:"connecting",closing:"closing",closed:"closed"};class Fn{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,s){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return s(this._binaryEncodeUserBroadcastPush(e));let r=[e.join_ref,e.ref,e.topic,e.event,e.payload];return s(JSON.stringify(r))}_binaryEncodeUserBroadcastPush(e){var s;return this._isArrayBuffer((s=e.payload)===null||s===void 0?void 0:s.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var s,r;const n=(r=(s=e.payload)===null||s===void 0?void 0:s.payload)!==null&&r!==void 0?r:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,n)}_encodeJsonUserBroadcastPush(e){var s,r;const n=(r=(s=e.payload)===null||s===void 0?void 0:s.payload)!==null&&r!==void 0?r:{},a=new TextEncoder().encode(JSON.stringify(n)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,a)}_encodeUserBroadcastPush(e,s,r){var n,i;const a=new TextEncoder,o=a.encode(e.topic),l=a.encode((n=e.ref)!==null&&n!==void 0?n:""),c=a.encode((i=e.join_ref)!==null&&i!==void 0?i:""),u=a.encode(e.payload.event),d=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},f=a.encode(Object.keys(d).length===0?"":JSON.stringify(d));if(c.length>255)throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);if(l.length>255)throw new Error(`ref length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`topic length ${o.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`userEvent length ${u.length} exceeds maximum of 255`);if(f.length>255)throw new Error(`metadata length ${f.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+c.length+l.length+o.length+u.length+f.length,p=new ArrayBuffer(this.HEADER_LENGTH+h),g=new DataView(p),y=new Uint8Array(p);let v=0;g.setUint8(v++,this.KINDS.userBroadcastPush),g.setUint8(v++,c.length),g.setUint8(v++,l.length),g.setUint8(v++,o.length),g.setUint8(v++,u.length),g.setUint8(v++,f.length),g.setUint8(v++,s),y.set(c,v),v+=c.length,y.set(l,v),v+=l.length,y.set(o,v),v+=o.length,y.set(u,v),v+=u.length,y.set(f,v),v+=f.length;var x=new Uint8Array(p.byteLength+r.byteLength);return x.set(new Uint8Array(p),0),x.set(new Uint8Array(r),p.byteLength),x.buffer}decode(e,s){if(this._isArrayBuffer(e)){let r=this._binaryDecode(e);return s(r)}if(typeof e=="string"){const r=JSON.parse(e),[n,i,a,o,l]=r;return s({join_ref:n,ref:i,topic:a,event:o,payload:l})}return s({})}_binaryDecode(e){const s=new DataView(e),r=s.getUint8(0),n=new TextDecoder;switch(r){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,s,n)}}_decodeUserBroadcast(e,s,r){const n=s.getUint8(1),i=s.getUint8(2),a=s.getUint8(3),o=s.getUint8(4);let l=this.HEADER_LENGTH+4;const c=r.decode(e.slice(l,l+n));l=l+n;const u=r.decode(e.slice(l,l+i));l=l+i;const d=r.decode(e.slice(l,l+a));l=l+a;const f=e.slice(l,e.byteLength),h=o===this.JSON_ENCODING?JSON.parse(r.decode(f)):f,p={type:this.BROADCAST_EVENT,event:u,payload:h};return a>0&&(p.meta=JSON.parse(d)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){var s;return e instanceof ArrayBuffer||((s=e==null?void 0:e.constructor)===null||s===void 0?void 0:s.name)==="ArrayBuffer"}_pick(e,s){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([r])=>s.includes(r)))}}var j;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(j||(j={}));const Hs=(t,e,s={})=>{var r;const n=(r=s.skipTypes)!==null&&r!==void 0?r:[];return e?Object.keys(e).reduce((i,a)=>(i[a]=qn(a,t,e,n),i),{}):{}},qn=(t,e,s,r)=>{const n=e.find(o=>o.name===t),i=n==null?void 0:n.type,a=s[t];return i&&!r.includes(i)?Nr(i,a):ys(a)},Nr=(t,e)=>{if(t.charAt(0)==="_"){const s=t.slice(1,t.length);return Kn(e,s)}switch(t){case j.bool:return Hn(e);case j.float4:case j.float8:case j.int2:case j.int4:case j.int8:case j.numeric:case j.oid:return Wn(e);case j.json:case j.jsonb:return Vn(e);case j.timestamp:return Jn(e);case j.abstime:case j.date:case j.daterange:case j.int4range:case j.int8range:case j.money:case j.reltime:case j.text:case j.time:case j.timestamptz:case j.timetz:case j.tsrange:case j.tstzrange:return ys(e);default:return ys(e)}},ys=t=>t,Hn=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},Wn=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},Vn=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},Kn=(t,e)=>{if(typeof t!="string")return t;const s=t.length-1,r=t[s];if(t[0]==="{"&&r==="}"){let i;const a=t.slice(1,s);try{i=JSON.parse("["+a+"]")}catch{i=a?a.split(","):[]}return i.map(o=>Nr(e,o))}return t},Jn=t=>typeof t=="string"?t.replace(" ","T"):t,Ur=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var st=t=>typeof t=="function"?t:function(){return t},Gn=typeof self<"u"?self:null,Ze=typeof window<"u"?window:null,fe=Gn||Ze||globalThis,Yn="2.0.0",Xn=1e4,Zn=1e3,Qn=100,pe={connecting:0,open:1,closing:2,closed:3},K={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},be={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},bs={longpoll:"longpoll",websocket:"websocket"},ei={complete:4},ws="base64url.bearer.phx.",Ct=class{constructor(t,e,s,r){this.channel=t,this.event=e,this.payload=s||function(){return{}},this.receivedResp=null,this.timeout=r,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:s}){this.recHooks.filter(r=>r.status===t).forEach(r=>r.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},Mr=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},ti=class{constructor(t,e,s){this.state=K.closed,this.topic=t,this.params=st(e||{}),this.socket=s,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new Ct(this,be.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new Mr(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=K.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(r=>r.send()),this.pushBuffer=[]}),this.joinPush.receive("error",r=>{this.state=K.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,r),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=K.closed,this.socket.remove(this)}),this.onError(r=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,r),this.isJoining()&&this.joinPush.reset(),this.state=K.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new Ct(this,be.leave,st({}),this.timeout).send(),this.state=K.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(be.reply,(r,n)=>{this.trigger(this.replyEventName(n),r)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=K.closed,this.bindings=[]}onClose(t){this.on(be.close,t)}onError(t){return this.on(be.error,e=>t(e))}on(t,e){let s=this.bindingRef++;return this.bindings.push({event:t,ref:s,callback:e}),s}off(t,e){this.bindings=this.bindings.filter(s=>!(s.event===t&&(typeof e>"u"||e===s.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,s=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let r=new Ct(this,t,function(){return e},s);return this.canPush()?r.send():(r.startTimeout(),this.pushBuffer.push(r)),r}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=K.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(be.close,"leave")},s=new Ct(this,be.leave,st({}),t);return s.receive("ok",()=>e()).receive("timeout",()=>e()),s.send(),this.canPush()||s.trigger("ok",{}),s}onMessage(t,e,s){return e}filterBindings(t,e,s){return!0}isMember(t,e,s,r){return this.topic!==t?!1:r&&r!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:s,joinRef:r}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=K.joining,this.joinPush.resend(t))}trigger(t,e,s,r){let n=this.onMessage(t,e,s,r);if(e&&!n)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let i=this.bindings.filter(a=>a.event===t&&this.filterBindings(a,e,s));for(let a=0;a<i.length;a++)i[a].callback(n,s,r||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===K.closed}isErrored(){return this.state===K.errored}isJoined(){return this.state===K.joined}isJoining(){return this.state===K.joining}isLeaving(){return this.state===K.leaving}},Ht=class{static request(t,e,s,r,n,i,a){if(fe.XDomainRequest){let o=new fe.XDomainRequest;return this.xdomainRequest(o,t,e,r,n,i,a)}else if(fe.XMLHttpRequest){let o=new fe.XMLHttpRequest;return this.xhrRequest(o,t,e,s,r,n,i,a)}else{if(fe.fetch&&fe.AbortController)return this.fetchRequest(t,e,s,r,n,i,a);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,s,r,n,i,a){let o={method:t,headers:s,body:r},l=null;return n&&(l=new AbortController,setTimeout(()=>l.abort(),n),o.signal=l.signal),fe.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>a&&a(c)).catch(c=>{c.name==="AbortError"&&i?i():a&&a(null)}),l}static xdomainRequest(t,e,s,r,n,i,a){return t.timeout=n,t.open(e,s),t.onload=()=>{let o=this.parseJSON(t.responseText);a&&a(o)},i&&(t.ontimeout=i),t.onprogress=()=>{},t.send(r),t}static xhrRequest(t,e,s,r,n,i,a,o){t.open(e,s,!0),t.timeout=i;for(let[l,c]of Object.entries(r))t.setRequestHeader(l,c);return t.onerror=()=>o&&o(null),t.onreadystatechange=()=>{if(t.readyState===ei.complete&&o){let l=this.parseJSON(t.responseText);o(l)}},a&&(t.ontimeout=a),t.send(n),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let s=[];for(var r in t){if(!Object.prototype.hasOwnProperty.call(t,r))continue;let n=e?`${e}[${r}]`:r,i=t[r];typeof i=="object"?s.push(this.serialize(i,n)):s.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}return s.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let s=t.match(/\?/)?"&":"?";return`${t}${s}${this.serialize(e)}`}},si=t=>{let e="",s=new Uint8Array(t),r=s.byteLength;for(let n=0;n<r;n++)e+=String.fromCharCode(s[n]);return btoa(e)},He=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(ws)&&(this.authToken=atob(e[1].slice(ws.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=pe.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+bs.websocket),"$1/"+bs.longpoll)}endpointURL(){return Ht.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,s){this.close(t,e,s),this.readyState=pe.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===pe.open||this.readyState===pe.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:s,token:r,messages:n}=e;if(s===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=r}else s=0;switch(s){case 200:n.forEach(i=>{setTimeout(()=>this.onmessage({data:i}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=pe.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${s}`)}})}send(t){typeof t!="string"&&(t=si(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t,e=0){this.awaitingBatchAck=!0;const s=e+Qn,r=t.slice(e,s);this.ajax("POST",{"Content-Type":"application/x-ndjson"},r.join(`
`),()=>this.onerror("timeout"),n=>{!n||n.status!==200?(this.awaitingBatchAck=!1,this.onerror(n&&n.status),this.closeAndRetry(1011,"internal server error",!1)):s<t.length?this.batchSend(t,s):this.batchBuffer.length>0?(this.batchSend(this.batchBuffer),this.batchBuffer=[]):this.awaitingBatchAck=!1})}close(t,e,s){for(let n of this.reqs)n.abort();this.readyState=pe.closed;let r=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:s});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",r)):this.onclose(r)}ajax(t,e,s,r,n){let i,a=()=>{this.reqs.delete(i),r()};i=Ht.request(t,this.endpointURL(),e,s,this.timeout,a,o=>{this.reqs.delete(i),this.isActive()&&n(o)}),this.reqs.add(i)}},ri=class ut{constructor(e,s={}){let r=s.events||{state:"presence_state",diff:"presence_diff"};this.state=Object.create(null),this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(r.state,n=>{let{onJoin:i,onLeave:a,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=ut.syncState(this.state,n,i,a),this.pendingDiffs.forEach(l=>{this.state=ut.syncDiff(this.state,l,i,a)}),this.pendingDiffs=[],o()}),this.channel.on(r.diff,n=>{let{onJoin:i,onLeave:a,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(n):(this.state=ut.syncDiff(this.state,n,i,a),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return ut.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,s,r,n){let i=this.toNullProtoObj(this.clone(e));s=this.toNullProtoObj(s);let a=Object.create(null),o=Object.create(null);return this.map(i,(l,c)=>{s[l]||(o[l]=c)}),this.map(s,(l,c)=>{let u=i[l];if(u){let d=c.metas.map(g=>g.phx_ref),f=u.metas.map(g=>g.phx_ref),h=c.metas.filter(g=>f.indexOf(g.phx_ref)<0),p=u.metas.filter(g=>d.indexOf(g.phx_ref)<0);h.length>0&&(a[l]=c,a[l].metas=h),p.length>0&&(o[l]=this.clone(u),o[l].metas=p)}else a[l]=c}),this.syncDiff(i,{joins:a,leaves:o},r,n)}static syncDiff(e,s,r,n){e=this.toNullProtoObj(e);let{joins:i,leaves:a}=this.clone(s);return r||(r=function(){}),n||(n=function(){}),this.map(i,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let u=e[o].metas.map(f=>f.phx_ref),d=c.metas.filter(f=>u.indexOf(f.phx_ref)<0);e[o].metas.unshift(...d)}r(o,c,l)}),this.map(a,(o,l)=>{let c=e[o];if(!c)return;let u=l.metas.map(d=>d.phx_ref);c.metas=c.metas.filter(d=>u.indexOf(d.phx_ref)<0),n(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,s){return s||(s=function(r,n){return n}),this.map(e,(r,n)=>s(r,n))}static map(e,s){return Object.getOwnPropertyNames(e).map(r=>s(r,e[r]))}static toNullProtoObj(e){if(Object.getPrototypeOf(e)===null)return e;let s=Object.create(null);return Object.getOwnPropertyNames(e).forEach(r=>{s[r]=e[r]}),s}static clone(e){return JSON.parse(JSON.stringify(e))}},Lt={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let s=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(s))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[s,r,n,i,a]=JSON.parse(t);return e({join_ref:s,ref:r,topic:n,event:i,payload:a})}},binaryEncode(t){let{join_ref:e,ref:s,event:r,topic:n,payload:i}=t,a=new TextEncoder,o=a.encode(e),l=a.encode(s),c=a.encode(n),u=a.encode(r);this.assertFieldSize(o.byteLength,"join_ref"),this.assertFieldSize(l.byteLength,"ref"),this.assertFieldSize(c.byteLength,"topic"),this.assertFieldSize(u.byteLength,"event");let d=this.META_LENGTH+o.byteLength+l.byteLength+c.byteLength+u.byteLength,f=new ArrayBuffer(this.HEADER_LENGTH+d),h=new Uint8Array(f),p=new DataView(f),g=0;p.setUint8(g++,this.KINDS.push),p.setUint8(g++,o.byteLength),p.setUint8(g++,l.byteLength),p.setUint8(g++,c.byteLength),p.setUint8(g++,u.byteLength),h.set(o,g),g+=o.byteLength,h.set(l,g),g+=l.byteLength,h.set(c,g),g+=c.byteLength,h.set(u,g),g+=u.byteLength;var y=new Uint8Array(f.byteLength+i.byteLength);return y.set(h,0),y.set(new Uint8Array(i),f.byteLength),y.buffer},assertFieldSize(t,e){if(t>255)throw new Error(`unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${t} bytes`)},binaryDecode(t){let e=new DataView(t),s=e.getUint8(0),r=new TextDecoder;switch(s){case this.KINDS.push:return this.decodePush(t,e,r);case this.KINDS.reply:return this.decodeReply(t,e,r);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,r)}},decodePush(t,e,s){let r=e.getUint8(1),n=e.getUint8(2),i=e.getUint8(3),a=this.HEADER_LENGTH+this.META_LENGTH-1,o=s.decode(t.slice(a,a+r));a=a+r;let l=s.decode(t.slice(a,a+n));a=a+n;let c=s.decode(t.slice(a,a+i));a=a+i;let u=t.slice(a,t.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:u}},decodeReply(t,e,s){let r=e.getUint8(1),n=e.getUint8(2),i=e.getUint8(3),a=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=s.decode(t.slice(o,o+r));o=o+r;let c=s.decode(t.slice(o,o+n));o=o+n;let u=s.decode(t.slice(o,o+i));o=o+i;let d=s.decode(t.slice(o,o+a));o=o+a;let f=t.slice(o,t.byteLength),h={status:d,response:f};return{join_ref:l,ref:c,topic:u,event:be.reply,payload:h}},decodeBroadcast(t,e,s){let r=e.getUint8(1),n=e.getUint8(2),i=this.HEADER_LENGTH+2,a=s.decode(t.slice(i,i+r));i=i+r;let o=s.decode(t.slice(i,i+n));i=i+n;let l=t.slice(i,t.byteLength);return{join_ref:null,ref:null,topic:a,event:o,payload:l}}},ni=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||Xn,this.transport=e.transport||fe.WebSocket||He,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let s=null;try{s=fe&&fe.sessionStorage}catch{}this.sessionStore=e.sessionStorage||s,this.establishedConnections=0,this.defaultEncoder=Lt.encode.bind(Lt),this.defaultDecoder=Lt.decode.bind(Lt),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==He?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let r=null;Ze&&Ze.addEventListener&&(Ze.addEventListener("pagehide",n=>{this.conn&&(this.disconnect(),r=this.connectClock)}),Ze.addEventListener("pageshow",n=>{r===this.connectClock&&(r=null,this.connect())}),Ze.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=n=>e.rejoinAfterMs?e.rejoinAfterMs(n):[1e3,2e3,5e3][n-1]||1e4,this.reconnectAfterMs=n=>e.reconnectAfterMs?e.reconnectAfterMs(n):[10,50,100,150,200,250,500,1e3,2e3][n-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(n,i,a)=>{console.log(`${n}: ${i}`,a)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=st(e.params||{}),this.endPoint=`${t}/${bs.websocket}`,this.vsn=e.vsn||Yn,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new Mr(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken&&st(e.authToken)}getLongPollTransport(){return He}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=Ht.appendParams(Ht.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,s){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,s)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=st(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==He?this.connectWithFallback(He,this.longPollFallbackMs):this.transportConnect())}log(t,e,s){this.logger&&this.logger(t,e,s)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),s=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let r=this.onMessage(n=>{n.ref===e&&(this.off([r]),t(Date.now()-s))});return!0}transportName(t){switch(t){case He:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${ws}${btoa(this.authToken()).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let s=!1,r=!0,n,i,a=this.transportName(t),o=l=>{this.log("transport",`falling back to ${a}...`,l),this.off([n,i]),r=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),i=this.onError(l=>{this.log("transport","error",l),r&&!s&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(s=!0,!r){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),Zn,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,s){if(!this.conn)return t&&t();const r=this.conn;this.waitForBufferDone(r,()=>{e?r.close(e,s||""):r.close(),this.waitForSocketClosed(r,()=>{this.conn===r&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,s=1){if(s===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,s+1)},150*s)}waitForSocketClosed(t,e,s=1){if(s===5||t.readyState===pe.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,s+1)},150*s)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(t),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport","error",t);let e=this.transport,s=this.establishedConnections;this.triggerStateCallbacks("error",t,e,s),(e===this.transport||s>0)&&this.triggerChanError(t)}triggerChanError(t){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(be.error,t)})}connectionState(){switch(this.conn&&this.conn.readyState){case pe.connecting:return"connecting";case pe.open:return"open";case pe.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([s])=>t.indexOf(s)===-1)}channel(t,e={}){let s=new ti(t,e,this);return this.channels.push(s),s}push(t){if(this.hasLogger()){let{topic:e,event:s,payload:r,ref:n,join_ref:i}=t;this.log("push",`${e} ${s} (${i}, ${n})`,r)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:s,event:r,payload:n,ref:i,join_ref:a}=e;if(i&&i===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(n.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${n.status||""} ${s} ${r} ${i&&"("+i+")"||""}`.trim(),n);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(s,r,n,a)&&l.trigger(r,n,i,a)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([s,r])=>{try{r(...e)}catch(n){this.log("error",`error in ${t} callback`,n)}})}catch(s){this.log("error",`error triggering ${t} callbacks`,s)}}leaveOpenTopic(t){let e=this.channels.find(s=>s.topic===t&&(s.isJoined()||s.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class pt{constructor(e,s){const r=ai(s);this.presence=new ri(e.getChannel(),r),this.presence.onJoin((n,i,a)=>{const o=pt.onJoinPayload(n,i,a);e.getChannel().trigger("presence",o)}),this.presence.onLeave((n,i,a)=>{const o=pt.onLeavePayload(n,i,a);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return pt.transformState(this.presence.state)}static transformState(e){return e=ii(e),Object.getOwnPropertyNames(e).reduce((s,r)=>{const n=e[r];return s[r]=Mt(n),s},{})}static onJoinPayload(e,s,r){const n=Ws(s),i=Mt(r);return{event:"join",key:e,currentPresences:n,newPresences:i}}static onLeavePayload(e,s,r){const n=Ws(s),i=Mt(r);return{event:"leave",key:e,currentPresences:n,leftPresences:i}}}function Mt(t){return t.metas.map(e=>{const s=Object.getOwnPropertyDescriptors(e),r=Object.defineProperties({},s);return r.presence_ref=r.phx_ref,delete r.phx_ref,delete r.phx_ref_prev,r})}function ii(t){return JSON.parse(JSON.stringify(t))}function ai(t){return(t==null?void 0:t.events)&&{events:t.events}}function Ws(t){return t!=null&&t.metas?Mt(t):[]}var Vs;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(Vs||(Vs={}));class oi{get state(){return this.presenceAdapter.state}constructor(e,s){this.channel=e,this.presenceAdapter=new pt(this.channel.channelAdapter,s)}}function li(t){if(t instanceof Error)return t;if(typeof t=="string")return new Error(t);if(t&&typeof t=="object"){const e=t;if(typeof e.code=="number"){const s=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${s}`,{cause:t})}return new Error("channel error: transport failure",{cause:t})}return new Error("channel error: connection lost")}class ci{constructor(e,s,r){const n=di(r);this.channel=e.getSocket().channel(s,n),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,s){return this.channel.on(e,s)}off(e,s){this.channel.off(e,s)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,s,r){let n;try{n=this.channel.push(e,s,r)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>zn){const i=this.channel.pushBuffer.shift();i.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${i.event}`,i.payload())}return n}updateJoinPayload(e){const s=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},s),e)}canPush(){return this.socket.isConnected()&&this.state===Le.joined}isJoined(){return this.state===Le.joined}isJoining(){return this.state===Le.joining}isClosed(){return this.state===Le.closed}isLeaving(){return this.state===Le.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function di(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}const ui=/[,()"\\]/,hi=t=>ui.test(t)||t!==t.trim(),fi=t=>`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`,Ks=t=>{const e=t===null?"null":String(t);return hi(e)?fi(e):e},pi=t=>t===null?"null":String(t),gi=(t,e)=>{if(t==="in"){const s=Array.isArray(e)?e:[e];if(s.length===0)throw new Error("Realtime `in` filter requires at least one value.");return`in.(${Array.from(new Set(s)).map(n=>Ks(n)).join(",")})`}return t==="is"?`is.${pi(e)}`:`${t}.${Ks(e)}`};class mi{constructor(){this.filters=[]}add(e,s,r,n=!1){const i=n?"not.":"";return this.filters.push(`${e}=${i}${gi(s,r)}`),this}eq(e,s){return this.add(e,"eq",s)}neq(e,s){return this.add(e,"neq",s)}gt(e,s){return this.add(e,"gt",s)}gte(e,s){return this.add(e,"gte",s)}lt(e,s){return this.add(e,"lt",s)}lte(e,s){return this.add(e,"lte",s)}in(e,s){return this.add(e,"in",s)}like(e,s){return this.add(e,"like",s)}ilike(e,s){return this.add(e,"ilike",s)}match(e,s){return this.add(e,"match",s)}imatch(e,s){return this.add(e,"imatch",s)}is(e,s){return this.add(e,"is",s)}isDistinct(e,s){return this.add(e,"isdistinct",s)}not(e,s,r){return this.add(e,s,r,!0)}build(){return this.filters.join(",")}toString(){return this.build()}}var Js;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(Js||(Js={}));var et;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(et||(et={}));var we;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(we||(we={}));class gt{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,s={config:{}},r){var n,i;if(this.topic=e,this.params=s,this.socket=r,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},s.config),this.channelAdapter=new ci(this.socket.socketAdapter,e,this.params),this.presence=new oi(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Ur(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((i=(n=this.params.config)===null||n===void 0?void 0:n.broadcast)===null||i===void 0)&&i.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,s=this.timeout){var r,n,i;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:a,presence:o,private:l}}=this.params,c=(n=(r=this.bindings.postgres_changes)===null||r===void 0?void 0:r.map(h=>h.filter))!==null&&n!==void 0?n:[],u=!!this.bindings[et.PRESENCE]&&this.bindings[et.PRESENCE].length>0||((i=this.params.config.presence)===null||i===void 0?void 0:i.enabled)===!0,d={},f={broadcast:a,presence:Object.assign(Object.assign({},o),{enabled:u}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(d.access_token=this.socket.accessTokenValue),this._onError(h=>{e==null||e(we.CHANNEL_ERROR,li(h))}),this._onClose(()=>e==null?void 0:e(we.CLOSED)),this.updateJoinPayload(Object.assign({config:f},d)),this._updateFilterMessage(),this.channelAdapter.subscribe(s).receive("ok",async({postgres_changes:h})=>{if(this.socket._isManualToken()||this.socket.setAuth(),h===void 0){e==null||e(we.SUBSCRIBED);return}this._updatePostgresBindings(h,e)}).receive("error",h=>{this.state=Le.errored;const p=Object.values(h).join(", ")||"error";e==null||e(we.CHANNEL_ERROR,new Error(p,{cause:h}))}).receive("timeout",()=>{e==null||e(we.TIMED_OUT)})}return this}_updatePostgresBindings(e,s){var r;const n=this.bindings.postgres_changes,i=(r=n==null?void 0:n.length)!==null&&r!==void 0?r:0,a=[];for(let o=0;o<i;o++){const l=n[o],{filter:{event:c,schema:u,table:d,filter:f}}=l,h=e&&e[o];if(h&&h.event===c&&gt.isFilterValueEqual(h.schema,u)&&gt.isFilterValueEqual(h.table,d)&&gt.isFilterValueEqual(h.filter,f))a.push(Object.assign(Object.assign({},l),{id:h.id}));else{this.unsubscribe(),this.state=Le.errored,s==null||s(we.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=a,this.state!=Le.errored&&s&&s(we.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,s={}){return await this.send({type:"presence",event:"track",payload:e},s)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,s,r){const n=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),i=e===et.PRESENCE||e===et.POSTGRES_CHANGES;if(n&&i)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,s,r)}async httpSend(e,s,r={}){var n;if(s==null)return Promise.reject(new Error("Payload is required for httpSend()"));const i=s instanceof ArrayBuffer||ArrayBuffer.isView(s),a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":i?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:a,body:i?s:JSON.stringify(s)},c=await this._fetchWithTimeout(o.toString(),l,(n=r.timeout)!==null&&n!==void 0?n:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let u=c.statusText;try{const d=await c.json();u=d.error||d.message||u}catch{}return Promise.reject(new Error(u))}async send(e,s={}){var r,n;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:i,payload:a}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:i,payload:a,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(r=s.timeout)!==null&&r!==void 0?r:this.timeout);return await((n=c.body)===null||n===void 0?void 0:n.cancel()),c.ok?"ok":"error"}catch(c){return c instanceof Error&&c.name==="AbortError"?"timed out":"error"}}else return new Promise(i=>{var a,o,l;const c=this.channelAdapter.push(e.type,e,s.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(a=this.params)===null||a===void 0?void 0:a.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&i("ok"),c.receive("ok",()=>i("ok")),c.receive("error",()=>i("error")),c.receive("timeout",()=>i("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(s=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>s("ok")).receive("timeout",()=>s("timed out")).receive("error",()=>s("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,s,r){const n=new AbortController,i=setTimeout(()=>n.abort(),r),a=await this.socket.fetch(e,Object.assign(Object.assign({},s),{signal:n.signal}));return clearTimeout(i),a}_on(e,s,r){const n=e.toLocaleLowerCase(),i=s==null?void 0:s.filter;(i instanceof mi||typeof i=="object"&&i!==null&&typeof i.build=="function")&&(s=Object.assign(Object.assign({},s),{filter:i.build()}));const a=this.channelAdapter.on(e,r),o={type:n,filter:s,callback:r,ref:a};return this.bindings[n]?this.bindings[n].push(o):this.bindings[n]=[o],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,s,r)=>{var n,i,a,o,l,c,u;const d=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(d,r))return!1;const f=(n=this.bindings[d])===null||n===void 0?void 0:n.find(h=>h.ref===e.ref);if(!f)return!0;if(["broadcast","presence","postgres_changes"].includes(d))if("id"in f){const h=f.id,p=(i=f.filter)===null||i===void 0?void 0:i.event;return h&&((a=s.ids)===null||a===void 0?void 0:a.includes(h))&&(p==="*"||(p==null?void 0:p.toLocaleLowerCase())===((o=s.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const h=(c=(l=f==null?void 0:f.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return h==="*"||h===((u=s==null?void 0:s.event)===null||u===void 0?void 0:u.toLocaleLowerCase())}else return f.type.toLocaleLowerCase()===d})}_notThisChannelEvent(e,s){const{close:r,error:n,leave:i,join:a}=Dr;return s&&[r,n,i,a].includes(e)&&s!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,s,r)=>{if(typeof s=="object"&&"ids"in s){const n=s.data,{schema:i,table:a,commit_timestamp:o,type:l,errors:c}=n;return Object.assign(Object.assign({},{schema:i,table:a,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(n))}return s})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const s in e.bindings)for(const r of e.bindings[s])this._on(r.type,r.filter,r.callback)}static isFilterValueEqual(e,s){return(e??void 0)===(s??void 0)}_getPayloadRecords(e){const s={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(s.new=Hs(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(s.old=Hs(e.columns,e.old_record)),s}}class vi{constructor(e,s){this.socket=new ni(e,s)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,s,r,n=1e4){return new Promise(i=>{setTimeout(()=>i("timeout"),n),this.socket.disconnect(()=>{e(),i("ok")},s,r)})}push(e){this.socket.push(e)}log(e,s,r){this.socket.log(e,s,r)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==vs.connecting}isDisconnecting(){return this.socket.connectionState()==vs.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Gs={HEARTBEAT_INTERVAL:25e3},yi=[1e3,2e3,5e3,1e4],bi=1e4;function wi(){const t=new Map;return{get length(){return t.size},clear(){t.clear()},getItem(e){return t.has(e)?t.get(e):null},key(e){var s;return(s=Array.from(t.keys())[e])!==null&&s!==void 0?s:null},removeItem(e){t.delete(e)},setItem(e,s){t.set(e,String(s))}}}function ki(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return wi()}const xi=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class _i{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,s){var r;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new Fn,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=i=>i?(...a)=>i(...a):(...a)=>fetch(...a),!(!((r=s==null?void 0:s.params)===null||r===void 0)&&r.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=s.params.apikey;const n=this._initializeOptions(s);this.socketAdapter=new vi(e,n),this.httpEndpoint=Ur(e),this.fetch=this._resolveFetch(s==null?void 0:s.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const s=e.message;throw new Error(`WebSocket not available: ${s}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,s){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,s)}getChannels(){return this.channels}async removeChannel(e){const s=await e.unsubscribe();return s==="ok"&&e.teardown(),s}async removeAllChannels(){const e=this.channels.map(async r=>{const n=await r.unsubscribe();return r.teardown(),n}),s=await Promise.all(e);return await this.disconnect(),s}log(e,s,r){this.socketAdapter.log(e,s,r)}connectionState(){return this.socketAdapter.connectionState()||vs.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,s={config:{}}){const r=`realtime:${e}`,n=this.getChannels().find(i=>i.topic===r);if(n)return n;{const i=new gt(`realtime:${e}`,s,this);return this._cancelPendingDisconnect(),this.channels.push(i),i}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(s=>s.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e=null){let s,r=!1;if(e)s=e,r=!0;else if(this.accessToken)try{s=await this.accessToken()}catch(n){this.log("error","Error fetching access token from callback",n),s=this.accessTokenValue}else s=this.accessTokenValue;r?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=s&&(this.accessTokenValue=s,this.channels.forEach(n=>{const i={access_token:s,version:Dn};s&&n.updateJoinPayload(i),n.joinedOnce&&n.channelAdapter.isJoined()&&n.channelAdapter.push(Dr.access_token,{access_token:s})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(s=>{this.log("error",`Error setting auth in ${e}`,s)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(s=>{this.log("error","error waiting for auth on connect",s)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(s,r)=>{s!=="disconnected"&&(s=="sent"&&this._setAuthSafely(),e&&e(s,r))}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=s=>{this.log("worker","worker error",s.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=s=>{s.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let s;if(e)s=e;else{const r=new Blob([xi],{type:"application/javascript"});s=URL.createObjectURL(r)}return s}_initializeOptions(e){var s,r,n,i,a,o,l,c,u,d,f,h;this.worker=(s=e==null?void 0:e.worker)!==null&&s!==void 0?s:!1,this.accessToken=(r=e==null?void 0:e.accessToken)!==null&&r!==void 0?r:null;const p={};p.timeout=(n=e==null?void 0:e.timeout)!==null&&n!==void 0?n:Mn,p.heartbeatIntervalMs=(i=e==null?void 0:e.heartbeatIntervalMs)!==null&&i!==void 0?i:Gs.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(a=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&a!==void 0?a:2*((o=e==null?void 0:e.heartbeatIntervalMs)!==null&&o!==void 0?o:Gs.HEARTBEAT_INTERVAL),p.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:On.getWebSocketConstructor(),p.params=e==null?void 0:e.params,p.logger=e==null?void 0:e.logger,p.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),p.sessionStorage=(c=e==null?void 0:e.sessionStorage)!==null&&c!==void 0?c:ki(),p.reconnectAfterMs=(u=e==null?void 0:e.reconnectAfterMs)!==null&&u!==void 0?u:x=>yi[x-1]||bi;let g,y;const v=(d=e==null?void 0:e.vsn)!==null&&d!==void 0?d:Un;switch(v){case Nn:g=(x,m)=>m(JSON.stringify(x)),y=(x,m)=>m(JSON.parse(x));break;case jr:g=this.serializer.encode.bind(this.serializer),y=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${p.vsn}`)}if(p.vsn=v,p.encode=(f=e==null?void 0:e.encode)!==null&&f!==void 0?f:g,p.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:y,p.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,p.params=Object.assign(Object.assign({},p.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,p.autoSendHeartbeat=!this.worker}return p}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var vt=class extends Error{constructor(t,e){var s;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((s=e.icebergType)==null?void 0:s.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Ei(t,e,s){const r=new URL(e,t);if(s)for(const[n,i]of Object.entries(s))i!==void 0&&r.searchParams.set(n,i);return r.toString()}async function Si(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function Ri(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:s,path:r,query:n,body:i,headers:a}){const o=Ei(t.baseUrl,r,n),l=await Si(t.auth),c=await e(o,{method:s,headers:{...i?{"Content-Type":"application/json"}:{},...l,...a},body:i?JSON.stringify(i):void 0}),u=await c.text(),d=(c.headers.get("content-type")||"").includes("application/json"),f=d&&u?JSON.parse(u):u;if(!c.ok){const h=d?f:void 0,p=h==null?void 0:h.error;throw new vt((p==null?void 0:p.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:p==null?void 0:p.type,icebergCode:p==null?void 0:p.code,details:h})}return{status:c.status,headers:c.headers,data:f}}}}function It(t){return t.join("")}var Ti=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:It(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(r=>({namespace:r}))}async createNamespace(t,e){const s={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:s})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${It(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${It(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${It(t.namespace)}`}),!0}catch(e){if(e instanceof vt&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(s){if(s instanceof vt&&s.status===409)return;throw s}}};function We(t){return t.join("")}var Ai=class{constructor(t,e="",s){this.client=t,this.prefix=e,this.accessDelegation=s}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const s={};return this.accessDelegation&&(s["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables`,body:e,headers:s})).data.metadata}async updateTable(t,e){const s=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":s.data["metadata-location"],metadata:s.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${We(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(s){if(s instanceof vt&&s.status===404)return!1;throw s}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(s){if(s instanceof vt&&s.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw s}}},$i=class{constructor(t){var r;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const s=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=Ri({baseUrl:s,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(r=t.accessDelegation)==null?void 0:r.join(","),this.namespaceOps=new Ti(this.client,e),this.tableOps=new Ai(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}};function yt(t){"@babel/helpers - typeof";return yt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},yt(t)}function Ci(t,e){if(yt(t)!="object"||!t)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var r=s.call(t,e);if(yt(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Li(t){var e=Ci(t,"string");return yt(e)=="symbol"?e:e+""}function Ii(t,e,s){return(e=Li(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function Ys(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),s.push.apply(s,r)}return s}function $(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]!=null?arguments[e]:{};e%2?Ys(Object(s),!0).forEach(function(r){Ii(t,r,s[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):Ys(Object(s)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(s,r))})}return t}var es=class extends Error{constructor(t,e="storage",s,r){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=s,this.statusCode=r}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function ts(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var ks=class extends es{constructor(t,e,s,r="storage",n){super(t,r,e,s),this.name=r==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=s,this.code=n}toJSON(){return $($({},super.toJSON()),{},{code:this.code})}},zr=class extends es{constructor(t,e,s="storage"){super(t,s),this.name=s==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function Wt(t,e,s){const r=$({},t),n=e.toLowerCase();for(const i of Object.keys(r))i.toLowerCase()===n&&delete r[i];return r[n]=s,r}function Pi(t){const e={};for(const[s,r]of Object.entries(t))e[s.toLowerCase()]=r;return e}const Bi=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Oi=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},xs=t=>{if(Array.isArray(t))return t.map(s=>xs(s));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([s,r])=>{const n=s.replace(/([-_][a-z])/gi,i=>i.toUpperCase().replace(/[-_]/g,""));e[n]=xs(r)}),e},ji=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t),Fr=t=>t.split("/").map(encodeURIComponent).join("/"),Xs=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const s=e.error;if(typeof s.message=="string")return s.message}}return JSON.stringify(t)},Di=async(t,e,s,r)=>{if(t!==null&&typeof t=="object"&&"json"in t&&typeof t.json=="function"){const n=t;let i=parseInt(String(n.status),10);Number.isFinite(i)||(i=500),n.json().then(a=>{const o=(a==null?void 0:a.statusCode)||(a==null?void 0:a.code)||i+"";e(new ks(Xs(a),i,o,r,a==null?void 0:a.code))}).catch(()=>{const a=i+"";e(new ks(n.statusText||`HTTP ${i} error`,i,a,r))})}else e(new zr(Xs(t),t,r))},Ni=(t,e,s,r)=>{const n={method:t,headers:(e==null?void 0:e.headers)||{}};if(t==="GET"||t==="HEAD"||!r)return $($({},n),s);if(Oi(r)){var i;const a=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(a))l.toLowerCase()==="content-type"&&(o=c);n.headers=Wt(a,"Content-Type",(i=o)!==null&&i!==void 0?i:"application/json"),n.body=JSON.stringify(r)}else n.body=r;return e!=null&&e.duplex&&(n.duplex=e.duplex),$($({},n),s)};async function lt(t,e,s,r,n,i,a){return new Promise((o,l)=>{t(s,Ni(e,r,n,i)).then(c=>{if(!c.ok)throw c;if(r!=null&&r.noResolveJson)return c;if(a==="vectors"){const u=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!u||!u.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>Di(c,l,r,a))})}function qr(t="storage"){return{get:async(e,s,r,n)=>lt(e,"GET",s,r,n,void 0,t),post:async(e,s,r,n,i)=>lt(e,"POST",s,n,i,r,t),put:async(e,s,r,n,i)=>lt(e,"PUT",s,n,i,r,t),head:async(e,s,r,n)=>lt(e,"HEAD",s,$($({},r),{},{noResolveJson:!0}),n,void 0,t),remove:async(e,s,r,n,i)=>lt(e,"DELETE",s,n,i,r,t)}}const Ui=qr("storage"),{get:bt,post:oe,put:_s,head:Mi,remove:wt}=Ui,X=qr("vectors");var it=class{constructor(t,e={},s,r="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=Pi(e),this.fetch=Bi(s),this.namespace=r}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=Wt(this.headers,t,e),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(s){if(e.shouldThrowOnError)throw s;if(ts(s))return{data:null,error:s};throw s}}};let Hr;Hr=Symbol.toStringTag;var zi=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[Hr]="StreamDownloadBuilder",this.promise=null}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(ts(e))return{data:null,error:e};throw e}}};let Wr;Wr=Symbol.toStringTag;var Fi=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[Wr]="BlobDownloadBuilder",this.promise=null}asStream(){return new zi(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(ts(e))return{data:null,error:e};throw e}}};const os={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},Zs={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var qi=class extends it{constructor(t,e={},s,r){super(t,e,r,"storage"),this.bucketId=s}async uploadOrUpdate(t,e,s,r){var n=this;return n.handleOperation(async()=>{let i;const a=$($({},Zs),r);let o=$($({},n.headers),t==="POST"&&{"x-upsert":String(a.upsert)});const l=a.metadata;if(typeof Blob<"u"&&s instanceof Blob?(i=new FormData,i.append("cacheControl",a.cacheControl),l&&i.append("metadata",n.encodeMetadata(l)),i.append("",s)):typeof FormData<"u"&&s instanceof FormData?(i=s,i.has("cacheControl")||i.append("cacheControl",a.cacheControl),l&&!i.has("metadata")&&i.append("metadata",n.encodeMetadata(l))):(i=s,o["cache-control"]=`max-age=${a.cacheControl}`,o["content-type"]=a.contentType,l&&(o["x-metadata"]=n.toBase64(n.encodeMetadata(l))),(typeof ReadableStream<"u"&&i instanceof ReadableStream||i&&typeof i=="object"&&"pipe"in i&&typeof i.pipe=="function")&&!a.duplex&&(a.duplex="half")),r!=null&&r.headers)for(const[f,h]of Object.entries(r.headers))o=Wt(o,f,h);const c=n._removeEmptyFolders(e),u=n._getFinalPath(c),d=await(t=="PUT"?_s:oe)(n.fetch,`${n.url}/object/${u}`,i,$({headers:o},a!=null&&a.duplex?{duplex:a.duplex}:{}));return{path:c,id:d.Id,fullPath:d.Key}})}async upload(t,e,s){return this.uploadOrUpdate("POST",t,e,s)}async uploadToSignedUrl(t,e,s,r){var n=this;const i=n._removeEmptyFolders(t),a=n._getFinalPath(i),o=new URL(n.url+`/object/upload/sign/${a}`);return o.searchParams.set("token",e),n.handleOperation(async()=>{let l;const c=$($({},Zs),r);let u=$($({},n.headers),{"x-upsert":String(c.upsert)});const d=c.metadata;if(typeof Blob<"u"&&s instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),d&&l.append("metadata",n.encodeMetadata(d)),l.append("",s)):typeof FormData<"u"&&s instanceof FormData?(l=s,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),d&&!l.has("metadata")&&l.append("metadata",n.encodeMetadata(d))):(l=s,u["cache-control"]=`max-age=${c.cacheControl}`,u["content-type"]=c.contentType,d&&(u["x-metadata"]=n.toBase64(n.encodeMetadata(d))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),r!=null&&r.headers)for(const[f,h]of Object.entries(r.headers))u=Wt(u,f,h);return{path:i,fullPath:(await _s(n.fetch,o.toString(),l,$({headers:u},c!=null&&c.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(t,e){var s=this;return s.handleOperation(async()=>{let r=s._getFinalPath(t);const n=$({},s.headers);e!=null&&e.upsert&&(n["x-upsert"]="true");const i=await oe(s.fetch,`${s.url}/object/upload/sign/${r}`,{},{headers:n}),a=new URL(s.url+i.url),o=a.searchParams.get("token");if(!o)throw new es("No token returned by API");return{signedUrl:a.toString(),path:t,token:o}})}async update(t,e,s){return this.uploadOrUpdate("PUT",t,e,s)}async move(t,e,s){var r=this;return r.handleOperation(async()=>await oe(r.fetch,`${r.url}/object/move`,{bucketId:r.bucketId,sourceKey:t,destinationKey:e,destinationBucket:s==null?void 0:s.destinationBucket},{headers:r.headers}))}async copy(t,e,s){var r=this;return r.handleOperation(async()=>({path:(await oe(r.fetch,`${r.url}/object/copy`,{bucketId:r.bucketId,sourceKey:t,destinationKey:e,destinationBucket:s==null?void 0:s.destinationBucket},{headers:r.headers})).Key}))}async createSignedUrl(t,e,s){var r=this;return r.handleOperation(async()=>{let n=r._getFinalPath(t);const i=typeof(s==null?void 0:s.transform)=="object"&&s.transform!==null&&Object.keys(s.transform).length>0;let a=await oe(r.fetch,`${r.url}/object/sign/${n}`,$({expiresIn:e},i?{transform:s.transform}:{}),{headers:r.headers});const o=new URLSearchParams;s!=null&&s.download&&o.set("download",s.download===!0?"":s.download),(s==null?void 0:s.cacheNonce)!=null&&o.set("cacheNonce",String(s.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${r.url}${a.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,s){var r=this;return r.handleOperation(async()=>{const n=await oe(r.fetch,`${r.url}/object/sign/${r.bucketId}`,{expiresIn:e,paths:t},{headers:r.headers}),i=new URLSearchParams;s!=null&&s.download&&i.set("download",s.download===!0?"":s.download),(s==null?void 0:s.cacheNonce)!=null&&i.set("cacheNonce",String(s.cacheNonce));const a=i.toString();return n.map(o=>$($({},o),{},{signedUrl:o.signedURL?encodeURI(`${r.url}${o.signedURL}${a?`&${a}`:""}`):null}))})}download(t,e,s){const r=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",n=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(n,e.transform),(e==null?void 0:e.cacheNonce)!=null&&n.set("cacheNonce",String(e.cacheNonce));const i=n.toString(),a=this._getFinalPath(t),o=()=>bt(this.fetch,`${this.url}/${r}/${a}${i?`?${i}`:""}`,{headers:this.headers,noResolveJson:!0},s);return new Fi(o,this.shouldThrowOnError)}async info(t){var e=this;const s=e._getFinalPath(t);return e.handleOperation(async()=>xs(await bt(e.fetch,`${e.url}/object/info/${s}`,{headers:e.headers})))}async exists(t){var e=this;const s=e._getFinalPath(t);try{return await Mi(e.fetch,`${e.url}/object/${s}`,{headers:e.headers}),{data:!0,error:null}}catch(n){if(e.shouldThrowOnError)throw n;if(ts(n)){var r;const i=n instanceof ks?n.status:n instanceof zr?(r=n.originalError)===null||r===void 0?void 0:r.status:void 0;if(i!==void 0&&[400,404].includes(i))return{data:!1,error:n}}throw n}}getPublicUrl(t,e){const s=this._getFinalPath(t),r=new URLSearchParams;e!=null&&e.download&&r.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(r,e.transform),(e==null?void 0:e.cacheNonce)!=null&&r.set("cacheNonce",String(e.cacheNonce));const n=r.toString(),i=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${i}/public/${s}`)+(n?`?${n}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await wt(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async purgeCache(t,e,s){var r=this;return r.handleOperation(async()=>{const n=Fr(r._getFinalPath(t)),i=new URLSearchParams;e!=null&&e.transformations&&i.set("transformations","true");const a=i.toString();return await wt(r.fetch,`${r.url}/cdn/${n}${a?`?${a}`:""}`,{},{headers:r.headers},s)})}async list(t,e,s){var r=this;return r.handleOperation(async()=>{const n=e!=null&&e.sortBy?$($({},os.sortBy),e.sortBy):os.sortBy,i=$($($({},os),e),{},{sortBy:n,prefix:t||""});return await oe(r.fetch,`${r.url}/object/list/${r.bucketId}`,i,{headers:r.headers},s)})}async listV2(t,e){var s=this;return s.handleOperation(async()=>{const r=$({},t);return await oe(s.fetch,`${s.url}/object/list-v2/${s.bucketId}`,r,{headers:s.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const Hi="2.112.0",St={"X-Client-Info":`storage-js/${Hi}`};var Wi=class extends it{constructor(t,e={},s,r){const n=new URL(t);r!=null&&r.useNewHostname&&/supabase\.(co|in|red)$/.test(n.hostname)&&!n.hostname.includes("storage.supabase.")&&(n.hostname=n.hostname.replace("supabase.","storage.supabase."));const i=n.href.replace(/\/$/,""),a=$($({},St),e);super(i,a,s,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const s=e.listBucketOptionsToQueryString(t);return await bt(e.fetch,`${e.url}/bucket${s}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await bt(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var s=this;return s.handleOperation(async()=>await oe(s.fetch,`${s.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:s.headers}))}async updateBucket(t,e){var s=this;return s.handleOperation(async()=>await _s(s.fetch,`${s.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:s.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await oe(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await wt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}async purgeBucketCache(t,e,s){var r=this;return r.handleOperation(async()=>{const n=new URLSearchParams;e!=null&&e.transformations&&n.set("transformations","true");const i=n.toString();return await wt(r.fetch,`${r.url}/cdn/${Fr(t)}${i?`?${i}`:""}`,{},{headers:r.headers},s)})}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Vi=class extends it{constructor(t,e={},s){const r=t.replace(/\/$/,""),n=$($({},St),e);super(r,n,s,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await oe(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const s=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&s.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&s.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&s.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&s.set("sortOrder",t.sortOrder),t!=null&&t.search&&s.set("search",t.search);const r=s.toString(),n=r?`${e.url}/bucket?${r}`:`${e.url}/bucket`;return await bt(e.fetch,n,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await wt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!ji(t))throw new es("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const s=new $i({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),r=this.shouldThrowOnError;return new Proxy(s,{get(n,i){const a=n[i];return typeof a!="function"?a:async(...o)=>{try{return{data:await a.apply(n,o),error:null}}catch(l){if(r)throw l;return{data:null,error:l}}}}})}},Ki=class extends it{constructor(t,e={},s){const r=t.replace(/\/$/,""),n=$($({},St),{},{"Content-Type":"application/json"},e);super(r,n,s,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var s=this;return s.handleOperation(async()=>await X.post(s.fetch,`${s.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:s.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var s=this;return s.handleOperation(async()=>await X.post(s.fetch,`${s.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:s.headers})||{})}},Ji=class extends it{constructor(t,e={},s){const r=t.replace(/\/$/,""),n=$($({},St),{},{"Content-Type":"application/json"},e);super(r,n,s,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},Gi=class extends it{constructor(t,e={},s){const r=t.replace(/\/$/,""),n=$($({},St),{},{"Content-Type":"application/json"},e);super(r,n,s,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await X.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},Yi=class extends Gi{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new Xi(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,s=this;return e().call(s,t)}async getBucket(t){var e=()=>super.getBucket,s=this;return e().call(s,t)}async listBuckets(t={}){var e=()=>super.listBuckets,s=this;return e().call(s,t)}async deleteBucket(t){var e=()=>super.deleteBucket,s=this;return e().call(s,t)}},Xi=class extends Ki{constructor(t,e,s,r){super(t,e,r),this.vectorBucketName=s}async createIndex(t){var e=()=>super.createIndex,s=this;return e().call(s,$($({},t),{},{vectorBucketName:s.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,s=this;return e().call(s,$($({},t),{},{vectorBucketName:s.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,s=this;return e().call(s,s.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,s=this;return e().call(s,s.vectorBucketName,t)}index(t){return new Zi(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},Zi=class extends Ji{constructor(t,e,s,r,n){super(t,e,n),this.vectorBucketName=s,this.indexName=r}async putVectors(t){var e=()=>super.putVectors,s=this;return e().call(s,$($({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async getVectors(t){var e=()=>super.getVectors,s=this;return e().call(s,$($({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,s=this;return e().call(s,$($({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,s=this;return e().call(s,$($({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,s=this;return e().call(s,$($({},t),{},{vectorBucketName:s.vectorBucketName,indexName:s.indexName}))}},Qi=class extends Wi{constructor(t,e={},s,r){super(t,e,s,r)}from(t){return new qi(this.url,this.headers,t,this.fetch)}get vectors(){return new Yi(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Vi(this.url+"/iceberg",this.headers,this.fetch)}};const Vr="2.112.0",ke=30*1e3,ht=3,ls=ht*ke,ea=2*ke,ta="http://localhost:9999",sa="supabase.auth.token",ra={"X-Client-Info":`gotrue-js/${Vr}`},Es="X-Supabase-Api-Version",Kr={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},na=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Ne="sb_flow_id",ia=5,aa=10*60*1e3;class kt extends Error{constructor(e,s,r){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=s,this.code=r}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function _(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class oa extends kt{constructor(e,s,r){super(e,s,r),this.name="AuthApiError",this.status=s,this.code=r}}function Qs(t){return _(t)&&t.name==="AuthApiError"}class le extends kt{constructor(e,s){super(e),this.name="AuthUnknownError",this.originalError=s}}class ve extends kt{constructor(e,s,r,n){super(e,r,n),this.name=s,this.status=r}}class q extends ve{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Pt(t){return _(t)&&t.name==="AuthSessionMissingError"}class Ve extends ve{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Bt extends ve{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Ot extends ve{constructor(e,s=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function la(t){return _(t)&&t.name==="AuthImplicitGrantRedirectError"}class er extends ve{constructor(e,s=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class ca extends ve{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ss extends ve{constructor(e,s){super(e,"AuthRetryableFetchError",s,void 0)}}function jt(t){return _(t)&&t.name==="AuthRetryableFetchError"}class tr extends ve{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function da(t){return _(t)&&t.name==="AuthRefreshDiscardedError"}class sr extends ve{constructor(e,s,r){super(e,"AuthWeakPasswordError",s,"weak_password"),this.reasons=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class Vt extends ve{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Kt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),rr=` 	
\r=`.split(""),ua=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<rr.length;e+=1)t[rr[e].charCodeAt(0)]=-2;for(let e=0;e<Kt.length;e+=1)t[Kt[e].charCodeAt(0)]=e;return t})();function nr(t,e,s){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const r=e.queue>>e.queuedBits-6&63;s(Kt[r]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const r=e.queue>>e.queuedBits-6&63;s(Kt[r]),e.queuedBits-=6}}function Jr(t,e,s){const r=ua[t];if(r>-1)for(e.queue=e.queue<<6|r,e.queuedBits+=6;e.queuedBits>=8;)s(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(r===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function ir(t){const e=[],s=a=>{e.push(String.fromCodePoint(a))},r={utf8seq:0,codepoint:0},n={queue:0,queuedBits:0},i=a=>{pa(a,r,s)};for(let a=0;a<t.length;a+=1)Jr(t.charCodeAt(a),n,i);return e.join("")}function ha(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function fa(t,e){for(let s=0;s<t.length;s+=1){let r=t.charCodeAt(s);if(r>55295&&r<=56319){const n=(r-55296)*1024&65535;r=(t.charCodeAt(s+1)-56320&65535|n)+65536,s+=1}ha(r,e)}}function pa(t,e,s){if(e.utf8seq===0){if(t<=127){s(t);return}for(let r=1;r<6;r+=1)if(!(t>>7-r&1)){e.utf8seq=r;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&s(e.codepoint)}}function rt(t){const e=[],s={queue:0,queuedBits:0},r=n=>{e.push(n)};for(let n=0;n<t.length;n+=1)Jr(t.charCodeAt(n),s,r);return new Uint8Array(e)}function ga(t){const e=[];return fa(t,s=>e.push(s)),new Uint8Array(e)}function Ue(t){const e=[],s={queue:0,queuedBits:0},r=n=>{e.push(n)};return t.forEach(n=>nr(n,s,r)),nr(null,s,r),e.join("")}function ma(t){return Math.round(Date.now()/1e3)+t}function va(){return Symbol("auth-callback")}const W=()=>typeof window<"u"&&typeof document<"u",Oe={tested:!1,writable:!1},Gr=()=>{if(!W())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Oe.tested)return Oe.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),Oe.tested=!0,Oe.writable=!0}catch{Oe.tested=!0,Oe.writable=!1}return Oe.writable};function ar(t){const e={},s=new URL(t);if(s.hash&&s.hash[0]==="#")try{new URLSearchParams(s.hash.substring(1)).forEach((n,i)=>{e[i]=n})}catch{}return s.searchParams.forEach((r,n)=>{e[n]=r}),e}const Yr=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),ya=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",_e=async(t,e,s)=>{await t.setItem(e,JSON.stringify(s))},V=async(t,e)=>{const s=await t.getItem(e);if(!s)return null;try{return JSON.parse(s)}catch{return null}},Y=async(t,e)=>{await t.removeItem(e)};class ss{constructor(){this.promise=new ss.promiseConstructor((e,s)=>{this.resolve=e,this.reject=s})}}ss.promiseConstructor=Promise;function Dt(t){const e=t.split(".");if(e.length!==3)throw new Vt("Invalid JWT structure");for(let r=0;r<e.length;r++)if(!na.test(e[r]))throw new Vt("JWT not in base64url format");return{header:JSON.parse(ir(e[0])),payload:JSON.parse(ir(e[1])),signature:rt(e[2]),raw:{header:e[0],payload:e[1]}}}async function ba(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function wa(t,e){return new Promise((r,n)=>{(async()=>{for(let i=0;i<1/0;i++)try{const a=await t(i);if(!e(i,null,a)){r(a);return}}catch(a){if(!e(i,a)){n(a);return}}})()})}function Xr(t){return("0"+t.toString(16)).substr(-2)}function ka(){const e=new Uint32Array(56);if(typeof crypto>"u"){const s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",r=s.length;let n="";for(let i=0;i<56;i++)n+=s.charAt(Math.floor(Math.random()*r));return n}return crypto.getRandomValues(e),Array.from(e,Xr).join("")}async function xa(t){const s=new TextEncoder().encode(t),r=await crypto.subtle.digest("SHA-256",s),n=new Uint8Array(r);return Array.from(n).map(i=>String.fromCharCode(i)).join("")}async function _a(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const s=await xa(t);return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}const Ea=/^[a-zA-Z0-9_-]{8,64}$/;function zt(t){return typeof t=="string"&&Ea.test(t)?t:null}function Sa(){if(typeof crypto<"u"&&typeof crypto.getRandomValues=="function"){const e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e,Xr).join("")}let t="";for(let e=0;e<32;e++)t+=Math.floor(Math.random()*16).toString(16);return t}const nt=(t,e)=>`${t}-flow-${e}-code-verifier`,xt=t=>`${t}-flows-code-verifier`;async function Is(t,e){const s=await V(t,xt(e));return Array.isArray(s)?s.filter(r=>zt(r)!==null):[]}async function Ra(t,e,s,r,n){await _e(t,nt(e,s),r);const i=(await Is(t,e)).filter(a=>a!==s);for(i.push(s);i.length>ia;){const a=i.shift();await Y(t,nt(e,a)),n==null||n(a)}await _e(t,xt(e),i),await _e(t,`${e}-code-verifier`,r)}async function Ta(t,e,s){if(s){const n=await V(t,nt(e,s));return{verifier:typeof n=="string"?n:null,flowId:s}}const r=await V(t,`${e}-code-verifier`);return{verifier:typeof r=="string"?r:null,flowId:null}}async function re(t,e,s){const r=`${e}-code-verifier`;if(!s){await Y(t,r);return}const n=nt(e,s),i=await V(t,n);await Y(t,n);const a=await Is(t,e),o=a.filter(l=>l!==s);o.length!==a.length&&(o.length>0?await _e(t,xt(e),o):await Y(t,xt(e))),i!=null&&i===await V(t,r)&&await Y(t,r)}async function Aa(t,e){const s=await Is(t,e);for(const r of s)await Y(t,nt(e,r));await Y(t,xt(e)),await Y(t,`${e}-code-verifier`)}function $a(t,e){const s=t.indexOf("#");let r=s===-1?t:t.slice(0,s);const n=s===-1?"":t.slice(s),i=r.indexOf("?");if(i!==-1){const o=r.slice(0,i),l=r.slice(i+1).split("&").filter(c=>c!==""&&c!==Ne&&!c.startsWith(`${Ne}=`));r=l.length>0?`${o}?${l.join("&")}`:o}const a=r.includes("?")?"&":"?";return`${r}${a}${Ne}=${encodeURIComponent(e)}${n}`}async function Ca(t,e,s=!1,r){const n=ka();let i=n;s&&(i+="/recovery");const a=Sa();await Ra(t,e,a,i,r);const o=await _a(n);return[o,n===o?"plain":"s256",a]}const La=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Ia(t){const e=t.headers.get(Es);if(!e||!e.match(La))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Pa(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function Ba(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Oa=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function ye(t){if(!Oa.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function ae(t){if(!t.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function cs(){const t={};return new Proxy(t,{get:(e,s)=>{if(s==="__isUserNotAvailableProxy")return!0;if(typeof s=="symbol"){const r=s.toString();if(r==="Symbol(Symbol.toPrimitive)"||r==="Symbol(Symbol.toStringTag)"||r==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${s}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,s)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${s}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,s)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${s}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function ja(t,e){return new Proxy(t,{get:(s,r,n)=>{if(r==="__isInsecureUserWarningProxy")return!0;if(typeof r=="symbol"){const i=r.toString();if(i==="Symbol(Symbol.toPrimitive)"||i==="Symbol(Symbol.toStringTag)"||i==="Symbol(util.inspect.custom)"||i==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(s,r,n)}return!e.value&&typeof r=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(s,r,n)}})}function or(t){return JSON.parse(JSON.stringify(t))}const De=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(t)},Da=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function lr(t){var e;if(!ya(t))throw new Ss(De(t),0);if(Da.includes(t.status))throw new Ss(De(t),t.status);let s;try{s=await t.json()}catch(i){throw new le(De(i),i)}let r;const n=Ia(t);if(n&&n.getTime()>=Kr["2024-01-01"].timestamp&&typeof s=="object"&&s&&typeof s.code=="string"?r=s.code:typeof s=="object"&&s&&typeof s.error_code=="string"&&(r=s.error_code),r){if(r==="weak_password")throw new sr(De(s),t.status,((e=s.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(r==="session_not_found")throw new q}else if(typeof s=="object"&&s&&typeof s.weak_password=="object"&&s.weak_password&&Array.isArray(s.weak_password.reasons)&&s.weak_password.reasons.length&&s.weak_password.reasons.reduce((i,a)=>i&&typeof a=="string",!0))throw new sr(De(s),t.status,s.weak_password.reasons);throw new oa(De(s),t.status||500,r)}const Na=(t,e,s,r)=>{const n={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?n:(n.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),n.body=JSON.stringify(r),Object.assign(Object.assign({},n),s))};async function E(t,e,s,r){var n;const i=Object.assign({},r==null?void 0:r.headers);i[Es]||(i[Es]=Kr["2024-01-01"].name),r!=null&&r.jwt&&(i.Authorization=`Bearer ${r.jwt}`);const a=(n=r==null?void 0:r.query)!==null&&n!==void 0?n:{};r!=null&&r.redirectTo&&(a.redirect_to=r.redirectTo);const o=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",l=await Ua(t,e,s+o,{headers:i,noResolveJson:r==null?void 0:r.noResolveJson},{},r==null?void 0:r.body);return r!=null&&r.xform?r==null?void 0:r.xform(l):{data:Object.assign({},l),error:null}}async function Ua(t,e,s,r,n,i){const a=Na(e,r,n,i);let o;try{o=await t(s,Object.assign({},a))}catch(l){throw new Ss(De(l),0)}if(o.ok||await lr(o),r!=null&&r.noResolveJson)return o;try{return await o.json()}catch(l){await lr(l)}}function ee(t){var e;let s=null;Fa(t)&&(s=Object.assign({},t),t.expires_at||(s.expires_at=ma(t.expires_in)));const r=(e=t.user)!==null&&e!==void 0?e:typeof(t==null?void 0:t.id)=="string"?t:null;return{data:{session:s,user:r},error:null}}function cr(t){const e=ee(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((s,r)=>s&&typeof r=="string",!0)&&(e.data.weak_password=t.weak_password),e}function Ie(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function Ma(t){return{data:t,error:null}}function za(t){const{action_link:e,email_otp:s,hashed_token:r,redirect_to:n,verification_type:i}=t,a=Qt(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:s,hashed_token:r,redirect_to:n,verification_type:i},l=Object.assign({},a);return{data:{properties:o,user:l},error:null}}function dr(t){return t}function Fa(t){return!!t.access_token&&!!t.refresh_token&&!!t.expires_in}const ds=["global","local","others"];class qa{constructor({url:e="",headers:s={},fetch:r,experimental:n}){this.url=e,this.headers=s,this.fetch=Yr(r),this.experimental=n??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,s=ds[0]){if(ds.indexOf(s)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${ds.join(", ")}`);try{return await E(this.fetch,"POST",`${this.url}/logout?scope=${s}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(r){if(_(r))return{data:null,error:r};throw r}}async inviteUserByEmail(e,s={}){try{return await E(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:s.data},headers:this.headers,redirectTo:s.redirectTo,xform:Ie})}catch(r){if(_(r))return{data:{user:null},error:r};throw r}}async generateLink(e){try{const{options:s}=e,r=Qt(e,["options"]),n=Object.assign(Object.assign({},r),s);return"newEmail"in r&&(n.new_email=r==null?void 0:r.newEmail,delete n.newEmail),await E(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:n,headers:this.headers,xform:za,redirectTo:s==null?void 0:s.redirectTo})}catch(s){if(_(s))return{data:{properties:null,user:null},error:s};throw s}}async createUser(e){try{return await E(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:Ie})}catch(s){if(_(s))return{data:{user:null},error:s};throw s}}async listUsers(e){var s,r,n,i,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await E(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(s=e==null?void 0:e.page)===null||s===void 0?void 0:s.toString())!==null&&r!==void 0?r:"",per_page:(i=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&i!==void 0?i:""},xform:dr});if(u.error)throw u.error;const d=await u.json(),f=(a=u.headers.get("x-total-count"))!==null&&a!==void 0?a:0,h=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),y=JSON.parse(p.split(";")[1].split("=")[1]);c[`${y}Page`]=g}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},d),c),error:null}}catch(c){if(_(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){ye(e);try{return await E(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:Ie})}catch(s){if(_(s))return{data:{user:null},error:s};throw s}}async updateUserById(e,s){ye(e);try{return await E(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:s,headers:this.headers,xform:Ie})}catch(r){if(_(r))return{data:{user:null},error:r};throw r}}async deleteUser(e,s=!1){ye(e);try{return await E(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:s},xform:Ie})}catch(r){if(_(r))return{data:{user:null},error:r};throw r}}async _listFactors(e){ye(e.userId);try{const{data:s,error:r}=await E(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:n=>({data:{factors:n},error:null})});return{data:s,error:r}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _deleteFactor(e){ye(e.userId),ye(e.id);try{return{data:await E(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _listOAuthClients(e){var s,r,n,i,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},u=await E(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(r=(s=e==null?void 0:e.page)===null||s===void 0?void 0:s.toString())!==null&&r!==void 0?r:"",per_page:(i=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&i!==void 0?i:""},xform:dr});if(u.error)throw u.error;const d=await u.json(),f=(a=u.headers.get("x-total-count"))!==null&&a!==void 0?a:0,h=(l=(o=u.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),y=JSON.parse(p.split(";")[1].split("=")[1]);c[`${y}Page`]=g}),c.total=parseInt(f)),{data:Object.assign(Object.assign({},d),c),error:null}}catch(c){if(_(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _getOAuthClient(e){try{return await E(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _updateOAuthClient(e,s){try{return await E(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:s,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(_(r))return{data:null,error:r};throw r}}async _deleteOAuthClient(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _regenerateOAuthClientSecret(e){try{return await E(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _listCustomProviders(e){try{const s={};return e!=null&&e.type&&(s.type=e.type),await E(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:s,xform:r=>{var n;return{data:{providers:(n=r==null?void 0:r.providers)!==null&&n!==void 0?n:[]},error:null}}})}catch(s){if(_(s))return{data:{providers:[]},error:s};throw s}}async _createCustomProvider(e){try{return await E(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _getCustomProvider(e){try{return await E(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _updateCustomProvider(e,s){try{return await E(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:s,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(_(r))return{data:null,error:r};throw r}}async _deleteCustomProvider(e){try{return await E(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}async _adminListPasskeys(e){ae(this.experimental),ye(e.userId);try{return await E(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(_(s))return{data:null,error:s};throw s}}async _adminDeletePasskey(e){ae(this.experimental),ye(e.userId),ye(e.passkeyId);try{return await E(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(s){if(_(s))return{data:null,error:s};throw s}}}function ur(t={}){return{getItem:e=>t[e]||null,setItem:(e,s)=>{t[e]=s},removeItem:e=>{delete t[e]}}}globalThis&&Gr()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class Ha extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function Wa(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Zr(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function Va(t){return parseInt(t,16)}function Ka(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,r=>r.toString(16).padStart(2,"0")).join("")}function Ja(t){var e;const{chainId:s,domain:r,expirationTime:n,issuedAt:i=new Date,nonce:a,notBefore:o,requestId:l,resources:c,scheme:u,uri:d,version:f}=t;{if(!Number.isInteger(s))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${s}`);if(!r)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(a&&a.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!d)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(f!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${f}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const h=Zr(t.address),p=u?`${u}://${r}`:r,g=t.statement?`${t.statement}
`:"",y=`${p} wants you to sign in with your Ethereum account:
${h}

${g}`;let v=`URI: ${d}
Version: ${f}
Chain ID: ${s}${a?`
Nonce: ${a}`:""}
Issued At: ${i.toISOString()}`;if(n&&(v+=`
Expiration Time: ${n.toISOString()}`),o&&(v+=`
Not Before: ${o.toISOString()}`),l&&(v+=`
Request ID: ${l}`),c){let x=`
Resources:`;for(const m of c){if(!m||typeof m!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${m}`);x+=`
- ${m}`}v+=x}return`${y}
${v}`}class z extends Error{constructor({message:e,code:s,cause:r,name:n}){var i;super(e,{cause:r}),this.__isWebAuthnError=!0,this.name=(i=n??(r instanceof Error?r.name:void 0))!==null&&i!==void 0?i:"Unknown Error",this.code=s}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class Jt extends z{constructor(e,s){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:s,message:e}),this.name="WebAuthnUnknownError",this.originalError=s}}function Ga({error:t,options:e}){var s,r,n;const{publicKey:i}=e;if(!i)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new z({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((s=i.authenticatorSelection)===null||s===void 0?void 0:s.requireResidentKey)===!0)return new z({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((r=i.authenticatorSelection)===null||r===void 0?void 0:r.userVerification)==="required")return new z({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((n=i.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new z({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new z({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new z({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return i.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new z({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new z({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const a=window.location.hostname;if(Qr(a)){if(i.rp.id!==a)return new z({message:`The RP ID "${i.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new z({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(i.user.id.byteLength<1||i.user.id.byteLength>64)return new z({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new z({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new z({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function Ya({error:t,options:e}){const{publicKey:s}=e;if(!s)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new z({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new z({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const r=window.location.hostname;if(Qr(r)){if(s.rpId!==r)return new z({message:`The RP ID "${s.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new z({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new z({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new z({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class Xa{createNewAbortSignal(){if(this.controller){const s=new Error("Cancelling existing WebAuthn API call for new one");s.name="AbortError",this.controller.abort(s)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Rs=new Xa;function hr(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:s,excludeCredentials:r}=t,n=Qt(t,["challenge","user","excludeCredentials"]),i=rt(e).buffer,a=Object.assign(Object.assign({},s),{id:rt(s.id).buffer}),o=Object.assign(Object.assign({},n),{challenge:i,user:a});if(r&&r.length>0){o.excludeCredentials=new Array(r.length);for(let l=0;l<r.length;l++){const c=r[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:rt(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function fr(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:s}=t,r=Qt(t,["challenge","allowCredentials"]),n=rt(e).buffer,i=Object.assign(Object.assign({},r),{challenge:n});if(s&&s.length>0){i.allowCredentials=new Array(s.length);for(let a=0;a<s.length;a++){const o=s[a];i.allowCredentials[a]=Object.assign(Object.assign({},o),{id:rt(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return i}function pr(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const s=t;return{id:t.id,rawId:t.id,response:{attestationObject:Ue(new Uint8Array(t.response.attestationObject)),clientDataJSON:Ue(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=s.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function gr(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const s=t,r=t.getClientExtensionResults(),n=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:Ue(new Uint8Array(n.authenticatorData)),clientDataJSON:Ue(new Uint8Array(n.clientDataJSON)),signature:Ue(new Uint8Array(n.signature)),userHandle:n.userHandle?Ue(new Uint8Array(n.userHandle)):void 0},type:"public-key",clientExtensionResults:r,authenticatorAttachment:(e=s.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Qr(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function Gt(){var t,e;return!!(W()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function en(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Jt("Browser returned unexpected credential type",e)}:{data:null,error:new Jt("Empty credential response",e)}}catch(e){return{data:null,error:Ga({error:e,options:t})}}}async function tn(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Jt("Browser returned unexpected credential type",e)}:{data:null,error:new Jt("Empty credential response",e)}}catch(e){return{data:null,error:Ya({error:e,options:t})}}}const Za={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Qa={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Yt(...t){const e=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),s=n=>n instanceof ArrayBuffer||ArrayBuffer.isView(n),r={};for(const n of t)if(n)for(const i in n){const a=n[i];if(a!==void 0)if(Array.isArray(a))r[i]=a;else if(s(a))r[i]=a;else if(e(a)){const o=r[i];e(o)?r[i]=Yt(o,a):r[i]=Yt(a)}else r[i]=a}return r}function eo(t,e){return Yt(Za,t,e||{})}function to(t,e){return Yt(Qa,t,e||{})}class so{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:s,friendlyName:r,signal:n},i){var a;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:s});if(!o)return{data:null,error:l};const c=n??Rs.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:u}=o.webauthn.credential_options.publicKey;if(!u.name){const d=r;if(d)u.name=`${u.id}:${d}`;else{const h=(await this.client.getUser()).data.user,p=((a=h==null?void 0:h.user_metadata)===null||a===void 0?void 0:a.name)||(h==null?void 0:h.email)||(h==null?void 0:h.id)||"User";u.name=`${u.id}:${p}`}}u.displayName||(u.displayName=u.name)}switch(o.webauthn.type){case"create":{const u=eo(o.webauthn.credential_options.publicKey,i==null?void 0:i.create),{data:d,error:f}=await en({publicKey:u,signal:c});return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:f}}case"request":{const u=to(o.webauthn.credential_options.publicKey,i==null?void 0:i.request),{data:d,error:f}=await tn(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:u,signal:c}));return d?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:d}},error:null}:{data:null,error:f}}}}catch(o){return _(o)?{data:null,error:o}:{data:null,error:new le("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:s,webauthn:r}){return this.client.mfa.verify({factorId:s,challengeId:e,webauthn:r})}async _authenticate({factorId:e,webauthn:{rpId:s=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},i){if(!s)return{data:null,error:new kt("rpId is required for WebAuthn authentication")};try{if(!Gt())return{data:null,error:new le("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:s,rpOrigins:r},signal:n},{request:i});if(!a)return{data:null,error:o};const{webauthn:l}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:l.type,rpId:s,rpOrigins:r,credential_response:l.credential_response}})}catch(a){return _(a)?{data:null,error:a}:{data:null,error:new le("Unexpected error in authenticate",a)}}}async _register({friendlyName:e,webauthn:{rpId:s=typeof window<"u"?window.location.hostname:void 0,rpOrigins:r=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},i){if(!s)return{data:null,error:new kt("rpId is required for WebAuthn registration")};try{if(!Gt())return{data:null,error:new le("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(u=>{var d;return(d=u.data)===null||d===void 0?void 0:d.all.find(f=>f.factor_type==="webauthn"&&f.friendly_name===e&&f.status!=="unverified")}).then(u=>u?this.client.mfa.unenroll({factorId:u==null?void 0:u.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:s,rpOrigins:r},signal:n},{create:i});return l?this._verify({factorId:a.id,challengeId:l.challengeId,webauthn:{rpId:s,rpOrigins:r,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(a){return _(a)?{data:null,error:a}:{data:null,error:new le("Unexpected error in register",a)}}}}Wa();const ro={url:ta,storageKey:sa,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:ra,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},Ke={};class _t{get jwks(){var e,s;return(s=(e=Ke[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&s!==void 0?s:{keys:[]}}set jwks(e){Ke[this.storageKey]=Object.assign(Object.assign({},Ke[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,s;return(s=(e=Ke[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&s!==void 0?s:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){Ke[this.storageKey]=Object.assign(Object.assign({},Ke[this.storageKey]),{cachedAt:e})}constructor(e){var s,r,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this._pendingInitNotifications=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const i=Object.assign(Object.assign({},ro),e);if(this.storageKey=i.storageKey,this.instanceID=(s=_t.nextInstanceID[this.storageKey])!==null&&s!==void 0?s:0,_t.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!i.debug,typeof i.debug=="function"&&(this.logger=i.debug),this.instanceID>0&&W()){const a=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(a),this.logDebugMessages&&console.trace(a)}if(this.persistSession=i.persistSession,this.autoRefreshToken=i.autoRefreshToken,this.experimental=(r=i.experimental)!==null&&r!==void 0?r:{},this.admin=new qa({url:i.url,headers:i.headers,fetch:i.fetch,experimental:this.experimental}),this.url=i.url,this.headers=i.headers,this.fetch=Yr(i.fetch),this.detectSessionInUrl=i.detectSessionInUrl,this.flowType=i.flowType,this.hasCustomAuthorizationHeader=i.hasCustomAuthorizationHeader,this.throwOnError=i.throwOnError,this.lockAcquireTimeout=i.lockAcquireTimeout,i.lock!=null&&(this.lock=i.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new so(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(i.storage?this.storage=i.storage:Gr()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=ur(this.memoryStorage)),i.userStorage&&(this.userStorage=i.userStorage)):(this.memoryStorage={},this.storage=ur(this.memoryStorage)),W()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(a){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",a)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async a=>{this._debug("received broadcast notification from other tab or client",a),(a.data.event==="TOKEN_REFRESHED"||a.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(a.data.event,a.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}i.skipAutoInitialize||this.initialize().catch(a=>{this._debug("#initialize()","error",a)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Vr}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){var e;if(this.initializePromise)return await this.initializePromise;this._pendingInitNotifications=[],this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())();const s=await this.initializePromise,r=(e=this._pendingInitNotifications)!==null&&e!==void 0?e:[];this._pendingInitNotifications=null;for(const n of r)await this._notifyAllSubscribers(n.event,n.session,n.broadcast);return s}async _initialize(){var e;try{let s={},r="none";if(W()&&(s=ar(window.location.href),this._isImplicitGrantCallback(s)?r="implicit":await this._isPKCECallback(s)&&(r="pkce")),W()&&this.detectSessionInUrl&&r!=="none"){const{data:n,error:i}=await this._getSessionFromURL(s,r);if(i){if(this._debug("#_initialize()","error detecting session from URL",i),la(i)){const l=(e=i.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:i}}return{error:i}}const{session:a,redirectType:o}=n;return this._debug("#_initialize()","detected session in URL",a,"redirect type",o),await this._saveSession(a),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",a):await this._notifyAllSubscribers("SIGNED_IN",a)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(s){return _(s)?this._returnResult({error:s}):this._returnResult({error:new le("Unexpected error during initialization",s)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var s,r,n;try{const i=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(r=(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}},xform:ee}),{data:a,error:o}=i;if(o||!a)return this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(i){if(_(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signUp(e){var s,r,n;let i=null;try{let a;if("email"in e){const{email:d,password:f,options:h}=e;let p=null,g=null;this.flowType==="pkce"&&([p,g,i]=await this._getCodeChallengeAndMethod()),a=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(h==null?void 0:h.emailRedirectTo,i),body:{email:d,password:f,data:(s=h==null?void 0:h.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:p,code_challenge_method:g},xform:ee})}else if("phone"in e){const{phone:d,password:f,options:h}=e;a=await E(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:d,password:f,data:(r=h==null?void 0:h.data)!==null&&r!==void 0?r:{},channel:(n=h==null?void 0:h.channel)!==null&&n!==void 0?n:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:ee})}else throw new Bt("You must provide either an email or phone number and a password");const{data:o,error:l}=a;if(l||!o)return await re(this.storage,this.storageKey,i),this._returnResult({data:{user:null,session:null},error:l});const c=o.session,u=o.user;return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",c)),this._returnResult({data:{user:u,session:c},error:null})}catch(a){if(await re(this.storage,this.storageKey,i),_(a))return this._returnResult({data:{user:null,session:null},error:a});throw a}}async signInWithPassword(e){try{let s;if("email"in e){const{email:i,password:a,options:o}=e;s=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:i,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:cr})}else if("phone"in e){const{phone:i,password:a,options:o}=e;s=await E(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:i,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:cr})}else throw new Bt("You must provide either an email or phone number and a password");const{data:r,error:n}=s;if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!r||!r.session||!r.user){const i=new Ve;return this._returnResult({data:{user:null,session:null},error:i})}return r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:Object.assign({user:r.user,session:r.session},r.weak_password?{weakPassword:r.weak_password}:null),error:n})}catch(s){if(_(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithOAuth(e){var s,r,n,i;return await this._handleProviderSignIn(e.provider,{redirectTo:(s=e.options)===null||s===void 0?void 0:s.redirectTo,scopes:(r=e.options)===null||r===void 0?void 0:r.scopes,queryParams:(n=e.options)===null||n===void 0?void 0:n.queryParams,skipBrowserRedirect:(i=e.options)===null||i===void 0?void 0:i.skipBrowserRedirect})}async exchangeCodeForSession(e,s){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e,s)):this._exchangeCodeForSession(e,s)}async signInWithWeb3(e){const{chain:s}=e;switch(s){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${s}"`)}}async signInWithEthereum(e){var s,r,n,i,a,o,l,c,u,d,f;let h,p;if("message"in e)h=e.message,p=e.signature;else{const{chain:g,wallet:y,statement:v,options:x}=e;let m;if(W())if(typeof y=="object")m=y;else{const O=window;if("ethereum"in O&&typeof O.ethereum=="object"&&"request"in O.ethereum&&typeof O.ethereum.request=="function")m=O.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof y!="object"||!(x!=null&&x.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");m=y}const k=new URL((s=x==null?void 0:x.url)!==null&&s!==void 0?s:window.location.href),I=await m.request({method:"eth_requestAccounts"}).then(O=>O).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!I||I.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const T=Zr(I[0]);let S=(r=x==null?void 0:x.signInWithEthereum)===null||r===void 0?void 0:r.chainId;if(!S){const O=await m.request({method:"eth_chainId"});S=Va(O)}const B={domain:k.host,address:T,statement:v,uri:k.href,version:"1",chainId:S,nonce:(n=x==null?void 0:x.signInWithEthereum)===null||n===void 0?void 0:n.nonce,issuedAt:(a=(i=x==null?void 0:x.signInWithEthereum)===null||i===void 0?void 0:i.issuedAt)!==null&&a!==void 0?a:new Date,expirationTime:(o=x==null?void 0:x.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=x==null?void 0:x.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=x==null?void 0:x.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(u=x==null?void 0:x.signInWithEthereum)===null||u===void 0?void 0:u.resources};h=Ja(B),p=await m.request({method:"personal_sign",params:[Ka(h),T]})}try{const{data:g,error:y}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:p},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(f=e.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:ee});if(y)throw y;if(!g||!g.session||!g.user){const v=new Ve;return this._returnResult({data:{user:null,session:null},error:v})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:y})}catch(g){if(_(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var s,r,n,i,a,o,l,c,u,d,f,h;let p,g;if("message"in e)p=e.message,g=e.signature;else{const{chain:y,wallet:v,statement:x,options:m}=e;let k;if(W())if(typeof v=="object")k=v;else{const T=window;if("solana"in T&&typeof T.solana=="object"&&("signIn"in T.solana&&typeof T.solana.signIn=="function"||"signMessage"in T.solana&&typeof T.solana.signMessage=="function"))k=T.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof v!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");k=v}const I=new URL((s=m==null?void 0:m.url)!==null&&s!==void 0?s:window.location.href);if("signIn"in k&&k.signIn){const T=await k.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},m==null?void 0:m.signInWithSolana),{version:"1",domain:I.host,uri:I.href}),x?{statement:x}:null));let S;if(Array.isArray(T)&&T[0]&&typeof T[0]=="object")S=T[0];else if(T&&typeof T=="object"&&"signedMessage"in T&&"signature"in T)S=T;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in S&&"signature"in S&&(typeof S.signedMessage=="string"||S.signedMessage instanceof Uint8Array)&&S.signature instanceof Uint8Array)p=typeof S.signedMessage=="string"?S.signedMessage:new TextDecoder().decode(S.signedMessage),g=S.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in k)||typeof k.signMessage!="function"||!("publicKey"in k)||typeof k!="object"||!k.publicKey||!("toBase58"in k.publicKey)||typeof k.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");p=[`${I.host} wants you to sign in with your Solana account:`,k.publicKey.toBase58(),...x?["",x,""]:[""],"Version: 1",`URI: ${I.href}`,`Issued At: ${(n=(r=m==null?void 0:m.signInWithSolana)===null||r===void 0?void 0:r.issuedAt)!==null&&n!==void 0?n:new Date().toISOString()}`,...!((i=m==null?void 0:m.signInWithSolana)===null||i===void 0)&&i.notBefore?[`Not Before: ${m.signInWithSolana.notBefore}`]:[],...!((a=m==null?void 0:m.signInWithSolana)===null||a===void 0)&&a.expirationTime?[`Expiration Time: ${m.signInWithSolana.expirationTime}`]:[],...!((o=m==null?void 0:m.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${m.signInWithSolana.chainId}`]:[],...!((l=m==null?void 0:m.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${m.signInWithSolana.nonce}`]:[],...!((c=m==null?void 0:m.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${m.signInWithSolana.requestId}`]:[],...!((d=(u=m==null?void 0:m.signInWithSolana)===null||u===void 0?void 0:u.resources)===null||d===void 0)&&d.length?["Resources",...m.signInWithSolana.resources.map(S=>`- ${S}`)]:[]].join(`
`);const T=await k.signMessage(new TextEncoder().encode(p),"utf8");if(!T||!(T instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=T}}try{const{data:y,error:v}=await E(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:p,signature:Ue(g)},!((f=e.options)===null||f===void 0)&&f.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:ee});if(v)throw v;if(!y||!y.session||!y.user){const x=new Ve;return this._returnResult({data:{user:null,session:null},error:x})}return y.session&&(await this._saveSession(y.session),await this._notifyAllSubscribers("SIGNED_IN",y.session)),this._returnResult({data:Object.assign({},y),error:v})}catch(y){if(_(y))return this._returnResult({data:{user:null,session:null},error:y});throw y}}async _exchangeCodeForSession(e,s){const r=(s==null?void 0:s.flowId)!=null,n=r?zt(s==null?void 0:s.flowId):W()?zt(ar(window.location.href)[Ne]):null;r&&!n&&this._debug("#_exchangeCodeForSession()","provided flowId is not a valid flow id",s==null?void 0:s.flowId);const{verifier:i,flowId:a}=r&&!n?{verifier:null,flowId:null}:await Ta(this.storage,this.storageKey,n),[o,l]=(i??"").split("/");try{if(!o&&this.flowType==="pkce")throw new ca;const{data:c,error:u}=await E(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:o},xform:ee});if(await re(this.storage,this.storageKey,a),u)throw u;if(!c||!c.session||!c.user){const d=new Ve;return this._returnResult({data:{user:null,session:null,redirectType:null},error:d})}return c.session&&(await this._saveSession(c.session),await this._notifyAllSubscribers(l==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",c.session)),this._returnResult({data:Object.assign(Object.assign({},c),{redirectType:l??null}),error:u})}catch(c){if(await re(this.storage,this.storageKey,a),_(c))return this._returnResult({data:{user:null,session:null,redirectType:null},error:c});throw c}}async signInWithIdToken(e){try{const{options:s,provider:r,token:n,access_token:i,nonce:a}=e,o=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:r,id_token:n,access_token:i,nonce:a,gotrue_meta_security:{captcha_token:s==null?void 0:s.captchaToken}},xform:ee}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const u=new Ve;return this._returnResult({data:{user:null,session:null},error:u})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(s){if(_(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async signInWithOtp(e){var s,r,n,i,a;let o=null;try{if("email"in e){const{email:l,options:c}=e;let u=null,d=null;this.flowType==="pkce"&&([u,d,o]=await this._getCodeChallengeAndMethod());const{error:f}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:l,data:(s=c==null?void 0:c.data)!==null&&s!==void 0?s:{},create_user:(r=c==null?void 0:c.shouldCreateUser)!==null&&r!==void 0?r:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},code_challenge:u,code_challenge_method:d},redirectTo:this._maybeAppendFlowIdToRedirect(c==null?void 0:c.emailRedirectTo,o)});return this._returnResult({data:{user:null,session:null},error:f})}if("phone"in e){const{phone:l,options:c}=e,{data:u,error:d}=await E(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:l,data:(n=c==null?void 0:c.data)!==null&&n!==void 0?n:{},create_user:(i=c==null?void 0:c.shouldCreateUser)!==null&&i!==void 0?i:!0,gotrue_meta_security:{captcha_token:c==null?void 0:c.captchaToken},channel:(a=c==null?void 0:c.channel)!==null&&a!==void 0?a:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:u==null?void 0:u.message_id},error:d})}throw new Bt("You must provide either an email or phone number.")}catch(l){if(await re(this.storage,this.storageKey,o),_(l))return this._returnResult({data:{user:null,session:null},error:l});throw l}}async verifyOtp(e){var s,r;try{let n,i;"options"in e&&(n=(s=e.options)===null||s===void 0?void 0:s.redirectTo,i=(r=e.options)===null||r===void 0?void 0:r.captchaToken);const{data:a,error:o}=await E(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:i}}),redirectTo:n,xform:ee});if(o)throw o;if(!a)throw new Error("An error occurred on token verification.");const l=a.session,c=a.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(_(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithSSO(e){var s,r,n,i;let a=null;try{let o=null,l=null;this.flowType==="pkce"&&([o,l,a]=await this._getCodeChallengeAndMethod());const c=await E(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:this._maybeAppendFlowIdToRedirect((s=e.options)===null||s===void 0?void 0:s.redirectTo,a)}),!((r=e==null?void 0:e.options)===null||r===void 0)&&r.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:Ma});return!((n=c.data)===null||n===void 0)&&n.url&&W()&&!(!((i=e.options)===null||i===void 0)&&i.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await re(this.storage,this.storageKey,a),_(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:s},error:r}=e;if(r)throw r;if(!s)throw new q;const{error:n}=await E(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:s.access_token});return this._returnResult({data:{user:null,session:null},error:n})})}catch(e){if(_(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){let s=null;try{const r=`${this.url}/resend`;if("email"in e){const{email:n,type:i,options:a}=e;let o=null,l=null;this.flowType==="pkce"&&([o,l,s]=await this._getCodeChallengeAndMethod());const{error:c}=await E(this.fetch,"POST",r,{headers:this.headers,body:{email:n,type:i,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken},code_challenge:o,code_challenge_method:l},redirectTo:this._maybeAppendFlowIdToRedirect(a==null?void 0:a.emailRedirectTo,s)});return c&&await re(this.storage,this.storageKey,s),this._returnResult({data:{user:null,session:null},error:c})}else if("phone"in e){const{phone:n,type:i,options:a}=e,{data:o,error:l}=await E(this.fetch,"POST",r,{headers:this.headers,body:{phone:n,type:i,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:o==null?void 0:o.message_id},error:l})}throw new Bt("You must provide either an email or phone number and a type")}catch(r){if(await re(this.storage,this.storageKey,s),_(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,s){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const r=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await r,await s()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const r=s();for(this.pendingInLock.push((async()=>{try{await r}catch{}})()),await r;this.pendingInLock.length;){const n=[...this.pendingInLock];await Promise.all(n),this.pendingInLock.splice(0,n.length)}return await r}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const s=await this.__loadSession();return await e(s)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const s=await V(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",s),s!==null&&(this._isValidSession(s)?e=s:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const r=e.expires_at?e.expires_at*1e3-Date.now()<ls:!1;if(this._debug("#__loadSession()",`session has${r?"":" not"} expired`,"expires_at",e.expires_at),!r){if(this.userStorage){const a=await V(this.userStorage,this.storageKey+"-user");a!=null&&a.user?e.user=a.user:e.user=cs()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const a={value:this.suppressGetSessionWarning};e.user=ja(e.user,a),a.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:n,error:i}=await this._callRefreshToken(e.refresh_token);if(i){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const o=await V(this.storage,this.storageKey);if(o&&o.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:i})}return this._returnResult({data:{session:n},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let s;return this.lock!=null?s=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):s=await this._getUser(),s.data.user&&(this.suppressGetSessionWarning=!0),s}async _getUser(e){try{return e?await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:Ie}):await this._useSession(async s=>{var r,n,i;const{data:a,error:o}=s;if(o)throw o;return!(!((r=a.session)===null||r===void 0)&&r.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new q}:await E(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(i=(n=a.session)===null||n===void 0?void 0:n.access_token)!==null&&i!==void 0?i:void 0,xform:Ie})})}catch(s){if(_(s))return Pt(s)&&await this._removeSession(),this._returnResult({data:{user:null},error:s});throw s}}async updateUser(e,s={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,s)):await this._updateUser(e,s)}async _updateUser(e,s={}){let r=null;try{return await this._useSession(async n=>{const{data:i,error:a}=n;if(a)throw a;if(!i.session)throw new q;const o=i.session;let l=null,c=null;this.flowType==="pkce"&&e.email!=null&&([l,c,r]=await this._getCodeChallengeAndMethod());const{data:u,error:d}=await E(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(s==null?void 0:s.emailRedirectTo,r),body:Object.assign(Object.assign({},e),{code_challenge:l,code_challenge_method:c}),jwt:o.access_token,xform:Ie});if(d)throw d;return o.user=u.user,await this._saveSession(o),await this._notifyAllSubscribers("USER_UPDATED",o),this._returnResult({data:{user:o.user},error:null})})}catch(n){if(await re(this.storage,this.storageKey,r),_(n))return this._returnResult({data:{user:null},error:n});throw n}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new q;const s=Date.now()/1e3;let r=s,n=!0,i=null;const{payload:a}=Dt(e.access_token);if(a.exp&&(r=a.exp,n=r<=s),n){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};i=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});i={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:r-s,expires_at:r},await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)}return this._returnResult({data:{user:i.user,session:i},error:null})}catch(s){if(_(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async s=>{var r;if(!e){const{data:a,error:o}=s;if(o)throw o;e=(r=a.session)!==null&&r!==void 0?r:void 0}if(!(e!=null&&e.refresh_token))throw new q;const{data:n,error:i}=await this._callRefreshToken(e.refresh_token);return i?this._returnResult({data:{user:null,session:null},error:i}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(s){if(_(s))return this._returnResult({data:{user:null,session:null},error:s});throw s}}async _getSessionFromURL(e,s){var r;try{if(!W())throw new Ot("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ot(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(s){case"implicit":if(this.flowType==="pkce")throw new er("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ot("Not a valid implicit grant flow url.");break;default:}if(s==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new er("No code detected.");const{data:m,error:k}=await this._exchangeCodeForSession(e.code,{flowId:e[Ne]});if(k)throw k;const I=new URL(window.location.href);return I.searchParams.delete("code"),I.searchParams.delete(Ne),window.history.replaceState(window.history.state,"",I.toString()),{data:{session:m.session,redirectType:(r=m.redirectType)!==null&&r!==void 0?r:null},error:null}}const{provider_token:n,provider_refresh_token:i,access_token:a,refresh_token:o,expires_in:l,expires_at:c,token_type:u}=e;if(!a||!l||!o||!u)throw new Ot("No session defined in URL");const d=Math.round(Date.now()/1e3),f=parseInt(l);let h=d+f;c&&(h=parseInt(c));const p=h-d;p*1e3<=ke&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${f}s`);const g=h-f;d-g>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",g,h,d):d-g<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",g,h,d);const{data:y,error:v}=await this._getUser(a);if(v)throw v;const x={provider_token:n,provider_refresh_token:i,access_token:a,expires_in:f,expires_at:h,refresh_token:o,token_type:u,user:y.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:x,redirectType:e.type},error:null})}catch(n){if(_(n))return this._returnResult({data:{session:null,redirectType:null},error:n});throw n}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){if(!e.code)return!1;const s=zt(e[Ne]);return s&&await V(this.storage,nt(this.storageKey,s))?!0:!!await V(this.storage,`${this.storageKey}-code-verifier`)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async s=>{var r;const n=async()=>{await this._removeSession()},{data:i,error:a}=s;if(a&&!Pt(a))return this._returnResult({error:a});const o=(r=i.session)===null||r===void 0?void 0:r.access_token;if(o){const{error:l}=await this.admin.signOut(o,e);if(l&&!(Qs(l)&&(l.status===404||l.status===401||l.status===403)||Pt(l)))return e!=="others"&&await n(),this._returnResult({error:l})}return e!=="others"&&await n(),this._returnResult({error:null})})}onAuthStateChange(e){const s=va(),r={id:s,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",s),this.stateChangeEmitters.delete(s)}};return this._debug("#onAuthStateChange()","registered callback with id",s),this.stateChangeEmitters.set(s,r),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(s)}):await this._emitInitialSession(s)))(),{data:{subscription:r}}}async _emitInitialSession(e){return await this._useSession(async s=>{var r,n;try{const{data:{session:i},error:a}=s;if(a)throw a;await((r=this.stateChangeEmitters.get(e))===null||r===void 0?void 0:r.callback("INITIAL_SESSION",i)),this._debug("INITIAL_SESSION","callback id",e,"session",i)}catch(i){await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",i),Pt(i)||jt(i)||Qs(i)&&(i.code==="refresh_token_not_found"||i.code==="refresh_token_already_used"||i.code==="session_expired")?console.warn(i):console.error(i)}})}async resetPasswordForEmail(e,s={}){let r=null,n=null,i=null;this.flowType==="pkce"&&([r,n,i]=await this._getCodeChallengeAndMethod(!0));try{return await E(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:r,code_challenge_method:n,gotrue_meta_security:{captcha_token:s.captchaToken}},headers:this.headers,redirectTo:this._maybeAppendFlowIdToRedirect(s.redirectTo,i)})}catch(a){if(await re(this.storage,this.storageKey,i),_(a))return this._returnResult({data:null,error:a});throw a}}async getUserIdentities(){var e;try{const{data:s,error:r}=await this.getUser();if(r)throw r;return this._returnResult({data:{identities:(e=s.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var s;let r=null;try{const{data:n,error:i}=await this._useSession(async a=>{var o,l,c,u,d;const{data:f,error:h}=a;if(h)throw h;const{url:p,flowId:g}=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(o=e.options)===null||o===void 0?void 0:o.redirectTo,scopes:(l=e.options)===null||l===void 0?void 0:l.scopes,queryParams:(c=e.options)===null||c===void 0?void 0:c.queryParams,skipBrowserRedirect:!0});return r=g,await E(this.fetch,"GET",p,{headers:this.headers,jwt:(d=(u=f.session)===null||u===void 0?void 0:u.access_token)!==null&&d!==void 0?d:void 0})});if(i)throw i;return W()&&!(!((s=e.options)===null||s===void 0)&&s.skipBrowserRedirect)&&window.location.assign(n==null?void 0:n.url),this._returnResult({data:{provider:e.provider,url:n==null?void 0:n.url,flowId:r},error:null})}catch(n){if(_(n))return this._returnResult({data:{provider:e.provider,url:null,flowId:r},error:n});throw n}}async linkIdentityIdToken(e){return await this._useSession(async s=>{var r;try{const{error:n,data:{session:i}}=s;if(n)throw n;const{options:a,provider:o,token:l,access_token:c,nonce:u}=e,d=await E(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(r=i==null?void 0:i.access_token)!==null&&r!==void 0?r:void 0,body:{provider:o,id_token:l,access_token:c,nonce:u,link_identity:!0,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:ee}),{data:f,error:h}=d;return h?this._returnResult({data:{user:null,session:null},error:h}):!f||!f.session||!f.user?this._returnResult({data:{user:null,session:null},error:new Ve}):(f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("USER_UPDATED",f.session)),this._returnResult({data:f,error:h}))}catch(n){if(await re(this.storage,this.storageKey,null),_(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}})}async unlinkIdentity(e){try{return await this._useSession(async s=>{var r,n;const{data:i,error:a}=s;if(a)throw a;return await E(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(n=(r=i.session)===null||r===void 0?void 0:r.access_token)!==null&&n!==void 0?n:void 0})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _refreshAccessToken(e){const s="#_refreshAccessToken()";this._debug(s,"begin");try{const r=Date.now();return await wa(async n=>(n>0&&await ba(200*Math.pow(2,n-1)),this._debug(s,"refreshing attempt",n),await E(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:ee})),(n,i)=>{const a=200*Math.pow(2,n);return i&&jt(i)&&Date.now()+a-r<ke})}catch(r){if(this._debug(s,"error",r),_(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}finally{this._debug(s,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,s){const{url:r,flowId:n}=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:s.redirectTo,scopes:s.scopes,queryParams:s.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",s,"url",r),W()&&!s.skipBrowserRedirect&&window.location.assign(r),{data:{provider:e,url:r,flowId:n},error:null}}async _recoverAndRefresh(){var e,s;const r="#_recoverAndRefresh()";this._debug(r,"begin");try{const n=await V(this.storage,this.storageKey);if(n&&this.userStorage){let a=await V(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!a&&(a={user:n.user},await _e(this.userStorage,this.storageKey+"-user",a)),n.user=(e=a==null?void 0:a.user)!==null&&e!==void 0?e:cs()}else if(n&&!n.user&&!n.user){const a=await V(this.storage,this.storageKey+"-user");a&&(a!=null&&a.user)?(n.user=a.user,await Y(this.storage,this.storageKey+"-user"),await _e(this.storage,this.storageKey,n)):n.user=cs()}if(this._debug(r,"session from storage",n),!this._isValidSession(n)){this._debug(r,"session is not valid"),n!==null&&await this._removeSession();return}const i=((s=n.expires_at)!==null&&s!==void 0?s:1/0)*1e3-Date.now()<ls;if(this._debug(r,`session has${i?"":" not"} expired with margin of ${ls}s`),i){if(this.autoRefreshToken&&n.refresh_token){const{error:a}=await this._callRefreshToken(n.refresh_token);a&&(da(a)?this._debug(r,"refresh discarded by commit guard",a):this._debug(r,"refresh failed",a))}}else if(n.user&&n.user.__isUserNotAvailableProxy===!0)try{const{data:a,error:o}=await this._getUser(n.access_token);!o&&(a!=null&&a.user)?(n.user=a.user,await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)):this._debug(r,"could not get user data, skipping SIGNED_IN notification")}catch(a){console.error("Error getting user data:",a),this._debug(r,"error getting user data, skipping SIGNED_IN notification",a)}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(r,"error",n),jt(n)?console.warn(n):console.error(n);return}finally{this._debug(r,"end")}}async _callRefreshToken(e){var s,r;if(!e)throw new q;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const n="#_callRefreshToken()";this._debug(n,"begin");try{this.refreshingDeferred=new ss;const i=await V(this.storage,this.storageKey),{data:a,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!a.session)throw new q;const l=await V(this.storage,this.storageKey);if(i!==null&&(l===null||l.refresh_token!==i.refresh_token)){this._debug(n,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const f={data:null,error:new tr};return this.refreshingDeferred.resolve(f),f}const u=this._sessionRemovalEpoch;if(await this._saveSession(a.session),this._sessionRemovalEpoch!==u){this._debug(n,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await Y(this.storage,this.storageKey),this.userStorage&&await Y(this.userStorage,this.storageKey+"-user");const f={data:null,error:new tr};return this.refreshingDeferred.resolve(f),f}await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const d={data:a.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(d),d}catch(i){if(this._debug(n,"error",i),_(i)){const a={data:null,error:i};if(!jt(i)){const o=await V(this.storage,this.storageKey);!!(o!=null&&o.expires_at&&o.expires_at*1e3>Date.now())?this._debug(n,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:a,expiresAt:Date.now()+ea},(s=this.refreshingDeferred)===null||s===void 0||s.resolve(a),a}throw(r=this.refreshingDeferred)===null||r===void 0||r.reject(i),i}finally{this.refreshingDeferred=null,this._debug(n,"end")}}async _notifyAllSubscribers(e,s,r=!0){if(this._pendingInitNotifications!==null&&r){this._pendingInitNotifications.push({event:e,session:s,broadcast:r});return}const n=`#_notifyAllSubscribers(${e})`;this._debug(n,"begin",s,`broadcast = ${r}`);try{this.broadcastChannel&&r&&this.broadcastChannel.postMessage({event:e,session:s});const i=[],a=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,s)}catch(l){i.push(l)}});if(await Promise.all(a),i.length>0){for(let o=0;o<i.length;o+=1)console.error(i[o]);throw i[0]}}finally{this._debug(n,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0;const s=Object.assign({},e),r=s.user&&s.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!r&&s.user&&await _e(this.userStorage,this.storageKey+"-user",{user:s.user});const n=Object.assign({},s);delete n.user;const i=or(n);await _e(this.storage,this.storageKey,i)}else{const n=or(s);await _e(this.storage,this.storageKey,n)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await Y(this.storage,this.storageKey),await Aa(this.storage,this.storageKey),await Y(this.storage,this.storageKey+"-user"),this.userStorage&&await Y(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&W()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(s){console.error("removing visibilitychange callback failed",s)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),ke);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const s=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=s,s&&typeof s=="object"&&typeof s.unref=="function"?s.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(s)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const s=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,s&&clearTimeout(s)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async s=>{const{data:{session:r}}=s;if(!r||!r.refresh_token||!r.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((r.expires_at*1e3-e)/ke);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${ke}ms, refresh threshold is ${ht} ticks`),n<=ht&&await this._callRefreshToken(r.refresh_token)})}catch(s){console.error("Auto refresh tick failed with error. This is likely a transient error.",s)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof Ha)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async s=>{const{data:{session:r}}=s;if(!r||!r.refresh_token||!r.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((r.expires_at*1e3-e)/ke);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${ke}ms, refresh threshold is ${ht} ticks`),n<=ht&&await this._callRefreshToken(r.refresh_token)})}catch(s){console.error("Auto refresh tick failed with error. This is likely a transient error.",s)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!W()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const s=`#_onVisibilityChanged(${e})`;if(this._debug(s,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(s,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(s,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,s,r){let n=r==null?void 0:r.redirectTo,i=null,a=null,o=null;this.flowType==="pkce"&&([i,a,o]=await this._getCodeChallengeAndMethod(),n=this._maybeAppendFlowIdToRedirect(n,o));const l=[`provider=${encodeURIComponent(s)}`];if(n&&l.push(`redirect_to=${encodeURIComponent(n)}`),r!=null&&r.scopes&&l.push(`scopes=${encodeURIComponent(r.scopes)}`),i!=null&&a!=null){const c=new URLSearchParams({code_challenge:`${encodeURIComponent(i)}`,code_challenge_method:`${encodeURIComponent(a)}`});l.push(c.toString())}if(r!=null&&r.queryParams){const c=new URLSearchParams(r.queryParams);l.push(c.toString())}return r!=null&&r.skipBrowserRedirect&&l.push(`skip_http_redirect=${r.skipBrowserRedirect}`),{url:`${e}?${l.join("&")}`,flowId:o}}_maybeAppendFlowIdToRedirect(e,s){return!e||!s||!this.experimental.appendPkceFlowIdToRedirects?e??void 0:$a(e,s)}async _getCodeChallengeAndMethod(e=!1){return Ca(this.storage,this.storageKey,e,s=>this._debug("#_getCodeChallengeAndMethod()","evicted oldest pending PKCE verifier slot",s))}async _unenroll(e){try{return await this._useSession(async s=>{var r;const{data:n,error:i}=s;return i?this._returnResult({data:null,error:i}):await E(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(r=n==null?void 0:n.session)===null||r===void 0?void 0:r.access_token})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _enroll(e){try{return await this._useSession(async s=>{var r,n;const{data:i,error:a}=s;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await E(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(r=i==null?void 0:i.session)===null||r===void 0?void 0:r.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((n=l==null?void 0:l.totp)===null||n===void 0)&&n.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _verify(e){const s=async()=>{try{return await this._useSession(async r=>{var n;const{data:i,error:a}=r;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?pr(e.webauthn.credential_response):gr(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,s):s()}async _challenge(e){const s=async()=>{try{return await this._useSession(async r=>{var n;const{data:i,error:a}=r;if(a)return this._returnResult({data:null,error:a});const o=await E(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(n=i==null?void 0:i.session)===null||n===void 0?void 0:n.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:hr(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:fr(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,s):s()}async _challengeAndVerify(e){const{data:s,error:r}=await this._challenge({factorId:e.factorId});return r?this._returnResult({data:null,error:r}):await this._verify({factorId:e.factorId,challengeId:s.id,code:e.code})}async _listFactors(){var e;const{data:{user:s},error:r}=await this.getUser();if(r)return{data:null,error:r};const n={all:[],phone:[],totp:[],webauthn:[]};for(const i of(e=s==null?void 0:s.factors)!==null&&e!==void 0?e:[])n.all.push(i),i.status==="verified"&&n[i.factor_type].push(i);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){var s,r,n,i;if(e)try{const{payload:h}=Dt(e);let p=null;h.aal&&(p=h.aal);let g=p;const{data:{user:y},error:v}=await this.getUser(e);if(v)return this._returnResult({data:null,error:v});((r=(s=y==null?void 0:y.factors)===null||s===void 0?void 0:s.filter(k=>k.status==="verified"))!==null&&r!==void 0?r:[]).length>0&&(g="aal2");const m=h.amr||[];return{data:{currentLevel:p,nextLevel:g,currentAuthenticationMethods:m},error:null}}catch(h){if(_(h))return this._returnResult({data:null,error:h});throw h}const{data:{session:a},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!a)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Dt(a.access_token);let c=null;l.aal&&(c=l.aal);let u=c;((i=(n=a.user.factors)===null||n===void 0?void 0:n.filter(h=>h.status==="verified"))!==null&&i!==void 0?i:[]).length>0&&(u="aal2");const f=l.amr||[];return{data:{currentLevel:c,nextLevel:u,currentAuthenticationMethods:f},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async s=>{const{data:{session:r},error:n}=s;return n?this._returnResult({data:null,error:n}):r?await E(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:r.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new q})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _approveAuthorization(e,s){try{return await this._useSession(async r=>{const{data:{session:n},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!n)return this._returnResult({data:null,error:new q});const a=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&W()&&!(s!=null&&s.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _denyAuthorization(e,s){try{return await this._useSession(async r=>{const{data:{session:n},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!n)return this._returnResult({data:null,error:new q});const a=await E(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&W()&&!(s!=null&&s.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:s},error:r}=e;return r?this._returnResult({data:null,error:r}):s?await E(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new q})})}catch(e){if(_(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async s=>{const{data:{session:r},error:n}=s;return n?this._returnResult({data:null,error:n}):r?(await E(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new q})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async fetchJwk(e,s={keys:[]}){let r=s.keys.find(o=>o.kid===e);if(r)return r;const n=Date.now();if(r=this.jwks.keys.find(o=>o.kid===e),r&&this.jwks_cached_at+aa>n)return r;const{data:i,error:a}=await E(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!i.keys||i.keys.length===0||(this.jwks=i,this.jwks_cached_at=n,r=i.keys.find(o=>o.kid===e),!r)?null:r}async getClaims(e,s={}){try{let r=e;if(!r){const{data:h,error:p}=await this.getSession();if(p||!h.session)return this._returnResult({data:null,error:p});r=h.session.access_token}const{header:n,payload:i,signature:a,raw:{header:o,payload:l}}=Dt(r);if(!(s!=null&&s.allowExpired))try{Pa(i.exp)}catch(h){throw new Vt(h instanceof Error?h.message:"JWT validation failed")}const c=!n.alg||n.alg.startsWith("HS")||!n.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(n.kid,s!=null&&s.keys?{keys:s.keys}:s==null?void 0:s.jwks);if(!c){const{error:h}=await this.getUser(r);if(h)throw h;return{data:{claims:i,header:n,signature:a},error:null}}const u=Ba(n.alg),d=await crypto.subtle.importKey("jwk",c,u,!0,["verify"]);if(!await crypto.subtle.verify(u,d,a,ga(`${o}.${l}`)))throw new Vt("Invalid JWT signature");return{data:{claims:i,header:n,signature:a},error:null}}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async signInWithPasskey(e){var s,r,n;ae(this.experimental);try{if(!Gt())return this._returnResult({data:null,error:new le("Browser does not support WebAuthn",null)});const{data:i,error:a}=await this._startPasskeyAuthentication({options:{captchaToken:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}});if(a||!i)return this._returnResult({data:null,error:a});const o=fr(i.options),l=(n=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.signal)!==null&&n!==void 0?n:Rs.createNewAbortSignal(),{data:c,error:u}=await tn({publicKey:o,signal:l});if(u||!c)return this._returnResult({data:null,error:u??new le("WebAuthn ceremony failed",null)});const d=gr(c);return this._verifyPasskeyAuthentication({challengeId:i.challenge_id,credential:d})}catch(i){if(_(i))return this._returnResult({data:null,error:i});throw i}}async registerPasskey(e){var s,r;ae(this.experimental);try{if(!Gt())return this._returnResult({data:null,error:new le("Browser does not support WebAuthn",null)});const{data:n,error:i}=await this._startPasskeyRegistration();if(i||!n)return this._returnResult({data:null,error:i});const a=hr(n.options),o=(r=(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.signal)!==null&&r!==void 0?r:Rs.createNewAbortSignal(),{data:l,error:c}=await en({publicKey:a,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new le("WebAuthn ceremony failed",null)});const u=pr(l);return this._verifyPasskeyRegistration({challengeId:n.challenge_id,credential:u})}catch(n){if(_(n))return this._returnResult({data:null,error:n});throw n}}async _startPasskeyRegistration(){ae(this.experimental);try{return await this._useSession(async e=>{const{data:{session:s},error:r}=e;if(r)return this._returnResult({data:null,error:r});if(!s)return this._returnResult({data:null,error:new q});const{data:n,error:i}=await E(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:s.access_token,body:{}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:n,error:null})})}catch(e){if(_(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){ae(this.experimental);try{return await this._useSession(async s=>{const{data:{session:r},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!r)return this._returnResult({data:null,error:new q});const{data:i,error:a}=await E(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:r.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _startPasskeyAuthentication(e){var s;ae(this.experimental);try{const{data:r,error:n}=await E(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.captchaToken}}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:r,error:null})}catch(r){if(_(r))return this._returnResult({data:null,error:r});throw r}}async _verifyPasskeyAuthentication(e){ae(this.experimental);try{const{data:s,error:r}=await E(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:ee});return r?this._returnResult({data:null,error:r}):(s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:s,error:null}))}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _listPasskeys(){ae(this.experimental);try{return await this._useSession(async e=>{const{data:{session:s},error:r}=e;if(r)return this._returnResult({data:null,error:r});if(!s)return this._returnResult({data:null,error:new q});const{data:n,error:i}=await E(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:s.access_token,xform:a=>({data:a,error:null})});return i?this._returnResult({data:null,error:i}):this._returnResult({data:n,error:null})})}catch(e){if(_(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){ae(this.experimental);try{return await this._useSession(async s=>{const{data:{session:r},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!r)return this._returnResult({data:null,error:new q});const{data:i,error:a}=await E(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:r.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:i,error:null})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}async _deletePasskey(e){ae(this.experimental);try{return await this._useSession(async s=>{const{data:{session:r},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!r)return this._returnResult({data:null,error:new q});const{error:i}=await E(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:r.access_token,noResolveJson:!0});return i?this._returnResult({data:null,error:i}):this._returnResult({data:null,error:null})})}catch(s){if(_(s))return this._returnResult({data:null,error:s});throw s}}}_t.nextInstanceID={};const no=_t,io="2.112.0";let ft="",Xt;if(typeof Deno<"u"){var us;ft="deno",Xt=(us=Deno.version)===null||us===void 0?void 0:us.deno}else if(typeof document<"u")ft="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")ft="react-native";else{var hs;ft="node";const t=globalThis.process;Xt=t==null||(hs=t.version)===null||hs===void 0?void 0:hs.replace(/^v/,"")}const sn=[`runtime=${ft}`];Xt&&sn.push(`runtime-version=${Xt}`);const ao={"X-Client-Info":`supabase-js/${io}; ${sn.join("; ")}`},oo={headers:ao},lo={schema:"public"},co={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},uo={},ho={enabled:!1,respectSamplingDecision:!0};function fo(t){if(!t||typeof t!="string")return null;const e=t.split("-");if(e.length!==4)return null;const[s,r,n,i]=e;if(s.length!==2||r.length!==32||n.length!==16||i.length!==2)return null;const a=/^[0-9a-f]+$/i;return!a.test(s)||!a.test(r)||!a.test(n)||!a.test(i)||r==="00000000000000000000000000000000"||n==="0000000000000000"?null:{version:s,traceId:r,parentId:n,traceFlags:i,isSampled:(parseInt(i,16)&1)===1}}function po(t,e){if(!t||!e||e.length===0)return!1;let s;if(t instanceof URL)s=t;else try{s=new URL(t)}catch{return!1}for(const r of e)try{if(typeof r=="string"){if(go(s.hostname,r))return!0}else if(r instanceof RegExp){if(r.test(s.hostname))return!0}else if(typeof r=="function"&&r(s))return!0}catch{continue}return!1}function go(t,e){if(e===t)return!0;if(e.startsWith("*.")){const s=e.slice(2);if(t.endsWith(s)&&(t===s||t.endsWith("."+s)))return!0}return!1}function mo(t){const e=[];try{const s=new URL(t);e.push(s.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function Et(t){"@babel/helpers - typeof";return Et=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Et(t)}function vo(t,e){if(Et(t)!="object"||!t)return t;var s=t[Symbol.toPrimitive];if(s!==void 0){var r=s.call(t,e);if(Et(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function yo(t){var e=vo(t,"string");return Et(e)=="symbol"?e:e+""}function bo(t,e,s){return(e=yo(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function mr(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),s.push.apply(s,r)}return s}function N(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]!=null?arguments[e]:{};e%2?mr(Object(s),!0).forEach(function(r){bo(t,r,s[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):mr(Object(s)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(s,r))})}return t}const wo=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),ko=()=>Headers,rn=t=>t.startsWith("sb_publishable_")||t.startsWith("sb_secret_"),xo="sb_temp_",vr=new Set,_o=t=>{var e,s;if(!t.startsWith("sb_")||rn(t)||t.startsWith(xo))return;const r=(e=(s=t.match(/^sb_[a-zA-Z0-9]+_/))===null||s===void 0?void 0:s[0])!==null&&e!==void 0?e:"unknown";vr.has(r)||(vr.add(r),console.warn("@supabase/supabase-js: Unrecognized Supabase API key format. The client will proceed and send this key as-is; if you see authentication errors you may need to upgrade @supabase/supabase-js to a version that recognizes this key type."))},yr=(t,e,s,r,n,i)=>{const a=wo(r),o=ko(),l=(n==null?void 0:n.enabled)===!0,c=(n==null?void 0:n.respectSamplingDecision)!==!1,u=l?mo(e):null,d=!(i!=null&&i.omitApiKeyAsBearer&&rn(t));return async(f,h)=>{const p=await s();let g=new o(h==null?void 0:h.headers);if(g.has("apikey")||g.set("apikey",t),!g.has("Authorization")){const y=p??(d?t:null);y&&g.set("Authorization",`Bearer ${y}`)}if(u){const y=Eo(f,u,c);y&&(y.traceparent&&!g.has("traceparent")&&g.set("traceparent",y.traceparent),y.tracestate&&!g.has("tracestate")&&g.set("tracestate",y.tracestate),y.baggage&&!g.has("baggage")&&g.set("baggage",y.baggage))}return a(f,N(N({},h),{},{headers:g}))}};let br=!1;function Eo(t,e,s){const r=kn();if(!r)return br||(br=!0,console.warn("@supabase/supabase-js: tracePropagation is enabled but the tracing runtime is not loaded, so trace headers will not be attached. Add `import '@supabase/supabase-js/tracing'` at your application entry point (requires the OpenTelemetry API package to be installed). The CDN/UMD build does not support trace propagation.")),null;if(!po(typeof t=="string"||t instanceof URL?t:t.url,e))return null;const n=r();if(!n||!n.traceparent)return null;if(s){const i=fo(n.traceparent);if(i&&!i.isSampled)return null}return n}function wr(t){return typeof t=="boolean"?{enabled:t}:t}function So(t){return t.endsWith("/")?t:t+"/"}function Ro(t,e){var s,r,n,i,a,o;const{db:l,auth:c,realtime:u,global:d}=t,{db:f,auth:h,realtime:p,global:g}=e,y=wr(t.tracePropagation),v=wr(e.tracePropagation),x={db:N(N({},f),l),auth:N(N({},h),c),realtime:N(N({},p),u),storage:{},global:N(N(N({},g),d),{},{headers:N(N({},(s=g==null?void 0:g.headers)!==null&&s!==void 0?s:{}),(r=d==null?void 0:d.headers)!==null&&r!==void 0?r:{})}),tracePropagation:{enabled:(n=(i=y==null?void 0:y.enabled)!==null&&i!==void 0?i:v==null?void 0:v.enabled)!==null&&n!==void 0?n:!1,respectSamplingDecision:(a=(o=y==null?void 0:y.respectSamplingDecision)!==null&&o!==void 0?o:v==null?void 0:v.respectSamplingDecision)!==null&&a!==void 0?a:!0},accessToken:async()=>""};return t.accessToken?x.accessToken=t.accessToken:delete x.accessToken,x}function To(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(So(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Ao=class extends no{constructor(t){super(t)}},$o=class{constructor(t,e,s){var r,n;this.supabaseUrl=t,this.supabaseKey=e;const i=To(t);if(!e)throw new Error("supabaseKey is required.");_o(e),this.realtimeUrl=new URL("realtime/v1",i),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",i),this.storageUrl=new URL("storage/v1",i),this.functionsUrl=new URL("functions/v1",i);const a=`sb-${i.hostname.split(".")[0]}-auth-token`,o={db:lo,realtime:uo,auth:N(N({},co),{},{storageKey:a}),global:oo,tracePropagation:ho},l=Ro(s??{},o);if(this.settings=l,this.storageKey=(r=l.auth.storageKey)!==null&&r!==void 0?r:"",this.headers=(n=l.global.headers)!==null&&n!==void 0?n:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(u,d)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=yr(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation),this.functionsFetch=yr(e,t,this._getSessionToken.bind(this),l.global.fetch,l.tracePropagation,{omitApiKeyAsBearer:!0}),this.realtime=this._initRealtimeClient(N({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(u=>this.realtime.setAuth(u)).catch(u=>console.warn("Failed to set initial Realtime auth token:",u)),this.rest=new Bn(new URL("rest/v1",i).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit,retry:l.db.retry}),this.storage=new Qi(this.storageUrl.href,this.headers,this.fetch,s==null?void 0:s.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Sn(this.functionsUrl.href,{headers:this.headers,customFetch:this.functionsFetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},s={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,s)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getSessionToken(){var t=this,e,s;if(t.accessToken)return await t.accessToken();const{data:r}=await t.auth.getSession();return(e=(s=r.session)===null||s===void 0?void 0:s.access_token)!==null&&e!==void 0?e:null}async _getAccessToken(){var t=this,e;return(e=await t._getSessionToken())!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:s,storage:r,userStorage:n,storageKey:i,flowType:a,lock:o,debug:l,throwOnError:c,experimental:u,lockAcquireTimeout:d,skipAutoInitialize:f},h,p){const g={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Ao({url:this.authUrl.href,headers:N(N({},g),h),storageKey:i,autoRefreshToken:t,persistSession:e,detectSessionInUrl:s,storage:r,userStorage:n,flowType:a,lock:o,debug:l,throwOnError:c,experimental:u,fetch:p,lockAcquireTimeout:d,skipAutoInitialize:f,hasCustomAuthorizationHeader:Object.keys(this.headers).some(y=>y.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new _i(this.realtimeUrl.href,N(N({},t),{},{params:N(N({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,s){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN"||t==="INITIAL_SESSION")&&this.changedAccessToken!==s?(this.changedAccessToken=s,this.realtime.setAuth(s)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Co=(t,e,s)=>new $o(t,e,s);function Lo(){if(typeof window<"u"||globalThis.Deno!==void 0)return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const s=e.match(/^v(\d+)\./);return s?parseInt(s[1],10)<=20:!1}Lo()&&console.warn("⚠️  Node.js 20 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 22 or later. For more information, visit: https://github.com/orgs/supabase/discussions/45715");const Io="https://aakqmdwyglroulqngrdr.supabase.co",nn="sb_publishable_IpitJ3f_VLEGV0BuKZdJdg_oY72FIc0";let me=!nn.includes("your-anon-key="),ce=me?Co(Io,nn):null;const Po="TradeMasterDB",Bo=2;let Nt=null;function ze(){return new Promise((t,e)=>{if(Nt){t(Nt);return}const s=indexedDB.open(Po,Bo);s.onerror=r=>{console.error("Database error:",r.target.error),e(r.target.error)},s.onsuccess=r=>{Nt=r.target.result,t(Nt)},s.onupgradeneeded=r=>{const n=r.target.result;n.objectStoreNames.contains("TradingJournal")||n.createObjectStore("TradingJournal",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("BacktestingJournal")||n.createObjectStore("BacktestingJournal",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("Strategies")||n.createObjectStore("Strategies",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("Checklists")||n.createObjectStore("Checklists",{keyPath:"id",autoIncrement:!0}),n.objectStoreNames.contains("Users")||n.createObjectStore("Users",{keyPath:"email"})}})}function Fe(){if(!me||!ce)throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");return ce}function at(){return!!ce}async function Ps(){const t=Fe(),{data:e,error:s}=await t.from("Users").select("email").limit(1).maybeSingle();if(s)throw new Error(s.message||"Supabase connection test failed.");return{success:!0,connected:!0,sample:e||null}}async function Oo(){if(!me)return{mode:"local"};try{return await Ps(),{mode:"supabase"}}catch(t){return console.warn("Supabase unavailable at startup, switching to local DB:",t.message||t),me=!1,ce=null,{mode:"local",error:t}}}async function Z(t){if(at())try{let s=Fe().from(t).select("*");t!=="Users"&&(s=s.order("id",{ascending:!0}));const{data:r,error:n}=await s;if(n)throw n;return r||[]}catch(e){console.warn("Supabase read failed, disabling Supabase and falling back to local DB:",e.message||e),me=!1,ce=null}return ze().then(e=>new Promise((s,r)=>{const a=e.transaction(t,"readonly").objectStore(t).getAll();a.onsuccess=()=>s(a.result),a.onerror=()=>r(a.error)}))}async function Pe(t,e){if(at())try{const s=Fe(),r=Array.isArray(e)?e:[e],{data:n,error:i}=await s.from(t).insert(r).select();if(i)throw i;return Array.isArray(e)?n:(n==null?void 0:n[0])||null}catch(s){console.warn("Supabase insert failed, disabling Supabase and falling back to local DB:",s.message||s),me=!1,ce=null}return ze().then(s=>new Promise((r,n)=>{const o=s.transaction(t,"readwrite").objectStore(t).add(e);o.onsuccess=()=>r(o.result),o.onerror=()=>n(o.error)}))}async function ot(t,e){if(at())try{const s=Fe(),r=t==="Users"?"email":"id";if(e[r]===void 0||e[r]===null)throw new Error(`Missing primary key field ${r} for ${t} update.`);const{data:n,error:i}=await s.from(t).update(e).eq(r,e[r]).select();if(i)throw i;return Array.isArray(n)?n[0]:n}catch(s){console.warn("Supabase update failed, disabling Supabase and falling back to local DB:",s.message||s),me=!1,ce=null}return ze().then(s=>new Promise((r,n)=>{const o=s.transaction(t,"readwrite").objectStore(t).put(e);o.onsuccess=()=>r(o.result),o.onerror=()=>n(o.error)}))}async function rs(t,e){if(at())try{const s=Fe(),r=t==="Users"?"email":"id",n=s.from(t).delete().eq(r,e),{error:i}=await n;if(i)throw i;return!0}catch(s){console.warn("Supabase delete failed, disabling Supabase and falling back to local DB:",s.message||s),me=!1,ce=null}return ze().then(s=>new Promise((r,n)=>{const a=s.transaction(t,"readwrite").objectStore(t),o=isNaN(e)||typeof e=="string"?e:Number(e),l=a.delete(o);l.onsuccess=()=>r(!0),l.onerror=()=>n(l.error)}))}function an(t){return Pe("Users",t)}async function on(t){if(at())try{const e=Fe(),{data:s,error:r}=await e.from("Users").select("*").eq("email",t).maybeSingle();if(r)throw r;if(s)return s}catch(e){console.warn("Supabase getUser failed, disabling Supabase and falling back to local DB:",e.message||e),me=!1,ce=null}return ze().then(e=>new Promise((s,r)=>{const a=e.transaction("Users","readonly").objectStore("Users").get(t);a.onsuccess=()=>s(a.result),a.onerror=()=>r(a.error)}))}function Ts(){return Z("Users")}function As(t){return ot("Users",t)}async function ln(){const t=await Z("Users"),e=t.some(i=>i.role==="admin");if(t.length===0||!e){const i=[];e||i.push({username:"AdminMaster",email:"admin@trademaster.com",password:"admin123",role:"admin",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:"AM",currency:"USD",riskDefault:1,notifications:!0}),t.length===0&&i.push({username:"AlexTrader",email:"alex.forex@master.com",password:"password123",role:"user",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:"AT",currency:"USD",riskDefault:1,notifications:!0},{username:"HassanFX",email:"hassan.trade@journal.com",password:"hassan123",role:"user",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:"HF",currency:"USD",riskDefault:1,notifications:!0});for(const a of i)await on(a.email)||await Pe("Users",a)}await Z("TradingJournal"),await Z("BacktestingJournal");const s=await Z("Strategies"),r=await Z("Checklists"),n=["Order Flow","KL","TS","SMT / 2SMT","5M #"];for(const i of r){if(i.name!=="Standard Confirmation")continue;const a=Array.isArray(i.items)?i.items:[],o=n.filter(l=>!a.includes(l));o.length&&(i.items=[...a,...o],await ot("Checklists",i))}if(s.length===0){const i=[{name:"SMC Order Block",description:"Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow."},{name:"Liquidity Grab & Reversal",description:"Fading structural high/low grabs at New York/London session opens."},{name:"Support & Resistance Bounce",description:"Reversing off major daily/weekly supply & demand zones."}];for(const a of i)a.userEmail="alex.forex@master.com",await Pe("Strategies",a)}if(r.length===0){const i=[{name:"Standard Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined","Order Flow","KL","TS","SMT / 2SMT","5M #"]},{name:"Conservative Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined","Session open volatility settled","RR greater than 1:3"]}];for(const a of i)a.userEmail="alex.forex@master.com",await Pe("Checklists",a)}}async function cn(){if(at())try{const t=Fe(),e=["TradingJournal","BacktestingJournal","Strategies","Checklists","Users"];for(const s of e){const r=t.from(s).delete();s==="Users"?r.not("email","is",null):r.not("id","is",null);const{error:n}=await r;if(n)throw n}return!0}catch(t){console.warn("Supabase clearDatabase failed, disabling Supabase and falling back to local DB:",t.message||t),me=!1,ce=null}return ze().then(t=>new Promise((e,s)=>{const r=["TradingJournal","BacktestingJournal","Strategies","Checklists","Users"],n=t.transaction(r,"readwrite");r.forEach(i=>{t.objectStoreNames.contains(i)&&n.objectStore(i).clear()}),n.oncomplete=()=>e(!0),n.onerror=()=>s(n.error)}))}const Ee=Object.freeze(Object.defineProperty({__proto__:null,addStoreData:Pe,clearDatabase:cn,deleteStoreData:rs,getAllUsers:Ts,getStoreData:Z,getUser:on,initDB:ze,initializeDatabaseMode:Oo,populateMockDataIfEmpty:ln,registerUser:an,get supabase(){return ce},testSupabaseConnection:Ps,updateStoreData:ot,updateUser:As},Symbol.toStringTag,{value:"Module"})),b={user:null,activeView:"dashboard",tradingTrades:[],backtestTrades:[],strategies:[],checklists:[],activeDashboardTab:"live",selectedAccount:"All",listeners:[],language:"en",async init(){this.language=localStorage.getItem("trademaster-lang")||"en";const t=localStorage.getItem("trademaster-theme")||"dark";document.body.className=t==="light"?"light-theme":"";const e=localStorage.getItem("trademaster-user")||sessionStorage.getItem("trademaster-user");if(e){const s=JSON.parse(e);try{const{getUser:r}=await ge(async()=>{const{getUser:i}=await Promise.resolve().then(()=>Ee);return{getUser:i}},void 0),n=await r(s.email);n&&n.status==="active"?(this.user=n,localStorage.getItem("trademaster-user")?localStorage.setItem("trademaster-user",JSON.stringify(this.user)):sessionStorage.setItem("trademaster-user",JSON.stringify(this.user))):(this.user=null,localStorage.removeItem("trademaster-user"),sessionStorage.removeItem("trademaster-user"))}catch{this.user=s}}else this.user=null;await this.refreshCache(),ln().then(()=>this.refreshCache()).catch(s=>console.error("Background database maintenance failed:",s))},async refreshCache(){try{const[t,e,s,r]=await Promise.all([Z("TradingJournal"),Z("BacktestingJournal"),Z("Strategies"),Z("Checklists")]),n=(i=[])=>i;this.user?this.user.role==="admin"?(this.tradingTrades=n(t),this.backtestTrades=n(e),this.strategies=s,this.checklists=r):(this.tradingTrades=n(t.filter(i=>i.userEmail===this.user.email)),this.backtestTrades=n(e.filter(i=>i.user_id===this.user.email)),this.strategies=s.filter(i=>i.userEmail===this.user.email),this.checklists=r.filter(i=>i.userEmail===this.user.email)):(this.tradingTrades=[],this.backtestTrades=[],this.strategies=[],this.checklists=[]),this.notifyListeners()}catch(t){console.error("Failed to refresh data cache:",t)}},setView(t){this.activeView=t,typeof window<"u"&&window.history&&window.location.pathname!==`/${t}`&&window.history.pushState({view:t},"",`/${t}`),this.notifyListeners()},setDashboardTab(t){this.activeDashboardTab=t,this.notifyListeners()},setSelectedAccount(t){this.selectedAccount=t||"All",this.notifyListeners()},setLanguage(t){this.language=t,localStorage.setItem("trademaster-lang",t),this.notifyListeners()},async login(t,e,s=!1){const{getUser:r}=await ge(async()=>{const{getUser:i}=await Promise.resolve().then(()=>Ee);return{getUser:i}},void 0),n=await r(t);if(!n)throw new Error("invalidCredentials");if(n.password!==e)throw new Error("invalidCredentials");if(n.status==="suspended")throw new Error("suspendedError");return this.user=n,s?(localStorage.setItem("trademaster-user",JSON.stringify(this.user)),sessionStorage.removeItem("trademaster-user")):(sessionStorage.setItem("trademaster-user",JSON.stringify(this.user)),localStorage.removeItem("trademaster-user")),await this.refreshCache(),this.notifyListeners(),this.user},async register(t,e,s,r=""){const{getUser:n,registerUser:i,addStoreData:a}=await ge(async()=>{const{getUser:c,registerUser:u,addStoreData:d}=await Promise.resolve().then(()=>Ee);return{getUser:c,registerUser:u,addStoreData:d}},void 0);if(await n(e))throw new Error("emailExists");const l={username:t,fullName:r,email:e,password:s,role:"user",status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:t.slice(0,2).toUpperCase(),currency:"USD",riskDefault:1,notifications:!0};await i(l);try{const c=[{name:"SMC Order Block",description:"Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow.",userEmail:e},{name:"Liquidity Grab & Reversal",description:"Fading structural high/low grabs at New York/London session opens.",userEmail:e},{name:"Support & Resistance Bounce",description:"Reversing off major daily/weekly supply & demand zones.",userEmail:e}];for(const d of c)await a("Strategies",d);const u=[{name:"Standard Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined","Order Flow","KL","TS","SMT / 2SMT","5M #"],userEmail:e}];for(const d of u)await a("Checklists",d)}catch(c){console.error("Failed to seed user templates:",c)}return this.user=l,sessionStorage.setItem("trademaster-user",JSON.stringify(this.user)),await this.refreshCache(),this.notifyListeners(),this.user},logout(){this.user=null,localStorage.removeItem("trademaster-user"),sessionStorage.removeItem("trademaster-user"),this.setView("auth"),this.notifyListeners()},async updateProfile(t){const{updateUser:e}=await ge(async()=>{const{updateUser:s}=await Promise.resolve().then(()=>Ee);return{updateUser:s}},void 0);this.user={...this.user,...t},await e(this.user),localStorage.getItem("trademaster-user")?localStorage.setItem("trademaster-user",JSON.stringify(this.user)):sessionStorage.setItem("trademaster-user",JSON.stringify(this.user)),this.notifyListeners()},subscribe(t){return this.listeners.push(t),()=>{this.listeners=this.listeners.filter(e=>e!==t)}},notifyListeners(){this.listeners.forEach(t=>t(this))}};async function Rt(t,e){if(!b.user)return;const s=d=>({Challenge:"challengeSize",Funded:"fundedSize","Your Broker":"brokerSize"})[d],r=Array.isArray(b.user.portfolioAccounts)?b.user.portfolioAccounts:[],n=d=>(d==null?void 0:d.accountType)||(d==null?void 0:d.account_type)||(d==null?void 0:d.account)||"Challenge",i=d=>{const f=Number((d==null?void 0:d.plMoney)??(d==null?void 0:d.pl_money)??0);if(!Number.isFinite(f))return 0;const h=String((d==null?void 0:d.result)||"").toLowerCase();return h==="loss"||h==="lost"?-Math.abs(f):h==="win"||h==="won"?Math.abs(f):f},a=new Map,o=new Map,l=(d,f)=>{const h=n(d),p=s(h);if(p)a.set(p,(a.get(p)||0)+f);else{const g=r.find(y=>y.name===h);g&&o.set(g.id,(o.get(g.id)||0)+f)}};if(t&&l(t,-i(t)),e&&l(e,i(e)),!a.size&&!o.size)return;const c={},u={challengeSize:1e5,fundedSize:5e4,brokerSize:1e4};a.forEach((d,f)=>{const h=Number(b.user[f]??u[f]);c[f]=Number((h+d).toFixed(2))}),o.size&&(c.portfolioAccounts=r.map(d=>o.has(d.id)?{...d,balance:Number((Number(d.balance||0)+o.get(d.id)).toFixed(2))}:d)),await b.updateProfile(c)}function Bs(){const t=b.user||{};return[{name:"Challenge",field:"challengeSize",accent:"var(--accent-color)",note:"Evaluation account"},{name:"Funded",field:"fundedSize",accent:"var(--color-win)",note:"Funded trading account"},{name:"Your Broker",field:"brokerSize",accent:"var(--accent-secondary)",note:"Personal broker account"},...Array.isArray(t.portfolioAccounts)?t.portfolioAccounts.map((e,s)=>({...e,field:null,accent:e.accent||["#a78bfa","#f59e0b","#ec4899"][s%3],note:e.note||"Custom trading account"})):[]]}const kr={en:{dashboard:"Dashboard",journal:"Trading Journal",backtesting:"Backtesting",calendar:"Calendar",analytics:"Analytics",gallery:"Gallery",reports:"Reports",portfolio:"Portfolio Accounts",settings:"Settings",adminPanel:"Admin Panel",logout:"Log Out",premiumTrader:"Premium Trader",adminUser:"Administrator",welcomeBack:"Welcome Back",loginSubtitle:"Login to access your trading journals",emailLabel:"Email Address",passwordLabel:"Password",forgotLink:"Forgot?",accessAccount:"Access Account",dontHaveAccount:"Don't have an account?",createOne:"Create one",createAccount:"Create Account",registerSubtitle:"Start tracking your trades like a master",usernameLabel:"Username",registerAccount:"Register Account",alreadyHaveAccount:"Already have an account?",signIn:"Sign in",resetPassword:"Reset Password",resetSubtitle:"We will send you a reset link instructions",sendInstructions:"Send Instructions",backToSignIn:"Back to Sign in",suspendedError:"Your account is suspended. Please contact the administrator.",invalidCredentials:"Invalid email or password.",emailExists:"Email is already registered.",profileSettings:"Trader Profile Settings",saveChanges:"Save Changes",defaultCurrency:"Default Currency",defaultRisk:"Default Risk Size per Trade (%)",appPreferences:"Application Preferences",colorTheme:"Color Theme Mode",themeDescription:"Toggle between Premium Dark and Clean Light view options.",themeDark:"Switch to Dark Mode",themeLight:"Switch to Light Mode",notificationsTitle:"Trading Notifications",notificationsDesc:"Receive desktop audio/alerts when journal milestones are reached.",dangerZone:"Danger Zone",dangerZoneDesc:"These operations permanently delete stored assets and data logs. They cannot be undone.",resetDatabase:"Reset Database Logs",logoutAccount:"Log Out Account",profileUpdated:"Trader Profile successfully updated.",logoutConfirm:"Are you sure you want to log out?",resetConfirm:"WARNING: This will permanently delete all trades in both Live Trading and Backtesting journals. This cannot be undone. Do you want to proceed?",dbCleared:"All journal logs successfully cleared.",winRate:"Win Rate",netPL:"Net P&L",totalTrades:"Total Trades",avgRR:"Average R:R",liveJournalTab:"Live Journal",backtestJournalTab:"Backtesting",performanceOverview:"Performance Overview",recentTrades:"Recent Trades",noTradesYet:"No trades recorded yet.",adminDashboard:"System Admin Dashboard",totalUsers:"Total Users",activeUsers:"Active Accounts",suspendedUsers:"Suspended Accounts",totalLogs:"Total Trade Logs",systemWinRate:"System Win Rate",registeredUsers:"Registered Users",addUserBtn:"Add New User",colUsername:"Username",colEmail:"Email",colRole:"Role",colStatus:"Status",colRegistered:"Registered At",colActions:"Actions",btnSuspend:"Suspend",btnActivate:"Activate",btnMakeAdmin:"Make Admin",btnDemote:"Demote to User",btnEdit:"Edit",titleAddNewUser:"Add New User Account",btnSaveUser:"Save User",btnCancel:"Cancel",userCreatedMsg:"User successfully created.",userUpdatedMsg:"User successfully updated.",cannotSuspendSelf:"You cannot suspend your own admin account.",cannotDemoteSelf:"You cannot demote your own admin account."},so:{dashboard:"Dashboard-ka",journal:"Diiwaanka Live-ka",backtesting:"Tijaabada Xeeladaha",calendar:"Kalandarka",analytics:"Falanqaynta xogta",gallery:"Sawirrada Shaxda",reports:"Warbixinnada",portfolio:"Akoonnada Portfolio",settings:"Habaynta Profiilka",adminPanel:"Maamulka Sare",logout:"Ka Bax",premiumTrader:"Ganacsade Premium",adminUser:"Maamule Sare",welcomeBack:"Kusoo Dhawaada Bogga",loginSubtitle:"Soo gal si aad u gasho diiwaankaaga ganacsi",emailLabel:"Email-ka Koontada",passwordLabel:"Furaha (Password)",forgotLink:"Ma Hilmaantay?",accessAccount:"Geli Koontada",dontHaveAccount:"Miyaanad lahayn koonto?",createOne:"Halkan ka sameyso",createAccount:"Sameyso Koonto Cusub",registerSubtitle:"Bilaaw in aad u diiwaangeliso ganacsigaaga si xirfad leh",usernameLabel:"Magaca Isticmaalaha",registerAccount:"Diiwaan-geli Koontada",alreadyHaveAccount:"Miyaad horey u lahayd koonto?",signIn:"Halkan kaga soo gal",resetPassword:"Beddel Furaha",resetSubtitle:"Waxaan kuu soo diri doonaa tilmaamaha beddelka furaha",sendInstructions:"Soo dir Tilmaamaha",backToSignIn:"Ku laabo Bogga Soo-gelista",suspendedError:"Koontadaada waa la hakiyey. Fadlan la xiriir maamulaha nidaamka.",invalidCredentials:"E-mail ama password khaldan.",emailExists:"E-mail-kaan horay ayaa loo diiwaan geliyey.",profileSettings:"Habaynta Macluumaadka Ganacsadaha",saveChanges:"Keydi Isbeddellada",defaultCurrency:"Lacagta caadiga ah",defaultRisk:"Halista caadiga ah halkii Ganacsi (%)",appPreferences:"Dookhyada Codsiga",colorTheme:"Habka Midabka (Theme)",themeDescription:"U kala beddel muuqaalka madowga ee quruxda badan ama iftiinka nadiifka ah.",themeDark:"U beddel Cadaan",themeLight:"U beddel Madow",notificationsTitle:"Ogeysiisyada Ganacsiga",notificationsDesc:"Hel ogeysiisyada maqalka/desktop-ka marka aad gaarto yoolalka diiwaanka.",dangerZone:"Aagga Halista (Danger Zone)",dangerZoneDesc:"Hawlgalladani waxay si joogto ah u tirtirayaan xogta iyo sawirrada. Dib looma soo celin karo.",resetDatabase:"Tirtir Dhammaan Xogta Diiwaanka",logoutAccount:"Ka Bax Koontada",profileUpdated:"Habaynta profiilka si guul leh ayaa loo keydiyey.",logoutConfirm:"Ma hubtaa inaad rabto inaad ka baxdo?",resetConfirm:"DIGNIIN: Tani waxay si joogto ah u tirtirbaa dhammaan ganacsiyadaada Live-ka iyo Backtest-ka. Dib looma soo celin karo. Ma rabtaa inaad sii waddo?",dbCleared:"Dhammaan xogta diiwaanka si guul leh ayaa loo tirtiray.",winRate:"Heerka Guusha",netPL:"Faa’idada/Khasaaraha",totalTrades:"Ganacsiyada Guud",avgRR:"Celceliska R:R",liveJournalTab:"Diiwaanka Live-ka",backtestJournalTab:"Diiwaanka Tijaabada",performanceOverview:"Guud-mar weyn ee Waxqabadka",recentTrades:"Ganacsiyadii Ugu Dambeeyay",noTradesYet:"Ma jiraan ganacsiyo la duubay weli.",adminDashboard:"Dashboard-ka Maamulka Nidaamka",totalUsers:"Isticmaalayaasha Guud",activeUsers:"Koontooyinka Firfircoon",suspendedUsers:"Koontooyinka La Hakiyeen",totalLogs:"Diiwaanka Ganacsiyada",systemWinRate:"Heerka Guusha Nidaamka",registeredUsers:"Isticmaalayaasha Diiwaan-gashan",addUserBtn:"Ku dar Isticmaale Cusub",colUsername:"Magaca",colEmail:"Email-ka",colRole:"Doorka",colStatus:"Xaaladda",colRegistered:"Taariikhda",colActions:"Tallaabooyinka",btnSuspend:"Haki Koontada",btnActivate:"Daar Koontada",btnMakeAdmin:"Ka dhig Admin",btnDemote:"U beddel User",btnEdit:"Beddel",titleAddNewUser:"Abuur Koonto Isticmaale Cusub",btnSaveUser:"Keydi Isticmaalaha",btnCancel:"Ka Laabo",userCreatedMsg:"Isticmaalaha cusub si guul leh ayaa loo abuuray.",userUpdatedMsg:"Isticmaalaha si guul leh ayaa loo cusbooneysiiyey.",cannotSuspendSelf:"Ma hakin kartid koontadaada admin-nimada ah.",cannotDemoteSelf:"Ma hoos u dhigi kartid doorkaaga admin-nimada ah."}};function w(t){var s,r;const e=localStorage.getItem("trademaster-lang")||"en";return((s=kr[e])==null?void 0:s[t])||((r=kr.en)==null?void 0:r[t])||t}function dn(t="Trade saved successfully"){un(t,"Your trade has been added to the journal.","success")}function Os(t="Trade deleted"){un(t,"The trade was removed from your journal.","danger")}function un(t,e,s){var i;(i=document.querySelector(".trade-save-success"))==null||i.remove();const r=document.createElement("div");r.className=`trade-save-success trade-save-${s}`,r.setAttribute("role","status"),r.innerHTML=`
    <div class="trade-save-success-icon">${s==="danger"?"×":"✓"}</div>
    <div>
      <strong>${t}</strong>
      <span>${e}</span>
    </div>
    <button type="button" class="trade-save-success-close" aria-label="Close">&times;</button>
  `,document.body.appendChild(r);const n=()=>{r.classList.add("is-closing"),window.setTimeout(()=>r.remove(),180)};r.querySelector(".trade-save-success-close").addEventListener("click",n),window.setTimeout(n,3600)}let C={search:"",date:"",session:"All",pair:"All",strategy:"All",result:"All",rr:"All",timeframe:"All",sortBy:"date-desc"};function hn(t){const e=b.backtestTrades,s=["All",...new Set(e.map(a=>a.pair).filter(Boolean))],r=["All",...new Set(e.map(a=>a.strategy).filter(Boolean))],n=["All","M1","M5","M15","M30","H1","H4","D1","W1"];Do(),t.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Filters and Header Controls -->
      <div class="card" style="padding: 18px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; flex: 1;">
            <!-- Filter Date -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Date</span>
              <input type="date" id="filter-backtest-date" class="form-control" style="padding: 6px 10px; font-size: 13px; width: 130px; height: 36px;" value="${C.date}">
            </div>

            <!-- Filter Pair -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Pair</span>
              <select id="filter-backtest-pair" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${s.map(a=>`<option value="${a}" ${C.pair===a?"selected":""}>${a}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Session -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Session</span>
              <select id="filter-backtest-session" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${C.session==="All"?"selected":""}>All Sessions</option>
                <option value="Asia" ${C.session==="Asia"?"selected":""}>Asia</option>
                <option value="London" ${C.session==="London"?"selected":""}>London</option>
                <option value="New York" ${C.session==="New York"?"selected":""}>New York</option>
              </select>
            </div>

            <!-- Filter Result -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Result</span>
              <select id="filter-backtest-result" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${C.result==="All"?"selected":""}>All Outcomes</option>
                <option value="Win" ${C.result==="Win"?"selected":""}>Wins</option>
                <option value="Loss" ${C.result==="Loss"?"selected":""}>Losses</option>
                <option value="Break Even" ${C.result==="Break Even"?"selected":""}>Break Evens</option>
              </select>
            </div>

            <!-- Filter Strategy -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Strategy</span>
              <select id="filter-backtest-strategy" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                ${r.map(a=>`<option value="${a}" ${C.strategy===a?"selected":""}>${a}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Timeframe -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">Timeframe</span>
              <select id="filter-backtest-timeframe" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${n.map(a=>`<option value="${a}" ${C.timeframe===a?"selected":""}>${a}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Min RR -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span class="filter-label-text">R:R Trigger</span>
              <select id="filter-backtest-rr" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                <option value="All" ${C.rr==="All"?"selected":""}>All R:R</option>
                <option value="1" ${C.rr==="1"?"selected":""}>&ge; 1.0 R:R</option>
                <option value="2" ${C.rr==="2"?"selected":""}>&ge; 2.0 R:R</option>
                <option value="3" ${C.rr==="3"?"selected":""}>&ge; 3.0 R:R</option>
                <option value="4" ${C.rr==="4"?"selected":""}>&ge; 4.0 R:R</option>
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
              <option value="date-desc" ${C.sortBy==="date-desc"?"selected":""}>Newest First</option>
              <option value="date-asc" ${C.sortBy==="date-asc"?"selected":""}>Oldest First</option>
              <option value="rr-desc" ${C.sortBy==="rr-desc"?"selected":""}>Highest R:R</option>
              <option value="rr-asc" ${C.sortBy==="rr-asc"?"selected":""}>Lowest R:R</option>
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
  `;const i=a=>{C.search=a.detail,ne()};return window.addEventListener("globalSearch",i),document.getElementById("filter-backtest-date").addEventListener("change",a=>{C.date=a.target.value,ne()}),document.getElementById("filter-backtest-pair").addEventListener("change",a=>{C.pair=a.target.value,ne()}),document.getElementById("filter-backtest-session").addEventListener("change",a=>{C.session=a.target.value,ne()}),document.getElementById("filter-backtest-result").addEventListener("change",a=>{C.result=a.target.value,ne()}),document.getElementById("filter-backtest-strategy").addEventListener("change",a=>{C.strategy=a.target.value,ne()}),document.getElementById("filter-backtest-timeframe").addEventListener("change",a=>{C.timeframe=a.target.value,ne()}),document.getElementById("filter-backtest-rr").addEventListener("change",a=>{C.rr=a.target.value,ne()}),document.getElementById("filter-backtest-sort").addEventListener("change",a=>{C.sortBy=a.target.value,ne()}),document.getElementById("clear-backtest-filters-btn").addEventListener("click",()=>{C={search:"",date:"",session:"All",pair:"All",strategy:"All",result:"All",rr:"All",timeframe:"All",sortBy:"date-desc"};const a=document.getElementById("global-search");a&&(a.value=""),document.getElementById("filter-backtest-date").value="",document.getElementById("filter-backtest-pair").value="All",document.getElementById("filter-backtest-session").value="All",document.getElementById("filter-backtest-result").value="All",document.getElementById("filter-backtest-strategy").value="All",document.getElementById("filter-backtest-timeframe").value="All",document.getElementById("filter-backtest-rr").value="All",document.getElementById("filter-backtest-sort").value="date-desc",ne()}),document.getElementById("export-csv-btn").addEventListener("click",()=>No(Ft())),document.getElementById("export-excel-btn").addEventListener("click",()=>Uo(Ft())),document.getElementById("export-pdf-btn").addEventListener("click",()=>Mo(Ft())),document.getElementById("add-backtest-btn").addEventListener("click",()=>Be()),ne(),()=>{window.removeEventListener("globalSearch",i)}}function Ft(){let t=[...b.backtestTrades];if(C.search){const e=C.search.toLowerCase();t=t.filter(s=>s.pair.toLowerCase().includes(e)||s.strategy&&s.strategy.toLowerCase().includes(e)||s.session.toLowerCase().includes(e)||s.result.toLowerCase().includes(e)||s.date.includes(e)||s.notes&&s.notes.toLowerCase().includes(e)||s.timeframe&&s.timeframe.toLowerCase().includes(e))}if(C.date&&(t=t.filter(e=>e.date===C.date)),C.pair!=="All"&&(t=t.filter(e=>e.pair===C.pair)),C.session!=="All"&&(t=t.filter(e=>e.session===C.session)),C.result!=="All"&&(t=t.filter(e=>e.result===C.result)),C.strategy!=="All"&&(t=t.filter(e=>e.strategy===C.strategy)),C.timeframe!=="All"&&(t=t.filter(e=>e.timeframe===C.timeframe)),C.rr!=="All"){const e=parseFloat(C.rr);t=t.filter(s=>(s.target_rr||0)>=e)}return C.sortBy==="date-desc"?t.sort((e,s)=>new Date(s.date)-new Date(e.date)):C.sortBy==="date-asc"?t.sort((e,s)=>new Date(e.date)-new Date(s.date)):C.sortBy==="rr-desc"?t.sort((e,s)=>(s.target_rr||0)-(e.target_rr||0)):C.sortBy==="rr-asc"&&t.sort((e,s)=>(e.target_rr||0)-(s.target_rr||0)),t}function ne(){const t=Ft(),e=document.getElementById("backtest-table-body");if(e){if(t.length===0){e.innerHTML='<tr><td colspan="11" style="text-align: center; padding: 48px; color: var(--text-muted);">No backtests found. Click "New Backtest" to log one!</td></tr>';return}e.innerHTML=t.map(s=>{const r=s.result==="Win"?"badge-win":s.result==="Loss"?"badge-loss":"badge-be",n=s.direction==="Buy"?"badge-buy":"badge-sell",i=s.before_image?`<img src="${s.before_image}" class="table-img-thumbnail" data-action="view-charts" data-id="${s.id}">`:'<span style="font-size:11px; color:var(--text-muted);">No image</span>',a=s.after_image?`<img src="${s.after_image}" class="table-img-thumbnail" data-action="view-charts" data-id="${s.id}">`:'<span style="font-size:11px; color:var(--text-muted);">No image</span>';return`
      <tr>
        <td style="font-weight: 600;">${s.date}</td>
        <td><span class="badge badge-session ${s.session.toLowerCase().replace(" ","")}">${s.session}</span></td>
        <td style="font-weight: 700; font-size: 14px;">${s.pair} (${s.timeframe||"N/A"})</td>
        <td><span class="badge ${n}">${s.direction}</span></td>
        <td>${s.risk_percent}%</td>
        <td style="font-weight: 600;">${s.target_rr||0}:1</td>
        <td><span class="badge ${r}">${s.result}</span></td>
        <td class="lesson-text-column" title="${s.lesson_learned||""}">${s.lesson_learned||"N/A"}</td>
        <td>${i}</td>
        <td>${a}</td>
        <td>
          <div style="display: flex; gap: 6px; justify-content: flex-end; align-items: center;">
            <button class="btn btn-secondary table-action-btn" data-action="view" data-id="${s.id}">View</button>
            <button class="btn btn-secondary table-action-btn" data-action="edit" data-id="${s.id}">Edit</button>
            <button class="btn btn-secondary table-action-btn" data-action="duplicate" data-id="${s.id}">Duplicate</button>
            <button class="btn btn-danger table-action-btn" data-action="delete" data-id="${s.id}" style="padding: 6px 10px; font-size: 12px; height: 28px;">Delete</button>
          </div>
        </td>
      </tr>
    `}).join(""),e.querySelectorAll(".table-action-btn").forEach(s=>{s.addEventListener("click",async r=>{const n=s.dataset.action,i=Number(s.dataset.id),a=t.find(o=>o.id===i);if(a)if(n==="view")_r(a);else if(n==="edit")Be(a);else if(n==="duplicate"){const o={...a};delete o.id,o.date=new Date().toISOString().split("T")[0],Be(o)}else n==="delete"&&await fn(a.pair)&&(await rs("BacktestingJournal",a.id),await Rt(a,null),b.refreshCache(),Os())})}),e.querySelectorAll(".table-img-thumbnail").forEach(s=>{s.addEventListener("click",()=>{const r=Number(s.dataset.id),n=t.find(i=>i.id===r);n&&_r(n)})})}}function Be(t=null){let e=document.getElementById("backtest-modal");e||(e=document.createElement("div"),e.id="backtest-modal",e.className="modal-overlay",document.body.appendChild(e));const s=t&&t.id!==void 0,r=t&&t.id===void 0;e.innerHTML=`
    <div class="modal-container" style="max-width: 750px;">
      <div class="modal-header">
        <h3>${s?"Edit Backtesting Record":r?"Duplicate Backtest":"Log New Backtest"}</h3>
        <button class="modal-close" id="close-backtest-modal-btn">&times;</button>
      </div>
      <form id="backtest-form">
        <div class="modal-body" style="max-height: 75vh; overflow-y: auto; padding: 20px;">
          
          <input type="hidden" id="backtest-id" value="${s?t.id:""}">

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
            <div class="form-group">
              <label class="form-label" for="back-account-type">Account Type</label>
              <select id="back-account-type" class="form-control">
                ${Bs().map(u=>`<option value="${u.name}" ${(t==null?void 0:t.accountType)===u.name||!t&&u.name==="Challenge"?"selected":""}>${u.name}</option>`).join("")}
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
            <div class="form-group">
              <label class="form-label" for="back-strategy">Strategy</label>
              <input type="text" id="back-strategy" class="form-control" value="${(t==null?void 0:t.strategy)||""}" placeholder="Strategy name">
            </div>
            <div class="form-group">
              <label class="form-label" for="back-setup">Setup</label>
              <input type="text" id="back-setup" class="form-control" value="${(t==null?void 0:t.setup)||""}" placeholder="Setup name">
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
            <div class="form-group">
              <label class="form-label" for="back-pl">P/L</label>
              <input type="number" id="back-pl" step="0.01" class="form-control" placeholder="e.g. 150.00" value="${(t==null?void 0:t.pl_money)??""}">
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
            <textarea id="back-lessons" rows="3" class="form-control" placeholder="What did this trade teach you?">${(t==null?void 0:t.lesson_learned)||""}</textarea>
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
              <label class="form-label" for="back-before-link" style="margin-top: 10px;">Paste Image Link</label>
              <input type="url" id="back-before-link" class="form-control" placeholder="Paste image link here..." value="${t!=null&&t.before_image&&!String(t.before_image).startsWith("data:")?t.before_image:""}">
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
              <label class="form-label" for="back-after-link" style="margin-top: 10px;">Paste Image Link</label>
              <input type="url" id="back-after-link" class="form-control" placeholder="Paste image link here..." value="${t!=null&&t.after_image&&!String(t.after_image).startsWith("data:")?t.after_image:""}">
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
  `,e.classList.add("active");const n=document.getElementById("back-direction"),i=document.getElementById("back-target-rr"),a=document.getElementById("back-result"),o=document.getElementById("backtest-form"),l=o==null?void 0:o.querySelector('button[type="submit"]');l&&(l.textContent="Save Backtest");const c=()=>e.classList.remove("active");document.getElementById("close-backtest-modal-btn").addEventListener("click",c),document.getElementById("cancel-backtest-modal-btn").addEventListener("click",c),e.addEventListener("click",u=>{u.target===e&&c()}),xr("dropzone-before","preview-before","back-before-img","rm-btn-before","back-before-link"),xr("dropzone-after","preview-after","back-after-img","rm-btn-after","back-after-link"),document.getElementById("backtest-form").addEventListener("submit",async u=>{u.preventDefault();const d=document.getElementById("backtest-id").value,f=d?b.backtestTrades.find(k=>k.id===Number(d)):null,h=document.getElementById("back-date").value,p=parseFloat(i.value)||0,g=a.value;let y=0;g==="Win"?y=p:g==="Loss"?y=-1:g==="Break Even"&&(y=0);const v=parseFloat(document.getElementById("back-pl").value)||0,x=g==="Loss"?-Math.abs(v):g==="Win"?Math.abs(v):v,m={user_id:b.user.email,date:h,session:document.getElementById("back-session").value,accountType:document.getElementById("back-account-type").value,pair:document.getElementById("back-pair").value.trim().toUpperCase(),direction:n.value,timeframe:document.getElementById("back-timeframe").value,strategy:document.getElementById("back-strategy").value.trim()||null,setup:document.getElementById("back-setup").value.trim()||null,risk_percent:parseFloat(document.getElementById("back-risk").value||1),target_rr:p,pl_money:x,actual_rr:y,result:g,lesson_learned:document.getElementById("back-lessons").value.trim()||null,before_image:document.getElementById("back-before-img").value||null,after_image:document.getElementById("back-after-img").value||null,updated_at:new Date().toISOString()};d?(m.id=Number(d),m.created_at=t.created_at||new Date().toISOString(),await ot("BacktestingJournal",m)):(m.created_at=new Date().toISOString(),await Pe("BacktestingJournal",m)),await Rt(f,m),c(),b.refreshCache(),dn("Backtest trade saved successfully")})}function xr(t,e,s,r,n){const i=document.getElementById(t),a=document.getElementById(e),o=document.getElementById(s),l=document.getElementById(n),c=h=>{if(!h){a.innerHTML="",a.style.display="none";return}a.style.display="block",a.innerHTML=`<img src="${h}" alt="Screenshot preview"><button type="button" class="screenshot-remove-btn" id="${r}">&times;</button>`,document.getElementById(r).addEventListener("click",p=>{p.stopPropagation(),o.value="",l&&(l.value=""),c("")})},u=document.createElement("input");u.type="file",u.accept="image/*",u.style.display="none",document.body.appendChild(u);const d=h=>{const p=new FileReader;p.onload=g=>{const y=g.target.result;o.value=y,l&&(l.value=""),c(y)},p.readAsDataURL(h)};i.addEventListener("click",()=>u.click()),i.addEventListener("dragover",h=>{h.preventDefault(),i.style.borderColor="var(--accent-color)",i.style.background="rgba(59, 130, 246, 0.05)"}),i.addEventListener("dragleave",()=>{i.style.borderColor="var(--border-color)",i.style.background="transparent"}),i.addEventListener("drop",h=>{h.preventDefault(),i.style.borderColor="var(--border-color)",i.style.background="transparent",h.dataTransfer.files.length&&d(h.dataTransfer.files[0])}),u.addEventListener("change",()=>{u.files.length&&d(u.files[0])}),l==null||l.addEventListener("input",()=>{const h=l.value.trim();o.value=h,c(h)});const f=document.getElementById(r);f&&f.addEventListener("click",h=>{h.stopPropagation(),o.value="",l&&(l.value=""),c("")})}function _r(t){let e=document.getElementById("trade-drawer-overlay"),s=document.getElementById("trade-drawer-container");if(!e||!s)return;const r=t.direction==="Buy"?"badge-buy":"badge-sell",n=t.result==="Win"?"badge-win":t.result==="Loss"?"badge-loss":"badge-be",i=t.result==="Win"?`+${t.actual_rr}R`:t.result==="Loss"?`-${Math.abs(t.actual_rr)}R`:"0.00R";s.innerHTML=`
    <div class="drawer-header">
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="badge ${r}">${t.direction}</span>
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
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">P/L</span><span style="font-weight: 600; color: ${Number(t.pl_money||0)>=0?"var(--color-win)":"var(--color-loss)"}">${t.pl_money??"N/A"}</span></div>
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
  `,e.classList.add("active"),s.classList.add("active");const a=()=>{e.classList.remove("active"),s.classList.remove("active")};document.getElementById("close-drawer-btn").addEventListener("click",a),e.addEventListener("click",a),document.getElementById("delete-drawer-backtest-btn").addEventListener("click",async()=>{await fn(t.pair)&&(await rs("BacktestingJournal",t.id),await Rt(t,null),a(),b.refreshCache(),Os())}),document.getElementById("edit-drawer-backtest-btn").addEventListener("click",()=>{a(),Be(t)}),s.querySelectorAll(".drawer-comp-img").forEach(o=>{o.addEventListener("click",()=>{jo(t)})})}function fn(t=""){return new Promise(e=>{const s=document.createElement("div");s.className="modal-overlay active delete-confirmation-overlay",s.innerHTML=`
      <div class="modal-container delete-confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="delete-confirmation-title">
        <div class="delete-confirmation-icon">!</div>
        <div class="delete-confirmation-content">
          <div class="modal-kicker">Permanent action</div>
          <h3 id="delete-confirmation-title">Delete Backtest Trade?</h3>
          <p>This will permanently remove <strong>${t||"this record"}</strong> from your backtesting journal.</p>
        </div>
        <div class="delete-confirmation-actions">
          <button type="button" class="btn btn-secondary" id="cancel-delete-confirmation">Cancel</button>
          <button type="button" class="btn btn-danger" id="confirm-delete-confirmation">Delete Trade</button>
        </div>
      </div>
    `,document.body.appendChild(s);let r;const n=i=>{r&&document.removeEventListener("keydown",r),s.remove(),e(i)};s.querySelector("#cancel-delete-confirmation").addEventListener("click",()=>n(!1)),s.querySelector("#confirm-delete-confirmation").addEventListener("click",()=>n(!0)),s.addEventListener("click",i=>{i.target===s&&n(!1)}),r=function(a){a.key==="Escape"&&n(!1)},document.addEventListener("keydown",r)})}function jo(t){const e=document.createElement("div");e.className="modal-overlay active",e.style.zIndex="2000",e.innerHTML=`
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
  `,document.body.appendChild(e);const s=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),250)};e.querySelector("#close-lightbox-btn").addEventListener("click",s),e.addEventListener("click",c=>{c.target===e&&s()});const r=e.querySelector("#backtest-slider-container"),n=e.querySelector("#backtest-slider-after-container"),i=e.querySelector("#backtest-slider-handle"),a=n.querySelector("img");let o=!1;const l=c=>{const u=r.getBoundingClientRect();let d=c-u.left;d<0&&(d=0),d>u.width&&(d=u.width);const f=d/u.width*100;n.style.width=`${f}%`,i.style.left=`${f}%`,a.style.width=`${u.width}px`};setTimeout(()=>{const c=r.getBoundingClientRect();a.style.width=`${c.width}px`},100),i.addEventListener("mousedown",()=>o=!0),window.addEventListener("mouseup",()=>o=!1),window.addEventListener("mousemove",c=>{o&&l(c.clientX)}),i.addEventListener("touchstart",()=>o=!0),window.addEventListener("touchend",()=>o=!1),window.addEventListener("touchmove",c=>{o&&l(c.touches[0].clientX)})}function Do(){if(document.getElementById("backtest-custom-styles"))return;const t=document.createElement("style");t.id="backtest-custom-styles",t.innerHTML=`
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
  `,document.head.appendChild(t)}function No(t){if(t.length===0){alert("No data available to export.");return}const e=["Date","Session","Pair","Direction","Strategy","Timeframe","Entry Price","Stop Loss","Take Profit","Risk %","Target R:R","Actual R:R","Result","Lesson Learned","Notes"],s=t.map(o=>[o.date,o.session,o.pair,o.direction,`"${(o.strategy||"").replace(/"/g,'""')}"`,o.timeframe||"",o.entry_price,o.stop_loss,o.take_profit,o.risk_percent,o.target_rr,o.actual_rr,o.result,`"${(o.lesson_learned||"").replace(/"/g,'""')}"`,`"${(o.notes||"").replace(/"/g,'""')}"`]),r=[e.join(","),...s.map(o=>o.join(","))].join(`
`),n=new Blob([r],{type:"text/csv;charset=utf-8;"}),i=URL.createObjectURL(n),a=document.createElement("a");a.setAttribute("href",i),a.setAttribute("download",`trademaster_backtests_${new Date().toISOString().split("T")[0]}.csv`),document.body.appendChild(a),a.click(),document.body.removeChild(a)}function Uo(t){if(t.length===0){alert("No data available to export.");return}let e='<table border="1" style="font-family: sans-serif; border-collapse: collapse;">';e+='<tr style="background-color: #3b82f6; color: #ffffff; font-weight: bold;">',e+="<td>Date</td><td>Session</td><td>Pair</td><td>Direction</td><td>Strategy</td><td>Timeframe</td><td>Entry Price</td><td>Stop Loss</td><td>Take Profit</td><td>Risk %</td><td>Target RR</td><td>Actual RR</td><td>Result</td><td>Lesson Learned</td><td>Notes</td>",e+="</tr>",t.forEach(i=>{e+=`<tr>
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
    </tr>`}),e+="</table>";const s=new Blob([e],{type:"application/vnd.ms-excel"}),r=URL.createObjectURL(s),n=document.createElement("a");n.setAttribute("href",r),n.setAttribute("download",`trademaster_backtests_${new Date().toISOString().split("T")[0]}.xls`),document.body.appendChild(n),n.click(),document.body.removeChild(n)}function Mo(t){if(t.length===0){alert("No data available to export.");return}const e=window.open("","_blank","width=900,height=700");let s=`
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
          <div class="summary-card"><div class="summary-card-val">${(t.filter(r=>r.result==="Win").length/t.length*100).toFixed(1)}%</div><div class="summary-card-lbl">Win Rate</div></div>
          <div class="summary-card"><div class="summary-card-val">${t.reduce((r,n)=>r+(n.actual_rr||0),0).toFixed(2)} R</div><div class="summary-card-lbl">Realized R</div></div>
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
  `;t.forEach(r=>{const n=r.result==="Win"?"badge-win":r.result==="Loss"?"badge-loss":"badge-be",i=r.direction==="Buy"?"badge-buy":"badge-sell";s+=`
      <tr>
        <td>${r.date}</td>
        <td>${r.session}</td>
        <td>${r.pair}</td>
        <td><span class="badge ${i}">${r.direction}</span></td>
        <td>${r.strategy||""}</td>
        <td>${r.timeframe||""}</td>
        <td>${r.risk_percent}%</td>
        <td>${r.target_rr}:1</td>
        <td>${r.actual_rr}:1</td>
        <td><span class="badge ${n}">${r.result}</span></td>
        <td>${r.lesson_learned||""}</td>
      </tr>
    `}),s+=`
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
  `,e.document.write(s),e.document.close()}const zo=Object.freeze(Object.defineProperty({__proto__:null,openBacktestModal:Be,renderBacktesting:hn},Symbol.toStringTag,{value:"Module"})),Fo={win:"Win",won:"Win",profit:"Win",loss:"Loss",lost:"Loss",lose:"Loss","break even":"Break Even",breakeven:"Break Even",be:"Break Even",scratch:"Break Even"},qo=new Set(["closed","complete","completed","settled",""]),Ho=["Monday","Tuesday","Wednesday","Thursday","Friday"];function Wo(t){if(t==null||t==="")return null;const e=Number(t);return Number.isFinite(e)?e:null}function fs(...t){for(const e of t){const s=Wo(e);if(s!==null)return s}return null}function Ce(t,e="Unknown"){return t==null||String(t).trim()===""?e:String(t).trim()}function Vo(t){const e=String(t||"").trim().toLowerCase();return Fo[e]||null}function Ko(t){if(!t||typeof t!="object")return null;const e=Vo(t.result??t.outcome??t.status_result),s=String(t.status??"").trim().toLowerCase();if(!e||s&&!qo.has(s))return null;const r=fs(t.target_rr,t.targetRR,t.planned_rr,t.rr),n=fs(t.realized_r,t.realizedR,t.r_result,t.rResult,t.actual_rr,t.actualRR,t.result_r,t.resultR,e==="Win"?r:e==="Loss"?-1:0);if(n===null)return null;const i=t.date??t.trade_date??t.created_at,a=i?new Date(i).getTime():NaN;return Number.isFinite(a)?{raw:t,id:t.id,date:String(i),timestamp:a,pair:Ce(t.pair),session:Ce(t.session),account:Ce(t.accountType??t.account_type??t.account),strategy:Ce(t.strategy),setup:Ce(t.setup??t.timeframe),direction:Ce(t.direction??t.type),result:e,realizedR:n,targetRR:r,riskPercent:fs(t.risk_percent,t.riskPercent),notes:t.notes??t.lesson_learned??""}:null}function pn(t=[]){return t.map(Ko).filter(Boolean).sort((e,s)=>e.timestamp-s.timestamp||String(e.id).localeCompare(String(s.id)))}function Er(t,e={}){const s=pn(t),r=e.dateFrom?new Date(`${e.dateFrom}T00:00:00`).getTime():-1/0,n=e.dateTo?new Date(`${e.dateTo}T23:59:59.999`).getTime():1/0,i=(a,o)=>!a||a==="All"||a===o;return s.filter(a=>a.timestamp>=r&&a.timestamp<=n&&i(e.account,a.account)&&i(e.pair,a.pair)&&i(e.session,a.session)&&i(e.strategy,a.strategy)&&i(e.setup,a.setup)&&i(e.result,a.result)&&(!e.search||JSON.stringify(a.raw).toLowerCase().includes(String(e.search).toLowerCase())))}function Jo(t){return{label:t,trades:0,wins:0,losses:0,breakEven:0,winRate:0,lossRate:0,totalR:0,avgR:0,profitFactor:0,avgRR:0,maxDrawdown:0}}function Go(t,e){const s=new Map,r=typeof e=="function"?e:n=>n[e];return t.forEach(n=>{const i=Ce(r(n));s.has(i)||s.set(i,Jo(i));const a=s.get(i);a.trades+=1,n.result==="Win"&&(a.wins+=1),n.result==="Loss"&&(a.losses+=1),n.result==="Break Even"&&(a.breakEven+=1),a.totalR+=n.realizedR,a.avgRR+=n.targetRR||0}),[...s.values()].map(Yo)}function Yo(t){const e=t.wins+t.losses,s=(t.totalR>0,0),r=t._winR||0,n=t._lossR||0;return{...t,winRate:e?t.wins/e*100:0,lossRate:e?t.losses/e*100:0,avgR:t.trades?t.totalR/t.trades:0,avgRR:t.trades?t.avgRR/t.trades:0,profitFactor:n>0?r/n:r>0?1/0:0,_grossWin:s}}function Xo(t,e,s){const r=typeof s=="function"?s:i=>i[s],n=new Map;return e.forEach(i=>{const a=Ce(r(i));n.has(a)||n.set(a,{winR:0,lossR:0}),i.result==="Win"&&(n.get(a).winR+=Math.max(0,i.realizedR)),i.result==="Loss"&&(n.get(a).lossR+=Math.abs(Math.min(0,i.realizedR)))}),t.map(i=>{const a=n.get(i.label)||{winR:0,lossR:0};return{...i,profitFactor:a.lossR?a.winR/a.lossR:a.winR?1/0:0}})}function gn(t=[]){const e=Array.isArray(t)?t:[],s=e.filter(L=>L.result==="Win"),r=e.filter(L=>L.result==="Loss"),n=e.filter(L=>L.result==="Break Even"),i=s.length+r.length;let a=0,o=0,l=0,c=0,u=0,d=null,f=0,h=0,p=0,g=0,y=0;const v=[{tradeNumber:0,date:null,resultR:0,cumulativeR:0,drawdown:0}];e.forEach((L,D)=>{a+=L.realizedR,o=Math.max(o,a);const F=o-a;l=Math.max(l,F),F>0?(c+=F,d||(d={start:D,length:0},u+=1),d.length+=1,f=Math.max(f,d.length)):d=null,L.result==="Win"?(g+=1,y=0,h=Math.max(h,g)):L.result==="Loss"?(y+=1,g=0,p=Math.max(p,y)):(g=0,y=0),v.push({tradeNumber:D+1,date:L.date,resultR:L.realizedR,cumulativeR:a,drawdown:F})});const x=s.reduce((L,D)=>L+Math.max(0,D.realizedR),0),m=r.reduce((L,D)=>L+Math.abs(Math.min(0,D.realizedR)),0),k=s.length?x/s.length:0,I=r.length?m/r.length:0,T=L=>Xo(Go(e,L),e,L),S=T("pair"),B=T("session"),O=L=>{var D;return((D=L.filter(F=>F.trades>0).sort((F,R)=>R.totalR-F.totalR||R.avgR-F.avgR||R.trades-F.trades)[0])==null?void 0:D.label)||"Insufficient Data"};return{trades:e,totalTrades:e.length,wins:s.length,losses:r.length,breakEven:n.length,winRate:i?s.length/i*100:0,lossRate:i?r.length/i*100:0,breakEvenRate:e.length?n.length/e.length*100:0,averageRR:e.length?e.reduce((L,D)=>L+(D.targetRR||0),0)/e.length:0,averageRisk:e.filter(L=>L.riskPercent!==null).reduce((L,D)=>L+D.riskPercent,0)/(e.filter(L=>L.riskPercent!==null).length||1),grossWinR:x,grossLossR:m,profitFactor:m?x/m:x?1/0:0,realizedR:a,expectancy:(i?s.length/i:0)*k-(i?r.length/i:0)*I,maxDrawdown:l,averageDrawdown:u?c/e.length:0,longestDrawdown:f,drawdownPeriods:u,winStreak:h,lossStreak:p,currentWinStreak:g,currentLossStreak:y,bestPair:O(S),bestSession:O(B),equity:v,pairPerformance:S,sessionPerformance:B,strategyPerformance:T("strategy"),setupPerformance:T("setup"),dayPerformance:T(L=>{const D=new Date(`${L.date}T00:00:00`).toLocaleDateString("en-US",{weekday:"long"});return Ho.includes(D),D}),monthlyPerformance:T(L=>L.date.slice(0,7)),outcomeDistribution:[{label:"Winning trades",count:s.length},{label:"Losing trades",count:r.length},{label:"Break-even trades",count:n.length}]}}function H(t,e=2){return Number.isFinite(t)?t.toFixed(e):"N/A"}let ps=null,gs=null;function Zo(t){const e=b.activeDashboardTab,s=e==="live"?b.tradingTrades:b.backtestTrades,r=e==="live"?s:pn(s),n=e==="live"?el(r):Qo(gn(r));t.innerHTML=`
    <!-- Dashboard Header Nav Tabs -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${e==="live"?"btn-primary":"btn-secondary"}" id="tab-live-btn" style="padding: 8px 16px; font-size: 13px;">Live Trading</button>
        <button class="btn ${e==="backtest"?"btn-primary":"btn-secondary"}" id="tab-backtest-btn" style="padding: 8px 16px; font-size: 13px;">Backtesting</button>
      </div>
      <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
        <span style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Data Status: <span style="color: var(--color-win)">● Sync Complete</span></span>
        <span style="font-size: 12px; padding: 6px 10px; border-radius: 999px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); font-weight: 700;">Account: ${b.selectedAccount||"All"}</span>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-card-label">${e==="live"?"Total Trades":"Total Backtest Trades"}</div>
        <div class="metric-card-value">${n.total}</div>
        <div class="metric-card-sub">Active Journal</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Win Rate</div>
        <div class="metric-card-value" style="color: var(--color-win);">${n.winRate}%</div>
        <div class="metric-card-sub">Target: &gt;50%</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Avg. Risk Reward</div>
        <div class="metric-card-value">${n.avgRR}:1</div>
        <div class="metric-card-sub">Ratio per trade</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Profit Factor</div>
        <div class="metric-card-value" style="color: ${n.profitFactor>=1.5?"var(--color-win)":"var(--text-primary)"}">${n.profitFactor}</div>
        <div class="metric-card-sub">Gross Win / Loss</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Realized R-Multiple</div>
        <div class="metric-card-value" style="color: ${n.netR>=0?"var(--color-win)":"var(--color-loss)"}">${n.netR>0?"+":""}${n.netR} R</div>
        <div class="metric-card-sub">Growth return</div>
      </div>
      <div class="metric-card">
        <div class="metric-card-label">Max Drawdown</div>
        <div class="metric-card-value" style="color: var(--color-loss);">${n.maxDrawdown}%</div>
        <div class="metric-card-sub">Peak to trough decline</div>
      </div>
    </div>

    <!-- Secondary Metrics row -->
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); margin-bottom: 32px;">
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Win Streak</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-win);">${n.winStreak} Wins</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Loss Streak</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-loss);">${n.lossStreak} Losses</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Avg. Risk</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--text-primary);">${n.avgRisk}%</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Best Pair</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--accent-secondary);">${n.bestPair}</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Best Session</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--accent-color);">${n.bestSession}</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Loss Rate</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-loss);">${n.lossRate}%</div>
      </div>
      <div class="metric-card" style="min-height: 90px; padding: 16px;">
        <div class="metric-card-label" style="font-size: 10px;">Break Even Rate</div>
        <div class="metric-card-value" style="font-size: 20px; color: var(--color-be);">${n.beRate}%</div>
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
  `,document.getElementById("tab-live-btn").addEventListener("click",()=>{b.setDashboardTab("live")}),document.getElementById("tab-backtest-btn").addEventListener("click",()=>{b.setDashboardTab("backtest"),b.setView("dashboard")}),document.getElementById("view-all-journal-btn").addEventListener("click",()=>{b.setView(e==="live"?"journal":"backtesting")});const i=document.getElementById("recent-trades-body"),a=[...r].sort((o,l)=>new Date(l.date)-new Date(o.date)).slice(0,5);a.length===0?i.innerHTML=`<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">No trades logged yet. Click 'New Trade' to get started!</td></tr>`:(i.innerHTML=a.map(o=>{const l=e==="backtest",c=o.result==="Win"?"badge-win":o.result==="Loss"?"badge-loss":"badge-be",u=l?o.direction:o.type,d=u==="Buy"?"badge-buy":"badge-sell",f=l?o.target_rr||0:o.rr||0,h=l?o.actual_rr!==void 0?o.actual_rr.toFixed(2):o.result==="Win"?f:o.result==="Loss"?-1:0:o.result==="Win"?o.rr:o.result==="Loss"?-1:0,p=o.result==="Win"?`+${h}`:h,g=l?o.timeframe||"N/A":o.setup||"N/A";return`
        <tr style="cursor: pointer;" class="recent-trade-row" data-id="${o.id}">
          <td>${o.date}</td>
          <td style="font-weight: 700;">${o.pair}</td>
          <td><span class="badge ${d}">${u}</span></td>
          <td><span class="badge badge-session ${o.session.toLowerCase().replace(" ","")}">${o.session}</span></td>
          <td><span class="badge ${c}">${o.result}</span></td>
          <td style="font-weight: 600; color: ${o.result==="Win"?"var(--color-win)":o.result==="Loss"?"var(--color-loss)":"var(--color-be)"}">${p}R</td>
          <td>${o.strategy||"N/A"}</td>
          <td style="color: var(--text-muted); font-size: 13px;">${g}</td>
        </tr>
      `}).join(""),document.querySelectorAll(".recent-trade-row").forEach(o=>{o.addEventListener("click",()=>{const l=o.dataset.id,c=s.find(u=>u.id===Number(l));c&&(e==="backtest"?Be(c):ns(c,e))})})),tl(r,n.equityData)}function Qo(t){return{total:t.totalTrades,winRate:t.winRate.toFixed(1),lossRate:t.lossRate.toFixed(1),beRate:t.breakEvenRate.toFixed(1),avgRR:t.averageRR.toFixed(2),profitFactor:Number.isFinite(t.profitFactor)?t.profitFactor.toFixed(2):"N/A",netR:t.realizedR.toFixed(2),maxDrawdown:t.maxDrawdown.toFixed(2),winStreak:t.winStreak,lossStreak:t.lossStreak,bestPair:t.bestPair,bestSession:t.bestSession,avgRisk:t.averageRisk.toFixed(2),equityData:t.equity.map(e=>e.cumulativeR)}}function el(t){const e=t.length;if(e===0)return{total:0,winRate:0,lossRate:0,beRate:0,avgRR:"0.00",profitFactor:"0.00",netR:"0.00",maxDrawdown:0,winStreak:0,lossStreak:0,bestPair:"N/A",bestSession:"N/A",avgRisk:"0.00",equityData:[]};const s=t.map(R=>{const U=R.target_rr!==void 0||R.actual_rr!==void 0,qe=U?R.target_rr||0:R.rr||0,Tt=U&&R.actual_rr!==void 0?R.actual_rr:R.result==="Win"?qe:R.result==="Loss"?-1:0,At=U?R.risk_percent||0:R.riskPercent||0,$t=U?R.direction||"":R.type||"";return{...R,targetRR:qe,actualRR:Tt,riskPercent:At,direction:$t}}),r=s.filter(R=>R.result==="Win"),n=s.filter(R=>R.result==="Loss"),i=s.filter(R=>R.result==="Break Even"),a=(r.length/e*100).toFixed(1),o=(n.length/e*100).toFixed(1),l=(i.length/e*100).toFixed(1),c=(s.reduce((R,U)=>R+U.targetRR,0)/e).toFixed(2),u=(s.reduce((R,U)=>R+U.riskPercent,0)/e).toFixed(2);let d=0,f=[0],h=0,p=0;const g=[...s].sort((R,U)=>new Date(R.date)-new Date(U.date));g.forEach(R=>{d+=R.actualRR,f.push(d),d>h&&(h=d);const U=h-d;U>p&&(p=U)});const y=r.reduce((R,U)=>R+U.actualRR,0),v=n.reduce((R,U)=>R+Math.abs(U.actualRR),0),x=v>0?(y/v).toFixed(2):y.toFixed(2);let m=0,k=0,I=0,T=0;g.forEach(R=>{R.result==="Win"?(k++,T=0,k>m&&(m=k)):R.result==="Loss"?(T++,k=0,T>I&&(I=T)):(k=0,T=0)});const S={};s.forEach(R=>{S[R.pair]=(S[R.pair]||0)+R.actualRR});let B="N/A",O=-1/0;Object.keys(S).forEach(R=>{S[R]>O&&(O=S[R],B=R)});const L={};s.forEach(R=>{L[R.session]=(L[R.session]||0)+R.actualRR});let D="N/A",F=-1/0;return Object.keys(L).forEach(R=>{L[R]>F&&(F=L[R],D=R)}),{total:e,winRate:a,lossRate:o,beRate:l,avgRR:c,profitFactor:x,netR:d.toFixed(2),maxDrawdown:p.toFixed(1),winStreak:m,lossStreak:I,bestPair:B,bestSession:D,avgRisk:u,equityData:f}}function tl(t,e){var u,d;const s=(u=document.getElementById("equityCurveChart"))==null?void 0:u.getContext("2d"),r=(d=document.getElementById("sessionDistChart"))==null?void 0:d.getContext("2d");if(!s||!r)return;ps&&ps.destroy(),gs&&gs.destroy();const n=document.body.classList.contains("light-theme"),i=n?"rgba(0, 0, 0, 0.05)":"rgba(255, 255, 255, 0.05)",a=n?"#475569":"#94a3b8",o=e.map((f,h)=>`T${h}`),l=s.createLinearGradient(0,0,0,300);l.addColorStop(0,"rgba(59, 130, 246, 0.3)"),l.addColorStop(1,"rgba(59, 130, 246, 0.0)"),ps=new Chart(s,{type:"line",data:{labels:o,datasets:[{label:"Cumulative R",data:e,borderColor:"#3b82f6",borderWidth:3,pointBackgroundColor:"#3b82f6",pointHoverRadius:6,fill:!0,backgroundColor:l,tension:.3}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{color:i},ticks:{color:a,font:{family:"Plus Jakarta Sans"}}},y:{grid:{color:i},ticks:{color:a,font:{family:"Plus Jakarta Sans"}}}}}});const c={Asia:0,London:0,"New York":0};t.forEach(f=>{c[f.session]!==void 0&&c[f.session]++}),gs=new Chart(r,{type:"doughnut",data:{labels:["Asia","London","New York"],datasets:[{data:[c.Asia,c.London,c["New York"]],backgroundColor:["#8b5cf6","#3b82f6","#ec4899"],borderWidth:0,hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:a,font:{family:"Plus Jakarta Sans",size:12},padding:16}}},cutout:"70%"}})}let P={search:"",pair:"All",session:"All",result:"All",strategy:"All",sortBy:"date-desc"};function sl(t,e="live"){const s=e==="live"?b.tradingTrades:b.backtestTrades,r=e==="live"?"TradingJournal":"BacktestingJournal",n=["All",...new Set(s.map(l=>l.pair))],i=["All",...new Set(s.map(l=>l.strategy).filter(Boolean))];t.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Filters and Header Controls -->
      <div class="card" style="padding: 18px;">
        <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: center; justify-content: space-between;">
          
          <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center; flex: 1;">
            <!-- Filter Pair -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Pair</span>
              <select id="filter-pair" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 110px; height: 36px;">
                ${n.map(l=>`<option value="${l}" ${P.pair===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>

            <!-- Filter Session -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Session</span>
              <select id="filter-session" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${P.session==="All"?"selected":""}>All Sessions</option>
                <option value="Asia" ${P.session==="Asia"?"selected":""}>Asia</option>
                <option value="London" ${P.session==="London"?"selected":""}>London</option>
                <option value="New York" ${P.session==="New York"?"selected":""}>New York</option>
              </select>
            </div>

            <!-- Filter Result -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result</span>
              <select id="filter-result" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 120px; height: 36px;">
                <option value="All" ${P.result==="All"?"selected":""}>All Outcomes</option>
                <option value="Win" ${P.result==="Win"?"selected":""}>Wins</option>
                <option value="Loss" ${P.result==="Loss"?"selected":""}>Losses</option>
                <option value="Break Even" ${P.result==="Break Even"?"selected":""}>Break Evens</option>
              </select>
            </div>

            <!-- Filter Strategy -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Strategy</span>
              <select id="filter-strategy" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                ${i.map(l=>`<option value="${l}" ${P.strategy===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>

            <!-- Sort By -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Sort By</span>
              <select id="filter-sort" class="form-control" style="padding: 8px 12px; font-size: 13px; width: 140px; height: 36px;">
                <option value="date-desc" ${P.sortBy==="date-desc"?"selected":""}>Newest First</option>
                <option value="date-asc" ${P.sortBy==="date-asc"?"selected":""}>Oldest First</option>
                <option value="rr-desc" ${P.sortBy==="rr-desc"?"selected":""}>Highest R:R</option>
                <option value="rr-asc" ${P.sortBy==="rr-asc"?"selected":""}>Lowest R:R</option>
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
  `;function a(){let l=[...s];if(P.search){const u=P.search;l=l.filter(d=>d.pair.toLowerCase().includes(u)||d.strategy&&d.strategy.toLowerCase().includes(u)||d.session.toLowerCase().includes(u)||d.result.toLowerCase().includes(u)||d.date.includes(u)||d.labelA&&d.labelA.toLowerCase().includes(u)||d.labelB&&d.labelB.toLowerCase().includes(u)||d.notes&&d.notes.toLowerCase().includes(u))}P.pair!=="All"&&(l=l.filter(u=>u.pair===P.pair)),P.session!=="All"&&(l=l.filter(u=>u.session===P.session)),P.result!=="All"&&(l=l.filter(u=>u.result===P.result)),P.strategy!=="All"&&(l=l.filter(u=>u.strategy===P.strategy)),P.sortBy==="date-desc"?l.sort((u,d)=>new Date(d.date)-new Date(u.date)):P.sortBy==="date-asc"?l.sort((u,d)=>new Date(u.date)-new Date(d.date)):P.sortBy==="rr-desc"?l.sort((u,d)=>d.rr-u.rr):P.sortBy==="rr-asc"&&l.sort((u,d)=>u.rr-d.rr);const c=document.getElementById("journal-table-body");if(l.length===0){c.innerHTML='<tr><td colspan="11" style="text-align: center; padding: 48px; color: var(--text-muted);">No records found matching current criteria.</td></tr>';return}c.innerHTML=l.map(u=>{const d=u.result==="Win"?"badge-win":u.result==="Loss"?"badge-loss":"badge-be",f=u.type==="Buy"?"badge-buy":"badge-sell";return`
        <tr class="journal-row" data-id="${u.id}" style="cursor: pointer;">
          <td>
            <div style="font-weight: 600; color: var(--text-primary);">${u.date}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${u.day}</div>
          </td>
          <td style="font-weight: 700; font-size: 15px;">${u.pair}</td>
          <td><span class="badge ${f}">${u.type}</span></td>
          <td><span class="badge badge-session ${u.session.toLowerCase().replace(" ","")}">${u.session}</span></td>
          <td><span class="badge ${d}">${u.result}</span></td>
          <td style="font-weight: 600;">${u.rr}:1</td>
          <td>${u.riskPercent}%</td>
          <td>${u.strategy||"N/A"}</td>
          <td style="color: var(--text-secondary); max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${u.setup||"N/A"}</td>
          <td>${u.labelA||"—"}</td>
          <td>${u.labelB||"—"}</td>
        </tr>
      `}).join(""),document.querySelectorAll(".journal-row").forEach(u=>{u.addEventListener("click",()=>{const d=Number(u.dataset.id),f=s.find(h=>h.id===d);f&&rl(f,r,e)})})}const o=l=>{P.search=l.detail,a()};return window.addEventListener("globalSearch",o),document.getElementById("filter-pair").addEventListener("change",l=>{P.pair=l.target.value,a()}),document.getElementById("filter-session").addEventListener("change",l=>{P.session=l.target.value,a()}),document.getElementById("filter-result").addEventListener("change",l=>{P.result=l.target.value,a()}),document.getElementById("filter-strategy").addEventListener("change",l=>{P.strategy=l.target.value,a()}),document.getElementById("filter-sort").addEventListener("change",l=>{P.sortBy=l.target.value,a()}),document.getElementById("clear-filters-btn").addEventListener("click",()=>{P={search:"",pair:"All",session:"All",result:"All",strategy:"All",sortBy:"date-desc"};const l=document.getElementById("global-search");l&&(l.value=""),document.getElementById("filter-pair").value="All",document.getElementById("filter-session").value="All",document.getElementById("filter-result").value="All",document.getElementById("filter-strategy").value="All",document.getElementById("filter-sort").value="date-desc",a()}),document.getElementById("add-trade-journal-btn").addEventListener("click",()=>{ns(null,e)}),a(),()=>{window.removeEventListener("globalSearch",o)}}function rl(t,e,s){const r=document.getElementById("trade-drawer-overlay"),n=document.getElementById("trade-drawer-container"),i=t.type==="Buy"?"badge-buy":"badge-sell",a=t.result==="Win"?"badge-win":t.result==="Loss"?"badge-loss":"badge-be",o=t.result==="Win"?`+${t.rr}R`:t.result==="Loss"?"-1.00R":"0.00R";n.innerHTML=`
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
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Label A</span><span style="font-weight: 600; color: var(--text-primary);">${t.labelA||"—"}</span></div>
          <div style="display: flex; justify-content: space-between; font-size: 13px;"><span style="color: var(--text-secondary);">Label B</span><span style="font-weight: 600; color: var(--text-primary);">${t.labelB||"—"}</span></div>
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
  `,r.classList.add("active"),n.classList.add("active");const l=()=>{r.classList.remove("active"),n.classList.remove("active")};document.getElementById("close-drawer-btn").addEventListener("click",l),r.addEventListener("click",l),document.getElementById("delete-trade-btn").addEventListener("click",async()=>{confirm("Are you sure you want to delete this trade record permanently?")&&(await rs(e,t.id),await Rt(t,null),l(),b.refreshCache(),Os())}),document.getElementById("edit-trade-btn").addEventListener("click",()=>{l(),ns(t,s)}),document.querySelectorAll(".details-chart-img").forEach(c=>{c.addEventListener("click",()=>{nl(t)})})}function nl(t){const e=document.createElement("div");e.className="modal-overlay active",e.style.zIndex="2000",e.innerHTML=`
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
  `,document.body.appendChild(e);const s=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),250)};e.querySelector("#close-viewer-btn").addEventListener("click",s),e.addEventListener("click",c=>{c.target===e&&s()});const r=e.querySelector("#fullscreen-slider-container"),n=e.querySelector("#slider-after-container"),i=e.querySelector("#slider-handle"),a=n.querySelector("img");let o=!1;const l=c=>{const u=r.getBoundingClientRect();let d=c-u.left;d<0&&(d=0),d>u.width&&(d=u.width);const f=d/u.width*100;n.style.width=`${f}%`,i.style.left=`${f}%`,a.style.width=`${u.width}px`};setTimeout(()=>{const c=r.getBoundingClientRect();a.style.width=`${c.width}px`},100),i.addEventListener("mousedown",()=>o=!0),window.addEventListener("mouseup",()=>o=!1),window.addEventListener("mousemove",c=>{o&&l(c.clientX)}),i.addEventListener("touchstart",()=>o=!0),window.addEventListener("touchend",()=>o=!1),window.addEventListener("touchmove",c=>{o&&l(c.touches[0].clientX)})}let Se=new Date,de="all",Re="All";function Sr(t){return t.accountType||t.account_type||t.account||"Unknown"}function tt(t){const e=Number(t.plMoney??t.pl_money);return Number.isFinite(e)?t.result==="Loss"?-Math.abs(e):t.result==="Win"?Math.abs(e):e:null}function $e(t){let e=[];(de==="all"||de==="live")&&(e=e.concat(b.tradingTrades.map(d=>({...d,source:"live"})))),(de==="all"||de==="backtest")&&(e=e.concat(b.backtestTrades.map(d=>({...d,source:"backtest"}))));const s=[...new Set(e.map(Sr))].filter(Boolean).sort();Re!=="All"&&!s.includes(Re)&&(Re="All"),e=e.filter(d=>Re==="All"||Sr(d)===Re);const r=Se.getFullYear(),n=Se.getMonth(),i=Se.toLocaleDateString("en-US",{month:"long"}),a=new Date(r,n,1).getDay(),o=a===0?6:a-1,l=new Date(r,n+1,0).getDate();let c="";for(let d=0;d<o;d++)c+='<div class="calendar-day empty"></div>';const u=new Date().toISOString().split("T")[0];for(let d=1;d<=l;d++){const f=String(d).padStart(2,"0"),h=String(n+1).padStart(2,"0"),p=`${r}-${h}-${f}`,g=e.filter(B=>B.date===p),y=g.filter(B=>B.result==="Win").length,v=g.filter(B=>B.result==="Loss").length,x=g.filter(B=>B.result==="Break Even").length,m=g.reduce((B,O)=>{const L=tt(O);return L===null?B:B+L},0),k=g.some(B=>tt(B)!==null),I=u===p,T=g.length>0;let S="";if(y>0&&(S+=`<div class="calendar-day-badge win"><span>Wins</span><span>${y}</span></div>`),v>0&&(S+=`<div class="calendar-day-badge loss"><span>Loss</span><span>${v}</span></div>`),x>0&&(S+=`<div class="calendar-day-badge be"><span>BE</span><span>${x}</span></div>`),k){const B=`${m>=0?"+":"-"}$${Math.abs(m).toFixed(2)}`;S+=`<div class="calendar-day-badge pl ${m>=0?"positive":"negative"}"><span>P/L</span><span>${B}</span></div>`}c+=`
      <div class="calendar-day ${I?"today":""}" data-date="${p}" style="${T?"border-color: rgba(59, 130, 246, 0.3);":""}">
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
            <button class="btn ${de==="all"?"btn-primary":"btn-secondary"}" id="cal-src-all" style="padding: 6px 12px; font-size: 12px;">All Trades</button>
            <button class="btn ${de==="live"?"btn-primary":"btn-secondary"}" id="cal-src-live" style="padding: 6px 12px; font-size: 12px;">Live Only</button>
            <button class="btn ${de==="backtest"?"btn-primary":"btn-secondary"}" id="cal-src-backtest" style="padding: 6px 12px; font-size: 12px;">Backtest Only</button>
          </div>

          <div style="display: flex; align-items: center; gap: 16px;">
            <button class="btn btn-secondary btn-icon" id="cal-prev-month-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span class="calendar-month-year">${i} ${r}</span>
            <button class="btn btn-secondary btn-icon" id="cal-next-month-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <select id="cal-account-selector" class="form-control" style="width: 150px; height: 36px; padding: 6px 10px; font-size: 12px;">
            <option value="All" ${Re==="All"?"selected":""}>All Accounts</option>
            ${s.map(d=>`<option value="${d}" ${Re===d?"selected":""}>${d}</option>`).join("")}
          </select>

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

          ${c}
        </div>
      </div>

    </div>
  `,document.getElementById("cal-prev-month-btn").addEventListener("click",()=>{Se.setMonth(Se.getMonth()-1),$e(t)}),document.getElementById("cal-next-month-btn").addEventListener("click",()=>{Se.setMonth(Se.getMonth()+1),$e(t)}),document.getElementById("cal-today-btn").addEventListener("click",()=>{Se=new Date,$e(t)}),document.getElementById("cal-src-all").addEventListener("click",()=>{de="all",$e(t)}),document.getElementById("cal-src-live").addEventListener("click",()=>{de="live",$e(t)}),document.getElementById("cal-src-backtest").addEventListener("click",()=>{de="backtest",$e(t)}),document.getElementById("cal-account-selector").addEventListener("change",d=>{Re=d.target.value,$e(t)}),document.querySelectorAll(".calendar-day:not(.empty)").forEach(d=>{d.addEventListener("click",()=>{const f=d.dataset.date,h=e.filter(p=>p.date===f);h.length>0&&il(f,h)})})}function il(t,e){const s=document.createElement("div");s.className="modal-overlay active",s.style.zIndex="1500",s.innerHTML=`
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
                ${tt(n)!==null?`<span style="font-weight: 700; font-size: 13px; color: ${tt(n)>=0?"var(--color-win)":"var(--color-loss)"}">${tt(n)>=0?"+":"-"}$${Math.abs(tt(n)).toFixed(2)}</span>`:""}
                <span style="font-weight: 700; font-size: 13px; color: var(--text-primary);">${n.result==="Win"?`+${n.rr}`:n.result==="Loss"?"-1.00":"0.00"}R</span>
              </div>
            </div>
          `}).join("")}
      </div>
      <div class="modal-footer" style="padding: 12px 20px;">
        <button class="btn btn-secondary" id="close-cal-overlay-ok">Close</button>
      </div>
    </div>
  `,document.body.appendChild(s);const r=()=>{s.classList.remove("active"),setTimeout(()=>s.remove(),250)};s.querySelector("#close-cal-overlay-btn").addEventListener("click",r),s.querySelector("#close-cal-overlay-ok").addEventListener("click",r),s.addEventListener("click",n=>{n.target===s&&r()}),s.querySelectorAll(".cal-trade-item").forEach(n=>{n.addEventListener("click",()=>{const i=Number(n.dataset.id),a=n.dataset.source;(a==="live"?b.tradingTrades:b.backtestTrades).find(l=>l.id===i),r(),b.setView(a==="live"?"journal":"backtesting"),setTimeout(()=>{const l=document.querySelector(`.journal-row[data-id="${i}"]`);l&&l.click()},300)})})}let ue={};function al(t){const e=b.activeDashboardTab,s=e==="live"?b.tradingTrades:b.backtestTrades;t.innerHTML=`
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
  `,document.getElementById("analy-tab-live").addEventListener("click",()=>{b.setDashboardTab("live")}),document.getElementById("analy-tab-backtest").addEventListener("click",()=>{b.setDashboardTab("backtest")}),setTimeout(()=>ol(s),50)}function ol(t){var R,U,qe,Tt,At,$t,js;if(Object.keys(ue).forEach(A=>{ue[A]&&ue[A].destroy()}),t.length===0)return;const e=document.body.classList.contains("light-theme"),s=e?"rgba(0, 0, 0, 0.05)":"rgba(255, 255, 255, 0.05)",r=e?"#475569":"#94a3b8",n=[...t].sort((A,Q)=>new Date(A.date)-new Date(Q.date)),i=[0],a=[0];let o=0,l=0;n.forEach(A=>{const Q=A.result==="Win"?A.rr:A.result==="Loss"?-1:0;o+=Q,i.push(o),o>l&&(l=o);const is=l-o;a.push(-is)});const c=(R=document.getElementById("analy-equity-chart"))==null?void 0:R.getContext("2d");c&&(ue.equity=new Chart(c,{type:"line",data:{labels:i.map((A,Q)=>`T${Q}`),datasets:[{label:"Cumulative Realized R",data:i,borderColor:"#3b82f6",backgroundColor:"rgba(59, 130, 246, 0.08)",borderWidth:3,fill:!0,tension:.25},{label:"Drawdown curve (R)",data:a,borderColor:"#ef4444",backgroundColor:"rgba(239, 68, 68, 0.05)",borderWidth:1.5,fill:!0,tension:.25}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:s},ticks:{color:r}},y:{grid:{color:s},ticks:{color:r}}},plugins:{legend:{labels:{color:r}}}}}));const u={Win:0,Loss:0,BE:0};t.forEach(A=>{A.result==="Win"?u.Win++:A.result==="Loss"?u.Loss++:u.BE++});const d=(U=document.getElementById("analy-winrate-chart"))==null?void 0:U.getContext("2d");d&&(ue.winrate=new Chart(d,{type:"doughnut",data:{labels:["Win","Loss","Break Even"],datasets:[{data:[u.Win,u.Loss,u.BE],backgroundColor:["#10b981","#ef4444","#f59e0b"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:r}}}}}));const f={Asia:{r:0,count:0},London:{r:0,count:0},"New York":{r:0,count:0}};t.forEach(A=>{const Q=A.result==="Win"?A.rr:A.result==="Loss"?-1:0;f[A.session]&&(f[A.session].r+=Q,f[A.session].count++)});const h=Object.keys(f).map(A=>f[A].count>0?(f[A].r/f[A].count).toFixed(2):0),p=(qe=document.getElementById("analy-session-chart"))==null?void 0:qe.getContext("2d");p&&(ue.session=new Chart(p,{type:"bar",data:{labels:["Asia","London","New York"],datasets:[{label:"Avg R Realized",data:h,backgroundColor:["rgba(139, 92, 246, 0.7)","rgba(59, 130, 246, 0.7)","rgba(236, 72, 153, 0.7)"],borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:s},ticks:{color:r}},y:{grid:{color:s},ticks:{color:r}}},plugins:{legend:{display:!1}}}}));const g={};t.forEach(A=>{const Q=A.result==="Win"?A.rr:A.result==="Loss"?-1:0;g[A.pair]=(g[A.pair]||0)+Q});const y=Object.keys(g),v=Object.values(g),x=(Tt=document.getElementById("analy-pair-chart"))==null?void 0:Tt.getContext("2d");x&&(ue.pair=new Chart(x,{type:"bar",data:{labels:y,datasets:[{label:"Net R-multiple",data:v,backgroundColor:v.map(A=>A>=0?"rgba(16, 185, 129, 0.7)":"rgba(239, 68, 68, 0.7)"),borderRadius:6}]},options:{indexAxis:"y",responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:s},ticks:{color:r}},y:{grid:{color:s},ticks:{color:r}}},plugins:{legend:{display:!1}}}}));const m={};t.forEach(A=>{A.strategy&&(m[A.strategy]||(m[A.strategy]={win:0,loss:0,be:0,total:0}),m[A.strategy].total++,A.result==="Win"?m[A.strategy].win++:A.result==="Loss"?m[A.strategy].loss++:m[A.strategy].be++)});const k=Object.keys(m),I=k.map(A=>(m[A].win/m[A].total*100).toFixed(1)),T=(At=document.getElementById("analy-strategy-chart"))==null?void 0:At.getContext("2d");T&&(ue.strategy=new Chart(T,{type:"bar",data:{labels:k,datasets:[{label:"Win Rate %",data:I,backgroundColor:"rgba(16, 185, 129, 0.75)",borderColor:"#10b981",borderWidth:1,borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:s},ticks:{color:r}},y:{min:0,max:100,grid:{color:s},ticks:{color:r}}},plugins:{legend:{display:!1}}}}));const S={};t.forEach(A=>{const Q=A.date.substring(0,7),is=A.result==="Win"?A.rr:A.result==="Loss"?-1:0;S[Q]=(S[Q]||0)+is});const B=Object.keys(S).sort(),O=B.map(A=>S[A]),L=($t=document.getElementById("analy-monthly-chart"))==null?void 0:$t.getContext("2d");L&&(ue.monthly=new Chart(L,{type:"line",data:{labels:B,datasets:[{label:"Growth (R)",data:O,borderColor:"#0ea5e9",backgroundColor:"rgba(14, 165, 233, 0.1)",fill:!0,tension:.2,borderWidth:3}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{grid:{color:s},ticks:{color:r}},y:{grid:{color:s},ticks:{color:r}}},plugins:{legend:{display:!1}}}}));const D=t.map(A=>({x:A.riskPercent,y:A.rr})),F=(js=document.getElementById("analy-rr-chart"))==null?void 0:js.getContext("2d");F&&(ue.rr=new Chart(F,{type:"scatter",data:{datasets:[{label:"Target R:R / Risk %",data:D,backgroundColor:"#3b82f6",pointRadius:6,pointHoverRadius:8}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{x:{title:{display:!0,text:"Risk %",color:r},grid:{color:s},ticks:{color:r}},y:{title:{display:!0,text:"Target RR",color:r},grid:{color:s},ticks:{color:r}}},plugins:{legend:{display:!1}}}}))}let ct="live",je="All";function qt(t){let r=(ct==="live"?b.tradingTrades:b.backtestTrades).map(i=>{const a=i.before_image!==void 0||i.after_image!==void 0;return{id:i.id,pair:i.pair,date:i.date,session:i.session,result:i.result,direction:a?i.direction:i.type,targetRR:a?i.target_rr||0:i.rr||0,lessonLearned:a?i.lesson_learned||"":i.lessonLearned||"",beforeImage:a?i.before_image:i.beforeScreenshot,afterImage:a?i.after_image:i.afterScreenshot}}).filter(i=>i.beforeImage||i.afterImage);je!=="All"&&(r=r.filter(i=>i.result===je)),t.innerHTML=`
    <!-- Gallery Controls Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 16px;">
      
      <div style="display: flex; gap: 8px; background: var(--bg-secondary); padding: 4px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <button class="btn ${ct==="live"?"btn-primary":"btn-secondary"}" id="gal-btn-live" style="padding: 8px 16px; font-size: 13px;">Trading Screenshots</button>
        <button class="btn ${ct==="backtest"?"btn-primary":"btn-secondary"}" id="gal-btn-backtest" style="padding: 8px 16px; font-size: 13px;">Backtesting Screenshots</button>
      </div>

      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Result Filter</span>
        <select id="gal-filter-outcome" class="form-control" style="padding: 6px 12px; font-size: 13px; width: 140px; height: 34px;">
          <option value="All" ${je==="All"?"selected":""}>All Screenshots</option>
          <option value="Win" ${je==="Win"?"selected":""}>Wins Only</option>
          <option value="Loss" ${je==="Loss"?"selected":""}>Losses Only</option>
          <option value="Break Even" ${je==="Break Even"?"selected":""}>Break Evens Only</option>
        </select>
      </div>

    </div>

    <!-- Gallery Grid -->
    <div class="gallery-grid" id="screenshot-gallery-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
      <!-- Populated by script -->
    </div>
  `;const n=document.getElementById("screenshot-gallery-grid");r.length===0?n.innerHTML=`
      <div style="grid-column: 1 / -1; text-align: center; padding: 64px 0; color: var(--text-muted);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        <p style="font-weight: 600; font-size:15px; color: var(--text-primary);">No screenshots found</p>
        <p style="font-size: 13px; margin-top: 4px;">Upload Before/After charts when logging trades to populate your gallery.</p>
      </div>
    `:(n.innerHTML=r.map(i=>{const a=i.direction==="Buy"?"badge-buy":"badge-sell",o=i.result==="Win"?"badge-win":i.result==="Loss"?"badge-loss":"badge-be";return`
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
      `}).join(""),n.querySelectorAll(".gallery-trigger-img").forEach(i=>{i.addEventListener("click",()=>{const a=Number(i.dataset.id),o=r.find(l=>l.id===a);o&&Rr(o)})}),n.querySelectorAll(".compare-trigger-btn").forEach(i=>{i.addEventListener("click",()=>{const a=Number(i.dataset.id),o=r.find(l=>l.id===a);o&&Rr(o)})})),document.getElementById("gal-btn-live").addEventListener("click",()=>{ct="live",qt(t)}),document.getElementById("gal-btn-backtest").addEventListener("click",()=>{ct="backtest",qt(t)}),document.getElementById("gal-filter-outcome").addEventListener("change",i=>{je=i.target.value,qt(t)})}function Rr(t){const e=document.createElement("div");e.className="modal-overlay active",e.style.zIndex="2000",e.innerHTML=`
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
  `,document.body.appendChild(e);const s=()=>{e.classList.remove("active"),setTimeout(()=>e.remove(),250)};e.querySelector("#close-gal-viewer-btn").addEventListener("click",s),e.addEventListener("click",c=>{c.target===e&&s()});const r=e.querySelector("#gal-slider-container"),n=e.querySelector("#gal-slider-after-container"),i=e.querySelector("#gal-slider-handle"),a=n.querySelector("img");let o=!1;const l=c=>{const u=r.getBoundingClientRect();let d=c-u.left;d<0&&(d=0),d>u.width&&(d=u.width);const f=d/u.width*100;n.style.width=`${f}%`,i.style.left=`${f}%`,a.style.width=`${u.width}px`};setTimeout(()=>{const c=r.getBoundingClientRect();a.style.width=`${c.width}px`},100),i.addEventListener("mousedown",()=>o=!0),window.addEventListener("mouseup",()=>o=!1),window.addEventListener("mousemove",c=>{o&&l(c.clientX)}),i.addEventListener("touchstart",()=>o=!0),window.addEventListener("touchend",()=>o=!1),window.addEventListener("touchmove",c=>{o&&l(c.touches[0].clientX)})}let te="monthly",xe="live",Te="all",Ae="all";function $s(t){const e=String(t||"").trim().toLowerCase();return e==="asian"?"Asia":e==="new york"||e==="newyork"?"New York":e==="london"?"London":e==="asia"?"Asia":t||"Other"}function ie(t){var o;const e=xe==="live"?b.tradingTrades:b.backtestTrades,s=[...new Set(e.map(l=>new Date(l.date).getFullYear()).filter(Number.isFinite))].sort((l,c)=>c-l),r=[...new Set(e.map(l=>$s(l.session)))].sort();Te!=="all"&&!s.includes(Number(Te))&&(Te="all"),Ae!=="all"&&!r.includes(Ae)&&(Ae="all");const n=ll(e,te,Te,Ae),i=cl(n),a=dl(te,Te);t.innerHTML=`
    <div class="reports-layout">
      
      <!-- Report Controls Sidebar -->
      <div class="report-controls">
        
        <!-- Target Journal -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Journal Source</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <label class="checkbox-label" style="margin-bottom:0;">
              <input type="radio" name="report-src" value="live" ${xe==="live"?"checked":""} id="src-live">
              <span>Live Trading Journal</span>
            </label>
            <label class="checkbox-label" style="margin-bottom:0;">
              <input type="radio" name="report-src" value="backtest" ${xe==="backtest"?"checked":""} id="src-back">
              <span>Backtesting Journal</span>
            </label>
          </div>
        </div>

        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Session</h4>
          <select id="report-session-selector" class="form-control" style="width: 100%;">
            <option value="all" ${Ae==="all"?"selected":""}>All Sessions</option>
            ${["London","New York","Asia"].filter(l=>r.includes(l)).map(l=>`<option value="${l}" ${Ae===l?"selected":""}>${l}</option>`).join("")}
            ${r.filter(l=>!["London","New York","Asia"].includes(l)).map(l=>`<option value="${l}" ${Ae===l?"selected":""}>${l}</option>`).join("")}
          </select>
        </div>

        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Report Year</h4>
          <select id="report-year-selector" class="form-control" style="width: 100%;">
            <option value="all" ${Te==="all"?"selected":""}>All Years</option>
            ${s.map(l=>`<option value="${l}" ${Number(Te)===l?"selected":""}>${l}</option>`).join("")}
          </select>
        </div>

        <!-- Frequency select -->
        <div class="card" style="padding: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">Report Range</h4>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button class="btn ${te==="daily"?"btn-primary":"btn-secondary"}" id="btn-rep-daily" style="justify-content: flex-start;">Daily Report</button>
            <button class="btn ${te==="weekly"?"btn-primary":"btn-secondary"}" id="btn-rep-weekly" style="justify-content: flex-start;">Weekly Report</button>
            <button class="btn ${te==="monthly"?"btn-primary":"btn-secondary"}" id="btn-rep-monthly" style="justify-content: flex-start;">Monthly Report</button>
            <button class="btn ${te==="yearly"?"btn-primary":"btn-secondary"}" id="btn-rep-yearly" style="justify-content: flex-start;">Yearly Report</button>
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
              <div style="font-weight: 700; font-size: 15px;">Range: ${a}</div>
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Logged: ${((o=b.user)==null?void 0:o.username)||"Trader"}</div>
            </div>
          </div>

          <!-- Summary Block Cards -->
          <div class="report-summary-block">
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Total Trades</span>
              <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${i.total}</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Win Rate</span>
              <div style="font-size: 20px; font-weight: 700; color: var(--color-win); margin-top: 4px;">${i.winRate}%</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Net R realized</span>
              <div style="font-size: 20px; font-weight: 700; color: ${i.netR>=0?"var(--color-win)":"var(--color-loss)"}; margin-top: 4px;">${i.netR>0?"+":""}${i.netR}R</div>
            </div>
            <div style="background: var(--bg-primary); padding: 12px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
              <span style="font-size: 10px; font-weight:700; color: var(--text-muted); text-transform: uppercase;">Profit Factor</span>
              <div style="font-size: 20px; font-weight: 700; margin-top: 4px;">${i.profitFactor}</div>
            </div>
          </div>

          <!-- Secondary Metrics -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px;">
            <div style="font-size: 12px; color: var(--text-secondary);">Wins: <strong style="color:var(--color-win);">${i.wins}</strong></div>
            <div style="font-size: 12px; color: var(--text-secondary);">Losses: <strong style="color:var(--color-loss);">${i.losses}</strong></div>
            <div style="font-size: 12px; color: var(--text-secondary);">Break Evens: <strong style="color:var(--color-be);">${i.bes}</strong></div>
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
                  ${n.length===0?'<tr><td colspan="8" style="text-align: center; padding: 24px; color: var(--text-muted);">No records found in this range.</td></tr>':n.map(l=>{const c=l.type||l.direction||"N/A",u=c==="Buy"?"badge-buy":"badge-sell",d=l.result==="Win"?"badge-win":l.result==="Loss"?"badge-loss":"badge-be",f=l.rr??l.target_rr??l.actual_rr??0,h=l.riskPercent??l.risk_percent??0;return`
                          <tr>
                            <td>${l.date}</td>
                            <td style="font-weight: 700;">${l.pair}</td>
                            <td><span class="badge ${u}">${c}</span></td>
                            <td><span class="badge badge-session ${l.session.toLowerCase().replace(" ","")}">${l.session}</span></td>
                            <td><span class="badge ${d}">${l.result}</span></td>
                            <td style="font-weight:600;">${f}:1</td>
                            <td>${h}%</td>
                            <td style="font-size:12px; color:var(--text-muted);">${l.strategy||"N/A"}</td>
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
  `,document.getElementById("src-live").addEventListener("change",()=>{xe="live",ie(t)}),document.getElementById("src-live").parentElement.addEventListener("click",()=>{xe="live",ie(t)}),document.getElementById("src-back").addEventListener("change",()=>{xe="backtest",ie(t)}),document.getElementById("src-back").parentElement.addEventListener("click",()=>{xe="backtest",ie(t)}),document.getElementById("btn-rep-daily").addEventListener("click",()=>{te="daily",ie(t)}),document.getElementById("btn-rep-weekly").addEventListener("click",()=>{te="weekly",ie(t)}),document.getElementById("btn-rep-monthly").addEventListener("click",()=>{te="monthly",ie(t)}),document.getElementById("btn-rep-yearly").addEventListener("click",()=>{te="yearly",ie(t)}),document.getElementById("report-year-selector").addEventListener("change",l=>{Te=l.target.value,ie(t)}),document.getElementById("report-session-selector").addEventListener("change",l=>{Ae=l.target.value,ie(t)}),document.getElementById("export-pdf-btn").addEventListener("click",()=>{window.print()}),document.getElementById("export-csv-btn").addEventListener("click",()=>{ul(n)}),document.getElementById("export-excel-btn").addEventListener("click",()=>{hl(n,a)})}function ll(t,e,s="all",r="all"){const n=[...t].sort((o,l)=>new Date(l.date)-new Date(o.date));if(n.length===0)return[];if(s!=="all")return n.filter(o=>new Date(o.date).getFullYear()===Number(s)&&(r==="all"||$s(o.session)===r));const i=new Date(n[0].date),a=24*60*60*1e3;return n.filter(o=>{if(r!=="all"&&$s(o.session)!==r)return!1;const l=new Date(o.date),c=Math.ceil(Math.abs(i-l)/a);return e==="daily"?c<=1:e==="weekly"?c<=7:e==="monthly"?c<=30:e==="yearly"?c<=365:!0})}function cl(t){const e=t.length;if(e===0)return{total:0,winRate:0,netR:0,profitFactor:"0.00",wins:0,losses:0,bes:0};const s=t.filter(c=>c.result==="Win").length,r=t.filter(c=>c.result==="Loss").length,n=t.filter(c=>c.result==="Break Even").length,i=(s/e*100).toFixed(1);let a=0;t.forEach(c=>{const u=c.rr??c.target_rr??c.actual_rr??0;c.result==="Win"?a+=u:c.result==="Loss"&&(a-=1)});const o=t.filter(c=>c.result==="Win").reduce((c,u)=>c+(u.rr??u.target_rr??u.actual_rr??0),0),l=r>0?(o/r).toFixed(2):o.toFixed(2);return{total:e,winRate:i,netR:a.toFixed(2),profitFactor:l,wins:s,losses:r,bes:n}}function dl(t,e="all"){if(e!=="all")return`Year ${e}`;const s=new Date;return t==="daily"?s.toISOString().split("T")[0]:t==="weekly"?`${new Date(s.getTime()-6048e5).toISOString().split("T")[0]} to ${s.toISOString().split("T")[0]}`:t==="monthly"?s.toLocaleString("en-US",{month:"long",year:"numeric"}):t==="yearly"?`Year ${s.getFullYear()}`:"All Time"}function ul(t,e){const s=["Date","Day","Pair","Direction","Session","Result","RR","Risk %","Strategy","Emotion","Mistake","Lesson","Notes"],r=t.map(l=>{const c=l.rr??l.target_rr??l.actual_rr??0,u=l.riskPercent??l.risk_percent??0,d=l.type||l.direction||"",f=l.day||"";return[l.date,f,l.pair,d,l.session,l.result,c,u,`"${(l.strategy||"").replace(/"/g,'""')}"`,l.emotion||"",l.mistakes||"",`"${(l.lessonLearned||"").replace(/"/g,'""')}"`,`"${(l.notes||"").replace(/"/g,'""')}"`]}),n=[s.join(","),...r.map(l=>l.join(","))].join(`
`),i=new Blob([n],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(i),o=document.createElement("a");o.setAttribute("href",a),o.setAttribute("download",`trademaster_${xe}_report_${te}.csv`),o.style.visibility="hidden",document.body.appendChild(o),o.click(),document.body.removeChild(o)}function hl(t,e){let s=t.map(o=>`
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
  `).join("");const r=`
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
          ${s}
        </tbody>
      </table>
    </body>
    </html>
  `,n=new Blob([r],{type:"application/vnd.ms-excel"}),i=URL.createObjectURL(n),a=document.createElement("a");a.setAttribute("href",i),a.setAttribute("download",`trademaster_${xe}_report_${te}.xls`),a.style.visibility="hidden",document.body.appendChild(a),a.click(),document.body.removeChild(a)}function mn(t){const e=b.user||{},s=Bs(),r=o=>o.field?Number(e[o.field]??0):Number(o.balance??0),n=s.reduce((o,l)=>o+r(l),0),i=e.currency||"USD",a=o=>new Intl.NumberFormat("en-US",{style:"currency",currency:i,maximumFractionDigits:2}).format(Number(o)||0);t.innerHTML=`
    <div class="portfolio-page">
      <div class="portfolio-heading">
        <div>
          <div class="eyebrow">Capital overview</div>
          <h1>Portfolio Accounts</h1>
          <p>Track the live balance of every account. Trade P/L is applied automatically after each save or deletion.</p>
        </div>
        <div class="portfolio-heading-actions"><button class="btn btn-primary" id="add-portfolio-account-btn">+ Add Account</button><div class="portfolio-total"><span>Total portfolio</span><strong>${a(n)}</strong></div></div>
      </div>
      <div class="portfolio-grid">
        ${s.map(o=>`
          <article class="card portfolio-account-card" style="--account-accent: ${o.accent};">
            <div class="portfolio-card-top"><span class="portfolio-account-dot"></span><span class="portfolio-account-label">${o.name}</span><span class="portfolio-card-menu">•••</span></div>
            <div class="portfolio-balance-label">Current balance</div>
            <div class="portfolio-balance">${a(r(o))}</div>
            <div class="portfolio-card-footer"><span>${o.note}</span><span class="portfolio-live-state">Live</span></div>
          </article>
        `).join("")}
      </div>
      <div class="card portfolio-info-card">
        <div class="portfolio-info-icon">↗</div>
        <div><strong>Automatic balance updates</strong><p>Winning P/L is added to the selected account and losing P/L is deducted. Editing a trade applies only the balance difference.</p></div>
      </div>
    </div>
  `,document.getElementById("add-portfolio-account-btn").addEventListener("click",async()=>{const o=await fl();if(!o)return;const l=Array.isArray(b.user.portfolioAccounts)?b.user.portfolioAccounts:[];await b.updateProfile({portfolioAccounts:[...l,o]}),mn(t)})}function fl(){return new Promise(t=>{const e=document.createElement("div");e.className="modal-overlay active portfolio-account-modal-overlay",e.innerHTML='<div class="modal-container portfolio-account-modal"><div class="modal-header"><div><div class="modal-kicker">Portfolio Library</div><h3>Add Portfolio Account</h3></div><button class="modal-close" data-cancel>&times;</button></div><div class="modal-body"><label class="form-label">Account Name</label><input id="new-portfolio-account-name" class="form-control" placeholder="e.g. Prop Firm Alpha"><label class="form-label" style="margin-top:14px;">Starting Balance</label><input id="new-portfolio-account-balance" type="number" step="0.01" class="form-control" placeholder="e.g. 25000"><p class="portfolio-account-helper">P/L from selected trades will update this balance automatically.</p></div><div class="modal-footer"><button class="btn btn-secondary" data-cancel>Cancel</button><button class="btn btn-primary" data-confirm>Add Account</button></div></div>',document.body.appendChild(e);const s=i=>{e.remove(),t(i)},r=e.querySelector("#new-portfolio-account-name"),n=e.querySelector("#new-portfolio-account-balance");e.querySelectorAll("[data-cancel]").forEach(i=>i.addEventListener("click",()=>s(null))),e.querySelector("[data-confirm]").addEventListener("click",()=>{const i=r.value.trim(),a=Number(n.value);s(i&&Number.isFinite(a)?{id:`custom-${Date.now()}`,name:i,balance:Number(a.toFixed(2)),note:"Custom trading account"}:null)}),e.addEventListener("click",i=>{i.target===e&&s(null)}),requestAnimationFrame(()=>r.focus())})}function vn(t){const e=b.user||{username:"AlexTrader",email:"alex.forex@master.com",currency:"USD",riskDefault:1,notifications:!0,role:"user",challengeSize:1e5,fundedSize:5e4,brokerSize:1e4},s=document.body.classList.contains("light-theme");t.innerHTML=`
    <div style="max-width: 800px; display: flex; flex-direction: column; gap: 24px;">
      
      <!-- Profile settings -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            ${w("profileSettings")}
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
              <label class="form-label" for="set-username">${w("usernameLabel")}</label>
              <input type="text" id="set-username" class="form-control" value="${e.username}" required>
            </div>
            <div class="form-group">
              <label class="form-label" for="set-email">${w("emailLabel")}</label>
              <input type="email" id="set-email" class="form-control" value="${e.email}" required>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-currency">${w("defaultCurrency")}</label>
              <select id="set-currency" class="form-control">
                <option value="USD" ${e.currency==="USD"?"selected":""}>USD ($)</option>
                <option value="EUR" ${e.currency==="EUR"?"selected":""}>EUR (€)</option>
                <option value="GBP" ${e.currency==="GBP"?"selected":""}>GBP (£)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="set-risk">${w("defaultRisk")}</label>
              <input type="number" id="set-risk" step="0.1" class="form-control" value="${e.riskDefault}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="set-challenge-size">Challenge Account Capital Size ($)</label>
              <input type="number" id="set-challenge-size" class="form-control" value="${e.challengeSize??1e5}">
            </div>
            <div class="form-group">
              <label class="form-label" for="set-funded-size">Funded Account Capital Size ($)</label>
              <input type="number" id="set-funded-size" class="form-control" value="${e.fundedSize??5e4}">
            </div>
            <div class="form-group">
              <label class="form-label" for="set-broker-size">Your Broker Account Capital Size ($)</label>
              <input type="number" id="set-broker-size" class="form-control" value="${e.brokerSize??1e4}">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">${w("colRole")}</label>
              <input type="text" class="form-control" value="${(e.role||"user").toUpperCase()}" readonly style="opacity: 0.7; cursor: not-allowed; background: var(--bg-primary);">
            </div>
          </div>
          <div style="display: flex; justify-content: flex-end; margin-top: 8px;">
            <button type="submit" class="btn btn-primary">${w("saveChanges")}</button>
          </div>
        </form>
      </div>

      <!-- Custom Checklist Builder Card -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Custom Checklist Rule Builder
          </div>
        </div>
        <div style="padding: 4px 0;">
          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 16px;">
            Define custom confirmation criteria to display when logging live trades and backtests.
          </p>
          <div id="settings-checklist-items-list" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
            <!-- Rendered by script -->
          </div>
          <div style="display: flex; gap: 12px;">
            <input type="text" id="new-checklist-item-input" class="form-control" placeholder="e.g. 4h FVG filled" style="flex: 1;">
            <button class="btn btn-primary" id="add-checklist-item-btn" style="padding: 0 16px; height: 38px;">Add Rule</button>
          </div>
        </div>
      </div>

      <!-- App preferences -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            ${w("appPreferences")}
          </div>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <!-- Theme Switcher -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 16px;">
            <div>
              <div style="font-weight: 600; font-size: 14px;">${w("colorTheme")}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${w("themeDescription")}</div>
            </div>
            <button class="btn btn-secondary" id="theme-toggle-btn" style="padding: 8px 16px; font-size:13px;">
              ${w(s?"themeDark":"themeLight")}
            </button>
          </div>

          <!-- Notification Toggles -->
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-weight: 600; font-size: 14px;">${w("notificationsTitle")}</div>
              <div style="font-size: 12px; color: var(--text-muted);">${w("notificationsDesc")}</div>
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
            ${w("dangerZone")}
          </div>
        </div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 20px;">
          ${w("dangerZoneDesc")}
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
          <button class="btn btn-warning" id="supabase-test-btn" style="background: #f59e0b; border-color: #f59e0b; color: #ffffff;">Test Supabase Connection</button>
          <button class="btn btn-danger" id="clear-database-btn">${w("resetDatabase")}</button>
          <button class="btn btn-secondary" id="logout-btn" style="border-color: var(--color-loss); color: var(--color-loss);">${w("logoutAccount")}</button>
        </div>
      </div>

    </div>
  `,document.getElementById("settings-profile-form").addEventListener("submit",u=>{u.preventDefault();const d={username:document.getElementById("set-username").value,email:document.getElementById("set-email").value,fullName:document.getElementById("set-fullname").value,currency:document.getElementById("set-currency").value,riskDefault:parseFloat(document.getElementById("set-risk").value||1),challengeSize:parseFloat(document.getElementById("set-challenge-size").value||1e5),fundedSize:parseFloat(document.getElementById("set-funded-size").value||5e4),brokerSize:parseFloat(document.getElementById("set-broker-size").value||1e4)};b.updateProfile(d),alert(w("profileUpdated"))});const r=document.getElementById("settings-checklist-items-list"),n=document.getElementById("new-checklist-item-input"),i=document.getElementById("add-checklist-item-btn"),a=b.checklists[0]||{name:"Standard Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined","Order Flow","KL","TS","SMT / 2SMT","5M #"],userEmail:e.email};function o(){if(r){if(a.items.length===0){r.innerHTML='<span style="font-size:13px; color:var(--text-muted);">No rules defined yet. Add one below!</span>';return}r.innerHTML=a.items.map((u,d)=>`
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--bg-tertiary); border-radius: var(--border-radius-md); border: 1px solid var(--border-color);">
        <span style="font-size: 13px; font-weight: 600; color: var(--text-primary);">${u}</span>
        <button class="btn btn-secondary delete-chk-item-btn" data-index="${d}" style="padding: 4px 8px; height: auto; font-size: 12px; color: var(--color-loss); border-color: transparent; background: transparent;">&times; Delete</button>
      </div>
    `).join(""),r.querySelectorAll(".delete-chk-item-btn").forEach(u=>{u.addEventListener("click",async()=>{const d=parseInt(u.dataset.index);a.items.splice(d,1),await l()})})}}async function l(){const{addStoreData:u,updateStoreData:d}=await ge(async()=>{const{addStoreData:f,updateStoreData:h}=await Promise.resolve().then(()=>Ee);return{addStoreData:f,updateStoreData:h}},void 0);if(a.id)await d("Checklists",a);else{const f=await u("Checklists",a);a.id=f.id||f}await b.refreshCache(),o()}i&&i.addEventListener("click",async()=>{const u=n.value.trim();u&&(a.items.push(u),n.value="",await l())}),o(),document.getElementById("theme-toggle-btn").addEventListener("click",()=>{document.body.classList.contains("light-theme")?(document.body.classList.remove("light-theme"),localStorage.setItem("trademaster-theme","dark")):(document.body.classList.add("light-theme"),localStorage.setItem("trademaster-theme","light")),vn(t)}),document.getElementById("notification-toggle").addEventListener("change",u=>{b.updateProfile({notifications:u.target.checked})});const c=document.getElementById("supabase-test-btn");c&&c.addEventListener("click",async()=>{try{const u=await Ps();alert(u&&u.connected?"Supabase connection successful.":"Supabase connection test returned no data.")}catch(u){console.error(u),alert(`Supabase connection failed: ${u.message||u}`)}}),document.getElementById("clear-database-btn").addEventListener("click",async()=>{if(confirm(w("resetConfirm")))try{await cn(),alert(w("dbCleared")),b.refreshCache()}catch(u){console.error(u),alert(w("dbClearError")||"Unable to clear database.")}}),document.getElementById("logout-btn").addEventListener("click",()=>{confirm(w("logoutConfirm"))&&b.logout()})}let J="login",Je=null;function pl(){if(document.getElementById("auth-custom-styles"))return;const t=document.createElement("style");t.id="auth-custom-styles",t.innerHTML=`
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
  `,document.head.appendChild(t)}function gl(t){pl(),t.innerHTML=`
    <div class="auth-page-container">
      <div class="auth-card" id="auth-card-body">
        <!-- Rendered dynamically -->
      </div>
    </div>
  `;const e=document.getElementById("auth-card-body");he(e)}function M(t,e="success"){let s=document.getElementById("auth-toast-container");s||(s=document.createElement("div"),s.id="auth-toast-container",s.style.cssText=`
      position: fixed;
      top: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    `,document.body.appendChild(s));const r=document.createElement("div"),n=e==="success"?'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>':'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',i=e==="success"?"rgba(16, 185, 129, 0.95)":"rgba(239, 68, 68, 0.95)";r.style.cssText=`
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
  `,r.innerHTML=`${n} <span>${t}</span>`,s.appendChild(r),setTimeout(()=>{r.style.transform="translateY(0)",r.style.opacity="1"},10),setTimeout(()=>{r.style.transform="translateY(-20px)",r.style.opacity="0",setTimeout(()=>r.remove(),300)},3e3)}function ml(t){if(t.length===0)return{score:0,label:"None",color:"transparent"};if(t.length<6)return{score:1,label:"Weak",color:"var(--color-loss)"};const e=/[a-zA-Z]/.test(t),s=/[0-9]/.test(t),r=/[^A-Za-z0-9]/.test(t),n=/[A-Z]/.test(t);return t.length>=8&&e&&s&&r&&n?{score:3,label:"Strong",color:"var(--color-win)"}:t.length>=6&&e&&s?{score:2,label:"Medium",color:"var(--color-be)"}:{score:1,label:"Weak",color:"var(--color-loss)"}}function dt(t,e){e.addEventListener("click",s=>{s.preventDefault(),t.type==="password"?(t.type="text",e.textContent="Hide"):(t.type="password",e.textContent="Show")})}function Tr(t,e,s){const r=ml(t);e.querySelectorAll(".strength-bar-segment").forEach((i,a)=>{a<r.score?i.style.backgroundColor=r.color:i.style.backgroundColor="var(--border-color)"}),s.textContent=r.label!=="None"?`Strength: ${r.label}`:"",s.style.color=r.color}function he(t){if(J==="login"){t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">${w("welcomeBack")}</h3>
        <p class="auth-subtitle">${w("loginSubtitle")}</p>
      </div>

      <form id="login-form">
        <div class="form-group">
          <label class="form-label" for="login-email">${w("emailLabel")}</label>
          <input type="email" id="login-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group" style="margin-bottom: 16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <label class="form-label" for="login-password">${w("passwordLabel")}</label>
            <a href="#" id="goto-forgot" style="font-size:12px; color: var(--accent-color); text-decoration:none; margin-bottom:8px;">${w("forgotLink")}</a>
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

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${w("accessAccount")}</button>
      </form>

      <div class="auth-footer-link">
        ${w("dontHaveAccount")} <a href="#" class="auth-link" id="goto-register">${w("createOne")}</a>
      </div>
    `;const e=localStorage.getItem("trademaster-remember-email");e&&(document.getElementById("login-email").value=e,document.getElementById("login-remember").checked=!0),dt(document.getElementById("login-password"),document.getElementById("login-pwd-toggle")),document.getElementById("login-form").addEventListener("submit",async s=>{s.preventDefault();const r=document.getElementById("login-email").value.trim(),n=document.getElementById("login-password").value,i=document.getElementById("login-remember").checked;try{await b.login(r,n,i),i?localStorage.setItem("trademaster-remember-email",r):localStorage.removeItem("trademaster-remember-email"),M("Login successful! Welcoming you back...","success"),setTimeout(()=>b.setView("dashboard"),800)}catch(a){M(w(a.message)||a.message,"error")}}),document.getElementById("goto-register").addEventListener("click",s=>{s.preventDefault(),J="register",he(t)}),document.getElementById("goto-forgot").addEventListener("click",s=>{s.preventDefault(),J="forgot",he(t)})}else if(J==="register"){t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">${w("createAccount")}</h3>
        <p class="auth-subtitle">${w("registerSubtitle")}</p>
      </div>

      <form id="register-form">
        <div class="form-group">
          <label class="form-label" for="reg-fullname">Full Name</label>
          <input type="text" id="reg-fullname" class="form-control" placeholder="Alex Sterling" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-username">${w("usernameLabel")}</label>
          <input type="text" id="reg-username" class="form-control" placeholder="AlexTrader" required>
        </div>
        <div class="form-group">
          <label class="form-label" for="reg-email">${w("emailLabel")}</label>
          <input type="email" id="reg-email" class="form-control" placeholder="trader@forex.com" required>
        </div>
        <div class="form-group" style="margin-bottom: 12px;">
          <label class="form-label" for="reg-password">${w("passwordLabel")}</label>
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
            <span>I accept the Terms and Conditions of maaroTrading</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${w("registerAccount")}</button>
      </form>

      <div class="auth-footer-link">
        ${w("alreadyHaveAccount")} <a href="#" class="auth-link" id="goto-login">${w("signIn")}</a>
      </div>
    `;const e=document.getElementById("reg-password"),s=document.getElementById("reg-confirm"),r=document.getElementById("reg-strength-container"),n=document.getElementById("reg-strength-lbl");dt(e,document.getElementById("reg-pwd-toggle")),dt(s,document.getElementById("reg-confirm-toggle")),e.addEventListener("input",()=>{Tr(e.value,r,n)}),document.getElementById("register-form").addEventListener("submit",async i=>{i.preventDefault();const a=document.getElementById("reg-fullname").value.trim(),o=document.getElementById("reg-username").value.trim(),l=document.getElementById("reg-email").value.trim(),c=e.value,u=s.value;if(!document.getElementById("reg-terms").checked){M("You must accept the Terms and Conditions to proceed.","error");return}if(c!==u){M("Passwords do not match.","error");return}if(c.length<6){M("Password must be at least 6 characters.","error");return}try{const{getUser:f}=await ge(async()=>{const{getUser:p}=await Promise.resolve().then(()=>Ee);return{getUser:p}},void 0);if(await f(l)){M(w("emailExists"),"error");return}Je={username:o,email:l,password:c,fullname:a},J="verify",M("Verification code sent to email!","success"),he(t)}catch(f){M(w(f.message)||f.message,"error")}}),document.getElementById("goto-login").addEventListener("click",i=>{i.preventDefault(),J="login",he(t)})}else if(J==="verify"){if(!Je){M("No registration in progress. Redirecting to register.","error"),J="register",he(t);return}t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">Verify Your Email</h3>
        <p class="auth-subtitle">We have sent a verification code to <strong>${(Je==null?void 0:Je.email)||"your email"}</strong>.</p>
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
    `;const e=document.querySelectorAll(".verification-digit-input");e.forEach((r,n)=>{r.addEventListener("input",()=>{r.value&&n<e.length-1&&e[n+1].focus()}),r.addEventListener("keydown",i=>{i.key==="Backspace"&&!r.value&&n>0&&e[n-1].focus()})});const s=document.getElementById("use-hint-btn");s&&s.addEventListener("click",r=>{r.preventDefault();const n="123456";e.forEach((a,o)=>{a.value=n[o]}),e[e.length-1].focus();const i=document.getElementById("verify-form");i.requestSubmit?i.requestSubmit():i.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))}),document.getElementById("resend-code-btn").addEventListener("click",r=>{r.preventDefault(),M("Simulating: Verification code resent to email.","success")}),document.getElementById("verify-form").addEventListener("submit",async r=>{if(r.preventDefault(),Array.from(e).map(i=>i.value).join("")==="123456")try{const{username:i,email:a,password:o,fullname:l}=Je;await b.register(i,a,o,l),M("Account successfully verified & activated!","success"),setTimeout(()=>b.setView("dashboard"),800)}catch(i){M(w(i.message)||i.message,"error")}else M("Invalid verification code. Enter 123456.","error")})}else if(J==="forgot")t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
          <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
        </div>
        <h3 class="auth-title">${w("resetPassword")}</h3>
        <p class="auth-subtitle">${w("resetSubtitle")}</p>
      </div>

      <form id="forgot-form">
        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label" for="forgot-email">${w("emailLabel")}</label>
          <input type="email" id="forgot-email" class="form-control" placeholder="trader@forex.com" required>
        </div>

        <button type="submit" class="btn btn-primary" style="width: 100%; height: 42px;">${w("sendInstructions")}</button>
      </form>

      <div class="auth-footer-link">
        <a href="#" class="auth-link" id="goto-login-back">${w("backToSignIn")}</a>
      </div>
    `,document.getElementById("forgot-form").addEventListener("submit",async e=>{e.preventDefault();const s=document.getElementById("forgot-email").value.trim(),{getUser:r}=await ge(async()=>{const{getUser:i}=await Promise.resolve().then(()=>Ee);return{getUser:i}},void 0);await r(s)?(M("Instructions and reset link successfully sent to your email.","success"),setTimeout(()=>{J="reset",he(t)},1200)):M("No account registered with this email address.","error")}),document.getElementById("goto-login-back").addEventListener("click",e=>{e.preventDefault(),J="login",he(t)});else if(J==="reset"){t.innerHTML=`
      <div class="auth-header">
        <div class="auth-logo">
          <div class="logo-icon">MT</div>
            <span class="logo-text" style="-webkit-text-fill-color: initial; color: var(--text-primary);">maaroTrading</span>
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
        <a href="#" class="auth-link" id="goto-login-back">${w("backToSignIn")}</a>
      </div>
    `;const e=document.getElementById("reset-pwd"),s=document.getElementById("reset-confirm"),r=document.getElementById("reset-strength-container"),n=document.getElementById("reset-strength-lbl");dt(e,document.getElementById("reset-pwd-toggle")),dt(s,document.getElementById("reset-confirm-toggle")),e.addEventListener("input",()=>{Tr(e.value,r,n)}),document.getElementById("reset-form").addEventListener("submit",async i=>{i.preventDefault();const a=document.getElementById("reset-email").value.trim(),o=e.value,l=s.value;if(o!==l){M("Passwords do not match.","error");return}if(o.length<6){M("Password must be at least 6 characters.","error");return}try{const{getUser:c,updateUser:u}=await ge(async()=>{const{getUser:f,updateUser:h}=await Promise.resolve().then(()=>Ee);return{getUser:f,updateUser:h}},void 0),d=await c(a);d?(d.password=o,await u(d),M("Password updated! Redirecting to login...","success"),setTimeout(()=>{J="login",he(t)},1200)):M("Account email verification failed.","error")}catch(c){M(w(c.message)||c.message,"error")}}),document.getElementById("goto-login-back").addEventListener("click",i=>{i.preventDefault(),J="login",he(t)})}}async function Zt(t){const e=await Ts(),s=await Z("TradingJournal"),r=await Z("BacktestingJournal"),n=e.length,i=e.filter(h=>h.status==="active").length,a=e.filter(h=>h.status==="suspended").length,o=[...s,...r],l=o.length,c=o.filter(h=>h.result==="Win").length,u=l>0?(c/l*100).toFixed(1)+"%":"0.0%";t.innerHTML=`
    <div style="display: flex; flex-direction: column; gap: 32px;">
      
      <!-- Metrics Grid -->
      <div class="metrics-grid">
        <!-- Total Users -->
        <div class="metric-card">
          <span class="metric-card-label">${w("totalUsers")}</span>
          <div class="metric-card-value">${n}</div>
          <div class="metric-card-sub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-color);"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>System Traders</span>
          </div>
        </div>

        <!-- Active Users -->
        <div class="metric-card">
          <span class="metric-card-label">${w("activeUsers")}</span>
          <div class="metric-card-value">${i}</div>
          <div class="metric-card-sub">
            <span class="badge badge-win" style="padding: 2px 6px; font-size: 10px;">Active</span>
          </div>
        </div>

        <!-- Suspended Users -->
        <div class="metric-card">
          <span class="metric-card-label">${w("suspendedUsers")}</span>
          <div class="metric-card-value">${a}</div>
          <div class="metric-card-sub">
            <span class="badge badge-loss" style="padding: 2px 6px; font-size: 10px;">Suspended</span>
          </div>
        </div>

        <!-- Total Trade Logs -->
        <div class="metric-card">
          <span class="metric-card-label">${w("totalLogs")}</span>
          <div class="metric-card-value">${l}</div>
          <div class="metric-card-sub">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-secondary);"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>Live + Backtesting</span>
          </div>
        </div>

        <!-- System Win Rate -->
        <div class="metric-card">
          <span class="metric-card-label">${w("systemWinRate")}</span>
          <div class="metric-card-value" style="color: var(--color-win);">${u}</div>
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
              ${w("registeredUsers")}
            </div>
          </div>

          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>${w("colUsername")}</th>
                  <th>${w("colEmail")}</th>
                  <th>${w("colRole")}</th>
                  <th>${w("colStatus")}</th>
                  <th>${w("colRegistered")}</th>
                  <th>${w("colActions")}</th>
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
              ${w("titleAddNewUser")}
            </div>
          </div>

          <form id="admin-create-user-form" style="display: flex; flex-direction: column; gap: 16px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${w("usernameLabel")}</label>
              <input type="text" id="admin-user-name" class="form-control" placeholder="HassanFX" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${w("emailLabel")}</label>
              <input type="email" id="admin-user-email" class="form-control" placeholder="hassan@trademaster.com" required>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${w("passwordLabel")}</label>
              <input type="password" id="admin-user-pass" class="form-control" placeholder="••••••••" required>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label">${w("colRole")}</label>
              <select id="admin-user-role" class="form-control">
                <option value="user" selected>User (Standard Trader)</option>
                <option value="admin">Admin (System Manager)</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 12px; height: 42px;">
              ${w("btnSaveUser")}
            </button>
          </form>
        </div>

      </div>
    </div>
  `;const d=document.getElementById("users-table-body");vl(e,d);const f=document.getElementById("admin-create-user-form");f.addEventListener("submit",async h=>{h.preventDefault();const p=document.getElementById("admin-user-name").value.trim(),g=document.getElementById("admin-user-email").value.trim(),y=document.getElementById("admin-user-pass").value,v=document.getElementById("admin-user-role").value;if((await Ts()).some(k=>k.email===g)){alert(w("emailExists"));return}const m={username:p,email:g,password:y,role:v,status:"active",registeredAt:new Date().toISOString().split("T")[0],avatar:p.slice(0,2).toUpperCase(),currency:"USD",riskDefault:1,notifications:!0};await an(m);try{const{addStoreData:k}=await ge(async()=>{const{addStoreData:S}=await Promise.resolve().then(()=>Ee);return{addStoreData:S}},void 0),I=[{name:"SMC Order Block",description:"Trading refined order blocks on 15m/5m timeframe aligning with HTF order flow.",userEmail:g},{name:"Liquidity Grab & Reversal",description:"Fading structural high/low grabs at New York/London session opens.",userEmail:g}];for(const S of I)await k("Strategies",S);const T=[{name:"Standard Confirmation",items:["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined","Order Flow","KL","TS","SMT / 2SMT","5M #"],userEmail:g}];for(const S of T)await k("Checklists",S)}catch(k){console.error(k)}alert(w("userCreatedMsg")),f.reset(),Zt(t)})}function vl(t,e){e.innerHTML="",t.forEach(s=>{const r=b.user&&b.user.email===s.email,n=document.createElement("tr"),i=s.role==="admin"?"badge-buy":"badge-session",a=s.status==="active"?"badge-win":"badge-loss";n.innerHTML=`
      <td>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="avatar" style="width: 32px; height: 32px; font-size: 11px; margin: 0; background: var(--bg-tertiary); border: 1px solid var(--border-color);">${s.avatar||s.username.slice(0,2).toUpperCase()}</div>
          <span style="font-weight: 600; color: var(--text-primary);">${s.username} ${r?' <span style="font-size:10px; color:var(--text-muted);">(You)</span>':""}</span>
        </div>
      </td>
      <td>${s.email}</td>
      <td><span class="badge ${i}">${s.role.toUpperCase()}</span></td>
      <td><span class="badge ${a}">${s.status.toUpperCase()}</span></td>
      <td>${s.registeredAt||"-"}</td>
      <td>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-status-toggle" style="padding: 6px 10px; font-size: 11px;" ${r?"disabled":""}>
            ${s.status==="active"?w("btnSuspend"):w("btnActivate")}
          </button>
          <button class="btn btn-secondary btn-role-toggle" style="padding: 6px 10px; font-size: 11px;" ${r?"disabled":""}>
            ${s.role==="admin"?w("btnDemote"):w("btnMakeAdmin")}
          </button>
        </div>
      </td>
    `,n.querySelector(".btn-status-toggle").addEventListener("click",async()=>{if(r){alert(w("cannotSuspendSelf"));return}s.status=s.status==="active"?"suspended":"active",await As(s),alert(w("userUpdatedMsg"));const o=document.getElementById("content-viewport");o&&Zt(o)}),n.querySelector(".btn-role-toggle").addEventListener("click",async()=>{if(r){alert(w("cannotDemoteSelf"));return}s.role=s.role==="admin"?"user":"admin",await As(s),alert(w("userUpdatedMsg"));const o=document.getElementById("content-viewport");o&&Zt(o)}),e.appendChild(n)})}let Ar,$r,Cr,Lr,Ir;const se={account:"All",dateFrom:"",dateTo:"",pair:"All",session:"All",strategy:"All",setup:"All",result:"All",search:""};function Me(t){return String(t??"").replace(/[&<>'"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[e])}function Ge(t,e){return["All",...t].filter((s,r,n)=>n.indexOf(s)===r).map(s=>`<option value="${Me(s)}" ${s===e?"selected":""}>${Me(s)}</option>`).join("")}function Ye(t,e){return t.length?t.map(s=>`<tr>${e.map(r=>`<td>${typeof r=="function"?r(s):wl(s,r)}</td>`).join("")}</tr>`).join(""):`<tr><td colspan="${e.length}" class="bt-empty-cell">No matching data</td></tr>`}function G(t,e,s=""){return`<div class="metric-card"><div class="metric-card-label">${t}</div><div class="metric-card-value">${e}</div><div class="metric-card-sub">${s}</div></div>`}function Cs(t){const e=b.backtestTrades,s=Er(e),r=a=>[...new Set(s.map(o=>o[a]).filter(o=>o&&o!=="Unknown"))].sort(),n=Er(e,se),i=gn(n);_l(),t.innerHTML=`
    <div class="bt-dashboard">
      <div class="bt-dashboard-heading">
        <div>
          <div class="eyebrow">Historical analysis</div>
          <h1>Backtesting Dashboard</h1>
          <p>Analyze your historical trading performance and identify the conditions where your strategy performs best.</p>
        </div>
        <div class="bt-heading-actions">
          <button class="btn btn-secondary" id="manage-backtest-trades-btn">Backtest Trades</button>
          <button class="btn btn-primary" id="new-backtest-dashboard-btn">+ New Backtest Trade</button>
        </div>
      </div>

      <div class="card bt-filter-card">
        <div class="bt-filter-grid">
          <label>Account<select id="bt-filter-account" class="form-control">${Ge(r("account"),se.account)}</select></label>
          <label>From<input id="bt-filter-date-from" class="form-control" type="date" value="${Me(se.dateFrom)}"></label>
          <label>To<input id="bt-filter-date-to" class="form-control" type="date" value="${Me(se.dateTo)}"></label>
          <label>Pair<select id="bt-filter-pair" class="form-control">${Ge(r("pair"),se.pair)}</select></label>
          <label>Session<select id="bt-filter-session" class="form-control">${Ge(r("session"),se.session)}</select></label>
          <label>Strategy<select id="bt-filter-strategy" class="form-control">${Ge(r("strategy"),se.strategy)}</select></label>
          <label>Setup<select id="bt-filter-setup" class="form-control">${Ge(r("setup"),se.setup)}</select></label>
          <label>Result<select id="bt-filter-result" class="form-control">${Ge(["Win","Loss","Break Even"],se.result)}</select></label>
          <button class="btn btn-secondary bt-reset-button" id="bt-reset-filters-btn">Reset Filters</button>
        </div>
      </div>

      ${i.totalTrades?bl(i):yl()}
    </div>
  `,kl(t,e),i.totalTrades&&xl(i)}function yl(){return'<div class="card bt-empty-state"><div class="bt-empty-icon">∅</div><h2>No Backtesting Data Yet</h2><p>Start recording backtest trades to see your performance analytics.</p><button class="btn btn-primary" id="empty-new-backtest-btn">+ New Backtest Trade</button></div>'}function bl(t){const e=t.bestPair==="Insufficient Data"?"Insufficient Data":t.bestPair,s=t.bestSession==="Insufficient Data"?"Insufficient Data":t.bestSession,r=t.sessionPerformance.sort((c,u)=>u.totalR-c.totalR),n=t.pairPerformance.sort((c,u)=>u.totalR-c.totalR),i=t.dayPerformance,a=t.monthlyPerformance.sort((c,u)=>c.label.localeCompare(u.label)),o=t.outcomeDistribution,l=o.reduce((c,u)=>c+u.count,0);return`
    <div class="metrics-grid bt-primary-metrics">
      ${G("Total Backtest Trades",t.totalTrades,"Closed trades with valid R")}
      ${G("Win Rate",`${H(t.winRate,1)}%`,"Target: >50%")}
      ${G("Average Risk Reward",`${H(t.averageRR)}:1`,"Planned ratio")}
      ${G("Profit Factor",H(t.profitFactor),"Gross win / gross loss")}
      ${G("Realized R-Multiple",`${t.realizedR>=0?"+":""}${H(t.realizedR)}R`,"Cumulative result")}
      ${G("Max Drawdown",`${H(t.maxDrawdown)}R`,"Peak to trough")}
    </div>
    <div class="metrics-grid bt-secondary-metrics">
      ${G("Win Streak",t.winStreak,`Current: ${t.currentWinStreak}`)}
      ${G("Loss Streak",t.lossStreak,`Current: ${t.currentLossStreak}`)}
      ${G("Average Risk",`${H(t.averageRisk)}%`,"Recorded risk")}
      ${G("Best Pair",Me(e),"Highest total R")}
      ${G("Best Session",Me(s),"Highest total R")}
      ${G("Loss Rate",`${H(t.lossRate,1)}%`,"Excludes break-even")}
      ${G("Break-even Rate",`${H(t.breakEvenRate,1)}%`,"All closed trades")}
      ${G("Expectancy",`${t.expectancy>=0?"+":""}${H(t.expectancy)}R`,"Per closed trade")}
    </div>
    <div class="bt-chart-grid">
      <div class="card bt-chart-card bt-chart-wide"><div class="card-header"><div class="card-title">Equity Growth Curve (R-Multiple cumulative)</div></div><div class="bt-chart-wrap"><canvas id="bt-equity-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Session & Performance Distribution</div></div><div class="bt-chart-wrap"><canvas id="bt-session-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">R-Multiple Distribution</div></div><div class="bt-chart-wrap"><canvas id="bt-r-distribution-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Drawdown Analysis</div></div><div class="bt-chart-wrap"><canvas id="bt-drawdown-chart"></canvas></div><div class="bt-chart-summary">Max ${H(t.maxDrawdown)}R · Average ${H(t.averageDrawdown)}R · ${t.drawdownPeriods} periods · Longest ${t.longestDrawdown} trades</div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Performance by Day</div></div><div class="bt-chart-wrap"><canvas id="bt-day-chart"></canvas></div></div>
      <div class="card bt-chart-card"><div class="card-header"><div class="card-title">Monthly Total R</div></div><div class="bt-chart-wrap"><canvas id="bt-month-chart"></canvas></div></div>
    </div>
    <div class="bt-section-grid">
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Session Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Session</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th><th>PF</th></tr></thead><tbody>${Ye(r,["label","trades","wins","losses","breakEven","winRate","totalR","avgR","profitFactor"])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Pair Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Pair</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Avg R</th><th>Total R</th><th>PF</th></tr></thead><tbody>${Ye(n,["label","trades","wins","losses","breakEven","winRate","avgR","totalR","profitFactor"])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Performance by Day</div></div><div class="table-container"><table class="table"><thead><tr><th>Day</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th></tr></thead><tbody>${Ye(i,["label","trades","wins","losses","breakEven","winRate","totalR","avgR"])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Monthly Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Month</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th></tr></thead><tbody>${Ye(a,["label","trades","wins","losses","breakEven","winRate","totalR","avgR"])}</tbody></table></div></section>
    </div>
    <div class="card bt-outcome-card"><div class="card-header"><div class="card-title">Trade Outcome Distribution</div></div><div class="bt-outcomes">${o.map(c=>`<div><strong>${c.count}</strong><span>${c.label}</span><small>${l?H(c.count/l*100,1):"0.0"}%</small></div>`).join("")}</div></div>
    <div class="bt-section-grid">
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Strategy Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Strategy</th><th>Trades</th><th>Win Rate</th><th>Avg R:R</th><th>Total R</th><th>PF</th></tr></thead><tbody>${Ye(t.strategyPerformance,["label","trades","winRate","avgRR","totalR","profitFactor"])}</tbody></table></div></section>
      <section class="card bt-table-card"><div class="card-header"><div class="card-title">Setup Performance</div></div><div class="table-container"><table class="table"><thead><tr><th>Setup</th><th>Trades</th><th>Wins</th><th>Losses</th><th>BE</th><th>Win Rate</th><th>Total R</th><th>Avg R</th></tr></thead><tbody>${Ye(t.setupPerformance,["label","trades","wins","losses","breakEven","winRate","totalR","avgR"])}</tbody></table></div></section>
    </div>
  `}function wl(t,e){return e==="label"?Me(t.label):e==="winRate"?`${H(t.winRate,1)}%`:e==="profitFactor"?H(t.profitFactor):e==="totalR"?`${t.totalR>=0?"+":""}${H(t.totalR)}R`:H(t[e])}function kl(t,e){var r,n,i,a;Object.entries({account:"bt-filter-account",dateFrom:"bt-filter-date-from",dateTo:"bt-filter-date-to",pair:"bt-filter-pair",session:"bt-filter-session",strategy:"bt-filter-strategy",setup:"bt-filter-setup",result:"bt-filter-result"}).forEach(([o,l])=>{var c;return(c=document.getElementById(l))==null?void 0:c.addEventListener("change",u=>{se[o]=u.target.value,Cs(t)})}),(r=document.getElementById("bt-reset-filters-btn"))==null||r.addEventListener("click",()=>{Object.keys(se).forEach(o=>{se[o]=o==="search"||o==="dateFrom"||o==="dateTo"?"":"All"}),Cs(t)}),(n=document.getElementById("manage-backtest-trades-btn"))==null||n.addEventListener("click",()=>b.setView("backtest-trades")),(i=document.getElementById("new-backtest-dashboard-btn"))==null||i.addEventListener("click",()=>Be()),(a=document.getElementById("empty-new-backtest-btn"))==null||a.addEventListener("click",()=>Be()),window.dispatchEvent(new CustomEvent("backtestDashboardRendered",{detail:{rawTrades:e}}))}function xl(t){var f,h,p,g,y;if(typeof Chart>"u")return;[Ar,$r,Cr,Lr,Ir].forEach(v=>v==null?void 0:v.destroy());const e=!document.body.classList.contains("light-theme"),s=e?"#94a3b8":"#475569",r=e?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)",n={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:s}}},scales:{x:{ticks:{color:s},grid:{color:r}},y:{ticks:{color:s},grid:{color:r}}}},i=(f=document.getElementById("bt-equity-chart"))==null?void 0:f.getContext("2d"),a=(h=document.getElementById("bt-session-chart"))==null?void 0:h.getContext("2d"),o=(p=document.getElementById("bt-r-distribution-chart"))==null?void 0:p.getContext("2d"),l=document.getElementById("bt-drawdown-chart"),c=l==null?void 0:l.getContext("2d");if(i&&(Ar=new Chart(i,{type:"line",data:{labels:t.equity.slice(1).map(v=>v.date||`Trade ${v.tradeNumber}`),datasets:[{label:"Cumulative R",data:t.equity.slice(1).map(v=>v.cumulativeR),borderColor:"#3b82f6",backgroundColor:"rgba(59,130,246,.18)",fill:!0,tension:.3,pointRadius:2}]},options:{...n,plugins:{...n.plugins,tooltip:{callbacks:{label:v=>`Result: ${H(t.equity[v.dataIndex+1].resultR)}R · Cumulative: ${H(v.raw)}R`}}}}})),a&&($r=new Chart(a,{type:"doughnut",data:{labels:t.sessionPerformance.map(v=>v.label),datasets:[{data:t.sessionPerformance.map(v=>v.trades),backgroundColor:["#3b82f6","#22c55e","#f59e0b","#ec4899","#8b5cf6"],borderWidth:0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:s}}},cutout:"68%"}})),o){const v=new Map;t.trades.forEach(m=>{const k=Math.round(m.realizedR);v.set(k,(v.get(k)||0)+1)});const x=[...v.keys()].sort((m,k)=>m-k).map(m=>`${m>0?"+":""}${m}R`);Cr=new Chart(o,{type:"bar",data:{labels:x,datasets:[{label:"Trades",data:[...v.keys()].sort((m,k)=>m-k).map(m=>v.get(m)),backgroundColor:"#8b5cf6"}]},options:n})}c&&new Chart(c,{type:"line",data:{labels:t.equity.slice(1).map(v=>v.tradeNumber),datasets:[{label:"Drawdown R",data:t.equity.slice(1).map(v=>-v.drawdown),borderColor:"#ef4444",backgroundColor:"rgba(239,68,68,.16)",fill:!0,tension:.25,pointRadius:1}]},options:n});const u=(g=document.getElementById("bt-day-chart"))==null?void 0:g.getContext("2d"),d=(y=document.getElementById("bt-month-chart"))==null?void 0:y.getContext("2d");u&&(Lr=new Chart(u,{type:"bar",data:{labels:t.dayPerformance.map(v=>v.label),datasets:[{label:"Total R",data:t.dayPerformance.map(v=>v.totalR),backgroundColor:"#22c55e"}]},options:n})),d&&(Ir=new Chart(d,{type:"bar",data:{labels:t.monthlyPerformance.map(v=>v.label),datasets:[{label:"Total R",data:t.monthlyPerformance.map(v=>v.totalR),backgroundColor:"#3b82f6"}]},options:n}))}function _l(){if(document.getElementById("backtesting-dashboard-styles"))return;const t=document.createElement("style");t.id="backtesting-dashboard-styles",t.textContent=".bt-dashboard{display:flex;flex-direction:column;gap:24px}.bt-dashboard-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:20px}.bt-dashboard-heading h1{margin:4px 0 8px;font-size:28px}.bt-dashboard-heading p{margin:0;color:var(--text-secondary);max-width:720px}.eyebrow{color:var(--accent-color);font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.bt-heading-actions{display:flex;gap:10px;flex-wrap:wrap}.bt-filter-card{padding:18px}.bt-filter-grid{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:14px;align-items:end}.bt-filter-grid label{display:flex;flex-direction:column;gap:6px;color:var(--text-muted);font-size:11px;font-weight:700;text-transform:uppercase}.bt-reset-button{height:38px}.bt-primary-metrics,.bt-secondary-metrics{margin-bottom:0}.bt-secondary-metrics .metric-card{min-height:90px;padding:16px}.bt-chart-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}.bt-chart-wide{grid-row:span 2}.bt-chart-card{min-height:320px;display:flex;flex-direction:column}.bt-chart-wrap{position:relative;min-height:250px;flex:1;padding:8px 12px 18px}.bt-chart-summary{padding:0 18px 16px;color:var(--text-muted);font-size:12px}.bt-section-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.bt-table-card{min-width:0}.bt-table-card .table-container{overflow-x:auto}.bt-empty-state{text-align:center;padding:72px 24px}.bt-empty-state h2{margin:10px 0 8px}.bt-empty-state p{color:var(--text-secondary);margin:0 0 22px}.bt-empty-icon{font-size:40px;color:var(--text-muted)}.bt-empty-cell{text-align:center;padding:24px!important;color:var(--text-muted)}.bt-outcomes{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:20px}.bt-outcomes div{border:1px solid var(--border-color);border-radius:var(--border-radius-md);padding:16px;display:flex;flex-direction:column;gap:5px}.bt-outcomes strong{font-size:26px}.bt-outcomes span{color:var(--text-secondary)}.bt-outcomes small{color:var(--text-muted)}@media(max-width:1000px){.bt-dashboard-heading{align-items:flex-start;flex-direction:column}.bt-filter-grid{grid-template-columns:repeat(2,minmax(140px,1fr))}.bt-chart-grid{grid-template-columns:1fr}.bt-chart-wide{grid-row:auto}.bt-section-grid{grid-template-columns:1fr}}@media(max-width:600px){.bt-filter-grid,.bt-outcomes{grid-template-columns:1fr}.bt-dashboard-heading h1{font-size:24px}.bt-heading-actions{width:100%}.bt-heading-actions .btn{flex:1}.bt-chart-card{min-height:280px}}",document.head.appendChild(t)}const Ut={dashboard:{titleKey:"dashboard",render:Zo},journal:{titleKey:"journal",render:t=>sl(t,"live")},backtesting:{titleKey:"backtesting",render:Cs},"backtest-trades":{titleKey:"backtesting",render:hn},calendar:{titleKey:"calendar",render:$e},analytics:{titleKey:"analytics",render:al},gallery:{titleKey:"gallery",render:qt},reports:{titleKey:"reports",render:ie},portfolio:{titleKey:"portfolio",render:mn},settings:{titleKey:"settings",render:vn},admin:{titleKey:"adminPanel",render:Zt},auth:{titleKey:"welcomeBack",render:gl}};document.addEventListener("DOMContentLoaded",async()=>{await b.init();const t=window.location.pathname.replace(/^\//,"").replace(/\/$/,"")||"dashboard";Ut[t]&&(b.activeView=t);const e=document.getElementById("content-viewport"),s=document.getElementById("current-view-title"),r=document.querySelectorAll(".nav-item"),n=document.getElementById("global-search");function i(){const l=b.activeView;if(!b.user&&l!=="auth"){b.setView("auth");return}if(b.user&&l==="admin"&&b.user.role!=="admin"){b.setView("dashboard");return}const c=Ut[l];if(!c){b.setView("dashboard");return}const u=document.getElementById("app"),d=document.getElementById("auth-root");if(l==="auth"){u&&(u.style.display="none"),document.body.classList.add("auth-body"),d&&(d.style.display="block",d.innerHTML="",Ut.auth.render(d));return}else u&&(u.style.display="flex"),d&&(d.style.display="none"),document.body.classList.remove("auth-body");s.textContent=w(c.titleKey);const f=document.getElementById("nav-admin-link");if(f&&(f.style.display=b.user&&b.user.role==="admin"?"flex":"none"),r.forEach(p=>{p.dataset.view===l||l==="backtest-trades"&&p.dataset.view==="backtesting"?p.classList.add("active"):p.classList.remove("active")}),b.user){document.getElementById("profile-avatar").textContent=b.user.avatar||"US",document.getElementById("profile-name").textContent=b.user.username||"User";const p=b.user.role==="admin"?w("adminUser"):w("premiumTrader");document.querySelector(".user-role").textContent=p}document.querySelector(".sidebar-dashboard-text").textContent=w("dashboard"),document.querySelector(".sidebar-journal-text").textContent=w("journal"),document.querySelector(".sidebar-backtesting-text").textContent=w("backtesting"),document.querySelector(".sidebar-calendar-text").textContent=w("calendar"),document.querySelector(".sidebar-analytics-text").textContent=w("analytics"),document.querySelector(".sidebar-gallery-text").textContent=w("gallery"),document.querySelector(".sidebar-reports-text").textContent=w("reports"),document.querySelector(".sidebar-portfolio-text").textContent="Portfolio Accounts",document.querySelector(".sidebar-settings-text").textContent=w("settings");const h=document.querySelector(".sidebar-admin-text");h&&(h.textContent=w("adminPanel")),document.getElementById("quick-add-trade-text").textContent=b.language==="so"?"Ganacsi Cusub":"New Trade",document.getElementById("global-search").placeholder=b.language==="so"?"Raadi lamaanaha, xeeladda, taariikhda...":"Search pair, strategy, date...",e.innerHTML="",c.render(e)}r.forEach(l=>{l.addEventListener("click",c=>{c.preventDefault();const u=l.dataset.view;b.setView(u)})});const a=document.getElementById("lang-selector");a&&(a.value=b.language,a.addEventListener("change",l=>{b.setLanguage(l.target.value)})),document.getElementById("profile-summary").addEventListener("click",()=>{b.setView("settings")});let o=null;n.addEventListener("input",l=>{clearTimeout(o),o=setTimeout(()=>{const c=l.target.value.toLowerCase().trim();c&&(b.activeView!=="journal"&&b.activeView!=="backtesting"&&b.activeView!=="backtest-trades"&&b.setView("journal"),window.dispatchEvent(new CustomEvent("globalSearch",{detail:c})))},300)}),b.subscribe(()=>{i()}),window.addEventListener("popstate",l=>{var u;const c=((u=l.state)==null?void 0:u.view)||window.location.pathname.replace(/^\//,"").replace(/\/$/,"")||"dashboard";Ut[c]&&(b.activeView=c,b.notifyListeners())}),i(),El()});function El(){const t=document.getElementById("trade-modal"),e=document.getElementById("close-trade-modal-btn"),s=document.getElementById("cancel-trade-modal-btn"),r=document.getElementById("quick-add-trade-btn"),n=document.getElementById("trade-form"),i=document.getElementById("form-entry"),a=document.getElementById("form-sl"),o=document.getElementById("form-tp"),l=document.getElementById("form-rr"),c=document.getElementById("form-direction");r.addEventListener("click",()=>{if(b.activeView==="backtesting"){ge(async()=>{const{openBacktestModal:d}=await Promise.resolve().then(()=>zo);return{openBacktestModal:d}},void 0).then(({openBacktestModal:d})=>d());return}ns()}),[e,s].forEach(d=>{d.addEventListener("click",()=>{t.classList.remove("active")})}),t.addEventListener("click",d=>{d.target===t&&t.classList.remove("active")});function u(){const d=parseFloat(i.value),f=parseFloat(a.value),h=parseFloat(o.value),p=c.value;if(isNaN(d)||isNaN(f)||isNaN(h)){l.value="";return}let g=0,y=0;if(p==="Buy"?(g=d-f,y=h-d):(g=f-d,y=d-h),g<=0){l.value="Invalid SL";return}const v=(y/g).toFixed(2);l.value=v}[i,a,o,c].forEach(d=>{d.addEventListener("input",u)}),Rl(),n.addEventListener("submit",async d=>{d.preventDefault();const f=document.getElementById("form-trade-id").value,h=document.getElementById("form-journal-type").value,p=h==="live"?"TradingJournal":"BacktestingJournal",g=f?b.tradingTrades.find(T=>T.id===Number(f)):null,y=[];document.querySelectorAll(".checklist-form-checkbox").forEach(T=>{T.checked&&y.push(T.value)});const v=document.getElementById("form-date").value,x=new Date(v).toLocaleDateString("en-US",{weekday:"long"}),m=parseFloat(document.getElementById("form-pl").value)||0,k=document.getElementById("form-result").value==="Loss"?-Math.abs(m):document.getElementById("form-result").value==="Win"?Math.abs(m):m,I={userEmail:b.user.email,date:v,day:x,session:document.getElementById("form-session").value,accountType:document.getElementById("form-account-type").value,pair:document.getElementById("form-pair").value.toUpperCase(),type:c.value,entryPrice:parseFloat(i.value),stopLoss:parseFloat(a.value),takeProfit:parseFloat(o.value),riskPercent:parseFloat(document.getElementById("form-risk").value||1),rr:parseFloat(l.value)||0,plMoney:k,result:document.getElementById("form-result").value,strategy:document.getElementById("form-strategy").value,setup:document.getElementById("form-setup").value,checklist:y,emotion:document.getElementById("form-emotion").value,mistakes:document.getElementById("form-mistakes").value,lessonLearned:document.getElementById("form-lessons").value,notes:document.getElementById("form-notes").value,beforeScreenshot:document.getElementById("form-before-img").value||null,afterScreenshot:document.getElementById("form-after-img").value||null};f?(I.id=Number(f),await ot(p,I)):await Pe(p,I),h==="live"&&await Rt(g,I),t.classList.remove("active"),b.refreshCache(),dn()})}function ns(t=null,e=null){const s=document.getElementById("trade-modal"),r=document.getElementById("modal-title");document.getElementById("trade-form").reset();const i=document.getElementById("form-account-type");i.innerHTML=Bs().map(m=>`<option value="${m.name}">${m.name}</option>`).join(""),document.getElementById("form-date").value=new Date().toISOString().split("T")[0],document.getElementById("form-journal-type").value=e||(b.activeView==="backtesting"?"backtest":"live");const a=document.getElementById("checklist-selectors-area");a.innerHTML="";const o=["HTF Trend Aligned","Liquidity Swept","MSS on LTF","OB Tapped","Risk defined","Order Flow","KL","TS","SMT / 2SMT","5M #"],l=b.checklists.length?b.checklists.map(m=>({...m,items:[...m.items||[]]})):[{name:"Standard Confirmation",items:o}],c=new Set((t==null?void 0:t.checklist)||[]),u=document.getElementById("checklist-section-select");let d=0,f=[];const h=()=>l[d],p=async()=>{const m=h();m.id&&await ot("Checklists",m)},g=()=>{u.innerHTML=l.map((m,k)=>`<option value="${k}">${m.name}</option>`).join(""),u.value=String(d)},y=()=>{f=h().items,a.innerHTML=f.map((m,k)=>`
      <div class="checklist-item-row">
        <label class="checkbox-label">
          <input type="checkbox" class="checklist-form-checkbox" value="${m}" id="chk-${k}" ${c.has(m)?"checked":""}>
          <span class="checklist-item-text">${m}</span>
        </label>
        <button type="button" class="checklist-edit-btn" data-index="${k}" aria-label="Rename ${m}">✎</button>
        <button type="button" class="checklist-remove-btn" data-index="${k}" aria-label="Remove ${m}">×</button>
      </div>
    `).join(""),a.querySelectorAll(".checklist-form-checkbox").forEach(m=>{m.addEventListener("change",()=>{m.checked?c.add(m.value):c.delete(m.value)})}),a.querySelectorAll(".checklist-edit-btn").forEach(m=>{m.addEventListener("click",()=>{const k=Number(m.dataset.index),T=m.closest(".checklist-item-row").querySelector(".checklist-item-text"),S=document.createElement("input");S.type="text",S.className="checklist-inline-edit",S.value=f[k],T.replaceWith(S),S.focus(),S.select();const B=async()=>{var L;const O=S.value.trim();O&&!f.some((D,F)=>D===O&&F!==k)&&(c.delete(f[k]),f[k]=O,(L=document.getElementById(`chk-${k}`))!=null&&L.checked&&c.add(O)),y(),await p()};S.addEventListener("keydown",O=>{O.key==="Enter"&&B(),O.key==="Escape"&&y()}),S.addEventListener("blur",B,{once:!0})})}),a.querySelectorAll(".checklist-remove-btn").forEach(m=>{m.addEventListener("click",async()=>{f.splice(Number(m.dataset.index),1),y(),await p()})})};g(),y(),u.addEventListener("change",async()=>{d=Number(u.value),y()}),document.getElementById("add-checklist-item-btn").addEventListener("click",async()=>{const m=document.getElementById("new-checklist-item"),k=m.value.trim();!k||f.includes(k)||(f.push(k),h().items=f,m.value="",y(),await p())}),document.getElementById("new-checklist-item").addEventListener("keydown",m=>{m.key==="Enter"&&(m.preventDefault(),document.getElementById("add-checklist-item-btn").click())}),document.getElementById("add-checklist-section-btn").addEventListener("click",async()=>{const m=await Sl();if(!m)return;const k={name:m,items:[],userEmail:b.user.email},I=await Pe("Checklists",k);k.id=(I==null?void 0:I.id)||I,l.push(k),d=l.length-1,g(),y()});const v=document.getElementById("before-preview"),x=document.getElementById("after-preview");v.style.display="none",x.style.display="none",document.getElementById("form-before-img").value="",document.getElementById("form-after-img").value="",t?(r.textContent="Edit Trade Record",document.getElementById("form-trade-id").value=t.id,document.getElementById("form-date").value=t.date,document.getElementById("form-session").value=t.session,document.getElementById("form-account-type").value=t.accountType||"Challenge",document.getElementById("form-pair").value=t.pair,document.getElementById("form-direction").value=t.type,document.getElementById("form-entry").value=t.entryPrice,document.getElementById("form-sl").value=t.stopLoss,document.getElementById("form-tp").value=t.takeProfit,document.getElementById("form-risk").value=t.riskPercent,document.getElementById("form-rr").value=t.rr,document.getElementById("form-result").value=t.result,document.getElementById("form-pl").value=t.plMoney??t.pl_money??"",document.getElementById("form-strategy").value=t.strategy,document.getElementById("form-setup").value=t.setup,document.getElementById("form-emotion").value=t.emotion,document.getElementById("form-mistakes").value=t.mistakes,document.getElementById("form-lessons").value=t.lessonLearned,document.getElementById("form-notes").value=t.notes,t.checklist&&document.querySelectorAll(".checklist-form-checkbox").forEach(m=>{m.checked=t.checklist.includes(m.value)}),t.beforeScreenshot&&(document.getElementById("form-before-img").value=t.beforeScreenshot,v.style.display="block",v.innerHTML=`<img src="${t.beforeScreenshot}">`),t.afterScreenshot&&(document.getElementById("form-after-img").value=t.afterScreenshot,x.style.display="block",x.innerHTML=`<img src="${t.afterScreenshot}">`)):(r.textContent="Log New Trade",document.getElementById("form-trade-id").value=""),s.classList.add("active")}function Sl(){return new Promise(t=>{const e=document.createElement("div");e.className="modal-overlay active checklist-section-modal-overlay",e.innerHTML=`
      <div class="modal-container checklist-section-modal" role="dialog" aria-modal="true" aria-labelledby="checklist-section-modal-title">
        <div class="modal-header">
          <div>
            <div class="modal-kicker">Checklist Library</div>
            <h3 id="checklist-section-modal-title">Add Checklist Section</h3>
          </div>
          <button type="button" class="modal-close checklist-section-cancel" aria-label="Close">&times;</button>
        </div>
        <div class="modal-body">
          <label class="form-label" for="checklist-section-name">Section Name</label>
          <input id="checklist-section-name" class="form-control" type="text" placeholder="e.g. London Open Confirmation" autocomplete="off">
          <p class="checklist-section-helper">Create a reusable group of confirmation rules for your trades.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary checklist-section-cancel">Cancel</button>
          <button type="button" class="btn btn-primary" id="confirm-checklist-section-btn">Add Section</button>
        </div>
      </div>
    `,document.body.appendChild(e);const s=e.querySelector("#checklist-section-name"),r=n=>{e.remove(),t(n)};e.querySelectorAll(".checklist-section-cancel").forEach(n=>n.addEventListener("click",()=>r(""))),e.addEventListener("click",n=>{n.target===e&&r("")}),e.querySelector("#confirm-checklist-section-btn").addEventListener("click",()=>r(s.value.trim())),s.addEventListener("keydown",n=>{n.key==="Enter"&&r(s.value.trim()),n.key==="Escape"&&r("")}),requestAnimationFrame(()=>s.focus())})}function Rl(){const t=document.getElementById("before-dropzone"),e=document.getElementById("after-dropzone"),s=document.getElementById("before-file-input"),r=document.getElementById("after-file-input"),n=(a,o,l,c)=>{const u=document.getElementById(l),d=document.getElementById(c);a.addEventListener("click",()=>o.click()),a.addEventListener("dragover",f=>{f.preventDefault(),a.style.borderColor="var(--accent-color)"}),a.addEventListener("dragleave",()=>{a.style.borderColor="var(--border-color)"}),a.addEventListener("drop",f=>{f.preventDefault(),a.style.borderColor="var(--border-color)",f.dataTransfer.files.length&&i(f.dataTransfer.files[0],u,d)}),o.addEventListener("change",()=>{o.files.length&&i(o.files[0],u,d)})},i=(a,o,l)=>{const c=new FileReader;c.onload=u=>{const d=u.target.result;l.value=d,o.style.display="block",o.innerHTML=`
        <img src="${d}">
        <button type="button" class="image-preview-remove">&times;</button>
      `,o.querySelector(".image-preview-remove").addEventListener("click",f=>{f.stopPropagation(),l.value="",o.innerHTML="",o.style.display="none"})},c.readAsDataURL(a)};n(t,s,"before-preview","form-before-img"),n(e,r,"after-preview","form-after-img")}
