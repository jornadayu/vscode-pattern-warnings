import * as vscode from 'vscode';
import { Colors, Config, CONFIG_ID } from './constants';


const warningDecoration: vscode.TextEditorDecorationType = vscode.window.createTextEditorDecorationType({
  isWholeLine: true,
  after: {
    margin: '10px',
  },
  backgroundColor: new vscode.ThemeColor(Colors.WARNING_COLOR)
});

type PatternWarning = {
  pattern: string
  warningText: string
  warningHoverText?: string
}

vscode.languages.registerCodeLensProvider('*', {
  provideCodeLenses(document, token) {
    const codeLenses: vscode.CodeLens[] = [];

    // Get user configured warning patterns to search in code
    const patternWarnings: PatternWarning[] | undefined = vscode.workspace.getConfiguration(
      CONFIG_ID
    ).get(Config.warningPatterns);

    console.log(patternWarnings);

    if (!patternWarnings || !patternWarnings.length) return codeLenses;

    const lines = document.getText().split("\n");

    const warningRangeOptions: vscode.DecorationOptions[] = [];

    lines.forEach((lineText, lineNumber) => {
      patternWarnings.forEach((warning) => {
        if (new RegExp(warning.pattern).test(lineText)) {
          const position = new vscode.Position(lineNumber, 0);
          const range = new vscode.Range(position, position);
          const command: vscode.Command = {
            command: "",
            title: warning.warningText
          };

          // Add codeles warning text
          codeLenses.push(new vscode.CodeLens(range, command));

          // Add to list of warnings to be displayed with color/hover etc.
          warningRangeOptions.push({
            range,
            hoverMessage: warning.warningHoverText
          });
        }
      });
    });

    // Add background warning color
    vscode.window.activeTextEditor?.setDecorations(warningDecoration, warningRangeOptions);

    return codeLenses;
  },
});

export function deactivate(vscode: vscode.ExtensionContext) {
  // Clear decorations when deactivating extension
  warningDecoration.dispose();
}
