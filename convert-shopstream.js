const fs = require('fs');
const cheerio = require('cheerio');

const htmlPath = 'C:\\Users\\gragh\\OneDrive\\Desktop\\devopsden\\source files\\projects\\project-4-cicd-github actions CI & Argo CD\\shopstream-cicd-guide (1).html';
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const $ = cheerio.load(htmlContent);

let navGroups = [];

$('.nav-group').each((i, el) => {
  const titleText = $(el).find('.nav-group-title').text().trim().replace(/▾|▸/g, '').trim();
  const items = [];
  $(el).find('.nav-item').each((j, itemEl) => {
    const onClickAttr = $(itemEl).attr('onclick');
    const idMatch = onClickAttr ? onClickAttr.match(/'([^']+)'/) : null;
    const id = idMatch ? idMatch[1] : `s${i}-l${j}`;
    items.push({
      id: id,
      title: $(itemEl).text().trim()
    });
  });
  navGroups.push({
    title: titleText,
    items: items
  });
});

// Also grab top-level nav-items outside of groups
$('#nav > .nav-item').each((i, el) => {
  const onClickAttr = $(el).attr('onclick');
  const idMatch = onClickAttr ? onClickAttr.match(/'([^']+)'/) : null;
  const id = idMatch ? idMatch[1] : `top-l${i}`;
  navGroups.push({
    title: $(el).text().trim(),
    items: [{ id: id, title: $(el).text().trim() }]
  });
});

let cases = '';

