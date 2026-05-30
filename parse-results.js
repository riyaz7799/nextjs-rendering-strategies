const fs   = require('fs');
const path = require('path');

const resultsDir = path.join(__dirname, 'results');

function parseReport(filePath) {
  const raw    = fs.readFileSync(filePath, 'utf-8');
  const report = JSON.parse(raw);
  const audits = report.audits;
  return {
    TTFB  : parseFloat(audits['server-response-time']?.numericValue || 0).toFixed(0),
    FCP   : parseFloat(audits['first-contentful-paint']?.numericValue || 0).toFixed(0),
    LCP   : parseFloat(audits['largest-contentful-paint']?.numericValue || 0).toFixed(0),
    TTI   : parseFloat(audits['interactive']?.numericValue || 0).toFixed(0),
    TBT   : parseFloat(audits['total-blocking-time']?.numericValue || 0).toFixed(0),
    CLS   : parseFloat(audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3),
    Score : Math.round((report.categories?.performance?.score || 0) * 100),
  };
}

function pad(str, len) {
  return String(str).padEnd(len, ' ');
}

function printTable(title, files) {
  console.log(`\n${'='.repeat(72)}`);
  console.log(` ${title}`);
  console.log('='.repeat(72));
  console.log(pad('Metric', 20) + files.map(f => pad(path.basename(f), 26)).join(''));
  console.log('-'.repeat(72));

  const parsed = files.map(f => {
    try { return parseReport(f); }
    catch { return { TTFB:'N/A',FCP:'N/A',LCP:'N/A',TTI:'N/A',TBT:'N/A',CLS:'N/A',Score:'N/A' }; }
  });

  const metrics = ['Score','TTFB','FCP','LCP','TTI','TBT','CLS'];
  const units   = { Score:'pts', TTFB:'ms', FCP:'ms', LCP:'ms', TTI:'ms', TBT:'ms', CLS:'' };

  metrics.forEach(m => {
    const row = pad(m + (units[m] ? ` (${units[m]})` : ''), 20);
    console.log(row + parsed.map(p => pad(p[m], 26)).join(''));
  });

  console.log('='.repeat(72));
}

try {
  const all = fs.readdirSync(resultsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => path.join(resultsDir, f))
    .sort();

  if (all.length === 0) {
    console.log('\n⚠️  No JSON files found in results/');
    console.log('   Run Lighthouse first:\n');
    console.log('   lighthouse https://your-csr-app.vercel.app/products \\');
    console.log('     --output json --output-path ./results/csr-desktop.json \\');
    console.log('     --preset=desktop --chrome-flags="--headless"\n');
    process.exit(0);
  }

  const desktop = all.filter(f => f.includes('desktop'));
  const mobile  = all.filter(f => f.includes('mobile'));

  if (desktop.length) printTable('DESKTOP RESULTS', desktop);
  if (mobile.length)  printTable('MOBILE RESULTS',  mobile);

  console.log(`\n✅ Parsed ${all.length} report(s) successfully.\n`);
} catch (err) {
  console.error('Error reading results directory:', err.message);
  process.exit(1);
}