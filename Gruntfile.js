module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-env')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-run')

  grunt.initConfig({
    env: {
      test: {
        TESTING: true
      },
      local: {
        TESTING: false,
        MONGODB_URI: 'mongodb://localhost:27017/monash-ninja',
        API_URL: 'http://localhost:3000',
        API_VERSION: '1.0.0'
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
    },
    run: {
      standard: {
        exec: 'standard'
      }
    }
  })

  grunt.registerTask('spec:unit', ['env:test', 'run:standard', 'mochaTest:unit'])
  grunt.registerTask('spec:functional', ['env:test', 'run:standard', 'mochaTest:functional'])
  grunt.registerTask('spec', ['env:test', 'run:standard', 'mochaTest:unit', 'mochaTest:functional'])
  grunt.registerTask('docker', ['env:docker', 'mochaTest:unit', 'mochaTest:functional'])
  grunt.registerTask('serve', ['env:local', 'nodemon:local'])
}
