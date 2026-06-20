const fs = require('fs');
const cheerio = require('cheerio');

const htmlContent = fs.readFileSync('C:\\Users\\gragh\\OneDrive\\Desktop\\devopsden\\source files\\foundation\\github_actions-mastery\\github-actions-mastery-guide.html', 'utf-8');
const $ = cheerio.load(htmlContent);

let navGroups = [];

$('.nav-group').each((i, el) => {
  const titleText = $(el).find('.nav-group-title').text().trim().replace(/▾/, '').trim();
  const items = [];
  $(el).find('.nav-item, .nav-link').each((j, itemEl) => {
    // extract onclick="showSection('overview')" -> overview
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

// Since the HTML has standalone buttons for Error Reference, etc.
// let's grab them and put them in a "Reference" group if they aren't in a .nav-group
let extraItems = [];
$('.sidebar nav > .nav-top-link').each((i, itemEl) => {
    const titleText = $(itemEl).text().trim();
    if(titleText.toLowerCase().includes('overview')) return; // handled as default
    const onClickAttr = $(itemEl).attr('onclick');
    const idMatch = onClickAttr ? onClickAttr.match(/'([^']+)'/) : null;
    const id = idMatch ? idMatch[1] : `ext-${i}`;
    extraItems.push({
      id: id,
      title: titleText
    });
});

if(extraItems.length > 0) {
    navGroups.push({
        title: "Reference",
        items: extraItems
    });
}

let cases = '';

$('.section').each((i, el) => {
  const idAttr = $(el).attr('id');
  if (!idAttr) return;
  const sectionId = idAttr.replace('section-', '');
  
  // Remove the "Next Stage" button at bottom of overview
  $(el).find('.section-nav, .nav-buttons').remove();

  // Convert elements
  $(el).find('.concept').each((i, node) => {
    node.tagName = 'ConceptBox';
    delete node.attribs.class;
    
    // Check if starts with "<strong>Why this matters:</strong>" or similar and extract as title
    const strong = $(node).find('strong').first();
    if (strong.length) {
      let title = strong.text().replace(/:$/, '').trim();
      $(node).attr('title', title);
      strong.remove(); // Remove the strong tag
    }
  });

  $(el).find('.tip').each((i, node) => {
    node.tagName = 'TipBox';
    delete node.attribs.class;
    
    const strong = $(node).find('strong').first();
    if (strong.length) {
      let title = strong.text().replace(/:$/, '').trim();
      // Remove trailing colon
      if (title.endsWith(':')) title = title.slice(0, -1);
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
    const detail = $(node).find('.error-detail').html().trim(); // Need html to preserve <p> tags
    
    $(node).empty();
    $(node).attr('error', h4);
    $(node).attr('meaning', msg);
    // Replace the HTML detail with a "fix" prop. 
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
    // Check if it's just code
    const codeNode = $(node).find('code');
    let codeContent = '';
    if (codeNode.length) {
      // Remove copy-btn if inside pre
      $(node).find('.copy-btn').remove();
      // Get the raw text of code
      codeContent = codeNode.text();
    } else {
      codeContent = $(node).text();
    }
    
    // We replace pre with CodeBlock
    node.tagName = 'CodeBlock';
    delete node.attribs.class;
    $(node).empty();
    // We use a special marker to later replace with backticks
    $(node).attr('code', `__CODE_START__${codeContent}__CODE_END__`);
    
    // Try to figure out the title from the preceding element if it's a step
    const parent = $(node).parent();
    if (parent.hasClass('step-body')) {
      const strong = parent.find('strong, h4').first();
      if (strong.length) {
        $(node).attr('title', strong.text().trim());
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
    if (h4.length) {
      h4[0].tagName = 'h3';
    }
    
    // Convert label checkboxes
    const labels = $(node).find('label');
    if (labels.length) {
      const ul = $('<ul className="g-checklist"></ul>');
      labels.each((idx, label) => {
        const input = $(label).find('input');
        const text = $(label).text().trim();
        const li = $(`<li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="gha-cb-${sectionId}-${idx}" /><label htmlFor="gha-cb-${sectionId}-${idx}">${text}</label></li>`);
        ul.append(li);
      });
      $(node).empty().append(ul);
    }
  });

  // Convert elements like class="step" to custom JSX
  $(el).find('.step').each((i, node) => {
    delete node.attribs.class;
    $(node).attr('className', 'g-step');
    const stepNum = $(node).find('.step-num');
    if (stepNum.length) {
      delete stepNum[0].attribs.class;
      $(node).find('.step-num').attr('className', 'g-step-num');
    }
    const stepBody = $(node).find('.step-body');
    if (stepBody.length) {
      delete stepBody[0].attribs.class;
      $(node).find('.step-body').attr('className', 'g-step-body');
    }
  });

  // Handle info-card cost
  $(el).find('.info-card.cost').each((i, node) => {
      node.tagName = 'TipBox';
      delete node.attribs.class;
      const h4 = $(node).find('h4').text().trim();
      $(node).attr('title', h4);
      $(node).find('h4').remove();
  });

  // Handle diagram
  $(el).find('.diagram').each((i, node) => {
      node.tagName = 'CodeBlock';
      delete node.attribs.class;
      let text = $(node).text();
      $(node).empty();
      $(node).attr('code', `__CODE_START__${text}__CODE_END__`);
      $(node).attr('title', "Architecture");
  });

  // Handle image tags - self closing
  $(el).find('img').each((i, node) => {
    if (!node.attribs.alt) node.attribs.alt = "Image";
  });
  
  // Replace class with className globally on all remaining tags
  $(el).find('*').each((i, node) => {
    if (node.attribs.class) {
      node.attribs.className = node.attribs.class;
      delete node.attribs.class;
    }
    if (node.attribs.style) {
      delete node.attribs.style;
    }
    if (node.attribs.onclick) delete node.attribs.onclick;
    if (node.attribs.oninput) delete node.attribs.oninput;
    if (node.attribs.colspan) {
        node.attribs.colSpan = node.attribs.colspan;
        delete node.attribs.colspan;
    }
  });

  let sectionContent = $(el).html();
  
  // Fix self-closing tags
  sectionContent = sectionContent.replace(/<br>/g, '<br />');
  sectionContent = sectionContent.replace(/<hr>/g, '<hr />');
  sectionContent = sectionContent.replace(/<img([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<img${p1} />`;
  });
  sectionContent = sectionContent.replace(/<input([^>]*)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<input${p1} />`;
  });

  // Re-encode specific React props correctly
  // code="__CODE_START__...__CODE_END__" to code={`...`}
  sectionContent = sectionContent.replace(/code="__CODE_START__([\s\S]*?)__CODE_END__"/g, (match, p1) => {
    // Escape backticks and standard react stuff inside the code block
    const escaped = p1.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\\`/g, '\\`').replace(/\\$/g, '\\\\$').replace(/\$/g, '\\$').replace(/{/g, '\\{').replace(/}/g, '\\}');
    return `code={\`${escaped}\`}`;
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

const pageContent = '"use client";\n\n' +
'import GuideWrapper from "@/components/guide/GuideWrapper";\n' +
'import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";\n\n' +
'export default function GithubActionsMastery() {\n' +
'  const navGroups = ' + JSON.stringify(navGroups, null, 4) + ';\n\n' +
'  return (\n' +
'    <GuideWrapper \n' +
'      title="GitHub Actions Mastery" \n' +
'      subtitle="From just wanting tests to run automatically to running your production deploy pipeline."\n' +
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

fs.mkdirSync('C:\\\\Users\\\\gragh\\\\OneDrive\\\\Desktop\\\\devopsden\\\\project\\\\src\\\\app\\\\guides\\\\github-actions', { recursive: true });
fs.writeFileSync('C:\\\\Users\\\\gragh\\\\OneDrive\\\\Desktop\\\\devopsden\\\\project\\\\src\\\\app\\\\guides\\\\github-actions\\\\page.js', pageContent, 'utf-8');
console.log('Done generating GitHub Actions page.js');
