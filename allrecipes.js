function removeAds() {
    let all = document.querySelectorAll('div, span, section, article, li, a, iframe');

    for (let i = 0; i <all.length; i++) {
        if (all[i].textContent.trim() === "Promoted" || 
        all[i].id?.startsWith('div-gpt-ad') || 
        all[i].getAttribute('aria-label') === 'Advertisement' || 
        all[i].className?.includes('ad') || 
        all[i].querySelector('iframe[src*="doubleclick"]')) {
            let card = all[i].closest('.feed-shared-update-v2');
            if(!card) {
                let guard = 0, candidate = all[i];
                while (candidate.parentElement && guard++ < 8) {
                    candidate = candidate.parentElement;
                }
                card = candidate;
            }
            card.style.display = 'none';
        }
        
    }
}

removeAds();

setInterval(function (){
    removeAds();
}, 100) 