function runLRU() {
    let pages = document.getElementById("pages").value.split(" ").map(Number);
    let capacity = parseInt(document.getElementById("frames").value);

    let frames = [];
    let recent = [];
    let faults = 0;
    let resultHTML = "";

    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];

        if (!frames.includes(page)) {
            faults++;

            if (frames.length < capacity) {
                frames.push(page);
            } else {
                let lruIndex = 0;
                let min = Infinity;

                for (let j = 0; j < frames.length; j++) {
                    let index = recent.lastIndexOf(frames[j]);
                    if (index < min) {
                        min = index;
                        lruIndex = j;
                    }
                }

                frames[lruIndex] = page;
            }
        }

        recent.push(page);

        resultHTML += `<p>➡ Step ${i + 1}: [ ${frames.join(" ")} ]</p>`;
    }

    document.getElementById("result").innerHTML = resultHTML;
    document.getElementById("faults").innerText = "🔥 Page Faults: " + faults;
}