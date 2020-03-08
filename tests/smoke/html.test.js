const glob = require('glob-all')
const path = require('path')

process.chdir(path.join(__dirname, 'template'))

describe('检查构建文件是否存在',() => {
    it('检查html文件是否构建',(done) => {
        const files = glob.sync([
            './dist/index.html',
            './dist/about.html'
        ])
        if(files.length > 0){
            done()
        } else {
            throw new Error('没有找到html文件')
        }
    })
})