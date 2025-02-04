import download from 'download-git-repo'
import fs from 'fs-extra'
import path from 'path'
import { promisify } from 'util'

const downloadRepo = promisify(download)

async function copyExampleSiteContent(forceOverride = false, branch = 'main') {
    // Get the directory where the script is located
    const scriptDir = __dirname
    // Get the project root (one level up from script directory)
    const projectRoot = path.resolve(scriptDir, '..')
    
    const tmpDir = path.join(projectRoot, 'tmp')
    const contentDir = path.join(projectRoot, 'content')
    
    try {
        // Create tmp directory if it doesn't exist
        await fs.ensureDir(tmpDir)
        
        console.log(`Downloading repository from branch: ${branch}...`)
        // Download specific directory from GitHub repository
        await downloadRepo(
            `zetxek/adritian-free-hugo-theme#${branch}`,
            tmpDir,
            { clone: false }
        )
        
        const exampleSitePath = path.join(tmpDir, 'exampleSite')
        const exampleSiteContentPath = path.join(exampleSitePath, 'content')
        
        // Check if content directory exists and has files
        const contentExists = await fs.pathExists(contentDir)
        const hasFiles = contentExists && (await fs.readdir(contentDir)).length > 0

        if (hasFiles && !forceOverride) {
            console.log('Content directory already exists and contains files. Use --force to override.')
            await fs.remove(tmpDir)
            return
        }

        // If force override, remove existing content directory first
        if (forceOverride && contentExists) {
            console.log('Removing existing content...')
            await fs.remove(contentDir)
        }
        
        // Ensure the content directory exists
        await fs.ensureDir(contentDir)
        
        console.log('Copying example site content...')
        // Copy contents from exampleSite/content to content directory
        await fs.copy(exampleSiteContentPath, contentDir)
        
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

// Parse command line arguments
const args = process.argv.slice(2)
const forceOverride = args.includes('--force')
const branchIndex = args.indexOf('--branch')
const branch = branchIndex !== -1 ? args[branchIndex + 1] : 'main'

// Run the script
copyExampleSiteContent(forceOverride, branch)
