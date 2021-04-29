export const svg = {
    save: (e) => {
        save2PDF(e)
    }
}

async function registerFonts(doc) {
    let fontRobotoLight = embedFont('fonts/Roboto-Light.otf')
    let fontRobotoThin = embedFont('fonts/Roboto-Thin.otf')
    let fontRobotoRegular = embedFont('fonts/Roboto-Regular.otf')

    await fontRobotoLight.then(buffer => {
        doc.registerFont('Roboto-Light', buffer);
    });

    await fontRobotoThin.then(buffer => {
        doc.registerFont('Roboto-Thin', buffer);
    });

    await fontRobotoRegular.then(buffer => {
        doc.registerFont('Roboto-Regular', buffer);
    });
}

const svgToPdf = async (svgArt, w, h) => {
    const doc = new window.PDFDocument({
        size: [w, h],
        margin: 0
    });

    await registerFonts(doc)


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

    console.log(stream)

    for (let i = 0; i < svgArt.length; i++) {
        //doc.page.dictionary.data.TrimBox = [0, 0, 252, 144]
        if (i > 0)
            doc.addPage();
        // console.log(doc, svgArt[i])
        window.SVGtoPDF(doc, svgArt[i], 0, 0);

    }

    doc.end();
}

function registerFont4svg(path) {
    return fetch(path)
}

function embedFont(path) {
    return registerFont4svg(path).then(response => response.arrayBuffer())
}


function save2PDF(e) {
    e.preventDefault();

    let svgArt = document.querySelectorAll('#ready-art .layout');
    let viewBox = svgArt[0].getAttribute('viewBox').split(' ')
    let w = +viewBox[2]
    let h = +viewBox[3]
    console.log(svgArt[0].getAttribute('viewBox').split(' '))
    let output = [];
    for (let i = 0; i < svgArt.length; i++) {
        output.push(svgArt[i].outerHTML.toString());
    }

    svgToPdf(output, w, h);
}