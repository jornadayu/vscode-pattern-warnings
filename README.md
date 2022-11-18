# Pattern Warnings for VsCode

A VsCode extension to generate in-line warnings for code, to be used with ignorable warnings you don't want to have custom lint rules for. Not to be used as a replacement for proper CI/CD or linting rules.

## Usage

- Create local/workspace or user settings for the patterns and warnings you want to match for, example setting:

````json
{
	"patternWarnings.warnings": [
		{
			"pattern": "danger\\.someThingDangerous\\(.*",
			"warningText": "Hey, this is dangerous!",
			"warningHoverText": "Instead, try:\n\n```js\nnoDanger.notDangerous(123)\n```"
		}
	]
}
````

![example](/example/example.png)

Also see: [`example`](/example) folder
