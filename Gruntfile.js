module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-env')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-nodemon')

  grunt.initConfig({
    env: {
      test: {
        TESTING: true
      },
      local: {
        TESTING: false
      },
      docker: {
        TESTING: true
      }
    },
    mochaTest: {
      functional: {
        options: {
          reporter: 'spec',
          timeout: '10000',
          recursive: true
        },
        src: ['tests/functional/**/test*.js']
      },
      unit: {
        options: {
          reporter: 'spec',
          timeout: '10000',
          recursive: true
        },
        src: ['tests/unit/**/test*.js']
      }
    },
    nodemon: {
      local: {
        script: 'app.js'
      }
    }
  })

  grunt.registerTask('spec:unit', ['env:test', 'mochaTest:unit'])
  grunt.registerTask('spec:functional', ['env:test', 'mochaTest:functional'])
  grunt.registerTask('spec', ['env:test', 'mochaTest:unit', 'mochaTest:functional'])
  grunt.registerTask('docker', ['env:docker', 'mochaTest:unit', 'mochaTest:functional'])
  grunt.registerTask('serve', ['env:local', 'nodemon:local'])
}
