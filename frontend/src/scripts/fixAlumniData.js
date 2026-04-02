// Script to fix alumni data
const fs = require('fs');
const path = require('path');

// Path to the alumni data file
const alumniFilePath = path.join(__dirname, '../data/sampleAlumni.js');

// Read the file content
let fileContent = fs.readFileSync(alumniFilePath, 'utf8');

// Generate a random date in 2023
function generateRandomDate() {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `2023-${month}-${day}`;
}

// Add missing fields to all alumni entries
let updatedContent = fileContent;

// Add registrationDate to entries missing it
const regDateRegex = /}\s*,\s*{|}\s*\]/g;
updatedContent = updatedContent.replace(regDateRegex, (match) => {
  if (match.includes(']')) {
    return `\n    registrationDate: "${generateRandomDate()}"\n}]`;
  }
  return `\n    registrationDate: "${generateRandomDate()}"\n},\n{`;
});

// Add status field to entries missing it
const statusRegex = /profileImage:.*?\n(?!\s*status:)/g;
updatedContent = updatedContent.replace(statusRegex, (match) => {
  return `${match}    status: "approved",\n`;
});

// Write the updated content back to the file
fs.writeFileSync(alumniFilePath, updatedContent, 'utf8');

console.log('Alumni data has been fixed successfully!');