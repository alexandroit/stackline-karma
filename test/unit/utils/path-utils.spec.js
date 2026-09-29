'use strict'
const PathUtils = require('../../../lib/utils/path-utils')
const fs = require('fs')

describe('PathUtils.calculateAbsolutePath', () => {
  it('returns absolute path from karma project relative path', () => {
    expect(fs.existsSync(PathUtils.calculateAbsolutePath('lib/utils/path-utils.js'))).to.be.true
  })
})
