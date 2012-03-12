# About
Remarkedup generates HTML using customizable templates from markdown adding features such as (hopefully) nice typography and table of contents.
 
# Installation
Remarkedup can be installed via npm

    npm install -g remarkedup

# Usage

    remarkedup [options]

    Options:

      -h, --help                 output usage information
      -V, --version              output the version number
      -i, --input <glob>         input file or path
      -o, --output <path>        output path
      -t, --template <template>  html template file to use
      -w, --watch                watch files for modification and regenerate html output

## Template Discovery
With remarkedup you can specify which HTML template file to be used via the -t, --template &lt;template&gt; option. Remarkedup searches for template file in the current working directory first. In case it could not be found remarkedup searches  the 'templates' directory of the remarkedup installation.

Remarkedup comes with two templates:

* default.html
* fancy.html

To render markdown input with the fancy template use the command:

    remarkedup -t fancy.html -i input.markdown

In case no template was specified the default.html template is used.

## Customizing Templates
Remarkedup uses the [Templ8](https://github.com/constantology/Templ8) templating engine internally to render the HTML ouput. Please see [the Templ8 project page](https://github.com/constantology/Templ8) for a syntax reference.

## Passing extra data to the template
In case you want to pass extra data like a HTML title attribute to the template a key value pair separated by a '=' can be passed to remarkedup:

    remarkedup extra1=Extra1 extra2=Extra2

These values can be referenced in the template via

    {{extra1}} 
    {{extra2}}

In case these values are references in the template but not passed via the command line `{{extra1}}` or `{{extra2}}` would render nothing.
