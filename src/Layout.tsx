import { html } from "hono/html";

export const Layout = (props: any) => html` <!DOCTYPE html>
  <html>
    <head>
      <title>Hello D1!</title>
      <link
        rel="stylesheet"
        href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"
      />
    </head>
    <body>
      <body>
        <main class="container">${props.children}</main>
      </body>
    </body>
  </html>`;
