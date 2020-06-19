import * as React from "react";
import {Component} from "react";
import * as ReactDOM from "react-dom";
import {PDFDict, PDFDocument, PDFName, PDFNumber, PDFRawStream, PDFStream, StandardFonts} from 'pdf-lib';
import {saveAs} from "file-saver";

const pako = require('pako');

const baseData = {
    "doc": {
        "firstname": "Joe",
        "lastname": "Gen",
        "email": "jg@hand.com",
        "phone": "123-123-1234",
        "photo": "data:image/png;base64,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"
    }
};
const codecs = {
    encode: (data: any) => pako.deflate(data),
    decode: (stream: any) => pako.inflate(stream, { to: 'string' })
};

export class App extends Component<{}, { file?: File, drawList: { x: number, y: number, text: string }[] }> {

    constructor(props: any) {
        super(props);

        this.state = {
            file: undefined,
            drawList: []
        };
    }

    flattenObject = (obj: any, keyName: string|null, baseObject: any) => {
        Object.keys(obj).forEach(key => {
            let newKey = (keyName ? keyName + '.' : '') + key
            if (typeof obj[key] === "object") {
                // calling the function again
                this.flattenObject(obj[key], newKey, baseObject);
            } else {
                baseObject[newKey] = obj[key];
            }
        });
        return baseObject;
    };

    insertAt = (target: any, value: any, begin: any, end = begin) => {
        return target.substr(0, begin) + value + target.substr(end)
    }

    dictGet = (dict: PDFDict, name: string) => {
        return (Array.from(dict.entries()).find((e: any) => e[0].encodedName === `/${name}`) as any)[1]
    };

    decodeStream = (stream: PDFStream) => {
        return codecs.decode(stream.getContents())
    };

    encodeStream = (baseDict: PDFDict, data: any, encoding = 'FlateDecode') => {
        const dict: PDFDict = baseDict && baseDict.clone();
        const content = codecs.encode(data);
        dict.set(PDFName.of('Filter'), PDFName.of(encoding));
        dict.set(PDFName.of('Length'), PDFNumber.of(content.length));
        return PDFRawStream.of(dict, content);
    };

    replaceRawText = (text: any, data: { [regEx: string]: (match: RegExpExecArray) => string } ) => {
        let found = false;
        for (let regEx of Object.keys(data)) {
            const replacer = data[regEx];
            const regExp = new RegExp(regEx, 'g');
            console.log(text);
            while (true) {
                const match = regExp.exec(text);
                if (match == null) {
                    break
                }
                found = true;
                text = replacer(match);
                // text = this.insertAt(text, output, match.index, match.index + match.input.length)
                // console.log(text);
                // regExp.lastIndex += match.input.length - output.length
            }
        }
        return [text, found]
    };

    processBlock = (block: any, fonts: any, data: any) => {
        const matches: RegExpExecArray[] = [];
        const results: any = [];
        const textObjectOperator = /(?:\[\((.*)\)]\s?TJ)/sg;
        const test = textObjectOperator.exec(block);
        if (test) {
            matches.push(test);
        }
        matches.map((e) => {
            let str, found;
            const textOperator = /\[\(|]TJ|\(|\)([-.0-9]+(\s|))/g;
            if (e && e[1] != null) {
                [str, found] = this.replaceRawText(e[1].replace(textOperator, ''), data);
            }
            if (found) {
                results.push({
                    match: e,
                    data: str,
                })
            }
        });
        if (results.length === 0) {
            return null
        }
        // find position and remove pattern texts
        // @ts-ignore
        results.reverse().forEach(({ match, data }) => {
            let begin = match.index;
            begin += match[0].indexOf(match[1]);

            // Compute the position and add the text to the list
            const blockData: string[] = block.split('\n');
            const posData = blockData.find(r => {
                console.log('STRING', r.trim());
                console.log('LAST 2', r.trim().slice(-2));
                return r.trim().slice(-2).toLowerCase() === 'tm';
            });
            if (posData) {
                const pos = posData.split(' ');
                this.setState({
                    drawList: this.state.drawList.concat({
                        x: parseFloat(pos[pos.length - 3]),
                        y: parseFloat(pos[pos.length - 2]),
                        text: data
                    })
                })
            }

            // Remove the placeholder text
            block = this.insertAt(block, '', begin, begin + match[1].length)
            // block = block.replace('[', '').replace(']', '').replace('TJ', 'Tj');
        })
        return block
    }

    b64toBlob = (b64Data: string, contentType= '', sliceSize= 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    };

    handleFile = (event: any) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = async (event) => {
                if (event.target && event.target.result) {
                    // First load the file content as PDFDocument
                    const doc = await PDFDocument.load(event.target.result);
                    await doc.embedFont(StandardFonts.Helvetica);

                    // Map page content into stream set
                    const streamSet = doc.getPages()
                        .map(page => page.node)
                        .map(node => [
                            this.dictGet((node as any).dict, 'Contents'),
                            this.dictGet((node as any).Resources().dict, 'Font'),
                        ]);

                    // Process the stream
                    const contentDone: any = {};
                    streamSet.forEach(([contentRef, fontDict]) => {
                        if (contentDone[contentRef] === true) {
                            return;
                        }
                        contentDone[contentRef] = true;

                        // Search for text with BT and ET pattern
                        const stream = doc.context.lookup(contentRef);
                        const btRegex = /BT(.*?)ET/isg

                        if (stream !== undefined) {
                            // Decode the stream to readable format
                            let content = this.decodeStream(stream as PDFStream)
                            const dataMap = this.flattenObject(baseData, null, {});

                            // Perform regex test on the content stream to find text pattern
                            let any;
                            while (true) {
                                const match = btRegex.exec(content)
                                if (match == null) {
                                    break
                                }

                                // Define replace pattern {{ }}
                                const data = {
                                    '{{([^({|})]*)}}': (match: any) => {
                                        let text = match.input;
                                        const matches = match.input.match(/{{([^({|})]*)}}/g);
                                        for (let matchStr of matches) {
                                            let str = matchStr.replace(/[{}]/g, '');
                                            text = text.replace(matchStr, dataMap[str])
                                        }
                                        return text;
                                    }
                                };
                                const res = this.processBlock(match[1], fontDict && doc.context.lookup(fontDict), data);
                                if (res == null) {
                                    continue
                                }
                                any = true
                                const begin = match.index + match[0].indexOf(match[1])
                                content = this.insertAt(content, res, begin, begin + match[1].length)
                                // console.log(content);
                                btRegex.lastIndex -= match[0].length - res.length
                            }
                            if (any) {
                                console.log('UPDATE MATCHES');
                                doc.context.assign(contentRef, this.encodeStream((stream as any).dict, content))
                                if (this.state.drawList) {
                                    console.log(this.state.drawList);
                                    for (let draw of this.state.drawList) {
                                        doc.getPage(0).drawText(draw.text, {
                                            x: draw.x,
                                            y: draw.y,
                                            size: 12
                                        });
                                    }
                                }
                                doc.saveAsBase64()
                                    .then(value => {
                                        this.setState({
                                            drawList: []
                                        });
                                        saveAs(this.b64toBlob(value, 'application/pdf'), 'test.pdf');
                                    });
                            }
                        }
                    });
                }
            };
        }
    };

    render() {
        const {file} = this.state;
        return (
            <div>
                { !file && (
                    <input type="file" accept="application/pdf" onChange={this.handleFile}/>
                )}
            </div>
        );
    }
}