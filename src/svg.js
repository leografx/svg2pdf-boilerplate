export const svg = {
    save: (e) => {
        save2PDF(e)
    }
}

const svgToPdf = (svgArt) => {
    const doc = new window.PDFDocument({
        size: [270, 162],
        margin: 0
    });

    const chunks = [];
    const stream = doc.pipe({
        // writable stream implementation
        write: (chunk) => chunks.push(chunk),
        end: () => {
            const pdfBlob = new Blob(chunks, {
                type: 'application/octet-stream'
            });
            var blobUrl = URL.createObjectURL(pdfBlob);

            var fileLink = document.createElement('a');
            fileLink.href = blobUrl;

            // it forces the name of the downloaded file
            fileLink.download = `art.pdf`;

            // triggers the click event
            fileLink.click();
            // window.open(blobUrl);
        },
        // readable streaaam stub iplementation
        on: (event, action) => { },
        once: (...args) => { },
        emit: (...args) => { },
    });



    registerFont4svg('fonts/Roboto-Light.otf')
        .then(response1 => response1.arrayBuffer())
        .then(fontBuffer => {
            doc.font(fontBuffer)

            registerFont4svg('fonts/Roboto-Thin.otf')
                .then(response2 => response2.arrayBuffer())
                .then(fontBuffer2 => {
                    doc.registerFont('Roboto-Light', fontBuffer)
                    doc.registerFont('Roboto-Thin', fontBuffer2)
                    for (let i = 0; i < svgArt.length; i++) {
                        //doc.page.dictionary.data.TrimBox = [0, 0, 252, 144]
                        if (i > 0)
                            doc.addPage();
                        // console.log(doc, svgArt[i])
                        window.SVGtoPDF(doc, svgArt[i], 0, 0);

                    }

                    doc.end();
                })

        });
}

function registerFont4svg(path) {
    return fetch(path)
}


function save2PDF(e) {
    e.preventDefault();

    let svgArt = document.querySelectorAll('#ready-art .layout');
    // console.log(svgArt)
    let output = [];
    for (let i = 0; i < svgArt.length; i++) {
        output.push(svgArt[i].outerHTML.toString());
    }

    svgToPdf(output);
}