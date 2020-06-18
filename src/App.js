import React from 'react';
import Pdf from "./pdf/document.pdf";
import json from './contact.json';

const editPdf = async() => {
  const pdfjs = await import('pdfjs-dist/build/pdf');
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  return pdfjs.getDocument(Pdf).promise
  .then(async(pdf) => {
    const page = await pdf.getPage(1);
    const data = await page.getTextContent();

    const matches = data.items.filter(item => {
      let returned = false;
      Object.keys(json.doc).forEach(element => {
        if (item.str.includes(element)) {
          returned = true;
        }
      });
      return returned;
    });

    const transformedValues = matches.map(item => {
    let trasnformedItem = "";
     Object.keys(json.doc).forEach(element => {
        trasnformedItem = item;
        trasnformedItem.str= item.str.replace(`{{doc.${element}}}`, json.doc[element]);
      });
      return trasnformedItem;
    });
    console.log(transformedValues);

    const canvas = document.getElementById("canvas");
    const viewport = page.getViewport({
      scale: 1
    });

     page.render({
      canvasContext: canvas.getContext("2d"),
      viewport: viewport
    })
    return data;
  });
};

const printPdf = (e) => {
  e.preventDefault();
  const table = document.getElementById("main").innerHTML;
  console.log(table);
  const printWindow = window.open('','','height=400, width=600');
  printWindow.document.write('<html><head><title>DIV Contents</title>');
  printWindow.document.write('</head><body >');
  printWindow.document.write(table);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

function App() {
  const data =  editPdf();
  console.log(json.doc.photo);
  return (
    <div className="App">
     <a onClick={printPdf} href="./pdf/document.pdf" download="file">Click here to generate new pdf</a>
     <h1>Oldpdf</h1>
     <div id="main" style={{display: "none"}}>
      <img src="/logo.png" alt="pdf-logo"></img>
      <table id="table" style={{borderTop: "1px solid black", borderRight: "1px solid black",borderLeft:"1px solid black", marginTop: "25px"}}>
      <tbody>
        {
          Object.keys(json.doc).map(key => {
            return <tr style={{border: "1px solid black"}}><td style={{width: "20px", paddingLeft: "5px", borderRight: "1px solid black", borderBottom: "1px solid black"}}>{key}</td><td style={{width: "400px", paddingLeft: "5px", borderBottom: "1px solid black"}}>
              {key!=="photo"?json.doc[key]: <img src={json.doc[key]} alt="img"></img>}}
              </td></tr>
          })
        }
      </tbody>
      </table>
     </div>
     <canvas id="canvas" width="600" height="600"></canvas>
    </div>
  );
}

export default App;