$('.section').each((i, el) => {
  const idAttr = $(el).attr('id');
  if (!idAttr) return;
  const sectionId = idAttr;
  
  // Remove nav buttons
  $(el).find('.nav-buttons').remove();

  // Convert elements
  $(el).find('.concept').each((i, node) => {
    node.tagName = 'ConceptBox';
    delete node.attribs.class;
    
    const strong = $(node).find('strong').first();
    if (strong.length) {
      let title = strong.text().replace(/:$/, '').replace(/\.$/, '').trim();
      $(node).attr('title', title);
      strong.remove();
    }
  });

  $(el).find('.tip').each((i, node) => {
    node.tagName = 'TipBox';
    delete node.attribs.class;
    
    const strong = $(node).find('strong').first();
    if (strong.length) {
      let title = strong.text().replace(/:$/, '').replace(/\.$/, '').trim();
      $(node).attr('title', title);
      strong.remove();
    }
  });

  $(el).find('.warning').each((i, node) => {
    node.tagName = 'WarningBox';
    delete node.attribs.class;
  });

  $(el).find('.error-card').each((i, node) => {
    node.tagName = 'ErrorCard';
    delete node.attribs.class;
    const h4 = $(node).find('h4').text().trim();
    const msg = $(node).find('.error-msg').text().trim();
    const detail = $(node).find('.error-detail').html().trim();
    
    $(node).empty();
    $(node).attr('error', h4);
    $(node).attr('meaning', msg);
    const detailText = cheerio.load(detail).root().text().trim();
    $(node).attr('fix', detailText);
  });

  $(el).find('.quiz').each((i, node) => {
    node.tagName = 'Quiz';
    delete node.attribs.class;
    const question = $(node).find('.question').text().trim();
    const answer = $(node).find('.answer').text().trim();
    $(node).empty();
    $(node).attr('question', question);
    $(node).attr('answer', answer);
  });

  $(el).find('pre').each((i, node) => {
    const codeNode = $(node).find('code');
    let codeContent = '';
    if (codeNode.length) {
      $(node).find('.copy-btn').remove();
      codeContent = codeNode.text();
    } else {
      codeContent = $(node).text();
    }
    
    node.tagName = 'CodeBlock';
    delete node.attribs.class;
    $(node).empty();
    $(node).attr('code', `__CODE_START__${codeContent}__CODE_END__`);
    
    const parent = $(node).parent();
    if (parent.hasClass('step-content')) {
      const h4 = parent.find('h4').first();
      if (h4.length) {
        $(node).attr('title', h4.text().trim());
      } else {
        $(node).attr('title', "Terminal");
      }
    } else {
      $(node).attr('title', "Terminal");
    }
  });

  $(el).find('.checklist').each((i, node) => {
    delete node.attribs.class;
    $(node).attr('className', 'g-checklist');
    const h4 = $(node).find('h4');
    if (h4.length) h4[0].tagName = 'h3';
    
    const labels = $(node).find('label');
    if (labels.length) {
      const ul = $('<ul className="g-checklist"></ul>');
      labels.each((idx, label) => {
        const text = $(label).text().trim();
        const li = $(`<li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="cicd-cb-${sectionId}-${idx}" /><label htmlFor="cicd-cb-${sectionId}-${idx}">${text}</label></li>`);
        ul.append(li);
      });
      $(node).empty().append(ul);
    }
  });

  $(el).find('.step').each((i, node) => {
    delete node.attribs.class;
    $(node).attr('className', 'g-step');
    const stepNum = $(node).find('.step-num');
    if (stepNum.length) {
      delete stepNum[0].attribs.class;
      $(node).find('.step-num').attr('className', 'g-step-num');
    }
    const stepContent = $(node).find('.step-content');
    if (stepContent.length) {
      delete stepContent[0].attribs.class;
      $(node).find('.step-content').attr('className', 'g-step-body');
    }
  });

  $(el).find('img').each((i, node) => {
    if (!node.attribs.alt) node.attribs.alt = "Image";
  });
  
  $(el).find('*').each((i, node) => {
    if (node.attribs.class) {
      node.attribs.className = node.attribs.class;
      delete node.attribs.class;
    }
    if (node.attribs.style) delete node.attribs.style;
    if (node.attribs.onclick) delete node.attribs.onclick;
    if (node.attribs.oninput) delete node.attribs.oninput;
  });

  let sectionContent = $(el).html();
  
  sectionContent = sectionContent.replace(/<br>/g, '<br />');
  sectionContent = sectionContent.replace(/<hr>/g, '<hr />');
  sectionContent = sectionContent.replace(/<img([^>]*)>/g, (match, p1) => p1.endsWith('/') ? match : `<img${p1} />`);
  sectionContent = sectionContent.replace(/<input([^>]*)>/g, (match, p1) => p1.endsWith('/') ? match : `<input${p1} />`);

  // We need to escape ${{ ... }} in regular JSX text, but NOT inside code="..."
  // 1. Extract code="..." blocks to an array
  const codeBlocks = [];
  sectionContent = sectionContent.replace(/code="__CODE_START__([\s\S]*?)__CODE_END__"/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_PLACEHOLDER_${codeBlocks.length - 1}__`;
  });

  // 2. Safely escape ALL { and } in the HTML text (outside of tags) so JSX doesn't try to parse them
  sectionContent = sectionContent.replace(/(?![^<]*>)[{}]/g, m => m === '{' ? '{"{"}' : '{"}"}');

  // ALSO VERY IMPORTANT: escape arrow functions or unescaped arrows like ->, <-
  sectionContent = sectionContent.replace(/->/g, '&rarr;');
  sectionContent = sectionContent.replace(/<-/g, '&larr;');

  // 3. Restore the code blocks and convert them to React template literals
  sectionContent = sectionContent.replace(/__CODE_BLOCK_PLACEHOLDER_(\d+)__/g, (match, index) => {
    let block = codeBlocks[index];
    return block.replace(/code="__CODE_START__([\s\S]*?)__CODE_END__"/, (m, p1) => {
      const escaped = p1.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\\`/g, '\\`').replace(/\\$/g, '\\\\$').replace(/\$/g, '\\$');
      return `code={\`${escaped}\`}`;
    });
  });

  sectionContent = sectionContent.replace(/&quot;/g, "'");
  sectionContent = sectionContent.replace(/&apos;/g, "'");

  cases += "          case '" + sectionId + "':\n" +
           "            return (\n" +
           "              <div>\n" +
           "                " + sectionContent + "\n" +
           "              </div>\n" +
           "            );\n";
});

let pageContent = '"use client";\n\n' +
'import GuideWrapper from "@/components/guide/GuideWrapper";\n' +
'import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";\n\n' +
'export default function ShopStreamCICD() {\n' +
'  const navGroups = ' + JSON.stringify(navGroups, null, 4) + ';\n\n' +
'  return (\n' +
'    <GuideWrapper \n' +
'      title="ShopStream CI/CD Pipeline" \n' +
'      subtitle="GitHub Actions + ArgoCD · AWS EKS · Production-Grade GitOps"\n' +
'      navGroups={navGroups}\n' +
'    >\n' +
'      {(activeSection) => {\n' +
'        switch (activeSection) {\n' +
cases +
'          default:\n' +
'            return <div>Select a section from the sidebar.</div>;\n' +
'        }\n' +
'      }}\n' +
'    </GuideWrapper>\n' +
'  );\n' +
'}\n';

// Remove fake Stripe key to prevent GitHub secret scanning block
pageContent = pageContent.replace('sk_live_' + 'XXXXXXXXXXXXXXXXXXXXXXXXXX', 'YOUR_STRIPE_LIVE_KEY_HERE');

const outDir = 'C:\\\\Users\\\\gragh\\\\OneDrive\\\\Desktop\\\\devopsden\\\\project\\\\src\\\\app\\\\projects\\\\shopstream-cicd';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outDir + '\\\\page.js', pageContent, 'utf-8');
console.log('Done generating page.js');
