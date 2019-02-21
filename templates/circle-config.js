module.exports = () => {
return `version: 2
jobs:
  test:
    docker:
      - image: circleci/node:8-browsers
    steps:
      - checkout
      - run:
          name: Ensure package.json exists for caching
          command: if [[ ! -f package.json ]]; then echo "{}" > package.json; fi
      - run:
          name: Ensure bower.json exists for caching
          command: if [[ ! -f bower.json ]]; then echo "{}" > bower.json; fi
      - restore_cache:
          key: dependency-cache-{{ checksum "package.json" }}-{{ checksum "bower.json" }}
      - run:
          name: Install dependencies
          command: npx origami-build-tools@^7 install
      - save_cache:
          key: dependency-cache-{{ checksum "package.json" }}-{{ checksum "bower.json" }}
          paths:
            - node_modules
            - bower_components
      - run:
          name: Build accessibility testing demo
          command: npx origami-authoring-tools demo --demo-filter pa11y --suppress-errors
      - run:
          name: Run linters
          command: npx origami-authoring-tools verify
      - run:
          name: Run tests
          command: npx origami-authoring-tools test
workflows:
  version: 2
  test:
    jobs:
      - test`;
};