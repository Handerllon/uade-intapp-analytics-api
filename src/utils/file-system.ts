export const createDirectoryStructure = (directory, parentPath = '') => {
    const fs = require('fs');
    const path = require('path');

    for (const dirName in directory) {
        const dirPath = path.join(parentPath, dirName);

        if (fs.existsSync(dirPath)) {
            fs.rmdirSync(dirPath, { recursive: true });
        }

        fs.mkdirSync(dirPath);

        if (typeof directory[dirName] === 'object') {
            createDirectoryStructure(directory[dirName], dirPath);
        }
    }
}
