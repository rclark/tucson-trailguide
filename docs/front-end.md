# Style

## Compiling
SCSS imported by `src/scss/main.scss` will be compiled into CSS, then run through Autoprefixer to add vendor-prefixes and output to `dist/main.css`.

The Grunt task `style` does all of this. Grunt `watch` will run `style` whenever an SCSS file in `src/scss` changes -- and will livereload styles in the browser, as well (if you have Chrome's livereload extension installed).

## Building
The Grunt task `build` does the following:

- minifies `dist/main.css`

## Conventions

### Files
- Use `_foundation-settings.scss` to modify Foundation settings.
- Use `_variables.scss` to define variables that apply universally (and are independent of Foundation).
- Use `_base.scss` to define rulesets that apply universally, to no particular page or module.
- Create a different SCSS partial for each page or module that demands its own styles.

### Classnames and Rules
- Apply rulesets to classes, rather than elements or ID's, whenever reasonable -- except, maybe, in `_base.scss`, where elements might be assigned some universals rules.
  - For some tightly controlled modules, it may make sense to utilize nested element selectors. For example, if every icon element will include a single nested `<b>` element with words, for semantics, an extra class probably isn't necessary.
- Don't bother using hyphens for spaces. Instead of `site-logo`, for instance, just use `sitelogo`.
- Use hyphens, instead, to separate layers of specificity. A navigation block might have the class `nav`, and the links inside it the class `nav-link`.
- Use the following prefixes:
  - `js-` designates a class to be used as a JS selector. *Do not apply any style rules to `js-` classes; conversely, do not use non-`js-` classes in JS.*
  - `m-` designates a modifier class. *Modifier classes have no rulesets applied to them except in combination with other classes.* For example, for a set of social-media links the class `m-twitter` would do nothing unless combined with the class `sociallink`, in which case it would apply a Twitter icon (contrasting with `m-facebook` and `m-instagram`). There should be no problem with namespace conflicts, no matter how vague the modifier classname (e.g. `m-left`), because modifier classes only have meaning in combination with other classes. 

# Javascript

## Referencing Scripts
In `setup.js`, the array `devScripts` lists the scripts that should be loaded during development. A loop in `templates/base.jade` calls these.

## Building Scripts
The same array in `setup.js` is used by Grunt as the list of scripts to be concatenated and minified for production.