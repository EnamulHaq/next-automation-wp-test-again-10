import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function Header() {
  let content = '<nav class="p-4 border-b">Header Ready (Sync pending)</nav>';
  try {
    const filePath = path.join(process.cwd(), 'data/headers/default_header.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      content = data.rendered_content || content;
    }
  } catch (e) {
    console.error("Header load error:", e);
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </header>
  );
}
