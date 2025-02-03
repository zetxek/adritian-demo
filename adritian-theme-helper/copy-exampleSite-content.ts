import download from 'download-git-repo'
import fs from 'fs-extra'
import path from 'path'
import { promisify } from 'util'

const downloadRepo = promisify(download)

async function copyExampleSiteContent() {
    // Get the directory where the script is located
    const scriptDir = __dirname
    // Get the project root (one level up from script directory)
    const projectRoot = path.resolve(scriptDir, '..')
    
    const tmpDir = path.join(projectRoot, 'tmp')
    const contentDir = path.join(projectRoot, 'content')
    
    try {
        // Create tmp directory if it doesn't exist
        await fs.ensureDir(tmpDir)
        
        console.log('Downloading repository...')
        // Download specific directory from GitHub repository
        await downloadRepo(
            'zetxek/adritian-free-hugo-theme#main',
            tmpDir,
            { clone: false }
        )
        
        const exampleSitePath = path.join(tmpDir, 'exampleSite')
        
        // Ensure the content directory exists
        await fs.ensureDir(contentDir)
        
        console.log('Copying example site content...')
        // Copy contents from exampleSite to content directory
        await fs.copy(exampleSitePath, contentDir, {
            overwrite: true,
            errorOnExist: false
        })
        
        console.log('Cleaning up...')
        // Clean up tmp directory
        await fs.remove(tmpDir)
        
        console.log('Example site content copied successfully!')
        
    } catch (error) {
        console.error('Error:', error)
        // Clean up tmp directory in case of error
        if (await fs.pathExists(tmpDir)) {
            await fs.remove(tmpDir)
        }
        process.exit(1)
    }
}

// Run the script
copyExampleSiteContent()
