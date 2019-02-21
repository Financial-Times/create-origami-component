const {expect, test} = require('@oclif/test')

describe('Init', () => {
  test
  .stdout()
  .command(['init'])
  .it('runs init', ctx => {
    expect(ctx.stdout).to.contain('something?')
  })
})
