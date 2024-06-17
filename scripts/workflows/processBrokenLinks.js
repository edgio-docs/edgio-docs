const {Octokit} = require('@octokit/rest');
const fs = require('fs');
require('dotenv').config();

// Load the GitHub token and repository details from environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_REPOSITORY_OWNER;
const REPO = process.env.GITHUB_REPOSITORY;

const ASSIGNEES = ['tristanlee85', 'username2'];
const octokit = new Octokit({auth: GITHUB_TOKEN});

const checkBrokenLinks = async () => {
  try {
    // Read the broken links markdown file
    const brokenLinks = fs
      .readFileSync('artifacts/broken-links.md', 'utf8')
      .trim();

    // Check if the markdown contains any broken links
    if (!brokenLinks.includes('No broken links found.')) {
      const issueTitle = 'Broken Links Found in Scheduled Check';
      const issueBody = `### Broken Links Report\n\n${brokenLinks}\n\nPlease check the details and fix the broken links.`;

      // List all open issues in the repository
      const {data: issues} = await octokit.issues.listForRepo({
        owner: OWNER,
        repo: REPO,
        state: 'open',
      });

      // Check if an issue with the same title already exists
      const existingIssue = issues.find((issue) => issue.title === issueTitle);

      if (!existingIssue) {
        // Create a new issue if no existing issue is found
        await octokit.issues.create({
          owner: OWNER,
          repo: REPO,
          title: issueTitle,
          body: issueBody,
          labels: ['bug', 'documentation'],
          assignees: ASSIGNEES,
        });
      } else {
        // Update the existing issue if found
        await octokit.issues.update({
          owner: OWNER,
          repo: REPO,
          issue_number: existingIssue.number,
          body: issueBody,
        });
      }
    }
  } catch (error) {
    console.error('Error creating/updating GitHub issue:', error);
  }
};

// Run the function to check for broken links and create/update the issue
checkBrokenLinks();
