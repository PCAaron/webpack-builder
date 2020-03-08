const path = require('path')

process.chdir(path.join(__dirname, '../smoke/template'))

describe('webpack.base.js 测试用例', () =>{

    const baseConfig = require('../../lib/webpack.base')

    // console.log(baseConfig)
    it('entry', () => {
        expect(baseConfig.entry.index)
            .toContain('webpack-builder/tests/smoke/template/src/index/index.js')
        expect(baseConfig.entry.about)
            .toContain('webpack-builder/tests/smoke/template/src/about/index.js')
    })
})