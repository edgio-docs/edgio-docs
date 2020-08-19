# Contributing to developer.moovweb.com

The XDN is all about putting power in the hands of developers and our documentation is no different. The source code for the XDN developer docs (i.e. this site your reading now) is in an open repository on Github and we welcome feedback and pull requests. If you've found a typo or a better way to explain something, please submit a pull request or a file issue! Others will likely stumble over the same problem and benefit from your insight.

## Running locally 

To run the XDN docs on your machine, first clone the repository locally,

```
git clone git@github.com:moovweb-docs/xdn-docs.git
```

Then install the dependencies:

```
cd xdn-docs
npm install
```

Next, start the Next.js dev server locally,

```
npm start
```

Finally visit the site in your browser at http://127.0.0.1:3000.

## Architecture

The XDN docs are a simple Next.js application running on the Moovweb XDN (yes we [dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)). The content is stored as pages called "guides". Each guide is a Markdown file located in the [guides folder](https://github.com/moovweb-docs/xdn-docs/tree/master/guides) and the [guides.json](https://github.com/moovweb-docs/xdn-docs/blob/master/guides/guides.json) controls the navigation menu for reaching the guides.

## How to contribute

If you need to modify an existing guide, you can use the `guides.json` file to locate the corresponding Markdown file to edit. If you contribution needs its own guide, you'll need to create a new Markdown file in the `guides` folder and add a reference to it to the `guides.json` file.

We recommend the following process for submitting a change:

1. Fork the XDN Docs repository on Github via the web interface.
2. Clone the repo and make sure you can run the docs locally.
3. Make your amazing edit — even a typo fix is an amazing edit!
4. Commit and push your change back to your fork on Github.
5. Submit a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) back to the XDN Docs repository via Github web interface.

For more details, the Pro Git book has a [helpful contributing guide](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project) that walks you through the process of submitting a pull request to an open source repository on Github.

