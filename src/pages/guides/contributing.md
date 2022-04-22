---
title: Contributing to {{ DOCS_URL }}
---

{{ PRODUCT_NAME }} is all about putting power in the hands of developers and our documentation is no different. The source code for the {{ PRODUCT_NAME }} developer docs (i.e. this site you're reading now) is in an open [repository on GitHub](https://github.com/{{ DOCS_REPO }}) and we welcome feedback and pull requests. If you've found a typo or a better way to explain something, please submit a [pull request]((https://github.com/layer0-docs/layer0-docs/pulls) or [file an issue](https://github.com/layer0-docs/layer0-docs/issues)! Others will likely stumble over the same problem and benefit from your insight.

## Running Locally {/*running-locally*/}

To run the {{ PRODUCT_NAME }} docs on your machine, first clone the repository locally,

```bash
git clone git@github.com:{{ DOCS_REPO }}.git
```

Then install the dependencies:

```bash
cd layer0-docs
npm install
```

Next, start the Next.js dev server locally,

```bash
npm start
```

Finally, visit the site in your browser at http://127.0.0.1:3000.

## Architecture {/*architecture*/}

{{ PRODUCT_NAME }} docs is a simple Next.js application running on {{ PRODUCT_NAME }} (yes we [dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)). The content is stored as pages called "guides". Each guide is a Markdown file located in the [guides folder](https://github.com/{{ DOCS_REPO }}/tree/master/guides) and [guides.json](https://github.com/{{ DOCS_REPO }}/blob/master/guides/guides.json) controls the navigation menu for reaching the guides.

## How to Contribute {/*how-to-contribute*/}

If you need to modify an existing guide, you can use the `guides.json` file to locate the corresponding Markdown file to edit. If your contribution needs its own guide, you'll need to create a new Markdown file in the `guides` folder and add a reference to it in `guides.json`.

We recommend the following process for submitting a change:

1. Fork the {{ PRODUCT_NAME }} Docs repository on GitHub via the web interface.
2. Clone the repo and make sure you can run the docs locally.
3. Make your amazing edit — even a typo fix is an amazing edit!
4. Commit and push your change back to your fork on GitHub.
5. Submit a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) back to the {{ PRODUCT_NAME }} Docs repository via GitHub web interface.

For more details, the Pro Git book has a [helpful contributing guide](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project) that walks you through the process of submitting a pull request to an open source repository on GitHub.
