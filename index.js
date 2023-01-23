

document.getElementById('btn').addEventListener('click', render)

function render(){
const mode = document.getElementById('select-mode').value.toLowerCase()
const colorHex = document.getElementById('select-color').value.substring(1)

fetch (`https://www.thecolorapi.com/scheme?hex=${colorHex}&mode=${mode}&count=5`)
    .then (response => response.json())
    .then (data => {
            let colorHtml = ''
            let hexHtml = ''
            const colorsArray = data.colors
            for(let color of colorsArray){
                colorHtml += `
                    <div>
                        <div style='background: ${color.hex.value}' id="palette-color"></div>     
                        <span>${color.hex.value}</span>
                    </div>
                `
            }
            document.getElementById('color-container').innerHTML = colorHtml
        })
}

render()