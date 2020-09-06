# Branch

You are a busy person, constantly doing pull-reviews and helping other developers whilst also trying to do your own tasks.  You find yourself hopping between lots of branches but you don't want
to keep typing their names out all the time.

`branch` helps by providing a simply interface which:

 * Lists the all the branches you have checked out.
 * Allows you to switch between them with a single shortcut.
 * Filter search these branches and if there is only a single match, switch to it.

## Installation

`yarn global add @langleyu/branch`

or

`npm install -g @langleyu/branch`

## Usage

### `branch`

List all the branches you have checked out, for the current repository.  Ordered by `committerdate`.
Each line will display a numerical index and the name of the branch.

#### Example
```
~ branch
1       test-branch-may-apple
2       test-branch-march-banana
3       test-branch-march-carrot
```

### `branch <index>`

Checkout branch at that particular index.

#### Example
```
~ branch 1
Switching to: test-branch-may-apple
```

### `branch <filter-query>`

Given the filter-query, return a list of branches those name's contains that query.  Notice the indexes are different from that initial list.

#### Example
```
~ branch march
1       test-branch-march-banana
2       test-branch-march-carrot
```

### `branch <filter-query> <index>`

Given a filter-query, switching to that particular index.

#### Example

```
~ branch march 1
Switching to: test-branch-march-banana
```

