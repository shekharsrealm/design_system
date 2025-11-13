import StyleDictionary from 'style-dictionary';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom transformer to flatten token structure for S3
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: (token) => {
    return token.attributes?.category === 'size' && token.value.toString().includes('px');
  },
  transform: (token) => {
    return token.value;
  },
});

StyleDictionary.registerTransform({
  name: 'color/hex',
  type: 'value',
  matcher: (token) => {
    return token.attributes?.category === 'color';
  },
  transform: (token) => {
    return token.value;
  },
});

// Custom format for S3 JSON output
StyleDictionary.registerFormat({
  name: 'json/flat',
  formatter: ({ dictionary }) => {
    const tokens = {};
    
    dictionary.allTokens.forEach((token) => {
      const path = token.path.join('.');
      tokens[path] = {
        value: token.value,
        type: token.type,
        ...(token.attributes && { attributes: token.attributes }),
      };
    });
    
    return JSON.stringify(tokens, null, 2);
  },
});

async function transformTokens() {
  try {
    // Read tokens from the tokens directory
    const tokensDir = path.join(__dirname, '../tokens');
    const outputDir = path.join(__dirname, '../output');
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Check if tokens directory exists and has files
    try {
      const files = await fs.readdir(tokensDir);
      const tokenFiles = files.filter(f => f.endsWith('.json'));
      
      if (tokenFiles.length === 0) {
        console.log('No token files found. Creating example token file...');
        await createExampleTokens(tokensDir);
      }
    } catch (error) {
      console.log('Tokens directory not found. Creating example tokens...');
      await fs.mkdir(tokensDir, { recursive: true });
      await createExampleTokens(tokensDir);
    }
    
    // Initialize Style Dictionary
    const sd = new StyleDictionary({
      source: [`${tokensDir}/**/*.json`],
      platforms: {
        json: {
          transformGroup: 'js',
          buildPath: `${outputDir}/`,
          files: [
            {
              destination: 'tokens.json',
              format: 'json/flat',
            },
            {
              destination: 'tokens-nested.json',
              format: 'json/nested',
            },
          ],
        },
        css: {
          transformGroup: 'css',
          buildPath: `${outputDir}/css/`,
          files: [
            {
              destination: 'tokens.css',
              format: 'css/variables',
            },
          ],
        },
      },
    });
    
    // Build all platforms
    sd.buildAllPlatforms();
    
    console.log('✅ Tokens transformed successfully!');
    console.log(`📁 Output directory: ${outputDir}`);
    
  } catch (error) {
    console.error('❌ Error transforming tokens:', error);
    process.exit(1);
  }
}

async function createExampleTokens(tokensDir) {
  const exampleTokens = {
    $schema: 'https://schemas.tokens.studio/tokens',
    color: {
      primary: {
        base: { value: '#0066FF', type: 'color' },
        light: { value: '#3399FF', type: 'color' },
        dark: { value: '#0052CC', type: 'color' },
      },
      secondary: {
        base: { value: '#6C757D', type: 'color' },
      },
      background: {
        default: { value: '#FFFFFF', type: 'color' },
        alt: { value: '#F8F9FA', type: 'color' },
      },
    },
    spacing: {
      xs: { value: '4px', type: 'spacing' },
      sm: { value: '8px', type: 'spacing' },
      md: { value: '16px', type: 'spacing' },
      lg: { value: '24px', type: 'spacing' },
      xl: { value: '32px', type: 'spacing' },
    },
    typography: {
      fontFamily: {
        primary: { value: 'Inter, sans-serif', type: 'fontFamily' },
        secondary: { value: 'Georgia, serif', type: 'fontFamily' },
      },
      fontSize: {
        xs: { value: '12px', type: 'fontSize' },
        sm: { value: '14px', type: 'fontSize' },
        md: { value: '16px', type: 'fontSize' },
        lg: { value: '20px', type: 'fontSize' },
        xl: { value: '24px', type: 'fontSize' },
      },
    },
    borderRadius: {
      sm: { value: '4px', type: 'borderRadius' },
      md: { value: '8px', type: 'borderRadius' },
      lg: { value: '12px', type: 'borderRadius' },
      full: { value: '9999px', type: 'borderRadius' },
    },
  };
  
  await fs.writeFile(
    path.join(tokensDir, 'tokens.json'),
    JSON.stringify(exampleTokens, null, 2)
  );
  
  console.log('📝 Created example tokens file');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  transformTokens();
}

export { transformTokens };

