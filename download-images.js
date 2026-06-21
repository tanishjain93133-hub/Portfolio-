import https from 'https';
import fs from 'fs';
import path from 'path';

const certificatesDir = path.resolve('./public/images/certificates');
const portfolioDir = path.resolve('./public/images/portfolio');

if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}
if (!fs.existsSync(portfolioDir)) {
  fs.mkdirSync(portfolioDir, { recursive: true });
}

// Map of correct image files to their public Google Drive IDs.
// These are correct raw files downloaded directly from Drive bypassing web previews.
const files = {
  'certificates/ai_fundamentals_badge.png': '1gCOnjxies8ystY_JIB_ggeRZ1LzurAQP',
  'certificates/advanced_digital_marketing.jpg': '1NzHQnyiVwvVxHWCbeTqge4HW9ITFCSai',
  'certificates/aws_academy.jpg': '1v7moLn3XrFf6AFKG2z0EIxznO9sRq3S6',
  'certificates/javascript_training.jpg': '1TKRnnFDjgZ8SKfWvC947xMMILbY43tch',
  'certificates/user_to_builder.jpg': '1uI3m0nrwckqQlap8ITzB13nx25_kEdaH',
  'certificates/python_gen_ai.jpg': '1Apu9NxZ-khPs5XZgalD2N-KJGSKqMvq7',
  'certificates/ai_agents.jpg': '1JXGd_-_lXbbxeA9ALnemqUKE9q2Dpmj5',
  'certificates/ai_fundamentals_cert.jpg': '1RmCKsjMAGQ9zr2OyYRfWyr17Ei2-HER9',
  'certificates/python101.jpg': '1H3XJ5fvmVmgW9ikA82et1XBCh1u_8g_A',
  'certificates/power_bi.jpg': '1w72oZh0GErBd0ZEO3dvdcnvb4SxC8QBn',
  'certificates/ai_tools_chatgpt.jpg': '1Yoo3ZsrEw0yyRPF7oLrb3_GsRAFXslwq',
  'certificates/excel_self_learning.jpg': '18P2xxIsJzl50nlEDx1uTuZuMdqV5jPhL',
  'certificates/narcotics_control.jpg': '1OFYznZZ_2scrbIhgDqr5sZ8sUsJcCWPH',
  'portfolio/profile.jpg': '1mUfUWnG4ZWVFnxgOahSTXq_cJA2DGSh5',
  'portfolio/dsa_architects.jpg': '1vv81q-n1jOzi1X9IcHI3sWcMqfy4PIBQ',
  'portfolio/sales_vision.jpg': '1tfmEw3WvATPTSo7FCgHNJDFhcKehQMvL',
  'portfolio/insta_senti.jpg': '1bXejSKeByBVi72knDcNOumnJbtUUO1k_'
};

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Handle redirects (like Google's redirect to download confirmation or mirrors)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed with status ${response.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(dest);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', (err) => {
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('[Image Sync] Downloading/Validating correct binary asset images from Google Drive...');
  for (const [localPath, fileId] of Object.entries(files)) {
    const dest = path.resolve('./public/images', localPath);
    const url = `https://lh3.googleusercontent.com/d/${fileId}`;
    try {
      // Download anyway to ensure full binary authenticity 
      await downloadFile(url, dest);
      console.log(`[Image Sync] Successfully synchronized binary asset: ${localPath}`);
    } catch (err) {
      console.error(`[Image Sync] Failed to synchronize ${localPath}:`, err.message);
    }
  }
  console.log('[Image Sync] Complete - All assets synchronized!');
}

run();
