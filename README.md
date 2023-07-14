[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<h3 align="center">Task Management</h3>

  <p align="center">
    Stamurai assignment to assess skills and proficiency in Next.js, TypeScript, Tailwind CSS, MST (Mobx State Tree) and Git. This assignment is a Task Management application that allows to create, view, update and delete tasks.
    <br />
    <a href="https://github.com/daniel-monsalve-villegas/stamurai-assignment"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://stamurai-assignment-red.vercel.app/">View Demo</a>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

The objective of this project assignment is to assess your skills and proficiency in Next.js, TypeScript, Tailwind CSS, MST (Mobx State Tree) and Git. You will be required to develop a task management application that allows users to create, view, update, and delete tasks. The application should incorporate the specified technologies and adhere to best practices in terms of code organization, styling, and version control.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Next][Next.js]][Next-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

To run this project locally you must follow this steps.

### Prerequisites

Need to have npm install on your computer

- npm
  ```sh
  npm install npm@latest -g
  ```

or installing with a executer downloading from [Node.js](https://nodejs.org/en/download) page

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/daniel-monsalve-villegas/stamurai-assignment.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To run it with a local API must change value of `baseUrl` in `store/TodoAPI.ts` (if want to run it with the mock API ignore this step)

   ```js
   const baseUrl = 'http://localhost:8080'
   ```

   Then run the project with

   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

daniel monsalve - monsalvedanielv@gmail.com

Project Link: [https://github.com/daniel-monsalve-villegas/stamurai-assignment](https://github.com/daniel-monsalve-villegas/stamurai-assignment)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/daniel-monsalve-villegas/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
