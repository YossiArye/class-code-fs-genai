document.getElementById('btn').addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const cb1 = document.getElementById('politician-1')
        const cb2 = document.getElementById('politician-2')
        const cb3 = document.getElementById('politician-3')
        const cb4 = document.getElementById('politician-4')
        const cb5 = document.getElementById('politician-5')
        const cbs = [cb1, cb2, cb3, cb4, cb5]
        const checked = cbs.filter((cb) => cb.checked)
        console.log(checked.map((elem) => elem.getAttribute('serverid')))

        const filteredPoliticiansMidProcess = await fetch('http://localhost:3000/bulk-users', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(checked.map((elem) => elem.getAttribute('serverid')))
        })
        const filteredPoliticians = await filteredPoliticiansMidProcess.json()
        console.log(filteredPoliticians);
        
        document.getElementById('fullData').textContent = JSON.stringify(filteredPoliticians)
    } catch (error) {
        console.error(error)
    }
})