'use strict';

const vscode = require('vscode');

const window = vscode.window
const StatusBarAlignment = vscode.StatusBarAlignment

class WordCounter {

	constructor() {
	}

	updateWordCount() {
		if (!this._statusBarItem) {
			this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left)
		}
		let editor = window.activeTextEditor
		if (!editor) {
			this._statusBarItem.hide()
			return
		}

		let doc = editor.document
		let wordCount = this._getWordCount(doc)
		this._statusBarItem.text = wordCount !== 1 ? `${wordCount} Words` : '1 Words'
		this._statusBarItem.show()
	}

	_getWordCount(doc) {
		let docContent = doc.getText()
		docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
		docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		let wordCount = 0;
		if (docContent != "") {
			wordCount = docContent.split(" ").length;
		}

		return wordCount;
	}

	dispose() {
		if (this._statusBarItem) {
			this._statusBarItem.dispose();
		}
	}
}



module.exports = WordCounter;
