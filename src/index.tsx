import { Hono } from "hono";
import { validator } from "hono/validator";
import { jsx } from "hono/jsx";
import { Top } from "./Top";

export type Post = {
  title: string;
  body: string;
};

const posts: Post[] = [];

const createPost = (post: Post) => {
  posts.push(post);
};

const getPosts = () => {
  return posts;
};

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

app.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    `SELECT id,title,body FROM post;`
  ).all<Post>();
  const posts = results;
  return c.html(<Top posts={posts} />);
});

app.get("/hello", (c) => c.text("Hello!"));

app.post(
  "/post",
  validator((v) => ({
    title: v.body("title").isRequired(),
    body: v.body("body").isRequired(),
  })),
  async (c) => {
    const { title, body } = c.req.valid();
    await c.env.DB.prepare(`INSERT INTO post(title, body) VALUES(?, ?);`)
      .bind(title, body)
      .run();
    return c.redirect("/");
  }
);

export default app;
