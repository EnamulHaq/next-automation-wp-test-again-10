import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

export default async function CMSPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'data/pages', `${slug}.json`);

  if (!fs.existsSync(filePath)) return notFound();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  return (
    <article className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-7xl font-black tracking-tighter mb-12 leading-none">{data.post_title}</h1>
      <div 
        className="prose prose-2xl max-w-none prose-img:rounded-[3rem] prose-headings:tracking-tighter prose-headings:font-black"
        dangerouslySetInnerHTML={{ __html: data.rendered_content }} 
      />
    </article>
  );
}

export async function generateStaticParams() {
  try {
    const dirPath = path.join(process.cwd(), 'data/pages');
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath).filter(f => f.endsWith('.json')).map(f => ({ slug: f.replace('.json', '') }));
  } catch(e) { return []; }
}
