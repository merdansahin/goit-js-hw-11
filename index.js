import{S as u,i as a}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();const p=document.querySelector("#search-form"),c=document.querySelector(".gallery"),d=document.querySelector("#loader"),f="53081449-0d1e064c0b2c3f50b0b9354c8",m="https://pixabay.com/api/";let h=new u(".gallery a",{captionsData:"alt",captionDelay:250});function y(){d.classList.remove("hidden")}function l(){d.classList.add("hidden")}p.addEventListener("submit",async n=>{n.preventDefault();const r=n.target.elements.query.value.trim();if(!r){a.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}c.innerHTML="",y();try{const o=await fetch(`${m}?key=${f}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true`);if(!o.ok)throw new Error("Network response was not ok");const s=await o.json();if(l(),s.hits.length===0){a.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const t=s.hits.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${e.likes}</p>
            <p><b>Views:</b> ${e.views}</p>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </li>
      `).join("");c.innerHTML=t,h.refresh()}catch(o){l(),a.error({title:"Error",message:"Something went wrong! Please try again later.",position:"topRight"}),console.error("Fetch error:",o)}});
//# sourceMappingURL=index.js.map
