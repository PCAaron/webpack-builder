const path = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')

//process.chdir() 方法变更 Node.js 进程的当前工作目录，默认template目录执行
process.chdir(path.join(__dirname, 'template'))

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod')
    // 运行webpack配置
    webpack(prodConfig, (err,stats) => {
        if(err){
            console.error(err)
            return
        }
        console.log(stats.toString({
            colors:true,
            modules:false,
            children:false,
            chunks:false,
            chunkModules:false
        }))

        console.log('Compiler success...')
    })
})

