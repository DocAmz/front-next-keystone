'use client';


import { useEffect, useState } from "react";

export default function Home() {

  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pages');
        if (!response.ok) {
          throw new Error('Failed to fetch pages');
        }
        const data = await response.json();
        console.log(data);
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };
    fetchPages();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
      <h1>Keystone 🤝 Next.js</h1>
      <ul>
        <li>Below you can see the names of pages in the database.</li>
        <ol>
          {pages.map((page: any) => (
            <li key={page.id}>{page.title}</li>
          ))}
        </ol>
      </ul>
      <div>
        <p>
          <strong>Pages fetched from the server</strong>
        </p>

      </div>

      <h2>How does it work?</h2>

      <p>
        Keystones APIs can be seamlessly composed to work as a powerful data engine within Next.js
        applications without having to host a separate Keystone server. This is made possible by
        Keystone&apos;s `getContext` API.
      </p>
      <p>
        <em>
          Note: Since you are not starting the keystone server, the Admin UI will not be available.
          You can host Keystone as a separate server if you need Admin UI.
        </em>
      </p>
      <p>
        <a href="https://github.com/keystonejs/keystone/tree/main/examples/framework-nextjs-app-directory">
          Check out the example in the repo more info.
        </a>
      </p>
      </div>
    </main>
  );
}
