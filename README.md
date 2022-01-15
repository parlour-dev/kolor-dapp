<p align="center">
  <a href="https://kolor.social">
    <img src="https://user-images.githubusercontent.com/75305759/149636249-4c32dd54-a9f2-4e17-a19f-6ea2d22e7e2a.png" alt="Kolor logo" style="width: 20rem; "/>
  </a>
</p>
<h1 align="center">
  Re-imagining social media
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/de087ae8-d452-4bd0-b0e5-14dca6f45b75/deploy-status)](https://app.netlify.com/sites/desofuture/deploys) ![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

This app is available [here](https://app.kolor.social).

## 💡 The idea
Kolor was created as a Web3 attempt to create a social media platform. It was supposed to make posts last forever and enable creators to get tips with cryptocurrency. 

This is the user-facing application of Kolor. It allows interacting with the platform, creating posts, giving tips and so on.

This application has two backbones:

1. **The blockchain**, where users can store their work and receive tips.
2. **The Kolor backend**, where posts and nicknames can be stored for free.

## 💻 Tech

We use a variety of languages and technologies for Kolor. This dapp uses React, aiming to reduce the amount of overhead as much as possible. That's why we don't use, for example, Redux.

To integrate with the blockchain we use [usedapp](https://usedapp.readthedocs.io/en/latest/) and [ethers.js](https://github.com/ethers-io/ethers.js/).

[For the smart contracts powering this platform look here.](https://github.com/parlour-dev/kolor-contracts)

## 🔨 Building

To build the Kolor dapp, first install the dependencies:

```shell
yarn
```

Then, you can either start the development server:

```shell
yarn start
```

Or build a release:

```shell
yarn build
```