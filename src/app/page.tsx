import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function Home() {
  const getLinks = (dir: string) => {
    const p = path.join(process.cwd(), 'data', dir);
    if (!fs.existsSync(p)) return [];
    return fs.readdirSync(p).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));
  };

  const pages = getLinks('pages');
  const posts = getLinks('posts');

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-br from-indigo-900 to-black text-white p-20 rounded-[3rem] mb-20 shadow-2xl">
        <h1 className="text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
           POWERED <br /> BY FRONTIS.
        </h1>
        <p className="text-2xl opacity-60 font-medium">Headless WordPress is now Next.js Native.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-20">
        <section>
          <h2 className="text-3xl font-black mb-10 tracking-tighter border-b pb-4">COLLECTION: PAGES</h2>
          <div className="space-y-4">
            {pages.length === 0 && <p className="text-gray-400 italic">No pages published yet.</p>}
            {pages.map(slug => (
              <Link key={slug} href={`/${slug}`} className="block p-8 bg-white border border-gray-100 rounded-3xl hover:border-indigo-600 transition-all hover:scale-[1.02] active:scale-[0.98]">
                 <span className="text-2xl font-black uppercase tracking-tighter">{slug.replace(/-/g, ' ')}</span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black mb-10 tracking-tighter border-b pb-4">COLLECTION: POSTS</h2>
          <div className="space-y-4">
             {posts.length === 0 && <p className="text-gray-400 italic">Writing new posts in WordPress...</p>}
             {posts.map(slug => (
              <Link key={slug} href={`/blog/${slug}`} className="block p-8 bg-gray-50 rounded-3xl hover:bg-white border border-transparent hover:border-gray-200 transition-all">
                 <span className="text-xl font-bold">{slug.replace(/-/g, ' ')}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
