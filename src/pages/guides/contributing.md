---
title: Contributing to the {{ PRODUCT_NAME }} Documentation
---

{{ PRODUCT_NAME }} is all about putting power in the hands of developers and our documentation is no different. The source code for the {{ PRODUCT_NAME }} developer docs (i.e. this site you're reading now) is in an open [repository on GitHub](https://github.com/{{ DOCS_REPO }}) and we welcome feedback and pull requests. If you've found a typo or a better way to explain something, please submit a [pull request](https://github.com/layer0-docs/layer0-docs/pulls) or [file an issue](https://github.com/layer0-docs/layer0-docs/issues)! Others will likely stumble over the same problem and benefit from your insight.

## Running Locally {/*running-locally*/}

To run the {{ PRODUCT_NAME }} docs on your machine, first clone the repository locally,

```bash
git clone git@github.com:{{ DOCS_REPO }}.git
```

Then install the dependencies:

```bash
cd layer0-docs
yarn install
```

Next, start the Next.js dev server locally,

```bash
yarn dev
```

Finally, visit the site in your browser at http://127.0.0.1:3000.

## Architecture {/*architecture*/}

{{ PRODUCT_NAME }} docs is a simple Next.js application running on {{ PRODUCT_NAME }} (yes we [dogfood](https://en.wikipedia.org/wiki/Eating_your_own_dog_food)). The content is stored as pages called "guides". Each guide is a Markdown file located in the [guides folder](https://github.com/{{ DOCS_REPO }}/tree/main/src/pages/guides)

## How to Contribute {/*how-to-contribute*/}

If you need to modify an existing guide, you can use the [SidebarMenuItems](src/data/SidebarMenuItems.tsx) file to locate the corresponding Markdown file to edit. If your contribution needs its own guide, you'll need to create a new Markdown file in the `guides` folder and add a reference to it in [SidebarMenuItems](src/data/SidebarMenuItems.tsx).

We recommend the following process for submitting a change:

1. Fork the {{ PRODUCT_NAME }} Docs repository on GitHub via the web interface.
2. Clone the repo and make sure you can run the docs locally.
3. Make your amazing edit — even a typo fix is an amazing edit!
4. Commit and push your change back to your fork on GitHub.
5. Submit a [pull request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) back to the {{ PRODUCT_NAME }} Docs repository (to the `main` branch) via GitHub web interface.

<Callout type="info">
For more details, the Pro Git book has a <a href="https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project">helpful contributing guide</a> that walks you through the process of submitting a pull request to an open source repository on GitHub.
</Callout>


---

## Custom Components {/*custom-components*/}

Use the custom components below to enhance the look and feel of your guides.

### Callout {/*callout*/}

Call attention to specific part of the guide with callouts.

```ts
// use this in a markdown file... with type: 'info' | 'warning' | 'danger';

<Callout type="info">
	This is an info...
</Callout>

<Callout type="warning">
	This is an info...
</Callout>

<Callout type="danger">
	This is an info...
</Callout>
```
The code-snippet aboves renders:

<Callout type="info">
	This is an info...
</Callout>
<Callout type="warning">
	This is a warning...
</Callout>
<Callout type="danger">
	This is dangerous...
</Callout>

---
### Codeblock {/*codeblock*/}

Provide a language-module for syntax highlighting or non if you still need to use a codeblock.

```js
// This codeblock has the 'js' language module (with JS comment)
console.log(new Date())
```

```html
<!-- This codeblock has the 'html' language module (with HTML comment) -->
<button type="button" class="btn btn-primary">Primary</button>
```

```bash
# This codeblock has the 'bash' language module (with Bash comment)
echo "Hello World"
```

```
// This codeblock has no language module
upload.build.layer0.co
app.layer0.co
```

### Image {/*image*/}

```ts
<Image src="image src" alt="alt text"/>
```

### Video {/*video*/}

```ts
<Video src="video src url"/>
```

---
### Button Link {/*button-link*/}

```ts
/*
interface IButtonLinkProps {
 variant: 'fill' | 'stroke';
 type: 'default' | 'code' | 'deploy';
 children: React.ReactNode;
 href: string | UrlObject;
 withIcon: boolean;
}
*/

<ButtonLink variant="fill" type="default" href="...">
 Try the Next.js SSR Example Site
</ButtonLink>
<ButtonLink variant="stroke" type="code" withIcon={true} href="...">
 View the Code
</ButtonLink>
<ButtonLink variant="stroke" type="deploy" withIcon={true} href="...">
  Deploy to Layer0
</ButtonLink>
```
Renders:

<ButtonLink variant="fill" type="default" href="https://layer0-docs-layer0-nextjs-example-default.layer0-limelight.link">
 Try the Next.js SSR Example Site
</ButtonLink>
<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-nextjs-example">
 View the Code
</ButtonLink>
<ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https%253A%252F%252Fgithub.com%252Flayer0-docs%252Flayer0-nextjs-example">
  Deploy to Layer0
</ButtonLink>

---

### Button Links Group {/*button-links-group*/}

```ts
<ButtonLinksGroup>
 <ButtonLink variant="fill" type="default" href="...">
  Try the Next.js SSR Example Site
 </ButtonLink>
 <ButtonLink variant="stroke" type="code" withIcon={true} href="...">
  View the Code
 </ButtonLink>
 <ButtonLink variant="stroke" type="deploy" withIcon={true} href="...">
   Deploy to Layer0
 </ButtonLink>
</ButtonLinksGroup>
```

Renders:

<ButtonLinksGroup>
	<ButtonLink variant="fill" type="default" href="https://layer0-docs-layer0-nextjs-example-default.layer0-limelight.link">
	 Try the Next.js SSR Example Site
	</ButtonLink>
	<ButtonLink variant="stroke" type="code" withIcon={true} href="https://github.com/layer0-docs/layer0-nextjs-example">
	 View the Code
	</ButtonLink>
	<ButtonLink variant="stroke" type="deploy" withIcon={true} href="https://app.layer0.co/deploy?button&deploy&repo=https%253A%252F%252Fgithub.com%252Flayer0-docs%252Flayer0-nextjs-example">
	  Deploy to Layer0
	</ButtonLink>
</ButtonLinksGroup>