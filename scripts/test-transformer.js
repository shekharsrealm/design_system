import { transformTokens } from '../transformers/index.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testTransformer() {
  console.log('🧪 Testing token transformer...\n');
  
  try {
    await transformTokens();
    
    // Check if output files were created
    const outputDir = path.join(__dirname, '../output');
    const files = await fs.readdir(outputDir, { recursive: true });
    
    console.log('\n📋 Generated files:');
    files.forEach(file => {
      console.log(`  - ${file}`);
    });
    
    // Read and display a sample of the transformed tokens
    const tokensPath = path.join(outputDir, 'tokens.json');
    try {
      const tokensContent = await fs.readFile(tokensPath, 'utf-8');
      const tokens = JSON.parse(tokensContent);
      
      console.log('\n📊 Sample tokens (first 5):');
      const sampleKeys = Object.keys(tokens).slice(0, 5);
      sampleKeys.forEach(key => {
        console.log(`  ${key}:`, JSON.stringify(tokens[key]));
      });
      
      console.log(`\n✅ Total tokens: ${Object.keys(tokens).length}`);
    } catch (error) {
      console.warn('⚠️  Could not read tokens.json:', error.message);
    }
    
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testTransformer();

