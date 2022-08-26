let mainTitle = '';

async function loadPage(pageName) {
        const resp = await fetch(`pages/${pageName}.html`)
        
        if (resp.status === 404) {
            loadPage(404);
            return;
        }

        const html = await resp.text();
        const dom = new DOMParser();
        const page = dom.parseFromString(html, 'text/html');

        document.getElementById('app-content').innerHTML = page.body.innerHTML;
        // document.head.innerHTML = page.head.innerHTML;
        // document.title = `${mainTitle} - ${page.title}`;
        document.title = page.title ? `${mainTitle} - ${page.title}` : mainTitle;

        window.history.pushState(null, null, `/${pageName}`);

        changeLinksActions();
}

function changeLinksActions() {
    document.querySelectorAll('a').forEach((el) => {
        el.addEventListener('click', function (e) {
            e.preventDefault();

            if (document.location.origin == e.target.origin) {
                // for preventive measures :D
                const pageName = e.target.href
                    .replace(e.target.origin, '')
                    .replace(/\.html/, '')
                    .replace(/pages/, '')
                    .replace(/^\//, '');
                
                loadPage(pageName);
            } else {
                document.location.href = e.target.href;
            }
        })
    })
}

 function init() {
    mainTitle = document.title;
    loadPage('a');
 }
 
 init()
