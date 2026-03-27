#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const basePath = 'c:\\Job Portfolio\\delivery-panda\\rider-app';

const directories = [
    basePath,
    path.join(basePath, 'app', '(auth)'),
    path.join(basePath, 'app', '(rider)'),
    path.join(basePath, 'app', '(drawer)'),
    path.join(basePath, 'app', '(admin)'),
    path.join(basePath, 'components', 'ui'),
    path.join(basePath, 'components', 'layout'),
    path.join(basePath, 'components', 'order'),
    path.join(basePath, 'components', 'home'),
    path.join(basePath, 'mock'),
    path.join(basePath, 'store'),
    path.join(basePath, 'constants'),
    path.join(basePath, 'assets', 'images')
];

try {
    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });

    console.log('✓ Successfully created React Native Expo directory structure');
    console.log('Path: ' + basePath);
    console.log('\nDirectory tree:');
    
    const printTree = (dir, prefix = '') => {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        items.forEach((item, index) => {
            const isLast = index === items.length - 1;
            console.log(prefix + (isLast ? '└── ' : '├── ') + item.name + (item.isDirectory() ? '/' : ''));
            
            if (item.isDirectory()) {
                const newPrefix = prefix + (isLast ? '    ' : '│   ');
                printTree(path.join(dir, item.name), newPrefix);
            }
        });
    };
    
    printTree(basePath);
} catch (err) {
    console.error('Error creating directories:', err.message);
    process.exit(1);
}
