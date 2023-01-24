function render() {
    const mode = document.getElementById('select-mode').value.toLowerCase()
    const colorHex = document.getElementById('select-color').value.substring(1)

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${mode}&count=5`)
        .then(response => response.json())
        .then(data => {
            let colorHtml = ''
            let hexHtml = ''
            const colorsArray = data.colors
            let teste = false
            for (let color of colorsArray) {
                colorHtml += `
                    <div class='palette-container' data-color=${color.hex.value}>
                        <div style='background: ${color.hex.value}' class="palette-color">
                            <span class='copy'></span>
                        </div>     
                        <span>${color.hex.value}</span>
                    </div>
                `
            }

            document.getElementById('color-container').innerHTML = colorHtml

            document.querySelectorAll('.palette-container').forEach(el => {
                const copyEl = el.querySelector('.copy')
                el.addEventListener('click', () => {
                    navigator.clipboard.writeText(el.dataset.color)
                    copyEl.innerText = 'Copied!'
                    copyEl.style.display = 'flex';
                    setTimeout(function () {
                        copyEl.style.display = 'none';
                    }, 600)
                })

                el.addEventListener('mouseover', () => {
                    copyEl.innerText = 'Copy!'
                    copyEl.style.display = 'flex';
                })

                el.addEventListener('mouseout', () => {
                    copyEl.innerText = ''
                    copyEl.style.display = 'none';
                })
            }
            )
        })
}

document.getElementById('btn').addEventListener('click', render)
render()
