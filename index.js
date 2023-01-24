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
                    <div class='palette-container'>
                        <div style='background: ${color.hex.value}' class="palette-color" data-color=${color.hex.value}>
                            <span class='copy' id=${color.hex.value}></span>
                        </div>     
                        <span>${color.hex.value}</span>
                    </div>
                `
            }

            document.getElementById('color-container').innerHTML = colorHtml

            document.querySelectorAll('[data-color]').forEach(el => {
                el.addEventListener('click', () => {
                    navigator.clipboard.writeText(el.dataset.color)
                    document.getElementById(el.dataset.color).innerText = 'Copied!'
                    document.getElementById(el.dataset.color).style.display = 'flex';
                    setTimeout(function () {
                        document.getElementById(el.dataset.color).style.display = 'none';
                    }, 600)
                })

                el.addEventListener('mouseover', () => {
                    document.getElementById(el.dataset.color).innerText = 'Copy!'
                    document.getElementById(el.dataset.color).style.display = 'flex';
                })

                el.addEventListener('mouseout', () => {
                    document.getElementById(el.dataset.color).innerText = ''
                    document.getElementById(el.dataset.color).style.display = 'none';
                })
            }
            )
        })
}

document.getElementById('btn').addEventListener('click', render)
render()
