#!/usr/bin/env node

const simpleGit= require('simple-git');
const ora = require('ora');
const git = simpleGit();

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  fgblack: "\x1b[30m",
  fgred: "\x1b[31m",
  fggreen: "\x1b[32m",
  fgyellow: "\x1b[33m",
  fgblue: "\x1b[34m",
  fgmagenta: "\x1b[35m",
  fgcyan: "\x1b[36m",
  fgwhite: "\x1b[37m",
}

const FILTER_BRANCHES = ['master', 'green'];

function displayTable(branches) {
    branches.forEach((branchName, index) => console.log(`${COLORS.fgwhite}${index + 1}\t${COLORS.fgblue}${branchName}${COLORS.reset}`));
}

function severalBranchOptions(parameter, potentialBranches) {
    console.log(`${COLORS.fggreen}Filtering: ${COLORS.fgwhite}${parameter}${COLORS.reset}`)
    displayTable(potentialBranches)
}

async function switchToBranch(branchName) {
  ora(`${COLORS.fggreen}Switching to: ${COLORS.fgwhite}${branchName}${COLORS.reset}`).start();
  await git.checkout([branchName]);
}

async function getBranches() {
    const result = await git.branch(['-v', '--sort=-committerdate']);

    const branches = [];
    for(const key in result.branches) {
        const branch = result.branches[key];
        if (branch.current || FILTER_BRANCHES.includes(branch.name)) {
            continue;
        }

        branches.push(branch.name);
    }

    return branches;
}

(async () => {
  try {
  const branches = await getBranches();
  const [,, ...arguments] = process.argv;

  if (arguments.length === 0) {
      displayTable(branches);
      process.exit(1);
  } else if (arguments.length >= 1) {
      const parameter = arguments[0];

      if (isNaN(parameter) === false) {
        const index = parseInt(parameter, 10);
        const targetBranch = branches[index - 1];

        if (targetBranch == null) {
           throw new Error(`Unknown Index: ${index}`);
        }

        await switchToBranch(targetBranch);
        process.exit(1);
      }

      const potentialBranches = branches.filter(branchName => branchName.includes(parameter));

      if (potentialBranches.length > 1) {
        if (arguments[1] !== undefined) {
          const possibleIndex = arguments[1];

          if (isNaN(possibleIndex) === false) {
            await switchToBranch(potentialBranches[(~~possibleIndex) - 1]);
            process.exit(1);
          }
        }

        severalBranchOptions(parameter, potentialBranches)
        process.exit(1);
      } else {
        await switchToBranch(potentialBranches.pop());
        process.exit(1);
      }
  }

  } catch(error) {
    console.log(error.message);
    process.exit(0); // git isn't viable here
  }
})();
