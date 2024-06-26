'use client';


import tokenGenerator from "@/modules/auth/token";
import { useEffect, useState } from "react";

export default function Home() {

  const [pages, setPages] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');


  useEffect(() => {
    const fetchPages = async () => {
      const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

      if(!API_TOKEN) {
        console.error('API_TOKEN is not set');
        return;
      }

      const TokenGenerator = new tokenGenerator(API_TOKEN)

      const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

      if(!API_KEY) {
        console.error('API_KEY is not set');
        return;
      }
      const bearer = await TokenGenerator.generateToken(API_KEY)
      try {
        const response = await fetch('http://localhost:3000/api/pages', {
          headers: {
            Authorization: `Bearer ${bearer}` // Include the bearer token in the Authorization header
          }
        });

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

  const handleSubmit = () => async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

    if(!API_TOKEN) {
      console.error('API_TOKEN is not set');
      return;
    }

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

    if(!API_KEY) {
      console.error('API_KEY is not set');
      return;
    }
    const TokenGenerator = new tokenGenerator(API_TOKEN)
    const bearer = await TokenGenerator.generateToken(API_KEY)

    if(!email || !name || !phone || !message) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          name: name,
          phone: phone,
          message: message,
          enquiryType: 'Contact'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message');
        setError('Failed to send message');
      }

      setSuccess(true);
      setLoading(false);
      setError('');
      setEmail('')
      setName('')
      setPhone('')
      setMessage('')

    } catch (error) {
      setSuccess(false);
      setError('Failed to send message');
      console.error('Error sending message:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
      <h1>Keystone 🤝 Next.js</h1>
      <ul>
        <li>Below you can see the names of pages in the database.</li>
        <ol>
          {pages.map((page: any, i) => (
            <li className="border p-2" key={i}>{page.title}</li>
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
      <form className="flex flex-col gap-2 my-5 font-mono w-80"
        onSubmit={handleSubmit()}
      >
        <label>Mail :</label>
        <input
          type="text"
          placeholder="Your email"
          name="email"
          className="border border-gray-300 p-2 rounded bg-transparent"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Name :</label>
        <input
          type="text"
          placeholder="Your name"
          name="name"
          className="border border-gray-300 p-2 rounded bg-transparent"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Name :</label>
        <input
          name="phone"
          type="text"
          placeholder="Your phone number"
          className="border border-gray-300 p-2 rounded bg-transparent"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Message :</label>
        <textarea
          placeholder="Your message"
          name="message"
          className="border border-gray-300 p-2 rounded bg-transparent"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className=" border border-gray-300 p-4 rounded">
          {loading && <p className="text-yellow-500">⌛ Loading...</p>}
          {error && <p className="text-red-500">🚨 {error}</p>}
          {success ? <p className="text-green-500">Message sent successfully</p> : <p>📂 fill the for below</p>}
        </div>

        <button className="bg-blue-500 text-white p-2 rounded w-1/2 flex items-center justify-center gap-4">
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="m2.6 13.083l3.452 1.511L16 9.167l-6 7l8.6 3.916a1 1 0 0 0 1.399-.85l1-15a1.002 1.002 0 0 0-1.424-.972l-17 8a1.002 1.002 0 0 0 .025 1.822M8 22.167l4.776-2.316L8 17.623z"/></svg>
          Send
        </button>
      </form>
      </div>
    </main>
  );
}
