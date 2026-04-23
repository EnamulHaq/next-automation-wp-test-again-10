import fs from 'fs';
import path from 'path';

export default function Footer() {
  let content = '<footer class="p-10 border-t text-center text-gray-400">Footer Ready</footer>';
  try {
    const filePath = path.join(process.cwd(), 'data/footers/default_footer.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      content = data.rendered_content || content;
    }
  } catch (e) {}

  return (
    <footer className="border-t py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4" dangerouslySetInnerHTML={{ __html: content }} />
    </footer>
  );
}
